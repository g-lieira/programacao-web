# Projeto de programação web - back end

Projeto desenvolvido para avaliação da disciplina de programação web, visando aplicar os conceitos e temas abordados em aula. O projeto trata-se da construção de uma API Web back-end.


## Instruções
### 1. inicialização ▶
- Instalar dependências

```
npm install
```
- Arquivo .env para armazenar váriaveis

```
DB_DIALECT = postgres
APP_PORT = 3000
DB_HOST = localhost
DB_NAME = [insira aqui nome do seu bd]
DB_USER = [insira aqui seu usuário]
DB_PASSWORD = [insira aqui sua senha]

JWT_KEY = [chave]
JWT_KEY_ADMIN = [chave]
```
- Inicialização do projeto

```
npm start
```

### 2. Rotas 🗺
- Criação das tabelas no BD e inserção de primeiros registros
```
GET /install
```

- Tabelas de projetos e tarefas


Atenção: somente ADMINS podem alterar, deletar e atualizar.
  
```
POST /projetos
DELETE /projetos/:id
PUT /projetos/:id

POST /tarefas
DELETE /tarefas/:id
PUT /tarefas/:id
```

Listar + paginação, busca individual e busca por relacionamento da tabela projetos.

```
GET /projetos?limite=5&pagina=1
GET /projetos/:id
GET /projetos/:id/tasks

GET /tarefas?limite=5&pagina=1
GET /tarefas/:id
```
> id é o identificador

> Limite trata-se de quantos objetos devem retornar e Pagina onde começa o retorno


- Tabelas de ADMIN e Usuários
  

Atenção: somente ADMINS podem alterar, deletar, atualizar e listar. É preciso inserir o token de admin.
  
```
POST /user
DELETE /user/:id
PUT /user/:id
GET /user

POST /admin
DELETE /admin/:id
PUT /admin/:id
GET /admin
```

Editar suas próprias informações. É preciso inserir o token de usuário.
    
```
PUT /user/edit/:name
```
Login
```
POST /admin/login
POST /user/login
```
