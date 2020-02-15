import * as GL from '../const/GL';

export function arraysEqual(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function copyArray(from, to) {
  for(let i = 0; i < to.length; i++) {
    to[i] = from[i];
  }
  return to;
}

export function isArray(obj) {
  return Array.isArray(obj) || ArrayBuffer.isView(obj) && !(obj instanceof DataView);
}

export function TypedArrToGLType(arr) {
  switch(arr.constructor) {
    case Float32Array: return GL.FLOAT;
    case Uint16Array: return GL.UNSIGNED_SHORT;
    case Uint32Array: return GL.UNSIGNED_INT;
    case Int32Array: return GL.INT;
    case Int16Array: return GL.SHORT;
    case Int8Array: return GL.BYTE;
  }
}