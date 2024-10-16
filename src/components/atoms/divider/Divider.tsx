import { css } from '../../../../styled-system/css';

export function Divider() {
  return (
    <hr
      className={css({
        w: '100%',
        borderTop: '1px solid',
        borderColor: 'scheme1.border',
      })}
    />
  );
}
