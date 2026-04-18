import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3002,
    origin: 'http://localhost:3002',
  },
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@layout': resolve(__dirname, './src/components/Layout'),
    },
  },
  plugins: [
    react(),
    federation({
      name: 'main',
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
      dts: false,
    }),
  ],
  build: {
    target: 'esnext',
  },
});
