FROM node:10
MAINTAINER Narendra
WORKDIR /home/node/app
COPY package.json /home/node/app
RUN npm install
COPY . /home/node/app
CMD npm start
EXPOSE 3000
