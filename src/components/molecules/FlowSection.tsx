'use client';

import { useMemo } from 'react';
import { css } from '../../../styled-system/css';
import {
  OutputLabelButton,
  CommentsButton,
  AddBlockButton,
  RequiredInputButton,
  AnimatedIconButton,
} from '../atoms/buttons';
import { Plus, Delete } from '../atoms/icons';
import { RequiredInput } from '../atoms/inputs';
import { SelectInputDropdown } from '../atoms/dropdown';
import { useFlowContext } from '@/contexts/FlowContext';
import { usePromptSectionContext } from '@/contexts/PromptSectionContext';
import { useFlowSectionContext } from '@/contexts/FlowSectionContext';
import { useOutputContext } from '@/contexts/OutputContext';
import { useEffect } from 'react';
import { useConfirmationModalContext } from '@/contexts/ConfirmationModalContext';

interface FlowSectionProps {
  component: {
    id: string;
    type: string;
    name: string;
    description: string;
    requiredInputs: Array<{
      requiredInputId: string;
      name: string;
      description: string;
      type: string;
      selectedInput?: {
        name: string;
        parentComponent?: string;
        model?: string;
      };
    }>;
    output?: {
      name: string;
      model: string;
    };
  };
  isActive: boolean;
  isFocused: boolean;
  onDelete: () => void;
  onFocus: () => void;
}

export function FlowSection({
  component,
  isActive,
  isFocused,
  onDelete,
  onFocus,
}: FlowSectionProps) {
  console.log('FlowSection component:', component);
  console.log('requiredInputs:', component?.requiredInputs);

  const {
    currentFlow,
    focusedSection,
    setFlows,
    deleteComponent,
    setFocusedSection,
  } = useFlowContext();
  const { openSelectInputDropdownId, setOpenSelectInputDropdownId } =
    useFlowSectionContext();
  const { openAddGenerationModal } = useOutputContext();
  const { openConfirmationModal } = useConfirmationModalContext();

  const subFlowName = component.name;
  const subFlowDescription = component.description;
  const output = component.output;

  const currentComponent = useMemo(() => {
    const component = currentFlow?.components.find(
      (component) => component.id === component.id
    );
    return component;
  }, [currentFlow, component.id]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFocus();
  };

  const handleFocus = () => {
    if (currentComponent) {
      setFocusedSection(currentComponent.id, currentComponent.type);
    }
  };

  const handleAddBlockClick = (
    e: React.MouseEvent,
    requiredInputId: string
  ) => {
    e.stopPropagation();
    setOpenSelectInputDropdownId((prevId) =>
      prevId === requiredInputId ? null : requiredInputId
    );
  };

  const handleRequiredInputButtonClick = (
    e: React.MouseEvent,
    requiredInputId: string
  ) => {
    e.stopPropagation();
    setOpenSelectInputDropdownId((prevId) =>
      prevId === requiredInputId ? null : requiredInputId
    );
  };

  const handleDeleteSelectedInput = (requiredInputId: string) => {
    setFlows((prevFlows) =>
      prevFlows.map((flow) => {
        if (flow.id === currentFlow?.id) {
          const updatedComponents = flow.components.map((comp) => {
            if (comp.id === component.id) {
              const updatedRequiredInputs = comp.requiredInputs.map((input) => {
                if (input.requiredInputId === requiredInputId) {
                  // Remove the selectedInput property
                  const { selectedInput, ...restInput } = input;
                  return restInput;
                }
                return input;
              });
              return { ...comp, requiredInputs: updatedRequiredInputs };
            }
            return comp;
          });
          return { ...flow, components: updatedComponents };
        }
        return flow;
      })
    );
  };

  // Update this part
  const allOutputs = useMemo(() => {
    return (
      currentFlow?.components?.reduce(
        (acc, comp) => {
          if (
            comp.output &&
            (comp.output.name || comp.output.model) &&
            comp.id !== component.id // Exclude outputs from the current FlowSection
          ) {
            acc.push({
              name: comp.output.name || '',
              parentComponent: comp.name || '',
              componentId: comp.id,
              model: comp.output.model || '',
            });
          }
          return acc;
        },
        [] as {
          name: string;
          parentComponent: string;
          componentId: string;
          model: string;
        }[]
      ) || []
    );
  }, [currentFlow, component.id]);

  const handleSelectInput = (
    selectedOutput: {
      name: string;
      parentComponent: string;
      componentId: string;
      model: string;
    },
    requiredInputId: string
  ) => {
    setFlows((prevFlows) =>
      prevFlows.map((flow) => {
        if (flow.id === currentFlow?.id) {
          const updatedComponents = flow.components.map((comp) => {
            if (comp.id === component.id) {
              const updatedRequiredInputs = comp.requiredInputs.map((input) => {
                if (input.requiredInputId === requiredInputId) {
                  return {
                    ...input,
                    selectedInput: {
                      name: selectedOutput.name,
                      parentComponent: selectedOutput.parentComponent,
                      model: selectedOutput.model,
                    },
                  };
                }
                return input;
              });
              return { ...comp, requiredInputs: updatedRequiredInputs };
            }
            return comp;
          });
          return { ...flow, components: updatedComponents };
        }
        return flow;
      })
    );
    setOpenSelectInputDropdownId(null);
  };

  const handleDelete = () => {
    console.log('handleDelete called');
    openConfirmationModal({
      componentType: 'flow',
      onConfirm: () => {
        console.log('Deleting FlowSection with ID:', component.id);
        deleteComponent(component.id);
      },
      onCancel: () => {
        console.log('Deletion cancelled');
      },
    });
  };

  // Add this useEffect to log the current component after each render
  useEffect(() => {
    console.log('Current component:', component);
  }, [component]);

  return (
    <div
      className={css({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        w: '100%',
        gap: '24px',
        padding: '16px',
        bg: isActive ? 'accent.5' : 'scheme1.primaryContainer',
        borderColor: isActive ? 'accent.20' : 'transparent',
        border: '1px solid',
        borderRadius: '8px',
      })}
      onClick={handleClick}
      onFocus={(e) => {
        e.stopPropagation();
        onFocus();
      }}
    >
      <div
        className={css({
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 1,
        })}
      >
        <AnimatedIconButton
          icon={<Delete width={16} height={16} />}
          buttonText="DELETE"
          onClick={onDelete}
          // Add this line to check if the click event is firing
          onMouseDown={() => console.log('Delete button clicked')}
        />
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          Flow
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          })}
        >
          <div className={css({ textStyle: 'heading2' })}>{subFlowName}</div>
          <div className={css({ textStyle: 'body4', color: 'text.secondary' })}>
            {subFlowDescription}
          </div>
        </div>
      </div>
      {/* <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          justifyContent: 'flex-start',
        })}
      >
        <CommentsButton />
        <div
          className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
        >
          <div
            className={css({
              h: '100%',
              w: '2px',
              borderRadius: '100px',
              bg: 'text.secondary',
            })}
          ></div>
          <div className={css({ textStyle: 'body4', color: 'text.secondary' })}>
            Then we pass that description to a 2nd prompt that puts it in the
            style of Gordon Ramsey. There are a couple of reasons why we do it
            in two stages.
          </div>
        </div>
      </div> */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          Required Input
        </div>
        {Array.isArray(component?.requiredInputs) ? (
          component.requiredInputs.map((input) => (
            <div
              key={input.requiredInputId}
              className={css({
                display: 'flex',
                flexDirection: 'row',
                gap: '24px',
                justifyContent: 'space-between',
                alignItems: 'center',
              })}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={css({ flex: 1 })}>
                <RequiredInput
                  subFlowRequiredInput={input.name.toUpperCase()}
                  subFlowRequiredType={input.type.toUpperCase()}
                />
              </div>
              <div
                className={css({
                  textStyle: 'heading3',
                  color: 'text.secondary',
                })}
              >
                :
              </div>
              <div className={css({ position: 'relative', flex: 1 })}>
                {input.selectedInput ? (
                  <RequiredInputButton
                    name={input.selectedInput.name}
                    label={
                      input.selectedInput.parentComponent
                        ? 'Generated from'
                        : 'Generated using'
                    }
                    description={
                      input.selectedInput.parentComponent ||
                      input.selectedInput.model
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRequiredInputButtonClick(e, input.requiredInputId);
                    }}
                    onDelete={(e) => {
                      e.stopPropagation();
                      handleDeleteSelectedInput(input.requiredInputId);
                    }}
                  />
                ) : (
                  <AddBlockButton
                    onClick={(e) =>
                      handleAddBlockClick(e, input.requiredInputId)
                    }
                  >
                    <Plus width={24} height={24} color="text.primary" />
                  </AddBlockButton>
                )}
                {openSelectInputDropdownId === input.requiredInputId && (
                  <div
                    className={css({
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      zIndex: 10,
                    })}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SelectInputDropdown
                      outputs={allOutputs}
                      onClose={(e) => {
                        e.stopPropagation();
                        setOpenSelectInputDropdownId(null);
                      }}
                      onSelect={(selectedOutput) =>
                        handleSelectInput(selectedOutput, input.requiredInputId)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No required inputs</div>
        )}
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <div
          className={css({
            textStyle: 'heading6',
            color: 'text.secondary',
            opacity: 0.5,
          })}
        >
          Output
        </div>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '8px',
            width: '100%',
            minHeight: '100px',
          })}
        >
          {output && Object.keys(output).length > 0 ? (
            <OutputLabelButton
              outputName={output.name || ''}
              outputLabel="Generated using"
              outputModel={output.model || ''}
              disableHover={true}
            />
          ) : (
            <AddBlockButton onClick={openAddGenerationModal}>
              <Plus width={24} height={24} color="text.primary" />
            </AddBlockButton>
          )}
        </div>
      </div>
    </div>
  );
}
