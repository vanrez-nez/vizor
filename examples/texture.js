import vertexSource from './shaders/texture-vert.glsl';
import fragmentSource from './shaders/texture-frag.glsl';
import imageURL from './images/bg_512x512.png';
import { DrawCall, Renderer, Shader, Geometry, Texture2D } from '../src/index';
const renderer = new Renderer('js-canvas');
const drawCall = new DrawCall(renderer);
const { gl } = renderer;

const uniforms = {
  u_texture: new Texture2D(gl, {}),
};
uniforms.u_texture.loadImage(imageURL);
const shader = new Shader(gl, { vertexSource, fragmentSource, uniforms });
const geometry = new Geometry(gl);
geometry.setAttribute('position', { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) });
geometry.setAttribute('uv', { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) });
window.addEventListener('resize', resize.bind);

function resize() {
  const { innerWidth, innerHeight } = window;
  renderer.resize(innerWidth, innerHeight, true);
}

let frames = 0;
function render() {
  drawCall.draw(geometry, shader);
  if (frames++ < 10) {
    window.requestAnimationFrame(render.bind());
  }
}

resize();
render();