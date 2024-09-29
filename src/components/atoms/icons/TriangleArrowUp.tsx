import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface TriangleArrowUpIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const TriangleArrowUpIcon: React.FC<TriangleArrowUpIconProps> = ({
  className,
  ...props
}) => {
  const { width, height, viewBox, scaleFactor, iconStyles } = useIcon(props);

  const triangleArrowUpIconStyles = css({
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
      className={`${iconStyles} ${triangleArrowUpIconStyles} ${className || ''}`}
    >
      <g transform={`scale(${scaleFactor})`}>
        <path
          opacity="0.5"
          d="M11.9816 5.58307L8.75006 11.1801C8.33806 11.8951 7.66256 11.8951 7.25006 11.1801L4.01856 5.58257C3.60556 4.86757 3.94356 4.28357 4.76856 4.28357L11.2316 4.28357C12.0566 4.28357 12.3946 4.86857 11.9816 5.58257V5.58307Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
