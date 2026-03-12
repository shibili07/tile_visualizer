'use client';

import React, { memo } from 'react';
import * as THREE from 'three';

const R = 10;           // room half-extent
const H = 5;            // ceiling height

// Colours
const WALL        = '#ede8e3';   // standard off-white
const ACCENT      = '#cdb896';   // warm sandstone accent (behind sofa)
const CEIL        = '#f5f3ef';   // ceiling
const SKIRT       = '#cdc7c0';   // skirting board
const SPOT_HOLE   = '#111111';   // recessed ceiling spot recess
const LIGHT_EMIT  = '#fff9e6';   // strip light emissive

// Door opening  (must match Door.tsx: center x=1.5, width=1.8, height=3.8)
const DOOR_X  = 1.5;
const DOOR_W  = 1.8;
const DOOR_H  = 3.8;
const DL      = DOOR_X - DOOR_W / 2;   //  0.6  left edge of opening
const DR      = DOOR_X + DOOR_W / 2;   //  2.4  right edge of opening

// Recessed ceiling spot positions (visual discs + light sources share these)
const SPOT_POS: [number, number, number][] = [
  [-4, H - 0.01, -6], [0, H - 0.01, -6], [4, H - 0.01, -6],
  [-4, H - 0.01,  0], [0, H - 0.01,  0], [4, H - 0.01,  0],
];

const WallsComponent: React.FC = () => (
  <>
    {/* ── Back wall – split into three segments around the door opening ── */}

    {/* Left segment: x = -R → DL */}
    <mesh position={[(-R + DL) / 2, H / 2, -R]} receiveShadow>
      <planeGeometry args={[DL + R, H]} />
      <meshStandardMaterial color={WALL} roughness={0.85} metalness={0} />
    </mesh>

    {/* Right segment: x = DR → +R */}
    <mesh position={[(DR + R) / 2, H / 2, -R]} receiveShadow>
      <planeGeometry args={[R - DR, H]} />
      <meshStandardMaterial color={WALL} roughness={0.85} metalness={0} />
    </mesh>

    {/* Top segment: above door x = DL → DR, y = DOOR_H → H */}
    <mesh position={[DOOR_X, (DOOR_H + H) / 2, -R]} receiveShadow>
      <planeGeometry args={[DOOR_W, H - DOOR_H]} />
      <meshStandardMaterial color={WALL} roughness={0.85} metalness={0} />
    </mesh>

    {/* ── Warm accent feature panel on back wall (behind sofa area) ────── */}
    {/* Sits slightly in front of the wall plane to layer on top */}
    <mesh position={[-2.5, H / 2, -R + 0.02]} receiveShadow>
      <planeGeometry args={[DL + R - 4, H]} />
      <meshStandardMaterial color={ACCENT} roughness={0.88} metalness={0} />
    </mesh>

    {/* ── Left wall ────────────────────────────────────────────────────── */}
    <mesh position={[-R, H / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
      <planeGeometry args={[R * 2, H]} />
      <meshStandardMaterial color={WALL} roughness={0.85} metalness={0} />
    </mesh>

    {/* ── Right wall ───────────────────────────────────────────────────── */}
    <mesh position={[R, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
      <planeGeometry args={[R * 2, H]} />
      <meshStandardMaterial color={WALL} roughness={0.85} metalness={0} />
    </mesh>

    {/* ── Ceiling ──────────────────────────────────────────────────────── */}
    <mesh position={[0, H, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[R * 2, R * 2]} />
      <meshStandardMaterial color={CEIL} roughness={0.9} metalness={0} side={THREE.FrontSide} />
    </mesh>

    {/* ── Recessed ceiling spot holes (visual discs) ──────────────────── */}
    {SPOT_POS.map(([x, y, z]) => (
      <mesh key={`spot${x}${z}`} position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.14, 20]} />
        <meshStandardMaterial color={SPOT_HOLE} roughness={0.3} />
      </mesh>
    ))}

    {/* ── Ceiling light strips (visual emissive boxes) ─────────────────── */}
    <mesh position={[-1.6, H - 0.04, 0]}>
      <boxGeometry args={[0.65, 0.06, 8]} />
      <meshStandardMaterial color="#ffffff" emissive={LIGHT_EMIT} emissiveIntensity={3.5} toneMapped={false} />
    </mesh>
    <mesh position={[1.6, H - 0.04, 0]}>
      <boxGeometry args={[0.65, 0.06, 8]} />
      <meshStandardMaterial color="#ffffff" emissive={LIGHT_EMIT} emissiveIntensity={3.5} toneMapped={false} />
    </mesh>

    {/* ── Corner fillers ───────────────────────────────────────────────── */}
    <mesh position={[-R, H / 2, -R]}>
      <boxGeometry args={[0.02, H, 0.02]} />
      <meshStandardMaterial color={WALL} />
    </mesh>
    <mesh position={[R, H / 2, -R]}>
      <boxGeometry args={[0.02, H, 0.02]} />
      <meshStandardMaterial color={WALL} />
    </mesh>

    {/* ── Skirting boards (back wall split around door) ─────────────────── */}
    {/* Back-left skirting */}
    <mesh position={[(-R + DL) / 2, 0.09, -R + 0.05]}>
      <boxGeometry args={[DL + R, 0.18, 0.07]} />
      <meshStandardMaterial color={SKIRT} roughness={0.6} />
    </mesh>
    {/* Back-right skirting */}
    <mesh position={[(DR + R) / 2, 0.09, -R + 0.05]}>
      <boxGeometry args={[R - DR, 0.18, 0.07]} />
      <meshStandardMaterial color={SKIRT} roughness={0.6} />
    </mesh>
    {/* Left wall skirting */}
    <mesh position={[-R + 0.05, 0.09, 0]}>
      <boxGeometry args={[0.07, 0.18, R * 2]} />
      <meshStandardMaterial color={SKIRT} roughness={0.6} />
    </mesh>
    {/* Right wall skirting */}
    <mesh position={[R - 0.05, 0.09, 0]}>
      <boxGeometry args={[0.07, 0.18, R * 2]} />
      <meshStandardMaterial color={SKIRT} roughness={0.6} />
    </mesh>
  </>
);

export const Walls = memo(WallsComponent);
