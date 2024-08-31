FROM node:22-alpine

RUN npm install -g npm@8.12.2

WORKDIR /urs/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]