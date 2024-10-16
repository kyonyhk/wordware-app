import { css } from '../../../../styled-system/css';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const iconButtonStyles = css({
  opacity: 0.5,
  _hover: {
    opacity: 1.0,
    cursor: 'pointer',
  },
});

export function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <button className={iconButtonStyles} onClick={onClick}>
      {icon}
    </button>
  );
}
