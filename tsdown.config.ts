import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  external: ['react', 'react-native', 'nativewind'],
  target: 'node20',
  minify: true,
});
