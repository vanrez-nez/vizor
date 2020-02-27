import RawUniform from './RawUniform';
// TODO: Allow to update the uniform array at once (and keep in sync children)

export default class RawUniformArray extends Array {
  constructor(gl, info) {
    super();
    this.context = {
      gl,
      info,
      globalUniform: new RawUniform(gl, info)
    };
    this.splitUniform();
  }

  splitUniform() {
    const { info, gl } = this.context;
    const { parts, program, size } = info;
    for (let i = 0; i < size; i++) {
      const name = parts.property.name + `[${i}]`;
      const location = gl.getUniformLocation(program, name);
      const obj = new RawUniform(gl, {
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
