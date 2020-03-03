import * as GL from '../const/GL';

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
  if (texture.supportsMips) {
    gl.generateMipmap(texture.target);
  }
}