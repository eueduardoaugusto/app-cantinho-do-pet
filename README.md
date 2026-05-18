# 🧠 PROJETO INTEGRADOR: DESENVOLVIMENTO MOBILE — CANTINHO PET APP

• O projeto consiste em uma aplicação mobile do sistema **Cantinho Pet**, desenvolvida para dispositivos móveis com foco em praticidade, organização e gerenciamento de funcionalidades relacionadas ao petshop.

• O aplicativo foi desenvolvido utilizando tecnologias modernas do ecossistema React Native, priorizando performance, organização de código e compatibilidade multiplataforma.

• Na estrutura mobile utilizamos **React Native + Expo + TypeScript + React Navigation + NativeWind + Axios**, permitindo a criação de interfaces modernas, navegação entre telas e comunicação com a API backend do sistema.

---

## 🖥️ Participantes

- DANIEL DE OLIVEIRA LOPES
- DANIEL DE OLIVEIRA SOLANO LOPES
- EDUARDO AUGUSTO DA SILVA ROSA
- HENRIQUE BARREIRO SANTANA
- ICARO GOES MOREIRA
- MARCELLY CERDEIRINHA MARCIOTO
- MIRIAM VIEGAS DE JESUS
- VINICIUS PEREIRA DE SOUZA

---

## ⚙️ Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- NativeWind
- TailwindCSS
- Axios
- Async Storage

---

## 📦 Estrutura do projeto

```bash
src/
├── routes/      # Gerenciamento das rotas da aplicação
├── screens/     # Telas principais do aplicativo
├── components/  # Componentes reutilizáveis
├── services/    # Comunicação com API utilizando Axios
├── assets/      # Imagens, ícones e arquivos estáticos
└── styles/      # Configurações de estilização
```

Arquivos principais:

```bash
App.tsx             # Inicialização da aplicação
app.json            # Configuração do Expo
tailwind.config.js  # Configuração do TailwindCSS
babel.config.js     # Configuração do Babel
tsconfig.json       # Configuração do TypeScript
metro.config.js     # Configuração do Metro Bundler
```

---

## 📱 Funcionalidades

- Tela de Login
- Navegação entre telas
- Persistência local de dados
- Integração com API REST
- Interface responsiva para dispositivos móveis
- Estrutura preparada para Android e IOS

---

## 🧩 Pré-requisitos

- Node.js v18+
- npm
- Expo CLI
- Android Studio, para Android
- Xcode, para IOS apenas no MacOS

---

## ⚙️ Instalação do projeto

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Entre na pasta raiz do projeto:

```bash
cd cantinho-pet-app
```

Instale as dependências:

```bash
npm install
```

## 🚀 Rodando o projeto

Após instalar as dependências, execute o comando abaixo no terminal:

```bash
npx expo start
```

Após iniciar o projeto:

- O Expo abrirá automaticamente no navegador
- Um QR Code será exibido na tela
- Esse QR Code será utilizado para abrir o aplicativo no celular

---

## 📱 Executando no celular

Será necessário instalar o aplicativo **Expo Go** no dispositivo móvel.

### Android

Baixe pela Play Store:

https://play.google.com/store/apps/details?id=host.exp.exponent

### IOS

Baixe pela App Store:

https://apps.apple.com/app/expo-go/id982107779

---

Depois de instalar o Expo Go:

1. Abra o aplicativo no celular
2. Escaneie o QR Code exibido no navegador
3. Aguarde o carregamento do projeto

O aplicativo será iniciado automaticamente no dispositivo móvel.

---

## 🤖 Rodar diretamente no Android

Caso possua Android Studio configurado:

```bash
npm run android
```

## 🍎 Rodar diretamente no IOS

Caso utilize MacOS com Xcode configurado:

```bash
npm run ios
```

## 🌐 Comunicação com API

O aplicativo realiza comunicação com o backend através de requisições HTTP utilizando a biblioteca Axios.

A API principal do sistema web é responsável por:

- Autenticação de usuários
- Controle de produtos
- Gerenciamento de clientes
- Controle de vendas

---

## 🎨 Estilização

O projeto utiliza:

- NativeWind
- TailwindCSS
- Safe Area Context
- React Navigation

---

## 📂 Scripts disponíveis

```bash
npm start          # Inicia o Expo
npm run android    # Executa no Android
npm run ios        # Executa no IOS
npm run web        # Executa versão web
npm run lint       # Verifica padrões de código
npm run format     # Formata o projeto
```

---

## 🧾 Licença

Este projeto é apenas para fins acadêmicos (trabalho de faculdade). Todos os direitos reservados ao grupo do projeto.
