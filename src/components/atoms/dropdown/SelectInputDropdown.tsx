import React from 'react';
import { css } from '../../../../styled-system/css';
import { Image, Text, File, Audio, LongText, Plus, Cancel } from '../icons';
import { IconButton } from '../buttons';
import { DropdownCell } from '../dropdown';
import { useFlowSectionContext } from '@/contexts/FlowSectionContext';
import { useDropdownClose } from '@/hooks';

interface Output {
  name: string;
  parentComponent: string;
  componentId: string;
  model: string;
}

interface SelectInputDropdownProps {
  outputs: Output[];
  onClose: () => void;
  onSelect: (output: Output) => void;
}

export function SelectInputDropdown({
  outputs,
  onClose,
  onSelect,
}: SelectInputDropdownProps) {
  // CONTEXT
  const { openSelectInputDropdownId, setOpenSelectInputDropdownId } =
    useFlowSectionContext();

  // ICON FUNCTION
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

  // Icon Color
  const iconColor = '#e0e0e0';

  const dropdownRef = useDropdownClose({
    isOpen: openSelectInputDropdownId,
    onClose: () => setOpenSelectInputDropdownId(null),
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
          onClick={onClose}
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
          {outputs && outputs.length > 0 ? (
            outputs.map((output) => (
              <div key={output.componentId} onClick={() => onSelect(output)}>
                <DropdownCell
                  icon={getIconForInputType('')}
                  name={output.name}
                  description={output.parentComponent || output.model}
                />
              </div>
            ))
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
      </div>
      {/* <Divider />
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
        <div onClick={() => {}}>
          <DropdownCell
            icon={<Plus width={24} height={24} color={iconColor} />}
            name="CREATE INPUT"
            description="Add a new input"
          />
        </div>
      </div> */}
    </div>
  );
}
