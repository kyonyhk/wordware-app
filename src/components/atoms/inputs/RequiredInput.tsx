import React from 'react';
import { css } from '../../../../styled-system/css';

interface RequiredInputProps {
  subFlowRequiredInput: string;
  subFlowRequiredType: string;
}

export function RequiredInput({
  subFlowRequiredInput,
  subFlowRequiredType,
}: RequiredInputProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        textStyle: 'heading4',
        border: '1px solid',
        borderColor: 'scheme1.border',
        borderRadius: '8px',
        padding: '8px 16px',
        h: '100px',
        w: '100%',
        minW: '320px',
      })}
    >
      <div className={css({ textStyle: 'heading4' })}>
        {subFlowRequiredInput}
      </div>
      <div
        className={css({
          textStyle: 'heading6',
          color: 'text.secondary',
          opacity: 0.5,
        })}
      >
        {subFlowRequiredType}
      </div>
    </div>
  );
}
