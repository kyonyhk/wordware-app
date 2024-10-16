import React, { InputHTMLAttributes, useState, KeyboardEvent } from 'react';
import { css } from '../../../../styled-system/css';
import { BigButton } from '../buttons/BigButton';
import { Image, File, Audio, LongText, Text } from '../icons';

interface ButtonInputProps {
  inputLabel?: string;
  inputDescription?: string;
  error?: string;
  value: string;
  onChange?: (value: string) => void;
}

export function ButtonInput({
  inputLabel,
  inputDescription,
  error,
  value,
  onChange,
  ...props
}: ButtonInputProps) {
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
        {inputLabel && (
          <label
            className={css({
              textStyle: 'heading5',
              color: 'text.primary',
            })}
          >
            {inputLabel}
          </label>
        )}
        <div
          className={css({
            textStyle: 'body5',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          {inputDescription}
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
          icon={renderIcon('TEXT')}
          buttonLabel="TEXT"
          onClick={() => handleTypeSelect('TEXT')}
          isSelected={value === 'TEXT'}
        />
        <BigButton
          icon={renderIcon('LONG TEXT')}
          buttonLabel="LONG TEXT"
          onClick={() => handleTypeSelect('LONG TEXT')}
          isSelected={value === 'LONG TEXT'}
        />
        <BigButton
          icon={renderIcon('IMAGE')}
          buttonLabel="IMAGE"
          onClick={() => handleTypeSelect('IMAGE')}
          isSelected={value === 'IMAGE'}
        />
        <BigButton
          icon={renderIcon('AUDIO')}
          buttonLabel="AUDIO"
          onClick={() => handleTypeSelect('AUDIO')}
          isSelected={value === 'AUDIO'}
        />
        <BigButton
          icon={renderIcon('FILE')}
          buttonLabel="FILE"
          onClick={() => handleTypeSelect('FILE')}
          isSelected={value === 'FILE'}
        />
      </div>
    </div>
  );
}
