import { css } from '../../../styled-system/css';
import { AddBlockButton } from '../atoms/buttons';
import { Plus } from '../atoms/icons';

interface AddInstructionProps {
  onAddClick: () => void;
}

export function AddInstruction({ onAddClick }: AddInstructionProps) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '16px',
        opacity: 0.5,
        transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
        _hover: {
          opacity: 1.0,
        },
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        })}
      >
        <div className={css({ textStyle: 'heading4' })}>Add Instruction</div>
        <div className={css({ textStyle: 'body5', color: 'text.secondary' })}>
          The instructions will be executed in a sequential order.{' '}
        </div>
      </div>
      <div className={css({ h: '100px' })}>
        <AddBlockButton
          onClick={() => {
            onAddClick();
          }}
        >
          <Plus width={24} height={24} color="text.primary" />
        </AddBlockButton>
      </div>
    </div>
  );
}
