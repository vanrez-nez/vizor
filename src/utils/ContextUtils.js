import { warn } from './LogUtils';

export function createContext({ canvas, version, options }) {
  const ids = ['webgl2', 'webgl', 'experimental-webgl'];
  if (version < 2) ids.shift();
  for (let i = 0; i < ids.length; i++) {
    const gl = canvas.getContext(ids[i], options);
    if (gl) {
      return gl;
    }
  }
}