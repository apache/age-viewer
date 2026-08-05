FROM node:18-alpine

WORKDIR /src

RUN npm install pm2 --no-audit --no-fund

COPY . .

RUN npm run setup

ENV NODE_OPTIONS=--openssl-legacy-provider

CMD ["npm", "run", "start"]

EXPOSE 3000