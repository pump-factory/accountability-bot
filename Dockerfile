# syntax=docker/dockerfile:1

FROM node:current-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
ADD . .
EXPOSE 3000

RUN npm run build
CMD ["node", "dist/server.js"]
