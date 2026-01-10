import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { HttpAgent } from "@ag-ui/client";
import { NextRequest } from "next/server";

// Use empty adapter since we're only using one agent
const serviceAdapter = new ExperimentalEmptyAdapter();

// Create the CopilotRuntime with our Pydantic AI agent
const runtime = new CopilotRuntime({
  agents: {
    // Local development: http://localhost:8000/agui/
    // Production: Railway URL
    gas_agent: new HttpAgent({
      url: process.env.AGENT_URL || "https://gas-rate-agent-production.up.railway.app/agui/"
    }),
  },
});

// Next.js API route handler
export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
