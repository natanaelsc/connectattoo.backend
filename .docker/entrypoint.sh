#!/bin/sh
git config --global --add safe.directory /api

git submodule update --init --recursive -f

npm ci

npx prisma generate
npx prisma migrate deploy

npm run seed

npm run start:dev
