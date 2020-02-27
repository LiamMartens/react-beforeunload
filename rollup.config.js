import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  output: {
    exports: 'named',
    file: 'lib/index.js',
    format: 'cjs',
  },
  external: ['prop-types', 'react', 'react-router'],
  plugins: [babel(), typescript()],
};
