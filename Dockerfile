#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

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
