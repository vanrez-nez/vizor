import { getUniformSetter, getUniformDefaultValue } from './utils/UniformUtils';
import { arraysEqual, copyArray } from './utils/ArrayUtils';

export default class Uniform {
  constructor(gl, { name, type, location, size }) {
    this.gl = gl;
    this.type = type;
    this.name = name;
    this.location = location;
    this.size = size;
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