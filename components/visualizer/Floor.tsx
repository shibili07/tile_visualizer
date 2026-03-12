'use client';

import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

interface FloorProps {
  tileColor: string;
}

const FloorComponent: React.FC<FloorProps> = ({ tileColor }) => {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const prevColorRef = useRef<string>(tileColor);

  useEffect(() => {
    if (materialRef.current && prevColorRef.current !== tileColor) {
      materialRef.current.color.set(tileColor);
      prevColorRef.current = tileColor;
    }
  }, [tileColor]);

  return (
    <>
      {/* Main floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[20, 20, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color={tileColor}
          roughness={0.4}
          metalness={0.1}
          side={THREE.DoubleSide}
          toneMapped={true}
        />
      </mesh>

    </>
  );
};

export const Floor = memo(FloorComponent);
