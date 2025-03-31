import { defineConfig, Format } from 'tsup';
import { umdWrapper } from 'esbuild-plugin-umd-wrapper';

// https://github.com/egoist/tsup/blob/769aa49cae16cc1713992970db966d6514878e06/src/utils.ts#L142-L167
export function defaultOutExtension({
  format,
  pkgType,
}: {
  format: Format;
  pkgType?: string;
}): { js: string; dts: string } {
  let jsExtension = '.js';
  let dtsExtension = '.d.ts';
  const isModule = pkgType === 'module';
  if (isModule && format === 'cjs') {
    jsExtension = '.cjs';
    dtsExtension = '.d.cts';
  }
  if (!isModule && format === 'esm') {
    jsExtension = '.mjs';
    dtsExtension = '.d.mts';
  }
  if (format === 'iife') {
    jsExtension = '.global.js';
  }
  return {
    js: jsExtension,
    dts: dtsExtension,
  };
}

export default defineConfig(() => ({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'umd'] as Format[],
  outExtension(params) {
    if ((params.format as Format | 'umd') === 'umd') {
      return {
        js: '.umd.js',
      };
    }
    return defaultOutExtension(params);
  },
  dts: true,
  esbuildPlugins: [
    umdWrapper({
      libraryName: 'useCustomCompare',
      external: ['react'],
    }),
  ],
  sourcemap: true,
  clean: true,
}));
