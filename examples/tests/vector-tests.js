import { Mat3, Mat4, Vec2, Vec3, Vec4 } from '../../src/index';

const x = 2;
const y = 3;
const z = 4;
const w = 5;
const eps = 0.0001;

function TestV4_Add() {
  const a = new Vec4(1, 2, 3, 4);
  const b = new Vec4(-1, -2, -3, -4);
  const zero = new Vec4();
  a.add(b);
  console.assert(a.equals(zero), 'Vec4 equals');

};

function TestV4_Sub() {
  const a = new Vec4(1, 2, 3, 4);
  const b = new Vec4(1, 2, 3, 4);
  const zero = new Vec4();
  a.sub(b);
  console.assert(a.equals(zero), 'TestV4_Sub');
}

function TestV4_Mul() {
  const a = new Vec4(1, 2, 3, 4);
  const b = new Vec4(2, 2, 2, 2);
  a.multiply(b);
  console.assert(a.x === 2, 'TestV4_MulX');
  console.assert(a.y === 4, 'TestV4_MulY');
  console.assert(a.z === 6, 'TestV4_MulZ');
  console.assert(a.w === 8, 'TestV4_MulW');
}


function TestV4_AddScaled() {
  const a = new Vec4(4, 3, 2, 1);
  const b = new Vec4(1, 2, 3, 4);
  const s = 3;
  a.addScaledVector(b, s);
  console.assert(a.x === 4 + b.x * s, 'ScaleX');
  console.assert(a.y === 3 + b.y * s, 'ScaleY');
  console.assert(a.z === 2 + b.z * s, 'ScaleZ');
  console.assert(a.w === 1 + b.w * s, 'ScaleW');
}

function TestV4_Negate() {
  const a = new Vec4(4, 3, 2, 1);
  a.negate();
  console.assert(a.x === -4, 'NegateX');
  console.assert(a.y === -3, 'NegateY');
  console.assert(a.z === -2, 'NegateZ');
  console.assert(a.w === -1, 'NegateW');
}


function TestV4_Dot() {
  const a = new Vec4(4, 3, 2, 1);
  const b = new Vec4(-4, -3, -2, -1);
  const c = new Vec4();
  console.assert(a.dot(b) ===  - 4 * 4 - 3 * 3 - 2 * 2 - 1 * 1, 'DotAB');
  console.assert(a.dot(c) === 0, 'DotAC')
}

function TestV4_ManhattanLen() {
  const a = new Vec4( x, 0, 0, 0 );
  const b = new Vec4( 0, - y, 0, 0 );
  const c = new Vec4( 0, 0, z, 0 );
  const d = new Vec4( 0, 0, 0, w );
  const e = new Vec4( 0, 0, 0, 0 );

  console.assert( a.manhattanLength() == x, "Positive x" );
  console.assert( b.manhattanLength() == y, "Negative y" );
  console.assert( c.manhattanLength() == z, "Positive z" );
  console.assert( d.manhattanLength() == w, "Positive w" );
  console.assert( e.manhattanLength() == 0, "Empty initialization" );

  a.set( x, y, z, w );
  console.assert(
    a.manhattanLength() == Math.abs( x ) + Math.abs( y ) + Math.abs( z ) + Math.abs( w ),
    "All components"
  );
}

function TestV4_Normalize() {
    var a = new Vec4( x, 0, 0, 0 );
    var b = new Vec4( 0, - y, 0, 0 );
    var c = new Vec4( 0, 0, z, 0 );
    var d = new Vec4( 0, 0, 0, - w );
    a.normalize();
    console.assert( a.length() == 1, "Passed!" );
    console.assert( a.x == 1, "Passed!" );

    b.normalize();
    console.assert( b.length() == 1, "Passed!" );
    console.assert( b.y == - 1, "Passed!" );

    c.normalize();
    console.assert( c.length() == 1, "Passed!" );
    console.assert( c.z == 1, "Passed!" );

    d.normalize();
    console.assert( d.length() == 1, "Passed!" );
    console.assert( d.w == - 1, "Passed!" );
}

function TestV2_ApplyM3() {
  const v = new Vec2(2, 3);
  const m = new Mat3().set(2, 3, 5, 7, 11, 13, 17, 19, 23);
  v.applyMatrix3(m);
  console.assert(v.x === 18, 'TestV2_ApplyM3X');
  console.assert(v.y === 60, 'TestV2_ApplyM3Y');
}

function TestV4_AddSubScalar() {
  var a = new Vec4();
  var s = 3;
  a.setScalar( s );
  console.assert( a.x === s, "setScalar: check x" );
  console.assert( a.y === s, "setScalar: check y" );
  console.assert( a.z === s, "setScalar: check z" );
  console.assert( a.w === s, "setScalar: check w" );

  a.addScalar( s );
  console.assert( a.x === 2 * s, "addScalar: check x" );
  console.assert( a.y === 2 * s, "addScalar: check y" );
  console.assert( a.z === 2 * s, "addScalar: check z" );
  console.assert( a.w === 2 * s, "addScalar: check w" );

  a.subScalar( 2 * s );
  console.assert( a.x === 0, "subScalar: check x" );
  console.assert( a.y === 0, "subScalar: check y" );
  console.assert( a.z === 0, "subScalar: check z" );
  console.assert( a.w === 0, "subScalar: check w" );
}

function TestV4_MulDivScalar() {
  var a = new Vec4( x, y, z, w );
	var b = new Vec4( - x, - y, - z, - w );
  a.multiplyScalar( - 2 );
  console.assert( a.x == x * - 2, "Passed!" );
  console.assert( a.y == y * - 2, "Passed!" );
  console.assert( a.z == z * - 2, "Passed!" );
  console.assert( a.w == w * - 2, "Passed!" );

  b.multiplyScalar( - 2 );
  console.assert( b.x == 2 * x, "Passed!" );
  console.assert( b.y == 2 * y, "Passed!" );
  console.assert( b.z == 2 * z, "Passed!" );
  console.assert( b.w == 2 * w, "Passed!" );

  a.divScalar( - 2 );
  console.assert( a.x == x, "Passed!" );
  console.assert( a.y == y, "Passed!" );
  console.assert( a.z == z, "Passed!" );
  console.assert( a.w == w, "Passed!" );

  b.divScalar( - 2 );
  console.assert( b.x == - x, "Passed!" );
  console.assert( b.y == - y, "Passed!" );
  console.assert( b.z == - z, "Passed!" );
  console.assert( b.w == - w, "Passed!" );
}

function TestV4_MinMaxClamp() {
  var a = new Vec4( x, y, z, w );
  var b = new Vec4( - x, - y, - z, - w );
  var c = new Vec4();

  c.copy( a ).min( b );
  console.assert( c.x == - x, "Passed!" );
  console.assert( c.y == - y, "Passed!" );
  console.assert( c.z == - z, "Passed!" );
  console.assert( c.w == - w, "Passed!" );

  c.copy( a ).max( b );
  console.assert( c.x == x, "Passed!" );
  console.assert( c.y == y, "Passed!" );
  console.assert( c.z == z, "Passed!" );
  console.assert( c.w == w, "Passed!" );

  c.set( - 2 * x, 2 * y, - 2 * z, 2 * w );
  c.clamp( b, a );
  console.assert( c.x == - x, "Passed!" );
  console.assert( c.y == y, "Passed!" );
  console.assert( c.z == - z, "Passed!" );
  console.assert( c.w == w, "Passed!" );
}

function TestV4_length() {
  var a = new Vec4( x, 0, 0, 0 );
  var b = new Vec4( 0, - y, 0, 0 );
  var c = new Vec4( 0, 0, z, 0 );
  var d = new Vec4( 0, 0, 0, w );
  var e = new Vec4( 0, 0, 0, 0 );

  console.assert( a.length() == x, "Passed!" );
  console.assert( a.lengthSqrt() == x * x, "Passed!" );
  console.assert( b.length() == y, "Passed!" );
  console.assert( b.lengthSqrt() == y * y, "Passed!" );
  console.assert( c.length() == z, "Passed!" );
  console.assert( c.lengthSqrt() == z * z, "Passed!" );
  console.assert( d.length() == w, "Passed!" );
  console.assert( d.lengthSqrt() == w * w, "Passed!" );
  console.assert( e.length() == 0, "Passed!" );
  console.assert( e.lengthSqrt() == 0, "Passed!" );

  a.set( x, y, z, w );
  console.assert( a.length() == Math.sqrt( x * x + y * y + z * z + w * w ), "Passed!" );
  console.assert( a.lengthSqrt() == ( x * x + y * y + z * z + w * w ), "Passed!" );
}

function TestV4_LerpClone() {
  var a = new Vec4( x, 0, z, 0 );
  var b = new Vec4( 0, - y, 0, - w );

  console.assert( a.lerp( a, 0 ).equals( a.lerp( a, 0.5 ) ), "Passed!" );
  console.assert( a.lerp( a, 0 ).equals( a.lerp( a, 1 ) ), "Passed!" );

  console.assert( a.clone().lerp( b, 0 ).equals( a ), "Passed!" );

  console.assert( a.clone().lerp( b, 0.5 ).x == x * 0.5, "Passed!" );
  console.assert( a.clone().lerp( b, 0.5 ).y == - y * 0.5, "Passed!" );
  console.assert( a.clone().lerp( b, 0.5 ).z == z * 0.5, "Passed!" );
  console.assert( a.clone().lerp( b, 0.5 ).w == - w * 0.5, "Passed!" );

  console.assert( a.clone().lerp( b, 1 ).equals( b ), "Passed!" );
}

function TestV4_Equals() {
  var a = new Vec4( x, 0, z, 0 );
  var b = new Vec4( 0, - y, 0, - w );

  console.assert( a.x != b.x, "Passed!" );
  console.assert( a.y != b.y, "Passed!" );
  console.assert( a.z != b.z, "Passed!" );
  console.assert( a.w != b.w, "Passed!" );

  console.assert( ! a.equals( b ), "Passed!" );
  console.assert( ! b.equals( a ), "Passed!" );

  a.copy( b );
  console.assert( a.x == b.x, "Passed!" );
  console.assert( a.y == b.y, "Passed!" );
  console.assert( a.z == b.z, "Passed!" );
  console.assert( a.w == b.w, "Passed!" );

  console.assert( a.equals( b ), "Passed!" );
  console.assert( b.equals( a ), "Passed!" );
}

function TestV4_ApplyMatrix4() {
  var a = new Vec4( x, y, z, w );
  var m = new Mat4().fromRotationX( Math.PI );
  var expected = new Vec4( 2, - 3, - 4, 5 );
  a.applyMatrix4( m );
  console.assert( Math.abs( a.x - expected.x ) <= eps, "Rotation matrix: check x" );
  console.assert( Math.abs( a.y - expected.y ) <= eps, "Rotation matrix: check y" );
  console.assert( Math.abs( a.z - expected.z ) <= eps, "Rotation matrix: check z" );
  console.assert( Math.abs( a.w - expected.w ) <= eps, "Rotation matrix: check w" );

  a.set( x, y, z, w );
  m.fromTranslation( 5, 7, 11 );
  expected.set( 27, 38, 59, 5 );

  a.applyMatrix4( m );
  console.assert( Math.abs( a.x - expected.x ) <= eps, "Translation matrix: check x" );
  console.assert( Math.abs( a.y - expected.y ) <= eps, "Translation matrix: check y" );
  console.assert( Math.abs( a.z - expected.z ) <= eps, "Translation matrix: check z" );
  console.assert( Math.abs( a.w - expected.w ) <= eps, "Translation matrix: check w" );

  a.set( x, y, z, w );
  m.set( 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0 );
  expected.set( 2, 3, 4, 4 );

  a.applyMatrix4( m );
  console.assert( Math.abs( a.x - expected.x ) <= eps, "Custom matrix: check x" );
  console.assert( Math.abs( a.y - expected.y ) <= eps, "Custom matrix: check y" );
  console.assert( Math.abs( a.z - expected.z ) <= eps, "Custom matrix: check z" );
  console.assert( Math.abs( a.w - expected.w ) <= eps, "Custom matrix: check w" );

  a.set( x, y, z, w );
  m.set( 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53 );
  expected.set( 68, 224, 442, 664 );

  a.applyMatrix4( m );
  console.assert( Math.abs( a.x - expected.x ) <= eps, "Bogus matrix: check x" );
  console.assert( Math.abs( a.y - expected.y ) <= eps, "Bogus matrix: check y" );
  console.assert( Math.abs( a.z - expected.z ) <= eps, "Bogus matrix: check z" );
  console.assert( Math.abs( a.w - expected.w ) <= eps, "Bogus matrix: check w" );
}

TestV4_ApplyMatrix4();
TestV4_Equals();
TestV4_LerpClone();
TestV4_length();
TestV2_ApplyM3();
TestV4_MinMaxClamp();
TestV4_AddSubScalar();
TestV4_MulDivScalar();
TestV4_Dot();
TestV4_Normalize();
TestV4_ManhattanLen();
TestV4_Negate();
TestV4_Add();
TestV4_Sub();
TestV4_Mul();
TestV4_AddScaled()