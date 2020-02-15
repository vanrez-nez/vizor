import { createProgram, listProgramUniforms,  listProgramAttributes } from '../utils/UniformUtils';
import Uniform from './Uniform';
import UniformArray from './UniformArray';

/*
  TODO: Support for uniforms as arrays of arrays (GLSL ES 3.10)
  TODO: Support for uniform blocks
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
    console.log(this.uniforms);
    console.log(this.attributes);
  }

  createUniforms() {
    const { gl, program } = this;
    const uniforms = {};
    listProgramUniforms(gl, program, (info) => {
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
    const attributes = {};
    listProgramAttributes(gl, program, (info) => {
      attributes[info.name] = info;
    });
    return attributes;
  }

  use(state) {
    const { program, uniforms } = this;
    state.useProgram(program);
    for (const name in this.uniforms) {
      uniforms[name].update();
    }

  }
}