import * as GL from '../const/GL';

export default class VertexBufferAttribute {
  constructor(gl, {
    usage,
    size,
    normalized = false,
    stride = 0,
    offset = 0,
  }) {
    this.gl = gl;
    this.usage = usage;
    this.size = size;
    this.normalized = normalized;
    this.stride = stride;
    this.offset = offset;
    this.target = GL.ARRAY_BUFFER;
    this.glBuffer = gl.createBuffer();
    this.data = null;
    this.needsUpdate = false;
  }

  remove() {
    const { gl } = this;
    gl.deleteBuffer(this.glBuffer);
    this.glBuffer = -1;
  }

  update() {
    const { target, glBuffer, data, usage } = this;
    const { state } = this.gl;
    if (this.needsUpdate) {
      state.bindBuffer(target, glBuffer);
      state.bufferData(target, data, usage);
      state.bindBuffer(target, null);
      this.needsUpdate = false;
    }
  }

  bind(location) {
    const { gl,target, size, glBuffer, stride, offset, normalized } = this;
    gl.state.bindBuffer(target, glBuffer);
    gl.vertexAttribPointer(location, size, GL.FLOAT, normalized, stride, offset);
    gl.enableVertexAttribArray(location);
  }

  setData(data) {
    // validate for typed Array?
    this.data = data;
    this.needsUpdate = true;
  }

}