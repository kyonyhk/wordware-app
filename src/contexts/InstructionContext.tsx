'use client';

import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useCallback,
  cloneElement,
} from 'react';
import { useFlowContext } from './FlowContext';
import { useOutputContext } from './OutputContext';
import { FlowSection, PromptSection } from '@/components/molecules';
import { FlowType } from 'typescript';

interface InstructionContextType {
  children: ReactNode;
  isAddInstructionModalOpen: boolean;
  isAddFlowModalOpen: boolean;
  availableFlows: Array<{
    id: string;
    description: string;
    outputName: string;
  }>;
  openAddFlowModal: () => void;
  closeAddFlowModal: () => void;
  openAddInstructionModal: () => void;
  closeAddInstructionModal: () => void;
  handleSaveFlowComponent: (type: string, content: string) => void;
  handlePromptClick: () => void;
  handleSubFlowClick: () => void;
  handleAddSubFlow: (flowName: string, flowDescription: string) => void;
  showSubFlowOptions: string;
}

const InstructionContext = createContext<InstructionContextType | undefined>(
  undefined
);

export const useInstructionContext = () => {
  const context = useContext(InstructionContext);
  if (!context) {
    throw new Error(
      'useInstructionContext must be used within a InstructionProvider'
    );
  }

  return context;
};

export const InstructionProvider: React.FC<InstructionContextType> = ({
  children,
}) => {
  // CONTEXT IMPORT
  const { setFlows, currentFlowId } = useFlowContext();

  const { openAddGenerationModal } = useOutputContext();

  // STATES
  const [isAddInstructionModalOpen, setIsAddInstructionModalOpen] =
    useState(false);

  const [showSubFlowOptions, setShowSubFlowOptions] = useState(false);

  // Might not be needed
  const [isAddFlowModalOpen, setIsAddFlowModalOpen] = useState(false);

  const [availableFlows, setAvailableFlows] = useState<
    Array<{ id: string; description: string; outputName: string }>
  >([]);

  // FUNCTIONS
  const openAddFlowModal = () => {
    setIsAddFlowModalOpen(true);
  };

  const closeAddFlowModal = () => {
    setIsAddFlowModalOpen(false);
  };

  const openAddInstructionModal = () => {
    setShowSubFlowOptions(false);
    setIsAddInstructionModalOpen(true);
  };

  const closeAddInstructionModal = () => {
    setIsAddInstructionModalOpen(false);
    setShowSubFlowOptions(false);
  };

  const handleSaveFlowComponent = (type: string, content: string) => {
    setFlows((prevFlows) => {
      const updatedFlows = prevFlows.map((flow) => {
        if (flow.id === currentFlowId) {
          const newComponent = {
            id: `${type}${flow.components.length + 1}`,
            type: type,
            component:
              type === 'prompt' ? (
                <PromptSection isActive={false} />
              ) : (
                <FlowSection isActive={false} />
              ),
            requiredInputs: {},
            output: {},
          };
          return {
            ...flow,
            components: [...flow.components, newComponent],
          };
        }
        return flow;
      });
      return updatedFlows;
    });
    closeAddFlowModal();
  };

  const handlePromptClick = () => {
    closeAddInstructionModal();
    handleSaveFlowComponent('prompt', 'New Prompt');
  };

  const handleSubFlowClick = () => {
    setShowSubFlowOptions(true);
  };

  const handleAddSubFlow = (flowId: string) => {
    const selectedFlow = availableFlows.find((flow) => flow.id === flowId);
    if (!selectedFlow) return;

    setFlows((prevFlows) =>
      prevFlows.map((flow) => {
        if (flow.id === currentFlowId) {
          const newComponent = {
            id: `flow-${Date.now()}`,
            type: 'flow',
            name: selectedFlow.description,
            description: selectedFlow.description,
            component: (
              <FlowSection
                isActive={false}
                subFlowName={selectedFlow.description}
                subFlowDescription={selectedFlow.description}
                requiredInputs={
                  selectedFlow.components[0]?.requiredInputs || []
                }
                outputName={selectedFlow.outputName || ''}
                outputModel={selectedFlow.outputName || ''}
              />
            ),
            requiredInputs: selectedFlow.components[0]?.requiredInputs || [],
            output: {
              name: selectedFlow.outputName || '',
              model: selectedFlow.outputName || '',
            },
          };
          return {
            ...flow,
            components: [...flow.components, newComponent],
          };
        }
        return flow;
      })
    );
    closeAddInstructionModal();
  };

  const value = {
    isAddInstructionModalOpen,
    isAddFlowModalOpen,
    availableFlows,
    openAddFlowModal,
    closeAddFlowModal,
    openAddInstructionModal,
    closeAddInstructionModal,
    handleSaveFlowComponent,
    handlePromptClick,
    handleSubFlowClick,
    handleAddSubFlow,
    showSubFlowOptions,
    setShowSubFlowOptions,
  };

  return (
    <InstructionContext.Provider value={value}>
      {children}
    </InstructionContext.Provider>
  );
};
