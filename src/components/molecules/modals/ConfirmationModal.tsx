import { useEffect } from 'react';
import { css } from '../../../../styled-system/css';
import { PrimaryButton } from '@/components/atoms/buttons';
import { Delete } from '@/components/atoms/icons';

interface ConfirmationModalProps {
  elementType: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  elementType,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onCancel]);

  return (
    <div
      className={css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxWidth: '480px',
          width: '90%',
          padding: '16px 16px',
          border: '1px solid',
          borderColor: 'scheme1.border',
          borderRadius: '8px',
          backgroundColor: 'scheme1.tertiaryContainer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        })}
      >
        <div className={css({ display: 'flex', flexDirection: 'column' })}>
          <div
            className={css({ textStyle: 'heading4', color: 'text.primary' })}
          >
            {`DELETE ${elementType.toUpperCase()}`}
          </div>
          <div className={css({ textStyle: 'body5', color: 'text.secondary' })}>
            You are about to delete this {elementType}. Once the {elementType}{' '}
            is deleted, you will not be able to access it anymore. Are you sure?
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '16px',
          })}
        >
          <PrimaryButton
            variant="delete"
            leftIcon={<Delete width={16} height={16} color="red.100" />}
            onClick={onConfirm}
          >
            DELETE
          </PrimaryButton>
          <PrimaryButton onClick={onCancel}>
            <span className={css({ color: 'text.primary' })}>CANCEL</span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
