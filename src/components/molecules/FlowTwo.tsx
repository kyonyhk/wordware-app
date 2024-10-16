'use client';

import { css } from '../../../styled-system/css';
import {
  OutputButton,
  OutputLabelButton,
  CommentsButton,
} from '../atoms/buttons';

export function FlowTwo({ isActive }: { isActive: boolean }) {
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
              ElevenLabs Speech Synthesis 🙊
            </div>
            <div
              className={css({ textStyle: 'body5', color: 'text.secondary' })}
            >
              Generates speech from the passed-in text using ElevenLabs
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
              We can then pass this description into
              [**ElevenLabs**](http://elevenlabs.io) to get the audio. We've
              disabled this for now by commenting it out because you need to
              first **provide your API key** and also set the **voice ID** to a
              cloned version of Gordon's voice. Remember you can ⌘/ctrl and
              click on the name of the prompt to jump to it
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
            CONTENT
          </div>
          <div
            className={css({ textStyle: 'heading3', color: 'text.secondary' })}
          >
            :
          </div>
          <OutputButton
            initialName="ROAST"
            initialDescription="Generated using"
            initialType="DESCRIPTION → ROAST 🔥"
          />
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
            VOICE ID
          </div>
          <div
            className={css({ textStyle: 'heading3', color: 'text.secondary' })}
          >
            :
          </div>
          <OutputButton initialName="GORDON RAMSAY" />
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
          outputName="GORDON RAMSAY ROAST AUDIO"
          outputLabel="Generated using"
          outputModel="ELEVENLABS"
        ></OutputLabelButton>
      </div>
    </div>
  );
}
