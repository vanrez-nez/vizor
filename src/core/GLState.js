import * as GL from '../const/GL';

export default class GLState {
  constructor(gl) {
    this.gl = gl;
    this.program = -1;
    this.viewport = { x: 0, y: 0, w: 0, h: 0 };
    this.activeBuffer = -1;
  }

  useProgram(program) {
    const { gl } = this;
    if (this.program != program) {
      gl.useProgram(program);
      this.program = program;
    }
  }

  setViewport(x, y, w, h) {
    const { gl, viewport: v } = this;
    if ( x != v.x || y != v.y || v.w != w || v.h != h) {
      v.x = x;
      v.y = y;
      v.w = w;
      v.h = h;
      gl.viewport(x, y, w, h);
    }
  }

  bindBuffer(target, buffer) {
    const { gl, activeBuffer } = this;
    if (activeBuffer !== buffer) {
      gl.bindBuffer(target, buffer);
      this.activeBuffer = buffer;
      return true;
    }
    return false;
  }

  bufferData(target, data, usage) {
    const { gl, activeBuffer } = this;
    if (activeBuffer) {
      gl.bufferData(target, data, usage);
    }
  }
}