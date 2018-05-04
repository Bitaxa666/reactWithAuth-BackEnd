# In pull Docker instance.
FROM node:8.11.1

#Node and npm version
RUN node -v
RUN npm -v

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn
#ENV http_proxy 172.17.0.2:8099 - add proxy host:port

# Run serve when the image is run.
CMD ./node_modules/.bin/http-server build -p 5013

#dele node_module
RUN ls -alt

# Let Docker know about the port that serve runs on 5013.
EXPOSE 5013

# Install all dependencies of the current project.
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

# In your Dockerfile.
COPY . .

# In your Dockerfile.
RUN yarn run build

#Install an HTTP server for running the application
RUN yarn add http-server -D
