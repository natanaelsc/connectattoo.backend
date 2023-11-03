# Tatuando

## Cadastro de usuário

### Request

`POST /api/v1/users/client`

    Content-Type: application/json
    Body:
    {
      "name": "João Silva",
      "email": "joãosilva@gmail.com"
      "password": "5fC5gda@"
      "birthDate": "1990-10-08"
    }

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 252
    ETag: W/"fc-3VDjlVN3QUS5aikTzBBoyRjpNFA"
    Date: Fri, 03 Nov 2023 12:38:53 GMT
    Connection: close

    {
      "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NTQ0ZTkyZWJkNmVhNDU0NTNjZjY2NmYiLCJleHAiOiIxNjk5MDE3MDYyIiwidHlwZSAiOiJjbGllbnQiLCJpYXQiOiIxNjk5MDE1MjYyIiwiZW1haWwiOiJqb8Ojb3NpbHZhQGdtYWlsLmNvbSJ9.ZUT-L3sdOfRQ1CCtLfPvVPff7lOT0oI5uKnYrYDnSBU"
    }
