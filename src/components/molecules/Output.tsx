import { useState, useEffect } from 'react';
import { css } from '../../../styled-system/css';

interface OutputProps {
  finalOutputName: string;
  finalOutputModel: string;
  updateFinalOutput: (name: string, model: string) => void;
  isActive: boolean;
}

export function Output({
  finalOutputName,
  finalOutputModel,
  updateFinalOutput,
  isActive,
}: OutputProps) {
  const [localOutputName, setLocalOutputName] = useState(finalOutputName);
  const [localOutputModel, setLocalOutputModel] = useState(finalOutputModel);

  useEffect(() => {
    setLocalOutputName(finalOutputName);
    setLocalOutputModel(finalOutputModel);
  }, [finalOutputName, finalOutputModel]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalOutputName(e.target.value);
    updateFinalOutput(e.target.value, localOutputModel);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalOutputModel(e.target.value);
    updateFinalOutput(localOutputName, e.target.value);
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '16px',
        bgGradient: isActive ? 'teal.100' : 'teal.50',
        borderRadius: '8px',
        w: '100%',
      })}
    >
      <div className={css({ display: 'flex', flexDirection: 'column' })}>
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.secondaryLight',
            opacity: 0.5,
          })}
        >
          Output
        </div>
        <div
          className={css({ textStyle: 'heading2', color: 'text.primaryLight' })}
        >
          {finalOutputName.toUpperCase()}
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: '4px',
        })}
      >
        <div
          className={css({
            textStyle: 'body6',
            color: 'text.secondaryLight',
            textAlign: 'left',
          })}
        >
          Generated using
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            textStyle: 'heading6',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          })}
        >
          <span
            className={css({
              display: finalOutputModel ? 'inline' : 'none',
              color: 'text.primaryLight',
            })}
          >
            {finalOutputModel.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
