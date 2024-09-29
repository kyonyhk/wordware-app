import ButtonBasic from '@/components/atoms/buttons/Button';
import { css } from '../../styled-system/css';
import {
  PlusIcon,
  MinusIcon,
  CheckIcon,
  CancelIcon,
  TriangleArrowUpIcon,
  TriangleArrowDownIcon,
  TriangleArrowLeftIcon,
  TriangleArrowRightIcon,
} from '@/components/atoms/icons';

export default function Home() {
  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}
    >
      <div
        className={css({
          textStyle: 'heading1',
          color: 'scheme2.border',
        })}
      >
        HELLO WORLD
      </div>
      <div
        className={css({
          textStyle: 'heading4',
          textGradient: 'teal100',
        })}
      >
        HELLO
      </div>
      <div
        className={css({
          textStyle: 'body4',
          color: 'text.primary',
        })}
      >
        This is a paragraph.
      </div>
      <ButtonBasic>BUTTON</ButtonBasic>
      <div className={css({ display: 'flex', gap: '8px' })}>
        <PlusIcon width={24} height={24} color="red.100" />
        <MinusIcon width={24} height={24} color="red.100" />
        <CheckIcon width={24} height={24} color="red.100" />
        <CancelIcon width={24} height={24} color="red.100" />
      </div>
      <div className={css({ display: 'flex', gap: '8px' })}>
        <TriangleArrowUpIcon width={24} height={24} color="red.100" />
        <TriangleArrowDownIcon width={24} height={24} color="red.100" />
        <TriangleArrowLeftIcon width={24} height={24} color="red.100" />
        <TriangleArrowRightIcon width={24} height={24} color="red.100" />
      </div>
    </div>
  );
}
