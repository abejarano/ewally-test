### [Conheçe o Test practico](https://github.com/abejarano/ewally-test/blob/main/Teste-pratico.pdf)
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
- `docker exec ewally-test npm run test` com docker


```bash
-----------------------------|---------|----------|---------|---------|-------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------|---------|----------|---------|---------|-------------------
All files                    |   98.09 |      100 |   93.54 |   98.09 |                   
 src/Domain                  |    91.3 |      100 |   81.81 |    91.3 |                   
  Exception.ts               |   66.66 |      100 |      50 |   66.66 | 10                
  cpf.validator.ts           |     100 |      100 |     100 |     100 |                   
  person.ts                  |      90 |      100 |   83.33 |      90 | 35                
 src/Domain/exceptions       |     100 |      100 |     100 |     100 |                   
  InvalidCpf.ts              |     100 |      100 |     100 |     100 |                   
  PersonFound.ts             |     100 |      100 |     100 |     100 |                   
  PersonNotFound.ts          |     100 |      100 |     100 |     100 |                   
  RecommendationsNotFound.ts |     100 |      100 |     100 |     100 |                   
 src/applications            |     100 |      100 |     100 |     100 |                   
  AddPerson.ts               |     100 |      100 |     100 |     100 |                   
  CreatedRelationship.ts     |     100 |      100 |     100 |     100 |                   
  Recommendations.ts         |     100 |      100 |     100 |     100 |                   
  SearchPersonByCpf.ts       |     100 |      100 |     100 |     100 |                   
 test                        |     100 |      100 |     100 |     100 |                   
  db.mock.ts                 |     100 |      100 |     100 |     100 |                   
-----------------------------|---------|----------|---------|---------|-------------------
```

### Documentação da API Rest

[`Link Postman`](https://www.postman.com/kapturela/workspace/public/collection/14466939-3874f658-1e9f-47d0-ad6b-ae7e1e812ff4?action=share&creator=14466939)
