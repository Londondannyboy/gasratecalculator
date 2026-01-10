'use client';

import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';

// Get initial message
function getInitialMessage(): string {
  return `Hi! I'm your Gas Safe engineering assistant. I can help you with:

• **Gas rate calculations** - metric or imperial methods
• **Appliance info** - typical kW ranges for boilers, fires, hobs
• **Troubleshooting** - when readings don't match data plates
• **Regulations** - Gas Safe compliance and tolerances

What would you like help with?`;
}

function CopilotWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit" agent="gas_agent">
      <CopilotSidebar
        labels={{
          title: "Gas Safe Assistant",
          initial: getInitialMessage(),
        }}
        defaultOpen={false}
        className="gas-copilot-sidebar"
      >
        {children}
      </CopilotSidebar>
    </CopilotKit>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <CopilotWrapper>{children}</CopilotWrapper>;
}
