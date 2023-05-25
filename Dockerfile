FROM node:16.20.0

COPY dist dist

RUN npm run build-only

    
