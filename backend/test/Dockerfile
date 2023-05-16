
FROM postgres:11-buster

RUN apt-get update 
RUN apt-get install --assume-yes --no-install-recommends --no-install-suggests \
  bison \
  build-essential \
  flex \
  ca-certificates\
  git \
  postgresql-server-dev-11 
RUN git clone https://github.com/apache/age.git
RUN cd /age && make install 

COPY docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/
EXPOSE 5432
CMD ["postgres", "-c", "shared_preload_libraries=age"]