'use client';

import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/spinner';

const RoomScene = dynamic(() => import('./RoomScene').then((mod) => ({ default: mod.RoomScene })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <Spinner />
    </div>
  ),
});

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface RoomCanvasProps {
  selectedTileColor: string;
}

export const RoomCanvas: React.FC<RoomCanvasProps> = ({ selectedTileColor }) => {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglAvailable(isWebGLAvailable());
  }, []);

  if (webglAvailable === null) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (!webglAvailable) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-3 text-center p-6">
        <p className="text-lg font-semibold text-muted-foreground">3D preview unavailable</p>
        <p className="text-sm text-muted-foreground max-w-sm">
          WebGL is not supported or has been disabled in your browser. Enable hardware acceleration
          in your browser settings to use the 3D viewer.
        </p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-full">
          <Spinner />
        </div>
      }
    >
      <RoomScene selectedTileColor={selectedTileColor} />
    </Suspense>
  );
};
