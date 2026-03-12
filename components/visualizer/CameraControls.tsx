'use client';

import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Orbit around the room centre at eye level
const CENTER = new THREE.Vector3(0, 1.5, 0);

// Initial angles: camera at ~[7, 3, 9] – interior corner view
// rotY = atan2(7, 9) ≈ 0.66,  rotX = asin(1.5 / 11.5) ≈ 0.13
const INIT_X  = 0.13;
const INIT_Y  = 0.66;
const INIT_R  = 11.5;

export const CameraControls: React.FC = () => {
  const { camera, gl } = useThree();
  const mouseDown = useRef(false);
  const mouseX    = useRef(0);
  const mouseY    = useRef(0);
  const tgtX  = useRef(INIT_X);
  const tgtY  = useRef(INIT_Y);
  const curX  = useRef(INIT_X);
  const curY  = useRef(INIT_Y);
  const radius = useRef(INIT_R);

  useEffect(() => {
    // Snap camera to initial interior position
    camera.position.set(
      CENTER.x + Math.sin(INIT_Y) * Math.cos(INIT_X) * INIT_R,
      CENTER.y + Math.sin(INIT_X) * INIT_R,
      CENTER.z + Math.cos(INIT_Y) * Math.cos(INIT_X) * INIT_R,
    );
    camera.lookAt(CENTER);

    const onDown = (e: MouseEvent) => {
      mouseDown.current = true;
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const onMove = (e: MouseEvent) => {
      if (!mouseDown.current) return;
      tgtY.current += (e.clientX - mouseX.current) * 0.005;
      tgtX.current -= (e.clientY - mouseY.current) * 0.005;
      // floor = 0.05 rad above horizontal, ceiling = just below top-down
      tgtX.current = Math.max(0.05, Math.min(Math.PI / 2.1, tgtX.current));
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const onUp = () => { mouseDown.current = false; };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      mouseDown.current = true;
      mouseX.current = e.touches[0].clientX;
      mouseY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!mouseDown.current || e.touches.length !== 1) return;
      tgtY.current += (e.touches[0].clientX - mouseX.current) * 0.005;
      tgtX.current -= (e.touches[0].clientY - mouseY.current) * 0.005;
      tgtX.current = Math.max(0.05, Math.min(Math.PI / 2.1, tgtX.current));
      mouseX.current = e.touches[0].clientX;
      mouseY.current = e.touches[0].clientY;
    };

    const onTouchEnd = () => { mouseDown.current = false; };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      radius.current = Math.max(5, Math.min(18, radius.current + e.deltaY * 0.02));
    };

    const dom = gl.domElement;
    dom.addEventListener('mousedown',  onDown);
    dom.addEventListener('mousemove',  onMove);
    dom.addEventListener('mouseup',    onUp);
    dom.addEventListener('touchstart', onTouchStart);
    dom.addEventListener('touchmove',  onTouchMove, { passive: true });
    dom.addEventListener('touchend',   onTouchEnd);
    dom.addEventListener('wheel',      onWheel, { passive: false });

    const loop = setInterval(() => {
      curX.current += (tgtX.current - curX.current) * 0.1;
      curY.current += (tgtY.current - curY.current) * 0.1;
      const r = radius.current;
      camera.position.set(
        CENTER.x + Math.sin(curY.current) * Math.cos(curX.current) * r,
        CENTER.y + Math.sin(curX.current) * r,
        CENTER.z + Math.cos(curY.current) * Math.cos(curX.current) * r,
      );
      camera.lookAt(CENTER);
    }, 1000 / 60);

    return () => {
      dom.removeEventListener('mousedown',  onDown);
      dom.removeEventListener('mousemove',  onMove);
      dom.removeEventListener('mouseup',    onUp);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove',  onTouchMove);
      dom.removeEventListener('touchend',   onTouchEnd);
      dom.removeEventListener('wheel',      onWheel);
      clearInterval(loop);
    };
  }, [camera, gl]);

  return null;
};
