import React, { InputHTMLAttributes, useState, KeyboardEvent } from 'react';
import { css } from '../../../../styled-system/css';
import { BigButton } from '../buttons/BigButton';
import { Image, File, Audio, LongText, Text } from '../icons';

interface GenerationTypeButtonInputProps {
  error?: string;
  value: string;
  onChange?: (value: string) => void;
}

export function GenerationTypeButtonInput({
  error,
  value,
  onChange,
  ...props
}: GenerationTypeButtonInputProps) {
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
          GENERATION TYPE
        </label>
        <div
          className={css({
            textStyle: 'body5',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          Decide the output type of the generation.
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
          icon={renderIcon('SHORT')}
          buttonLabel="SHORT"
          onClick={() => handleTypeSelect('SHORT')}
          isSelected={value === 'SHORT'}
        />
        <BigButton
          icon={renderIcon('SENTENCE')}
          buttonLabel="SENTENCE"
          onClick={() => handleTypeSelect('SENTENCE')}
          isSelected={value === 'SENTENCE'}
        />
        <BigButton
          icon={renderIcon('FULL')}
          buttonLabel="FULL"
          onClick={() => handleTypeSelect('FULL')}
          isSelected={value === 'FULL'}
        />
        <BigButton
          icon={renderIcon('AUDIO')}
          buttonLabel="CUSTOM"
          onClick={() => handleTypeSelect('CUSTOM')}
          isSelected={value === 'CUSTOM'}
        />
      </div>
    </div>
  );
}
