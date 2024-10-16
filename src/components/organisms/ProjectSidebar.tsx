'use client';

import { isMinusToken } from 'typescript';
import { css } from '../../../styled-system/css';
import { PrimaryButton } from '../atoms/buttons';
import { Plus } from '../atoms/icons';
import { ProjectFolder } from '../molecules/ProjectFolder';
import { useProjectContext } from '@/contexts/ProjectContext';

interface ProjectSidebarProps {
  isMainFlow: boolean;
}

export function ProjectSidebar({ isMainFlow }: ProjectSidebarProps) {
  const projectSidebarContainerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    w: '248px',
    padding: '16px',
    borderRadius: '8px',
    marginTop: '16px',
    marginBottom: '40px',
    bg: 'scheme1.secondaryContainer',
    position: 'relative',
    zIndex: 3,
    border: '100px',
  });

  return (
    <div className={projectSidebarContainerStyles}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          justifyContent: 'flex-start',
          w: '100%',
        })}
      >
        <ProjectFolder isMainFlow={isMainFlow} />
        <PrimaryButton
          leftIcon={<Plus width={16} height={16} color="text.primary" />}
          className={css({ w: '100%' })}
        >
          <div className={css({ textStyle: 'heading6', opacity: 1.0 })}>
            ADD PROJECT
          </div>
        </PrimaryButton>
      </div>
      <PrimaryButton className={css({ w: '100%' })}>TEMPLATES</PrimaryButton>
    </div>
  );
}
