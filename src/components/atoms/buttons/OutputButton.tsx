'use client';

import { css } from '../../../../styled-system/css';
import { useState, MouseEvent } from 'react';

type InputType = 'text' | 'long text' | 'image' | 'file' | 'audio';

interface OutputButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  initialName?: string;
  initialDescription?: string;
  initialType?: string;
}

export function OutputButton({
  className,
  disabled,
  onClick,
  initialName = '',
  initialDescription = '',
  initialType = '',
}: OutputButtonProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [type, setType] = useState(initialType);

  const baseStyles = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    w: '100%',
    h: '100px',
    textStyle: 'heading5',
    padding: '8px 16px',
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

  const getGap = () => {
    if (!description && !type) {
      return '0px';
    }
    return '24px';
  };

  return (
    <button
      className={`${baseStyles} ${className || ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: getGap(),
        })}
      >
        <div
          className={css({
            textStyle: 'heading5',
            color: 'text.primary',
            opacity: 1.0,
          })}
        >
          {name}
        </div>
        <div>
          <div
            className={css({
              textStyle: 'body6',
              color: 'text.secondary',
              opacity: 0.5,
            })}
          >
            {description}
          </div>
          <div
            className={css({
              textStyle: 'heading5',
              color: 'text.primary',
              opacity: 0.5,
            })}
          >
            {type}
          </div>
        </div>
      </div>
    </button>
  );
}
