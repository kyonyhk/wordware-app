import { css } from '../../../../styled-system/css';
import { ReactNode } from 'react';
import { Image } from '../icons';

interface DropdownCellProps {
  icon: ReactNode;
  name: string;
  description: string;
}

export function DropdownCell({ icon, name, description }: DropdownCellProps) {
  return (
    <button
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 8px',
        borderRadius: '8px',
        w: '100%',
        maxW: '400px',
        minW: '200px',
        opacity: 0.8,
        _hover: {
          bg: 'scheme1.hover',
        },
      })}
    >
      {icon}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        })}
      >
        <div
          className={css({
            textStyle: 'heading6',
            textAlign: 'left',
          })}
        >
          {name.toUpperCase()}
        </div>
        <div
          className={css({
            textStyle: 'body5',
            color: 'text.secondary',
            textAlign: 'left',
          })}
        >
          {description}
        </div>
      </div>
    </button>
  );
}
