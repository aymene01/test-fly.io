# Stage 1: Build the application
FROM node:22-alpine3.20 AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Stage 2: Create a production-ready image
FROM node:22-alpine3.20 AS production

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

RUN pnpm install --prod

EXPOSE 3000

CMD ["node", "dist/index.js"]
