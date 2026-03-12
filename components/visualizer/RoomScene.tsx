'use client';

import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Floor } from './Floor';
import { Walls } from './Walls';
import { SofaSet } from './Sofa';
import { Door } from './Door';
import { Lighting } from './Lighting';
import { CameraControls } from './CameraControls';

interface RoomSceneProps {
  selectedTileColor: string;
}

export const RoomScene: React.FC<RoomSceneProps> = ({ selectedTileColor }) => {
  const dpr = useMemo(() => {
    if (typeof window !== 'undefined') {
      return Math.min(window.devicePixelRatio, 1.5);
    }
    return 1;
  }, []);

  return (
    <Canvas
      shadows
      camera={{ position: [7, 3, 9], fov: 70 }}
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      }}
      performance={{ min: 0.5, max: 1 }}
    >
      <color attach="background" args={['#d6d0ca']} />
      <Lighting />
      <Floor tileColor={selectedTileColor} />
      <Walls />
      <SofaSet />
      <Door />
      <CameraControls />
    </Canvas>
  );
};
