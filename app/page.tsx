'use client';

import React, { useState, useCallback } from 'react';
import { RoomCanvas } from '@/components/visualizer/RoomCanvas';
import { TileSelector } from '@/components/visualizer/TileSelector';
import { tiles } from '@/components/visualizer/tile-data';
import type { Tile } from '@/components/visualizer/tile-data';

export default function Home() {
  const [selectedTile, setSelectedTile] = useState<Tile>(tiles[0]);

  const handleTileSelect = useCallback((tile: Tile) => {
    setSelectedTile(tile);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* 3D Preview Area */}
      <div className="flex-1 relative overflow-hidden">
        <RoomCanvas selectedTileColor={selectedTile.color} />
      </div>

      {/* Tile Selector */}
      <TileSelector selectedTile={selectedTile} onTileSelect={handleTileSelect} />
    </div>
  );
}
