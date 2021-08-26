FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run copy:dashboard

RUN rm -rf src/

EXPOSE 3000

CMD ["npm", "start"]