import { css } from '../../../styled-system/css';
import { InputLabelButton } from '../atoms/buttons';
import { OutputLabelButton } from '../atoms/buttons';
import { Image } from '../atoms/icons';

export function PromptOne({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        w: '100%',
        gap: '40px',
        padding: '16px',
        bg: isActive ? 'accent.5' : 'scheme1.primaryContainer',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: isActive ? 'accent.20' : 'transparent',
        transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          Prompt
        </div>
        <p className={css({ textStyle: 'body4' })}>
          Here's a picture of some food:
        </p>
        <InputLabelButton
          inputName="IMAGE"
          inputDescription="An image of some food to get reviewed"
          icon={<Image width={16} height={16} color="text.primary" />}
          inputType="TYPE - IMAGE"
        />
        <p className={css({ textStyle: 'body4' })}>
          Briefly describe what’s in it and how would you critique the plate?
          You can mention it’s appearance, it’s plating, how it’s cooked, it’s
          nutritional content.
        </p>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          Output
        </div>
        <OutputLabelButton
          outputName="GENERATED DESCRIPTION"
          outputLabel="Generated using"
          outputModel="CLAUDE 3 HIAKU"
        />
      </div>
    </div>
  );
}
