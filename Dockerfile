FROM nginx:latest

COPY ./dist nginx.conf target/

RUN apt-get update && \
    apt-get install -y vim && \
    cd etc/nginx && \
    mv ../../target/dist/ www && \
    mv nginx.conf nginx.conf.last && \
    mv ../../target/nginx.conf nginx.conf && \
    service nginx restart
    

