FROM anolis-registry.cn-zhangjiakou.cr.aliyuncs.com/openanolis/node:18.17.1-23-minimal

WORKDIR /app

COPY package*.json ./

COPY ./src ./src

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
