import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface ArrowRightProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const ArrowRight: React.FC<ArrowRightProps> = ({
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
          d="M8.97978 2.97982C9.17504 2.78456 9.49162 2.78456 9.68689 2.97982L14.3536 7.64644C14.4473 7.74021 14.5 7.86738 14.5 7.99999C14.5 8.1326 14.4473 8.25978 14.3536 8.35355L9.68689 13.0202C9.49162 13.2155 9.17504 13.2155 8.97978 13.0202C8.78452 12.825 8.78452 12.5084 8.97978 12.3131L12.7929 8.49999H2C1.72386 8.49999 1.5 8.27614 1.5 7.99999C1.5 7.72385 1.72386 7.49999 2 7.49999H12.7929L8.97978 3.68693C8.78452 3.49167 8.78452 3.17509 8.97978 2.97982Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
