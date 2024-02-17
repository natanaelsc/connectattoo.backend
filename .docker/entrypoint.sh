#!/bin/sh

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

git submodule update --init --recursive

npm ci

npx prisma generate
npx prisma migrate dev

npm run start:dev
