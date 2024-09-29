import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface PlusIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({ className, ...props }) => {
  const { width, height, viewBox, scaleFactor, iconStyles } = useIcon(props);

  const plusIconStyles = css({
    '& circle': {
      transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)', // easeOutExpo
    },
    _hover: {
      cursor: 'pointer',
      '& circle': {
        opacity: 0.5,
      },
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
      className={`${iconStyles} ${plusIconStyles} ${className || ''}`}
    >
      <g transform={`scale(${scaleFactor})`}>
        <circle
          opacity="0.2"
          cx="7.99992"
          cy="8.00004"
          r="6.66667"
          fill="currentColor"
        />
        <path
          opacity="0.5"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.83325 8.00004C1.83325 4.59428 4.59416 1.83337 7.99992 1.83337C11.4057 1.83337 14.1666 4.59428 14.1666 8.00004C14.1666 11.4058 11.4057 14.1667 7.99992 14.1667C4.59416 14.1667 1.83325 11.4058 1.83325 8.00004ZM7.99992 0.833374C4.04188 0.833374 0.833252 4.042 0.833252 8.00004C0.833252 11.9581 4.04188 15.1667 7.99992 15.1667C11.958 15.1667 15.1666 11.9581 15.1666 8.00004C15.1666 4.042 11.958 0.833374 7.99992 0.833374ZM8.49992 5.33337C8.49992 5.05723 8.27606 4.83337 7.99992 4.83337C7.72378 4.83337 7.49992 5.05723 7.49992 5.33337V7.50004H5.33325C5.05711 7.50004 4.83325 7.7239 4.83325 8.00004C4.83325 8.27618 5.05711 8.50004 5.33325 8.50004H7.49992V10.6667C7.49992 10.9429 7.72378 11.1667 7.99992 11.1667C8.27606 11.1667 8.49992 10.9429 8.49992 10.6667V8.50004H10.6666C10.9427 8.50004 11.1666 8.27618 11.1666 8.00004C11.1666 7.7239 10.9427 7.50004 10.6666 7.50004H8.49992V5.33337Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
