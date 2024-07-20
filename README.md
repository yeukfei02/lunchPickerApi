<p align="center">
  <img width="200px" src="https://github.com/yeukfei02/lunchPickerApi/blob/master/readme-icon.png"><br/>
  <h2 align="center">lunchPickerApi</h2>
</p>

<p align="center">
  <a href="https://codecov.io/gh/yeukfei02/lunchPickerApi"><img src="https://codecov.io/gh/yeukfei02/lunchPickerApi/branch/master/graph/badge.svg" alt=""></a>
  <a href="https://discord.gg/YjcunjA"><img src="https://img.shields.io/discord/709269061879595018" alt=""></a>
</p>

If you’re a working software engineer, you’ve probably encountered with one of the toughest questions, where should I have lunch?

Lunch picker is the tool you’ll turn to to answer this question.

documentation: <https://documenter.getpostman.com/view/3827865/SzezdXuc?version=latest>

api url: <https://www.lunch-picker-api.com/>

react admin url: <https://lunch-picker-admin.vercel.app/>

```text
username: admin@admin.com
password: admin
```

## Requirement

- install yarn
- install node (v16)
- install mongodb

## Testing and run

```zsh
$ yarn

// development
$ yarn run dev

// production
$ yarn run start

// run test case
$ yarn run test

// lint code
$ yarn run lint

// format code
$ yarn run format
```

## Docker

```zsh
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
