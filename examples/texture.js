import vertexSource from './shaders/texture-vert.glsl';
import fragmentSource from './shaders/texture-frag.glsl';
import imageURL from './images/bg_512x512.jpg';
import { DrawCall, Renderer, Shader, Geometry, Texture2D, ContextHandler } from '../src/index';

const contextHandler = new ContextHandler();
const renderer = new Renderer({
  canvas: document.getElementById('js-canvas'),
  // contextType: 'webgl2',
  contextHandler,
  options: {
    antialias: true,
  }
});

renderer.events.on('webglcontextrestored', () => {
  console.log('glRestored');
});

renderer.events.on('webglcontextlost', () => {
  console.log('glLost');
});

contextHandler.forceContextLoss();

console.log(renderer);
const drawCall = new DrawCall(renderer);
const { gl } = renderer;

const uniforms = {
  u_texture: new Texture2D(gl, {}),
  u_time: 0,
};

uniforms.u_texture.loadImage(imageURL);
const shader = new Shader(gl, { vertexSource, fragmentSource, uniforms });
const geometry = new Geometry(gl);
// https://rauwendaal.net/2014/06/14/rendering-a-screen-covering-triangle-in-opengl/
geometry.setAttribute('position', { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) });
geometry.setAttribute('uv', { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) });
window.addEventListener('resize', resize);

function resize() {
  const { innerWidth, innerHeight } = window;
  renderer.resize(innerWidth, innerHeight, true);
}

function render() {
  uniforms.u_time += 0.1;
  drawCall.draw(geometry, shader);
  window.requestAnimationFrame(render);
}

resize();
render();