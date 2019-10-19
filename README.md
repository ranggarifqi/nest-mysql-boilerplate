<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

API Server Boilerplate with Typescript. Similiar to Loopback 4 but more understandable.

You can extend this boilerplate with your own code.

### Features
1. `.env` config
2. MySQL using `TypeORM`
3. Swagger / OpenAPI Documentation
4. Node mailer
5. Passport Authentication with JWT Strategy
6. `Handlebars` view engine
7. Unit Testing
8. Access Control List (Authorization)
9. Seeder

## Installation

```bash
$ npm install
```

## Environment Setup
1. Copy `.env.example` file
2. Paste as `.env`
3. Fill it with your own configurations

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seed Starting Data (roles, etc)
You need to run the app first to automatically create the DB tables.
```bash
$ npm run seed
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Rangga Rifqi Pratama](https://ranggarifqi.com)
- LinkedIn - [My LinkedIn](https://www.linkedin.com/in/ranggarifqi)
- Email - [Contact Me](mailto:rangga@ranggarifqi.com)

## License

  Nest is [MIT licensed](LICENSE).
