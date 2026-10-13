import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'spa',
  server: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      input: 'index.html'
    }
  }
});
