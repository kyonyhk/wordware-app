import { css } from '../../../../styled-system/css';
import { IconButton } from './IconButton';
import { TriangleArrowUp } from '../icons';

interface CommentsButtonProps {
  textColor?: string;
  iconColor?: string;
}

export function CommentsButton({
  textColor = 'text.primary',
  iconColor = 'text.primary',
}: CommentsButtonProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      })}
    >
      <div
        className={css({
          textStyle: 'heading5',
          color: textColor,
          opacity: 0.8,
        })}
      >
        COMMENTS
      </div>
      <IconButton
        icon={<TriangleArrowUp width={24} height={24} color="iconColor" />}
        onClick={() => {}}
      />
    </div>
  );
}
