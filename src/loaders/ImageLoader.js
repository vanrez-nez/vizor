export default class ImageLoader {
  constructor(src) {
    this.loading = false;
    this.loaded = false;
    this.image = new Image();
    this.src = src;
    this.listeners = [];
    this.load();
  }

  notify() {
    this.listeners.forEach(listener => listener(this.image));
    this.listeners = [];
  }

  onDone(callback) {
    if (this.loaded) {
      callback(this.image);
    } else {
      this.listeners.push(callback);
    }
  }

  load() {
    const { image, src } = this;
    this.loading = true;
    image.onload = () => {
      this.loading = false;
      this.loaded = true;
      this.notify();
    }
    image.src = src;
  }
}
