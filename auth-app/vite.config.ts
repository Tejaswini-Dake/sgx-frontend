import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  server: {
    port: 3001,
    origin: 'http://localhost:3001',
  },
  base: '/',
  plugins: [
    react(),
    federation({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router-dom': { singleton: true },
        '@reduxjs/toolkit': { singleton: true },
      },
    }),
  ],
  build: {
    target: 'esnext',
  },
});
