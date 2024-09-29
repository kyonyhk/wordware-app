import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface CheckIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
  className,
  ...props
}) => {
  const { width, height, viewBox, scaleFactor, iconStyles } = useIcon(props);

  const checkIconStyles = css({
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
      className={`${iconStyles} ${checkIconStyles} ${className || ''}`}
    >
      <g transform={`scale(${scaleFactor})`}>
        <path
          opacity="0.5"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.7258 4.35952C12.8954 4.51502 12.9069 4.77859 12.7514 4.94822L6.64026 11.6149C6.56347 11.6987 6.45579 11.7474 6.34217 11.7499C6.22855 11.7524 6.11885 11.7083 6.03849 11.628L3.26071 8.85018C3.09799 8.68746 3.09799 8.42365 3.26071 8.26093C3.42343 8.09821 3.68725 8.09821 3.84997 8.26093L6.32003 10.731L12.1371 4.38511C12.2926 4.21548 12.5561 4.20402 12.7258 4.35952Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
