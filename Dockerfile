FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/dist ./dist
COPY --from=build /app/api ./api
COPY --from=build /app/server.mjs ./server.mjs
COPY package.json ./

EXPOSE 3000

CMD ["node", "server.mjs"]
