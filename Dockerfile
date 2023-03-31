FROM node:current-alpine

COPY package.json .
RUN npm i
RUN npm i http-server
COPY webpack.config.js .
COPY tsconfig.json .
COPY public public
COPY src src
RUN npm run build

CMD npm run serve