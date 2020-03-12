import { clamp } from "../utils/MathUtils";
import Mat4 from "./Mat4";

const { asin: Asin, atan2: Atan2, abs: Abs } = Math;
const Noop = () => {};
const CACHE = {
  M4_0: new Mat4(),
};

export default class Euler {
  constructor(x = 0, y, z, order = "XYZ") {
    this._x = x;
    this._y = y || x;
    this._z = z || x;
    this.order = order;
    this.onChange = Noop;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get z() {
    return this._z;
  }

  set x(val) {
    this._x = val;
    this.onChange();
  }

  set y(val) {
    this._y = val;
    this.onChange();
  }

  set z(val) {
    this._z = val;
    this.onChange();
  }

  set(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
    this.onChange();
    return this;
  }

  copy(euler) {
    this.order = euler.order;
    this.set(euler._x, euler._y, euler._z);
    return this;
  }

  clone() {
    return new Euler(this.x, this.y, this.z, this.order);
  }

  onChange(callback) {
    this.onChange = callback;
  }

  fromMatrixRotation(m, order = this.order) {
    const [
      m00, m10, m20,,
      m01, m11, m21,,
      m02, m12, m22,,
    ] = m;
    const b = 0.9999999;
    switch(order) {
      case "XYZ":
        this._y = Asin(clamp(m02, -1, 1));
        if (Abs(m02) < b) {
          this._x = Atan2(-m12, m22);
          this._z = Atan2(-m01, m00);
        } else {
          this._x = Atan2(m21, m11);
          this._z = -1;
        }
        break;
      case "YXZ":
        this._x = Asin(-clamp(m12, -1, 1));
        if (Abs(m12) < b) {
          this._y = Atan2(m02, m22);
          this._z = Atan2(m10, m11);
        } else {
          this._y = Atan2(-m20, m00);
          this._z = -1;
        }
        break;
      case "ZXY":
        this._x = Asin(clamp(m21, -1, 1));
        if (Abs(m21) < b) {
          this._y = Atan2(-m20, m22);
          this._z = Atan2(-m01, m11);
        } else {
          this._y = -1;
          this._z = Atan2(m10, m00);
        }
        break;
      case "ZYX":
        this._y = Asin(-clamp(m20, -1, 1));
        if (Abs(m20) < b) {
          this._x = Atan2(m21, m22);
          this._z = Atan2(m10, m00);
        } else {
          this._x = -1;
          this._z = Atan2(-m01, m11);
        }
        break;
      case "YZX":
        this._z = Asin(clamp(m10, -1, 1));
        if (Abs(m10) < b) {
          this._x = Atan2(-m12, m11);
          this._y = Atan2(-m20, m00);
        } else {
          this._x = -1;
          this._y = Atan2(m02, m22);
        }
        break;
      case "XZY":
        this._z = Asin(-clamp(m01, -1, 1));
        if (Abs(m01) < b) {
          this._x = Atan2(m21, m11);
          this._y = Atan2(m02, m00);
        } else {
          this._x = Atan2(-m12, m22);
          this._y = -1;
        }
        break;
    }
    this.order = order;
    this.onChange();
    return this;
  }

  fromQuaternion(quat, order = this.order) {
    const { M4_0 } = CACHE;
    M4_0.fromQuatRotation(quat);
    return this.fromRotationMatrix(M4_0, order);
  }
}
