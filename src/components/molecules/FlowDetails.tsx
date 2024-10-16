'use client';

import React, { useState, useEffect, useRef } from 'react';
import { css } from '../../../styled-system/css';
import { AddBlockButton, InputButton } from '../atoms/buttons';
import { Plus, Image, Text, LongText, Audio, File } from '../atoms/icons';
import { useFlowContext } from '@/contexts/FlowContext';
import { useInputContext } from '@/contexts/InputContext';

interface FlowDetailsProps {
  isActive: boolean;
  onInputEdit: (index: number) => void;
}

export function FlowDetails({ isActive, onInputEdit }: FlowDetailsProps) {
  const { currentFlow, updateFlowName, updateFlowDescription } =
    useFlowContext();
  const { openInputModal } = useInputContext();

  const [flowName, setFlowName] = useState(currentFlow?.name || '');
  const [flowDescription, setFlowDescription] = useState(
    currentFlow?.description || ''
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const getIconForInputType = (type: string) => {
    switch (type.toUpperCase()) {
      case 'IMAGE':
        return <Image width={24} height={24} color="text.primary" />;
      case 'TEXT':
        return <Text width={24} height={24} color="text.primary" />;
      case 'FILE':
        return <File width={24} height={24} color="text.primary" />;
      case 'LONG TEXT':
        return <LongText width={24} height={24} color="text.primary" />;
      case 'AUDIO':
        return <Audio width={24} height={24} color="text.primary" />;
      default:
        return <Plus width={24} height={24} color="text.primary" />;
    }
  };

  useEffect(() => {
    if (currentFlow) {
      setFlowName(currentFlow.name);
      setFlowDescription(currentFlow.description);
    }
  }, [currentFlow]);

  const handleFlowNameClick = () => {
    setIsEditingName(true);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleFlowDescriptionClick = () => {
    setIsEditingDescription(true);
    setTimeout(() => descriptionInputRef.current?.focus(), 0);
  };

  const handleFlowNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFlowName(newName);
    if (currentFlow) {
      updateFlowName(currentFlow.id, newName);
    }
  };

  const handleFlowDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDescription = e.target.value;
    setFlowDescription(newDescription);
    if (currentFlow) {
      updateFlowDescription(currentFlow.id, newDescription);
    }
  };

  const handleFlowNameBlur = () => {
    setIsEditingName(false);
  };

  const handleFlowDescriptionBlur = () => {
    setIsEditingDescription(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFlowNameBlur();
    }
  };

  const handleDescriptionKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFlowDescriptionBlur();
    }
  };

  const handleInputEdit = (index: number) => {
    onInputEdit(index);
  };

  const editableTextClass = css({
    cursor: 'text !important',
    '&:hover': {
      cursor: 'text !important',
    },
  });

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '24px',
        padding: '16px',
        bg: isActive ? 'accent.5' : 'scheme1.primaryContainer',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: isActive ? 'accent.20' : 'transparent',
        w: '100%',
      })}
    >
      {/* Heading */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          w: '100%',
        })}
      >
        {isEditingName ? (
          <input
            ref={nameInputRef}
            type="text"
            value={flowName}
            onChange={handleFlowNameChange}
            onBlur={handleFlowNameBlur}
            onKeyDown={handleNameKeyDown}
            className={css({
              textStyle: 'heading2',
              bg: 'transparent',
              border: 'none',
              outline: 'none',
              w: '100%',
              color: 'text.primary',
            })}
          />
        ) : (
          <div
            onClick={handleFlowNameClick}
            className={`${css({
              textStyle: 'heading2',
              cursor: 'text',
              w: '100%',
              color: flowName ? 'text.primary' : 'text.secondary',
              opacity: flowName ? 1.0 : 0.2,
              _hover: {
                opacity: 0.5,
              },
            })} ${editableTextClass}`}
          >
            {flowName || 'Name this flow'}
          </div>
        )}
        {isEditingDescription ? (
          <input
            ref={descriptionInputRef}
            type="text"
            value={flowDescription}
            onChange={handleFlowDescriptionChange}
            onBlur={handleFlowDescriptionBlur}
            onKeyDown={handleDescriptionKeyDown}
            placeholder="Add a description for this flow"
            className={css({
              textStyle: 'body4',
              bg: 'transparent',
              border: 'none',
              outline: 'none',
              w: '100%',
              color: 'text.primary',
              opacity: 1.0,
            })}
          />
        ) : (
          <div
            onClick={handleFlowDescriptionClick}
            className={`${css({
              textStyle: 'body4',
              w: '100%',
              cursor: 'text',
              color: flowDescription ? 'text.primary' : 'text.secondary',
              opacity: flowDescription ? 0.5 : 0.1,
              _hover: {
                opacity: 0.3,
              },
            })} ${editableTextClass}`}
          >
            {flowDescription || 'Add a description for this flow'}
          </div>
        )}
      </div>

      {/* Input Heading */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
      >
        <div className={css({ textStyle: 'heading5' })}>Inputs</div>
        <div className={css({ textStyle: 'body5', opacity: 0.5 })}>
          Inputs are elements that you plan to add to the instructions that you
          want the AI to execute.{' '}
        </div>
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
        {currentFlow?.inputs.map((input, index) => (
          <InputButton
            key={index}
            name={input.name.toUpperCase()}
            description={input.description}
            type={input.type}
            onClick={() => openInputModal(index)}
          />
        ))}
        <AddBlockButton onClick={() => openInputModal()}>
          <Plus width={24} height={24} color="text.primary" />
        </AddBlockButton>
      </div>
    </div>
  );
}
