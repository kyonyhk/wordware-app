'use client';

import { css } from '../../../../styled-system/css';
import { useState, MouseEvent } from 'react';

type InputType = 'text' | 'long text' | 'image' | 'file' | 'audio';

interface InputButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  name: string;
  description: string;
  type: string;
}

export function InputButton({
  className,
  disabled,
  onClick,
  name,
  description,
  type,
  ...props
}: InputButtonProps) {
  const baseStyles = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    w: '100%',
    h: '100px',
    minW: '320px',
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
          gap: '24px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <div
            className={css({
              textStyle: 'heading5',
              color: 'text.primary',
              opacity: 0.8,
            })}
          >
            {name}
          </div>
          <div
            className={css({
              textStyle: 'body6',
              color: 'text.secondary',
              opacity: 0.5,
            })}
          >
            {description}
          </div>
        </div>
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.primary',
            opacity: 0.5,
          })}
        >
          {type.toUpperCase()}
        </div>
      </div>
    </button>
  );
}
