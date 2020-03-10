import JSBenchmark from './benchmark';

JSBenchmark({
  id: 'matrix',
  setup: function() {
    var total = 0;

    var Identity = Object.freeze([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);

    var vScale = { x: -23.0233, y: 12.323, z: 9.234 };

    var Mat4 = function() {
      function Mat4() {
        this.elements = new Array(16);
        this.copyArr(Identity);
      }

      Mat4.prototype = {

        scale: function(v) {
          const e = this.elements;
          e[0] = v.x;
          e[5] = v.y;
          e[10] = v.z;
          return this;
        },

        fromScaleSingle(v) {
          const e = this.elements;
          e[0] = v.x;
          e[1] = 0;
          e[2] = 0;
          e[3] = 0;
          e[4] = 0;
          e[5] = v.y;
          e[6] = 0;
          e[7] = 0;
          e[8] = 0;
          e[9] = 0;
          e[10] = v.z;
          e[11] = 0;
          e[12] = 0;
          e[13] = 0;
          e[14] = 0;
          e[15] = 0;
          return this;
        },

        copyArr(arr) {
          const e = this.elements;
          e[0] = arr[0];
          e[1] = arr[1];
          e[2] = arr[2];
          e[3] = arr[3];
          e[4] = arr[4];
          e[5] = arr[5];
          e[6] = arr[6];
          e[7] = arr[7];
          e[8] = arr[8];
          e[9] = arr[9];
          e[10] = arr[10];
          e[11] = arr[11];
          e[12] = arr[12];
          e[13] = arr[13];
          e[14] = arr[14];
          e[15] = arr[15];
          return this;
        },

        fromScaleCombine(v) {
          this.copyArr(Identity);
          this.scale(v);
          return this;
        },

        identity: function() {
          this.copyArr(Identity);
          return this;
        },
      }
      return Mat4;
    }();

  },
  tests: [
    {
      name: 'Matrix Separated Method',
      fn: function() {
        var m1 = new Mat4();
        m1.fromScaleCombine(vScale);
        total += m1.elements[0];
      }
    },
    {
      name: 'Matrix Single Method',
      fn: function() {
        var m1 = new Mat4();
        m1.fromScaleSingle(vScale);
        total += m1.elements[0];
      }
    },
  ]
});