import { getUniformSetter, getUniformDefaultValue } from '../utils/UniformUtils.js';
import { arraysEqual, copyArray, isArray } from '../utils/ArrayUtils';
import * as GL from '../const/GL';

/*
  TODO: Optimize uniform setters by allowing to set by component.
  e.g: using uniform3f(loc, x, y, z) vs uniform3fv(loc, [x, y, z]);
  See: https://bit.ly/2S0muTQ IE and FF benchmarks are not conclusive
  TODO: flat array when is matrix type before compare
*/

export default class Uniform {
  constructor(gl, {
    parts,
    name,
    type,
    location,
    size
  }) {
    this.gl = gl;
    this.type = type;
    this.name = name;
    this.location = location;
    this.size = size;
    this.parts = parts;
    this.setter = getUniformSetter(gl, type, size);
    this.current = getUniformDefaultValue(type, size);
    this.isArray = isArray(this.current);
    this.needsUpdate = true;
  }

  equals(a, b) {
    const { isArray } = this;
    return  a === b || isArray && arraysEqual(a, b);
  }

  update() {
    const { location, current } = this;
    if (this.needsUpdate) {
      this.setter(location, current);
      this.needsUpdate = false;
    }
  }

  set value(value) {
    const { isArray } = this;
    if (this.needsUpdate || this.equals(value, this.current)) {
      this.current = isArray ? copyArray(value, this.current) : value;
      this.needsUpdate = true;
    }
  }

  get value() {
    return this.current;
  }
}