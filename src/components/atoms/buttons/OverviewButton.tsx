import { useFlowContext } from '@/contexts/FlowContext';
import { css } from '../../../../styled-system/css';
import { ReactNode, MouseEvent } from 'react';

interface OverviewButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  variant?: 'default' | 'delete';
}

export function OverviewButton({
  children,
  className,
  disabled,
  leftIcon,
  rightIcon,
  onClick,
  isActive = false,
  variant = 'default',
}: OverviewButtonProps) {
  const { activeSection } = useFlowContext();

  const containerStyles = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4px',
    w: '100%',
    height: '38px',
    maxWidth: '320px',
    textStyle: 'heading5',
  });

  const buttonStyles = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    textStyle: 'heading6',
    padding: '12px 16px',
    w: '100%',
    borderWidth: '1px',
    borderRadius: '8px',
    transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',

    // Default state
    color: 'primary.text',
    borderColor: 'scheme1.border',
    bg: 'transparent',

    // Default hover state
    _hover: {
      bg: '',
      bgGradient: 'teal.5',
      cursor: 'pointer !important',
    },

    // Disabled state
    _disabled: {
      opacity: 0.2,
      cursor: 'not-allowed',
      _hover: {
        bg: 'transparent',
      },
    },
  });

  const activeStyles = css({
    gap: '4px',
  });

  const activeButtonStyles = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    textStyle: 'heading6',
    padding: '12px 16px',
    w: '100%',
    borderWidth: '1px',
    borderRadius: '8px',
    transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
    bgGradient: 'teal.20',
    color: 'accent.100',
    _hover: {
      bgGradient: 'teal.50',
      cursor: 'pointer !important',
    },
  });

  const activeIndicatorStyles = css({
    w: '4px',
    h: '90%',
    borderRadius: '100px',
    bg: 'accent.100',
  });

  return (
    <button
      className={`${containerStyles} ${isActive ? activeStyles : ''} ${className || ''}`}
      disabled={disabled}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      {isActive && <div className={activeIndicatorStyles} />}
      {isActive ? (
        <div className={activeButtonStyles}>{children}</div>
      ) : (
        <div className={buttonStyles}>{children}</div>
      )}
    </button>
  );
}
