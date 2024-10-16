import React, { InputHTMLAttributes, useState, KeyboardEvent } from 'react';
import { css } from '../../../../styled-system/css';
import { BigButton } from '../buttons/BigButton';
import { Image, File, Audio, LongText, Text } from '../icons';

interface ModelButtonInputProps {
  error?: string;
  value: string;
  onChange?: (value: string) => void;
}

export function ModelButtonInput({
  error,
  value,
  onChange,
  ...props
}: ModelButtonInputProps) {
  const handleTypeSelect = (type: string) => {
    if (onChange) {
      onChange(type);
    }
  };

  const renderIcon = (buttonType: string) => {
    const isSelected = value === buttonType;
    const iconColor = isSelected ? '#00D1B2' : '#E0E0E0';
    const iconProps = { width: 16, height: 16, color: iconColor };

    switch (buttonType) {
      case 'TEXT':
        return <Text {...iconProps} />;
      case 'LONG TEXT':
        return <LongText {...iconProps} />;
      case 'IMAGE':
        return <Image {...iconProps} />;
      case 'AUDIO':
        return <Audio {...iconProps} />;
      case 'FILE':
        return <File {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
      >
        <label
          className={css({
            textStyle: 'heading5',
            color: 'text.primary',
          })}
        >
          MODEL
        </label>
        <div
          className={css({
            textStyle: 'body5',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          Choose a model for this generation.
        </div>
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(84px, 1fr))',
          gap: '8px',
        })}
      >
        <BigButton
          icon={renderIcon('O1 Mini')}
          buttonLabel="O1 MINI"
          onClick={() => handleTypeSelect('O1 Mini')}
          isSelected={value === 'O1 Mini'}
        />
        <BigButton
          icon={renderIcon('O1')}
          buttonLabel="O1"
          onClick={() => handleTypeSelect('O1')}
          isSelected={value === 'O1'}
        />
        <BigButton
          icon={renderIcon('GPT-4O Mini')}
          buttonLabel="GPT-4O MINI"
          onClick={() => handleTypeSelect('GPT-4O Mini')}
          isSelected={value === 'GPT-4O Mini'}
        />
        <BigButton
          icon={renderIcon('GPT-4O')}
          buttonLabel="GPT-4O"
          onClick={() => handleTypeSelect('GPT-4O')}
          isSelected={value === 'GPT-4O'}
        />
        <BigButton
          icon={renderIcon('Claude 3 Haiku')}
          buttonLabel="CLAUDE 3 HAIKU"
          onClick={() => handleTypeSelect('Claude 3 Haiku')}
          isSelected={value === 'Claude 3 Haiku'}
        />
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(84px, 1fr))',
          gap: '8px',
        })}
      >
        <BigButton
          icon={renderIcon('Claude 3 Sonnet')}
          buttonLabel="CLAUDE 3 SONNET"
          onClick={() => handleTypeSelect('Claude 3 Sonnet')}
          isSelected={value === 'Claude 3 Sonnet'}
        />
        <BigButton
          icon={renderIcon('Claude 3.5 Sonnet')}
          buttonLabel="CLAUDE 3.5 SONNET"
          onClick={() => handleTypeSelect('Claude 3.5 Sonnet')}
          isSelected={value === 'Claude 3.5 Sonnet'}
        />
        <BigButton
          icon={renderIcon('Claude 3 Opus')}
          buttonLabel="CLAUDE 3 OPUS"
          onClick={() => handleTypeSelect('Claude 3 Opus')}
          isSelected={value === 'Claude 3 Opus'}
        />
        <BigButton
          icon={renderIcon('Gemma 2 9B')}
          buttonLabel="GEMMA 2 9B"
          onClick={() => handleTypeSelect('Gemma 2 9B')}
          isSelected={value === 'Gemma 2 9B'}
        />
        <BigButton
          icon={renderIcon('Gemma 2 27B')}
          buttonLabel="GEMMA 2 27B"
          onClick={() => handleTypeSelect('Gemma 2 27B')}
          isSelected={value === 'Gemma 2 27B'}
        />
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(84px, 1fr))',
          gap: '8px',
        })}
      >
        <BigButton
          icon={renderIcon('Gemini 1.5 Flash')}
          buttonLabel="GEMINI 1.5 FLASH"
          onClick={() => handleTypeSelect('Gemini 1.5 Flash')}
          isSelected={value === 'Gemini 1.5 Flash'}
        />
        <BigButton
          icon={renderIcon('Gemini 1.5 Pro')}
          buttonLabel="GEMINI 1.5 PRO"
          onClick={() => handleTypeSelect('Gemini 1.5 Pro')}
          isSelected={value === 'Gemini 1.5 Pro'}
        />
        <BigButton
          icon={renderIcon('Llama 3.2 3B')}
          buttonLabel="LLAMA 3.2 3B"
          onClick={() => handleTypeSelect('Llama 3.2 3B')}
          isSelected={value === 'Llama 3.2 3B'}
        />
        <BigButton
          icon={renderIcon('Llama 3.2 11B')}
          buttonLabel="LLAMA 3.2 11B"
          onClick={() => handleTypeSelect('Llama 3.2 11B')}
          isSelected={value === 'Llama 3.2 11B'}
        />
        <BigButton
          icon={renderIcon('Llama 3.2 90B')}
          buttonLabel="LLAMA 3.2 90B"
          onClick={() => handleTypeSelect('Llama 3.2 90B')}
          isSelected={value === 'Llama 3.2 90B'}
        />
      </div>
    </div>
  );
}
