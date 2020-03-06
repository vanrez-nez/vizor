
const Identity = Object.freeze([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
]);

const Zero = Object.freeze([
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
]);

export default class Mat4 extends Array {
  constructor(arr = Identity) {
    super(16);
    this.copy(arr);
  }

  copy(m) {
    const e = this;
    e[0] = m[0];
    e[1] = m[1];
    e[2] = m[2];
    e[3] = m[3];
    e[4] = m[4];
    e[5] = m[5];
    e[6] = m[6];
    e[7] = m[7];
    e[8] = m[8];
    e[9] = m[9];
    e[10] = m[10];
    e[11] = m[11];
    e[12] = m[12];
    e[13] = m[13];
    e[14] = m[14];
    e[15] = m[15];
    return this;
  }

  identity() {
    return this.copy(Identity);
  }

  zero() {
    return this.copy(Zero);
  }

  set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    const e = this;
    e[0] = m00; e[4] = m10; e[8] = m20; e[12] = m30;
    e[1] = m01; e[5] = m11; e[9] = m21; e[13] = m31;
    e[2] = m02; e[6] = m12; e[10] = m22; e[14] = m32;
    e[3] = m03; e[7] = m13; e[11] = m23; e[15] = m33;
    return this;
  }

  transpose() {
    const e = this;
    let swap;
    swap = e[1]; e[1] = e[4]; e[4] = swap;
    swap = e[2]; e[2] = e[8]; e[8] = swap;
    swap = e[6]; e[6] = e[9]; e[9] = swap;
    swap = e[3]; e[3] = e[12]; e[12] = swap;
    swap = e[7]; e[7] = e[13]; e[13] = swap;
    swap = e[11]; e[11] = e[14]; e[14] = swap;
    return this;
  }


  compose(position, quaternion, scale) {
    const e = this;
    const { x: sx, y: sy, z: sz } = scale;
    const { x, y, z, w } = quaternion;
    const [x2, y2, z2] = [x + x, y + y, z + z];
    const [xx, xy, xz] = [x * x2, x * y2, x * z2];
    const [yy, yz, zz] = [y * y2, y * z2, z * z2];
    const [wx, wy, wz] = [w * x2, w * y2, w * z2];

    e[0] = (1 - (yy + zz)) * sx;
    e[1] = (xy + wz) * sx;
    e[2] = (xz - wy) * sx;
    e[3] = 0;

    e[4] = (xy - wz) * sy;
    e[5] = (1 - (xx + zz)) * sy;
    e[6] = (yz + wx) * sy;
    e[7] = 0;

    e[8] = (xz + wy) * sz;
    e[9] = (yz - wx) * sz;
    e[10] = (1 - (xx + yy)) * sz;
    e[11] = 0;

    e[12] = position.x;
    e[13] = position.y;
    e[14] = position.z;
    e[15] = 1;

    return this;
  }

  setPosition(x, y, z) {}

  ortho() {}
  perspective() {}


  translate() {}
  rotate() {}
  scale() {}
  fromQuaternion(q) {}
  fromRotation(rad, axis) {}
  multiply(m) {}
  lookAt(eye, target, up) {}
  determinant() {}
}