FROM node:12

WORKDIR /app

COPY package.json /app/package.json

RUN npm install -g nodemon
RUN npm install

CMD [ "nodemon", "-L", "./bin/www"]
