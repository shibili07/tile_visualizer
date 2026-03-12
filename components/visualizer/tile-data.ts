export interface Tile {
  id: string;
  name: string;
  textureUrl: string;
  color: string;
  description: string;
}

export const tiles: Tile[] = [
  {
    id: 'marble-white',
    name: 'Marble White',
    textureUrl: '/assets/3d/texture_earth.jpg', // Placeholder - replace with actual marble texture
    color: '#f5f5f5',
    description: 'Classic white marble with subtle veining',
  },
  {
    id: 'granite-dark',
    name: 'Granite Dark',
    textureUrl: '/assets/3d/texture_earth.jpg',
    color: '#2d2d2d',
    description: 'Deep charcoal granite with natural speckles',
  },
  {
    id: 'travertine-cream',
    name: 'Travertine Cream',
    textureUrl: '/assets/3d/texture_earth.jpg',
    color: '#e8dcc8',
    description: 'Warm cream travertine with rustic appeal',
  },
  {
    id: 'slate-grey',
    name: 'Slate Grey',
    textureUrl: '/assets/3d/texture_earth.jpg',
    color: '#5a6b7a',
    description: 'Natural grey slate with layered texture',
  },
  {
    id: 'limestone-beige',
    name: 'Limestone Beige',
    textureUrl: '/assets/3d/texture_earth.jpg',
    color: '#d4c5a9',
    description: 'Warm beige limestone with fossil patterns',
  },
  {
    id: 'basalt-black',
    name: 'Basalt Black',
    textureUrl: '/assets/3d/texture_earth.jpg',
    color: '#1a1a1a',
    description: 'Rich black basalt with glossy finish',
  },
  {
    id: 'sandstone-tan',
    name: 'Sandstone Tan',
    textureUrl: '/assets/3d/texture_earth.jpg',
    color: '#c9a876',
    description: 'Earthy tan sandstone with natural grain',
  },
  {
    id: 'quartz-white',
    name: 'Engineered Quartz',
    textureUrl: '/assets/3d/texture_earth.jpg',
    color: '#ffffff',
    description: 'Bright engineered quartz surface',
  },
];

export const getTileById = (id: string): Tile | undefined => {
  return tiles.find((tile) => tile.id === id);
};
