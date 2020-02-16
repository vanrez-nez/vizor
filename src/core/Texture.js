import * as GL from '../const/GL';

export default class Texture {
  constructor(gl, {
    image = null,
  }) {
    this.image = image;
    this.mipmaps = [];

  }
}