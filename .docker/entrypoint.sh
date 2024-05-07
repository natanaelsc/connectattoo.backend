#!/bin/sh

git submodule update --init --recursive -f

npx prisma generate

npx prisma migrate deploy

npm run seed

npm run start:dev
