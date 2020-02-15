import * as GL from '../const/GL';
import { warn } from './LogUtils';

/*
  TODO: Support newer WebGL2 uniform types. See: https://mzl.la/2OwicBs
*/

const ARR = Array;
const I32 = Int32Array;
const F32 = Float32Array;
const UNIFORM_DESCRIPTORS = {
  // TYPE: [SETTER_SUFFIX, ARRAY_CLASS, COMPONENT_COUNT]
  [GL.BOOL]: ['1i', ARR, 1],
  [GL.INT]: ['1i', I32, 1],
  [GL.FLOAT]: ['1f', F32, 1],
  [GL.BOOL_VEC2]: ['2iv', ARR, 2],
  [GL.BOOL_VEC3]: ['3iv', ARR, 3],
  [GL.BOOL_VEC4]: ['3iv', ARR, 4],
  [GL.INT_VEC2]: ['2iv', I32, 2],
  [GL.INT_VEC3]: ['3iv', I32, 3],
  [GL.INT_VEC4]: ['4iv', I32, 4],
  [GL.FLOAT_VEC2]: ['2fv', F32, 2],
  [GL.FLOAT_VEC3]: ['3fv', F32, 3],
  [GL.FLOAT_VEC4]: ['4fv', F32, 4],
  [GL.FLOAT_MAT2]: ['Matrix2fv', F32, 4],
  [GL.FLOAT_MAT3]: ['Matrix3fv', F32, 9],
  [GL.FLOAT_MAT4]: ['Matrix4fv', F32, 16],
  [GL.SAMPLER_2D]: ['1i', I32, 1],
};

function getDescriptor(type) {
  const desc = UNIFORM_DESCRIPTORS[type];
  if (!desc) warn('Unexpected uniform type', type);
  return desc;
}

function getSetterName(type, size) {
  let [suffix] = getDescriptor(type);
  if (size > 1) {
    // transform 1i/1f suffixes to 1iv/1fv if uniform is an array
    suffix = suffix.replace(/v?$/, 'v');
  }
  return `uniform${suffix}`;
}

function parseUniformName(name) {
  const parts = name.match(/(\w+)/g);
  const isStruct = name.indexOf('.') > -1;
  const isStructArray = isStruct && !isNaN(parts[1]);
  const isPropArray = !isNaN(parts[parts.length - 1]);
  return {
    isStruct,
    isStructArray,
    isPropArray,
    // Extract uniform parts (order matters)
    property: {
      index: isPropArray ? Number(parts.pop()) : -1,
      name: parts.pop(),
    },
    struct: {
      index: isStructArray ? Number(parts.pop()) : -1,
      name: parts.pop(),
    }
  };
}

const UniformSetters = {}
export function getUniformSetter(gl, type, size) {
  if (!UniformSetters[type]) {
    const glName = getSetterName(type, size);
    const glFunction = gl[glName];
    const isMatrix = /Matrix/.test(glName);
    UniformSetters[type] = function setUniform(location, value) {
      if (isMatrix) {
        glFunction.call(gl, location, false, value);
      } else {
        glFunction.call(gl, location, value);
      }
    };
  }
  return UniformSetters[type];
}

export function getUniformDefaultValue(type, size) {
  let value = type === GL.BOOL ? false : 0;
  const [/*suffix*/, arrayClass, componentCount] = getDescriptor(type);
  if (size > 1 || componentCount > 1) {
    value = new arrayClass(size * componentCount);
    if (type === GL.BOOL) {
      value.fill(false);
    }
  }
  return value;
}

export function listProgramUniforms(gl, program, callback) {
  let count = gl.getProgramParameter(program, GL.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const { name, type, size } = gl.getActiveUniform(program, i);
    const location = gl.getUniformLocation(program, name);
    const parts = parseUniformName(name);
    callback({ parts, name, type, size, location });
  }
}

export function listProgramAttributes(gl, program, callback) {
  let count = gl.getProgramParameter(program, GL.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < count; i++) {
    const { name, type, size } = gl.getActiveAttrib(program, i);
    const location = gl.getAttribLocation(program, name);
    callback({ name, type, size, location });
  }
}

export function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, GL.COMPILE_STATUS);
  if (!success) {
    const error = gl.getShaderInfoLog(shader);
    warn('Shader compilation error: ', error);
  }
  return shader;
}

export function createProgram(gl, vertexSource, fragmentSource) {
  const program = gl.createProgram();
  const vertex = compileShader(gl, GL.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, GL.FRAGMENT_SHADER, fragmentSource);
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  const linked = gl.getProgramParameter(program, GL.LINK_STATUS);
  if (!linked) {
    const error = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    warn('Program link error:', error);
  }
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  return program;
}