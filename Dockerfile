# Small, modern base
FROM node:20-alpine

# Use the exact pnpm you declared. Enable pnpm globally as root (creates /usr/local/bin/pnpm)
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

# Security: create a non-root user/group
RUN addgroup -S appgrp && adduser -S app -G appgrp

# Workdir owned by non-root
WORKDIR /app
RUN chown app:appgrp /app

# Drop to non-root early
USER app

# Copy only manifests first for better caching
COPY --chown=app:appgrp package.json pnpm-lock.yaml* ./

# Install production deps only
# (If you don't have a lockfile yet, this still works.)
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --frozen-lockfile --prod --no-optional; \
    else \
      pnpm install --prod --no-optional; \
    fi

# Copy the rest of your source
COPY --chown=app:appgrp . .

# App settings
ENV NODE_ENV=production

# Expose your app port (change if your server uses another)
EXPOSE 8080

# (Optional) Healthcheck — uncomment if you have /health
# HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
#   CMD wget -qO- http://127.0.0.1:3000/health || exit 1

# Start your ESM server
CMD ["node", "back-end/server.js"]

