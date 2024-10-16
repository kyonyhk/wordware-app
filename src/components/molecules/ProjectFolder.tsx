'use client';

import gsap from 'gsap';
import React, { useState, useRef, useEffect } from 'react';
import { css } from '../../../styled-system/css';
import { Cancel, Folder, FolderOpen, Plus } from '../atoms/icons';
import { IconButton, PrimaryButton } from '../atoms/buttons';
import { useFlowContext } from '@/contexts/FlowContext';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useConfirmationModalContext } from '@/contexts/ConfirmationModalContext';

interface ProjectFolderProps {
  isMainFlow: boolean;
}

export function ProjectFolder({ isMainFlow }: ProjectFolderProps) {
  const {
    flows,
    currentFlowId,
    updateFlowName,
    setActiveFlow,
    createNewFlow,
    deleteFlow,
  } = useFlowContext();

  const { projectName, updateProjectName } = useProjectContext();
  const { openConfirmationModal } = useConfirmationModalContext();

  const [isProjectNameSelected, setIsProjectNameSelected] = useState(true);
  const [isEditingProjectName, setIsEditingProjectName] = useState(false);
  const [editingFlowId, setEditingFlowId] = useState<string | null>(null);
  const [localFlows, setLocalFlows] = useState(flows);
  const [contentHeight, setContentHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectNameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const calculateContentHeight = () => {
    if (contentRef.current) {
      const newContentHeight = contentRef.current.scrollHeight;
      setContentHeight(newContentHeight);
    }
  };

  useEffect(() => {
    calculateContentHeight();
    window.addEventListener('resize', calculateContentHeight);
    return () => window.removeEventListener('resize', calculateContentHeight);
  }, []);

  useEffect(() => {
    if (isProjectNameSelected) {
      calculateContentHeight();
    }
  }, [isProjectNameSelected]);

  const handleProjectNameClick = () => {
    setIsProjectNameSelected(!isProjectNameSelected);
  };

  const handleProjectNameDoubleClick = () => {
    setIsEditingProjectName(true);
  };

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProjectName(e.target.value);
  };

  const handleProjectNameBlur = () => {
    setIsEditingProjectName(false);
  };

  const handleProjectNameKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleProjectNameBlur();
    }
  };

  const handleFlowClick = (flowId: string) => {
    setActiveFlow(flowId);
  };

  const handleFlowDoubleClick = (flowId: string) => {
    setEditingFlowId(flowId);
  };

  const handleFlowNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    flowId: string
  ) => {
    const newName = e.target.value;
    updateFlowName(flowId, newName);
  };

  const handleFlowNameBlur = () => {
    setEditingFlowId(null);
  };

  const handleFlowNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFlowNameBlur();
    }
  };

  const mainFlows = flows.filter((flow) => flow.isMainFlow);
  const subFlows = flows.filter((flow) => !flow.isMainFlow);

  const handleAddFlow = (isMainFlow: boolean) => {
    const newFlow = {
      id: `flow${flows.length + 1}`,
      name: `New ${isMainFlow ? 'Main' : 'Sub'} Flow`,
      // Add other properties as needed
    };
    createNewFlow(isMainFlow);
  };

  const handleDeleteFlow = (flowId: string, isMainFlow: boolean) => {
    openConfirmationModal({
      componentType: isMainFlow ? 'Main Flow' : 'Sub Flow',
      onConfirm: () => {
        const flowElement = document.getElementById(`flow-${flowId}`);
        if (flowElement) {
          const primaryButton = flowElement.querySelector('.primary-button');
          const cancelButton = flowElement.querySelector('.cancel-button');

          const tl = gsap.timeline({
            onComplete: () => {
              // After animation completes, delete the flow
              deleteFlow(flowId);
            },
          });

          tl.to(
            primaryButton,
            {
              x: -30,
              opacity: 0,
              duration: 0.5,
              ease: 'expo.out',
            },
            0
          );

          tl.to(
            cancelButton,
            {
              scale: 0.9,
              opacity: 0,
              duration: 0.5,
              ease: 'expo.out',
            },
            0
          );

          tl.to(
            flowElement,
            {
              height: 0,
              opacity: 0,
              duration: 0.5,
              ease: 'expo.out',
            },
            0.3
          ); // Start this animation 0.3 seconds after the timeline begins
        } else {
          // If element not found, just delete the flow
          deleteFlow(flowId);
        }
      },
      onCancel: () => {
        console.log('Flow deletion cancelled');
      },
    });
  };

  const renderFlowItem = (flow: FlowType) => (
    <div
      key={flow.id}
      id={`flow-${flow.id}`}
      className={css({
        display: 'flex',
        flexDirection: 'row',
        gap: '4px',
        justifyContent: 'space-between',
        alignItems: 'center',
        w: '100%',
      })}
    >
      <PrimaryButton
        isSidebar={true}
        isActive={flow.id === currentFlowId}
        onClick={() => handleFlowClick(flow.id)}
        onDoubleClick={() => handleFlowDoubleClick(flow.id)}
        className={
          css({
            flexGrow: 1,
            flexShrink: 1,
            minWidth: 0,
            maxWidth: 'calc(100% - 28px)', // Adjust this value based on the width of your delete icon
          }) + ' primary-button'
        }
      >
        {editingFlowId === flow.id ? (
          <input
            type="text"
            value={flow.name}
            onChange={(e) => handleFlowNameChange(e, flow.id)}
            onBlur={handleFlowNameBlur}
            onKeyDown={handleFlowNameKeyDown}
            autoFocus
            className={css({
              w: '100%',
              color: 'text.secondary',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              textStyle: 'body5',
            })}
          />
        ) : (
          flow.name
        )}
      </PrimaryButton>
      <IconButton
        icon={
          <Cancel
            width={16}
            height={16}
            color="red.100"
            className={css({
              color: 'text.primary',
              opacity: 0.5,
              _hover: {
                color: 'red.100',
                scale: 1.2,
                opacity: 1.0,
              },
              cursor: 'pointer',
            })}
          />
        }
        onClick={() => handleDeleteFlow(flow.id, flow.isMainFlow)}
        className={
          css({
            flexShrink: 0,
          }) + ' cancel-button'
        }
      />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        bg: 'scheme1.tertiaryContainer',
        borderRadius: '8px',
        w: '100%',
        h: isProjectNameSelected
          ? 'auto'
          : `${projectNameRef.current?.clientHeight || 0}px`,
        transition: 'height 1.0s curve-bezier(0.87, 0, 0.13, 0)',
      })}
    >
      {/* Project Group */}
      <div
        ref={projectNameRef}
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          w: '100%',
        })}
      >
        {/* Project Name */}
        <button
          className={css({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
            padding: '8px 8px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: isProjectNameSelected ? 'accent.20' : 'scheme1.border',
            bg: isProjectNameSelected
              ? 'accent.5'
              : 'scheme1.secondaryContainer',
            _hover: {
              bg: isProjectNameSelected
                ? 'accent.20'
                : 'scheme1.tertiaryContainer',
              cursor: 'pointer !important ',
              transition:
                'borderColor 1.0s cubic-bezier(0.87, 0, 0.13, 0), bg 1.0s cubic-bezier(0.87, 0, 0.13, 0)',
            },
          })}
          onClick={handleProjectNameClick}
          onDoubleClick={handleProjectNameDoubleClick}
        >
          {isProjectNameSelected ? (
            <div className={css({ w: '16px', h: '16px' })}>
              <FolderOpen width={16} height={16} color="text.primary" />
            </div>
          ) : (
            <div className={css({ w: '16px', h: '16px' })}>
              <Folder width={16} height={16} color="text.primary" />
            </div>
          )}

          {isEditingProjectName ? (
            <input
              type="text"
              value={projectName}
              onChange={handleProjectNameChange}
              onBlur={handleProjectNameBlur}
              onKeyDown={handleProjectNameKeyDown}
              autoFocus
              className={css({
                textStyle: 'heading5',
                bg: 'transparent',
                border: 'none',
                outline: 'none',
                w: '100%',
                color: 'text.primary',
              })}
            />
          ) : (
            <div
              className={css({
                textStyle: 'heading5',
                textAlign: 'left',
                cursor: 'pointer',
              })}
            >
              {projectName}
            </div>
          )}
        </button>

        {/* Content */}
        <div
          ref={contentRef}
          className={css({
            display: isProjectNameSelected ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '24px',
            w: '100%',
            transition:
              'opacity 1.0s cubic-bezier(0.87, 0, 0.13, 0), max-height 1.0s cubic-bezier(0.87, 0, 0.13, 0)',
            opacity: isProjectNameSelected ? 1 : 0,
            maxHeight: isProjectNameSelected ? `${contentHeight}px` : '0px',
            overflow: 'hidden',
          })}
        >
          {/* Main Flow */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '8px',
              w: '100%',
            })}
          >
            <div
              className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '4px',
                })}
              >
                <Folder width={16} height={16} color="text.primary" />
                <div className={css({ textStyle: 'heading6', opacity: 0.8 })}>
                  Main Flows
                </div>
              </div>
              <IconButton
                icon={<Plus width={16} height={16} color="text.primary" />}
                onClick={() => handleAddFlow(true)}
              />
            </div>
            {mainFlows.length > 0 ? (
              mainFlows.map(renderFlowItem)
            ) : (
              <div
                className={css({
                  textStyle: 'body5',
                  color: 'text.secondary',
                  border: '1px dash',
                  borderColor: 'scheme1.border',
                  borderRadius: '8px',
                  padding: '8px',
                  textAlign: 'center',
                })}
              >
                No main flows available
              </div>
            )}
          </div>

          {/* Sub Flow */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '8px',
              w: '100%',
            })}
          >
            <div
              className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '4px',
                })}
              >
                <Folder width={16} height={16} color="text.primary" />
                <div className={css({ textStyle: 'heading6', opacity: 0.8 })}>
                  Sub Flows
                </div>
              </div>
              <IconButton
                icon={<Plus width={16} height={16} color="text.primary" />}
                onClick={() => handleAddFlow(false)}
              />
            </div>
            {subFlows.length > 0 ? (
              subFlows.map(renderFlowItem)
            ) : (
              <div
                className={css({
                  textStyle: 'body5',
                  color: 'text.secondary',
                  border: '1px dash',
                  borderColor: 'scheme1.border',
                  borderRadius: '8px',
                  padding: '8px',
                  textAlign: 'center',
                })}
              >
                No sub flows available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
