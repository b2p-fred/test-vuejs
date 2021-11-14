ARG TAG_NODEJS=14
ARG TAG_NGINX=1.20
ARG VERSION=beta
ARG VUE_UI_HOST=0.0.0.0
ARG VUE_UI_PORT=8000

# -----
# Using the Node base image
FROM node:${TAG_NODEJS}-slim AS node

LABEL com.description="eProtocole Web client application - development"
LABEL com.version="${VERSION}"
LABEL com.authors="B2P Web"

EXPOSE 8000/tcp
EXPOSE 8080/tcp

ENV \
    NODE_ENV=development \
    NODE_USER=node \
    HOST=$VUE_UI_HOST \
    VUE_UI_HOST=$VUE_UI_HOST \
    VUE_UI_PORT=$VUE_UI_PORT

# Current user identifier & application directory ownership
# For alpine images:
# RUN deluser www-data && adduser -DH -h /home/www-data -s /sbin/nologin -u 1000 www-data
RUN usermod -u 1000 $NODE_USER &&\
    groupmod -g 1000 $NODE_USER &&\
    usermod -a -G $NODE_USER root &&\
    mkdir -p /app &&\
    chown -R "$NODE_USER:$NODE_USER" /app

# Hint: Copy package.json, and yarn.lock only if it exists ;)
COPY package.json yarn.loc[k] /app

WORKDIR /app

# Install application dependencies
RUN set -eux &&\
    # Install Vue-js cli
    yarn global add @vue/cli@4.5.13

COPY --chown="$NODE_USER:$NODE_USER" . .

# Build for production
RUN set -eux &&\
    # Install application dependencies
    yarn install --non-interactive

RUN set -eux &&\
    # Build application for production
    yarn build

USER ${NODE_USER}

COPY ./docker/frontend/build/node_docker-entrypoint.sh /

ENTRYPOINT [ "/node_docker-entrypoint.sh" ]
CMD [ "yarn", "serve" ]

# -----
# For production environment
# -----
FROM nginx:${TAG_NGINX}-alpine as nginx

LABEL com.description="eProtocole Web client application - production"
LABEL com.version="${VERSION}"
LABEL com.authors="B2P Web"

EXPOSE 80/tcp

# Copy the different available configurations
COPY ./docker/frontend/build/default.conf /etc/nginx/conf.d/
COPY ./docker/frontend/build/gzip.conf /etc/nginx/conf.d/

# Copy the built application from the node container
COPY --from=node /app/dist /usr/share/nginx/html
