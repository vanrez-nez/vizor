import * as GL from '../const/GL';

export default class Attribute {
  constructor(gl, { name, location }) {
    this.gl = gl;
    this.name = name;
    this.location = location;
  }

  bind({ size, normalized, stride, offset }) {
    const { gl, location } = this;
    gl.vertexAttribPointer(location, size, GL.FLOAT, normalized, stride, offset);
    gl.enableVertexAttribArray(location);
  }
}