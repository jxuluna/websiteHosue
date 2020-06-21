FROM node:10-alpine

COPY . /app

WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 8080

CMD ["npm","run","dev"]