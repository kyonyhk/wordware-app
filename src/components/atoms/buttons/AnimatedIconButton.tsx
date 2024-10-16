import { ReactNode, useState } from 'react';
import { css } from '../../../../styled-system/css';

interface AnimatedIconButtonProps {
  icon: ReactNode;
  buttonText: string;
  onClick: () => void;
}

export function AnimatedIconButton({
  icon,
  buttonText,
  onClick,
}: AnimatedIconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: isHovered ? 'red.100' : 'red.50',
        w: isHovered ? 'auto' : '24px',
        padding: isHovered ? '4px 8px' : '4px',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        _hover: { opacity: 1.0 },
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          onClick();
        }}
        className={css({
          paddingLeft: '4px',
          textStyle: 'heading6',
          maxWidth: isHovered ? '200px' : '0',
          color: isHovered ? 'red.100' : 'text.primary',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          transition: 'all 0.5s cubic bezier(0.16, 1, 0.3, 1)',
        })}
      >
        {buttonText}
      </button>
    </button>
  );
}
