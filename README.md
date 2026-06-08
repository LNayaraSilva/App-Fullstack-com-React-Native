# App Fullstack com React Native

Aplicativo mobile para cadastro e gerenciamento de agendamentos de serviços de refrigeração. O app permite listar, criar, editar e excluir agendamentos consumindo uma API hospedada no Render.

## Funcionalidades

- Cadastro de cliente com nome, endereço e telefone
- Seleção do tipo de serviço por lista de opções
- Seleção de data e horário sem digitação manual
- Campo de observação para detalhes adicionais
- Listagem dos agendamentos cadastrados
- Edição e exclusão de agendamentos
- Integração com API externa

## Tecnologias

- React Native
- Expo SDK 54
- React 19
- JavaScript
- API REST
- Render

## API

O aplicativo está conectado à API:

```txt
https://backend-agenda-refrigeracao-fullstack.onrender.com
```

Endpoint utilizado para os agendamentos:

```txt
https://backend-agenda-refrigeracao-fullstack.onrender.com/api/entries
```

Operações usadas no app:

- `GET /api/entries` - listar agendamentos
- `POST /api/entries` - criar agendamento
- `PUT /api/entries/:id` - atualizar agendamento
- `DELETE /api/entries/:id` - excluir agendamento

## Pré-requisitos

Antes de começar, instale:

- Node.js
- npm
- Expo Go no celular

## Como executar

Clone o repositório:

```bash
git clone https://github.com/LNayaraSilva/App-Fullstack-com-React-Native.git
```

Acesse a pasta do projeto:

```bash
cd App-Fullstack-com-React-Native
```

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npm start
```

Depois, escaneie o QR Code com o Expo Go.

## Scripts disponíveis

```bash
npm start
```

Inicia o servidor de desenvolvimento do Expo.

```bash
npm run android
```

Abre o projeto no Android.

```bash
npm run ios
```

Abre o projeto no iOS.

```bash
npm run web
```

Abre o projeto no navegador.

## Estrutura principal

```txt
app-refrigeracao-mobile/
|-- App.js
|-- app.json
|-- index.js
|-- package.json
|-- package-lock.json
`-- assets/
```

## Observação

O projeto utiliza Expo SDK 54. Caso apareça erro de incompatibilidade no Expo Go, atualize o aplicativo Expo Go no celular ou confirme se as dependências estão corretas com:

```bash
npx expo install --check
```

## Licença

Este projeto está sob a licença MIT.
