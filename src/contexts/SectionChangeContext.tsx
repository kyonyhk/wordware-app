'use client';

import {
  ReactNode,
  useCallback,
  useState,
  createContext,
  useContext,
} from 'react';
import { useEditorContext } from './EditorContext';

interface SectionChangeContextType {
  activeSection: {
    id: string;
    type: string;
  };
  handleSectionClick: (sectionId: string) => void;
}

const SectionChangeContext = createContext<
  SectionChangeContextType | undefined
>(undefined);

export const useSectionChangeContext = () => {
  const context = useContext(SectionChangeContext);
  if (!context) {
    throw new Error(
      'useSectionChangeContext must be used within a SectionChangeProvider'
    );
  }
  return context;
};

export const SectionChangeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // CONTEXT IMPORT
  const { editorRef } = useEditorContext();

  // STATES
  const [activeSection, setActiveSection] = useState<{
    id: string;
    type: string;
  }>({ id: 'flowDetails', type: 'flowDetails' });

  // FUNCTIONS
  const handleSectionClick = useCallback(
    (sectionId: string) => {
      if (editorRef.current) {
        editorRef.current.scrollToSection(sectionId);
      } else {
        console.log('Editor ref is not available');
      }
    },
    [editorRef]
  );

  const value: SectionChangeContextType = {
    activeSection,
    handleSectionClick,
  };

  return (
    <SectionChangeContext.Provider value={value}>
      {children}
    </SectionChangeContext.Provider>
  );
};
