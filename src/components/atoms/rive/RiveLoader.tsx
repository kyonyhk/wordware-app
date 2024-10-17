import React from 'react';
import { useRive } from 'rive-react';

interface RiveLoaderProps {
  className?: string;
}

export const RiveLoader: React.FC<RiveLoaderProps> = ({ className }) => {
  const { RiveComponent } = useRive({
    src: '/wordware-simple-loader.riv',
    stateMachines: 'State Machine 1', // Replace with your state machine name
    autoplay: true,
  });

  return <RiveComponent className={className} />;
};
