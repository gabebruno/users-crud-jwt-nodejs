FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

COPY . .

EXPOSE 3000
