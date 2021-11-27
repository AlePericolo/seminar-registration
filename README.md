# Seminar-registration

## Dependency Installation

```sh
$ git clone https://github.com/AlePericolo/seminar-registration.git
$ cd seminar-registration
$ npm i
```

## Common Scripts

```sh
$ npm run build
```

### Nginx Serve

```sh
$ docker build -t seminar-registration .
$ docker run -d --name seminar-registration-fe -p 8080:80 seminar-registration  
```

## Frontend Preview

http://localhost:8080/