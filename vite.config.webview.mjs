import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: path.resolve(__dirname, 'webview'),
  base: './',
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist/webview'),
    emptyOutDir: true,
  },
});
