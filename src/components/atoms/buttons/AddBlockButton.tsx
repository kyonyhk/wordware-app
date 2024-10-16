import { css } from '../../../../styled-system/css';
import { ReactNode, MouseEvent } from 'react';

interface AddBlockButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function AddBlockButton({
  children,
  className,
  disabled,
  onClick,
}: AddBlockButtonProps) {
  const baseStyles = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    w: '100%',
    minW: '320px',
    h: '100px',
    textStyle: 'heading5',
    padding: '8px 16px',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: 'text.primary',
    borderRadius: '8px',
    color: 'primary.text',
    opacity: disabled ? 0.1 : 0.2,
    transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
    _hover: {
      bg: 'scheme1.hover',
      opacity: 0.5,
      cursor: 'pointer',
    },
  });

  return (
    <button
      className={`${baseStyles} ${className || ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
