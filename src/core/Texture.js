import * as GL from '../const/GL';
import GLState from './GLState';
import Vec2 from '../math/Vec2';
import GLCapabilities from './GLCapabilities';
import { isPowerOfTwo } from '../utils/MathUtils';
import {
  setTextureParameters,
  setPixelStore,
  generateMipmaps,
} from '../utils/TextureUtils';
import Addons from './Addons';

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
    this.state = GLState.Get(gl);
    this.capabilities = GLCapabilities.Get(gl);
    this.isTexture = true;
    this.id = id++;
    this.target = target;
    this.images = [];
    this.texture = gl.createTexture();
    this.format = format;
    this.internalFormat = internalFormat;
    this.type = type;
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

  resize() {
    const Addon = Addons.Get('TextureResize');
    if (Addon) {
      Addon.Resize(this);
    }
  }

  delete() {
    // gl.deleteTexture
  }

  update(textureUnit) {
    const { gl, state, loaded, capabilities } = this;
    if (!this.needsUpdate || !loaded) return false;
    this.needsUpdate = false;
    state.activeTexture(textureUnit);
    state.bindTexture(this);
    setTextureParameters(gl, this);
    setPixelStore(gl, this);
    this.resize();
    this.upload();
    generateMipmaps(gl, this);
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

  get supportsMips() {
    return this.isPowerOfTwo || this.capabilities.webgl2;
  }

  get isPowerOfTwo() {
    const { width, height } = this;
    return isPowerOfTwo(width) && isPowerOfTwo(height);
  }

  get width() {
    const { images, loaded } = this;
    return loaded ? images[0].width : 0;
  }

  get height() {
    const { images, loaded } = this;
    return loaded ? images[0].height : 0;
  }
}
