import { getSizeToContain, ceilPowerOfTwo } from '../utils/MathUtils';
import GLCapabilities from '../core/GLCapabilities';
import * as GL from '../const/GL';

// TODO: consider using Offscreen canvas to handle the resize inside workers
// https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Non-Power_of_Two_Texture_Support

function resizeImage(image, maxSize, toPowerOfTwo) {
  const { width: srcW, height: srcH } = image;
  let [dstW, dstH] = [srcW, srcH];

  if (toPowerOfTwo) {
    [dstW, dstH] = [ceilPowerOfTwo(srcW), ceilPowerOfTwo(srcH)];
  }

  if (srcW > maxSize || srcH > maxSize) {
    [dstW, dstH] = getSizeToContain(dstW, dstH, maxSize, maxSize);
    [dstW, dstH] = [Math.floor(dstW), Math.floor(dstH)];
  }

  if (srcW !== dstW || srcH !== dstH) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = dstW;
    canvas.height = dstH;
    context.drawImage(image, 0, 0, dstW, dstH);
    return canvas;
  }

  return image;
}

function needsPowerOfTwo(texture) {
  const { gl, wrapS, wrapT, minFilter, isPowerOfTwo } = texture;
  const { webgl2 } = GLCapabilities.Get(gl);
  return !webgl2 && (!isPowerOfTwo) &&
  (wrapS !== GL.CLAMP_TO_EDGE || wrapT !== GL.CLAMP_TO_EDGE) ||
  (minFilter !== GL.NEAREST && minFilter !== GL.LINEAR);
}

function resizeTexture(texture) {
  const { target, images } = texture;
  // Determine max texture size from Cube or 2D Texture Types.
  const { limits } = GLCapabilities.Get(texture.gl);
  const isCube = target === GL.TEXTURE_CUBE_MAP;
  const maxSize = isCube ? maxCubeMapTextureSize : limits.maxTextureSize;
  const toPowerOfTwo = needsPowerOfTwo(texture);
  for (let i = 0; i < images.length; i++) {
    images[i] = resizeImage(images[i], maxSize, toPowerOfTwo);
  }
}

export default class TextureResize {

  static GetKey() {
    return 'TextureResize';
  }

  Resize(texture) {
    return resizeTexture(texture);
  }
}
