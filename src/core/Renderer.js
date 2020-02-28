import * as GL from '../const/GL';
import GLState from './GLState';
import GLCapabilities from './GLCapabilities';
import { createContext } from '../utils/ContextUtils';

export default class Renderer {
  constructor(id) {
    const gl = createContext({
      canvas: document.getElementById(id),
      version: 1,
      options: {},
    });

    gl.state = new GLState(gl);
    gl.capabilities = new GLCapabilities(gl);
    this.gl = gl;
    this.dpr = 1;
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