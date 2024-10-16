import { css } from '../../../styled-system/css';
import {
  AddBlockButton,
  InputButton,
  InputLabelButton,
} from '../atoms/buttons';
import { Plus } from '../atoms/icons';

export function InstructionDetails() {
  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}
    >
      <div>
        <div className={css({ textStyle: 'heading5', color: 'text.primary' })}>
          STEP 01
        </div>
        <div className={css({ textStyle: 'heading6', color: 'text.primary' })}>
          FLOW NAME
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          padding: '16px',
          bg: 'scheme1.primaryContainer',
          borderRadius: '8px',
          w: '100%',
        })}
      >
        {/* Heading */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          })}
        >
          <div className={css({ textStyle: 'heading2' })}>
            Gordon Ramsay reviews 🍝🤬
          </div>
          <div className={css({ textStyle: 'body5' })}>
            Rates your plate in the style of Gordon Ramsay 🔥
          </div>
        </div>

        {/* Input Heading */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          })}
        >
          <div className={css({ textStyle: 'heading4' })}>Inputs</div>
          <div className={css({ textStyle: 'body5' })}>
            Inputs are elements that you plan to add to the instructions that
            you want the AI to execute.{' '}
          </div>
        </div>
        <div
          className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
        >
          <InputButton
            initialName="DESCRIPTION"
            initialDescription="The generated description of the image"
            initialType="LONG TEXT"
          />
          <AddBlockButton>
            {<Plus width={24} height={24} color="text.primary" />}
          </AddBlockButton>
        </div>
      </div>
    </div>
  );
}
