import React, { useState, useEffect } from 'react';
import { css } from '../../../../styled-system/css';
import { TextInput } from '../../atoms/inputs/TextInput';
import { PrimaryButton } from '../../atoms/buttons';
import { ModalHeading } from '@/components/atoms/modals';
import { IconButton } from '../../atoms/buttons';
import { ArrowRight, Delete } from '../../atoms/icons';
import {
  GenerationTypeButtonInput,
  ModelButtonInput,
} from '@/components/atoms/inputs';
import { useOutputContext } from '@/contexts/OutputContext';
import { useFlowContext } from '@/contexts/FlowContext';

export function AddGenerationModal() {
  const {
    handleSaveGeneration,
    handleDeleteGeneration,
    closeAddGenerationModal,
    currentEditingOutput,
  } = useOutputContext();

  const { currentFlow, focusedSection } = useFlowContext();

  const [name, setName] = useState('');
  const [generationType, setGenerationType] = useState('');
  const [label, setLabel] = useState('');
  const [model, setModel] = useState('');

  useEffect(() => {
    if (currentEditingOutput) {
      setName(currentEditingOutput.name || '');
      setGenerationType(currentEditingOutput.generationType || '');
      setLabel(currentEditingOutput.label || '');
      setModel(currentEditingOutput.model || '');
    }
  }, [currentEditingOutput]);

  const handleSave = () => {
    if (currentFlow && focusedSection.id) {
      handleSaveGeneration(
        currentFlow.id,
        focusedSection.id,
        name,
        generationType,
        label,
        model
      );
    } else {
      console.error('No focused section or current flow');
    }
    closeAddGenerationModal();
  };

  const handleDelete = () => {
    if (currentFlow && focusedSection.id) {
      handleDeleteGeneration();
    } else {
      console.error('No focused section or current flow');
    }
    closeAddGenerationModal();
  };

  const deleteColor = 'red.100';

  const hasOutput = name || generationType || label || model;
  const isEditing = !!currentEditingOutput;

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        h: 'auto',
        w: '540px',
        border: '1px solid',
        borderColor: 'scheme1.border',
        borderRadius: '8px',
        padding: '16px 24px 40px',
        bg: 'scheme1.primaryContainer',
        backdropFilter: 'blur(8px)',
        boxShadow: '0px 0 50px rgba(0, 0, 0, 0.5)',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '80px',
        })}
      >
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
              flexDirection: 'row',
              justifyContent: 'flex-end',
            })}
          >
            <IconButton
              icon={<ArrowRight width={24} height={24} />}
              onClick={closeAddGenerationModal}
            />
          </div>
          <ModalHeading
            modalHeading="GENERATION"
            modalDescription="A generation is populated by the language model during program execution based on the parameters set below. To generate the value all the text content that comes before this generation is fed to the language model (with any variables replaced with their reference value) and the “completion” starts from there."
          />
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            })}
          >
            <TextInput
              inputLabel="NAME"
              inputDescription="Name this output"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <GenerationTypeButtonInput
              value={generationType}
              onChange={setGenerationType}
            />
            <ModelButtonInput value={model} onChange={setModel} />
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            w: '100%',
          })}
        >
          <div
            className={css({
              w: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              width: '200px',
            })}
          >
            <PrimaryButton
              onClick={handleSave}
              className={css({
                w: '100%',
                border: '1px solid',
                borderColor: 'accent.20',
                bgGradient: 'teal.20',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                _hover: {
                  borderColor: 'accent.100',
                  bgGradient: 'teal.50',
                  color: 'accent.100',
                },
              })}
            >
              {isEditing ? 'UPDATE' : 'SAVE'}
            </PrimaryButton>
            {hasOutput && (
              <PrimaryButton
                variant="delete"
                leftIcon={<Delete width={16} height={16} color={deleteColor} />}
                className={css({ w: '200px', backdropFilter: 'blur(8px)' })}
                onClick={handleDelete}
              >
                DELETE
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
