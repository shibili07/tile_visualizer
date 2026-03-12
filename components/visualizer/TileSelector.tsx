'use client';

import React, { memo, useCallback } from 'react';
import { tiles, Tile } from './tile-data';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TileSelectorProps {
  selectedTile: Tile;
  onTileSelect: (tile: Tile) => void;
}

const TileSelectorComponent: React.FC<TileSelectorProps> = ({ selectedTile, onTileSelect }) => {
  const handleClick = useCallback((tile: Tile) => {
    onTileSelect(tile);
  }, [onTileSelect]);
  return (
    <div className="flex flex-col gap-3 p-3 md:p-4 bg-background border-t max-h-[30vh] md:max-h-[25vh] overflow-hidden flex-shrink-0">
      <div className="flex items-center justify-between gap-2 min-h-0">
        <h3 className="text-sm font-semibold text-foreground truncate">Available Tiles</h3>
      </div>

      <ScrollArea className="w-full flex-1">
        <div className="flex gap-2 pb-2 pr-4">
          {tiles.map((tile) => (
            <button
              key={tile.id}
              onClick={() => handleClick(tile)}
              className={`flex flex-col gap-1 md:gap-2 p-2 md:p-3 rounded-lg border transition-all shrink-0 ${
                selectedTile.id === tile.id
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/50'
                  : 'border-border hover:border-primary/50 hover:bg-accent'
              }`}
              aria-label={`Select ${tile.name} tile`}
            >
              {/* Tile color preview */}
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-md border border-border shadow-sm"
                style={{ backgroundColor: tile.color }}
                aria-hidden="true"
              />
              {/* Tile name */}
              <span className="text-xs font-medium text-foreground text-center max-w-12 md:max-w-16 truncate">
                {tile.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Selected tile info */}
      <div className="flex flex-col gap-1 md:gap-2 p-2 md:p-3 bg-accent/50 rounded-lg border border-border min-h-0">
        <h4 className="text-xs md:text-sm font-semibold text-foreground truncate">{selectedTile.name}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{selectedTile.description}</p>
      </div>
    </div>
  );
};

export const TileSelector = memo(TileSelectorComponent);
