import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import { css } from '../../../styled-system/css';
import { Divider } from '../atoms/divider';
import {
  StepOne,
  StepTwo,
  StepThree,
  PromptOne,
  FlowOne,
  FlowTwo,
  AddInstruction,
  FlowDetails,
} from '../molecules';
import { ArrowDown } from '../atoms/icons';
import { Flow as FlowType } from './Flow';

export interface EditorRef {
  scrollToSection: (sectionId: string) => void;
}

interface EditorProps {
  flows: FlowType[];
  currentFlowId: string;
  openInputModal: () => void;
  onFlowNameChange: (flowId: string, newName: string) => void;
  onActiveSectionChange: (section: string) => void;
  activeSection: string;
  onInputEdit: (index: number) => void;
  onFlowChange: (flowId: string) => void;
}

interface VisibleSection {
  id: string;
  ratio: number;
}

type SectionRefs = {
  [key: string]: React.RefObject<HTMLDivElement>;
};

const Editor = forwardRef<EditorRef, EditorProps>(
  (
    {
      flows = [],
      currentFlowId,
      openInputModal,
      onFlowNameChange,
      onActiveSectionChange,
      activeSection,
      onInputEdit,
      onFlowChange,
    },
    ref
  ) => {
    const currentFlow = flows.find((flow) => flow.id === currentFlowId);
    const editorRef = useRef<HTMLDivElement>(null);
    const stepThreeRef = useRef<HTMLDivElement>(null);
    const [paddingBottom, setPaddingBottom] = useState('400px');

    const sectionRefs: SectionRefs = {
      flowDetails: useRef<HTMLDivElement>(null),
      output: stepThreeRef,
    };

    if (currentFlow && currentFlow.components) {
      currentFlow.components.forEach((component) => {
        sectionRefs[component.type] = useRef<HTMLDivElement>(null);
      });
    }

    useEffect(() => {
      if (!flows || flows.length === 0) return;

      const calculatePaddingBottom = () => {
        if (editorRef.current && stepThreeRef.current) {
          const editorHeight = editorRef.current.clientHeight;
          const stepThreeHeight = stepThreeRef.current.clientHeight;
          const desiredPadding = editorHeight - stepThreeHeight - 80;
          setPaddingBottom(`${Math.max(desiredPadding, 400)}px`);
        }
      };

      calculatePaddingBottom();
      window.addEventListener('resize', calculatePaddingBottom);

      return () => {
        window.removeEventListener('resize', calculatePaddingBottom);
      };
    }, []);

    useEffect(() => {
      const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '-160px 0px -60% 0px', // Adjust top and bottom margins
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // More granular thresholds
      };

      const observerCallback: IntersectionObserverCallback = (entries) => {
        let maxVisibleSection: VisibleSection | null = null;

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            (!maxVisibleSection ||
              entry.intersectionRatio > maxVisibleSection.ratio)
          ) {
            maxVisibleSection = {
              id: entry.target.id,
              ratio: entry.intersectionRatio,
            };
          }
        });

        if (maxVisibleSection && maxVisibleSection.ratio >= 0.3) {
          // Adjust this threshold as needed
          onActiveSectionChange(maxVisibleSection.id);
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
    }, [onActiveSectionChange]);

    useImperativeHandle(ref, () => ({
      scrollToSection: (sectionId: string) => {
        const sectionRef = sectionRefs[sectionId as keyof typeof sectionRefs];
        if (sectionRef.current && editorRef.current) {
          const topPadding = 120; // This matches the paddingTop in the editor's CSS
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

    return (
      <div
        ref={editorRef}
        className={
          css({
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            w: '100%',
            h: '100%',
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
        {/* Static Content */}
        <div
          ref={sectionRefs.flowDetails}
          id="flowDetails"
          className={css({ w: '100%' })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: isActive
                ? 'scheme1.primaryContainer'
                : 'transparent',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease',
              w: '100%',
            })}
          >
            <StepOne />
            <FlowDetails
              isActive={isActive}
              openInputModal={openInputModal}
              inputs={inputs}
              currentFlowName={currentFlowName}
              onFlowNameChange={onFlowNameChange}
              onInputEdit={onInputEdit}
            />
          </div>
        </div>
        <Divider />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          <StepTwo />
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            })}
          >
            <div
              ref={sectionRefs.prompt}
              id="prompt"
              className={css({ w: '100%', minH: '200px' })}
            >
              <PromptOne isActive={activeSection === 'prompt'} />
            </div>
            <ArrowDown width={24} height={24} color="text.secondary" />
            <div
              ref={sectionRefs.flow1}
              id="flow1"
              className={css({ w: '100%' })}
            >
              <FlowOne isActive={activeSection === 'flow1'} />
            </div>
            <ArrowDown width={24} height={24} color="text.secondary" />
            <div
              ref={sectionRefs.flow2}
              id="flow2"
              className={css({ w: '100%' })}
            >
              <FlowTwo isActive={activeSection === 'flow2'} />
            </div>
          </div>
        </div>
        <AddInstruction />
        <Divider />
        <div ref={sectionRefs.output} id="output">
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              w: '100%',
            })}
          >
            <StepThree />
            <Output isActive={activeSection === 'output'} />
          </div>
        </div>

        {/* Dynamic Content */}
        {/* {currentFlow ? (
          <>
            <div
              ref={sectionRefs.flowDetails}
              id="flowDetails"
              className={css({ w: '100%' })}
            >
              <StepOne
                openInputModal={openInputModal}
                inputs={currentFlow.inputs}
                currentFlowName={currentFlow.name}
                onFlowNameChange={(newName) =>
                  onFlowNameChange(currentFlow.id, newName)
                }
                isActive={activeSection === 'flowDetails'}
                onInputEdit={onInputEdit}
              />
            </div>
            <Divider />
            {currentFlow.components && currentFlow.components.length > 0 ? (
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                })}
              >
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                  })}
                >
                  {currentFlow.components.map((component, index) => (
                    <React.Fragment key={component.type}>
                      <div
                        ref={sectionRefs[component.type]}
                        id={component.type}
                        className={css({
                          w: '100%',
                          minH: component.type === 'prompt' ? '200px' : 'auto',
                        })}
                      >
                        {React.cloneElement(component.component, {
                          isActive: activeSection === component.type,
                        })}
                      </div>
                      {index < currentFlow.components.length - 1 && (
                        <ArrowDown
                          width={24}
                          height={24}
                          color="text.secondary"
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div>No in this flow</div>
            )}
            <AddInstruction />
            <Divider />
            <div ref={sectionRefs.output} id="output">
              <StepThree isActive={activeSection === 'output'} />
            </div>
          </>
        ) : (
          <div>No flow selected</div>
        )} */}
      </div>
    );
  }
);

Editor.displayName = 'Editor';

export default Editor;
