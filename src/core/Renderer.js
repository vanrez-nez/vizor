import * as GL from '../const/GL';
import GLState from './GLState';
import GLCapabilities from './GLCapabilities';
import { createContext } from '../utils/ContextUtils';

// TODO: Define Shader Precision Format gl.getShaderPrecisionFormat

const DEFAULT_OPTIONS = {
  antialias: false,
  stencil: true,
  depth: true,
  alpha: false,
  powerPreference: 'default',
  premultipliedAlpha: true,
};

export default class Renderer {
  constructor({
    canvas,
    contextType = 'webgl',
    options = DEFAULT_OPTIONS,
  }) {
    this.canvas = canvas;
    this.options = options;
    this.contextType = contextType;
    this.dpr = 1;
    this.initContext();
  }

  initContext() {
    const { canvas, contextType } = this;
    const options = { ...DEFAULT_OPTIONS, ...this.options };
    const gl = createContext({ canvas, contextType, options });
    this.state = new GLState(gl);
    this.capabilities = new GLCapabilities(gl);
    gl.state = this.state;
    gl.capabilities = this.capabilities;
    this.gl = gl;
  }

  resize(width, height, updateStyle = false) {
    const { dpr, gl } = this;
    const { canvas } = gl;
    const [w, h] = [width * dpr, height * dpr];
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.state.setViewport(0, 0, w, h);
      if (updateStyle) {
        Object.assign(canvas.style, {
          width: `${width}px`,
          height: `${height}px`
        });
      }
    }
  }

  clear() {
    const { gl } = this;
    gl.state.setClearColor(0, 1, 0, 1);
    // Needs to clear with other flags via selection
    gl.clear(GL.COLOR_BUFFER_BIT);
  }

  render(scene, camera) {
    const { gl } = this;

  }
}