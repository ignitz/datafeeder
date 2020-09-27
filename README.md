# Datafeeder

> Niitsuma Yuri <yuriniitsuma@gmail.com>

```
docker-compose -f tests/docker-compose.development.yml up -d --build
```

Create database, if not exist

```
yarn sequelize db:create --env sqlserver
yarn sequelize db:create --env postgres
```

Create table for this test

```
yarn sequelize db:migrate --env sqlserver --config src/config/database.js --migrations-path src/database/migrations/sqlserver
yarn sequelize db:migrate --env postgres --config src/config/database.js --migrations-path src/database/migrations/postgres
```

<!-- ```
yarn sequelize migration:generate \
  --env postgres \
  --name create-tables \
  --migrations-path src/database/migrations/postgres
``` -->

## REST

`TOKEN` is a constant defined by environment variable.

Generate records

- op
  - "create": Only create records
  - "update": Only update records
  - "delete": Will not be implemented
  - if this param is ignored, then will be executed random by probability: created 2/3, update 1/3

```shell
curl --request POST \
  --url http://localhost:3333/api/v1/microservices \
  --header 'authorization: Bearer [TOKEN]' \
  --header 'content-type: application/json' \
  --data '{
	"intervalms": 1000,
	"nrows": 10,
	"op": "create"
}
'
```

Get list of Tasks

```shell
curl --request GET \
  --url http://localhost:3333/api/v1/microservices \
  --header 'authorization: Bearer [TOKEN]'
```

Stop task

```shell
curl --request DELETE \
  --url http://localhost:3333/api/v1/microservices/0 \
  --header 'authorization: Bearer [TOKEN]' \
  --header 'content-type: application/json'
```
