'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { css } from '../../../styled-system/css';
import {
  Editor,
  ProjectHeader,
  ProjectOverview,
  ProjectSidebar,
  NavSidebar,
} from '@/components/organisms';
import { Blur } from '@/components/atoms/blur';
import { InputModal } from '@/components/molecules/modals/InputModal';
import { EditorRef } from '@/components/organisms/Editor';
import { formatWithCursor } from 'prettier';

const PROJECT_SIDEBAR_WIDTH = '240px'; // Adjust this value to match your ProjectSidebar width
const GAP = '16px';

export default function Home() {
  // const [isAddInputModalOpen, setIsAddInputModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('Gordon Ramsay Roast');
  const [currentFlowName, setCurrentFlowName] = useState(
    'Gordon Ramsay reviews 🍝🤬'
  );
  const [activeSection, setActiveSection] = useState('flowDetails');

  // Modal Constants
  const [inputs, setInputs] = useState<
    Array<{ name: string; description: string; type: string }>
  >([]);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

  const [editingInputIndex, setEditingInputIndex] = useState<number | null>(
    null
  );

  const [initialInput, setInitialInput] = useState<{
    name: string;
    description: string;
    type: string;
  } | null>(null);

  const handleProjectNameChange = (newName: string) => {
    setProjectName(newName);
  };

  const handleFlowNameChange = (newName: string) => {
    setCurrentFlowName(newName);
  };

  // Section Change Functions
  const handleSectionClick = useCallback((sectionId: string) => {
    if (editorRef.current) {
      editorRef.current.scrollToSection(sectionId);
    } else {
      console.log('Editor ref is not available');
    }
  }, []);

  const handleActiveSectionChange = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  const editorRef = useRef<EditorRef>(null);

  // Modal functions
  const openInputModal = (index?: number) => {
    if (index !== undefined) {
      setEditingInputIndex(index);
      setInitialInput(inputs[index]);
    } else {
      setEditingInputIndex(null);
      setInitialInput(null);
    }
    setIsInputModalOpen(true);
  };

  const closeInputModal = () => setIsInputModalOpen(false);

  const handleSaveInput = useCallback(
    (name: string, description: string, type: string) => {
      setInputs((prevInputs) => {
        if (editingInputIndex !== null) {
          const newInputs = [...prevInputs];
          newInputs[editingInputIndex] = { name, description, type };
          return newInputs;
        } else {
          return [...prevInputs, { name, description, type }];
        }
      });
      setEditingInputIndex(null);
      closeInputModal();
    },
    [editingInputIndex, setInputs, closeInputModal]
  );

  const handleInputEdit = useCallback(
    (index: number) => {
      setEditingInputIndex(index);
      setInitialInput(inputs[index]);
      setIsInputModalOpen(true);
    },
    [inputs]
  );

  // useEffect(() => {
  //   if (targetSection) {
  //     const timer = setTimeout(() => {
  //       setTargetSection(null);
  //     }, 1000); // Adjust this timeout as needed
  //     return () => clearTimeout(timer);
  //   }
  // }, [targetSection]);

  return (
    <>
      <Blur />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          w: '100%',
          h: '100%',
          overflow: 'hidden',
        })}
      >
        <NavSidebar />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
            w: '100%',
            h: 'calc(100% + 0px)',
            overflow: 'hidden',
          })}
        >
          {/* <div
            className={css({
              w: '100%',
              position: 'relative',
              top: '-40px',
              left: 0,
              right: 0,
              height: '120px',
              background:
                'linear-gradient(0deg, rgba(14, 19, 17, 0.00) 0%, rgba(14, 19, 17, 1.00) 30%)',
              pointerEvents: 'none',
              zIndex: 2,
            })}
          /> */}
          <div className={css({ position: 'relative', zIndex: 3, top: '0px' })}>
            <ProjectHeader
              projectName={projectName}
              isPublic={true}
              onNameChange={handleProjectNameChange}
            />
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              flex: 1,
              overflow: 'hidden', // Change this from 'auto' to 'hidden'
              position: 'relative',
              top: '0',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            })}
          >
            <div
              className={css({
                w: '100%',
                position: 'absolute',
                top: '-80px',
                left: 0,
                right: 0,
                height: '120px',
                background:
                  'linear-gradient(0deg, rgba(14, 19, 17, 0.00) 0%, rgba(14, 19, 17, 1.00) 30%)',
                pointerEvents: 'none',
                zIndex: 2,
              })}
            />
            <ProjectSidebar
              projectName={projectName}
              currentFlowName={currentFlowName}
              onProjectNameChange={handleProjectNameChange}
              onFlowNameChange={handleFlowNameChange}
            />
            <div className={css({ flex: 1, overflow: 'auto' })}>
              <Editor
                ref={editorRef}
                openInputModal={openInputModal}
                inputs={inputs}
                currentFlowName={currentFlowName}
                onFlowNameChange={handleFlowNameChange}
                onActiveSectionChange={handleActiveSectionChange}
                activeSection={activeSection}
                onInputEdit={handleInputEdit}
              />
            </div>
            <ProjectOverview
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
            />
          </div>
        </div>
      </div>
      <div
        className={css({
          position: 'absolute',
          top: '96px',
          right: isInputModalOpen ? '16px' : '-556px', // Adjust based on your modal width
          bottom: 0,
          width: '556px', // Adjust based on your modal width
          transition: 'right 0.5s cubic-bezier(0.87, 0, 0.13, 0)',
          zIndex: 1000,
        })}
      >
        <InputModal
          initialInput={initialInput}
          editIndex={editingInputIndex}
          onClose={() => {
            setEditingInputIndex(null);
            setInitialInput(null);
            closeInputModal();
          }}
          onSave={handleSaveInput}
        />
      </div>
    </>
  );
}
