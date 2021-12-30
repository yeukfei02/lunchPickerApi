FROM node:14.18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./ .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start" ]
