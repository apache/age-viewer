FROM node:14-alpine3.13

RUN mkdir -p /app
WORKDIR /app

ADD . /app

RUN apk --no-cache add git less openssh bash
RUN cd /app/frontend && npm install && npm run build && ls | grep -v 'build' | xargs rm -rf
RUN cd /app/backend && npm install && npm run build

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh && ln -s /usr/local/bin/docker-entrypoint.sh /
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3001
