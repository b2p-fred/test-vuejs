# my-front, tests for a Vue.js frontend

## Project setup
*Hint*, run 
```shell
$ make info
```
to view all the available commands thanks to make -)

```shell
$ make build
```

Else, you can:
```shell
$ cp .env.dist .env
$ cp docker-compose.override.yml.dist docker-compose.override.yml
$ docker-compose build
```

And then you can configure in the `.env` and `docker-compose.override.yml` files if needed.

### Compiles and hot-reloads for development
```shell
$ make up
# Browse http://localhost:8080
```

### Lints and fixes files / run unit tests
```shell
$ make lint
# e.g. yarn lint

$ make test
# e.g. yarn test
```

### Compiles and minifies for production
```shell
$ make prod
# Get the result in the 'dist' directory
# e.g. yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
