# syntax=docker/dockerfile:1
FROM node:20.20.1-alpine3.23

WORKDIR /src

COPY . .

RUN npm run setup

CMD ["npm", "run", "start"]

EXPOSE 3000