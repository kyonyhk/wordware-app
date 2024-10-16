'use client';

import { useState } from 'react';
import { StepOne } from '../StepOne';
import { StepTwo } from '../StepTwo';
import { PromptSection, PromptContent } from '../PromptSection';
import { Divider } from '@/components/atoms/divider';
import { v4 as uuidv4 } from 'uuid';
import { DropdownCell } from '@/components/atoms/dropdown/DropdownCell';
import { Image } from '@/components/atoms/icons';
import { css } from '../../../../styled-system/css';
import { Dropdown } from '@/components/atoms/dropdown';
import { InputModal } from '../modals';

interface DescriptionRoastProps {
  inputs: Array<{ name: string; description: string; type: string }>;
  openInputModal?: () => void; // Make this optional
  currentFlowName: string;
  onFlowNameChange: (newName: string) => void;
  onActiveSectionChange: (section: string) => void;
  activeSection: string;
  onInputEdit: (index: number) => void;
  onClose: () => void;
  onInputsChange: (
    newInputs: Array<{ name: string; description: string; type: string }>
  ) => void;
  isOpen: boolean;
}

export function DescriptionRoast({
  inputs,
  currentFlowName,
  onFlowNameChange,
  onActiveSectionChange,
  activeSection,
  onInputEdit,
  onClose,
  isOpen,
  openInputModal: externalOpenInputModal, // Rename to avoid conflicts
  onInputsChange,
}: DescriptionRoastProps) {
  const initialPromptContents: PromptContent[] = [
    { id: uuidv4(), type: 'text', content: [] },
  ];

  const iconColor = '#E0E0E0';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [editingInputIndex, setEditingInputIndex] = useState<number | null>(
    null
  );
  const [initialInput, setInitialInput] = useState<{
    name: string;
    description: string;
    type: string;
  } | null>(null);

  const handleAddNewInput = () => {
    setIsInputModalOpen(true);
    setEditingInputIndex(null);
    setInitialInput(null);
    setIsDropdownOpen(false);
  };

  const openInputModal = () => {
    if (externalOpenInputModal) {
      externalOpenInputModal();
    } else {
      setIsInputModalOpen(true);
    }
  };

  const closeInputModal = () => {
    setIsInputModalOpen(false);
  };

  const handleSaveInput = (name: string, description: string, type: string) => {
    if (editingInputIndex !== null) {
      // Edit existing input
      const updatedInputs = [...inputs];
      updatedInputs[editingInputIndex] = { name, description, type };
      onInputsChange(updatedInputs);
    } else {
      // Add new input
      onInputsChange([...inputs, { name, description, type }]);
    }
    closeInputModal();
  };

  return (
    <div>
      <StepOne />
      <Divider />
      <StepTwo />
      <PromptSection
        title="Prompt"
        initialContents={initialPromptContents}
        isActive={true}
        inputs={inputs}
        onAddInput={handleAddNewInput}
      />
      {isInputModalOpen && (
        <div
          className={css({
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '556px',
            zIndex: 1000,
          })}
        >
          <InputModal
            isOpen={isOpen}
            initialInput={initialInput}
            editIndex={editingInputIndex}
            onClose={closeInputModal}
            onSave={handleSaveInput}
          />
        </div>
      )}
    </div>
  );
}
