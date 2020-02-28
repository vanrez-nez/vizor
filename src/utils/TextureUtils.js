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

export function setTextureParameters(gl, { target, wrapS, wrapT, magFilter, minFilter }) {
  gl.texParameteri(target, GL.TEXTURE_WRAP_S, wrapS);
  gl.texParameteri(target, GL.TEXTURE_WRAP_T, wrapT);
  gl.texParameteri(target, GL.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(target, GL.TEXTURE_MAG_FILTER, magFilter);
}

export function setPixelStore(gl, texture) {
  gl.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, 1);
}


export function generateMipmaps(gl, texture) {
  // generate mips only if power of two
  //gl.generateMipmap(texture.target);
}