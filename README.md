# Teste técnico Shopper - Backend

**Objetivo**: Desenvolver um back-end para um sistema de leitura individualizada de consumo de água e gás, utilizando IA para a leitura de medidores através de imagens.

**Tecnologias**: Node.js, TypeScript, Docker, Git, Gemini API.

## Funcionalidades ##

**Upload de imagem:** Receber uma imagem, extrair o valor do medidor utilizando a Gemini API e armazenar os dados.  
**Confirmação de leitura**: Permitir a confirmação ou correção do valor extraído pela IA.  
**Listagem de leituras**: Listar todas as leituras de um determinado cliente, com filtros opcionais por tipo de medida.

## Requisitos ##

**Validação de dados:** Verificar a integridade dos dados de entrada em todos os endpoints.  
**Gerenciamento de erros:** Retornar mensagens de erro claras e informativas.  
**Integração com a Gemini API:** Utilizar a API para extrair o valor da imagem.  
**Armazenamento de dados:** Persistir as informações das leituras em um banco de dados.  
**Dockerização:** Criar um container Docker para a aplicação e um arquivo docker-compose.yml para facilitar a execução.  
**Versionamento:** Utilizar Git para controlar as alterações no código.  
**Variáveis de ambiente:** Utilizar uma variável de ambiente para armazenar a chave da API Gemini.

## Endpoints ##

POST /upload: Recebe uma imagem e retorna o valor extraído pela IA.

PATCH /confirm: Confirma ou corrige o valor de uma leitura.

GET /list: Lista as leituras de um cliente.