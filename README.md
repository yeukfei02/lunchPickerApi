<p align="center">
  <img width="200px" src="https://github.com/yeukfei02/lunchPickerApi/blob/master/readme-icon.png"><br/>
  <h2 align="center">lunchPickerApi</h2>
</p>

<p align="center">
  <a href="https://travis-ci.com/yeukfei02/lunchPickerApi"><img src="https://travis-ci.com/yeukfei02/lunchPickerApi.svg?branch=master" alt=""></a>
  <a href="https://codecov.io/gh/yeukfei02/lunchPickerApi"><img src="https://codecov.io/gh/yeukfei02/lunchPickerApi/branch/master/graph/badge.svg" alt=""></a>
  <a href="https://discord.gg/YjcunjA"><img src="https://img.shields.io/discord/709269061879595018" alt=""></a>
</p>

If you’re a working software engineer, you’ve probably encountered with one of the toughest questions, where should I have lunch?

Lunch picker is the tool you’ll turn to to answer this question.

documentation: https://documenter.getpostman.com/view/3827865/SzezdXuc?version=latest

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

// run test case
$ yarn run test

// use eslint and prettier to format code
$ yarn run lint
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
$ docker tag <imageId> <dockerHubUserName>/<imageName>:<tag>
```

push docker images to docker hub
```
$ docker push <dockerHubUserName>/<imageName>:<tag>
```

open localhost:3000

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/yeukfei02/lunchPickerApi/blob/master/CONTRIBUTING.md)
