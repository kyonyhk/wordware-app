import { useState, useEffect } from 'react';
import { css } from '../../../../styled-system/css';
import { IconButton, PrimaryButton } from '@/components/atoms/buttons';
import { ArrowRight, Plus } from '@/components/atoms/icons';
import { FlowInput, InstructionInput } from '@/components/atoms/inputs';
import { ModalHeading } from '@/components/atoms/modals';
import { useInstructionContext } from '@/contexts/InstructionContext';
import { useFlowContext } from '@/contexts/FlowContext';

export function AddInstructionModal() {
  const {
    handlePromptClick,
    closeAddInstructionModal,
    isAddInstructionModalOpen,
    showSubFlowOptions,
    setShowSubFlowOptions,
    handleSubFlowClick,
  } = useInstructionContext();

  const { flows, currentFlowId, addFlowSection } = useFlowContext();

  useEffect(() => {
    if (isAddInstructionModalOpen) {
      setShowSubFlowOptions(false);
    }
  }, [isAddInstructionModalOpen, setShowSubFlowOptions]);

  const handleClose = () => {
    setShowSubFlowOptions(false);
    closeAddInstructionModal();
  };

  const availableSubFlows = flows.filter(
    (flow) => !flow.isMainFlow && flow.id !== currentFlowId
  );

  const handleFlowInputClick = (flow: any) => {
    const flowData = {
      name: flow.name,
      description: flow.description,
      requiredInputs: flow.components[0]?.requiredInputs || [],
      finalOutput: flow.finalOutput,
    };
    console.log('Flow data being passed to addFlowSection:', flowData);
    addFlowSection(flowData);
    closeAddInstructionModal();
  };

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
            onClick={handleClose}
          />
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          })}
        >
          <ModalHeading
            modalHeading={
              showSubFlowOptions ? 'ADD A SUB FLOW' : 'ADD AN INSTRUCTION'
            }
            modalDescription={
              showSubFlowOptions
                ? 'Select a Sub Flow to add as an instruction to your flow.'
                : 'Select an instruction to add to your flow.'
            }
          />
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            {showSubFlowOptions ? (
              availableSubFlows.map((flow) => (
                <FlowInput
                  key={flow.id}
                  flowName={flow.name}
                  flowDescription={flow.description}
                  requiredInputs={flow.components[0]?.requiredInputs || []}
                  onClick={() => handleFlowInputClick(flow)}
                />
              ))
            ) : (
              <>
                <InstructionInput
                  icon={<Plus width={24} height={24} />}
                  instructionName="PROMPT"
                  instructionDescription="Write a prompt to generate an output"
                  onClick={handlePromptClick}
                />
                <InstructionInput
                  icon={<Plus width={24} height={24} />}
                  instructionName="SUB FLOW"
                  instructionDescription="Add a sub flow as part of the instruction for this flow"
                  onClick={handleSubFlowClick}
                />
                <InstructionInput
                  icon={<Plus width={24} height={24} />}
                  instructionName="WEB SEARCH WITH EXA"
                  instructionDescription="Query high quality information from the internet"
                  onClick={handleSubFlowClick}
                />
                <InstructionInput
                  icon={<Plus width={24} height={24} />}
                  instructionName="IMAGE GENERATION"
                  instructionDescription="Generate an image with Flux or Stable Diffusion 3"
                  onClick={handleSubFlowClick}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
