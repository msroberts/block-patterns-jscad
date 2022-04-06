import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    file: 'dist/bundle.js',
  },
  plugins: [
    typescript(),
  ],
  external: [
    '@jscad/modeling',
  ],
};
