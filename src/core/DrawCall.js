import * as GL from '../const/GL';

export default class DrawCall {
  constructor(renderer) {
    this.renderer = renderer;
  }

  draw(geometry, shader) {
    const { renderer } = this;
    const { first, count } = geometry.drawRange;
    const { gl, state } = renderer;
    renderer.clear();
    shader.use(state);
    for (const name in shader.attributes) {
      const attr = shader.attributes[name];
      const buff = geometry.bufferAttributes[name];
      if (buff) {
        buff.update(state);
        buff.bind(state, attr);
      }
    }
    gl.drawArrays(GL.TRIANGLES, first, count);
  }
}