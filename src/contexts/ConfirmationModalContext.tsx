'use client';

import React, { createContext, useContext, useState } from 'react';

interface ConfirmationModalContextType {
  isConfirmationModalOpen: boolean;
  confirmationModalProps: {
    componentType: string;
    onConfirm: () => void;
    onCancel: () => void;
  };
  openConfirmationModal: (props: {
    componentType: string;
    onConfirm: () => void;
    onCancel: () => void;
  }) => void;
  closeConfirmationModal: () => void;
}

const ConfirmationModalContext = createContext<
  ConfirmationModalContextType | undefined
>(undefined);

export const useConfirmationModalContext = () => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error(
      'useConfirmationModalContext must be used within a ConfirmationModalProvider'
    );
  }
  return context;
};

export const ConfirmationModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationModalProps, setConfirmationModalProps] = useState({
    componentType: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const openConfirmationModal = (props: {
    componentType: string;
    onConfirm: () => void;
    onCancel: () => void;
  }) => {
    setConfirmationModalProps(props);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <ConfirmationModalContext.Provider
      value={{
        isConfirmationModalOpen,
        confirmationModalProps,
        openConfirmationModal,
        closeConfirmationModal,
      }}
    >
      {children}
    </ConfirmationModalContext.Provider>
  );
};
