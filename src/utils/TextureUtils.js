import * as GL from '../const/GL';

export function isPowerOfTwo(x) {
  return (x & (x - 1)) == 0;
}

export function nextHighestPowerOfTwo(x) {
  if (isPowerOfTwo(x)) return x;
  const p = 2;
  while( x >>= 1) p <<= 1;
  return p;
}

export function resizeImage(image, size) {
  // TextureToPowerOfTwo
}

export function setTextureParameters(gl, texture) {
  gl.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, texture.wrapS);
  gl.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, texture.wrapT);
  gl.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, texture.magFilter);
  gl.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, texture.minFilter);
}
