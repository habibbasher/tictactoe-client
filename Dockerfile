# Specify base image
FROM node:12-alpine

# Specify working directory in docker container
WORKDIR /app

# install app dependencies
COPY package.json /app 

RUN npm install 

# Copy current directory to docker
COPY . /app

# start app
CMD ["npm", "run", "start"]