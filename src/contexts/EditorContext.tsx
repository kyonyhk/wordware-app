'use client';

import { EditorRef } from '@/components/organisms';
import { createContext, ReactNode, useContext, useRef, RefObject } from 'react';

interface EditorContextType {
  editorRef: RefObject<EditorRef>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within a EditorProvider');
  }
  return context;
};

export const EditorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // STATES
  const editorRef = useRef<EditorRef>(null);

  // FUNCTIONS

  const value = {
    editorRef,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};
