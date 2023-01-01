FROM node:14-alpine3.16

RUN npm install pm2

WORKDIR /src

COPY . .

RUN npm run setup

CMD ["npm", "run", "start"]

EXPOSE 3000