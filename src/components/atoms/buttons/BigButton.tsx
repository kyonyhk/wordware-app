import { ReactNode } from 'react';
import { css } from '../../../../styled-system/css';

interface BigButtonProps {
  icon: ReactNode;
  buttonLabel: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export function BigButton({
  icon,
  buttonLabel,
  onClick,
  isSelected = false,
}: BigButtonProps) {
  return (
    <button
      className={css({
        minW: '84px',
        h: '84px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid',
        borderColor: isSelected ? 'accent.20' : 'scheme1.active',
        borderRadius: '8px',
        bg: isSelected ? 'accent.10' : 'scheme1.active',
        _hover: {
          bg: 'scheme1.hover',
          cursor: 'pointer',
        },
      })}
      onClick={onClick}
    >
      {icon}
      <div
        className={css({
          textStyle: 'heading6',
          opacity: 0.8,
          textAlign: 'center',
          color: isSelected ? 'accent.100' : 'text.primary',
        })}
      >
        {buttonLabel}
      </div>
    </button>
  );
}
