import vertexSource from './shaders/vertex-shader.glsl';
import fragmentSource from './shaders/fragment-shader.glsl';
import imageURL from './images/bg_512x512.png';
import { DrawCall, Renderer, Shader, Geometry, ImageLoader, Texture } from '../src/index';

const renderer = new Renderer('js-canvas');
const drawCall = new DrawCall(renderer);
const shader = new Shader(renderer.gl, { vertexSource, fragmentSource });
const geometry = new Geometry(renderer.gl);
geometry.setAttribute('position', { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) });
geometry.setAttribute('uv', { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) });
window.addEventListener('resize', resize.bind);

const image = new ImageLoader(imageURL);
const texture = new Texture(renderer.gl, {
  image,
});

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