# Datafeeder

> Niitsuma Yuri <yuriniitsuma@gmail.com>

Simulação de um microserviço para alimentar, com *inserts* e *updates*, dois banco de dados para gerar mudanças nas tabelas para gerar dados de CDC (Change Data Capture). Os dois banco de dados são um Postgres 12 e um SQL Server 2017.

É necessário possui o [Docker](https://docs.docker.com/get-docker/) e [Docker-compose](https://docs.docker.com/compose/install/) para criar a stack.

## Banco de dados

A stack contém dois banco de dados:

- **SQL Server 2017**: register
  - Banco simula o conteúdo de dados de cadastro do usuário: CPF, nome, email, endereço, companhia
- **Postgres 12**: tracker
  - Banco que contém dados de usuário (CPF, email) e posts contendo textos aleatórios simulando um blog ou mensageria.

## Uso

Copie a variável de ambiente `env_sample` para `.env`. Preencha os seguintes campos:

- **POSTGRES_PASSWORD**: A sua escolha
- **POSTGRES_HOST**: IP ou *hostname* em que o datafeeder tentará conectar, se utilizar o `docker-compose`, utilize o nome do container `postgres`. 
- **SQLSERVER_PASSWORD**: A sua escolha, exige uma senha forte.
- **SQLSERVER_HOST**: IP ou *hostname* em que o datafeeder tentará conectar, se utilizar o `docker-compose`, utilize o nome do container `sqlserver`.
- **COMPOSE_PROJECT_NAME**: `datafeeder`
- **NODE_PATH**: `./src`
- **TOKEN**: A sua escolha. É necessário para passar como autorização para enviar comandos ao `datafeeder`.

Execute o comando abaixo para criar a stack.

```
docker-compose -f tests/docker-compose.development.yml up -d --build
```

O docker do `datafeeder` tentará criar o database e as tabelas necessárias para o funcionamento da Stack. Caso não funcione, execute os comandos abaixo.
Exige `nodejs` instalado com [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/). No exemplo utilizo o **Yarn**.

Criar o banco de dados.

```
yarn sequelize db:create --env sqlserver
yarn sequelize db:create --env postgres
```

Criar as tabelas.

```
yarn sequelize db:migrate --env sqlserver --config src/config/database.js --migrations-path src/database/migrations/sqlserver
yarn sequelize db:migrate --env postgres --config src/config/database.js --migrations-path src/database/migrations/postgres
```

## Ativar microserviço

Para ativar o microserviço para gerar mudanças nos banco de dados, utilizamos uma API REST simplificada para gerar threads
que gerará dados aleatórios utilizando a biblioteca [fakerator](https://www.npmjs.com/package/fakerator) e alimentará os dois banco de dados `register` e `tracker`.

`TOKEN` é uma variável definida no `.env`. Utilize ela como *header* *authorization* no *Bearer token* apesar de não ser necesseriamente um *Bearer token*.

Gerar registros:

- op
  - "create": Only create records
  - "update": Only update records
  - "delete": Will not be implemented
  - if this param is ignored, then will be executed random by probability: created 2/3, update 1/3

Exemplo de task que apenas gera registros.

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

Listar tasks ativas:

```shell
curl --request GET \
  --url http://localhost:3333/api/v1/microservices \
  --header 'authorization: Bearer [TOKEN]'
```

Parar tasks pelo ID:

```shell
curl --request DELETE \
  --url http://localhost:3333/api/v1/microservices/0 \
  --header 'authorization: Bearer [TOKEN]' \
  --header 'content-type: application/json'
```

## Disclaimer

Este é um módulo funcional, como não é um componente importante para a demonstração então não possui testes automatizados.