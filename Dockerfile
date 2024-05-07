ARG BASE=node:18-alpine3.19

FROM ${BASE} AS development

RUN apk update && apk --no-cache add git

WORKDIR /api

COPY --chmod=755 package*.json ./

COPY --chmod=755 .husky ./.husky

COPY --chmod=755 .git[t] ./.git

RUN if [ -d .git ]; then git submodule update --init --recursive ; fi

RUN npm ci --ignore-scripts --omit=optional

USER node

FROM ${BASE} AS build

WORKDIR /api

COPY --chmod=755 . .

COPY --chmod=755 --from=development /api/node_modules ./node_modules

COPY --chmod=755 tsconfig.json package*.json nest-cli.json ./

COPY --chmod=755 /src ./src

RUN npx prisma generate

RUN npm run build

RUN npm prune --ignore-scripts --omit=dev && \
    rm -rf node_modules/.cache && \
    npm cache clean --force

USER node

FROM ${BASE} AS production

WORKDIR /api

COPY --chmod=755 --from=build /api/node_modules ./node_modules

COPY --chmod=755 --from=build /api/dist ./dist

COPY --chmod=755 --from=build /api/prisma ./prisma

COPY --chmod=755 --from=build /api/package.json ./

USER node

CMD [ "/bin/sh", "-c", "npx prisma migrate deploy;npm run seed;npm run start:prod" ]
