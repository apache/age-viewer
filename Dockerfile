FROM node:14-alpine3.13

RUN mkdir -p /app
WORKDIR /app

ADD . /app

RUN ls -al /app

RUN cd /app/frontend && npm install && npm run build && ls | grep -v 'build' | xargs rm
RUN cd /app/backend && npm install && npm run build

COPY docker-entrypoint.sh /usr/local/bin/
RUN ln -s usr/local/bin/docker-entrypoint.sh /
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3001
