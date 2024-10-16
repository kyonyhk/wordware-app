import React, { useEffect } from 'react';
import { css } from '../../../../styled-system/css';
import { IconButton } from '@/components/atoms/buttons';
import { ArrowRight } from '@/components/atoms/icons';
import { FlowInput } from '@/components/atoms/inputs';
import { ModalHeading } from '@/components/atoms/modals';
import { useInstructionContext } from '@/contexts/InstructionContext';

interface AddFlowModalProps {
  onClose: () => void;
  onSubFlowSelect: (flowId: string) => void;
  availableFlows: Array<{
    id: string;
    name: string;
    description: string;
    components: Array<{
      requiredInputs: any[];
    }>;
  }>;
}

export function AddFlowModal({ onClose, availableFlows }: AddFlowModalProps) {
  const { handleAddSubFlow } = useInstructionContext();

  useEffect(() => {
    console.log('AddFlowModal - availableFlows:', availableFlows);
  }, [availableFlows]);

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        h: '700px',
        w: '540px',
        border: '1px solid',
        borderColor: 'scheme1.border',
        borderRadius: '8px',
        padding: '16px 24px',
        bg: 'scheme1.primaryContainer',
        backdropFilter: 'blur(8px)',
        boxShadow: '0px 0 50px rgba(0, 0, 0, 0.5)',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        })}
      >
        {/* Arrow Container */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          })}
        >
          <IconButton
            icon={<ArrowRight width={24} height={24} />}
            onClick={onClose}
          />
        </div>
        <ModalHeading
          modalHeading="ADD A SUB FLOW"
          modalDescription="Select a Sub Flow to add as an instruction to your flow."
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          {availableFlows.map((flow) => (
            <FlowInput
              key={flow.id}
              flowName={flow.name}
              flowDescription={flow.description}
              requiredInputs={flow.components[0]?.requiredInputs || []}
              onClick={() => onSubFlowSelect(flow.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
