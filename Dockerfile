FROM node:16.16.0-alpine

WORKDIR /app

ADD . .

RUN npm i -g npm@latest

RUN npm i -g ts-node

RUN npm ci && npm run build && npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
