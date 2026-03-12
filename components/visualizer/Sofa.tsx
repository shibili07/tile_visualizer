'use client';

import React, { memo } from 'react';

const SOFA    = '#8a7d72';   // warm taupe fabric
const CUSHION = '#a09488';   // slightly lighter cushion
const LEGS    = '#3a2a1c';   // dark wood legs
const WOOD    = '#5c3c22';   // table frame
const WOOD_TOP = '#7a5030';  // table top (slightly lighter wood)
const RUG     = '#c4ae8a';   // warm cream rug

// ── 3-seater sofa ──────────────────────────────────────────────────────────
// Front faces +Z by default; place group with rotation={[0, Math.PI, 0]}
// so the front faces -Z (toward back wall) when positioned in front-of-room.
// Actually we'll position group so front faces the camera (+Z toward z=9).
const ThreeSeater: React.FC = () => {
  const W = 5.2, D = 1.9;
  return (
    <group>
      {/* Legs */}
      {([-2.3, 2.3]).map((x) =>
        ([-0.76, 0.76]).map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.1, z]} castShadow>
            <boxGeometry args={[0.12, 0.2, 0.12]} />
            <meshStandardMaterial color={LEGS} roughness={0.4} />
          </mesh>
        ))
      )}

      {/* Base body */}
      <mesh position={[0, 0.33, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, 0.46, D]} />
        <meshStandardMaterial color={SOFA} roughness={0.9} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.96, -(D / 2 - 0.17)]} castShadow receiveShadow>
        <boxGeometry args={[W, 0.92, 0.33]} />
        <meshStandardMaterial color={SOFA} roughness={0.9} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-(W / 2 - 0.17), 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.33, 0.88, D]} />
        <meshStandardMaterial color={SOFA} roughness={0.9} />
      </mesh>

      {/* Right arm */}
      <mesh position={[(W / 2 - 0.17), 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.33, 0.88, D]} />
        <meshStandardMaterial color={SOFA} roughness={0.9} />
      </mesh>

      {/* Seat cushions */}
      {([-1.55, 0, 1.55]).map((x) => (
        <mesh key={`sc${x}`} position={[x, 0.67, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.2, D - 0.55]} />
          <meshStandardMaterial color={CUSHION} roughness={0.95} />
        </mesh>
      ))}

      {/* Back cushions */}
      {([-1.55, 0, 1.55]).map((x) => (
        <mesh key={`bc${x}`} position={[x, 0.98, -(D / 2 - 0.35)]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.58, 0.26]} />
          <meshStandardMaterial color={CUSHION} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
};

// ── Armchair (same style, 1-seater) ────────────────────────────────────────
const Armchair: React.FC = () => {
  const W = 1.8, D = 1.8;
  return (
    <group>
      {/* Legs */}
      {([-(W / 2 - 0.12), (W / 2 - 0.12)]).map((x) =>
        ([-(D / 2 - 0.12), (D / 2 - 0.12)]).map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.1, z]} castShadow>
            <boxGeometry args={[0.1, 0.2, 0.1]} />
            <meshStandardMaterial color={LEGS} roughness={0.4} />
          </mesh>
        ))
      )}

      {/* Base */}
      <mesh position={[0, 0.33, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, 0.46, D]} />
        <meshStandardMaterial color={SOFA} roughness={0.9} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.96, -(D / 2 - 0.17)]} castShadow receiveShadow>
        <boxGeometry args={[W, 0.92, 0.33]} />
        <meshStandardMaterial color={SOFA} roughness={0.9} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-(W / 2 - 0.15), 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.29, 0.88, D]} />
        <meshStandardMaterial color={SOFA} roughness={0.9} />
      </mesh>

      {/* Right arm */}
      <mesh position={[(W / 2 - 0.15), 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.29, 0.88, D]} />
        <meshStandardMaterial color={SOFA} roughness={0.9} />
      </mesh>

      {/* Seat cushion */}
      <mesh position={[0, 0.67, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[W - 0.58, 0.2, D - 0.55]} />
        <meshStandardMaterial color={CUSHION} roughness={0.95} />
      </mesh>

      {/* Back cushion */}
      <mesh position={[0, 0.98, -(D / 2 - 0.35)]} castShadow receiveShadow>
        <boxGeometry args={[W - 0.58, 0.58, 0.26]} />
        <meshStandardMaterial color={CUSHION} roughness={0.95} />
      </mesh>
    </group>
  );
};

// ── Coffee table ────────────────────────────────────────────────────────────
const CoffeeTable: React.FC = () => (
  <group>
    {/* Legs */}
    {([-1.25, 1.25]).map((x) =>
      ([-0.46, 0.46]).map((z) => (
        <mesh key={`${x}${z}`} position={[x, 0.26, z]} castShadow>
          <boxGeometry args={[0.08, 0.52, 0.08]} />
          <meshStandardMaterial color={WOOD} roughness={0.45} />
        </mesh>
      ))
    )}

    {/* Tabletop */}
    <mesh position={[0, 0.535, 0]} castShadow receiveShadow>
      <boxGeometry args={[2.8, 0.07, 1.0]} />
      <meshStandardMaterial color={WOOD_TOP} roughness={0.3} metalness={0.05} />
    </mesh>

    {/* Lower shelf */}
    <mesh position={[0, 0.19, 0]} receiveShadow>
      <boxGeometry args={[2.3, 0.05, 0.78]} />
      <meshStandardMaterial color={WOOD} roughness={0.6} />
    </mesh>
  </group>
);

// ── Full sofa set ───────────────────────────────────────────────────────────
const SofaSetComponent: React.FC = () => (
  <>
    {/* Rug under seating area */}
    <mesh position={[0, 0.006, -5.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8.5, 6.5]} />
      <meshStandardMaterial color={RUG} roughness={1} />
    </mesh>

    {/*
      3-seater sofa:
        group at z=-8 → backrest world z ≈ -8.78, front z ≈ -7.05
        Faces +Z (toward camera at z=9), no rotation needed.
    */}
    <group position={[0, 0, -8]}>
      <ThreeSeater />
    </group>

    {/* Coffee table in front of sofa */}
    <group position={[0, 0, -5.8]}>
      <CoffeeTable />
    </group>

    {/*
      Armchair on the left side:
        rotation Y = +π/2 maps local +Z → world +X, so front faces +X (toward room center).
        group x=-7.5 → backrest world x ≈ -8.23, front x ≈ -6.6
    */}
    <group position={[-7.5, 0, -5.5]} rotation={[0, Math.PI / 2, 0]}>
      <Armchair />
    </group>
  </>
);

export const SofaSet = memo(SofaSetComponent);
