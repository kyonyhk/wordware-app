'use client';

import { css } from '../../../../styled-system/css';
import { useState, MouseEvent } from 'react';

type InputType = 'text' | 'long text' | 'image' | 'file' | 'audio';

interface InputTextFieldButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  initialName?: string;
  initialDescription?: string;
  initialType?: string;
}

export function InputTextFieldButton({
  className,
  disabled,
  onClick,
  initialName = '',
  initialDescription = '',
  initialType = '',
}: InputTextFieldButtonProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [type, setType] = useState(initialType);

  const baseStyles = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    w: '240px',
    h: '92px',
    maxWidth: '360px',
    textStyle: 'heading5',
    padding: '8px 16px',
    bg: 'scheme1.primaryContainer',
    borderWidth: '1px',
    borderColor: 'scheme1.border',
    borderRadius: '8px',
    opacity: disabled ? 0.1 : 0.2,
    transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
    _hover: {
      bg: 'scheme1.hover',
      opacity: 0.5,
      cursor: 'pointer',
    },
  });

  const inputStyles = css({
    width: '100%',
    padding: '4px',
    borderRadius: '4px',
    border: '1px solid',
    borderColor: 'scheme1.border',
    bg: 'scheme1.background',
  });

  const selectStyles = css({
    width: '100%',
    padding: '4px',
    borderRadius: '4px',
    border: '1px solid',
    borderColor: 'scheme1.border',
    bg: 'scheme1.background',
  });

  return (
    <div className={`${baseStyles} ${className || ''}`}>
      <input
        className={inputStyles}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={inputStyles}
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className={selectStyles}
        value={type}
        onChange={(e) => setType(e.target.value as InputType)}
      >
        <option value="text">Text</option>
        <option value="long text">Long Text</option>
        <option value="image">Image</option>
        <option value="audio">Audio</option>
        <option value="file">File</option>
      </select>
      <button
        onClick={onClick}
        disabled={disabled}
        className={css({
          marginTop: '8px',
          padding: '4px 8px',
          borderRadius: '4px',
          bg: 'scheme1.primary',
          color: 'scheme1.onPrimary',
          _hover: {
            bg: 'scheme1.primaryHover',
          },
        })}
      ></button>
    </div>
  );
}
