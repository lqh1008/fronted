# FROM node:16.20.0

# COPY ./fronted/dist dist

# RUN npm run build-only



FROM nginx:latest

COPY ./dist dist

RUN apt-get update && \
    apt-get install vim
