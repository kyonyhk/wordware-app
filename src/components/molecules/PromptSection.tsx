import React, { useEffect, useMemo, useRef } from 'react';
import { css } from '../../../styled-system/css';
import {
  AnimatedIconButton,
  InputLabelButton,
  PrimaryButton,
} from '../atoms/buttons';
import { OutputLabelButton, AddBlockButton } from '../atoms/buttons';
import { Delete, Image, Plus } from '../atoms/icons';
import { TextArea } from '../atoms/inputs/TextArea';
import { InputDropdown } from '../atoms/dropdown';
import { usePromptSectionContext } from '@/contexts/PromptSectionContext';
import { useFlowContext } from '@/contexts/FlowContext';
import { useOutputContext } from '@/contexts/OutputContext';
import { useConfirmationModalContext } from '@/contexts/ConfirmationModalContext';
import { useInputContext } from '@/contexts/InputContext';
import { v4 as uuidv4 } from 'uuid';

export interface PromptContent {
  id: string;
  type: 'text' | 'input' | 'type';
  content: string[];
}

interface PromptSectionProps {
  isActive: boolean;
  isFocused: boolean;
  componentId: string;
  onDelete: () => void;
  onFocus: () => void;
}

export function PromptSection({
  isActive,
  isFocused,
  componentId,
  onDelete,
  onFocus,
}: PromptSectionProps) {
  const {
    promptContents,
    setPromptContents,
    handlePromptContentChange,
    handleKeyDown,
    setTextAreaRef,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
    getRequiredInputs,
  } = usePromptSectionContext();

  const { currentFlow, setFocusedSection } = useFlowContext();
  const { openAddGenerationModal } = useOutputContext();
  const { openConfirmationModal } = useConfirmationModalContext();
  const { addInputToPromptSection, deleteRequiredInput } = useInputContext();

  const currentComponent = useMemo(() => {
    return currentFlow?.components.find(
      (component) => component.id === componentId
    );
  }, [currentFlow, componentId]);

  const promptOutput = useMemo(() => {
    return currentComponent?.output &&
      Object.keys(currentComponent.output).length > 0
      ? currentComponent.output
      : null;
  }, [currentComponent]);

  const lastTextAreaRef = useRef<HTMLDivElement | null>(null);

  const currentFlowId = currentFlow?.id;

  const currentPromptContents = useMemo(() => {
    return (
      (currentFlowId && promptContents[currentFlowId]?.[componentId]) || []
    );
  }, [currentFlowId, promptContents, componentId]);

  useEffect(() => {
    if (currentFlowId && componentId && currentPromptContents.length === 0) {
      setPromptContents((prev) => ({
        ...prev,
        [currentFlowId]: {
          ...prev[currentFlowId],
          [componentId]: [{ id: `${Date.now()}`, type: 'text', content: [''] }],
        },
      }));
    }
  }, [
    currentFlowId,
    componentId,
    currentPromptContents.length,
    setPromptContents,
  ]);

  useEffect(() => {
    if (isFocused && lastTextAreaRef.current) {
      lastTextAreaRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(lastTextAreaRef.current);
      range.collapse(false);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [isFocused]);

  const handleFocus = () => {
    onFocus();
  };

  const handleOpenAddGenerationModal = () => {
    onFocus();
    openAddGenerationModal();
  };

  useEffect(() => {
    console.log('isDropdownOpen:', isDropdownOpen);
  }, [isDropdownOpen]);

  const handleAddInputClick = () => {
    console.log('Add Input button clicked for component:', componentId);
    toggleDropdown(componentId);
  };

  const handleInputSelect = (input: {
    name: string;
    description: string;
    type: string;
  }) => {
    addInputToPromptSection({
      ...input,
      requiredInputId: uuidv4(),
    });
    toggleDropdown(componentId);
  };

  const requiredInputs = useMemo(() => {
    const inputs = getRequiredInputs(componentId);
    return Array.isArray(inputs) ? inputs : [];
  }, [getRequiredInputs, componentId]);

  const handleDeleteRequiredInput = (requiredInputId: string) => {
    deleteRequiredInput(componentId, requiredInputId);
  };

  const handleLocalKeyDown = (
    event: React.KeyboardEvent,
    contentId: string,
    index: number
  ) => {
    if (currentFlowId) {
      handleKeyDown(event, currentFlowId, componentId, contentId, index);
    }
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '16px',
        position: 'relative',
        w: '100%',
        bg: isActive ? 'accent.5' : 'scheme1.primaryContainer', // Only change based on isActive prop
        borderRadius: '8px',
        border: '1px solid',
        borderColor: isActive ? 'accent.20' : 'transparent',
        transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
      })}
      onClick={() => onFocus()}
      onFocus={handleFocus}
    >
      <div
        className={css({
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 1,
        })}
      >
        <AnimatedIconButton
          icon={<Delete width={16} height={16} />}
          buttonText="DELETE"
          onClick={onDelete}
        />
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          Prompt
        </div>
        {currentPromptContents.map((content, index) => (
          <div key={content.id}>
            {content.type === 'text' && (
              <TextArea
                ref={(el: HTMLTextAreaElement | null) => {
                  setTextAreaRef(componentId, index)(el);
                  if (index === currentPromptContents.length - 1) {
                    lastTextAreaRef.current = el as unknown as HTMLDivElement;
                  }
                }}
                initialContent={content.content}
                onChange={(newContent) =>
                  currentFlowId &&
                  handlePromptContentChange(
                    currentFlowId,
                    componentId,
                    content.id,
                    newContent
                  )
                }
                onKeyDown={(event) =>
                  handleLocalKeyDown(event, content.id, index)
                }
              />
            )}
          </div>
        ))}
        {requiredInputs.length > 0 && (
          <>
            {requiredInputs.map((input) => (
              <InputLabelButton
                key={input.requiredInputId}
                inputName={input.name}
                inputDescription={input.description}
                inputType={input.type}
                onDelete={() =>
                  handleDeleteRequiredInput(input.requiredInputId)
                }
              />
            ))}
          </>
        )}
        <div className={css({ w: '200px', position: 'relative' })}>
          <PrimaryButton
            leftIcon={<Plus width={16} height={16} />}
            onClick={handleAddInputClick}
          >
            ADD INPUT
          </PrimaryButton>

          {isDropdownOpen === componentId && (
            <div
              ref={dropdownRef}
              className={css({
                position: 'absolute',
                top: '100%',
                left: 0,
                zIndex: 1000,
              })}
            >
              <InputDropdown
                componentId={componentId}
                onInputSelect={handleInputSelect}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          Output
        </div>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '8px',
            width: '100%',
            minHeight: '100px',
          })}
        >
          {promptOutput ? (
            <OutputLabelButton
              outputName={promptOutput.name?.toUpperCase() || ''}
              outputLabel={promptOutput.label || ''}
              outputModel={promptOutput.model?.toUpperCase() || ''}
              onClick={handleOpenAddGenerationModal}
            />
          ) : (
            <AddBlockButton onClick={handleOpenAddGenerationModal}>
              <Plus width={24} height={24} color="text.primary" />
            </AddBlockButton>
          )}
        </div>
      </div>
    </div>
  );
}
