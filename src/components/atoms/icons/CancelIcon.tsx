import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface CancelIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const CancelIcon: React.FC<CancelIconProps> = ({
  className,
  ...props
}) => {
  const { width, height, viewBox, scaleFactor, iconStyles } = useIcon(props);

  const cancelIconStyles = css({
    '& circle': {
      transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)', // easeOutExpo
    },
    _hover: {
      cursor: 'pointer',
      '& path': {
        opacity: 1.0,
      },
    },
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      className={`${iconStyles} ${cancelIconStyles} ${className || ''}`}
    >
      <g transform={`scale(${scaleFactor})`}>
        <path
          opacity="0.5"
          d="M4.66675 11.3333L11.3334 4.66663M4.66675 4.66663L11.3334 11.3333"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
