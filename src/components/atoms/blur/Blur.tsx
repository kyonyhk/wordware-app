import { css } from '../../../../styled-system/css';

export function Blur() {
  return (
    <div
      className={css({
        w: '100%',
        h: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      })}
    >
      <div
        className={css({
          w: '960px',
          h: '960px',
          opacity: 0.2,
          bg: 'accent.500',
          borderRadius: '960px',
          backdropFilter: 'blur(100px)',
          filter: 'blur(100px)',
          position: 'fixed',
          bottom: '-480px',
          right: '80px',
          animation: 'figure8_1 10s infinite linear',
        })}
      />
      <div
        className={css({
          w: '960px',
          h: '960px',
          opacity: 0.1,
          bg: 'accent.100',
          borderRadius: '960px',
          backdropFilter: 'blur(100px)',
          filter: 'blur(100px)',
          position: 'fixed',
          bottom: '-480px',
          left: '120px',
          animation: 'figure8_2 15s infinite linear',
        })}
      />
    </div>
  );
}
