import * as GL from '../const/GL';

export default class DrawCall {
  constructor(renderer) {
    this.renderer = renderer;
  }

  draw(geometry, shader) {
    const { renderer } = this;
    const { first, count } = geometry.drawRange;
    const { gl } = renderer;
    renderer.clear();
    shader.use();
    for (const name in shader.attributes) {
      const attr = shader.attributes[name];
      const buff = geometry.bufferAttributes[name];
      buff.bindAttribute(attr);
      if (buff) {
        buff.update();
        buff.bind();
      }
    }
    gl.drawArrays(GL.TRIANGLES, first, count);
  }
}