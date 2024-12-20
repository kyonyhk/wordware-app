import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface TriangleArrowLeftProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const TriangleArrowLeft: React.FC<TriangleArrowLeftProps> = ({
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
          d="M10.4168 4.01857L4.81981 7.25007C4.10481 7.66207 4.10481 8.33757 4.81981 8.75007L10.4173 11.9816C11.1323 12.3946 11.7163 12.0566 11.7163 11.2316L11.7163 4.76857C11.7163 3.94357 11.1313 3.60557 10.4173 4.01857H10.4168Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
