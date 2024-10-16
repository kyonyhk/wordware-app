import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface TriangleArrowRightProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const TriangleArrowRight: React.FC<TriangleArrowRightProps> = ({
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
          d="M5.5827 11.9816L11.1797 8.75006C11.8947 8.33806 11.8947 7.66256 11.1797 7.25006L5.5822 4.01856C4.8672 3.60556 4.2832 3.94356 4.2832 4.76856V11.2316C4.2832 12.0566 4.8682 12.3946 5.5822 11.9816H5.5827Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
