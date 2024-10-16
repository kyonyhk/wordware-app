import React, { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';
import { OverviewButton } from '@/components/atoms/buttons/OverviewButton';
import { Divider } from '../atoms/divider';
import { PrimaryButton } from '../atoms/buttons';
import { Plus } from '../atoms/icons';
import { useFlowContext } from '@/contexts/FlowContext';
import { useInstructionContext } from '@/contexts/InstructionContext';

interface ProjectOverviewProps {
  onSectionClick: (sectionId: string, sectionType: string) => void;
}

export function ProjectOverview({ onSectionClick }: ProjectOverviewProps) {
  const { activeSection, currentFlow } = useFlowContext();
  const { openAddInstructionModal } = useInstructionContext();
  const [components, setComponents] = useState(currentFlow?.components || []);

  useEffect(() => {
    setComponents(currentFlow?.components || []);
  }, [currentFlow]);

  return (
    <div
      className={css({
        marginTop: '16px',
        h: '100%',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '16px',
          borderRadius: '8px',
          bg: 'scheme1.secondaryContainer',
          w: '200px',
          alignSelf: 'flex-start',
          position: 'relative',
          zIndex: '3',
        })}
      >
        <div
          className={css({
            textStyle: 'heading6',
            textAlign: 'center',
            opacity: 0.5,
          })}
        >
          PROJECT OVERVIEW
        </div>

        {/* Step 01 */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            <div className={css({ textStyle: 'heading6', opacity: 0.2 })}>
              STEP 01
            </div>
            <OverviewButton
              isActive={activeSection.id === 'flowDetails'}
              onClick={() => onSectionClick('flowDetails', 'flowDetails')}
            >
              FLOW DETAILS
            </OverviewButton>
          </div>

          <Divider />

          {/* Step 02 */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            <div className={css({ textStyle: 'heading6', opacity: 0.2 })}>
              STEP 02
            </div>
            {components && components.length > 0 ? (
              components.map((component) => (
                <OverviewButton
                  key={component.id}
                  isActive={activeSection.id === component.id}
                  onClick={() => onSectionClick(component.id, component.type)}
                >
                  {component.type.toUpperCase()}
                </OverviewButton>
              ))
            ) : (
              <PrimaryButton
                leftIcon={<Plus width={16} height={16} />}
                onClick={openAddInstructionModal}
              >
                ADD INSTRUCTION
              </PrimaryButton>
            )}
          </div>

          <Divider />

          {/* Step 03 */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            <div className={css({ textStyle: 'heading6', opacity: 0.2 })}>
              STEP 03
            </div>
            {currentFlow &&
            currentFlow.components &&
            currentFlow.components.length > 0 ? (
              <OverviewButton
                isActive={activeSection.id === 'output'}
                onClick={() => onSectionClick('output', 'output')}
              >
                OUTPUT
              </OverviewButton>
            ) : (
              <div
                className={css({
                  textStyle: 'body5',
                  color: 'text.secondary',
                  padding: '8px',
                  textAlign: 'center',
                  opacity: 0.5,
                })}
              >
                Add instructions for the flow to see the final output here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
