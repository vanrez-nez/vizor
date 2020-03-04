export default class Vec2 {
  constructor(x, y) {
    this.set(x, y);
  }

  set(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    return this;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }

  addScalar(scalar) {
    this.x += scalar;
    this.y += scalar;
    return this;
  }

  subScalar(scalar) {
    this.x += scalar;
    this.y -= scalar;
    return this;
  }

  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  divideScalar(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  equals(v) {
    return this.x === v.x && this.y === v.y;
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  clone() {
    return new Vec3(this.x, this.y);
  }
}