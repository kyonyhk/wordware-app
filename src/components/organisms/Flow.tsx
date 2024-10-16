import React from 'react';
import { css } from '../../../styled-system/css';

export interface Flow {
  id: string;
  name: string;
  description: string;
  inputs: Array<{ name: string; description: string; type: string }>;
  components: Array<{
    id: string;
    type: string;
    component: React.ReactElement;
    name: string;
    description: string;
    requiredInputs: Array<{
      requiredInputId: string;
      name: string;
      description: string;
      type: string;
      selectedInput?: {
        name: string;
        generationType?: string;
        label?: string;
        type?: string;
        model?: string;
        parentComponent?: string;
      };
    }>;
    output?: {
      name?: string;
      generationType?: string;
      label?: string;
      type?: string;
      model?: string;
      parentComponent?: string;
    };
  }>;
  finalOutput: {
    name?: string;
    model?: string;
  };
  isMainFlow: boolean;
}

interface FlowProps {
  flows: Flow[];
  currentFlowId: string;
  onFlowChange: (flowId: string) => void;
  activeSection: string;
}

export function Flow({
  flows,
  currentFlowId,
  onFlowChange,
  activeSection,
}: FlowProps) {
  const currentFlow = flows.find((flow) => flow.id === currentFlowId);

  if (!currentFlow) {
    return <div>No flow selected</div>;
  }

  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '16px' })}
    >
      {currentFlow.components.map((component, index) => (
        <React.Fragment key={index}>
          {React.cloneElement(component.component, {
            isActive: activeSection === component.type,
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
