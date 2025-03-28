import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setup-test-environment.ts'],
    include: ['./src/**/*.{spec,test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    watch: false,
    coverage: {
      reporter: ['text', 'json', 'html']
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  }
});