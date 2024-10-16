import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface TriangleArrowUpProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const TriangleArrowUp: React.FC<TriangleArrowUpProps> = ({
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
          d="M4.0182 10.4168L7.2497 4.81981C7.6617 4.10481 8.3372 4.10481 8.7497 4.81981L11.9812 10.4173C12.3942 11.1323 12.0562 11.7163 11.2312 11.7163H4.7682C3.9432 11.7163 3.6052 11.1313 4.0182 10.4173V10.4168Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
