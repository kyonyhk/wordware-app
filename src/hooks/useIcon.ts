import { useMemo } from 'react';
import { css } from '../../styled-system/css';

interface UseIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const useIcon = ({
  width = 16,
  height = 16,
  color = 'text.primary',
}: UseIconProps) => {
  return useMemo(() => {
    const scaleFactor = Math.max(width, height) / 16;
    const viewBoxWidth = 16 * scaleFactor;
    const viewBoxHeight = 16 * scaleFactor;
    const iconStyles = css({});

    return {
      width,
      height,
      viewBox: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
      scaleFactor,
      iconStyles,
      color,
    };
  }, [width, height, color]);
};
