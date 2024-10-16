import { css } from '../../../../styled-system/css';
import { ReactNode, MouseEvent } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDoubleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  isSidebar?: boolean;
  isActive?: boolean;
  variant?: 'default' | 'delete';
}

export function PrimaryButton({
  children,
  className,
  disabled,
  leftIcon,
  rightIcon,
  onClick,
  onDoubleClick,
  isSidebar = false,
  isActive = false,
  variant = 'default',
}: PrimaryButtonProps) {
  const baseStyles = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    textStyle: 'heading6',
    padding: '8px 16px',
    minH: '32px',
    borderWidth: '1px',
    borderRadius: '8px',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',

    // Sidebar specific styles
    ...(isSidebar && {
      textStyle: 'body5',
      justifyContent: 'flex-start',
      borderWidth: '1px',
      borderColor: 'scheme1.border',
      padding: '8px 12px',
      w: '100%',
      maxWidth: '200px',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),

    // Non-sidebar styles
    ...(!isSidebar && {
      textStyle: 'heading6',
      justifyContent: 'center',
      borderColor: 'scheme1.border',
    }),

    // Default state
    color: 'primary.text',
    bg: 'transparent',

    // Hover state
    _hover: {
      ...(isSidebar
        ? {
            bg: '',
            bgGradient: 'teal.5',
            cursor: 'pointer !important',
          }
        : {
            bg: '',
            bgGradient: 'teal.5',
            cursor: 'pointer !important',
          }),
    },

    // Active state for sidebar
    ...(isSidebar &&
      isActive && {
        bgGradient: 'teal.20',
        color: 'accent.100',
        borderColor: 'accent.100',
        borderWidth: '1px',
        _hover: {
          bgGradient: 'teal.50',
          cursor: 'pointer !important',
        },
      }),

    // Delete state
    ...(variant === 'delete' && {
      textStyle: 'heading6',
      color: 'red.100',
      bgGradient: 'red.20',
      borderColor: 'red.20',

      _hover: {
        bgGradient: 'red.50',
        cursor: 'pointer !important',
        borderColor: 'red.100',
      },
    }),

    // Disabled state
    _disabled: {
      opacity: 0.2,
      cursor: 'not-allowed',
      _hover: {
        bg: 'transparent',
      },
    },
  });

  return (
    <button
      className={`${baseStyles} ${className || ''}`}
      disabled={disabled}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      title={
        isSidebar
          ? typeof children === 'string'
            ? children
            : undefined
          : undefined
      }
    >
      {leftIcon}
      {children}
      <div
        className={css({
          position: 'absolute',
          top: 'auto',
          right: '4px',
          bottom: 'auto',
        })}
      >
        {rightIcon}
      </div>
    </button>
  );
}
