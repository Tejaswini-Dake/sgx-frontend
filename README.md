# sgx-frontend

A microfrontend architecture built with Vite, React, and TypeScript.
This repository contains three separate apps wired together with Module Federation via `@originjs/vite-plugin-federation`.

## Project Overview

`sgx-frontend` is a microfrontend shell that loads remote React modules from multiple apps at runtime.
The project is organized into three apps:

- `host` — the shell application and container with routing, running on port `3000`
- `auth` — authentication-related module, running on port `3001`
- `main` — primary application module, running on port `3002`

Each app is developed as a standalone Vite project and shares dependencies using Module Federation.

## Architecture

This architecture uses a host/remote pattern:

- **Host**: the container application that loads remote federated modules and coordinates routing.
- **Remotes**: independent apps exposing React components via `remoteEntry.js`.

In this repo:

- `host` declares remote endpoints for `auth` and `main`
- `auth` exposes its authentication UI via Module Federation
- `main` exposes the main application UI via Module Federation

The host application dynamically imports remote bundles at runtime, allowing each app to be developed and deployed separately.

## Folder Structure

```
sgx/
├── auth-app/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.mjs
│   ├── postcss.config.mjs
│   └── src/
│       ├── App.tsx
│       └── main.tsx
├── host-app/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.mjs
│   ├── postcss.config.mjs
│   └── src/
│       ├── App.tsx
│       └── main.tsx
├── main-app/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.mjs
│   ├── postcss.config.mjs
│   └── src/
│       ├── App.tsx
│       └── main.tsx
├── package.json
├── package-lock.json
└── .gitignore
```

## Prerequisites

- Node.js (recommended latest LTS)
- npm

## Installation

From the repository root:

```bash
npm install
```

This installs shared dependencies and links the workspace packages.

## Running the Apps

Start each app from the root with:

```bash
npm --workspace host-app run dev
npm --workspace auth-app run dev
npm --workspace main-app run dev
```

Or use the root workspace commands if configured:

```bash
npm run dev:host
npm run dev:auth
npm run dev:main
npm run dev:all
```

### Ports Used

- `host`: `http://localhost:3000`
- `auth`: `http://localhost:3001`
- `main`: `http://localhost:3002`

## How Module Federation Works Here

Module Federation allows the `host` app to load remote bundles from the `auth` and `main` apps at runtime.

- `auth` and `main` each expose components through a `remoteEntry.js` manifest.
- `host` consumes these remotes using configured remote URLs.
- Shared packages such as `react`, `react-dom`, `react-router-dom`, and `@reduxjs/toolkit` are deduped and loaded as singletons.

This enables independent deployment and development of each microfrontend while sharing runtime dependencies.

## Troubleshooting

### `remoteEntry.js` 404 or failed to load

- Verify the remote app is running on the expected port.
- Confirm the remote URL in `host-app/vite.config.ts` matches the actual remote host and port.
- Ensure the remote app exposes `remoteEntry.js` and is not serving it from a different path.

### Blank screen or missing remote content

- Check browser console for federation or network errors.
- Confirm the remote apps are running before opening `host`.
- Validate that the remote app `name` and exposed module paths match the `host` configuration.

### Shared dependency mismatches

- Make sure all apps use compatible versions of `react`, `react-dom`, and other shared packages.
- Check the host and remotes share the same `requiredVersion` values where applicable.

## Future Improvements

- Add automated integration tests for microfrontend loading and routing.
- Add CI/CD pipelines for independent app deployment.
- Introduce a common shared UI library for consistent styling.
- Add build-time validation for remote endpoints and dependency compatibility.
- Implement production-ready error boundaries around remote imports.

---

Built for a scalable microfrontend architecture with independent React + Vite apps and runtime federation.