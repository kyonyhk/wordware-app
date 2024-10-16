'use client';

import { useState, createContext, useContext, ReactNode } from 'react';

interface ProjectContextType {
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  updateProjectName: (newName: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      'useProjectContext must be used within a ProjectContextProvider'
    );
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // STATES
  const [projectName, setProjectName] = useState('Gordon Ramsay Roast');

  // FUNCTIONS
  const updateProjectName = (newName: string) => {
    setProjectName(newName);
  };

  const value = {
    projectName,
    setProjectName,
    updateProjectName,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
