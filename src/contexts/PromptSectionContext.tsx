'use client';

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useInputContext } from './InputContext';
import { useFlowContext } from './FlowContext';

interface PromptContent {
  id: string;
  type: 'text' | 'input' | 'type';
  content: string[];
}

interface PromptSectionContextType {
  promptContents: {
    [flowId: string]: { [componentId: string]: PromptContent[] };
  };
  setPromptContents: React.Dispatch<
    React.SetStateAction<{
      [flowId: string]: { [componentId: string]: PromptContent[] };
    }>
  >;
  isDropdownOpen: string | null;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<string | null>>;
  handlePromptContentChange: (
    flowId: string,
    componentId: string,
    contentId: string,
    newContent: string[]
  ) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  textAreaRefs: React.MutableRefObject<{
    [key: string]: HTMLTextAreaElement | null;
  }>;
  setTextAreaRef: (
    componentId: string,
    index: number
  ) => (el: HTMLTextAreaElement | null) => void;
  closeInputDropdown: () => void;
  openNewInputModal: () => void;
  addInputToPrompt: (input: {
    requiredInputId: string;
    name: string;
    description: string;
    type: string;
  }) => void;
  handleKeyDown: (
    event: React.KeyboardEvent,
    flowId: string,
    componentId: string,
    contentId: string,
    index: number
  ) => void;
  requiredInputs: Array<{ name: string; description: string; type: string }>;
  toggleDropdown: (componentId: string) => void;
  getRequiredInputs: (componentId: string) => Array<{
    requiredInputId: string;
    name: string;
    description: string;
    type: string;
  }>;
}

const PromptSectionContext = createContext<
  PromptSectionContextType | undefined
>(undefined);

export const usePromptSectionContext = () => {
  const context = useContext(PromptSectionContext);
  if (!context) {
    throw new Error(
      'usePromptSectionContext must be used within a PromptSectionProvider'
    );
  }
  return context;
};

export const PromptSectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // CONTEXT IMPORT
  const {
    openInputModal,
    setIsInputModalOpenFromPromptSection,
    addInputToPromptSection,
  } = useInputContext();

  const { flows, setFlows, currentFlowId, activeSection, focusedSection } =
    useFlowContext();

  // STATES

  const currentFlow = flows.find((flow) => flow.id === currentFlowId) || null;

  const currentComponent =
    currentFlow?.components?.find((c) => c.id === focusedSection.id) || null;

  if (!currentFlow) {
    console.warn('No current flow found');
  }

  if (!currentComponent) {
    console.warn('No current component found');
  }

  const requiredInputs = currentComponent?.requiredInputs || [];

  const [promptContents, setPromptContents] = useState<{
    [flowId: string]: { [componentId: string]: PromptContent[] };
  }>({});

  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);

  // REFS
  const dropdownRef = useRef<HTMLDivElement>(null);

  const textAreaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>(
    {}
  );

  const setTextAreaRef = useCallback(
    (componentId: string, index: number) =>
      (element: HTMLTextAreaElement | null) => {
        textAreaRefs.current[`${componentId}-${index}`] = element;
      },
    []
  );

  // USE EFFECTS
  useEffect(() => {
    if (currentFlow && currentFlow.components) {
      setPromptContents((prevContents) => {
        const newPromptContents = { ...prevContents };
        if (!newPromptContents[currentFlow.id]) {
          newPromptContents[currentFlow.id] = {};
        }
        currentFlow.components.forEach((component) => {
          if (
            component.type === 'prompt' &&
            !newPromptContents[currentFlow.id][component.id]
          ) {
            newPromptContents[currentFlow.id][component.id] = (component as any)
              .promptContents || [
              { id: `${Date.now()}`, type: 'text', content: [''] },
            ];
          }
        });
        return newPromptContents;
      });
    }
  }, [currentFlow]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // FUNCTIONS
  const toggleDropdown = useCallback((componentId: string) => {
    setIsDropdownOpen((prev) => {
      const newState = prev === componentId ? null : componentId;
      console.log(
        'Toggling dropdown for component:',
        componentId,
        'New state:',
        newState
      );
      return newState;
    });
  }, []);

  const handlePromptContentChange = useCallback(
    (
      flowId: string,
      componentId: string,
      contentId: string,
      newContent: string[]
    ) => {
      setPromptContents((prevContents) => ({
        ...prevContents,
        [flowId]: {
          ...prevContents[flowId],
          [componentId]: (prevContents[flowId]?.[componentId] || []).map(
            (content) =>
              content.id === contentId
                ? { ...content, content: newContent }
                : content
          ),
        },
      }));
    },
    []
  );

  const closeInputDropdown = useCallback(() => {
    setIsDropdownOpen(null);
    setIsInputModalOpenFromPromptSection(false);
  }, [setIsInputModalOpenFromPromptSection]);

  const openNewInputModal = useCallback(() => {
    setIsInputModalOpenFromPromptSection(true);
    openInputModal(undefined, true);
  }, [openInputModal, setIsInputModalOpenFromPromptSection]);

  const addInputToPrompt = useCallback(
    (input: {
      requiredInputId: string;
      name: string;
      description: string;
      type: string;
    }) => {
      if (currentFlow && focusedSection.id) {
        setFlows((prevFlows) =>
          prevFlows.map((flow) =>
            flow.id === currentFlow.id
              ? {
                  ...flow,
                  inputs: [...flow.inputs, input],
                  components: flow.components.map((component) =>
                    component.id === focusedSection.id
                      ? {
                          ...component,
                          requiredInputs: [
                            ...(component.requiredInputs || []),
                            input,
                          ],
                        }
                      : component
                  ),
                }
              : flow
          )
        );
      }
      setIsDropdownOpen(null);
    },
    [currentFlow, focusedSection.id, setFlows]
  );

  const handleAddInput = (input: {
    name: string;
    description: string;
    type: string;
  }) => {
    addInputToPromptSection({
      ...input,
      requiredInputId: uuidv4(), // Add this line
    });
    closeInputDropdown();
  };

  const handleKeyDown = useCallback(
    (
      event: React.KeyboardEvent,
      flowId: string,
      componentId: string,
      contentId: string,
      index: number
    ) => {
      if (event.key === 'Backspace') {
        setPromptContents((prevContents) => {
          const flowContents = prevContents[flowId] || {};
          const componentContents = flowContents[componentId] || [];

          if (componentContents.length === 0) {
            return prevContents;
          }

          const currentContent = componentContents[index];

          if (
            currentContent.content[0] === '' &&
            componentContents.length > 1
          ) {
            // Remove the current empty content
            const updatedComponentContents = componentContents.filter(
              (_, i) => i !== index
            );

            return {
              ...prevContents,
              [flowId]: {
                ...flowContents,
                [componentId]: updatedComponentContents,
              },
            };
          }

          // If it's not an empty content, let the default backspace behavior happen
          return prevContents;
        });
      }

      if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
        event.preventDefault();
        // Select all text within the current PromptSection
        const selection = window.getSelection();
        const range = document.createRange();
        const componentTextAreas = Object.entries(textAreaRefs.current)
          .filter(([key]) => key.startsWith(`${componentId}-`))
          .map(([, el]) => el)
          .filter((el): el is HTMLTextAreaElement => el !== null);

        if (componentTextAreas.length > 0) {
          range.setStartBefore(componentTextAreas[0]);
          range.setEndAfter(componentTextAreas[componentTextAreas.length - 1]);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
        return;
      }

      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const newContent: PromptContent = {
          id: uuidv4(),
          type: 'text',
          content: [''],
        };

        setPromptContents((prevContents) => {
          const flowContents = prevContents[flowId] || {};
          const componentContents = flowContents[componentId] || [];

          return {
            ...prevContents,
            [flowId]: {
              ...flowContents,
              [componentId]: [
                ...componentContents.slice(0, index + 1),
                newContent,
                ...componentContents.slice(index + 1),
              ],
            },
          };
        });

        setTimeout(() => {
          const newTextArea =
            textAreaRefs.current[`${componentId}-${index + 1}`];
          if (newTextArea) {
            newTextArea.focus();
          }
        }, 0);
      } else if (
        (event.key === 'ArrowUp' && index > 0) ||
        (event.key === 'ArrowDown' &&
          index < (promptContents[flowId]?.[componentId]?.length || 0) - 1)
      ) {
        event.preventDefault();
        const targetIndex = event.key === 'ArrowUp' ? index - 1 : index + 1;
        const targetTextArea =
          textAreaRefs.current[`${componentId}-${targetIndex}`];
        if (targetTextArea) {
          targetTextArea.focus();
          const range = document.createRange();
          range.selectNodeContents(targetTextArea);
          range.collapse(false);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    },
    [promptContents]
  );

  const getRequiredInputs = useCallback(
    (componentId: string) => {
      const component = currentFlow?.components.find(
        (c) => c.id === componentId
      );
      return Array.isArray(component?.requiredInputs)
        ? component.requiredInputs
        : [];
    },
    [currentFlow]
  );

  const value: PromptSectionContextType = {
    promptContents,
    setPromptContents,
    isDropdownOpen,
    setIsDropdownOpen,
    handlePromptContentChange,
    dropdownRef,
    textAreaRefs,
    setTextAreaRef,
    closeInputDropdown,
    openNewInputModal,
    addInputToPrompt,
    handleKeyDown,
    requiredInputs,
    toggleDropdown,
    getRequiredInputs,
  };

  return (
    <PromptSectionContext.Provider value={value}>
      {children}
    </PromptSectionContext.Provider>
  );
};
