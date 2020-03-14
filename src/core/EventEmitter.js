export default class EventEmitter {
  constructor() {
    this.paused = true;
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  on(type, handler) {
    this.types = this.types || new Map();
    if (!this.types.has(type)) {
      this.types.set(type, new Set());
    }
    this.types.get(type).add(handler);
  }

  off(type, handler) {
    const handlers = this.types.get(type);
    handlers.delete(handler);
  }

  emit(type, event) {
    if (this.paused) return false;
    const handlers = this.types.get(type);
    for (let handler of handlers) {
      handler(event);
    }
  }
}