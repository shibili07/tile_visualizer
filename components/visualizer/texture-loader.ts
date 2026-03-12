import * as THREE from 'three';

const textureCache = new Map<string, THREE.Texture>();
const loader = new THREE.TextureLoader();

export const loadTexture = async (url: string): Promise<THREE.Texture> => {
  // Return cached texture if available
  if (textureCache.has(url)) {
    return textureCache.get(url)!;
  }

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        textureCache.set(url, texture);
        resolve(texture);
      },
      undefined,
      reject
    );
  });
};

export const disposeTexture = (url: string) => {
  const texture = textureCache.get(url);
  if (texture) {
    texture.dispose();
    textureCache.delete(url);
  }
};

export const clearTextureCache = () => {
  textureCache.forEach((texture) => texture.dispose());
  textureCache.clear();
};
