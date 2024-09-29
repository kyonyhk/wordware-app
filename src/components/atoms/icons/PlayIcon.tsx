import React from 'react';
import { css } from '../../../../styled-system/css';
import { useIcon } from '../../../hooks/useIcon';

interface PlayIconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const PlayIcon: React.FC<PlayIconProps> = ({ className, ...props }) => {
  const { width, height, viewBox, scaleFactor, iconStyles } = useIcon(props);

  const playIconStyles = css({
    '& circle': {
      transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)', // easeOutExpo
    },
    _hover: {
      cursor: 'pointer',
      '& circle': {
        opacity: 0.5,
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
      className={`${iconStyles} ${playIconStyles} ${className || ''}`}
    >
      <g transform={`scale(${scaleFactor})`}>
        <path
          opacity="0.2"
          d="M1.33325 9.1896V6.81049C1.33325 4.36059 1.33325 3.13564 1.8473 2.43261C2.2956 1.8195 2.98405 1.42665 3.73995 1.35261C4.60673 1.2677 5.66132 1.89087 7.7705 3.1372L9.78359 4.32675C11.8298 5.53591 12.853 6.14048 13.1986 6.92527C13.5002 7.61005 13.5002 8.39003 13.1986 9.07481C12.853 9.8596 11.8298 10.4642 9.78359 11.6733L7.7705 12.8629C5.66132 14.1092 4.60673 14.7324 3.73995 14.6475C2.98405 14.5734 2.2956 14.1806 1.8473 13.5675C1.33325 12.8644 1.33325 11.6395 1.33325 9.1896Z"
          fill="currentColor"
        />
        <path
          opacity="0.5"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.00161 2.693L8.02486 2.70674L10.038 3.8963L10.061 3.90994C11.0646 4.50297 11.8481 4.9659 12.4214 5.37972C12.9976 5.79558 13.4287 6.20723 13.6562 6.72376C14.0143 7.53694 14.0143 8.46316 13.6562 9.27634C13.4287 9.79287 12.9976 10.2045 12.4214 10.6204C11.8481 11.0342 11.0646 11.4971 10.0611 12.0901L10.038 12.1038L8.02486 13.2934L8.0016 13.3071C6.96669 13.9186 6.15969 14.3955 5.50329 14.7063C4.84467 15.0182 4.26274 15.2011 3.69121 15.1451C2.79358 15.0572 1.97604 14.5907 1.44369 13.8626C1.10473 13.399 0.966179 12.805 0.8996 12.0793C0.833245 11.3561 0.833248 10.4187 0.833252 9.21661V9.1896V6.8105V6.78349C0.833248 5.58139 0.833245 4.64402 0.8996 3.9208C0.966179 3.19513 1.10473 2.60106 1.44369 2.1375C1.97604 1.40944 2.79358 0.942921 3.69121 0.854994C4.26274 0.79901 4.84467 0.981941 5.50329 1.29379C6.15969 1.60459 6.96669 2.08146 8.00161 2.693ZM5.07535 2.1976C4.46269 1.90751 4.08394 1.82131 3.78869 1.85023C3.17453 1.91039 2.61516 2.22959 2.25092 2.72773C2.07582 2.9672 1.95735 3.33713 1.89542 4.01217C1.83375 4.68425 1.83325 5.57568 1.83325 6.8105V9.1896C1.83325 10.4244 1.83375 11.3159 1.89542 11.9879C1.95735 12.663 2.07582 13.0329 2.25092 13.2724C2.61516 13.7705 3.17453 14.0897 3.78869 14.1499C4.08394 14.1788 4.46269 14.0926 5.07535 13.8025C5.68533 13.5137 6.45304 13.0606 7.51613 12.4324L9.52923 11.2429C10.5608 10.6333 11.3045 10.1933 11.8362 9.8095C12.3695 9.42459 12.6229 9.14156 12.741 8.8733C12.986 8.31691 12.986 7.68318 12.741 7.1268C12.6229 6.85854 12.3695 6.57551 11.8362 6.19059C11.3045 5.80681 10.5608 5.3668 9.52922 4.75722L7.51613 3.56767C6.45304 2.93948 5.68533 2.48642 5.07535 2.1976Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
