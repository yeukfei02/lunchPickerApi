# lunchPickerApi

If you’re a working software engineer, you’ve probably encountered with one of the toughest questions, where should I have lunch?

Lunch picker is the tool you’ll turn to to answer this question.

### Requirement:
 - install yarn
 - install node (v11+)
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
