'use client';

import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from 'react';
import { useFlowContext } from './FlowContext';

interface OutputContextType {
  currentEditingOutput: {
    name: string;
    generationType: string;
    label?: string;
    model: string;
  } | null;
  isAddGenerationModalOpen: boolean;
  setIsAddGenerationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openAddGenerationModal: () => void;
  closeAddGenerationModal: () => void;
  handleSaveGeneration: (
    flowId: string,
    componentId: string,
    name: string,
    generationType: string,
    label: string,
    model: string
  ) => void;
  handleDeleteGeneration: () => void;
  updateFinalOutput: (
    flowId: string,
    name: string,
    generationType: string,
    label: string,
    model: string
  ) => void;
}

const OutputContext = createContext<OutputContextType | undefined>(undefined);

export const useOutputContext = () => {
  const context = useContext(OutputContext);
  if (!context) {
    throw new Error('useOutputContext must be used within a OutputProvider');
  }
  return context;
};

export const OutputProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { focusedSection, setFlows, currentFlowId, currentFlow } =
    useFlowContext();

  // STATES
  const [currentEditingOutput, setCurrentEditingOutput] = useState<{
    name: string;
    generationType: string;
    label?: string;
    model: string;
  } | null>(null);

  const [isAddGenerationModalOpen, setIsAddGenerationModalOpen] =
    useState(false);

  // FUNCTION
  const openAddGenerationModal = () => {
    const currentComponent = currentFlow?.components.find(
      (c) => c.id === focusedSection.id
    );

    if (currentComponent?.output) {
      setCurrentEditingOutput({
        name: currentComponent.output.name || '',
        generationType: currentComponent.output.generationType || '',
        label: currentComponent.output.label || '',
        model: currentComponent.output.model || '',
      });
    } else if (focusedSection.id === 'output' && currentFlow?.finalOutput) {
      setCurrentEditingOutput({
        name: currentFlow.finalOutput.name || '',
        generationType: '',
        label: undefined,
        model: currentFlow.finalOutput.model || '',
      });
    } else {
      setCurrentEditingOutput(null);
    }

    setIsAddGenerationModalOpen(true);
  };

  const closeAddGenerationModal = useCallback(() => {
    setIsAddGenerationModalOpen(false);
    setCurrentEditingOutput(null);
  }, []);

  const handleSaveGeneration = useCallback(
    (
      flowId: string,
      componentId: string,
      name: string,
      generationType: string,
      label: string,
      model: string
    ) => {
      setFlows((prevFlows) =>
        prevFlows.map((flow) => {
          if (flow.id === flowId) {
            const updatedComponents = flow.components.map((component) =>
              component.id === componentId
                ? {
                    ...component,
                    output: { name, generationType, label, model },
                  }
                : component
            );

            const isLastComponent =
              componentId ===
              updatedComponents[updatedComponents.length - 1].id;

            return {
              ...flow,
              components: updatedComponents,
              finalOutput: isLastComponent ? { name, model } : flow.finalOutput,
            };
          }
          return flow;
        })
      );
      setCurrentEditingOutput(null);
      closeAddGenerationModal();
    },
    [setFlows, closeAddGenerationModal]
  );

  const handleDeleteGeneration = useCallback(
    (flowId: string, componentId: string) => {
      setFlows((prevFlows) =>
        prevFlows.map((flow) => {
          if (flow.id === flowId) {
            const updatedComponents = flow.components.map((component) => {
              if (component.id === componentId) {
                const { output, ...restComponent } = component;
                return restComponent;
              }
              return component;
            });
            return { ...flow, components: updatedComponents };
          }
          return flow;
        })
      );
      closeAddGenerationModal();
    },
    [setFlows]
  );

  const updateFinalOutput = useCallback(
    (
      flowId: string,
      name: string,
      generationType: string,
      label: string,
      model: string
    ) => {
      setFlows((prevFlows) =>
        prevFlows.map((flow) => {
          if (flow.id === flowId) {
            const updatedComponents = flow.components.map(
              (component, index) => {
                if (index === flow.components.length - 1) {
                  return {
                    ...component,
                    output: {
                      name,
                      generationType,
                      label,
                      model,
                    },
                  };
                }
                return component;
              }
            );

            return {
              ...flow,
              components: updatedComponents,
              finalOutput: {
                name,
                model,
              },
            };
          }
          return flow;
        })
      );
    },
    []
  );

  const value: OutputContextType = {
    currentEditingOutput,
    isAddGenerationModalOpen,
    setIsAddGenerationModalOpen,
    openAddGenerationModal,
    closeAddGenerationModal,
    handleSaveGeneration,
    handleDeleteGeneration,
    updateFinalOutput,
  };

  return (
    <OutputContext.Provider value={value}>{children}</OutputContext.Provider>
  );
};
