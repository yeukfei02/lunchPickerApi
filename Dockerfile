FROM node:10.11.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./ .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start" ]
