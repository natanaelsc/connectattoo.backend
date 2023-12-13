# Connectattoo

## Descrição

Este repositório contém todo o código para o backend do projeto Connectattoo. O projeto foi desenvolvido utilizando o framework NestJS, que é baseado em NodeJS e Typescript. O banco de dados utilizado é o PostgreSQL.

## Executando Projeto

Antes de executar a api, é necessário criar um arquivo .env na raiz do projeto baseado no arquivo [.env.example](.env.example) e instalar o [Docker Desktop](https://www.docker.com/products/docker-desktop).

Execute o comando para subir os serviços:

```bash
docker compose up -d
```

Execute o comando para parar os serviços e remover rastros:

```bash
docker compose down --remove-orphans --volumes --rmi local
```

## Executando Projeto (Desenvolvimento)

Execute o comando para subir os serviços:

```bash
docker compose -f docker-compose.dev.yml up
```

Recomendo não utilizar `-d` para que você possa ver os logs dos serviços.

Mas caso queira, execute o comando para ver os logs:

```bash
docker compose -f docker-compose.dev.yml logs -f
```

Execute o comando para parar os serviços e remover rastros:

```bash
docker compose -f docker-compose.dev.yml down --remove-orphans --volumes --rmi local
```

A porta padrão da API é a 3000.

Voce pode acessar o BDeaver em: <http://localhost:8978>.

## Executando testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
