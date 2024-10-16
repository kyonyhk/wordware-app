import { useState } from 'react';
import { css } from '../../../styled-system/css';
import { FlowDetails } from './FlowDetails';
import { AddInputModal } from '../organisms';

interface StepOneProps {
  step?: string;
  heading?: string;
}

export function StepOne({
  step = 'Step 01',
  heading = 'Flow Details',
}: StepOneProps) {
  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '16px' })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.8,
        })}
      >
        <div className={css({ textStyle: 'heading4', color: 'text.primary' })}>
          {step.toUpperCase()}
        </div>
        <div className={css({ textStyle: 'heading6', color: 'text.primary' })}>
          {heading.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
