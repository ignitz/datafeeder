escolher genero

nome m ou F

id, userId, nome, genero, idade, endereco, createdAt

```
yarn sequelize db:create
```

dois databases

um database com cadastro e dados dos usuarios

umm com username e dados de rastreio

criar um alimentador de dados padrão e simples
settimeout parametrizado para criar os dados nos databases
distribuir os dados probabiliscamente para simular falta de dasoe trenas tabela
criar um terceiro database que vai representar os dados que eu quero no final.

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

```js
{
  country: 'Mauritania',
  countryCode: 'MR',
  state: 'North Carolina',
  city: 'Kristophermouth',
  street: '623 Faye Ramp Apt. 675',
  zip: '44060-0413',
  geo: { latitude: -76.9092, longitude: -88.663 }
}
```

```shell
FILE=.env
if [ -f "$FILE" ]; then
    source $FILE
fi

ENVIRONMENT=development
SEQUELIZECLI="yarn sequelize"

DATABASE=sqlserver

$SEQUELIZECLI model:generate --name User \
  --attributes firstName:string,lastName:string,email:string \
  --env $ENVIRONMENT \
  --config $NODE_PATH/config/database/$DATABASE.js \
  --models-path $NODE_PATH/models/$DATABASE \
  --migrations-path $NODE_PATH/database/migrations/$DATABASE \
  --seeders-path $NODE_PATH/database/seeders/$DATABASE
```

```shell
FILE=.env
if [ -f "$FILE" ]; then
    source $FILE
fi

ENVIRONMENT=development
SEQUELIZECLI="yarn sequelize"

DATABASE=sqlserver

yarn sequelize db:migrate \
  --env $ENVIRONMENT \
  --config $NODE_PATH/config/database/$DATABASE.js \
  --models-path $NODE_PATH/models/$DATABASE \
  --migrations-path $NODE_PATH/database/migrations/$DATABASE \
  --seeders-path $NODE_PATH/database/seeders/$DATABASE
```
