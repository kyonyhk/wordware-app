import { css } from '../../../styled-system/css';

interface StepTwoProps {
  step?: string;
  heading?: string;
}

export function StepTwo({
  step = 'Step 02',
  heading = 'Instructions',
}: StepTwoProps) {
  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '16px' })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.8,
        })}
      >
        <div
          className={css({
            textStyle: 'heading4',
            color: 'text.primary',
          })}
        >
          {step.toUpperCase()}
        </div>
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.primary',
          })}
        >
          {heading.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
