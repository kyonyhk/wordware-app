import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface ArrowDownProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const ArrowDown: React.FC<ArrowDownProps> = ({
  className,
  ...props
}) => {
  const { width, height, viewBox, scaleFactor, iconStyles } = useIcon(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      className={`${iconStyles} ${className || ''}`}
    >
      <g transform={`scale(${scaleFactor})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.00016 1.5C8.27631 1.5 8.50016 1.72386 8.50016 2L8.50016 12.7929L12.3133 8.97978C12.5085 8.78452 12.8251 8.78452 13.0204 8.97978C13.2156 9.17504 13.2156 9.49162 13.0204 9.68689L8.35372 14.3536C8.15845 14.5488 7.84187 14.5488 7.64661 14.3536L2.97994 9.68689C2.78468 9.49162 2.78468 9.17504 2.97994 8.97978C3.1752 8.78452 3.49179 8.78452 3.68705 8.97978L7.50016 12.7929L7.50016 2C7.50016 1.72386 7.72402 1.5 8.00016 1.5Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
