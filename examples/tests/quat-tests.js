import { Euler, Mat3, Mat4, Vec2, Vec3, Vec4, Quat } from "../../src/index";
const x = 2;
const y = 3;
const z = 4;
const w = 5;
const orders = ["XYZ", "YXZ", "ZXY", "ZYX", "YZX", "XZY"];
const eulerAngles = new Euler(0.1, -0.3, 0.25);
const eps = 0.0001;

function qSub(a, b) {
  var result = new Quat();
  result.copy(a);
  result.x -= b.x;
  result.y -= b.y;
  result.z -= b.z;
  result.w -= b.w;
  return result;
}

function doSlerpObject(aArr, bArr, t) {
  var a = new Quat().set(...aArr),
    b = new Quat().set(...bArr),
    c = new Quat().set(...aArr);
  c.slerp(b, t);

  return {
    equals: function(x, y, z, w, maxError) {
      if (maxError === undefined) maxError = Number.EPSILON;

      return (
        Math.abs(x - c.x) <= maxError &&
        Math.abs(y - c.y) <= maxError &&
        Math.abs(z - c.z) <= maxError &&
        Math.abs(w - c.w) <= maxError
      );
    },

    length: c.length(),

    dotA: c.dot(a),
    dotB: c.dot(b)
  };
}

function changeEulerOrder( euler, order ) {
	return new Euler( euler.x, euler.y, euler.z, order );
}

function QuatAngleTo() {
  var a = new Quat();
  var b = new Quat().fromEulerRotation( new Euler( 0, Math.PI, 0 ) );
  var c = new Quat().fromEulerRotation( new Euler( 0, Math.PI * 2, 0 ) );

  console.assert( a.angleTo( a ) === 0, "Passed!" );
  console.assert( a.angleTo( b ) === Math.PI, "Passed!" );
  console.assert( a.angleTo( c ) === 0, "Passed!" );
}

function QuatFromAxisAngle() {

  var zero = new Quat();

  var a = new Quat().fromAxisAngle( new Vec3( 1, 0, 0 ), 0 );
  console.assert( a.equals( zero ), "Passed!" );
  a = new Quat().fromAxisAngle( new Vec3( 0, 1, 0 ), 0 );
  console.assert( a.equals( zero ), "Passed!" );
  a = new Quat().fromAxisAngle( new Vec3( 0, 0, 1 ), 0 );
  console.assert( a.equals( zero ), "Passed!" );

  var b1 = new Quat().fromAxisAngle( new Vec3( 1, 0, 0 ), Math.PI );
  console.assert( ! a.equals( b1 ), "Passed!" );
  var b2 = new Quat().fromAxisAngle( new Vec3( 1, 0, 0 ), - Math.PI );
  console.assert( ! a.equals( b2 ), "Passed!" );

  b1.multiply( b2 );
  console.assert( a.equals( b1 ), "Passed!" );
}

function QuatSlerp() {
  var a = new Quat(x, y, z, w);
  var b = new Quat(-x, -y, -z, -w);
  var c = a.clone().slerpTo(b, 0);
  var d = a.clone().slerpTo(b, 1);
  console.assert(a.equals(c), "Passed");
  console.assert(b.equals(d), "Passed");

  var D = Math.SQRT1_2;

  var e = new Quat(1, 0, 0, 0);
  var f = new Quat(0, 0, 1, 0);
  var expected = new Quat(D, 0, D, 0);
  var result = e.clone().slerpTo(f, 0.5);
  console.assert(Math.abs(result.x - expected.x) <= eps, "Check x");
  console.assert(Math.abs(result.y - expected.y) <= eps, "Check y");
  console.assert(Math.abs(result.z - expected.z) <= eps, "Check z");
  console.assert(Math.abs(result.w - expected.w) <= eps, "Check w");

  var g = new Quat(0, D, 0, D);
  var h = new Quat(0, -D, 0, D);
  expected = new Quat(0, 0, 0, 1);
  result = g.clone().slerpTo(h, 0.5);

  console.assert(Math.abs(result.x - expected.x) <= eps, "Check x");
  console.assert(Math.abs(result.y - expected.y) <= eps, "Check y");
  console.assert(Math.abs(result.z - expected.z) <= eps, "Check z");
  console.assert(Math.abs(result.w - expected.w) <= eps, "Check w");
}

function QuatMultiply() {
  var angles = [new Euler(1, 0, 0), new Euler(0, 1, 0), new Euler(0, 0, 1)];

  var q1 = new Quat().fromEulerRotation(changeEulerOrder(angles[0], "XYZ"));
  var q2 = new Quat().fromEulerRotation(changeEulerOrder(angles[1], "XYZ"));
  var q3 = new Quat().fromEulerRotation(changeEulerOrder(angles[2], "XYZ"));

  var q = new Quat().multiply(q1, q2).multiply(q3);

  var m1 = new Mat4().fromEulerRotation(changeEulerOrder(angles[0], "XYZ"));
  var m2 = new Mat4().fromEulerRotation(changeEulerOrder(angles[1], "XYZ"));
  var m3 = new Mat4().fromEulerRotation(changeEulerOrder(angles[2], "XYZ"));

  var m = new Mat4().multiply(m1, m2).multiply(m3);

  var qFromM = new Quat().fromMatrixRotation(m);
  console.assert(qSub(q, qFromM).length() < 0.001, "Passed!");

  var a = new Quat();
  var q = new Quat( - 9, - 2, 3, - 4 ).normalize();
  var m = new Mat4().fromQuatRotation( q );
  var expected = new Vec4( 0.8581163303210332, 0.19069251784911848, - 0.2860387767736777, 0.38138503569823695 );

  a.fromMatrixRotation( m );
  console.assert( Math.abs( a.x - expected.x ) <= eps, "m11 > m22 && m11 > m33: check x" );
  console.assert( Math.abs( a.y - expected.y ) <= eps, "m11 > m22 && m11 > m33: check y" );
  console.assert( Math.abs( a.z - expected.z ) <= eps, "m11 > m22 && m11 > m33: check z" );
  console.assert( Math.abs( a.w - expected.w ) <= eps, "m11 > m22 && m11 > m33: check w" );

  var q = new Quat( - 1, - 2, 1, - 1 ).normalize();
  m.fromQuatRotation( q );
  var expected = new Vec4( 0.37796447300922714, 0.7559289460184544, - 0.37796447300922714, 0.37796447300922714 );

  a.fromMatrixRotation( m );
  console.assert( Math.abs( a.x - expected.x ) <= eps, "m22 > m33: check x" );
  console.assert( Math.abs( a.y - expected.y ) <= eps, "m22 > m33: check y" );
  console.assert( Math.abs( a.z - expected.z ) <= eps, "m22 > m33: check z" );
  console.assert( Math.abs( a.w - expected.w ) <= eps, "m22 > m33: check w" );
}

function QuatNormalLengthSq() {
  var a = new Quat(x, y, z, w);

  console.assert(a.length() != 1, "Passed!");
  console.assert(a.lengthSqrt() != 1, "Passed!");
  a.normalize();
  console.assert(a.length() == 1, "Passed!");
  console.assert(a.lengthSqrt() == 1, "Passed!");

  a.set(0, 0, 0, 0);
  console.assert(a.lengthSqrt() == 0, "Passed!");
  console.assert(a.length() == 0, "Passed!");
  a.normalize();
  console.assert(a.lengthSqrt() == 1, "Passed!");
  console.assert(a.length() == 1, "Passed!");
}

function QuatDot() {
  var a = new Quat();
  var b = new Quat();

  console.assert(a.dot(b) === 1, "Passed!");
  a = new Quat(1, 2, 3, 1);
  b = new Quat(3, 2, 1, 1);

  console.assert(a.dot(b) === 11, "Passed!");
}

function QuatInverseConjugate() {
  var a = new Quat(x, y, z, w);
  var b = a.clone().conjugate();

  console.assert(a.x == -b.x, "Passed!");
  console.assert(a.y == -b.y, "Passed!");
  console.assert(a.z == -b.z, "Passed!");
  console.assert(a.w == b.w, "Passed!");
}

function QuatEquals() {
  var a = new Quat( x, y, z, w );
  var b = new Quat( - x, - y, - z, - w );

  console.assert( a.x != b.x, "Passed!" );
  console.assert( a.y != b.y, "Passed!" );

  console.assert( ! a.equals( b ), "Passed!" );
  console.assert( ! b.equals( a ), "Passed!" );

  a.copy( b );
  console.assert( a.x == b.x, "Passed!" );
  console.assert( a.y == b.y, "Passed!" );

  console.assert( a.equals( b ), "Passed!" );
  console.assert( b.equals( a ), "Passed!" );
}

QuatFromAxisAngle();
QuatAngleTo();
QuatEquals();
QuatSlerp();
QuatDot();
QuatMultiply();
QuatNormalLengthSq();
QuatInverseConjugate();