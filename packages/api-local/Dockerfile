#==================================
# Dokerfile for api-local
# resource: https://versatile.nl/blog/deploying-lerna-web-apps-with-docker
#==================================

FROM node:12.18.2-alpine3.11

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
# serve
# --------------------------------

EXPOSE 7000
