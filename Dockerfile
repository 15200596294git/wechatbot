FROM anolis-registry.cn-zhangjiakou.cr.aliyuncs.com/openanolis/node:latest

WORKDIR /app

COPY package*.json ./

COPY ./src ./src

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]