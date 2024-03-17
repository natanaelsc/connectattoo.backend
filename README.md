# Connectattoo

## Descrição

Este repositório contém todo o código para o backend do projeto Connectattoo. O projeto foi desenvolvido utilizando o framework NestJS, que é baseado em NodeJS e Typescript. O banco de dados utilizado é o PostgreSQL.

## Execução

Antes de iniciar, é necessário instalar o [Docker Desktop](https://www.docker.com/products/docker-desktop) e criar o arquivo .env na raiz do projeto baseado no arquivo [.env.example](.env.example).

1. Execute o comando para subir os serviços:

    ```bash
    docker compose up -d
    ```

    A porta padrão da API é a 3000. Voce pode alterar a porta no arquivo [.env](.env).

    Aguade a inicialização dos serviços.

2. Execute o comando para parar os serviços e remover rastros:

    ```bash
    docker compose down --remove-orphans --volumes --rmi local
    ```

## Execução (Desenvolvimento)

1. Execute o comando para subir os serviços:

    ```bash
    docker compose -f docker-compose.dev.yml up
    ```

    Aguade a inicialização dos serviços.

    A porta padrão da API é a 3000. Voce pode alterar a porta no arquivo [.env](.env).

    Você pode acessar o Adminer em: <http://localhost:8082> e inserir as seguintes credenciais:

    ```yaml
    Sistema: PostgreSQL
    Servidor: postgres
    Usuario: postgres
    Senha: mQdBpz6yW3zpPOe86gtcfSHgk6zsbVJxsYaTOIq
    Banco de dados: connectattoo
    ```

2. Execute o comando para parar os serviços e remover rastros:

    ```bash
    docker compose -f docker-compose.dev.yml down --remove-orphans --volumes --rmi local
    ```

## [Possíveis Erros na Inicialização](/docs/erros-na-inicializacao.md)

## Executando testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
