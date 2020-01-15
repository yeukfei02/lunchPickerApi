# lunchPickerApi

[![Build Status](https://travis-ci.com/yeukfei02/lunchPickerApi.svg?branch=master)](https://travis-ci.com/yeukfei02/lunchPickerApi)
[![codecov](https://codecov.io/gh/yeukfei02/lunchPickerApi/branch/master/graph/badge.svg)](https://codecov.io/gh/yeukfei02/lunchPickerApi)
[![Join the chat at https://gitter.im/lunchPickerApi/community](https://badges.gitter.im/lunchPickerApi/community.svg)](https://gitter.im/lunchPickerApi/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

If you’re a working software engineer, you’ve probably encountered with one of the toughest questions, where should I have lunch?

Lunch picker is the tool you’ll turn to to answer this question.

## Requirement:
 - install yarn
 - install node (v12+)
 - install mongodb

## Testing and run:
```
$ yarn

// development
$ yarn run dev

// production
$ yarn run start
```

## Docker:

- Dockerfile

build images and start container
```
docker build -t <username>/lunch-picker-api:<tag> .
docker run -p 3000:3000 -d <username>/lunch-picker-api:<tag>
docker exec -it <containerId> /bin/bash
docker logs <containerId>
```

check images and container
```
docker images
docker ps
docker ps -a
```

open localhost:3000

- docker-compose.yml

build images and start container
```
docker-compose build
docker-compose up
```
build images and start container in one line
```
docker-compose up -d --build
```

stop container
```
docker-compose stop
```

add tag to docker images
```
$ docker tag <imageId> <username>/lunch-picker-api:<tag>
```

open localhost:3000
