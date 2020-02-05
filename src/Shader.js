import { createProgram, listProgramUniforms,  listProgramAttributes } from './utils/UniformUtils';
import Uniform from './Uniform';

let Id = 0;

export default class Shader {
  constructor(gl, {
    vertexSource,
    fragmentSource,
    uniforms = {},
  }) {
    this.gl = gl;
    this.id = Id++;
    this.program = createProgram(gl, vertexSource, fragmentSource);
    this.uniforms = this.createUniforms();
    this.attributes = this.createAttributes();
    console.log(this.uniforms);
  }

  createUniforms() {
    const { gl, program } = this;
    const uniforms = {};
    const list = listProgramUniforms(gl, program);
    console.log(list)
    list.forEach(info => uniforms[info.name] = new Uniform(gl, info));
    return uniforms;
  }

  createAttributes() {
    const { gl, program } = this;
    const list = listProgramAttributes(gl, program);
  }

  use(state) {
    const { gl, program, id } = this;
    const active = state.programId === id;
    if (!active) {
      gl.useProgram(program);
      state.programId = id;
    }
  }
}