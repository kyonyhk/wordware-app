'use client';
import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
  cloneElement,
} from 'react';
import { useFlowContext } from './FlowContext';
import { Flow as FlowType } from '../components/organisms';
import { RequiredInput } from '../components/atoms/inputs';
import { v4 as uuidv4 } from 'uuid'; // Make sure to import uuid

interface PromptContent {
  id: string;
  type: 'text' | 'input' | 'type';
  content: string[];
}

interface InputContextType {
  inputs: Array<{ name: string; description: string; type: string }>;
  isInputModalOpen: boolean;
  setIsInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isInputModalOpenFromPromptSection: boolean;
  setIsInputModalOpenFromPromptSection: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  openInputModal: (index?: number, fromPromptSection?: boolean) => void;
  closeInputModal: () => void;
  handleSaveInput: (
    name: string,
    description: string,
    type: string,
    isFromPromptSection: boolean
  ) => void;
  editingInputIndex: number | null;
  initialInput: { name: string; description: string; type: string } | null;
  handleDeleteInput: () => void;
  onAddInput: (
    flowId: string,
    input: { name: string; description: string; type: string }
  ) => void;
  onAddInputLabel: (newInputLabel: any) => void;
  handleInputEdit: (index: number) => void;
  addInputToPromptSection: (input: {
    requiredInputId: string;
    name: string;
    description: string;
    type: string;
  }) => void;
  closeInputDropdown: () => void;
  deleteRequiredInput: (componentId: string, requiredInputId: string) => void;
}

const InputContext = createContext<InputContextType | undefined>(undefined);

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('useInputContext must be used within a InputProvider');
  }
  return context;
};

export const InputProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // CONTEXT IMPORT
  const { currentFlowId, setFlows, flows, activeSection, focusedSection } =
    useFlowContext();

  // STATES
  const [inputs, setInputs] = useState<
    Array<{ name: string; description: string; type: string }>
  >([]);

  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [
    isInputModalOpenFromPromptSection,
    setIsInputModalOpenFromPromptSection,
  ] = useState(false);

  const [editingInputIndex, setEditingInputIndex] = useState<number | null>(
    null
  );

  const [initialInput, setInitialInput] = useState<{
    name: string;
    description: string;
    type: string;
  } | null>(null);

  // FUNCTIONS
  const openInputModal = useCallback(
    (index?: number, fromPromptSection: boolean = false) => {
      if (index !== undefined) {
        const currentFlow = flows.find((flow) => flow.id === currentFlowId);
        if (currentFlow) {
          setEditingInputIndex(index);
          setInitialInput(currentFlow.inputs[index]);
        }
      } else {
        setEditingInputIndex(null);
        setInitialInput(null);
      }
      setIsInputModalOpen(true);
      setIsInputModalOpenFromPromptSection(fromPromptSection);
    },
    [flows, currentFlowId]
  );

  const closeInputModal = useCallback(() => {
    setIsInputModalOpen(false);
    setIsInputModalOpenFromPromptSection(false);
    setEditingInputIndex(null);
    setInitialInput(null);
  }, []);

  // Not being used right now, missing setFlows
  const onAddInput = useCallback(
    (
      flowId: string,
      input: { name: string; description: string; type: string }
    ) => {
      setFlows((prevFlows) =>
        prevFlows.map((flow) =>
          flow.id === flowId
            ? { ...flow, inputs: [...flow.inputs, input] }
            : flow
        )
      );
    },
    []
  );

  const handleAddInput = useCallback(
    (flowId: string, componentId: string, input: RequiredInput) => {
      setFlows((prevFlows) => {
        console.log('Previous flows:', prevFlows);
        const updatedFlows = prevFlows.map((flow) => {
          if (flow.id === flowId) {
            const updatedComponents = flow.components.map((component) => {
              if (component.id === componentId) {
                const inputWithId = {
                  ...input,
                  requiredInputId: `${componentId}-${Date.now()}`,
                };
                const updatedComponent = {
                  ...component,
                  requiredInputs: Array.isArray(component.requiredInputs)
                    ? [...component.requiredInputs, inputWithId]
                    : [inputWithId],
                };
                return updatedComponent;
              }
              return component;
            });

            const updatedFlow = {
              ...flow,
              components: updatedComponents,
            };
            console.log('Updated flow:', updatedFlow);
            return updatedFlow;
          }
          return flow;
        });
        console.log('Updated flows:', updatedFlows);
        return updatedFlows;
      });
    },
    []
  );

  const handleSaveInput = useCallback(
    (
      name: string,
      description: string,
      type: string,
      isFromPromptSection: boolean
    ) => {
      setFlows((prevFlows) => {
        return prevFlows.map((flow) => {
          if (flow.id === currentFlowId) {
            let updatedInputs;
            if (editingInputIndex !== null) {
              // Editing existing input
              updatedInputs = flow.inputs.map((input, index) =>
                index === editingInputIndex
                  ? { ...input, name, description, type }
                  : input
              );
            } else {
              // Adding new input
              const newInput = {
                id: `input-${Date.now()}`,
                name,
                description,
                type,
              };
              updatedInputs = [...flow.inputs, newInput];
            }

            const updatedFlow = {
              ...flow,
              inputs: updatedInputs,
            };

            if (isFromPromptSection) {
              updatedFlow.components = flow.components.map((component) =>
                component.id === focusedSection.id
                  ? {
                      ...component,
                      requiredInputs: Array.isArray(component.requiredInputs)
                        ? [
                            ...component.requiredInputs,
                            {
                              requiredInputId: `input-${Date.now()}`,
                              name,
                              description,
                              type,
                            },
                          ]
                        : [
                            {
                              requiredInputId: `input-${Date.now()}`,
                              name,
                              description,
                              type,
                            },
                          ],
                    }
                  : component
              );
            }

            return updatedFlow;
          }
          return flow;
        });
      });

      setIsInputModalOpen(false);
      setIsInputModalOpenFromPromptSection(false);
      setEditingInputIndex(null);
      setInitialInput(null);
    },
    [currentFlowId, focusedSection.id, editingInputIndex]
  );

  // Missing PromptContent, setFlows, currentFlowId
  const onAddInputLabel = useCallback(
    (newInputLabel: PromptContent) => {
      setFlows((prevFlows) =>
        prevFlows.map((flow) =>
          flow.id === currentFlowId
            ? {
                ...flow,
                components: flow.components.map((component) =>
                  component.type === 'prompt'
                    ? {
                        ...component,
                        component: cloneElement(component.component, {
                          onAddInputLabel: (label: PromptContent) => {
                            // Update the PromptSection's state with the new input label
                            component.component.props.onAddInputLabel(label);
                          },
                        }),
                      }
                    : component
                ),
              }
            : flow
        )
      );
    },
    [currentFlowId]
  );

  // Might need some logic for handling opening Input Modal from Prompt Section
  // Also, seems like this edit function is not making edits directly to the flow state
  const handleInputEdit = useCallback(
    (index: number) => {
      setEditingInputIndex(index);
      setInitialInput(inputs[index]);
      setIsInputModalOpen(true);
    },
    [inputs]
  );

  // Missing setFlows, currentFlowId
  const handleDeleteInput = useCallback(() => {
    if (editingInputIndex !== null) {
      setFlows((prevFlows) =>
        prevFlows.map((flow) =>
          flow.id === currentFlowId
            ? {
                ...flow,
                inputs: flow.inputs.filter(
                  (_, index) => index !== editingInputIndex
                ),
              }
            : flow
        )
      );
    }
    closeInputModal();
  }, [currentFlowId, editingInputIndex, closeInputModal]);

  const addInputToPromptSection = useCallback(
    (input: {
      requiredInputId: string;
      name: string;
      description: string;
      type: string;
    }) => {
      setFlows((prevFlows) => {
        return prevFlows.map((flow) => {
          if (flow.id === currentFlowId) {
            const updatedFlow = {
              ...flow,
              components: flow.components.map((component) =>
                component.id === focusedSection.id
                  ? {
                      ...component,
                      requiredInputs: Array.isArray(component.requiredInputs)
                        ? [...component.requiredInputs, input]
                        : [input],
                    }
                  : component
              ),
            };
            return updatedFlow;
          }
          return flow;
        });
      });
    },
    [currentFlowId, focusedSection.id, setFlows]
  );

  const closeInputDropdown = useCallback(() => {
    setIsDropdownOpen(false);
    setIsInputModalOpenFromPromptSection(false);
  }, [setIsInputModalOpenFromPromptSection]);

  // Add this useEffect hook in your component
  useEffect(() => {
    console.log('Flows after update:', flows);
  }, [flows]);

  const deleteRequiredInput = useCallback(
    (componentId: string, requiredInputId: string) => {
      setFlows((prevFlows) =>
        prevFlows.map((flow) => {
          if (flow.id === currentFlowId) {
            return {
              ...flow,
              components: flow.components.map((component) => {
                if (component.id === componentId) {
                  return {
                    ...component,
                    requiredInputs: component.requiredInputs.filter(
                      (input) => input.requiredInputId !== requiredInputId
                    ),
                  };
                }
                return component;
              }),
            };
          }
          return flow;
        })
      );
    },
    [currentFlowId, setFlows]
  );

  const value = {
    inputs,
    isInputModalOpen,
    setIsInputModalOpen,
    isInputModalOpenFromPromptSection,
    setIsInputModalOpenFromPromptSection,
    isDropdownOpen,
    setIsDropdownOpen,
    editingInputIndex,
    initialInput,
    openInputModal,
    closeInputModal,
    onAddInput,
    handleSaveInput,
    onAddInputLabel,
    handleInputEdit,
    handleDeleteInput,
    addInputToPromptSection,
    closeInputDropdown,
    deleteRequiredInput,
  };

  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};
