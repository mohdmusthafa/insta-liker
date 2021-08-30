FROM node:14

WORKDIR /usr/src/build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run copy:dashboard

RUN mkdir /usr/src/app

RUN mv node_modules /usr/src/app/
RUN mv package.json /usr/src/app/

WORKDIR /usr/src/build/dist

RUN mv * /usr/src/app/
WORKDIR /usr/src/app
RUN rm -rf /usr/src/build

EXPOSE 3000

CMD ["npm", "run", "start_docker"]
