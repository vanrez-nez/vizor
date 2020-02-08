import { createProgram, listProgramUniforms,  listProgramAttributes } from '../utils/UniformUtils';
import Uniform from './Uniform';
import UniformArray from './UniformArray';

/*
  TODO: Support for uniforms as arrays of arrays (GLSL ES 3.10)
  TODO: Support for uniform blocks
  TODO: Support for struct parsing
*/

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
  }

  createUniforms() {
    const { gl, program } = this;
    const uniforms = {};
    const list = listProgramUniforms(gl, program);
    console.log(list);
    list.forEach(info => {
      const {
        isStructArray,
        isPropArray,
        isStruct,
        struct,
        property
      } = info.parts;

      // top level object
      let root = uniforms;

      if (isStruct) {

        // Allocate struct level
        const entry = isStructArray ? [] : {};
        root[struct.name] = root[struct.name] || entry;
        root = root[struct.name];

        // Allocate array entry
        if (isStructArray) {
          root[struct.index] = root[struct.index] || {};
          root = root[struct.index];
        }
      }

      if (isPropArray) {
        // should be an array uniform object
        root[property.name] = new UniformArray();
        root = root[property.name];
        for (let i = 0; i < info.size; i++) {
          // should be an offsetted uniform
          const obj =  new Uniform(gl, info);
          root[i] = obj;
        }
      } else {
        const obj =  new Uniform(gl, info);
        root[property.name] = obj;
      }

    });
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