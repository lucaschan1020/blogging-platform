FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm run migration:build

FROM node:alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --production && npm cache clean --force
COPY typeorm.config.js ./
COPY --from=builder ./usr/src/app/dist ./
CMD ["node", "./src/main.js"]