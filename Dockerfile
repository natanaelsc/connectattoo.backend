FROM node:18-alpine AS build

RUN apk --no-cache add git

WORKDIR /api

COPY --chown=node:node . .

RUN git config --global --add safe.directory /api \
  && git submodule update --init --recursive

ENV NODE_ENV production

RUN npm ci --omit=dev && npm cache clean --force

RUN npm run build

USER node

FROM node:18-alpine AS production

WORKDIR /api

COPY --chown=node:node --from=build /api/node_modules ./node_modules

COPY --chown=node:node --from=build /api/dist ./dist

COPY --chown=node:node --from=build /api/prisma ./prisma

CMD ["/bin/sh", "-c", "npx prisma migrate deploy;node dist/main.js"]
