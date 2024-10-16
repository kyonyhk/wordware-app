'use client';

import { css } from '../../../styled-system/css';
import { TextInput } from '@/components/atoms/inputs';
import {
  AnimatedIconButton,
  RequiredInputButton,
  OutputButton,
  OutputLabelButton,
} from '@/components/atoms/buttons';
import { Delete } from '@/components/atoms/icons';
import {
  SelectInputDropdown,
  InputDropdown,
} from '@/components/atoms/dropdown';

export default function ComponentsTwo() {
  return (
    <>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        {/* <div
        className={css({ display: 'flex', flexDirection: 'row', gap: '40px' })}
      >
        <AddGenerationModal onClose={() => {}} onSave={() => {}} />
        <InputModal />
      </div> */}
        <TextInput inputLabel="Username" placeholder="Input Name" />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          })}
        >
          <AnimatedIconButton
            icon={<Delete width={16} height={16} />}
            buttonText="DELETE"
          />
        </div>
      </div>
      <RequiredInputButton
        name="GENERATED DESCRIPTION"
        label="Generated from"
        parentFlow="DESCRIPTION → ROAST 🔥"
      />
      <SelectInputDropdown />
      <InputDropdown />
    </>
  );
}
