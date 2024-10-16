import React, { InputHTMLAttributes, useState, KeyboardEvent } from 'react';
import { css } from '../../../../styled-system/css';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputLabel?: string;
  inputDescription?: string;
  error?: string;
  onSave?: (value: string) => void;
}

export function TextInput({
  inputLabel,
  inputDescription,
  error,
  onSave,
  ...props
}: TextInputProps) {
  const [inputValue, setInputValue] = useState((props.value as string) || '');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onSave) {
        onSave(inputValue);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
      >
        {inputLabel && (
          <label
            className={css({
              textStyle: 'heading5',
              color: 'text.primary',
            })}
          >
            {inputLabel}
          </label>
        )}
        <div
          className={css({
            textStyle: 'body5',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          {inputDescription}
        </div>
      </div>
      <input
        type="text"
        className={css({
          padding: '8px',
          border: '1px solid',
          borderColor: error ? 'red.500' : 'scheme1.border',
          borderRadius: '8px',
          textStyle: 'body5',
          color: 'text.primary',
          backgroundColor: 'scheme1.active',
          outline: 'none',
          transition: 'all 0.2s',
          _hover: {
            borderColor: 'scheme1.hover',
            bg: 'scheme1.hover',
          },
          _focus: {
            borderColor: 'text.primary',
            boxShadow: '0 0 0 1px accent.100',
          },
          _placeholder: {
            color: 'text.tertiary',
          },
        })}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
      {error && (
        <span
          className={css({
            fontSize: '12px',
            color: 'red.500',
          })}
        >
          {error}
        </span>
      )}
    </div>
  );
}
