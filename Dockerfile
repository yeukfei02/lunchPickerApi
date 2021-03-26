FROM node:12.21.0-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./ .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start" ]
