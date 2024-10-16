'use client';

import { css } from '../../../../styled-system/css';
import { useState, MouseEvent, ReactNode } from 'react';
import { Image, Text, LongText, File, Audio, Plus, Cancel } from '../icons';
import { IconButton } from './IconButton';

type InputType = 'text' | 'long text' | 'image' | 'file' | 'audio';

interface InputLabelButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDelete?: () => void;
  inputName?: string;
  inputDescription?: string;
  icon?: ReactNode;
  inputType?: string;
}

export function InputLabelButton({
  className,
  disabled,
  onClick,
  onDelete,
  inputName = 'Description',
  inputDescription = 'The generated description of the image',
  inputType = 'Long Text',
}: InputLabelButtonProps) {
  const processInputType = (type: string) => {
    return type.replace('TYPE - ', '').trim().toUpperCase();
  };

  const getIconForInputType = (type: string) => {
    const processedType = processInputType(type);

    switch (processedType) {
      case 'IMAGE':
        return <Image width={16} height={16} />;
      case 'TEXT':
        return <Text width={16} height={16} />;
      case 'FILE':
        return <File width={16} height={16} />;
      case 'AUDIO':
        return <Audio width={16} height={16} />;
      case 'LONG TEXT':
        return <LongText width={16} height={16} />;
      default:
        console.log('getIconForInputType - Unrecognized type:', processedType);
        return <Plus width={16} height={16} />;
    }
  };

  const baseStyles = css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '8px',
    w: 'fit-content',
    minW: '240px',
    maxWidth: '360px',
    textStyle: 'heading5',
    padding: '12px 16px',
    bg: 'scheme1.primaryContainer',
    borderWidth: '1px',
    borderColor: 'scheme1.border',
    borderRadius: '8px',
    opacity: disabled ? 0.2 : 1.0,
    transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
    _hover: {
      bg: 'scheme1.hover',
      cursor: 'pointer',
    },
  });

  const iconStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    opacity: 0.5,
  });

  return (
    <button
      className={`${baseStyles} ${className || ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {onDelete && (
        <div
          className={css({
            position: 'absolute',
            top: '4px',
            right: '4px',
            opacity: 0.5,
            _hover: { color: 'red.100', scale: 1.1, opacity: 1.0 },
          })}
        >
          <IconButton
            icon={<Cancel width={16} height={16} />}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      )}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '24px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          })}
        >
          <div
            className={css({
              textStyle: 'heading4',
              color: 'text.primary',
              opacity: 0.8,
            })}
          >
            {inputName}
          </div>
          <div
            className={css({
              textStyle: 'body6',
              color: 'text.secondary',
              opacity: 0.5,
            })}
          >
            {inputDescription}
          </div>
        </div>
        <div className={iconStyles}>
          {getIconForInputType(processInputType(inputType))}
          <div
            className={css({ textStyle: 'heading6', color: 'text.primary' })}
          >
            {inputType}
          </div>
        </div>
      </div>
    </button>
  );
}
