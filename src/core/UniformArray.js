import Uniform from './Uniform';
// TODO: Allow to update the uniform array at once (and keep in sync children)

export default class UniformArray extends Array {
  constructor(gl, info) {
    super();
    this.context = {
      gl,
      info,
      globalUniform: new Uniform(gl, info)
    };
    this.splitUniform();
  }

  splitUniform() {
    const { info, gl } = this.context;
    const { parts, program, size } = info;
    for (let i = 0; i < size; i++) {
      const name = parts.property.name + `[${i}]`;
      const location = gl.getUniformLocation(program, name);
      const obj = new Uniform(gl, {
        ...info,
        location,
        size: 1,
      });
      this[i] = obj;
    }
  }

  // set value(value) {
  //   this.globalUniform.value = value;
  // }

  // get value() {
  //   return this.context.globalUniform.value;
  // }

  update() {
    for (let i = 0; i < this.length; i++) {
      this[i].update();
    }
  }
}
