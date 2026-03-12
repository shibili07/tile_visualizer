'use client';

import React, { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';

// Shared with Walls.tsx spot positions
const SPOT_POSITIONS: [number, number, number][] = [
  [-4, 4.8, -6], [0, 4.8, -6], [4, 4.8, -6],
  [-4, 4.8,  0], [0, 4.8,  0], [4, 4.8,  0],
];

// Single recessed spot – SpotLight aimed straight down at its XZ position
function CeilingSpot({ position }: { position: [number, number, number] }) {
  const lightRef  = useRef<THREE.SpotLight>(null!);
  const targetRef = useRef<THREE.Object3D>(null!);

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
      lightRef.current.target.updateMatrixWorld();
    }
  }, []);

  return (
    <>
      <spotLight
        ref={lightRef}
        position={position}
        angle={0.38}
        penumbra={0.45}
        intensity={28}
        color="#ffeacc"
        distance={8}
        decay={2}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.001}
      />
      {/* Target directly below the light */}
      <object3D ref={targetRef} position={[position[0], 0, position[2]]} />
    </>
  );
}

const LightingComponent: React.FC = () => (
  <>
    {/* Soft warm ambient – low level, spots provide the drama */}
    <ambientLight intensity={0.3} color="#ffe4c4" />

    {/* 6 recessed ceiling spot lights – cones pointing straight down */}
    {SPOT_POSITIONS.map((pos) => (
      <CeilingSpot key={`${pos[0]},${pos[2]}`} position={pos} />
    ))}

    {/* Ceiling strip glow – supplements the visual emissive strips in Walls */}
    <pointLight position={[-1.6, 4.7, -3.5]} intensity={25} color="#fff9e8" distance={11} decay={2} />
    <pointLight position={[ 1.6, 4.7, -3.5]} intensity={25} color="#fff9e8" distance={11} decay={2} />
    <pointLight position={[-1.6, 4.7,  3.0]} intensity={18} color="#fff9e8" distance={9}  decay={2} />
    <pointLight position={[ 1.6, 4.7,  3.0]} intensity={18} color="#fff9e8" distance={9}  decay={2} />

    {/* Cool daylight fill from the open front – simulates daylight through doorway */}
    <directionalLight position={[5, 3, 10]} intensity={0.28} color="#d8eeff" />
  </>
);

export const Lighting = memo(LightingComponent);
