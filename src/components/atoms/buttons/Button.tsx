import { css } from '../../../../styled-system/css';
import { ReactNode } from 'react';

interface ButtonBasicProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function ButtonBasic({
  children,
  className,
  disabled,
}: ButtonBasicProps) {
  const baseStyles = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'cneter',
    maxWidth: '320px',
    textStyle: 'heading5',
    padding: '8px 16px',
    borderWidth: '1px',
    borderColor: 'scheme1.border',
    borderRadius: '8px',
    color: 'primary.text',
    _hover: {
      bg: 'hover',
      cursor: 'pointer',
    },
  });

  return (
    <button className={`${baseStyles} ${className || ''}`} disabled={disabled}>
      {children}
    </button>
  );
}
