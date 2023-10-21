# Connectattoo

## Descrição

Este repositório contém todo o código para o backend do projeto Connectattoo. O projeto foi desenvolvido utilizando o framework NestJS, que é baseado em NodeJS e Typescript. O banco de dados utilizado é o MongoDB.

## Instalando Dependências

```bash
npm install
```

## Executando Projeto

Antes de executar o servidor, é necessário criar um arquivo .env na raiz do projeto baseado no arquivo [.env.example](.env.example) e instalar o [Docker Desktop](https://www.docker.com/products/docker-desktop).

Após isso, execute o comando abaixo para inicializar o banco de dados:

```bash
# Inicializando o banco de dados em container Docker
$ npm run compose:up
```

Voce pode acessar a interface do Mongo Express em: <http://localhost:8081>. As credenciais de acesso são as mesmas definidas no arquivo .env.

Se estiver utilizando o VSCode pode ser instalada a extensão do MongoDB para visualizar os dados do banco de dados.

Execute um dos comandos abaixo para rodar o servidor:

```bash
# Inicializando o servidor
$ npm run start

# Inicializando o servidor em modo de desenvolvimento
$ npm run start:dev
```

## Executando testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
