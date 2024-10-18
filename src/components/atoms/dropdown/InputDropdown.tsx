import React from 'react';
import { css } from '../../../../styled-system/css';
import { DropdownCell } from './DropdownCell';
import { Cancel, Image, Text, File, LongText, Audio, Plus } from '../icons';
import { Divider } from '../divider';
import { IconButton } from '../buttons';
import { useInputContext } from '../../../contexts/InputContext';
import { useFlowContext } from '@/contexts/FlowContext';
import { usePromptSectionContext } from '@/contexts/PromptSectionContext';
import { useDropdownClose } from '@/hooks';

interface InputDropdownProps {
  componentId: string;
  onInputSelect: (input: {
    name: string;
    description: string;
    type: string;
  }) => void;
}

export function InputDropdown({
  componentId,
  onInputSelect,
}: InputDropdownProps) {
  // Context Import
  const { openInputModal, setIsInputModalOpenFromPromptSection } =
    useInputContext();

  const { closeInputDropdown, isDropdownOpen } = usePromptSectionContext();

  const { currentFlow } = useFlowContext();
  const inputs = currentFlow?.inputs || [];

  const iconColor = '#e0e0e0';

  // Add this function at the beginning of the component
  const processInputType = (type: string) => {
    return type.replace('TYPE - ', '').trim().toUpperCase();
  };

  const getIconForInputType = (type: string) => {
    const processedType = processInputType(type);

    switch (processedType) {
      case 'IMAGE':
        return <Image width={24} height={24} />;
      case 'TEXT':
        return <Text width={24} height={24} />;
      case 'FILE':
        return <File width={24} height={24} />;
      case 'AUDIO':
        return <Audio width={24} height={24} />;
      case 'LONG TEXT':
        return <LongText width={24} height={24} />;
      default:
        return <Plus width={24} height={24} />;
    }
  };

  const handleCreateInput = () => {
    setIsInputModalOpenFromPromptSection(true);
    openInputModal(undefined, true);
  };

  const handleInputClick = (input: {
    name: string;
    description: string;
    type: string;
  }) => {
    onInputSelect(input);
  };

  const dropdownRef = useDropdownClose({
    isOpen: isDropdownOpen,
    onClose: closeInputDropdown,
  });

  return (
    <div
      ref={dropdownRef}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px 8px',
        border: '1px solid',
        borderColor: 'scheme1.border',
        borderRadius: '8px',
        w: '320px',
        bg: 'scheme1.active',
        backdropFilter: 'blur(8px)',
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 10,
      })}
    >
      <div
        className={css({
          position: 'absolute',
          right: '8px',
          top: '8px',
          zIndex: 1,
        })}
      >
        <IconButton
          icon={<Cancel width={24} height={24} />}
          onClick={() => {
            closeInputDropdown();
            setIsInputModalOpenFromPromptSection(false);
          }}
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
            textStyle: 'heading5',
            opacity: 0.5,
            padding: '0px 8px',
          })}
        >
          INPUT LIST
        </div>
        <div>
          {inputs.length > 0 ? (
            <div>
              {inputs.map((input, index) => (
                <div key={index} onClick={() => handleInputClick(input)}>
                  <DropdownCell
                    icon={getIconForInputType(input.type)}
                    name={input.name}
                    description={input.description}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                h: '80px',
              })}
            >
              <div className={css({ textStyle: 'body5', opacity: 0.2 })}>
                No inputs available
              </div>
            </div>
          )}
        </div>
        <Divider />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          <div
            className={css({
              textStyle: 'heading5',
              opacity: 0.5,
              padding: '0px 8px',
            })}
          >
            NEW INPUT
          </div>
          <div onClick={handleCreateInput}>
            <DropdownCell
              icon={<Plus width={24} height={24} color={iconColor} />}
              name="CREATE INPUT"
              description="Add a new input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
