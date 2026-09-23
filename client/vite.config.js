import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const backendTarget = `http://localhost:${process.env.BACKEND_PORT || 5000}`;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
    // allow the sandbox preview domain (Vite blocks unknown hosts by default)
    allowedHosts: ['.e2b.app'],
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
      },
      '/uploads': {
        target: backendTarget,
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
});