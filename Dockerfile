# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace manifests for layer caching
COPY package.json package-lock.json ./
COPY auth-app/package.json ./auth-app/
COPY host-app/package.json ./host-app/
COPY main-app/package.json ./main-app/
COPY packages/shared/package.json ./packages/shared/
COPY packages/ui/package.json ./packages/ui/

# Install all dependencies
RUN npm ci

# Copy source files
COPY packages/ ./packages/
COPY auth-app/ ./auth-app/
COPY main-app/ ./main-app/
COPY host-app/ ./host-app/

# Build target environment: dev | uat | prod (default: prod)
ARG BUILD_ENV=prod

# Build micro-frontend remotes in parallel, then host (packages/shared and packages/ui
# are source-only — Vite bundles them inline, no separate build step needed)
RUN npm --workspace auth-app run build:${BUILD_ENV} && \
    npm --workspace main-app run build:${BUILD_ENV} && \
    npm --workspace host-app run build:${BUILD_ENV}

# Stage 2: Production server
FROM nginx:1.25-alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static assets from builder
COPY --from=builder /app/host-app/dist /usr/share/nginx/html
COPY --from=builder /app/auth-app/dist /usr/share/nginx/html/auth
COPY --from=builder /app/main-app/dist /usr/share/nginx/html/main

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
