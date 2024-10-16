import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface TextProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const Text: React.FC<TextProps> = ({
  className,
  color = 'currentColor',
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
          d="M2 1.5C1.72386 1.5 1.5 1.72386 1.5 2C1.5 2.27614 1.72386 2.5 2 2.5L14 2.5C14.2761 2.5 14.5 2.27614 14.5 2C14.5 1.72386 14.2761 1.5 14 1.5L2 1.5ZM1.5 6C1.5 5.72386 1.72386 5.5 2 5.5L10 5.5C10.2761 5.5 10.5 5.72386 10.5 6C10.5 6.27614 10.2761 6.5 10 6.5L2 6.5C1.72386 6.5 1.5 6.27614 1.5 6ZM2 9.5C1.72386 9.5 1.5 9.72386 1.5 10C1.5 10.2761 1.72386 10.5 2 10.5L11.3333 10.5C11.6095 10.5 11.8333 10.2761 11.8333 10C11.8333 9.72386 11.6095 9.5 11.3333 9.5L2 9.5ZM2 13.5C1.72386 13.5 1.5 13.7239 1.5 14C1.5 14.2761 1.72386 14.5 2 14.5L7.33333 14.5C7.60947 14.5 7.83333 14.2761 7.83333 14C7.83333 13.7239 7.60947 13.5 7.33333 13.5L2 13.5Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
