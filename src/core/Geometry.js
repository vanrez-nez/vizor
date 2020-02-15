import * as GL from '../const/GL';
import { TypedArrToGLType } from '../utils/ArrayUtils';
import VertexBufferAttribute from './VertexBufferAttribute';

export default class Geometry {
  constructor(gl) {
    this.gl = gl;
    this.vertices = [];
    this.faces = [];
    this.drawRange = { first: 0, count: 0 };
    this.bufferAttributes = [];
  }

  setAttribute(name, { data, size, normalized, stride, offset }) {
    const { drawRange, bufferAttributes, gl } = this;
    if (!bufferAttributes[name]) {
      const buff = new VertexBufferAttribute(gl, {
        type: TypedArrToGLType(data),
        usage: GL.STATIC_DRAW,
        size,
        normalized,
        stride,
        offset,
      });
      buff.setData(data);
      drawRange.count = data.length / size;
      bufferAttributes[name] = buff;
    }
  }
}