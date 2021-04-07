FROM node:14-alpine3.13

RUN mkdir -p /app
WORKDIR /app/backend

ADD ./frontend /app/frontend
ADD ./backend /app/backend

RUN apk --no-cache add bash

RUN set -eux; \
    apk --no-cache --virtual .build-deps add git less openssh; \
    \
    cd /app/frontend; \
    yarn install; \
    yarn run build; \
    ls -A | grep -v 'build' | xargs rm -rf; \
    \
    cd /app/backend; \
    yarn install; \
    yarn run build; \
    ls -A | egrep -v "^(build|package|node_modules|sql)" | xargs rm -rf; \
    \
    cd /; \
    rm -rf $(yarn cache dir); \
    apk del .build-deps

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh && ln -s /usr/local/bin/docker-entrypoint.sh /
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3001
