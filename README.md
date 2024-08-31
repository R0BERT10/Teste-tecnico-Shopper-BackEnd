# Teste técnico Shopper - Backend

**Objetivo**: Desenvolver um back-end para um sistema de leitura individualizada de consumo de água e gás, utilizando IA para a leitura de medidores através de imagens.

**Tecnologias**: Node.js, TypeScript, Docker, Git, Gemini API.

**Instalação:**
1. Clone o repositório: `git clone https://github.com/R0BERT10/Teste-tecnico-Shopper-BackEnd`
2. Instale as dependências: `npm install`   ;
3. Crie um arquivo .env com as configurações do banco de dados (utilizar o arquivo .env.example como referência);

**Execução:**

Execução Docker:
```bash
docker compose up
```

Execução local:
```bash
npm run dev
```

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

Request Body
```
{
 "image": "base64",
 "customer_code": "string",
 "measure_datetime": "datetime",
 "measure_type": "WATER" ou "GAS"
}
```


Response Body:
| Status Code | Descrição | Resposta |
|---|----|--------|
| 200 | Operação realizada com sucesso | { “image_url”: string, “measure_value”:integer, “measure_uuid”: string }|
| 400 | Os dados fornecidos no corpo da requisição são inválidos | { "error_code": "INVALID_DATA", "error_description": <descrição do erro> } |
| 409 | Já existe uma leitura para este tipo no mês atual | { "error_code": "DOUBLE_REPORT", "error_description": "Leitura do mês já realizada" }` |


PATCH /confirm: Confirma ou corrige o valor de uma leitura.

Request Body
```
{
 "measure_uuid": "string",
 "confirmed_value": integer
}
```

Response Body:

| Status Code | Descrição | Resposta |
|------|--------------|--------| 
| 200 | Operação realizada com sucesso | { “success”: true } |
| 400 | Os dados fornecidos no corpo da requisição são inválidos | { "error_code": "INVALID_DATA", "error_description": <descrição do erro> } |
| 404 | Leitura não encontrada | { "error_code": "MEASURE_NOT_FOUND", "error_description": "Leitura do mês já realizada" } |
| 409 | Leitura já confirmada | { "error_code": "CONFIRMATION_DUPLICATE", "error_description": "Leitura do mês já realizada" } |


GET /list: Lista as leituras de um cliente.

Response Body:

| Status Code | Descrição | Resposta |
|-----|------|-------|
| 200 | Operação realizada com sucesso | { “customer_code”:string, “measures”: [ { “measure_uuid”: string, “measure_datetime”: datetime, “measure_type”: string, “has_confirmed”:boolean, “image_url”: string }, { “measure_uuid”: string, “measure_datetime”: datetime, “measure_type”: string, “has_confirmed”:boolean, “image_url”: string } ] } |
| 400 | Parâmetro measure type diferente de WATER ou GAS | { "error_code": "INVALID_TYPE" "error_description": “Tipo de medição não permitida” } |
| 404 | Nenhum registro encontrado | { "error_code": "MEASURES_NOT_FOUND", "error_description": "Nenhuma leitura encontrada" }


## A fazer ##

- Corrigir: Corrigir o `error_description` do erro `MEASURE_NOT_FOUND` do endpoint `/confirm`.  
*Esse erro pode ser facilmente resolvido aterando o valor do enum `ClientErrors` no arquivo `src/util/ResultClientErrors.ts`

- Corrigir: Corrigir erro na comunicação com o `GeminiAIFileManagerProvider` as vezes retorna `ReferenceError: Headers is not defined`.

- Implementar: Continuar implementações de teste unitários nos `services`.

- Implementar: Criar implementações de teste unitários para os `repositories`, `providers`, `entities` e `util`.

- Implementar: Criar teste de integração para toda a aplicação.