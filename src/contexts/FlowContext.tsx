'use client';

import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { PromptSection, FlowSection } from '@/components/molecules';
import { Flow as FlowType } from '../components/organisms';
import { v4 as uuidv4 } from 'uuid';

interface FlowContextType {
  flows: FlowType[];
  currentFlow: FlowType | undefined;
  currentFlowId: string;
  currentFlowName: string;
  activeSection: { id: string; type: string };
  focusedSection: { id: string; type: string };
  setFlows: React.Dispatch<React.SetStateAction<FlowType[]>>;
  updateFlowName: (flowId: string, newName: string) => void;
  updateFlowDescription: (flowId: string, newDescription: string) => void;
  setCurrentFlowId: (id: string) => void;
  setActiveFlow: (flowId: string) => void;
  createNewFlow: (isMainFlow: boolean) => void;
  handleInputEdit: (flowId: string, inputIndex: number) => void;
  handleActiveSectionChange: (sectionId: string, sectionType: string) => void;
  updateFinalOutput: (flowId: string, name: string, model: string) => void;
  setFocusedSection: (sectionId: string, sectionType: string) => void;
  deleteComponent: (componentId: string) => void;
  deleteFlow: (flowId: string) => void;
  handleAddFlow: (isMainFlow: boolean) => void;
  addFlowSection: (flowData: any) => void;
  handleSaveGeneration: (
    flowId: string,
    componentId: string,
    name: string,
    generationType: string,
    label: string,
    model: string
  ) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const useFlowContext = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlowContext must be used within a FlowProvider');
  }
  return context;
};

export const FlowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // States
  const [flows, setFlows] = useState<FlowType[]>([]);

  const [currentFlowId, setCurrentFlowId] = useState<string>(() => {
    // This lazy initializer will run only once when the component mounts
    return flows.length > 0 ? flows[0].id : '';
  });

  const [currentFlowName, setCurrentFlowName] = useState(
    'Gordon Ramsay Roast 🍝🤬'
  );

  const [activeSection, setActiveSection] = useState<{
    id: string;
    type: string;
  }>(() => {
    const firstComponent = flows[0]?.components[0];
    return firstComponent
      ? { id: firstComponent.id, type: firstComponent.type }
      : { id: 'flowDetails', type: 'flowDetails' };
  });

  const [focusedSection, setFocusedSection] = useState<{
    id: string;
    type: string;
  }>({ id: '', type: '' });

  const currentFlow = flows.find((flow) => flow.id === currentFlowId);

  const inputs = currentFlow?.inputs;

  // USE EFFECTS
  useEffect(() => {}, [activeSection]);

  useEffect(() => {
    if (flows.length > 0 && !flows.some((flow) => flow.id === currentFlowId)) {
      setCurrentFlowId(flows[0].id);
    }
  }, [flows, currentFlowId]);

  useEffect(() => {
    console.log('Flows state updated:', flows);
  }, [flows]);

  // Functions
  const updateFlowName = useCallback((flowId: string, newName: string) => {
    setFlows((prevFlows) =>
      prevFlows.map((flow) =>
        flow.id === flowId ? { ...flow, name: newName } : flow
      )
    );
    console.log('Flow name updated:', newName);
  }, []);

  const updateFlowDescription = useCallback(
    (flowId: string, newDescription: string) => {
      setFlows((prevFlows) =>
        prevFlows.map((flow) =>
          flow.id === flowId
            ? {
                ...flow,
                description: newDescription,
              }
            : flow
        )
      );
      console.log('Flow description updated:', newDescription);
    },
    []
  );

  const handleInputEdit = useCallback((flowId: string, inputIndex: number) => {
    setFlows((prevFlows) =>
      prevFlows.map((flow) => {
        if (flow.id === flowId) {
          // Here you would open the input modal or perform the edit action
          // For now, we'll just log the action
        }
        return flow;
      })
    );
  }, []);

  const setActiveFlow = (flowId: string) => {
    setCurrentFlowId(flowId);
  };

  const createNewFlow = (isMainFlow: boolean) => {
    const newFlow: FlowType = {
      id: `flow${Date.now()}`, // Use a timestamp for a unique ID
      name: `New ${isMainFlow ? 'Main' : 'Sub'} Flow`,
      description: '',
      inputs: [],
      components: [],
      finalOutput: {},
      isMainFlow: isMainFlow,
    };

    setFlows((prevFlows) => {
      console.log('Previous flows:', prevFlows);
      const updatedFlows = [...prevFlows, newFlow];
      console.log('Updated flows:', updatedFlows);
      return updatedFlows;
    });

    setCurrentFlowId(newFlow.id);
  };

  const handleActiveSectionChange = useCallback(
    (sectionId: string, sectionType: string) => {
      setActiveSection({ id: sectionId, type: sectionType });
    },
    []
  );

  const handleFocusedSectionChange = useCallback(
    (sectionId: string, sectionType: string) => {
      console.log('Changing focused section to:', {
        id: sectionId,
        type: sectionType,
      });
      setFocusedSection({ id: sectionId, type: sectionType });
    },
    []
  );

  const updateFinalOutput = useCallback(
    (flowId: string, name: string, model: string) => {
      setFlows((prevFlows) =>
        prevFlows.map((flow) => {
          if (flow.id === flowId) {
            return {
              ...flow,
              finalOutput: { name, model },
            };
          }
          return flow;
        })
      );
    },
    []
  );

  const handleSaveGeneration = useCallback(
    (
      flowId: string,
      componentId: string,
      name: string,
      generationType: string,
      label: string,
      model: string
    ) => {
      setFlows((prevFlows) =>
        prevFlows.map((flow) => {
          if (flow.id === flowId) {
            const updatedComponents = flow.components.map((component) =>
              component.id === componentId
                ? {
                    ...component,
                    output: { name, generationType, label, model },
                  }
                : component
            );

            const isLastComponent =
              componentId ===
              updatedComponents[updatedComponents.length - 1].id;

            return {
              ...flow,
              components: updatedComponents,
              finalOutput: isLastComponent ? { name, model } : flow.finalOutput,
            };
          }
          return flow;
        })
      );
    },
    []
  );

  const deleteComponent = useCallback((flowId: string, componentId: string) => {
    setFlows((prevFlows) =>
      prevFlows.map((flow) => {
        if (flow.id === flowId) {
          return {
            ...flow,
            components: flow.components.filter(
              (comp) => comp.id !== componentId
            ),
          };
        }
        return flow;
      })
    );
  }, []);

  const deleteFlow = useCallback(
    (flowId: string) => {
      console.log('Deleting flow with ID:', flowId);
      setFlows((prevFlows) => {
        const updatedFlows = prevFlows.filter((flow) => flow.id !== flowId);
        console.log('Flows after deletion:', updatedFlows);
        return updatedFlows;
      });

      // If the deleted flow was the current flow, set a new current flow
      setCurrentFlowId((prevId) => {
        if (prevId === flowId) {
          const newCurrentFlow = flows.find((flow) => flow.id !== flowId);
          return newCurrentFlow ? newCurrentFlow.id : '';
        }
        return prevId;
      });
    },
    [flows]
  );

  const handleAddFlow = (isMainFlow: boolean) => {
    const newFlow: FlowType = {
      id: `flow${Date.now()}`,
      name: `New ${isMainFlow ? 'Main' : 'Sub'} Flow`,
      description: '',
      inputs: [],
      components: [],
      finalOutput: {},
      isMainFlow: isMainFlow,
    };
    createNewFlow(isMainFlow);
  };

  const addFlowSection = useCallback(
    (flowData: any) => {
      console.log('Adding new flow section with data:', flowData);
      setFlows((prevFlows) => {
        return prevFlows.map((flow) => {
          if (flow.id === currentFlowId) {
            console.log('Current flow found:', flow);
            const newFlowSection = {
              id: uuidv4(),
              type: 'flow',
              name: flowData.name,
              description: flowData.description,
              requiredInputs: Array.isArray(flowData.requiredInputs)
                ? flowData.requiredInputs.map((input: any) => ({
                    ...input,
                    requiredInputId: uuidv4(),
                  }))
                : [],
              output: flowData.finalOutput || undefined,
            };
            console.log('New flow section created:', newFlowSection);

            const updatedComponents = [...flow.components, newFlowSection];
            const updatedFlow = {
              ...flow,
              components: updatedComponents,
              finalOutput: newFlowSection.output || flow.finalOutput,
            };

            console.log('Updated flow:', updatedFlow);
            return updatedFlow;
          }
          return flow;
        });
      });
    },
    [currentFlowId]
  );

  useEffect(() => {
    // Initialize with your default flow
    const initialFlow = {
      id: 'flow1',
      name: 'Gordon Ramsay Roast 🍝🤬',
      description: 'A flow for Gordon Ramsay to review food',
      inputs: [
        {
          name: 'Image',
          description: 'An image of some food to get reviewed',
          type: 'Type - Image',
        },
      ],
      components: [
        {
          id: 'prompt1',
          type: 'prompt',
          name: '',
          description: '',
          component: <PromptSection isActive={false} componentId="prompt1" />,
          requiredInputs: [],
          output: {},
        },
        {
          id: 'flow1',
          type: 'flow',
          name: 'Description → Roast 🔥',
          description:
            'This prompt takes the description that was generated from the image and turns it into a roast',
          component: (
            <FlowSection
              isActive={false}
              subFlowName="Description → Roast 🔥"
              subFlowDescription="This prompt takes the description that was generated from the image and turns it into a roast"
              component={{
                id: 'flow1',
                type: 'flow',
                requiredInputs: [
                  {
                    requiredInputId: '123',
                    name: 'Description',
                    description: 'Food description',
                    type: 'Long Text',
                  },
                ],
              }}
            />
          ),
          requiredInputs: [
            {
              requiredInputId: '123',
              name: 'Description',
              description: 'Food description',
              type: 'Long Text',
            },
          ],
          output: {
            name: 'Review',
            generationType: 'Full',
            model: 'Mistral 7B ',
          },
        },
        {
          id: 'flow2',
          type: 'flow',
          name: 'ElevenLabs Speech Synthesis 🙊',
          description:
            'Generates speech from the passed-in text using ElevenLabs',
          component: (
            <FlowSection
              isActive={false}
              subFlowName="ElevenLabs Speech Synthesis 🙊"
              subFlowDescription="Generates speech from the passed-in text using ElevenLabs"
              component={{
                id: 'flow2',
                type: 'flow',
                requiredInputs: [
                  {
                    requiredInputId: '124',
                    name: 'Content',
                    description: 'Text to be converted to speech',
                    type: 'Text',
                    selectedInput: {
                      name: 'Review',
                      parentComponent: 'Description → Roast 🔥',
                    },
                  },
                  {
                    requiredInputId: '125',
                    name: 'Voice',
                    description: 'Voice to be used for speech synthesis',
                    type: 'Text',
                  },
                ],
              }}
              openAddGenerationModal={() => {}}
            />
          ),
          requiredInputs: [
            {
              requiredInputId: '124',
              name: 'Content',
              description: 'Text to be converted to speech',
              type: 'Text',
              // selectedInput: {
              //   name: 'REVIEW',
              //   parentComponent: 'Description → Roast 🔥',
              // },
            },
            {
              requiredInputId: '125',
              name: 'Voice',
              description: 'Voice to be used for speech synthesis',
              type: 'Text',
            },
          ],
          output: {
            name: 'GORDON RAMSAY ROAST AUDIO',
            generationType: 'Full',
            model: 'ELEVENLABS',
          },
        },
      ],
      finalOutput: {
        name: 'GORDON RAMSAY ROAST AUDIO',
        model: 'ELEVENLABS',
      },
      isMainFlow: true,
    };
    // const initialFlows = [
    //   {
    //     id: 'flow1',
    //     name: 'Gordon Ramsay Roast 🍝🤬',
    //     description: 'A flow for Gordon Ramsay to review food',
    //     inputs: [
    //       {
    //         name: 'Image',
    //         description: 'An image of some food to get reviewed',
    //         type: 'Type - Image',
    //       },
    //     ],
    //     components: [
    //       {
    //         id: 'prompt1',
    //         type: 'prompt',
    //         name: '',
    //         description: '',
    //         component: <PromptSection isActive={false} componentId="prompt1" />,
    //         requiredInputs: [
    //           {
    //             requiredInputId: '123',
    //             name: 'Image',
    //             description:
    //               'A food image for AI to create a description from.',
    //             type: 'Image',
    //           },
    //         ],
    //         output: {
    //           name: 'Description',
    //           generationType: 'Full',
    //           model: 'Claude 3.5 Sonnet',
    //         },
    //       },
    //       {
    //         id: 'flow1',
    //         type: 'flow',
    //         name: 'Description → Roast 🔥',
    //         description:
    //           'This prompt takes the description that was generated from the image and turns it into a roast',
    //         component: (
    //           <FlowSection
    //             isActive={false}
    //             subFlowName="Description → Roast 🔥"
    //             subFlowDescription="This prompt takes the description that was generated from the image and turns it into a roast"
    //             component={{
    //               id: 'flow1',
    //               type: 'flow',
    //               requiredInputs: [
    //                 {
    //                   requiredInputId: '123',
    //                   name: 'Description',
    //                   description: 'Food description',
    //                   type: 'Long Text',
    //                 },
    //               ],
    //             }}
    //           />
    //         ),
    //         requiredInputs: [
    //           {
    //             requiredInputId: '123',
    //             name: 'Description',
    //             description: 'Food description',
    //             type: 'Long Text',
    //           },
    //         ],
    //         output: {
    //           name: 'Review',
    //           generationType: 'Full',
    //           model: 'Mistral 7B ',
    //         },
    //       },
    //       {
    //         id: 'flow2',
    //         type: 'flow',
    //         name: 'ElevenLabs Speech Synthesis 🙊',
    //         description:
    //           'Generates speech from the passed-in text using ElevenLabs',
    //         component: (
    //           <FlowSection
    //             isActive={false}
    //             subFlowName="ElevenLabs Speech Synthesis 🙊"
    //             subFlowDescription="Generates speech from the passed-in text using ElevenLabs"
    //             component={{
    //               id: 'flow2',
    //               type: 'flow',
    //               requiredInputs: [
    //                 {
    //                   requiredInputId: '124',
    //                   name: 'Content',
    //                   description: 'Text to be converted to speech',
    //                   type: 'Text',
    //                   selectedInput: {
    //                     name: 'Review',
    //                     parentComponent: 'Description → Roast 🔥',
    //                   },
    //                 },
    //                 {
    //                   requiredInputId: '125',
    //                   name: 'Voice',
    //                   description: 'Voice to be used for speech synthesis',
    //                   type: 'Text',
    //                 },
    //               ],
    //             }}
    //             openAddGenerationModal={() => {}}
    //           />
    //         ),
    //         requiredInputs: [
    //           {
    //             requiredInputId: '124',
    //             name: 'Content',
    //             description: 'Text to be converted to speech',
    //             type: 'Text',
    //             selectedInput: {
    //               name: 'REVIEW',
    //               parentComponent: 'Description → Roast 🔥',
    //             },
    //           },
    //           {
    //             requiredInputId: '125',
    //             name: 'Voice',
    //             description: 'Voice to be used for speech synthesis',
    //             type: 'Text',
    //             selectedInput: {
    //               name: 'Gordon Ramsay',
    //               parentComponent: 'Elevenlabs',
    //             },
    //           },
    //         ],
    //         output: {
    //           name: 'GORDON RAMSAY ROAST AUDIO',
    //           generationType: 'Full',
    //           model: 'ELEVENLABS',
    //         },
    //       },
    //     ],
    //     finalOutput: {
    //       name: 'GORDON RAMSAY ROAST AUDIO',
    //       model: 'ELEVENLABS',
    //     },
    //     isMainFlow: true,
    //   },
    //   {
    //     id: 'flow2',
    //     name: 'Description → Roast 🔥',
    //     description:
    //       'This prompt takes the description that was generated from the image and turns it into',
    //     inputs: [
    //       {
    //         name: 'Description',
    //         description: 'Description from AI output',
    //         type: 'Type - Long Text',
    //       },
    //     ],
    //     components: [
    //       {
    //         id: 'prompt1',
    //         type: 'prompt',
    //         name: '',
    //         description: '',
    //         component: <PromptSection isActive={false} componentId="prompt1" />,
    //         requiredInputs: [
    //           {
    //             requiredInputId: '123',
    //             name: 'Description',
    //             description: 'Description from AI model',
    //             type: 'Long Text',
    //           },
    //         ],
    //         output: {
    //           name: 'Review',
    //           generationType: 'Full',
    //           model: 'Mistral 7B',
    //         },
    //       },
    //     ],
    //     finalOutput: {
    //       name: 'Review',
    //       model: 'Mistral 7B',
    //     },
    //     isMainFlow: false,
    //   },
    //   {
    //     id: 'flow3',
    //     name: 'ElevenLabs Speech Synthesis 🙊',
    //     description:
    //       'Generates speech from the passed-in text using ElevenLabs',
    //     inputs: [
    //       {
    //         name: 'Content',
    //         description: 'Content that needs to be generated into speech',
    //         type: 'Type - Long Text',
    //       },
    //       {
    //         name: 'Voice ID',
    //         description:
    //           'Your desired voice id. IDs can be found at https://elevenlabs.io/app/voice-lab',
    //         type: 'Type - Text',
    //       },
    //     ],
    //     components: [
    //       {
    //         id: 'prompt1',
    //         type: 'prompt',
    //         name: '',
    //         description: '',
    //         component: <PromptSection isActive={false} componentId="prompt1" />,
    //         requiredInputs: [
    //           {
    //             requiredInputId: '111',
    //             name: 'Content',
    //             description: 'Content that needs to be generated into speech',
    //             type: 'Type - Long Text',
    //           },
    //           {
    //             requiredInputId: '222',
    //             name: 'Voice ID',
    //             description:
    //               'Your desired voice id. IDs can be found at https://elevenlabs.io/app/voice-lab',
    //             type: 'Type - Text',
    //           },
    //         ],
    //         output: {
    //           name: 'Gordon Ramsay Roast',
    //           generationType: 'Full',
    //           model: 'Elevenlabs',
    //         },
    //       },
    //     ],
    //     finalOutput: {
    //       name: 'Gordon Ramsay Roast',
    //       model: 'Elevenlabs',
    //     },
    //     isMainFlow: false,
    //   },
    // ];
    setFlows([initialFlow]);
    setCurrentFlowId(initialFlow.id);
  }, []);

  const value = {
    flows,
    currentFlowId,
    currentFlowName,
    currentFlow,
    inputs,
    activeSection,
    handleActiveSectionChange,
    focusedSection,
    setFlows,
    setCurrentFlowId,
    updateFlowName,
    updateFlowDescription,
    handleInputEdit,
    setActiveFlow,
    createNewFlow,
    handleFocusedSectionChange,
    updateFinalOutput,
    setFocusedSection: handleFocusedSectionChange,
    deleteComponent,
    deleteFlow,
    handleAddFlow,
    addFlowSection,
    handleSaveGeneration,
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};
