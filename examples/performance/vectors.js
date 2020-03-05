import JSBenchmark from './benchmark';

window.bench = new JSBenchmark({
  setup: function() {
    var total = 0;
    function add(out, v, len) {
      out.x += v.x;
      out.y += v.y;
      if (len > 2) {
        out.z += v.z;
        if (len > 3) {
          out.w += v.w;
        }
      }
      return out;
    }


    function mulScalar(out, scalar, len) {
      out.x *= scalar;
      out.y *= scalar;
      if (len > 2) {
        out.z *= scalar;
        if (len > 3) {
          out.w *= scalar;
        }
      }
      return out;
    }

    function divScalar(out, scalar, len) {
      return mulScalar(out, 1 / scalar, len);
    }

    function length(out, len) {
      let val = out.x * out.x + out.y * out.y;
      if (len > 2) {
        val += out.z * out.z;
        if (len > 3) {
          val += out.w * out.w;
        }
      }
      return Math.sqrt(val);
    }

    function normalize(out, len) {
      return divScalar(out, length(out, len) || 1);
    }

    /* VEC4 Functional */
    var Vec4Functional = function() {
      function Vec4Functional(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0;
      }
      var p = Vec4Functional.prototype;
      p.add = function(v) {
        return add(this, v, 4);
      }

      p.multiplyScalar = function(scalar) {
        return mulScalar(this, scalar, 4);
      }

      p.divideScalar = function(scalar) {
        return divScalar(this, scalar, 4);
      }

      p.normalize = function() {
        return normalize(this, 4);
      }

      return Vec4Functional;
    }();

    /* VEC3 Functional */
    var Vec3Functional = function() {
      function Vec3Functional(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = 0;
      }
      var p = Vec3Functional.prototype;
      p.add = function(v) {
        return add(this, v, 3);
      }

      p.multiplyScalar = function(scalar) {
        mulScalar(this, scalar, 3);
      }

      p.divideScalar = function(scalar) {
        return divScalar(this, scalar, 3);
      }

      p.normalize = function() {
        return normalize(this, 3);
      }

      return Vec3Functional;
    }();

    /* VEC3 Proto */
    var Vec3Prototype = function() {
      function Vec3Prototype(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
      }
      var p = Vec3Prototype.prototype;
      p.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
      }

      p.multiplyScalar = function ( scalar ) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
      }

      p.divideScalar = function ( scalar ) {
        return this.multiplyScalar( 1 / scalar );
      }

      p.normalize = function () {
        return this.divideScalar( this.length() || 1 );
      }

      p.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      }

      return Vec3Prototype;
    }()

    /* VEC4 Proto */
    var Vec4Prototype = function() {
      function Vec4Prototype(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0;
      }
      var p = Vec4Prototype.prototype;

      p.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
      }

      p.multiplyScalar = function ( scalar ) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
      }

      p.divideScalar = function ( scalar ) {
        return this.multiplyScalar( 1 / scalar );
      }

      p.normalize = function () {
        return this.divideScalar( this.length() || 1 );
      }

      p.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
      }

      return Vec4Prototype;
    }()

  },
  tests: [
    {
      name: 'Vec3Functional',
      fn: function() {
        var v1 = new Vec3Functional(1, 2, 3);
        var v2 = new Vec3Functional(4, 5, 6);
        v1.add(v2);
        v1.normalize();
        total += v1.x - v1.y + v1.z + v2.x;
      }
    },
    {
      name: 'Vec3Prototype',
      fn: function() {
        var v1 = new Vec3Prototype(1, 2, 3);
        var v2 = new Vec3Prototype(4, 5, 6);
        v1.add(v2);
        v1.normalize();
        total += v1.x - v1.y + v1.z + v2.x;
      }
    },
    {
      name: 'Vec4Functional',
      fn: function() {
        var v1 = new Vec4Functional(1, 2, 3, 4);
        var v2 = new Vec4Functional(5, 6, 7, 8);
        v1.add(v2);
        v1.normalize();
        total += v1.x - v1.y + v1.z + v2.w;
      }
    },
    {
      name: 'Vec4Prototype',
      fn: function() {
        var v1 = new Vec4Prototype(1, 2, 3, 5);
        var v2 = new Vec4Prototype(6, 7, 8, 9);
        v1.add(v2);
        v1.normalize();
        total += v1.x - v1.y + v1.z + v2.w;
      }
    },
  ]
});