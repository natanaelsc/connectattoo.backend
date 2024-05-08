#!/bin/sh

git submodule update --init --recursive -f

npx prisma generate

npx prisma migrate deploy

npx ts-node src/shared/adapters/prisma/seeds/index.ts

npm run start:dev
