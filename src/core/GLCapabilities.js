function toCamelCase(str) {
  return str.toLowerCase(str).replace(/(_.)/g, (match, chr) => {
    return chr[1].toUpperCase();
  });
}

function getLimits(gl) {
  const cache = {};
  const props = {};
  for (let key in gl) {
    if (/^MAX_/.test(key)) {
      const name = toCamelCase(key);
      props[name] = {
        get() {
          if (!cache[key]) {
            cache[key] = gl.getParameter(gl[key]);
          }
          return cache[key];
        }
      };
    }
  }
  return Object.defineProperties({}, props);
}

function getExtensions(gl) {
  const cache = {};
  const props = {};
  const arr = gl.getSupportedExtensions();
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    const name = toCamelCase(key);
    props[name] = {
      get() {
        if (!cache[name]) {
          cache[name] = gl.getExtension(key);
        }
        return cache[name];
      }
    };
  }
  return Object.defineProperties({}, props);
}

function getMaxAnisotropy(gl, extensions) {
    const ext = extensions.extTextureFilterAnisotropic;
    return ext ? gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
}

const Instances = new WeakMap();
export default class GLCapabilities {
  constructor(gl) {
    this.webgl2 = WebGL2RenderingContext != undefined && gl instanceof WebGL2RenderingContext;
    const extensions = getExtensions(gl);
    const limits = getLimits(gl);
    limits.maxAnisotropy = getMaxAnisotropy(gl, extensions);
    this.extensions = extensions;
    this.limits = limits;
  }

  static Get(gl) {
    if (!Instances.has(gl)) {
      Instances.set(gl, new GLCapabilities(gl));
    }
    return Instances.get(gl);
  }
}