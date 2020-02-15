import vertexSource from './shaders/vertex-shader.glsl';
import fragmentSource from './shaders/fragment-shader.glsl';
import { DrawCall, Renderer, Shader, Mesh, Geometry } from '../src/index';

class Test {
  constructor() {
    this.renderer = new Renderer('js-canvas');
    const { gl } = this.renderer;
    this.shader = new Shader(gl, { vertexSource, fragmentSource });
    this.geometry = new Geometry(gl);
    this.geometry.setAttribute('position', { size: 2, data: new Float32Array([ -1, -1, 3, -1, -1, 3]) });
    this.geometry.setAttribute('uv', { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) });
    // this.shader.uniforms.u_color.value = [1, 1, 0];
    this.drawCall = new DrawCall(this.renderer);
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
    this.render();
  }

  resize() {
    const { innerWidth, innerHeight } = window;
    this.renderer.resize(innerWidth, innerHeight, true);
  }

  render() {
    const { drawCall, geometry, shader } = this;
    drawCall.draw(geometry, shader);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Test();