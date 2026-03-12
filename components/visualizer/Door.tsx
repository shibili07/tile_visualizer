'use client';

import React, { memo } from 'react';

// Door centered at x=1.5, against back wall z=-10
const DW   = 1.8;    // door width
const DH   = 3.8;    // door height

const FRAME   = '#2c1c0e';   // dark walnut frame
const WOOD    = '#8b5a30';   // warm mahogany door panel
const WOOD2   = '#6a3e1e';   // slightly darker inset panels
const GLASS   = '#b8d4e8';   // window glass tint
const MULLION = '#2c1c0e';   // window dividers
const BRASS   = '#c8932a';   // brass hardware

const DoorComponent: React.FC = () => (
  <group position={[1.5, 0, -9.92]}>

    {/* ── Door frame ─────────────────────────────────────────────────── */}
    {/* Left jamb */}
    <mesh position={[-(DW / 2 + 0.07), DH / 2, 0]} castShadow>
      <boxGeometry args={[0.13, DH + 0.13, 0.15]} />
      <meshStandardMaterial color={FRAME} roughness={0.5} />
    </mesh>
    {/* Right jamb */}
    <mesh position={[(DW / 2 + 0.07), DH / 2, 0]} castShadow>
      <boxGeometry args={[0.13, DH + 0.13, 0.15]} />
      <meshStandardMaterial color={FRAME} roughness={0.5} />
    </mesh>
    {/* Header */}
    <mesh position={[0, DH + 0.065, 0]} castShadow>
      <boxGeometry args={[DW + 0.26, 0.13, 0.15]} />
      <meshStandardMaterial color={FRAME} roughness={0.5} />
    </mesh>

    {/* ── Main door panel ────────────────────────────────────────────── */}
    <mesh position={[0, DH / 2, 0.01]} castShadow receiveShadow>
      <boxGeometry args={[DW, DH, 0.07]} />
      <meshStandardMaterial color={WOOD} roughness={0.45} metalness={0.03} />
    </mesh>

    {/* ── Lower decorative inset panels (2 side-by-side) ─────────────── */}
    {([-0.48, 0.48]).map((x) => (
      <mesh key={x} position={[x, DH * 0.27, 0.055]} castShadow>
        <boxGeometry args={[0.63, DH * 0.4, 0.038]} />
        <meshStandardMaterial color={WOOD2} roughness={0.62} />
      </mesh>
    ))}

    {/* ── Upper glass window section ─────────────────────────────────── */}
    {/* Window outer frame */}
    <mesh position={[0, DH * 0.765, 0.055]} castShadow>
      <boxGeometry args={[1.28, 0.82, 0.044]} />
      <meshStandardMaterial color={FRAME} roughness={0.45} />
    </mesh>
    {/* 4 glass panes — 2 columns × 2 rows */}
    {([-0.3, 0.3]).flatMap((x) =>
      ([-0.16, 0.17]).map((yOff) => (
        <mesh key={`g${x}${yOff}`} position={[x, DH * 0.765 + yOff, 0.07]}>
          <boxGeometry args={[0.52, 0.3, 0.012]} />
          <meshStandardMaterial
            color={GLASS}
            transparent
            opacity={0.5}
            roughness={0.04}
            metalness={0.12}
          />
        </mesh>
      ))
    )}
    {/* Cross mullion – horizontal */}
    <mesh position={[0, DH * 0.765, 0.066]}>
      <boxGeometry args={[1.22, 0.03, 0.018]} />
      <meshStandardMaterial color={MULLION} roughness={0.4} />
    </mesh>
    {/* Cross mullion – vertical */}
    <mesh position={[0, DH * 0.765, 0.066]}>
      <boxGeometry args={[0.03, 0.76, 0.018]} />
      <meshStandardMaterial color={MULLION} roughness={0.4} />
    </mesh>

    {/* ── Door handle (lever style) ──────────────────────────────────── */}
    {/* Escutcheon plate */}
    <mesh position={[-(DW / 2 - 0.22), DH * 0.51, 0.068]}>
      <boxGeometry args={[0.055, 0.24, 0.015]} />
      <meshStandardMaterial color={BRASS} roughness={0.16} metalness={0.88} />
    </mesh>
    {/* Lever bar */}
    <mesh position={[-(DW / 2 - 0.12), DH * 0.51, 0.082]}>
      <boxGeometry args={[0.22, 0.035, 0.035]} />
      <meshStandardMaterial color={BRASS} roughness={0.12} metalness={0.92} />
    </mesh>
    {/* Lever-end knob */}
    <mesh position={[-(DW / 2 - 0.04), DH * 0.51, 0.082]}>
      <sphereGeometry args={[0.028, 10, 10]} />
      <meshStandardMaterial color={BRASS} roughness={0.1} metalness={0.95} />
    </mesh>
  </group>
);

export const Door = memo(DoorComponent);
