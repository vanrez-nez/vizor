import { getUniformSetter, getUniformDefaultValue } from '../utils/UniformUtils.js';
import { arraysEqual, copyArray } from '../utils/ArrayUtils';

/*
  TODO: Optimize uniform setters by allowing to set by component.
  e.g: using uniform3f(loc, x, y, z) vs uniform3fv(loc, [x, y, z]);
  See: https://bit.ly/2S0muTQ IE and FF benchmarks are not conclusive
*/

export default class Uniform {
  constructor(gl, { parts, name, type, location, size }) {
    this.gl = gl;
    this.type = type;
    this.name = name;
    this.location = location;
    this.size = size;
    this.parts = parts;
    this.setter = getUniformSetter(gl, type, size);
    this.cache = getUniformDefaultValue(type, size);
  }

  setCache(value) {
    if (value.length) {
      copyArray(value, this.cache);
    } else {
      this.cache = value;
    }
  }

  equals(value) {
    const { cache } = this;
    if (value.length) {
      return arraysEqual(value, cache);
    }
    return value === cache;
  }

  updateArray(program, value, index) {
    const { gl, name } = this;
    let newName = name.replace(/\[\d+\]$/, `[${index}]`);
    const loc = gl.getUniformLocation(program, newName);
    gl.uniform2fv(loc, value);
  }

  set value(value) {
    const { location } = this;
    if (!this.equals(value)) {
      this.setter(location, value);
      this.setCache(value);
    }
  }

  get value() {
    return this.cache;
  }
}