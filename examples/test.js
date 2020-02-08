import vertexSource from './shaders/vertex-shader.glsl';
import fragmentSource from './shaders/fragment-shader.glsl';
import { Renderer, Shader } from '../src/index';

class Test {
  constructor() {
    this.renderer = new Renderer('js-canvas');
    this.renderer.resize(500, 500, true);
    this.shader = new Shader(this.renderer.gl, {vertexSource, fragmentSource});
    this.render();
  }

  render() {
    const { renderer } = this;
    renderer.clear();
    renderer.render();
  }
}

new Test();