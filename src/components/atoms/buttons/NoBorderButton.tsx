import { css } from '../../../../styled-system/css';
import { ReactNode } from 'react';

interface NoBorderButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
}

export function NoBorderButton({
  icon,
  children,
  className,
  isActive = false,
  onClick,
  isCollapsed = false,
}: NoBorderButtonProps) {
  const containerStyles = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 0px',
    color: 'text.primary',
    textStyle: 'heading6',
    opacity: isActive ? 0.8 : 0.3,
    _hover: {
      opacity: 1,
      cursor: 'pointer !important',
    },
    transition:
      'opacity 0.5s cubic-bezier(0.87, 1, 0.13, 1), gap 0.5s cubic-bezier(0.87, 1, 0.13, 1)',
    borderRadius: '4px',
    width: '100%',
    overflow: 'hidden',
  });

  const textStyles = css({
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: isCollapsed ? '0' : 'auto',
    opacity: isCollapsed ? 0 : 1,
    transition:
      'width 1.0s cubic-bezier(0.87, 1, 0.13, 1), opacity 1.0s cubic-bezier(0.87, 1, 0.13, 1)',
  });

  const iconStyles = css({ flexShrink: 0 });

  return (
    <button className={`${containerStyles} ${className}`} onClick={onClick}>
      <div className={iconStyles}>{icon}</div>
      <div className={textStyles}>{children}</div>
    </button>
  );
}
