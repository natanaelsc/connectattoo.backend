# Erros na inicialização

## Windows

### `"exec .docker/entrypoint.sh: no such file or directory"`

Essa mensagem de erro pode ocorrer caso você esteja utilizando o Windows e o arquivo `entrypoint.sh` esteja com quebra de linha no formato `CRLF`. Para corrigir, abra o arquivo no Visual Studio Code e clique no canto inferior direito, onde está escrito `CRLF`, e selecione `LF`. Salve o arquivo e tente subir os serviços novamente.

1. Execute o comando para parar os serviços e remover rastros

    ```bash
    docker compose -f docker-compose.dev.yml down --remove-orphans --volumes --rmi local
    ```

2. Execute o comando para subir os serviços

    ```bash
    docker compose -f docker-compose.dev.yml up
    ```
