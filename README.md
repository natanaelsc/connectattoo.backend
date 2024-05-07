# Connectattoo

## Descrição

Este repositório contém o código do backend do projeto Connectattoo. O projeto foi desenvolvido utilizando o framework NestJS, que é baseado em NodeJS e Typescript. O banco de dados utilizado é o PostgreSQL.

## Execução

Antes de iniciar, é necessário ter o [Docker Desktop](https://www.docker.com/products/docker-desktop) e o [Git Bash](https://git-scm.com/downloads) instalados.

1. Abra o Git Bash e clone este repositório com o comando a seguir:

    ```bash
    git clone --recurse-submodules https://github.com/connectattoo/connectattoo.backend
    ```

2. Na raiz do projeto, crie um arquivo chamado `.env` semelhante a [.env.example](.env.example) e adicione as variáveis de ambiente necessárias.

    ```bash
    cp .env.exemple .env
    ```

3. Execute o comando para subir os serviços:

    ```bash
    docker compose up -d
    ```

    A porta padrão da API é a 3000, mas pode ser alterada em [.env](.env).

    Aguade a inicialização dos serviços.

4. Execute o comando para parar os serviços e remover rastros:

    ```bash
    docker compose down --remove-orphans --volumes --rmi local
    ```

## Execução (Desenvolvimento)

1. Execute o comando para subir os serviços:

    ```bash
    docker compose -f docker-compose.dev.yml up
    ```

    A porta padrão da API é a 3000, mas pode ser alterada em [.env](.env).

    Aguade a inicialização dos serviços.

    O Adminer pode ser acessado em <http://localhost:8082>. Insera as credenciais abaixo ou as que foram definidas no [.env](.env).

    ```yaml
    Sistema: PostgreSQL
    Servidor: postgres
    Usuario: postgres
    Senha: mQdBpz6yW3zpPOe86gtcfSHgk6zsbVJxsYaTOIq
    Banco de dados: connectattoo
    ```

    Se tiver problemas com o Adminer, tente acessar o banco de dados com o Prisma Studio. Em uma nova guia no terminal, execute:

    ```bash
    docker exec api npx prisma studio
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
