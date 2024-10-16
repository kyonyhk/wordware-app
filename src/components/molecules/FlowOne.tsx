'use client';

import { css } from '../../../styled-system/css';
import {
  OutputButton,
  OutputLabelButton,
  PrimaryButton,
} from '../atoms/buttons';
import { CommentsButton } from '../atoms/buttons';

export function FlowOne({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '16px',
        bg: isActive ? 'accent.5' : 'scheme1.primaryContainer',
        borderColor: isActive ? 'accent.20' : 'transparent',
        border: '1px solid',
        borderRadius: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
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
            Flow
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            })}
          >
            <div className={css({ textStyle: 'heading2' })}>
              Description → Roast 🔥
            </div>
            <div
              className={css({ textStyle: 'body5', color: 'text.secondary' })}
            >
              This prompt takes the description that was generated from the
              image and turns it into Gordon Ramsey's roast
            </div>
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            justifyContent: 'flex-start',
          })}
        >
          <CommentsButton />
          <div
            className={css({
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
            })}
          >
            <div
              className={css({
                h: '100%',
                w: '2px',
                borderRadius: '100px',
                bg: 'text.secondary',
              })}
            ></div>
            <div
              className={css({ textStyle: 'body4', color: 'text.secondary' })}
            >
              Ten we pass that description to a 2nd prompt that puts it in the
              style of Gordon Ramsay. There are a couple of reasons we do this
              in two stages: 1. Most of the vision models will refuse to comply
              with our request to act like Gordon generally because they don't
              like being mean/swearing and sometimes for copyright reasons 2. We
              give the model 'time to think' by generating the plain
              review/description first then converting it into a style with a
              specialised prompt As with most prompt engineering this flow
              resulted from trial and error but seems to work pretty well whilst
              being fast
            </div>
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            h: '100px',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textStyle: 'heading4',
              border: '1px solid',
              borderColor: 'scheme1.border',
              borderRadius: '8px',
              padding: '8px 16px',
              h: '100%',
              w: '100%',
            })}
          >
            DESCRIPTION
          </div>
          <div
            className={css({ textStyle: 'heading3', color: 'text.secondary' })}
          >
            :
          </div>
          <OutputButton
            initialName="GENERATED DESCRIPTION"
            initialDescription="Generated using"
            initialType="CLAUDE 3 HAIKU"
          />
        </div>
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
          outputName="ROAST"
          outputLabel="Generated using"
          outputModel=""
        >
          <div
            className={css({
              padding: '8px 12px',
              bg: 'scheme1.tertiaryContainer',
              border: '1px solid',
              borderColor: 'scheme1.border',
              borderRadius: '8px',
            })}
          >
            DESCRIPTION → ROAST 🔥
          </div>
        </OutputLabelButton>
      </div>
    </div>
  );
}
