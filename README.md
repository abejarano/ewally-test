# Stack
- [`node v16`](https://nodejs.org/) [`express`](https://expressjs.com/)
- [`typescript`](https://www.typescriptlang.org/)
- [`docker`](https://www.docker.com/) [`docker-compose`](https://docs.docker.com/compose/)

### Rodar o projeto com docker

- Para rodar o projeto, é só executar o comando: `docker-compose up` (ambiente de desenvolvimento)
- `docker build . -t ewally-test && docker run --name ewally-test -d ewally-test` (ambiente de produção)

### Rodar o projeto com npm

- Deve ter instalado node v16
- `npm i`
- `npm run dev` (se deseja rodar em ambiente de desenvolvimento)
- `npm run build && npm run start:prod` (ambiente de produção).

### Rodar test

- `npm run test`


### Documentação da API Rest

[`Link Postman`](https://www.postman.com/kapturela/workspace/public/collection/14466939-3874f658-1e9f-47d0-ad6b-ae7e1e812ff4?action=share&creator=14466939)
