FROM postgres:latest

COPY short_urls.sql /docker-entrypoint-initdb.d/init.sql