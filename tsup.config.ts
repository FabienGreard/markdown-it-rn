import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-native', 'nativewind'],
  target: 'es2020',
  splitting: false,
  minify: true,
  publicDir: false,
  onSuccess: 'cp tailwind.config.js dist/',
});
