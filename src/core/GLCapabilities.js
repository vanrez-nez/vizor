
function toCamelCase(str) {
  return str.toLowerCase(str).replace(/(_.)/g, (match, chr) => {
    return chr[1].toUpperCase();
  });
}

export default class GLCapabilities {
  constructor(gl) {
    this.webgl2 = gl instanceof WebGL2RenderingContext;
    this.defineMaxProperties(gl);
  }

  defineMaxProperties(gl) {
    const props = {};
    const cache = {};
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
    Object.defineProperties(this, props);
  }
}