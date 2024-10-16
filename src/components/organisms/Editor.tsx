import gsap from 'gsap';
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useMemo,
} from 'react';
import { css } from '../../../styled-system/css';
import { Divider } from '../atoms/divider';
import {
  StepOne,
  StepTwo,
  StepThree,
  AddInstruction,
  FlowDetails,
  Output,
  PromptSection,
  FlowSection,
} from '../molecules';
import { ArrowDown, Plus } from '../atoms/icons';
import { Flow as FlowType } from './Flow';
import { useSectionChangeContext } from '@/contexts/SectionChangeContext';
import { useInputContext } from '@/contexts/InputContext';
import { useInstructionContext } from '@/contexts/InstructionContext';
import { useOutputContext } from '@/contexts/OutputContext';
import { useFlowContext } from '@/contexts/FlowContext';
import { useConfirmationModalContext } from '@/contexts/ConfirmationModalContext';
import { PrimaryButton } from '../atoms/buttons';

export interface EditorRef {
  scrollToSection: (sectionId: string) => void;
}
export interface PromptContent {
  id: string;
  type: 'text' | 'input' | 'type';
  content: string[];
}

interface EditorProps {
  flows: FlowType[];
  currentFlowId: string;
  activeSection: { id: string; type: string };
  onActiveSectionChange: (sectionId: string, sectionType: string) => void;
}

interface VisibleSection {
  id: string;
  ratio: number;
}

type SectionRefs = {
  [key: string]: React.RefObject<HTMLDivElement>;
};

const MemoizedFlowSection = React.memo(FlowSection);

const LoadingComponent = () => (
  <div
    className={css({ paddingTop: '16px', paddingBottom: '40px', h: '100%' })}
  >
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backdropBlur: '8px',
        border: '1px solid',
        borderColor: 'scheme1.border',
        borderRadius: '8px',
      })}
    >
      <div
        className={css({
          textStyle: 'heading4',
        })}
      >
        Loading...
      </div>
    </div>
  </div>
);

const Editor = forwardRef<EditorRef, EditorProps>(
  ({ flows = [], currentFlowId }, ref) => {
    // STATES
    const {
      handleActiveSectionChange,
      activeSection,
      focusedSection,
      deleteComponent,
      setFocusedSection,
    } = useFlowContext();
    const { handleInputEdit, openInputModal } = useInputContext();
    const { openAddInstructionModal } = useInstructionContext();
    const { updateFinalOutput } = useOutputContext();
    const { openConfirmationModal } = useConfirmationModalContext();
    const { handleAddFlow } = useFlowContext();

    const currentFlow = useMemo(
      () => flows.find((flow) => flow.id === currentFlowId),
      [flows, currentFlowId]
    );

    const editorRef = useRef<HTMLDivElement>(null);
    const [sectionRefs, setSectionRefs] = useState<SectionRefs>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const newSectionRefs: SectionRefs = {
        flowDetails: { current: null },
        output: { current: null },
      };

      if (currentFlow && currentFlow.components) {
        currentFlow.components.forEach((component) => {
          newSectionRefs[component.id] = { current: null };
        });
      }

      setSectionRefs(newSectionRefs);
    }, [currentFlow]);

    // USE EFFECTS
    useEffect(() => {
      const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -60% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      };

      const observerCallback: IntersectionObserverCallback = (entries) => {
        let maxVisibleSection: { id: string; ratio: number } | null = null;

        entries.forEach((entry) => {
          const sectionId = entry.target.id.replace('component-', '');
          if (
            entry.isIntersecting &&
            (!maxVisibleSection ||
              entry.intersectionRatio > maxVisibleSection.ratio)
          ) {
            maxVisibleSection = {
              id: sectionId,
              ratio: entry.intersectionRatio,
            };
          }
        });

        if (maxVisibleSection && maxVisibleSection.ratio >= 0.3) {
          const sectionType =
            maxVisibleSection.id === 'flowDetails'
              ? 'flowDetails'
              : maxVisibleSection.id === 'output'
                ? 'output'
                : currentFlow?.components.find(
                    (c) => c.id === maxVisibleSection?.id
                  )?.type || '';
          handleActiveSectionChange(maxVisibleSection.id, sectionType);
        }
      };

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      );

      Object.values(sectionRefs).forEach((sectionRef) => {
        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }
      });

      return () => {
        observer.disconnect();
      };
    }, [handleActiveSectionChange, sectionRefs, currentFlow]);

    useImperativeHandle(ref, () => ({
      scrollToSection: (sectionId: string) => {
        const sectionRef = sectionRefs[sectionId];
        if (sectionRef && sectionRef.current && editorRef.current) {
          const topPadding = 120;
          const sectionTop = sectionRef.current.offsetTop - topPadding;

          editorRef.current.scrollTo({
            top: sectionTop,
            behavior: 'smooth',
          });
        }
      },
    }));

    const hideScrollbarStyles = css({
      '&::-webkit-scrollbar': { display: 'none' },
      scrollbarWidth: 'none',
    });

    // Add this effect to scroll to top when currentFlowId changes
    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [currentFlowId]);

    // FUNCTIONS
    const handleDeleteComponent = (componentId: string) => {
      openConfirmationModal({
        componentType: 'component',
        onConfirm: () => {
          const componentElement = document.getElementById(
            `component-${componentId}`
          );
          const arrowElement = document.getElementById(`arrow-${componentId}`);

          if (componentElement) {
            const tl = gsap.timeline({
              onComplete: () => {
                deleteComponent(currentFlowId, componentId);
                setFocusedSection({ id: '', type: '' });
              },
            });

            tl.to(
              componentElement,
              {
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: 'expo.out',
              },
              0
            );

            if (arrowElement) {
              tl.to(
                arrowElement,
                {
                  opacity: 0,
                  duration: 0.5,
                  ease: 'expo.out',
                },
                0
              );
            }

            tl.to(
              componentElement,
              {
                height: 0,
                duration: 0.5,
                ease: 'expo.out',
              },
              0.3
            );
          } else {
            deleteComponent(currentFlowId, componentId);
            setFocusedSection({ id: '', type: '' });
          }
        },
        onCancel: () => {
          console.log('Deletion cancelled');
        },
      });
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        {isLoading && <LoadingComponent />}
        {currentFlow ? (
          <>
            <div
              ref={editorRef}
              className={
                css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                  width: '100%',
                  height: '100%',
                  overflow: 'auto',
                  paddingTop: '40px',
                  paddingBottom: '720px',
                  position: 'relative',
                  zIndex: 0,
                }) +
                ' ' +
                hideScrollbarStyles
              }
            >
              {/* First Section */}
              <div
                ref={sectionRefs.flowDetails}
                id="flowDetails"
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  w: '100%',
                  gap: '16px',
                })}
              >
                <StepOne />
                <FlowDetails
                  isActive={activeSection.id === 'flowDetails'}
                  onInputEdit={handleInputEdit}
                />
              </div>

              <Divider />

              {/* Second Section */}
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  justifyContent: 'center',
                  w: '100%',
                })}
              >
                <StepTwo />
                {currentFlow.components.map((component, index) => (
                  <React.Fragment key={component.id}>
                    <div
                      ref={sectionRefs[component.id]}
                      id={`component-${component.id}`}
                      data-type={component.type}
                      className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        w: '100%',
                        backgroundColor:
                          activeSection.id === component.id
                            ? 'scheme1.primaryContainer'
                            : 'transparent',
                        transition:
                          'background-color 0.5s cubic-bezier(0.87, 0, 0.13, 0)',
                      })}
                    >
                      {component.type === 'prompt' ? (
                        <PromptSection
                          isActive={activeSection.id === component.id}
                          isFocused={focusedSection.id === component.id}
                          componentId={component.id}
                          onDelete={() => handleDeleteComponent(component.id)}
                          onFocus={() =>
                            setFocusedSection(component.id, 'prompt')
                          }
                        />
                      ) : component.type === 'flow' ? (
                        <MemoizedFlowSection
                          component={{
                            ...component,
                            output: component.output || {
                              name: '',
                              model: '',
                              generationType: '',
                            },
                          }}
                          isActive={activeSection.id === component.id}
                          isFocused={focusedSection.id === component.id}
                          onDelete={() => handleDeleteComponent(component.id)}
                          onFocus={() =>
                            setFocusedSection(component.id, 'flow')
                          }
                        />
                      ) : (
                        React.cloneElement(component.component, {
                          isActive: activeSection.id === component.id,
                          onAddInput: openInputModal,
                          inputs: currentFlow.inputs,
                          onDelete: () => handleDeleteComponent(component.id),
                        })
                      )}
                    </div>
                    {index < currentFlow.components.length - 1 && (
                      <div
                        id={`arrow-${component.id}`}
                        className={css({
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          opacity: 0.5,
                        })}
                      >
                        <ArrowDown
                          width={24}
                          height={24}
                          color="text.secondary"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <AddInstruction onAddClick={openAddInstructionModal} />

              <Divider />

              {/* Last Section */}
              <div
                ref={sectionRefs.output}
                id="output"
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                })}
              >
                <StepThree />
                {currentFlow.finalOutput &&
                Object.keys(currentFlow.finalOutput).length > 0 ? (
                  <Output
                    isActive={activeSection.id === 'output'}
                    finalOutputName={currentFlow.finalOutput.name || ''}
                    finalOutputModel={currentFlow.finalOutput.model || ''}
                    updateFinalOutput={(name, model) =>
                      updateFinalOutput(currentFlowId, name, model)
                    }
                  />
                ) : (
                  <div
                    className={css({
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 1.0,
                      borderWidth: '1px',
                      borderStyle: 'dashed',
                      borderColor: 'scheme1.border',
                      borderRadius: '8px',
                      padding: '40px',
                      transition: 'all 0.5s cubic-bezier(0.87, 0, 0.13, 0)',
                      _hover: { bg: 'scheme1.primaryContainer' },
                    })}
                  >
                    <div
                      className={css({
                        textStyle: 'body4',
                        color: 'text.secondary',
                        opacity: 0.5,
                      })}
                    >
                      Add instructions for the flow to see the final output
                      here.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div
            className={
              css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                h: '100%',
                overflow: 'auto',
                paddingTop: '16px',
                paddingBottom: '40px',
                position: 'relative',
              }) +
              ' ' +
              hideScrollbarStyles
            }
          >
            <div
              className={css({
                w: '100%',
                h: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '40px',
                bg: 'rgba(255, 255, 255, 0.01)',
                backdropBlur: '8px',
                border: '1px solid',
                borderColor: 'scheme1.border',
                borderRadius: '8px',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  h: '100%',
                })}
              >
                <div
                  className={css({
                    textStyle: 'heading4',
                  })}
                >
                  READY TO CREATE PROGRAMS?
                </div>
                <div
                  className={css({
                    textStyle: 'heading5',
                    color: 'text.secondary',
                    opacity: 0.5,
                  })}
                >
                  Add a main flow to start.
                </div>
              </div>
              <PrimaryButton
                leftIcon={<Plus width={16} height={16} />}
                onClick={() => handleAddFlow(true)}
                className={css({
                  borderColor: 'accent.100',
                  _hover: {
                    borderColor: 'accent.100',
                    color: 'accent.100',
                    bgGradient: 'teal.20',
                  },
                })}
              >
                ADD MAIN FLOW
              </PrimaryButton>
            </div>
          </div>
        )}
      </>
    );
  }
);

Editor.displayName = 'Editor';

export default Editor;
