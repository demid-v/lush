FROM mysql:8

WORKDIR /db

COPY ./dump/dump.sql /docker-entrypoint-initdb.d
