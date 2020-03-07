import { warn } from "../utils/LogUtils";
import Vec3 from './Vec3';

const { cos: Cos, sin: Sin } = Math;

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

  static Multiply(out, a, b) {

    const [
      a00, a10, a20, a30,
      a01, a11, a21, a31,
      a02, a12, a22, a32,
      a03, a13, a23, a33,
    ] = a;

    const [
      b00, b10, b20, b30,
      b01, b11, b21, b31,
      b02, b12, b22, b32,
      b03, b13, b23, b33,
    ] = b;

		out[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
		out[4] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
		out[8] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
		out[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;

		out[1] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
		out[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
		out[9] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
		out[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;

		out[2] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
		out[6] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
		out[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
		out[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;

		out[3] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
		out[7] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
		out[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
    out[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

    return this;
  }

  static MultiplyScalar(out, scalar) {
    out[0] *= scalar; out[4] *= scalar; out[8] *= scalar; out[12] *= scalar;
		out[1] *= scalar; out[5] *= scalar; out[9] *= scalar; out[13] *= scalar;
		out[2] *= scalar; out[6] *= scalar; out[10] *= scalar; out[14] *= scalar;
    out[3] *= scalar; out[7] *= scalar; out[11] *= scalar; out[15] *= scalar;
    return this;
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
		e[0] = m00; e[4] = m01; e[8] = m02; e[12] = m03;
		e[1] = m10; e[5] = m11; e[9] = m12; e[13] = m13;
		e[2] = m20; e[6] = m21; e[10] = m22; e[14] = m23;
		e[3] = m30; e[7] = m31; e[11] = m32; e[15] = m33;
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

  decompose(position, quaternion, scale) {
    const e = this;
    const sx = _v1.set

  }

  clone() {
    return new Mat4(this);
  }

  copyPosition(m) {
    const e = this;
    e[12] = m[12];
    e[13] = m[13];
    e[14] = m[14];
    return this;
  }

  setPosition(x, y, z) {
    const e = this;
    e[12] = x;
    e[13] = y;
    e[14] = z;
    return this;
  }

  setScale(x, y, z) {
    const e = this;
    e[1] = x;
    e[5] = y;
    e[10] = z;
    return this;
  }

  determinant() {
    const [
      m00, m10, m20, m30,
      m01, m11, m21, m31,
      m02, m12, m22, m32,
      m03, m13, m23, m33,
    ] = this;

    return (
      (m00 * m11 - m01 * m10) * (m22 * m33 - m23 * m32) -
      (m00 * m12 - m02 * m10) * (m21 * m33 - m23 * m31) +
      (m00 * m13 - m03 * m10) * (m21 * m32 - m22 * m31) +
      (m01 * m12 - m02 * m11) * (m20 * m33 - m23 * m30) -
      (m01 * m13 - m03 * m11) * (m20 * m32 - m22 * m30) +
      (m02 * m13 - m03 * m12) * (m20 * m31 - m21 * m30)
    );
  }

  getInverse(m) {
    const [
      m00, m10, m20, m30,
      m01, m11, m21, m31,
      m02, m12, m22, m32,
      m03, m13, m23, m33,
    ] = m;

    const t00 = m00 * m11 - m01 * m10;
    const t01 = m00 * m12 - m02 * m10;
    const t02 = m00 * m13 - m03 * m10;
    const t03 = m01 * m12 - m02 * m11;
    const t04 = m01 * m13 - m03 * m11;
    const t05 = m02 * m13 - m03 * m12;
    const t06 = m20 * m31 - m21 * m30;
    const t07 = m20 * m32 - m22 * m30;
    const t08 = m20 * m33 - m23 * m30;
    const t09 = m21 * m32 - m22 * m31;
    const t10 = m21 * m33 - m23 * m31;
    const t11 = m22 * m33 - m23 * m32;

    const det = t00 * t11 - t01 * t10 + t02 * t09 + t03 * t08 - t04 * t07 + t05 * t06;

    if (det === 0) {
      warn("Can't invert, determinant is 0");
      return this.identity();
    }

    var inv = 1 / det;
    const e = this;

    e[0] = (m11 * t11 - m12 * t10 + m13 * t09) * inv;
    e[1] = (m12 * t08 - m10 * t11 - m13 * t07) * inv;
    e[2] = (m10 * t10 - m11 * t08 + m13 * t06) * inv;
    e[3] = (m11 * t07 - m10 * t09 - m12 * t06) * inv;
    e[4] = (m02 * t10 - m01 * t11 - m03 * t09) * inv;
    e[5] = (m00 * t11 - m02 * t08 + m03 * t07) * inv;
    e[6] = (m01 * t08 - m00 * t10 - m03 * t06) * inv;
    e[7] = (m00 * t09 - m01 * t07 + m02 * t06) * inv;
    e[8] = (m31 * t05 - m32 * t04 + m33 * t03) * inv;
    e[9] = (m32 * t02 - m30 * t05 - m33 * t01) * inv;
    e[10] = (m30 * t04 - m31 * t02 + m33 * t00) * inv;
    e[11] = (m31 * t01 - m30 * t03 - m32 * t00) * inv;
    e[12] = (m22 * t04 - m21 * t05 - m23 * t03) * inv;
    e[13] = (m20 * t05 - m22 * t02 + m23 * t01) * inv;
    e[14] = (m21 * t02 - m20 * t04 - m23 * t00) * inv;
    e[15] = (m20 * t03 - m21 * t01 + m22 * t00) * inv;

    return this;
  }

  scale(v) {
    const { x, y, z } = v;
    const e = this;
    e[0] *= x; e[4] *= y; e[8] *= z;
    e[1] *= x; e[5] *= y; e[9] *= z;
    e[2] *= x; e[6] *= y; e[10] *= z;
    e[3] *= x; e[7] *= y; e[11] *= z;

    return this;
  }

  makeRotationX(rad) {
    const s = Sin(rad);
    const c = Cos(rad);
    return this.set(
      1, 0, 0, 0,
      0, c,-s, 0,
      0, s, c, 0,
      0, 0, 0, 1,
    );
  }

  makeRotationY(rad) {
    const s = Sin(rad);
    const c = Cos(rad);
    return this.set(
      c, 0, s, 0,
      0, 1, 0, 0,
      -s, 0, c, 0,
      0, 0, 0, 1,
    );
  }

  makeRotationZ(rad) {
    const s = Sin(rad);
    const c = Cos(rad);
    return this.set(
      c,-s, 0, 0,
      s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
  }

  ortho() {}
  perspective() {}
  translate() {}
  fromQuaternion(q) {}
  fromRotation(rad, axis) {}


  // fromScaling in gl-matrix
  makeScale(x, y, z) {
    this.copy(Identity);
    this.setScale(x, y, z);
    return this;
  }

  // fromTranslation in gl-matrix
  makeTranslation(x, y, z) {
    this.copy(Identity);
    this.setPosition(x, y, z);
    return this;
  }

  makeRotation(axis, rad) {
    const { x, y, z } = axis;
    const c = Cos(rad);
    const s = Sin(rad);
    const t = 1 - cos;
    const tx = t * x;
    const ty = t * y;

    this.set(
      tx * x + c, tx * y - s * z, tx * z + s * y, 0,
      tx * y + s * z, ty * y + c, ty * z - s * x, 0,
      tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1
    );
  }

  multiply(m) {
    return Mat4.Multiply(this, this, m);
  }

  lookAt(eye, target, up) {}
}