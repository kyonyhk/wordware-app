'use client';

import { useState, useCallback } from 'react';
import { DescriptionRoast } from '@/components/molecules/flows/DescriptionRoast';

interface DescriptionRoastHomeProps {
  initialInputs?: Array<{ name: string; description: string; type: string }>;
  initialFlowName?: string;
  initialActiveSection?: string;
}

export default function DescriptionRoastHome({
  initialInputs = [],
  initialFlowName = '',
  initialActiveSection = 'flowDetails',
}: DescriptionRoastHomeProps) {
  const [inputs, setInputs] = useState(initialInputs);
  const [currentFlowName, setCurrentFlowName] = useState(initialFlowName);
  const [activeSection, setActiveSection] = useState(initialActiveSection);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [editingInputIndex, setEditingInputIndex] = useState<number | null>(
    null
  );

  const handleInputsChange = (
    newInputs: Array<{ name: string; description: string; type: string }>
  ) => {
    setInputs(newInputs);
  };

  const handleFlowNameChange = (newName: string) => {
    setCurrentFlowName(newName);
  };

  const handleActiveSectionChange = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  const openInputModal = (index?: number) => {
    if (index !== undefined) {
      setEditingInputIndex(index);
    } else {
      setEditingInputIndex(null);
    }
    setIsInputModalOpen(true);
  };

  const closeInputModal = () => setIsInputModalOpen(false);

  const handleInputEdit = useCallback(
    (index: number) => {
      setEditingInputIndex(index);
      setIsInputModalOpen(true);
    },
    [inputs]
  );

  return (
    <div>
      <DescriptionRoast
        isOpen={true}
        inputs={inputs}
        currentFlowName={currentFlowName}
        onFlowNameChange={handleFlowNameChange}
        activeSection={activeSection}
        onActiveSectionChange={handleActiveSectionChange}
        onInputEdit={handleInputEdit}
        onClose={closeInputModal}
        openInputModal={openInputModal}
        onInputsChange={handleInputsChange}
      />
    </div>
  );
}
