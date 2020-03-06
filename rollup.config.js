import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'useCustomCompare',
      file: pkg.unpkg,
      format: 'umd',
      sourcemap: true,
      globals: {
        react: 'React',
      },
    },
    plugins: [
      external(),
      typescript({
        clean: true,
      }),
      sourcemaps(),
      terser(),
      filesize(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      typescript({
        clean: true,
      }),
      sourcemaps(),
      filesize(),
    ],
  },
];
