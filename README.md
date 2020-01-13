# lunchPickerApi

[![Build Status](https://travis-ci.com/yeukfei02/lunchPickerApi.svg?branch=master)](https://travis-ci.com/yeukfei02/lunchPickerApi)
[![codecov](https://codecov.io/gh/yeukfei02/lunchPickerApi/branch/master/graph/badge.svg)](https://codecov.io/gh/yeukfei02/lunchPickerApi)
[![Join the chat at https://gitter.im/lunchPickerApi/community](https://badges.gitter.im/lunchPickerApi/community.svg)](https://gitter.im/lunchPickerApi/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/yeukfei02/lunchPickerApi)
![GitHub repo size](https://img.shields.io/github/repo-size/yeukfei02/lunchPickerApi)

![GitHub issues](https://img.shields.io/github/issues/yeukfei02/lunchPickerApi)
![GitHub closed issues](https://img.shields.io/github/issues-closed/yeukfei02/lunchPickerApi)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yeukfei02/lunchPickerApi)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/yeukfei02/lunchPickerApi)
![GitHub last commit](https://img.shields.io/github/last-commit/yeukfei02/lunchPickerApi)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/yeukfei02/lunchPickerApi)

If you’re a working software engineer, you’ve probably encountered with one of the toughest questions, where should I have lunch?

Lunch picker is the tool you’ll turn to to answer this question.

### Requirement:
 - install yarn
 - install node (v12+)
 - install mongodb

### Testing and run:
```
$ yarn

// development
$ yarn run dev

// production
$ yarn run start
```

### Docker:

- Dockerfile

build images and start container
```
docker build -t <username>/lunchPicker .
docker run -p 3000:3000 -d <username>/lunchPicker
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

open localhost:3000
