import RawUniform from './RawUniform';
import RawUniformArray from './RawUniformArray';
import Uniform from './Uniform';
import Attribute from './Attribute';
import { createProgram, listProgramUniforms,  listProgramAttributes } from '../utils/UniformUtils';
import { warn } from '../utils/LogUtils';
/*
  TODO: Support for uniforms as arrays of arrays (GLSL ES 3.10)
  TODO: Support for custom defines and recompiling without loosing state
  TODO: Support for uniform blocks
  TODO: Release shader
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
    if (this.program) {
      const rawUniforms = Shader.GetRawUniforms(gl, this.program);
      this.uniforms = Shader.CreateUniforms(rawUniforms, uniforms);
      this.attributes = Shader.GetAttributes(gl, this.program);
      console.log(this.uniforms);
      console.log(this.attributes);
    }
  }

  static CreateUniforms(rawUniforms, values) {
    const uniforms = {};
    for (let name in rawUniforms) {
      if (name in rawUniforms) {
        uniforms[name] = new Uniform(rawUniforms[name], values, name);
      } else {
        const validNames = Object.keys(rawUniforms).join(',');
        warn(`Invalid uniform name: ${name}. Must be any of: [${validNames}]`);
      }
    }
    return uniforms;
  }

  static GetRawUniforms(gl, program) {
    const result = {};
    listProgramUniforms(gl, program, (info) => {
      const {
        isStructArray,
        isPropArray,
        isStruct,
        struct,
        property
      } = info.parts;

      // top level object
      let root = result;

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
        root[property.name] = new RawUniformArray(gl, info);
        root = root[property.name];
      } else {
        const obj = new RawUniform(gl, info);
        root[property.name] = obj;
      }

    });
    return result;
  }

  static GetAttributes(gl, program) {
    const attributes = {};
    listProgramAttributes(gl, program, (info) => {
      attributes[info.name] = new Attribute(gl, info);
    });
    return attributes;
  }

  use() {
    const { program, uniforms, gl } = this;
    gl.state.useProgram(program);
    let textureUnit = 0;
    for (const name in uniforms) {
      const uniform = uniforms[name];
      if (uniform.isTexture) {
        uniform.textureUnit = textureUnit; // textureManager.allocate(uniform.value);
        textureUnit++;
      }
      uniform.update();
    }
  }
}