'use client';

import React, { createContext, useContext, useState } from 'react';

interface FlowSectionContextType {
  openSelectInputDropdownId: string | null;
  setOpenSelectInputDropdownId: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

const FlowSectionContext = createContext<FlowSectionContextType | undefined>(
  undefined
);

export const useFlowSectionContext = () => {
  const context = useContext(FlowSectionContext);
  if (!context) {
    throw new Error(
      'useFlowSectionContext must be used within a FlowSectionProvider'
    );
  }
  return context;
};

export const FlowSectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // CONTEXT IMPORT
  const [openSelectInputDropdownId, setOpenSelectInputDropdownId] = useState<
    string | null
  >(null);

  // STATES

  // FUNCTIONS

  const value = {
    openSelectInputDropdownId,
    setOpenSelectInputDropdownId,
  };

  return (
    <FlowSectionContext.Provider value={value}>
      {children}
    </FlowSectionContext.Provider>
  );
};
