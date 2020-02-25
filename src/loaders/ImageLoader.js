
export default class ImageLoader {
  constructor(src) {
    this.loading = false;
    this.loaded = false;
    this.image = new Image();
    this.src = src;
  }

  load() {
    const { image, src } = this;
    const promise = new Promise(resolve => {
      if (this.loaded) {
        resolve(image);
      } else {
        this.loading = true;
        image.onload = () => {
          this.loading = false;
          this.loaded = true;
          resolve(image);
        }
      }
    });
    image.src = src;
    return promise;
  }
}
