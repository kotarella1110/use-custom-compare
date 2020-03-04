import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  plugins: [
    external(),
    typescript({
      clean: true,
    }),
    terser(),
    filesize(),
  ],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
};
