FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . /app

EXPOSE 8080

ENV MYSQL_ROOT_PASSWORD=pass

ENV MYSQL_DATABASE=user_db

CMD ["npm", "start"]
