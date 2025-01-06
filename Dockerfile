FROM node:20.18

USER root

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com

COPY package*.json ./

COPY ./src ./src

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
