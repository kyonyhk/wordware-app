import React from 'react';
import { css } from '../../../../styled-system/css';
import { RequiredInput } from './RequiredInput';

interface FlowInputProps {
  flowName: string;
  flowDescription: string;
  requiredInputs: Array<{
    name: string;
    description: string;
    type: string;
  }>;
  onClick: () => void;
}

export function FlowInput({
  flowName,
  flowDescription,
  requiredInputs,
  onClick,
}: FlowInputProps) {
  const requiredInputsText =
    requiredInputs.length === 1 ? 'Required Input' : 'Required Inputs';

  return (
    <button
      onClick={onClick}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '16px',
        bg: 'scheme1.primaryContainer',
        border: '1px solid',
        borderColor: 'scheme1.border',
        borderRadius: '8px',
        _hover: {
          bgGradient: 'teal.5',
          borderColor: 'accent.20',
          cursor: 'pointer',
        },
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-stat',
          alignItems: 'flex-start',
          gap: '8px',
        })}
      >
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          Flow
        </div>
        <div className={css({ display: 'flex', flexDirection: 'column' })}>
          <div className={css({ textStyle: 'heading5', textAlign: 'left' })}>
            {flowName}
          </div>
          <div
            className={css({
              textStyle: 'body6',
              color: 'text.secondary',
              textAlign: 'left',
            })}
          >
            {flowDescription}
          </div>
        </div>
      </div>
      {requiredInputs.length > 0 && (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '8px',
            w: '100%',
          })}
        >
          <div
            className={css({
              textStyle: 'heading6',
              color: 'text.secondary',
              opacity: 0.5,
            })}
          >
            {requiredInputsText}
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              w: '100%',
            })}
          >
            {requiredInputs.map((input, index) => (
              <RequiredInput
                key={index}
                subFlowRequiredInput={input.name}
                subFlowRequiredInputType={input.type}
              />
            ))}
          </div>
        </div>
      )}
    </button>
  );
}
