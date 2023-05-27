# FROM node:16.20.0

# COPY ./fronted/dist dist

# RUN npm run build-only



FROM nginx:latest

COPY ./dist dist
COPY nginx.conf nginx.conf

RUN apt-get update && \
    apt-get install -y vim && \
    cd etc/nginx && \
    mv ../../dist www && \
    mv nginx.conf nginx.conf.last && \
    mv ../../nginx.conf nginx.conf && \
    service nginx restart
    

