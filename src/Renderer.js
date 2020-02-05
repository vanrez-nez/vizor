import * as GL from './const/GL';
import GLState from './GLState';
import { createContext } from './webgl-utils';


export default class Renderer {
  constructor(id) {
    this.gl = createContext({
      canvas: document.getElementById(id),
      version: 1,
      options: {},
    });
    this.state = new GLState();
    this.dpr = 1; // Device Pixel Ratio
  }
  
  resize(width, height, updateStyle = false) {
    const { dpr, gl } = this;
    const { canvas } = gl;
    const [w, h] = [width * dpr, height * dpr];
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      if (updateStyle) {
        Object.assign(canvas.style, {
          width: `${w}px`,
          height: `${h}px`
        });
      }
    }
  }

  clear() {
    const { gl } = this;
    gl.clearColor(0, 0, 0, 1);
    // Needs to clear with other flags via selection
    gl.clear(GL.COLOR_BUFFER_BIT);
  }

  render(scene, camera) {
    const { gl } = this;
    
  }
}