import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    file: 'dist/bundle.js',
  },
  plugins: [
    typescript(),
    replace({
      "Object.defineProperty(exports, '__esModule', { value: true });": 'var exports = module.exports',
      delimiters: ['\n', '\n'],
      preventAssignment: true,
    }),
  ],
  external: [
    '@jscad/modeling',
  ],
};
