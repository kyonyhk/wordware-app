import { css } from '../../../../styled-system/css';

interface ModalHeadingProps {
  modalHeading: string;
  modalDescription: string;
}

export function ModalHeading({
  modalHeading,
  modalDescription,
}: ModalHeadingProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      })}
    >
      {/* Input Heading & Description */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
      >
        <div className={css({ textStyle: 'heading4' })}>{modalHeading}</div>
        <div
          className={css({
            textStyle: 'body5',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          {modalDescription}
        </div>
      </div>
    </div>
  );
}
