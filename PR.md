# Teste Engenharia Web

Este projeto consiste numa aplicação web feita para o teste da Unidade Curricular de
Engenharia Web.

## Requisitos

Antes de executar o projeto, certifica-te de que tens os seguintes requisitos instalados:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)

## Instalação

1. **Clonar o repositório**

   ```sh
   git clone https://github.com/JoseMatos03/ENGWEB2025-Normal.git
   ```

2. **Instalar as dependências**

   ```sh
   npm i
   ```

3. **Configurar o banco de dados**

Como pré requisito é necessário criar um fichiro `.env` na raiz do projeto. Esse ficheiro deve conter as seguintes VARIÁVEIS:

    - `DATABASE` // O nome da database pedida no enuciado.

    - `MONGO_PORT` // A porta no qual a base de dados MongoDB está a escuta.

    - `BACKEND_PORT`// A porta pedida no EX1

    - `FRONTEND_PORT`// A porta pedida no EX2

Existe um ficheiro exemplo `dotenv` que contêm valores default para essas variaveis.

4. **Executar a aplicação**

   ```sh
   npm start
   ```

NOTA: O comando `npm start` utiliza o comando `docker compose`. Verifique que o tem instalado.

## Estrutura do projeto

Dentro da diretoria `ex1`, estão as resoluções do primeiro exercício focado na backend do programa. Nele está também o ficheiro `queries.txt` com a resolução da pergunta 1.2.
Dentro da diretoria `ex2`, está a resolução do frontend utilizando a API de dados feita no exercício 1.
O dataset esta na diretoria `datasets` e contem o dataset, o script utilizado para o corrigir e um ficheiro .txt a descrever as suas mudanças.

## Notas adicionais

O script `init-mongo.sh` é copiado para o docker e executado sempre, importando automaticamente a base de dados para a base de dados mongodb.
