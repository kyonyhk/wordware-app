'use client';

import { useState, useEffect, useCallback } from 'react';
import { css } from '../../../../styled-system/css';
import { IconButton, PrimaryButton } from '@/components/atoms/buttons';
import { ArrowRight, Delete } from '@/components/atoms/icons';
import { ModalHeading } from '@/components/atoms/modals/ModalHeading';
import { TextInput } from '@/components/atoms/inputs';
import { ButtonInput } from '@/components/atoms/inputs/ButtonInput';
import { useInputContext } from '@/contexts/InputContext';
import { useModalClose } from '@/hooks/useModalClose';

interface InputModalProps {}

export function InputModal({ ...props }: InputModalProps) {
  const {
    isInputModalOpen,
    closeInputModal,
    handleSaveInput,
    editingInputIndex,
    initialInput,
    handleDeleteInput,
    isInputModalOpenFromPromptSection,
  } = useInputContext();

  console.log(
    'InputModal rendered, isInputModalOpenFromPromptSection:',
    isInputModalOpenFromPromptSection
  );

  const [inputName, setInputName] = useState(initialInput?.name || '');
  const [inputDescription, setInputDescription] = useState(
    initialInput?.description || ''
  );
  const [inputType, setInputType] = useState(
    initialInput?.type?.replace('TYPE - ', '') || ''
  );

  useEffect(() => {
    if (initialInput) {
      setInputName(initialInput.name);
      setInputDescription(initialInput.description);
      setInputType(initialInput.type.replace('TYPE - ', ''));
    } else {
      clearInputs();
    }
  }, [initialInput]);

  const clearInputs = () => {
    setInputName('');
    setInputDescription('');
    setInputType('');
  };

  const saveInputAndClose = () => {
    const formattedInputType = `TYPE - ${inputType}`;
    handleSaveInput(
      inputName,
      inputDescription,
      formattedInputType,
      isInputModalOpenFromPromptSection
    );
    clearInputs();
    closeInputModal();
  };

  const closeModalAndClearInputs = () => {
    console.log('closeModalAndClearInputs called');
    clearInputs();
    closeInputModal();
  };

  const deleteInputAndClose = () => {
    handleDeleteInput();
    clearInputs();
    closeInputModal();
  };

  useEffect(() => {
    if (initialInput) {
      setInputName(initialInput.name);
      setInputDescription(initialInput.description);
      setInputType(initialInput.type.replace('TYPE - ', ''));
    } else {
      clearInputs();
    }
  }, [initialInput]);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModalAndClearInputs();
    }
  }, []);

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('keydown', handleEscapeKey);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);

  const deleteColor = 'red.100';

  const modalRef = useModalClose({
    isOpen: isInputModalOpen,
    onClose: closeInputModal,
  });

  return (
    <div
      ref={modalRef}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        h: '700px',
        w: '540px',
        border: '1px solid',
        borderColor: 'scheme1.border',
        borderRadius: '8px',
        padding: '16px 24px 40px',
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
            onClick={closeModalAndClearInputs}
          />
        </div>

        {/* Main Content */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          })}
        >
          {/* Input Heading & Description */}
          <ModalHeading
            modalHeading="INPUT"
            modalDescription="Inputs needs to be passed in when the program is running. They can come from a user or be populated by another prompt program."
          />

          {/* Input Fields */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            })}
          >
            {/* Name */}
            <TextInput
              inputLabel="INPUT"
              inputDescription="Name this input"
              placeholder="Name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />

            {/* Description */}
            <TextInput
              inputLabel="DESCRIPTION"
              inputDescription="Describe what data should be given"
              placeholder="Description"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
            />

            {/* Input Type */}
            <ButtonInput
              inputLabel="INPUT TYPE"
              inputDescription="Configure the input type"
              value={inputType}
              onChange={setInputType}
            />
          </div>
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          w: '100%',
        })}
      >
        <div
          className={css({
            w: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            width: '200px',
          })}
        >
          <PrimaryButton
            onClick={saveInputAndClose}
            className={css({
              w: '100%',
              border: '1px solid',
              borderColor: 'accent.20',
              bgGradient: 'teal.20',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              _hover: {
                borderColor: 'accent.100',
                bgGradient: 'teal.50',
                color: 'accent.100',
              },
            })}
          >
            {editingInputIndex !== null ? 'UPDATE' : 'SAVE'}
          </PrimaryButton>
          {editingInputIndex !== null && (
            <PrimaryButton
              variant="delete"
              leftIcon={<Delete width={16} height={16} color={deleteColor} />}
              className={css({ w: '200px' })}
              onClick={deleteInputAndClose}
            >
              DELETE
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
