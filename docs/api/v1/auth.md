# Autenticação

## Autenticação de usuário

### Request

`POST /auth/login`

    Content-Type: application/json
    Body:
    {
      "email": "joãosilva@gmail.com",
      "password": "5fC5gda@"
    }

### Response

    HTTP/1.1 200 OK
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
