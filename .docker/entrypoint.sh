#!/bin/sh

git config --global --add safe.directory /api

git submodule update --init --recursive -f

npm ci

npx prisma generate
npx prisma migrate dev

npm run start:dev
