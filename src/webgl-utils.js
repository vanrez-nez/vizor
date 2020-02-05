import * as GL from './const/GL';



const ARR = Array;
const I32 = Int32Array;
const F32 = Float32Array;
const UNIFORM_DESCRIPTOR = {
  // TYPE: [SETTER_SUFFIX, ARRAY_CLASS, COMPONENT_COUNT] 
  [GL.FLOAT]: ['1f', F32, 1],
  [GL.FLOAT_VEC2]: ['2fv', F32, 2],
  [GL.FLOAT_VEC3]: ['3fv', F32, 3],
  [GL.INT]: ['1i', I32, 1],
  [GL.INT_VEC2]: ['2iv', I32, 2],
  [GL.INT_VEC3]: ['3iv', I32, 3],
  [GL.INT_VEC4]: ['4iv', I32, 4],
  [GL.BOOL]: ['1i', ARR, 1],
  [GL.BOOL_VEC2]: ['2iv', ARR, 2],
  [GL.BOOL_VEC3]: ['3iv', ARR, 3],
  [GL.BOOL_VEC4]: ['3iv', ARR, 4],
  [GL.FLOAT_MAT2]: ['Matrix2fv', F32, 4],
  [GL.FLOAT_MAT3]: ['Matrix3fv', F32, 9],
  [GL.FLOAT_MAT4]: ['Matrix4fv', F32, 16],
  [GL.SAMPLER_2D]: ['1i', I32, 1],
  /* 
    Missing the following uniform types:
    GL.INT_SAMPLER_2D
    GL.INT_SAMPLER_3D
    GL.INT_SAMPLER_CUBE
    GL.INT_SAMPLER_2D_ARRAY
    GL.UNSIGNED_INT
    GL.UNSIGNED_INT_VEC2
    GL.UNSIGNED_INT_VEC3
    GL.UNSIGNED_INT_VEC4
    GL.UNSIGNED_INT_SAMPLER_CUBE
    GL.UNSIGNED_INT_SAMPLER_2D
    GL.UNSIGNED_INT_SAMPLER_2D_ARRAY
    GL.UNSIGNED_INT_SAMPLER_3D
    GL.SAMPLER_2D_SHADOW
    GL.SAMPLER_2D_ARRAY_SHADOW
    GL.SAMPLER_2D_ARRAY
    GL.SAMPLER_CUBE
    GL.SAMPLER_CUBE_SHADOW
    GL.FLOAT_MAT2x3
    GL.FLOAT_MAT2x4
    GL.FLOAT_MAT3x2
    GL.FLOAT_MAT3x4
    GL.FLOAT_MAT4x2
    GL.FLOAT_MAT4x3    
  */
};

export function getUniformComponentCount(type) {  
  switch(type) {
    case GL.INT_VEC2:
    case GL.FLOAT_VEC2:
    case GL.BOOL_VEC2:
      return 2;
    
    case GL.INT_VEC3:
    case GL.FLOAT_VEC3:
    case GL.BOOL_VEC3:
      return 3;
    
    case GL.INT_VEC4:
    case GL.FLOAT_VEC4:
    case GL.FLOAT_MAT2:
    case GL.BOOL_VEC4:
      return 4;

    default: return 1;
  }
}

export function setUniformValue(gl, type, location, value) {
  const [loc, val] = [location, value];
  const isArray = value.length > 0;
  switch(type) {
    case GL.BOOL:
    case GL.SAMPLER_2D:
    case GL.SAMPLER_CUBE:
    case GL.INT: return isArray ? gl.uniform1iv(loc, val) : gl.uniform1i(loc, val);
    case GL.BOOL_VEC2:
    case GL.INT_VEC2: return gl.uniform2iv(loc, val);
    case GL.BOOL_VEC3:
    case GL.INT_VEC3: return gl.uniform3iv(loc, val);
    case GL.BOOL_VEC4:
    case GL.INT_VEC4: return gl.uniform4iv(loc, val);
    case GL.FLOAT: return isArray ? gl.uniform1fv(loc, val) : gl.uniform1f(loc, val);
    case GL.FLOAT_VEC2: return gl.uniform2fv(loc, val);
    case GL.FLOAT_VEC3: return gl.uniform3fv(loc, val);
    case GL.FLOAT_VEC4: return gl.uniform4fv(loc, val);
    case GL.FLOAT_MAT2: return gl.uniformMatrix2fv(loc, false, value);
    case GL.FLOAT_MAT3: return gl.uniformMatrix3fv(loc, false, value);
    case GL.FLOAT_MAT4: return gl.uniformMatrix4fv(loc, false, value);

    default:
      console.warn('Unknown uniform type:', type);
  }
}

export function listProgramUniforms(gl, program) {
  const uniforms = [];
  let count = gl.getProgramParameter(program, GL.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const { name, type, size } = gl.getActiveUniform(program, i);
    const location = gl.getUniformLocation(program, name);
    uniforms.push({ name, type, size, location });
  }
  return uniforms;
}

export function listProgramAttributes(gl, program) {
  let count = gl.getProgramParameter(program, GL.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < count; i++) {
    let attribute = gl.getActiveAttrib(program, i);
    console.log(attribute);
  }
}

export function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, GL.COMPILE_STATUS);
  if (!success) {
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    console.warn(error);
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
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    console.warn(error);
  }
  return program;
}

export function createContext({ canvas, version, options }) {
  const ids = ['webgl2', 'webgl', 'experimental-webgl'];
  if (version < 2) ids.shift();
  for (let i = 0; i < ids.length; i++) {
    const gl = canvas.getContext(ids[i], options);
    if (gl) {
      return gl;
    }
  }
}