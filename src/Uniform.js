import { setUniformValue, getUniformComponentCount } from './webgl-utils';

export default class Uniform {
  constructor(gl, { name, type, location, size }) {
    this.gl = gl;
    this.type = type;
    this.name = name;
    this.location =  location;
    this.size = size;
    
    this.cache = this.createCache();
  }

  createCache() {
    const { type, size } = this;
    let cache = size > 1 ? [] : 0;
    const count = getUniformComponentCount(type);

    return cache;
  }

  set(value) {
    const { gl, type, location } = this;
    setUniformValue(gl, type, location, value);
  }
}