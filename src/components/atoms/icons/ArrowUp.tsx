import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface ArrowUpProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const ArrowUp: React.FC<ArrowUpProps> = ({ className, ...props }) => {
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
          d="M8.00016 1.5C8.13277 1.5 8.25995 1.55268 8.35372 1.64645L13.0204 6.31311C13.2156 6.50838 13.2156 6.82496 13.0204 7.02022C12.8251 7.21548 12.5085 7.21548 12.3133 7.02022L8.50016 3.20711L8.50016 14C8.50016 14.2761 8.27631 14.5 8.00016 14.5C7.72402 14.5 7.50016 14.2761 7.50016 14L7.50016 3.20711L3.68705 7.02022C3.49179 7.21548 3.1752 7.21548 2.97994 7.02022C2.78468 6.82496 2.78468 6.50838 2.97994 6.31311L7.64661 1.64645C7.74038 1.55268 7.86755 1.5 8.00016 1.5Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
