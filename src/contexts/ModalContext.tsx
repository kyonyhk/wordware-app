import { useState, createContext, useContext, ReactNode } from 'react';

interface ModalContextType {}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useFlowContext must be used within a FlowProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // States
  const [inputs, setInputs] = useState<
    Array<{ name: string; description: string; type: string }>
  >([]);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isInputModalFromPromptSection, setIsInputModalFromPromptSection] =
    useState(false);
  const [isAddInstructionModalOpen, setIsAddInstructionModalOpen] =
    useState(false);
  const [isAddFlowModalOpen, setIsAddFlowModalOpen] = useState(false);
  const [editingInputIndex, setEditingInputIndex] = useState<number | null>(
    null
  );

  // Functions

  const value = {
    inputs,
    isInputModalOpen,
    isInputModalFromPromptSection,
    isAddInstructionModalOpen,
    isAddFlowModalOpen,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
