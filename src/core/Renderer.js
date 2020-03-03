import * as GL from '../const/GL';
import GLState from './GLState';
import GLCapabilities from './GLCapabilities';
import EventEmitter from './EventEmitter';
import { createContext } from '../utils/ContextUtils';
import Addons from './Addons';

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
    this.events = new EventEmitter();
    this.canvas = canvas;
    this.options = options;
    this.contextType = contextType;
    this.contextHandler = Addons.Get('ContextHandler');
    this.dpr = 1;
    this.initContext();
  }

  initContext() {
    const { canvas, contextType, contextHandler } = this;
    const options = { ...DEFAULT_OPTIONS, ...this.options };
    if (contextHandler) {
      contextHandler.bind(this);
    }
    const gl = createContext({ canvas, contextType, options });
    this.capabilities = GLCapabilities.Get(gl);
    this.state = GLState.Get(gl);
    this.gl = gl;
  }

  resize(width, height, updateStyle = false) {
    const { dpr, gl, state } = this;
    const { canvas } = gl;
    const [w, h] = [width * dpr, height * dpr];
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      state.setViewport(0, 0, w, h);
      if (updateStyle) {
        Object.assign(canvas.style, {
          width: `${width}px`,
          height: `${height}px`
        });
      }
    }
  }

  clear() {
    const { gl, state } = this;
    state.setClearColor(0, 1, 0, 1);
    // Needs to clear with other flags via selection
    gl.clear(GL.COLOR_BUFFER_BIT);
  }

  render(scene, camera) {
    const { gl, contextLost } = this;
    if (contextLost) return;
  }

  get contextLost() {
    const { contextHandler: handler } = this;
    return handler && handler.contextLost || false;
  }
}