import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/bookish-rotary-phone/',
  build: {
    cssCodeSplit: true,
    sourcemap: false
  }
});
