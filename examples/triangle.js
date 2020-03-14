import vertexSource from './shaders/triangle-vert.glsl';
import fragmentSource from './shaders/triangle-frag.glsl';
import { DrawCall, Renderer, Shader, Geometry, Vec3 } from '../src/index';

class Test {
  constructor() {
    this.renderer = new Renderer({
      canvas: document.getElementById('js-canvas'),
      contextType: 'webgl',
    });
    const { gl } = this.renderer;
    const uniforms = {
      u_vec3a: [
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
      u_fa: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
    this.shader = new Shader(gl, { vertexSource, fragmentSource, uniforms });
    // this.shader.uniforms.u_vec3a.value[2] = [0.5, 0.5, 1.0];
    this.geometry = new Geometry(gl);
    this.geometry.setAttribute('position', { size: 2, data: new Float32Array([ -1, -1, 3, -1, -1, 3]) });
    this.geometry.setAttribute('uv', { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) });
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