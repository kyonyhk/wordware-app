import { ReactNode } from 'react';
import { css } from '../../../../styled-system/css';

interface InstructionInputProps {
  icon: ReactNode;
  instructionName: string;
  instructionDescription: string;
  onClick: () => void;
}

export function InstructionInput({
  icon,
  instructionName,
  instructionDescription,
  onClick,
}: InstructionInputProps) {
  return (
    <button
      onClick={onClick}
      className={css({
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        padding: ' 16px',
        bg: 'scheme1.primaryContainer',
        border: '1px solid',
        borderColor: 'scheme1.border',
        borderRadius: '8px',
        _hover: {
          cursor: 'pointer',
          bg: 'scheme1.hover',
        },
        _disabled: {
          cursor: 'default',
          opacity: 0.2,
        },
      })}
    >
      {icon}
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
            textStyle: 'heading5',
            color: 'text.primary',
          })}
        >
          {instructionName}
        </div>
        <div className={css({ textStyle: 'body6', color: 'text.secondary' })}>
          {instructionDescription}
        </div>
      </div>
    </button>
  );
}
