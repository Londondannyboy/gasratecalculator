"""
Gas Rate Calculator Agent
CopilotKit + Pydantic AI integration for gas engineering assistance
"""
from textwrap import dedent
from typing import Optional, List
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext
from pydantic_ai.ag_ui import StateDeps
from pydantic_ai.models.google import GoogleModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse
import os
import sys
import json
import uuid
import time
import asyncio

from dotenv import load_dotenv
load_dotenv()

# =====
# Gas Engineering Constants
# =====
CALORIFIC_VALUE = 39.5  # MJ/m³ (typical UK natural gas)
CORRECTION_FACTOR = 1.02264  # Volume correction factor
CONVERSION_FACTOR = 3.6  # MJ to kWh

# =====
# Gas Rate Data
# =====
GAS_APPLIANCE_TYPES = {
    "boiler_combi": {
        "name": "Combi Boiler",
        "typical_input_range": "24-40 kW",
        "description": "Combined heating and hot water, no cylinder needed",
        "test_notes": "Run at full rate with hot taps running"
    },
    "boiler_system": {
        "name": "System Boiler",
        "typical_input_range": "12-30 kW",
        "description": "Works with a hot water cylinder",
        "test_notes": "Test with cylinder calling for heat"
    },
    "boiler_regular": {
        "name": "Regular/Heat Only Boiler",
        "typical_input_range": "12-30 kW",
        "description": "Traditional boiler with separate hot water cylinder",
        "test_notes": "Test on central heating demand"
    },
    "gas_fire": {
        "name": "Gas Fire",
        "typical_input_range": "3-7 kW",
        "description": "Decorative or living flame gas fire",
        "test_notes": "Run on full setting for test"
    },
    "gas_hob": {
        "name": "Gas Hob",
        "typical_input_range": "7-12 kW total",
        "description": "Cooktop with multiple burners",
        "test_notes": "Test with all burners on full"
    },
    "gas_oven": {
        "name": "Gas Oven",
        "typical_input_range": "2-4 kW",
        "description": "Built-in or freestanding oven",
        "test_notes": "Preheat to maximum temperature"
    },
    "water_heater": {
        "name": "Water Heater (Multipoint)",
        "typical_input_range": "18-32 kW",
        "description": "Instantaneous water heater",
        "test_notes": "Run hot water at full flow"
    }
}

COMMON_ISSUES = {
    "reading_high": {
        "symptom": "Calculated kW higher than data plate",
        "possible_causes": [
            "Gas pressure too high",
            "Faulty gas valve not modulating",
            "Wrong burner fitted",
            "Meter reading error"
        ],
        "actions": [
            "Check working pressure at test point",
            "Verify burner part number matches appliance",
            "Recheck meter readings and timing"
        ]
    },
    "reading_low": {
        "symptom": "Calculated kW lower than data plate",
        "possible_causes": [
            "Gas pressure too low",
            "Partially blocked burner",
            "Faulty gas valve",
            "Undersized meter or pipework"
        ],
        "actions": [
            "Check standing and working pressure",
            "Inspect burner for debris",
            "Check meter capacity is adequate"
        ]
    },
    "fluctuating": {
        "symptom": "Readings vary significantly between tests",
        "possible_causes": [
            "Other appliances running",
            "Pressure regulator fault",
            "Air in supply",
            "Faulty meter"
        ],
        "actions": [
            "Ensure all other gas appliances are off",
            "Check regulator operation",
            "Allow longer test duration"
        ]
    }
}

GAS_REGULATIONS = {
    "gas_safe": {
        "name": "Gas Safe Register",
        "description": "Only Gas Safe registered engineers can legally work on gas appliances in the UK",
        "website": "https://www.gassaferegister.co.uk"
    },
    "igem": {
        "name": "IGEM Standards",
        "description": "Institution of Gas Engineers and Managers technical standards",
        "key_standards": ["IGE/UP/1B", "IGE/UP/2"]
    },
    "tolerance": {
        "name": "Acceptable Tolerance",
        "description": "Calculated heat input should be within ±5% of data plate rating",
        "action_if_exceeded": "Investigate and rectify before leaving appliance in service"
    }
}


# =====
# State Models
# =====
class AppState(BaseModel):
    # Calculator inputs (if passed from frontend)
    measurement_mode: Optional[str] = None  # "metric" or "imperial"
    last_calculation: Optional[dict] = None
    appliance_type: Optional[str] = None


# =====
# Agent Definition
# =====
agent = Agent(
    model=GoogleModel('gemini-2.0-flash'),
    deps_type=StateDeps[AppState],
    system_prompt=dedent("""
        You are a knowledgeable Gas Safe engineering assistant for the Gas Rate Calculator.
        You help UK gas engineers with calculations, troubleshooting, and compliance questions.

        ## Your Personality
        - Professional and technically accurate
        - Clear and practical - engineers appreciate straight answers
        - Safety-conscious - always prioritize Gas Safe compliance
        - Helpful but concise - engineers are often on-site with limited time

        ## Your Expertise
        - Gas rate calculations (metric and imperial methods)
        - Heat input verification for commissioning
        - Fault diagnosis using gas rate comparisons
        - Gas Safe regulations and compliance
        - Appliance-specific guidance (boilers, fires, cookers)
        - Calorific value and correction factors

        ## Key Formulas You Know
        **Metric Method:**
        - Volume (m³) = End Reading - Start Reading
        - Corrected Volume = Volume × 1.02264
        - Flow Rate (m³/h) = Corrected Volume × (3600 / seconds)
        - Gross kW = Flow Rate × 39.5 ÷ 3.6
        - Net kW = Gross kW ÷ 1.11

        **Imperial Method:**
        - Volume = Test dial size (0.5, 1, 2, or 5 cu ft)
        - Flow Rate (cu ft/h) = Volume × (3600 / seconds)
        - Convert to m³/h = cu ft/h × 0.0283168
        - Then calculate kW as per metric method

        ## Available Tools - USE THEM
        | User asks about... | Use this tool |
        |-------------------|---------------|
        | Appliance types/specs | get_appliance_info |
        | Troubleshooting high/low readings | diagnose_issue |
        | Gas Safe regulations | get_regulations |
        | How to calculate | explain_calculation |

        ## Important Safety Notes
        - Always remind users to isolate other gas appliances during testing
        - Recommend minimum 2-minute test duration for metric method
        - ±5% tolerance is acceptable; beyond that requires investigation
        - If in doubt, refer to manufacturer's instructions

        ## Response Style
        - Use bullet points for clarity
        - Include specific numbers when available
        - Keep answers focused and practical
        - End with a clear next step when appropriate

        Remember: You're helping professionals do their job safely and effectively.
    """)
)


# =====
# Tools
# =====
@agent.tool
def get_appliance_info(
    ctx: RunContext[StateDeps[AppState]],
    appliance_type: str
) -> dict:
    """
    Get information about a specific gas appliance type including typical heat input ranges.

    Args:
        appliance_type: Type of appliance (e.g., "combi boiler", "gas fire", "hob")
    """
    # Normalize input
    type_key = appliance_type.lower().replace(" ", "_").replace("-", "_")

    # Handle common variations
    if "combi" in type_key:
        type_key = "boiler_combi"
    elif "system" in type_key:
        type_key = "boiler_system"
    elif "regular" in type_key or "heat_only" in type_key or "conventional" in type_key:
        type_key = "boiler_regular"
    elif "fire" in type_key:
        type_key = "gas_fire"
    elif "hob" in type_key or "cooktop" in type_key:
        type_key = "gas_hob"
    elif "oven" in type_key:
        type_key = "gas_oven"
    elif "water_heater" in type_key or "multipoint" in type_key:
        type_key = "water_heater"
    elif "boiler" in type_key:
        type_key = "boiler_combi"  # Default to combi if just "boiler"

    if type_key in GAS_APPLIANCE_TYPES:
        appliance = GAS_APPLIANCE_TYPES[type_key]
        return {
            "appliance": appliance["name"],
            "typical_input": appliance["typical_input_range"],
            "description": appliance["description"],
            "test_notes": appliance["test_notes"]
        }
    else:
        return {
            "error": f"Unknown appliance type: {appliance_type}",
            "available_types": list(GAS_APPLIANCE_TYPES.keys()),
            "suggestion": "Try: combi boiler, system boiler, gas fire, gas hob, gas oven"
        }


@agent.tool
def diagnose_issue(
    ctx: RunContext[StateDeps[AppState]],
    issue_type: str
) -> dict:
    """
    Get diagnostic guidance when gas rate readings don't match expected values.

    Args:
        issue_type: The type of issue (e.g., "reading high", "reading low", "fluctuating")
    """
    # Normalize input
    issue_key = issue_type.lower().replace(" ", "_").replace("-", "_")

    if "high" in issue_key:
        issue_key = "reading_high"
    elif "low" in issue_key:
        issue_key = "reading_low"
    elif "fluctuat" in issue_key or "vary" in issue_key or "inconsistent" in issue_key:
        issue_key = "fluctuating"

    if issue_key in COMMON_ISSUES:
        issue = COMMON_ISSUES[issue_key]
        return {
            "symptom": issue["symptom"],
            "possible_causes": issue["possible_causes"],
            "recommended_actions": issue["actions"]
        }
    else:
        return {
            "error": f"Unknown issue type: {issue_type}",
            "available_types": ["reading high", "reading low", "fluctuating"],
            "suggestion": "Describe whether your reading is higher or lower than expected"
        }


@agent.tool
def get_regulations(
    ctx: RunContext[StateDeps[AppState]],
    topic: Optional[str] = None
) -> dict:
    """
    Get information about gas regulations and compliance requirements.

    Args:
        topic: Optional specific topic (e.g., "gas safe", "tolerance", "standards")
    """
    if topic:
        topic_key = topic.lower().replace(" ", "_")
        if "safe" in topic_key or "register" in topic_key:
            return GAS_REGULATIONS["gas_safe"]
        elif "igem" in topic_key or "standard" in topic_key:
            return GAS_REGULATIONS["igem"]
        elif "tolerance" in topic_key or "acceptable" in topic_key:
            return GAS_REGULATIONS["tolerance"]

    # Return all regulations if no specific topic
    return {
        "title": "UK Gas Regulations Overview",
        "regulations": GAS_REGULATIONS,
        "note": "Always refer to current Gas Safe documentation for the latest requirements"
    }


@agent.tool
def explain_calculation(
    ctx: RunContext[StateDeps[AppState]],
    method: str = "metric"
) -> dict:
    """
    Explain how gas rate calculation works step by step.

    Args:
        method: Calculation method ("metric" or "imperial")
    """
    if method.lower() == "imperial":
        return {
            "method": "Imperial (Test Dial)",
            "steps": [
                "1. Turn off all other gas appliances in the property",
                "2. Note the test dial size (0.5, 1, 2, or 5 cu ft)",
                "3. Turn on the appliance at full rate",
                "4. Time one complete revolution of the test dial",
                "5. Calculate: Flow Rate (cu ft/h) = Dial Size × (3600 ÷ seconds)",
                "6. Convert: Flow Rate (m³/h) = cu ft/h × 0.0283168",
                "7. Calculate: Gross kW = m³/h × 39.5 ÷ 3.6",
                "8. Calculate: Net kW = Gross kW ÷ 1.11"
            ],
            "example": {
                "dial_size": "2 cu ft",
                "time": "45 seconds",
                "result": "Flow = 2 × (3600÷45) = 160 cu ft/h = 4.53 m³/h → 49.7 kW gross"
            },
            "tips": [
                "Use the largest dial size for faster appliances",
                "Time multiple revolutions and divide for accuracy"
            ]
        }
    else:
        return {
            "method": "Metric (Meter Readings)",
            "steps": [
                "1. Turn off all other gas appliances in the property",
                "2. Note the meter start reading (include decimals)",
                "3. Turn on the appliance at full rate",
                "4. Time for at least 2 minutes (120 seconds recommended)",
                "5. Note the meter end reading",
                "6. Calculate: Volume (m³) = End - Start",
                "7. Apply correction: Corrected Volume = Volume × 1.02264",
                "8. Calculate: Flow Rate (m³/h) = Corrected Volume × (3600 ÷ seconds)",
                "9. Calculate: Gross kW = Flow Rate × 39.5 ÷ 3.6",
                "10. Calculate: Net kW = Gross kW ÷ 1.11"
            ],
            "example": {
                "start_reading": "1234.567 m³",
                "end_reading": "1234.789 m³",
                "time": "120 seconds",
                "result": "Volume = 0.222 m³ → Corrected = 0.227 m³ → 6.81 m³/h → 74.8 kW gross"
            },
            "tips": [
                "Longer test duration = more accurate result",
                "Include all decimal places from meter",
                "39.5 MJ/m³ is standard UK calorific value"
            ]
        }


@agent.tool
def calculate_gas_rate(
    ctx: RunContext[StateDeps[AppState]],
    method: str,
    volume_or_dial: float,
    time_seconds: float
) -> dict:
    """
    Calculate the gas rate and heat input from the given values.

    Args:
        method: "metric" or "imperial"
        volume_or_dial: For metric: volume in m³ (end - start). For imperial: dial size in cu ft
        time_seconds: Time in seconds for the test
    """
    if time_seconds <= 0:
        return {"error": "Time must be greater than 0"}

    if method.lower() == "imperial":
        # Imperial: convert cu ft to m³
        volume_m3 = volume_or_dial * 0.0283168
    else:
        # Metric: already in m³
        volume_m3 = volume_or_dial

    if volume_m3 <= 0:
        return {"error": "Volume must be greater than 0"}

    # Apply correction factor
    corrected_volume = volume_m3 * CORRECTION_FACTOR

    # Calculate flow rate in m³/h
    flow_rate_m3h = (corrected_volume / time_seconds) * 3600

    # Calculate kW
    gross_kw = (flow_rate_m3h * CALORIFIC_VALUE) / CONVERSION_FACTOR
    net_kw = gross_kw / 1.11

    return {
        "method": method,
        "input_volume": volume_or_dial,
        "time_seconds": time_seconds,
        "flow_rate_m3h": round(flow_rate_m3h, 3),
        "gross_kw": round(gross_kw, 2),
        "net_kw": round(net_kw, 2),
        "note": "Net kW should match appliance data plate rating (±5% tolerance)"
    }


# =====
# FastAPI App Setup
# =====
# Export agent as AG-UI app
ag_ui_app = agent.to_ag_ui(deps=StateDeps(AppState()))

# Main FastAPI app
main_app = FastAPI(title="Gas Rate Calculator Agent", description="AI assistant for gas engineering")

# CORS middleware
main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@main_app.get("/")
def root():
    """Health check endpoint."""
    return {
        "status": "ok",
        "agent": "gas-rate-calculator-agent",
        "endpoints": [
            "/agui (AG-UI for CopilotKit)",
            "/chat/completions (CLM for Hume Voice)",
            "/health"
        ]
    }

@main_app.get("/health")
def health():
    """Health check for Railway."""
    return {"status": "healthy"}


# =====
# CLM Endpoint for Hume Voice
# =====
class ChatMessage(BaseModel):
    role: str
    content: str


class ChatCompletionRequest(BaseModel):
    messages: List[ChatMessage]
    model: Optional[str] = "gas-rate-agent"
    stream: Optional[bool] = True


async def stream_sse_response(content: str, msg_id: str):
    """Stream OpenAI-compatible SSE chunks for Hume EVI."""
    words = content.split(' ')
    for i, word in enumerate(words):
        chunk = {
            "id": msg_id,
            "object": "chat.completion.chunk",
            "created": int(time.time()),
            "model": "gas-rate-agent",
            "choices": [{
                "index": 0,
                "delta": {"content": word + (' ' if i < len(words) - 1 else '')},
                "finish_reason": None
            }]
        }
        yield f"data: {json.dumps(chunk)}\n\n"
        await asyncio.sleep(0.01)

    final = {
        "id": msg_id,
        "object": "chat.completion.chunk",
        "choices": [{"index": 0, "delta": {}, "finish_reason": "stop"}]
    }
    yield f"data: {json.dumps(final)}\n\n"
    yield "data: [DONE]\n\n"


async def run_agent_for_clm(user_message: str) -> str:
    """Run the Pydantic AI agent and return text response."""
    try:
        print(f"[CLM] Starting agent run for: {user_message[:50]}", file=sys.stderr)

        deps = StateDeps(AppState())
        result = await agent.run(user_message, deps=deps)

        if hasattr(result, 'output') and result.output:
            return str(result.output)
        if hasattr(result, 'data') and result.data:
            return str(result.data)
        return str(result)
    except Exception as e:
        import traceback
        print(f"[CLM] Agent error: {e}", file=sys.stderr)
        print(f"[CLM] Traceback: {traceback.format_exc()}", file=sys.stderr)
        return "Sorry, I couldn't process that request. Try asking about gas rate calculations!"


@main_app.post("/chat/completions")
async def clm_endpoint(request: ChatCompletionRequest):
    """OpenAI-compatible endpoint for Hume CLM."""
    # Get user message (last non-system message)
    user_message = ""
    for msg in reversed(request.messages):
        if msg.role == "user":
            user_message = msg.content
            break

    print(f"[CLM] Query: {user_message[:80]}", file=sys.stderr)
    response_text = await run_agent_for_clm(user_message)
    print(f"[CLM] Response: {response_text[:80]}", file=sys.stderr)

    if request.stream:
        msg_id = f"chatcmpl-{uuid.uuid4().hex[:8]}"
        return StreamingResponse(
            stream_sse_response(response_text, msg_id),
            media_type="text/event-stream"
        )
    else:
        return {
            "id": f"chatcmpl-{uuid.uuid4().hex[:8]}",
            "object": "chat.completion",
            "created": int(time.time()),
            "model": "gas-rate-agent",
            "choices": [{
                "index": 0,
                "message": {"role": "assistant", "content": response_text},
                "finish_reason": "stop"
            }]
        }


# Mount AG-UI app for CopilotKit
main_app.mount("/agui", ag_ui_app)

# Export for uvicorn
app = main_app
