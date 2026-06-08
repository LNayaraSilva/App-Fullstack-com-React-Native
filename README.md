# 📱 App Fullstack com React Native

Aplicativo mobile para cadastro e gerenciamento de agendamentos de serviços de refrigeração. O app permite listar, criar, editar e excluir agendamentos consumindo uma API própria hospedada no Render.

---

## 🚀 Funcionalidades

* Cadastro de cliente com nome, endereço e telefone
* Seleção do tipo de serviço por lista de opções
* Seleção de data e horário sem necessidade de digitação manual
* Campo de observação para detalhes adicionais
* Listagem dos agendamentos cadastrados
* Edição de agendamentos
* Exclusão de agendamentos
* Integração com API REST

---

## 🛠️ Tecnologias Utilizadas

* React Native
* Expo SDK 54
* React 19
* JavaScript
* API REST
* Render

---

## 🌐 API

O aplicativo está conectado à API:

```txt
https://backend-agenda-refrigeracao-fullstack.onrender.com
```

Endpoint utilizado para os agendamentos:

```txt
https://backend-agenda-refrigeracao-fullstack.onrender.com/api/entries
```

### Operações utilizadas

| Método | Endpoint         | Descrição             |
| ------ | ---------------- | --------------------- |
| GET    | /api/entries     | Listar agendamentos   |
| POST   | /api/entries     | Criar agendamento     |
| PUT    | /api/entries/:id | Atualizar agendamento |
| DELETE | /api/entries/:id | Excluir agendamento   |

---

## 📋 Pré-requisitos

Antes de iniciar o projeto, instale:

* Node.js
* npm
* Expo Go (Android ou iOS)

---

## ▶️ Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/LNayaraSilva/App-Fullstack-com-React-Native.git
```

### 2. Acessar a pasta do projeto

```bash
cd App-Fullstack-com-React-Native
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar o projeto

```bash
npm start
```

Após iniciar o Expo, escaneie o QR Code utilizando o aplicativo Expo Go.

---

## 📜 Scripts disponíveis

### Iniciar Expo

```bash
npm start
```

### Executar Android

```bash
npm run android
```

### Executar iOS

```bash
npm run ios
```

### Executar Web

```bash
npm run web
```

---

## 📁 Estrutura do Projeto

```txt
App-Fullstack-com-React-Native/
├── App.js
├── app.json
├── index.js
├── package.json
├── package-lock.json
└── assets/
```

---

## ⚠️ Observações

O projeto utiliza o Expo SDK 54.

Caso ocorra incompatibilidade com o Expo Go, execute:

```bash
npx expo install --check
```

Também é recomendado manter o aplicativo Expo Go atualizado para a versão mais recente disponível na loja.

---

## 🎯 Objetivo do Projeto

Projeto desenvolvido como atividade acadêmica com o objetivo de aplicar conceitos de:

* Desenvolvimento Mobile com React Native
* Consumo de APIs REST
* Operações CRUD
* Integração entre Frontend e Backend
* Publicação de serviços em nuvem

---

## 👩‍💻 Desenvolvido por

**Laís Nayara**

Curso: Análise e Desenvolvimento de Sistemas

