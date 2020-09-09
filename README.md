<p align="center">
    <img src="https://github.com/yeukfei02/lunchPickerApi/blob/master/readme-icon.png" width="200" height="200">
</p>

# lunchPickerApi

[![Build Status](https://travis-ci.com/yeukfei02/lunchPickerApi.svg?branch=master)](https://travis-ci.com/yeukfei02/lunchPickerApi)
[![codecov](https://codecov.io/gh/yeukfei02/lunchPickerApi/branch/master/graph/badge.svg)](https://codecov.io/gh/yeukfei02/lunchPickerApi)
[![Discord](https://img.shields.io/discord/709269061879595018)](https://discord.gg/YjcunjA)

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

```
// build images and start container in one line
docker-compose up -d --build

// go inside container
docker exec -it <containerId> /bin/bash

// check container logs
docker logs <containerId>

// remove and stop container
docker-compose down
```

open localhost:3000

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/yeukfei02/lunchPickerApi/blob/master/CONTRIBUTING.md)
