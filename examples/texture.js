import vertexSource from './shaders/texture-vert.glsl';
import fragmentSource from './shaders/texture-frag.glsl';
import imageURL from './images/bg_512x512.png';
import { DrawCall, Renderer, Shader, Geometry, Texture } from '../src/index';
const renderer = new Renderer('js-canvas');
const drawCall = new DrawCall(renderer);
const { gl } = renderer;
const shader = new Shader(gl, { vertexSource, fragmentSource });
const geometry = new Geometry(gl);
geometry.setAttribute('position', { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) });
geometry.setAttribute('uv', { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) });
window.addEventListener('resize', resize.bind);

const texture = new Texture(gl, {});
texture.loadImage(imageURL);

function resize() {
  const { innerWidth, innerHeight } = window;
  renderer.resize(innerWidth, innerHeight, true);
}

function render() {
  drawCall.draw(geometry, shader);
  //window.requestAnimationFrame(this.render.bind(this));
}

resize();
render();