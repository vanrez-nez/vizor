"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var r = function Object3D() {
    this.parent = null;
    this.children = [];
};

var e = function Geometry() {};

/* eslint-disable camelcase */
/**
 * Passed to `gl.clear()` clear the current color buffer.
 */ var t = 16384;

var a = 5124;

var i = 5126;

/**
 * Passed to createShader to define a fragment shader.
 */ var n = 35632;

/**
 * Passed to createShader to define a vertex shader
 */ var o = 35633;

/**
 * Passed to `gl.getShaderParameter()` to get the status of the compilation. Returns false if the shader was not compiled. You can then query `gl.getShaderInfoLog()` to find the exact error
 */ var s = 35713;

/**
 * Passed to `gl.getProgramParameter()` after calling `gl.linkProgram()` to determine if a program was linked correctly. Returns false if there were errors. Use getProgramInfoLog to find the exact error.
 */ var f = 35714;

/**
 * Passed to `gl.getProgramParameter()` to get the number of attributes active in a program.
 */ var v = 35721;

/**
 * Passed to `gl.getProgramParameter()` to get the number of uniforms active in a program.
 */ var c = 35718;

var u = 35664;

var l = 35665;

var h = 35666;

var g = 35667;

var m = 35668;

var p = 35669;

var d = 35670;

var y = 35671;

var P = 35672;

var S = 35673;

var b = 35674;

var U = 35675;

var x = 35676;

var w = 35678;

/**
 * ***Clearing Buffers***:
 * @description > Constants passed to [gl.clear()][1] to clear buffer masks.
 * >> [1]: <https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear>
 * >> [2]: <https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clea2r>
 * @typedef {number} ClearBufferMask - GLenum
 */ var A = function GLState() {
    this.programId = -1;
};

function warn(r) {
    console.log(r);
}

function createContext(r) {
    var e = r.canvas, t = r.version, a = r.options;
    var i = [ "webgl2", "webgl", "experimental-webgl" ];
    if (t < 2) i.shift();
    for (var n = 0; n < i.length; n++) {
        var o = e.getContext(i[n], a);
        if (o) {
            return o;
        }
    }
}

var C =

function() {
    function Renderer(r) {
        this.gl = createContext({
            canvas: document.getElementById(r),
            version: 1,
            options: {}
        });
        this.state = new A;
        this.dpr = 1;
 // Device Pixel Ratio
        }
    var r = Renderer.prototype;
    r.resize = function resize(r, e, t) {
        if (t === void 0) {
            t = false;
        }
        var a = this.dpr, i = this.gl;
        var n = i.canvas;
        var o = r * a, s = e * a;
        if (n.width !== o || n.height !== s) {
            n.width = o;
            n.height = s;
            i.viewport(0, 0, o, s);
            if (t) {
                Object.assign(n.style, {
                    width: o + "px",
                    height: s + "px"
                });
            }
        }
    };
    r.clear = function clear() {
        var r = this.gl;
        r.clearColor(0, 0, 0, 1);
 // Needs to clear with other flags via selection
                r.clear(t);
    };
    r.render = function render(r, e) {
        var t = this.gl;
    };
    return Renderer;
}();

var D;

var I = Array;

var M = Int32Array;

var _ = Float32Array;

var z = (D = {}, D[d] = [ "1i", I, 1 ], D[a] = [ "1i", M, 1 ], D[i] = [ "1f", _, 1 ],
D[y] = [ "2iv", I, 2 ], D[P] = [ "3iv", I, 3 ], D[S] = [ "3iv", I, 4 ], D[g] = [ "2iv", M, 2 ],
D[m] = [ "3iv", M, 3 ], D[p] = [ "4iv", M, 4 ], D[u] = [ "2fv", _, 2 ], D[l] = [ "3fv", _, 3 ],
D[h] = [ "4fv", _, 4 ], D[b] = [ "Matrix2fv", _, 4 ], D[U] = [ "Matrix3fv", _, 9 ],
D[x] = [ "Matrix4fv", _, 16 ], D[w] = [ "1i", M, 1 ], D);

function getDescriptor(r) {
    var e = z[r];
    if (!e) warn("Unexpected uniform type");
    return e;
}

function getUniformName(r, e) {
    var t = getDescriptor(r), a = t[0];
    if (e > 1) {
        // transform 1i/1f suffixes to 1iv/1fv if uniform is an array
        a = a.replace(/v?$/, "v");
    }
    return "uniform" + a;
}

var j = {};

function getUniformSetter(r, e, t) {
    if (!j[e]) {
        var a = getUniformName(e, t);
        var i = r[a];
        var n = /Matrix/.test(a);
        j[e] = function setUniform(e, t) {
            if (n) {
                i.call(r, e, false, t);
            } else {
                i.call(r, e, t);
            }
        };
    }
    return j[e];
}

function getUniformDefaultValue(r, e) {
    var t = r === d ? false : 0;
    var a = getDescriptor(r),
    /*suffix*/
    i = a[1], n = a[2];
    if (e > 1 || n > 1) {
        t = new i(e * n);
        if (r === d) {
            t.fill(false);
        }
    }
    return t;
}

function listProgramUniforms(r, e) {
    var t = [];
    var a = r.getProgramParameter(e, c);
    for (var i = 0; i < a; i++) {
        var n = r.getActiveUniform(e, i), o = n.name, s = n.type, f = n.size;
        var v = r.getUniformLocation(e, o);
        t.push({
            name: o,
            type: s,
            size: f,
            location: v
        });
    }
    return t;
}

function listProgramAttributes(r, e) {
    var t = r.getProgramParameter(e, v);
    for (var a = 0; a < t; a++) {
        var i = r.getActiveAttrib(e, a);
        console.log(i);
    }
}

function compileShader(r, e, t) {
    var a = r.createShader(e);
    r.shaderSource(a, t);
    r.compileShader(a);
    var i = r.getShaderParameter(a, s);
    if (!i) {
        var n = r.getShaderInfoLog(a);
        r.deleteShader(a);
        warn("Shader compilation error: ");
    }
    return a;
}

function createProgram(r, e, t) {
    var a = r.createProgram();
    var i = compileShader(r, o, e);
    var s = compileShader(r, n, t);
    r.attachShader(a, i);
    r.attachShader(a, s);
    r.linkProgram(a);
    var v = r.getProgramParameter(a, f);
    if (!v) {
        var c = r.getProgramInfoLog(a);
        r.deleteProgram(a);
        r.deleteShader(i);
        r.deleteShader(s);
        warn("Program link error:");
    }
    return a;
}

function _defineProperties(r, e) {
    for (var t = 0; t < e.length; t++) {
        var a = e[t];
        a.enumerable = a.enumerable || false;
        a.configurable = true;
        if ("value" in a) a.writable = true;
        Object.defineProperty(r, a.key, a);
    }
}

function _createClass(r, e, t) {
    if (e) _defineProperties(r.prototype, e);
    if (t) _defineProperties(r, t);
    return r;
}

function arraysEqual(r, e) {
    if (r === e) return true;
    if (r.length !== e.length) return false;
    for (var t = 0; t < r.length; t++) {
        if (r[t] !== e[t]) return false;
    }
    return true;
}

function copyArray(r, e) {
    for (var t = 0; t < e.length; t++) {
        e[t] = r[t];
    }
}

var q =

function() {
    function Uniform(r, e) {
        var t = e.name, a = e.type, i = e.location, n = e.size;
        this.gl = r;
        this.type = a;
        this.name = t;
        this.location = i;
        this.size = n;
        this.setter = getUniformSetter(r, a, n);
        this.cache = getUniformDefaultValue(a, n);
    }
    var r = Uniform.prototype;
    r.setCache = function setCache(r) {
        if (r.length) {
            copyArray(r, this.cache);
        } else {
            this.cache = r;
        }
    };
    r.equals = function equals(r) {
        var e = this.cache;
        if (r.length) {
            return arraysEqual(r, e);
        }
        return r === e;
    };
    _createClass(Uniform, [ {
        key: "value",
        set: function set(r) {
            var e = this.location;
            if (!this.equals(r)) {
                this.setter(e, r);
                this.setCache(r);
            }
        },
        get: function get() {
            return this.cache;
        }
    } ]);
    return Uniform;
}();

var O = 0;

var k =

function() {
    function Shader(r, e) {
        var t = e.vertexSource, a = e.fragmentSource, i = e.uniforms;
        this.gl = r;
        this.id = O++;
        this.program = createProgram(r, t, a);
        this.uniforms = this.createUniforms();
        this.attributes = this.createAttributes();
        console.log(this.uniforms);
    }
    var r = Shader.prototype;
    r.createUniforms = function createUniforms() {
        var r = this.gl, e = this.program;
        var t = {};
        var a = listProgramUniforms(r, e);
        console.log(a);
        a.forEach((function(e){
            return t[e.name] = new q(r, e);
        }));
        return t;
    };
    r.createAttributes = function createAttributes() {
        var r = this.gl, e = this.program;
        var t = listProgramAttributes(r, e);
    };
    r.use = function use(r) {
        var e = this.gl, t = this.program, a = this.id;
        var i = r.programId === a;
        if (!i) {
            e.useProgram(t);
            r.programId = a;
        }
    };
    return Shader;
}();

var E = function Mesh() {};

exports.Geometry = e;

exports.Mesh = E;

exports.Object3D = r;

exports.Renderer = C;

exports.Shader = k;
