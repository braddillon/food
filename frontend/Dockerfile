FROM node:latest

WORKDIR /app 
COPY ./food/package.json /app/
RUN npm install

COPY ./food /app


CMD [ "npm", "run", "build"]

