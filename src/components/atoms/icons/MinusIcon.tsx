import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface MinusIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const MinusIcon: React.FC<MinusIconProps> = ({
  className,
  ...props
}) => {
  const { width, height, viewBox, scaleFactor, iconStyles } = useIcon(props);

  const minusIconStyles = css({
    '& circle': {
      transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)', // easeOutExpo
    },
    _hover: {
      cursor: 'pointer',
      '& circle': {
        opacity: 0.4,
      },
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
      className={`${iconStyles} ${minusIconStyles} ${className || ''}`}
    >
      <g transform={`scale(${scaleFactor})`}>
        <circle
          opacity="0.2"
          cx="7.99967"
          cy="7.99992"
          r="6.66667"
          fill="currentColor"
        />
        <path
          opacity="0.5"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.83301 7.99994C1.83301 4.59418 4.59392 1.83327 7.99967 1.83327C11.4054 1.83327 14.1663 4.59418 14.1663 7.99994C14.1663 11.4057 11.4054 14.1666 7.99967 14.1666C4.59392 14.1666 1.83301 11.4057 1.83301 7.99994ZM7.99967 0.833272C4.04163 0.833272 0.833008 4.0419 0.833008 7.99994C0.833008 11.958 4.04163 15.1666 7.99967 15.1666C11.9577 15.1666 15.1663 11.958 15.1663 7.99994C15.1663 4.0419 11.9577 0.833272 7.99967 0.833272ZM5.33301 7.49994C5.05687 7.49994 4.83301 7.7238 4.83301 7.99994C4.83301 8.27608 5.05687 8.49994 5.33301 8.49994H10.6663C10.9425 8.49994 11.1663 8.27608 11.1663 7.99994C11.1663 7.7238 10.9425 7.49994 10.6663 7.49994H5.33301Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
