import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@theme': resolve(__dirname, '../packages/ui/src/theme.css'),
    },
  },
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        auth: {
          type: 'module',
          name: 'auth',
          entry: 'http://localhost:3001/remoteEntry.js',
          entryGlobalName: 'auth',
          shareScope: 'default',
        },
        main: {
          type: 'module',
          name: 'main',
          entry: 'http://localhost:3002/remoteEntry.js',
          entryGlobalName: 'main',
          shareScope: 'default',
        },
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
