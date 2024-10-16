'use client';

import { css } from '../../styled-system/css';
import {
  Editor,
  ProjectHeader,
  ProjectOverview,
  ProjectSidebar,
  NavSidebar,
} from '@/components/organisms';
import { Blur } from '@/components/atoms/blur';
import {
  InputModal,
  AddFlowModal,
  AddInstructionModal,
  AddGenerationModal,
  ConfirmationModal,
} from '@/components/molecules/modals';
import { useInputContext } from '@/contexts/InputContext';
import { useEditorContext } from '@/contexts/EditorContext';
import { useOutputContext } from '@/contexts/OutputContext';
import { useFlowContext } from '@/contexts/FlowContext';
import { useInstructionContext } from '@/contexts/InstructionContext';
import { useSectionChangeContext } from '@/contexts/SectionChangeContext';
import { useConfirmationModalContext } from '@/contexts/ConfirmationModalContext';

const PROJECT_SIDEBAR_WIDTH = '240px'; // Adjust this value to match your ProjectSidebar width
const GAP = '16px';

interface PromptContent {
  id: string;
  type: 'text' | 'input' | 'type';
  content: string[];
}

export default function Home() {
  const { isInputModalOpen } = useInputContext();

  const { editorRef } = useEditorContext();

  const { isAddGenerationModalOpen } = useOutputContext();

  const {
    isAddInstructionModalOpen,
    handleSubFlowClick,
    isAddFlowModalOpen,
    closeAddFlowModal,
    handleSaveFlowComponent,
  } = useInstructionContext();

  const { flows, setFlows, currentFlowId, currentFlow, activeSection } =
    useFlowContext();

  const { handleActiveSectionChange, handleSectionClick } =
    useSectionChangeContext();

  const {
    isConfirmationModalOpen,
    confirmationModalProps,
    closeConfirmationModal,
  } = useConfirmationModalContext();

  return (
    <div>
      <Blur />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          w: '100%',
          h: 'calc(100vh - 40px)',
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
            h: '100%',
            overflow: 'hidden',
          })}
        >
          <div className={css({ position: 'relative', zIndex: 3, top: '0px' })}>
            <ProjectHeader isPublic={true} />
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
              isMainFlow={
                flows.find((flow) => flow.id === currentFlowId)?.isMainFlow ||
                false
              }
            />
            <div
              className={css({
                flex: 1,
                overflow: 'hidden',
              })}
            >
              <Editor
                ref={editorRef}
                flows={flows}
                currentFlowId={currentFlowId}
                activeSection={activeSection}
                onActiveSectionChange={handleActiveSectionChange}
              />
            </div>
            <ProjectOverview
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
              currentFlow={currentFlow || { components: [] }}
            />
          </div>
        </div>
      </div>
      <div
        className={css({
          opacity: isInputModalOpen ? 1.0 : 0,
          position: 'absolute',
          top: '96px',
          right: isInputModalOpen ? '16px' : '-556px', // Adjust based on your modal width
          bottom: 0,
          width: '556px', // Adjust based on your modal width
          transition: 'right 0.5s cubic-bezier(0.87, 0, 0.13, 0)',
          zIndex: 1000,
        })}
      >
        {isInputModalOpen && <InputModal />}
      </div>
      <div
        className={css({
          opacity: isAddGenerationModalOpen ? 1.0 : 0,
          position: 'absolute',
          top: '96px',
          right: isAddGenerationModalOpen ? '16px' : '-556px', // Adjust based on your modal width
          bottom: 0,
          width: '556px', // Adjust based on your modal width
          transition: 'right 0.5s cubic-bezier(0.87, 0, 0.13, 0)',
          zIndex: 1000,
        })}
      >
        {isAddGenerationModalOpen && <AddGenerationModal />}
      </div>
      <div
        className={css({
          opacity: isAddInstructionModalOpen ? 1.0 : 0,
          position: 'absolute',
          top: '96px',
          right: isAddInstructionModalOpen ? '16px' : '-556px',
          bottom: 0,
          width: '556px',
          transition: 'right 0.5s cubic-bezier(0.87, 0, 0.13, 0)',
          zIndex: 1000,
        })}
      >
        <AddInstructionModal />
      </div>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          elementType={confirmationModalProps.componentType}
          onConfirm={() => {
            confirmationModalProps.onConfirm();
            closeConfirmationModal();
          }}
          onCancel={() => {
            confirmationModalProps.onCancel();
            closeConfirmationModal();
          }}
        />
      )}
    </div>
  );
}
