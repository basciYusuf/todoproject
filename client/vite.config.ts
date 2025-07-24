import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
