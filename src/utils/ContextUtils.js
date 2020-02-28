import { warn } from './LogUtils';

export function createContext({ canvas, contextType, options }) {
  const ids = ['webgl2', 'webgl', 'experimental-webgl'];
  const start = ids.indexOf(contextType);
  for (let i = start; i < ids.length; i++) {
    const gl = canvas.getContext(ids[i], options);
    if (gl) {
      return gl;
    }
  }
}
