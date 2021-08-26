FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm run build

RUN rm -rf src/

EXPOSE 3000

CMD ["npm", "start"]