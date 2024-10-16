import React from 'react';
import { css } from '../../../styled-system/css';

interface AddInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, description: string, type: string) => void;
}

export function AddInputModal({ isOpen, onClose, onAdd }: AddInputModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={css({
        w: '100vw',
        h: '100vh',
        bg: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
        background: 'rgba(0, 0, 0, 0.2)',
      })}
      onClick={onClose}
    >
      <div
        className={css({
          w: '480px',
          h: '480px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          bg: 'background.secondary',
          borderRadius: '16px',
          boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.1)',
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Add Input</h2>
        {/* Add your form elements here */}
        <button onClick={() => onAdd('Test', 'Test Description', 'TEXT')}>
          Add Input
        </button>
      </div>
    </div>
  );
}
