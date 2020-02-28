import * as GL from '../const/GL';
import Texture from './Texture';
import ImageLoader from '../loaders/ImageLoader';

export default class Texture2D extends Texture {
  constructor(gl, options) {
    super(gl, options);
    this.target = GL.TEXTURE_2D;
  }

  upload() {
    const { gl, images, target, internalFormat, format, type } = this;
    if (images[0]) {
      gl.texImage2D(target, 0, internalFormat, format, type, images[0]);
    }
  }

  loadImage(src) {
    const loader = new ImageLoader(src);
    loader.load().then((image) => {
      this.setImage(image, 0);
      this.loaded = true;
    });
  }
}