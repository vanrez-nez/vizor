import * as GL from '../const/GL';
import GLState from './GLState';

export default class VertexBuffer {
  constructor(gl, {
    usage,
    size,
    normalized = false,
    stride = 0,
    offset = 0,
  }) {
    this.gl = gl;
    this.state = GLState.Get(gl);
    this.usage = usage;
    this.size = size;
    this.normalized = normalized;
    this.stride = stride;
    this.offset = offset;
    this.target = GL.ARRAY_BUFFER;
    this.glBuffer = gl.createBuffer();
    this.data = null;
    this.needsUpdate = false;
    this.initialized = false;
  }

  remove() {
    const { gl } = this;
    gl.deleteBuffer(this.glBuffer);
    this.glBuffer = -1;
  }

  update() {
    const { target, glBuffer, data, usage, state } = this;
    if (this.needsUpdate) {
      state.bindBuffer(target, glBuffer);
      state.bufferData(target, data, usage);
      state.bindBuffer(target, null);
      this.needsUpdate = false;
    }
  }

  bind() {
    const { state, target, glBuffer } = this;
    state.bindBuffer(target, glBuffer);
  }

  bindAttribute(attr) {
    if (!this.initialized) {
      this.initialized = true;
      this.bind();
      attr.bind(this);
    }
  }

  setData(data) {
    // validate for typed Array?
    this.data = data;
    this.needsUpdate = true;
  }

}