FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build

WORKDIR /app
ARG NEXT_DEPLOYMENT_ID=local
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_DEPLOYMENT_ID=${NEXT_DEPLOYMENT_ID}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime

WORKDIR /app
ARG NEXT_DEPLOYMENT_ID=local
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_DEPLOYMENT_ID=${NEXT_DEPLOYMENT_ID}

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
