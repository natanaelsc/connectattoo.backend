FROM node:18-alpine AS dependencies

WORKDIR /api

COPY --chown=node:node package*.json ./

RUN npm ci

USER node

#####################

FROM node:18-alpine AS build

WORKDIR /api

COPY --chown=node:node --from=dependencies /api/node_modules ./node_modules

COPY --chown=node:node tsconfig.json package*.json nest-cli.json ./

COPY --chown=node:node /src ./src

COPY --chown=node:node /prisma ./prisma/

RUN npx prisma generate

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

#####################

FROM node:18-alpine AS production

WORKDIR /api
COPY --chown=node:node --from=build /api/node_modules ./node_modules
COPY --chown=node:node --from=build /api/dist ./dist
COPY --chown=node:node --from=build /api/prisma ./prisma
COPY --chown=node:node --from=build /api/package*.json ./

CMD ["/bin/sh", "-c", "npx prisma migrate deploy;node dist/main.js"]