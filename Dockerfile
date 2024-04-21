FROM node:18-alpine AS build

RUN apk --no-cache add git

WORKDIR /api

RUN git clone --recurse-submodules https://github.com/connectattoo/connectattoo.backend .

COPY --chmod=755 tsconfig.json package*.json nest-cli.json .gitmodules ./

COPY --chmod=755 /src ./src

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

RUN npm run build

USER node

FROM node:18-alpine AS production

WORKDIR /api

COPY --from=build /api/node_modules ./node_modules

COPY --from=build /api/dist ./dist

COPY --from=build /api/prisma ./prisma

CMD ["/bin/sh", "-c", "npx prisma migrate deploy;node dist/shared/adapters/prisma/seeds/index.js;node dist/main.js"]
