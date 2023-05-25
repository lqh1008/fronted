FROM node:16.20.0

COPY ./fronted/dist dist

RUN npm run build-only

    
