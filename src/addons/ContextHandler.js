const GL_LOST_EVENT = 'webglcontextlost';
const GL_RESTORE_EVENT = 'webglcontextrestored';

/*
  https://www.khronos.org/webgl/wiki/HandlingContextLost
  https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context/restoreContext
  https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context/loseContext
*/

export default class ContextHandler {

  static GetKey() {
    return 'ContextHandler';
  }

  constructor() {
    this.renderer = null;
    this.contextLost = false;
    this.binded = false;
    this.onContextLost = this.onContextLost.bind(this);
    this.onContextRestored = this.onContextRestored.bind(this);
  }

  bind(renderer) {
    this.bound = true;
    this.renderer = renderer;
    const { canvas } = renderer;
    canvas.addEventListener(GL_LOST_EVENT, this.onContextLost, false);
    canvas.addEventListener(GL_RESTORE_EVENT, this.onContextRestored, false);
  }

  unbind() {
    const { bound, renderer } = this;
    if (!bound) return;
    const { canvas } = renderer;
    canvas.removeEventListener(this.onContextLost);
    canvas.removeEventListener(this.onContextRestored);
  }

  onContextLost(event) {
    event.preventDefault();
    if (!this.bound) return;
    this.contextLost = true;
    this.renderer.events.emit(GL_LOST_EVENT);
  }

  onContextRestored(event) {
    event.preventDefault();
    if (!this.bound) return;
    this.contextLost = false;
    this.renderer.events.emit(GL_RESTORE_EVENT);
  }

  forceContextLoss() {
    const { extension, bound } = this;
    if (bound && extension) {
      extension.loseContext();
    }
  }

  forceContextRestore() {
    const { extension, bound } = this;
    if (bound && extension) {
      extension.restoreContext();
    }
  }

  get extension() {
    return this.renderer.capabilities.extensions.webglLoseContext;
  }
}