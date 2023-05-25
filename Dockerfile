FROM node:16.20.0

ADD fronted ./app

RUN npm run build-only

    
