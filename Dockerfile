# In pull Docker instance.
FROM node:8.11.1

#Create folder fro backend
RUN mkdir -p /usr/src/backend

#Node and npm version
RUN node -v
RUN npm -v

#add bcrypt
RUN npm install node-gyp -g
#RUN npm install bcrypt -g
RUN apt-get update

# Install all dependencies of the current project.
COPY package.json /usr/src/backend/package.json
COPY yarn.lock /usr/src/backend/yarn.lock

#set workdir
WORKDIR /usr/src/backend/

#dele node_module
RUN ls -alt

# In your Dockerfile.
COPY . /usr/src/backend/

#update environment
RUN yarn
RUN npm rebuild

#update project file
RUN apt-get update

# Let Docker know about the port that serve runs on 5013.
EXPOSE 8099

# Run serve when the image is run.
CMD yarn start