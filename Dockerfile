FROM alibaba-cloud-linux-3-registry.cn-hangzhou.cr.aliyuncs.com/alinux3/node:20.16

USER root

WORKDIR /app

COPY package*.json ./

COPY ./src ./src

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
