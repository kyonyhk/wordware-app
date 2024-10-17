'use client';

import { css } from '../../../../styled-system/css';
import { useState, MouseEvent, ReactNode } from 'react';

interface OutputLabelButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  outputName: string;
  outputLabel: string;
  outputModel: string;
  disableHover?: boolean; // New prop to disable hover effects
}

export function OutputLabelButton({
  children,
  className,
  disabled,
  onClick,
  outputName,
  outputLabel,
  outputModel,
  disableHover = false, // Default to false to maintain current behavior elsewhere
  ...props
}: OutputLabelButtonProps) {
  const baseStyles = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '8px',
    w: '100%',
    h: '100px',
    minW: '320px',
    textStyle: 'heading5',
    padding: '16px 16px',
    bg: 'scheme1.primaryContainer',
    borderWidth: '1px',
    borderColor: 'scheme1.border',
    borderRadius: '8px',
    opacity: disabled ? 0.2 : 1.0,
    transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: disableHover ? 'default' : 'pointer',
    _hover: disableHover
      ? {}
      : {
          bg: 'scheme1.hover',
        },
  });

  const Component = disableHover ? 'div' : 'button';

  return (
    <Component
      className={`${baseStyles} ${className || ''}`}
      disabled={disabled}
    >
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
            {outputName.toUpperCase()}
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '4px',
          })}
        >
          <div
            className={css({
              textStyle: 'body6',
              color: 'text.secondary',
              opacity: 0.5,
              textAlign: 'left',
            })}
          >
            Generated using
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              textStyle: 'heading6',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            })}
          >
            <span
              className={css({
                opacity: 0.5,
                display: outputModel ? 'inline' : 'none',
              })}
            >
              {outputModel.toUpperCase()}
            </span>
            <span
              className={css({
                opacity: 0.5,
                display: children ? 'inline' : 'none',
              })}
            >
              {children}
            </span>
          </div>
        </div>
      </div>
    </Component>
  );
}
