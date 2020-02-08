import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import glslify from 'rollup-plugin-glslify';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/vizor-dev.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel(),
    glslify(),
    terser({
      output: {
        beautify: 'preamble',
        comments: 'all',
      },
      compress: false,
      keep_fnames: true,
    }),
  ]
};