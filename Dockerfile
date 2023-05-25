FROM node:16.20.0

COPY fronted fronted

RUN npm run build-only

    
