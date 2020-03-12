import { Euler, Mat3, Mat4, Vec2, Vec3, Vec4, Quat } from "../../src/index";
import { MathUtils } from '../../src/index'
const eps = 0.0001;

function matrixEquals4(a, b, tolerance) {
  tolerance = tolerance || 0.0001;
  if (a.length != b.length) {
    return false;
  }
  for (var i = 0, il = a.length; i < il; i++) {
    var delta = a[i] - b[i];
    if (delta > tolerance) {
      return false;
    }
  }
  return true;
}

function eulerEquals(a, b, tolerance) {
  tolerance = tolerance || 0.0001;
  var diff = Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
  return diff < tolerance;
}
function Mat4Instancing() {
  var a = new Mat4();
  console.assert(a.determinant() == 1, "determinant!");

  var b = new Mat4().set(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
  console.assert(b[0] == 0);
  console.assert(b[1] == 4);
  console.assert(b[2] == 8);
  console.assert(b[3] == 12);
  console.assert(b[4] == 1);
  console.assert(b[5] == 5);
  console.assert(b[6] == 9);
  console.assert(b[7] == 13);
  console.assert(b[8] == 2);
  console.assert(b[9] == 6);
  console.assert(b[10] == 10);
  console.assert(b[11] == 14);
  console.assert(b[12] == 3);
  console.assert(b[13] == 7);
  console.assert(b[14] == 11);
  console.assert(b[15] == 15);

  console.assert(!matrixEquals4(a, b), "matrixEquals4!");
}

function Mat4Set() {
  var b = new Mat4();
  console.assert(b.determinant() == 1, "Passed!");
  b.set(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
  console.assert(b[0] == 0);
  console.assert(b[1] == 4);
  console.assert(b[2] == 8);
  console.assert(b[3] == 12);
  console.assert(b[4] == 1);
  console.assert(b[5] == 5);
  console.assert(b[6] == 9);
  console.assert(b[7] == 13);
  console.assert(b[8] == 2);
  console.assert(b[9] == 6);
  console.assert(b[10] == 10);
  console.assert(b[11] == 14);
  console.assert(b[12] == 3);
  console.assert(b[13] == 7);
  console.assert(b[14] == 11);
  console.assert(b[15] == 15);
}

function Mat4Identity() {
  var b = new Mat4().set(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
  console.assert(b[0] == 0);
  console.assert(b[1] == 4);
  console.assert(b[2] == 8);
  console.assert(b[3] == 12);
  console.assert(b[4] == 1);
  console.assert(b[5] == 5);
  console.assert(b[6] == 9);
  console.assert(b[7] == 13);
  console.assert(b[8] == 2);
  console.assert(b[9] == 6);
  console.assert(b[10] == 10);
  console.assert(b[11] == 14);
  console.assert(b[12] == 3);
  console.assert(b[13] == 7);
  console.assert(b[14] == 11);
  console.assert(b[15] == 15);

  var a = new Mat4();
  console.assert(!matrixEquals4(a, b), "matrixEquals4!");

  b.identity();
  console.assert(matrixEquals4(a, b), "matrixEquals4!");
}

function Mat4CopyTranslation() {
  var a = new Mat4().set(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  var b = new Mat4().set(1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 16);
  console.assert(matrixEquals4(a, b) === false, "a and b initially not equal");
  b.copyTranslation(a);
  console.assert(matrixEquals4(a, b), "a and b equal after copyTranslation()");
}

function Mat4fromEulerExtract() {
  var testValues = [
    new Euler(0, 0, 0, "XYZ"),
    new Euler(1, 0, 0, "XYZ"),
    new Euler(0, 1, 0, "ZYX"),
    new Euler(0, 0, 0.5, "YZX"),
    new Euler(0, 0, -0.5, "YZX")
  ];

  for (var i = 0; i < testValues.length; i++) {
    var v = testValues[i];

    var m = new Mat4().fromEulerRotation(v);
    var v2 = new Euler().fromMatrixRotation(m, v.order);
    var m2 = new Mat4().fromEulerRotation(v2);

    console.assert(
      matrixEquals4(m, m2, eps),
      "fromEulerRotation #" +
        i +
        ": original and Euler-derived matrices are equal"
    );
    console.assert(
      eulerEquals(v, v2, eps),
      "fromEulerRotation #" +
        i +
        ": original and matrix-derived Eulers are equal"
    );

    var m3 = new Mat4().fromMatrixRotation(m2);
    var v3 = new Euler().fromMatrixRotation(m3, v.order);

    console.assert(
      matrixEquals4(m, m3, eps),
      "extractRotation #" + i + ": original and extracted matrices are equal"
    );
    console.assert(
      eulerEquals(v, v3, eps),
      "extractRotation #" + i + ": original and extracted Eulers are equal"
    );
  }
}

function  Mat4LookAt() {
  var a = new Mat4();
  var expected = new Mat4().identity();
  var eye = new Vec3( 0, 0, 0 );
  var target = new Vec3( 0, 1, - 1 );
  var up = new Vec3( 0, 1, 0 );

  a.lookAt( eye, target, up );
  var rotation = new Euler().fromMatrixRotation( a );
  console.assert( rotation.x * ( 180 / Math.PI ) === 45, "Check the rotation" );

  // eye and target are in the same position
  eye.copy( target );
  a.lookAt( eye, target, up );
  console.assert( matrixEquals4( a, expected ), "Check the result for eye == target" );

  // up and z are parallel
  eye.set( 0, 1, 0 );
  target.set( 0, 0, 0 );
  a.lookAt( eye, target, up );
  expected.set(
    1, 0, 0, 0,
    0, 0.0001, 1, 0,
    0, - 1, 0.0001, 0,
    0, 0, 0, 1
  );
  console.assert( matrixEquals4( a, expected ), "Check the result for when up and z are parallel" );
}

function Mat4Multiply() {
  var lhs = new Mat4().set( 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53 );
  var rhs = new Mat4().set( 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131 );
  lhs.multiply( rhs );

  console.assert( lhs[ 0 ] == 1585 );
  console.assert( lhs[ 1 ] == 5318 );
  console.assert( lhs[ 2 ] == 10514 );
  console.assert( lhs[ 3 ] == 15894 );
  console.assert( lhs[ 4 ] == 1655 );
  console.assert( lhs[ 5 ] == 5562 );
  console.assert( lhs[ 6 ] == 11006 );
  console.assert( lhs[ 7 ] == 16634 );
  console.assert( lhs[ 8 ] == 1787 );
  console.assert( lhs[ 9 ] == 5980 );
  console.assert( lhs[ 10 ] == 11840 );
  console.assert( lhs[ 11 ] == 17888 );
  console.assert( lhs[ 12 ] == 1861 );
  console.assert( lhs[ 13 ] == 6246 );
  console.assert( lhs[ 14 ] == 12378 );
  console.assert( lhs[ 15 ] == 18710)
}

function Mat4MultiplyMatrices() {
  var lhs = new Mat4().set( 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53 );
  var rhs = new Mat4().set( 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131 );
  var ans = new Mat4();
  ans.multiply(lhs, rhs );
  console.assert( ans[ 0 ] == 1585 );
  console.assert( ans[ 1 ] == 5318 );
  console.assert( ans[ 2 ] == 10514 );
  console.assert( ans[ 3 ] == 15894 );
  console.assert( ans[ 4 ] == 1655 );
  console.assert( ans[ 5 ] == 5562 );
  console.assert( ans[ 6 ] == 11006 );
  console.assert( ans[ 7 ] == 16634 );
  console.assert( ans[ 8 ] == 1787 );
  console.assert( ans[ 9 ] == 5980 );
  console.assert( ans[ 10 ] == 11840 );
  console.assert( ans[ 11 ] == 17888 );
  console.assert( ans[ 12 ] == 1861 );
  console.assert( ans[ 13 ] == 6246 );
  console.assert( ans[ 14 ] == 12378 );
  console.assert( ans[ 15 ] == 18710 );
}

function Mat4MultScalar() {
  var b = new Mat4().set( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 );
  console.assert( b[ 0 ] == 0 );
  console.assert( b[ 1 ] == 4 );
  console.assert( b[ 2 ] == 8 );
  console.assert( b[ 3 ] == 12 );
  console.assert( b[ 4 ] == 1 );
  console.assert( b[ 5 ] == 5 );
  console.assert( b[ 6 ] == 9 );
  console.assert( b[ 7 ] == 13 );
  console.assert( b[ 8 ] == 2 );
  console.assert( b[ 9 ] == 6 );
  console.assert( b[ 10 ] == 10 );
  console.assert( b[ 11 ] == 14 );
  console.assert( b[ 12 ] == 3 );
  console.assert( b[ 13 ] == 7 );
  console.assert( b[ 14 ] == 11 );
  console.assert( b[ 15 ] == 15 );

  b.multiplyScalar( 2 );
  console.assert( b[ 0 ] == 0 * 2 );
  console.assert( b[ 1 ] == 4 * 2 );
  console.assert( b[ 2 ] == 8 * 2 );
  console.assert( b[ 3 ] == 12 * 2 );
  console.assert( b[ 4 ] == 1 * 2 );
  console.assert( b[ 5 ] == 5 * 2 );
  console.assert( b[ 6 ] == 9 * 2 );
  console.assert( b[ 7 ] == 13 * 2 );
  console.assert( b[ 8 ] == 2 * 2 );
  console.assert( b[ 9 ] == 6 * 2 );
  console.assert( b[ 10 ] == 10 * 2 );
  console.assert( b[ 11 ] == 14 * 2 );
  console.assert( b[ 12 ] == 3 * 2 );
  console.assert( b[ 13 ] == 7 * 2 );
  console.assert( b[ 14 ] == 11 * 2 );
  console.assert( b[ 15 ] == 15 * 2 );
}

function Mat4Determinant() {
  var a = new Mat4();
  console.assert( a.determinant() == 1, "Passed!" );
  a[ 0 ] = 2;
  console.assert( a.determinant() == 2, "Passed!" );
  a[ 0 ] = 0;
  console.assert( a.determinant() == 0, "Passed!" );
  // calculated via http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/fourD/index.htm
  a.set( 2, 3, 4, 5, - 1, - 21, - 3, - 4, 6, 7, 8, 10, - 8, - 9, - 10, - 12 );
  console.assert( a.determinant() == 76, "Passed!" );
}

function Mat4Transpose() {
  var a = new Mat4();
  var b = a.clone().transpose();
  console.assert( matrixEquals4( a, b ), "should equal!" );
  var b = new Mat4().set( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 );
  var c = b.clone().transpose();
  console.assert( ! matrixEquals4( b, c ), "Should be different!" );
  c.transpose();
  console.assert( matrixEquals4( b, c ), "should equal!" );
}

function Mat4Inverse() {
  var identity = new Mat4();
  var a = new Mat4();
  var b = new Mat4().set( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );
  var c = new Mat4().set( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );

  console.assert( ! matrixEquals4( a, b ), "Passed!" );
  b.invert( a, false );
  console.assert( matrixEquals4( b, new Mat4() ), "Passed!" );
  var testMatrices = [
    new Mat4().fromRotationX( 0.3 ),
    new Mat4().fromRotationX( - 0.3 ),
    new Mat4().fromRotationY( 0.3 ),
    new Mat4().fromRotationY( - 0.3 ),
    new Mat4().fromRotationZ( 0.3 ),
    new Mat4().fromRotationZ( - 0.3 ),
    new Mat4().fromScale( 1, 2, 3 ),
    new Mat4().fromScale( 1 / 8, 1 / 2, 1 / 3 ),
    new Mat4().fromPerspective( - 1, 1, 1, - 1, 1, 1000 ),
    new Mat4().fromPerspective( - 16, 16, 9, - 9, 0.1, 10000 ),
    new Mat4().fromTranslation( 1, 2, 3 )
  ];

  for ( var i = 0, il = testMatrices.length; i < il; i ++ ) {

    var m = testMatrices[ i ];

    var mInverse = new Mat4().invert( m );
    var mSelfInverse = m.clone();
    mSelfInverse.invert( mSelfInverse );

    // self-inverse should the same as inverse
    console.assert( matrixEquals4( mSelfInverse, mInverse ), "Passed!" );

    // the determinant of the inverse should be the reciprocal
    console.assert( Math.abs( m.determinant() * mInverse.determinant() - 1 ) < 0.0001, "Passed!" );

    var mProduct = new Mat4().multiply( m, mInverse );

    // the determinant of the identity matrix is 1
    console.assert( Math.abs( mProduct.determinant() - 1 ) < 0.0001, "Passed!" );
    console.assert( matrixEquals4( mProduct, identity ), "Passed!" );

  }

}

function Mat4Scale() {
  var a = new Mat4().set( 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 );
  var b = new Vec3( 2, 3, 4 );
  var c = new Mat4().set( 2, 6, 12, 4, 10, 18, 28, 8, 18, 30, 44, 12, 26, 42, 60, 16 );
  a.scale( b );
  console.assert( matrixEquals4( a, c ), "Passed!" );
}

function Mat4FromTranslation() {
  var a = new Mat4();
  var b = new Vec3( 2, 3, 4 );
  var c = new Mat4().set( 1, 0, 0, 2, 0, 1, 0, 3, 0, 0, 1, 4, 0, 0, 0, 1 );
  a.fromTranslation( b.x, b.y, b.z );
  console.assert( matrixEquals4( a, c ), "Passed!" );
}

function Mat4FromRotX() {
  var a = new Mat4();
  var b = Math.sqrt( 3 ) / 2;
  var c = new Mat4().set( 1, 0, 0, 0, 0, b, - 0.5, 0, 0, 0.5, b, 0, 0, 0, 0, 1 );

  a.fromRotationX( Math.PI / 6 );
  console.assert( matrixEquals4( a, c ), "Passed!" );
}

function Mat4FromRotY() {
  var a = new Mat4();
  var b = Math.sqrt( 3 ) / 2;
  var c = new Mat4().set( b, 0, 0.5, 0, 0, 1, 0, 0, - 0.5, 0, b, 0, 0, 0, 0, 1 );

  a.fromRotationY( Math.PI / 6 );
  console.assert( matrixEquals4( a, c ), "Passed!" );
}

function Mat4FromRotZ() {
  var a = new Mat4();
  var b = Math.sqrt( 3 ) / 2;
  var c = new Mat4().set( b, - 0.5, 0, 0, 0.5, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 );

  a.fromRotationZ( Math.PI / 6 );
  console.assert( matrixEquals4( a, c ), "Passed!" );
}

function Mat4FromRotationAxis() {
  var axis = new Vec3( 1.5, 0.0, 1.0 ).normalize();
  var radians = MathUtils.toRadians( 45 );
  var a = new Mat4().fromAxisRotation( axis, radians );

  var expected = new Mat4().set(
    0.9098790095958609, - 0.39223227027636803, 0.13518148560620882, 0,
    0.39223227027636803, 0.7071067811865476, - 0.588348405414552, 0,
    0.13518148560620882, 0.588348405414552, 0.7972277715906868, 0,
    0, 0, 0, 1
  );
  console.assert( matrixEquals4( a, expected ), "Check numeric result" );
}

function Mat4FromScale() {
  var a = new Mat4();
	var c = new Mat4().set( 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1 );
  a.fromScale( 2, 3, 4 );
  console.assert( matrixEquals4( a, c ), "Passed!" );
}

function Mat4Compose() {
  var tValues = [
    new Vec3(),
    new Vec3( 3, 0, 0 ),
    new Vec3( 0, 4, 0 ),
    new Vec3( 0, 0, 5 ),
    new Vec3( - 6, 0, 0 ),
    new Vec3( 0, - 7, 0 ),
    new Vec3( 0, 0, - 8 ),
    new Vec3( - 2, 5, - 9 ),
    new Vec3( - 2, - 5, - 9 )
  ];

  var sValues = [
    new Vec3( 1, 1, 1 ),
    new Vec3( 2, 2, 2 ),
    new Vec3( 1, - 1, 1 ),
    new Vec3( - 1, 1, 1 ),
    new Vec3( 1, 1, - 1 ),
    new Vec3( 2, - 2, 1 ),
    new Vec3( - 1, 2, - 2 ),
    new Vec3( - 1, - 1, - 1 ),
    new Vec3( - 2, - 2, - 2 )
  ];

  var rValues = [
    new Quat(),
    new Quat().fromEulerRotation( new Euler( 1, 1, 0 ) ),
    new Quat().fromEulerRotation( new Euler( 1, - 1, 1 ) ),
    new Quat( 0, 0.9238795292366128, 0, 0.38268342717215614 )
  ];

  for ( var ti = 0; ti < tValues.length; ti ++ ) {

    for ( var si = 0; si < sValues.length; si ++ ) {

      for ( var ri = 0; ri < rValues.length; ri ++ ) {
        var t = tValues[ti];
        var s = sValues[si];
        var r = rValues[ri];
        var m = new Mat4().compose(t, r, s);
        var t2 = new Vec3();
        var r2 = new Quat();
        var s2 = new Vec3();

        m.decompose( t2, r2, s2 );

        var m2 = new Mat4().compose(t2, r2, s2);
        console.assert(matrixEquals4(m, m2), "Should Equal!");

      }
    }
  }
}

function Mat4MakePerspective() {
  var a = new Mat4().fromPerspective( - 1, 1, - 1, 1, 1, 100 );
  var expected = new Mat4().set(
    1, 0, 0, 0,
    0, - 1, 0, 0,
    0, 0, - 101 / 99, - 200 / 99,
    0, 0, - 1, 0
  );
  console.assert( matrixEquals4( a, expected ), "Check result" );
}

function Mat4MakeOrtho() {
  var a = new Mat4().fromOrthographic( - 1, 1, - 1, 1, 1, 100 );
  var expected = new Mat4().set(
    1, 0, 0, 0,
    0, - 1, 0, 0,
    0, 0, - 2 / 99, - 101 / 99,
    0, 0, 0, 1
  );
  console.assert( matrixEquals4( a, expected ), "Check result" );
}

function Mat4Equals() {
  var a = new Mat4().set( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 );
  var b = new Mat4().set( 0, - 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 );

  console.assert( !a.equals( b ), "Check that a does not equal b" );
  console.assert( !b.equals( a ), "Check that b does not equal a" );

  a.copy( b );
  console.assert( a.equals( b ), "Check that a equals b after copy()" );
  console.assert( b.equals( a ), "Check that b equals a after copy()" );
}

Mat4Equals();
Mat4MakeOrtho();
Mat4MakePerspective();
Mat4Compose();
Mat4FromScale();
Mat4FromRotationAxis();
Mat4FromRotX();
Mat4FromRotY();
Mat4FromRotZ();
Mat4FromTranslation();
Mat4Scale();
Mat4Inverse();
Mat4Transpose();
Mat4Determinant();
Mat4MultScalar();
Mat4MultiplyMatrices();
Mat4Multiply();
Mat4LookAt();
Mat4fromEulerExtract();
Mat4Instancing();
Mat4Set();
Mat4Identity();
Mat4CopyTranslation();
