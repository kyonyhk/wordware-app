import { css } from '../../../styled-system/css';
import { Output } from './Output';

interface StepThreeProps {
  step?: string;
  heading?: string;
}

export function StepThree({
  step = 'Step 03',
  heading = 'Final Output',
}: StepThreeProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
      })}
    >
      <div className={css({ textStyle: 'heading4' })}>{step.toUpperCase()}</div>
      <div
        className={css({
          textStyle: 'heading6',
          color: 'text.secondary',
        })}
      >
        {heading.toUpperCase()}
      </div>
    </div>
  );
}
