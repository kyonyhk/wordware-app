import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface ArrowLeftProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const ArrowLeft: React.FC<ArrowLeftProps> = ({
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
          d="M7.02022 2.97982C7.21548 3.17509 7.21548 3.49167 7.02022 3.68693L3.20712 7.49999H14C14.2761 7.49999 14.5 7.72385 14.5 7.99999C14.5 8.27614 14.2761 8.49999 14 8.49999H3.20711L7.02022 12.3131C7.21548 12.5084 7.21548 12.825 7.02022 13.0202C6.82496 13.2155 6.50838 13.2155 6.31311 13.0202L1.64645 8.35355C1.55268 8.25978 1.5 8.1326 1.5 7.99999C1.5 7.86738 1.55268 7.74021 1.64645 7.64644L6.31312 2.97982C6.50838 2.78456 6.82496 2.78456 7.02022 2.97982Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
