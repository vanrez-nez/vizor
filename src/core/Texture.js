import * as GL from '../const/GL';
import Vec2 from '../math/Vec2';
import { setTextureParameters, setPixelStore } from '../utils/TextureUtils';

let id = 0;

export default class Texture {
  constructor(gl, {
    target = GL.TEXTURE_2D,
    format = GL.RGBA,
    internalFormat = format,
    type = GL.UNSIGNED_BYTE,
    wrapS = GL.CLAMP_TO_EDGE,
    wrapT = GL.CLAMP_TO_EDGE,
    minFilter = GL.LINEAR,
    magFilter = GL.LINEAR,
    mipmaps = false,
  }) {
    this.gl = gl;
    this.isTexture = true;
    this.id = id++;
    this.target = target;
    this.images = [];
    this.texture = gl.createTexture();
    this.format = format;
    this.internalFormat = internalFormat;
    this.type = type;
    this.width = 0;
    this.height = 0;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.minFilter = minFilter;
    this.magFilter = magFilter;
    this.repeat = new Vec2(1, 1);
    this.center = new Vec2(0, 0);
    this.offset = new Vec2(0, 0);
    this.mipmaps = mipmaps;
    this.needsUpdate = true;
    this.loaded = false;
  }

  delete() {
    // gl.deleteTexture
  }

  update(textureUnit) {
    const { gl, loaded } = this;
    const { state } = gl;
    if (!this.needsUpdate || !loaded) return false;
    this.needsUpdate = false;
    state.activeTexture(textureUnit);
    state.bindTexture(this);
    setTextureParameters(gl, this);
    setPixelStore(gl, this);
    this.upload();
  }

  // override
  upload() {}

  setImage(image, index) {
    const { images } = this;
    if (image) {
      images[index] = image;
      this.needsUpdate = true;
    }
  }
}
