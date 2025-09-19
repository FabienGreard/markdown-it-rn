import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  external: ['react', 'react-native', 'nativewind'],
  target: 'es2020',
  splitting: false,
  minify: true,
  esbuildOptions: (options) => {
    options.drop = ['console', 'debugger'];
  },
});
