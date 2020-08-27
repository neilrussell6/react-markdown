#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
# Dockerfile for markdown-api
# resource: https://versatile.nl/blog/deploying-lerna-web-apps-with-docker
#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

FROM node:lts

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# --------------------------------
# required packages
# --------------------------------

# Copying the repo's root package.json and installing
# before copying the packages takes advantage of Docker's layered caching mechanism.
# Meaning, that a root npm install will only occur if the root package.json changes
COPY package.json .
RUN npm install --loglevel notice

# --------------------------------
# add docker-compose-wait tool
# --------------------------------

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
