FROM node:18.18.2-alpine

RUN apk update && apk add bash

COPY . /app
WORKDIR /app

COPY package*.json .
RUN npm install


CMD ["npm","run","start"]
