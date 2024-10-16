'use client';

import { useState } from 'react';
import { css } from '../../../styled-system/css';
import {
  Plus,
  Minus,
  Check,
  Cancel,
  TriangleArrowUp,
  TriangleArrowDown,
  TriangleArrowLeft,
  TriangleArrowRight,
  Play,
  Upload,
  Folder,
  Sidebar,
  Explore,
  Help,
  Documentation,
  Delete,
  Draggable,
  Image,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from '@/components/atoms/icons';
import {
  PrimaryButton,
  OverviewButton,
  OutputLabelButton,
  AddBlockButton,
  InputButton,
  InputLabelButton,
  NoBorderButton,
} from '@/components/atoms/buttons';
import { Blur } from '@/components/atoms/blur';
import { ProjectName } from '@/components/molecules';
import { ProjectSidebar } from '@/components/organisms';

export default function Home() {
  const [projectName, setProjectName] = useState('');
  const [currentFlowName, setCurrentFlowName] = useState('');

  const handleProjectNameChange = (newName: string) => {
    setProjectName(newName);
  };

  const handleFlowNameChange = (newName: string) => {
    setCurrentFlowName(newName);
  };

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
            gap: '40px',
            w: '100%',
            h: 'calc(100% + 240px)',
            overflow: 'hidden',
          })}
        >
          <ProjectSidebar
            key={currentFlowName}
            projectName={projectName}
            currentFlowName={currentFlowName}
            onProjectNameChange={handleProjectNameChange}
            onFlowNameChange={handleFlowNameChange}
          />
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            <div
              className={css({
                textStyle: 'heading1',
                color: 'scheme2.border',
              })}
            >
              HELLO WORLD
            </div>
            <div
              className={css({
                textStyle: 'heading4',
                textGradient: 'teal100',
              })}
            >
              HELLO
            </div>
            <div
              className={css({
                textStyle: 'body4',
                color: 'text.primary',
              })}
            >
              This is a paragraph.
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <PrimaryButton
                leftIcon={<Plus width={24} height={24} color="text.primary" />}
              >
                BUTTON
              </PrimaryButton>
              <PrimaryButton
                leftIcon={
                  <Upload width={24} height={24} color="text.primary" />
                }
              >
                PUBLISH
              </PrimaryButton>
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <NoBorderButton
                icon={<Plus width={16} height={16} color="text.primary" />}
              >
                BUTTON
              </NoBorderButton>
              <NoBorderButton
                icon={<Upload width={16} height={16} color="text.primary" />}
              >
                PUBLISH
              </NoBorderButton>
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <PrimaryButton isActive={true} isSidebar={true}>
                BUTTON
              </PrimaryButton>
              <PrimaryButton
                variant="delete"
                leftIcon={<Delete width={24} height={24} color="red.100" />}
              >
                DELETE
              </PrimaryButton>
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <OverviewButton isActive={true}>BUTTON</OverviewButton>
              <OverviewButton>BUTTON</OverviewButton>
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <AddBlockButton>
                <Plus width={24} height={24} color="text.primary" />
              </AddBlockButton>
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <InputButton
                initialName="DESCRIPTION"
                initialDescription="The generated description of the image"
                initialType="LONG TEXT"
              />
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <InputLabelButton
                inputName="IMAGE"
                inputDescription="An image of some food to be reviewed"
                icon={<Image width={16} height={16} color="text.primary" />}
                inputType="TYPE - IMAGE"
              />
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <OutputLabelButton
                outputName="GENERATED DESCRIPTION"
                outputLabel="Generated using"
                outputModel="CLAUDE 3 HIAKU"
              />
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <Plus
                width={24}
                height={24}
                className={css({ color: 'red.100' })}
              />
              <Minus width={24} height={24} color="red.100" />
              <Check width={24} height={24} color="red.100" />
              <Cancel width={24} height={24} color="red.100" />
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <Play width={24} height={24} color="red.100" />
              <Upload width={24} height={24} color="red.100" />
              <Folder width={24} height={24} color="red.100" />
              <Sidebar width={24} height={24} color="red.100" />
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <Explore width={24} height={24} color="red.100" />
              <Help width={24} height={24} color="red.100" />
              <Documentation width={24} height={24} color="red.100" />
              <Delete width={24} height={24} color="red.100" />
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <Draggable width={24} height={24} color="red.100" />
              <Image width={24} height={24} color="red.100" />
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <TriangleArrowUp width={24} height={24} color="red.100" />
              <TriangleArrowDown width={24} height={24} color="red.100" />
              <TriangleArrowLeft width={24} height={24} color="red.100" />
              <TriangleArrowRight width={24} height={24} color="red.100" />
            </div>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <ArrowUp width={24} height={24} color="red.100" />
              <ArrowDown width={24} height={24} color="red.100" />
              <ArrowLeft width={24} height={24} color="red.100" />
              <ArrowRight width={24} height={24} color="red.100" />
            </div>
            <ProjectName
              projectName={projectName}
              isPublic={true}
              onNameChange={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
