'use client';

import { useState, useEffect, useRef } from 'react';
import { css } from '../../../styled-system/css';
import { useProjectContext } from '@/contexts/ProjectContext';

interface ProjectNameProps {
  isPublic: boolean;
}

export function ProjectName({ isPublic }: ProjectNameProps) {
  const { projectName, updateProjectName } = useProjectContext();

  const [isEditingName, setIsEditingName] = useState(false);
  const [inputWidth, setInputWidth] = useState('auto');
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const handleProjectNameClick = () => setIsEditingName(true);

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProjectName(e.target.value);
    adjustInputWidth(e.target.value);
  };

  const handleProjectNameBlur = () => {
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleProjectNameBlur();
    }
  };

  const adjustInputWidth = (text: string) => {
    if (measureRef.current) {
      measureRef.current.textContent = text;
      const width = measureRef.current.offsetWidth;
      setInputWidth(`${width + 10}px`); // Add a small buffer
    }
  };

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      adjustInputWidth(projectName);
      inputRef.current.focus();
    }
  }, [isEditingName, projectName]);

  const editableTextClass = css({
    cursor: 'text !important',
    '&:hover': {
      cursor: 'text !imporant',
    },
  });

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        w: '100%',
        border: '1px solid',
        borderColor: 'scheme1.border',
        borderRadius: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexGrow: 1,
          maxW: 'fit-content',
          position: 'relative',
        })}
      >
        {isEditingName ? (
          <input
            ref={inputRef}
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
            onBlur={handleProjectNameBlur}
            onKeyDown={handleKeyDown}
            style={{ width: inputWidth }}
            autoFocus
            className={css({
              textStyle: 'heading5',
              bg: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'text.primary',
              opacity: 1,
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              '&::placeholder': {
                color: 'text.secondary',
                opacity: 0.5,
              },
            })}
          />
        ) : (
          <div
            onClick={handleProjectNameClick}
            className={`${css({
              textStyle: 'heading5',
              color: 'text.primary',
              _hover: {
                opacity: 0.5,
              },
            })} ${editableTextClass}`}
          >
            {projectName || 'Project Name'}
          </div>
        )}
        <span
          ref={measureRef}
          className={css({
            visibility: 'hidden',
            position: 'absolute',
            whiteSpace: 'pre',
            textStyle: 'heading5',
          })}
        />
      </div>
      <div
        className={css({
          textStyle: 'body5',
          color: 'text.secondary',
          padding: '4px 12px',
          border: '1px solid',
          borderColor: 'scheme1.border',
          borderRadius: '8px',
          flexShrink: 0,
        })}
      >
        {isPublic ? 'Public' : 'Private'}
      </div>
    </div>
  );
}
