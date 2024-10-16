'use client';

import { css } from '../../../../styled-system/css';
import { MouseEvent } from 'react';
import { IconButton } from './IconButton';
import { Cancel } from '../icons';

interface RequiredInputButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
  name?: string;
  label: string;
  description?: string;
  type?: string;
}

export function RequiredInputButton({
  className,
  disabled,
  onClick,
  onDelete,
  name,
  label,
  description,
  type,
  ...props
}: RequiredInputButtonProps) {
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

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the parent button
    if (onDelete) {
      onDelete(e);
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${baseStyles} ${className || ''}`}
      disabled={disabled}
      onClick={handleClick}
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
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleDelete(e)
            }
          />
        </div>
      )}
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
            {name?.toUpperCase()}
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <div
            className={css({
              textStyle: 'body6',
              color: 'text.secondary',
              opacity: 0.5,
            })}
          >
            {label}
          </div>
          {description && (
            <div
              className={css({
                textStyle: 'heading6',
                color: 'text.primary',
                opacity: 0.5,
              })}
            >
              {description.toUpperCase()}
            </div>
          )}
          {type && (
            <div
              className={css({
                textStyle: 'heading6',
                color: 'text.primary',
                opacity: 0.5,
              })}
            >
              {`TYPE - ${type.toUpperCase()}`}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
