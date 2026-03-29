# Coffee-Go ☕️

*(🇺🇸 English version below | 🇧🇷 [Versão em Português abaixo](#-versão-em-português))*

---

**Coffee-Go** is a mobile application developed in **React Native** with **Expo**.

> **Note:** This project was created primarily as a **study tool** to explore modern mobile development, architectural patterns, and design within the React ecosystem.

---

## 🎨 Design System: "Sensory Editorial"

The app steps away from traditional UI patterns to implement an original Design System called **Sensory Editorial**, focused on conveying a premium "boutique cafe" aesthetic.
- **Colors:** Sophisticated palettes such as `primary` (intense espresso), `surface` (creamy foam), and `tertiary` (leaf green/coffee cherry).
- **Typography:** Striking use of elegant serif fonts (**Noto Serif**) paired with clean, modern sans-serif fonts (**Plus Jakarta Sans**).
- **Visual Style:** Translucent elements (glassmorphism/blur), soft shadows (*ambient shadows*), and rounded borders.

---

## ✨ Features

The application offers a complete user flow focused on exploring coffee shops:

- **Authentication:** Secure and practical social login using the **Google Sign-In API**.
- **Map Exploration (Home):** The main map tracks the user's location and uses the **Google Places API** to plot interactive markers for nearby coffee shops. Native rendering of the Google Maps SDK.
- **Coffee Shop Details:** A rich screen built with a translucent header, detailing: location photo, "Open/Closed" status, rating, amenities (Pet Friendly, Outdoor, WiFi), a direct *"How to arrive"* shortcut (opens native routes like Google Maps, Apple Maps), and a Reviews modal.
- **Favorites:** Users can like coffee shops and easily find them in the favorites tab, managed in memory.
- **Profile and History (Visited):** On the profile screen, users can view their Google account details and a visual history of locations actively marked as **"Visited"**.

---

## 🏗 Architecture

The project adopts the **MVVM (Model-View-ViewModel)** architecture. The code is organized in a strictly modular and decoupled way within the `/src` directory:

- **Model (`.model.ts`):** Primitive entities, typings (types/interfaces), and domain management (e.g., `CoffeeShop`).
- **ViewModel (`.view-model.ts`):** The "brain" of the screens. It uses custom hooks, integrates with Zustand (Stores), handles business rules, React Query, cache, navigation, and returns a pure object for the View to consume.
- **View (`.view.tsx`):** 100% visual components (*dumb components*). They receive data passed by the ViewModel via _props_ and render them on the screen using NativeWind.

This structure (`/src/features`) greatly simplifies maintenance, unit testing, and visual organization.

---

## 🛠 Frameworks and Libraries

- **[React Native & Expo](https://expo.dev/):** Base SDK for the application.
- **[Expo Router](https://docs.expo.dev/router/introduction/):** *File-based* navigation utilizing dynamic routes and tab layouts (`Tabs`).
- **[NativeWind](https://www.nativewind.dev/) (Tailwind CSS):** Styling entirely based on *utility classes*.
- **[Zustand](https://github.com/pmndrs/zustand):** Lightweight and scalable global state control. Split into different flows such as `use-auth-store`, `use-favorites-store`, and `use-visited-store`.
- **[@tanstack/react-query](https://tanstack.com/query/latest):** Optimizes calls to the Google Places API through _cache_, validation, and auto-retry (remote state).
- **[React Native Maps](https://github.com/react-native-maps/react-native-maps):** Maps engine natively configured with the `PROVIDER_GOOGLE` engine.
- **[Google Sign-In](https://github.com/react-native-google-signin/google-signin):** Native authentication module.

---

## 🚀 How to Run Locally

Because the project makes extensive use of Google Maps SDKs on iOS and Google Sign-In features, **it cannot be run in the standard Expo Go app**. You must run a *Custom Development Client* (with native build).

1. Clone this repository and access the project folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create and configure your `.env.local` file at the root with the required keys:
   ```env
   EXPO_PUBLIC_GOOGLE_PLACES_API_KEY=your_places_key
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_ios_maps_key
   EXPO_PUBLIC_IOS_URL_SCHEMA=your_ios_schema
   ```
4. Prebuild to regenerate the `/ios` and `/android` folders connected to your app.config.js:
   ```bash
   npx expo prebuild --clean
   ```
5. Run directly on the emulator/device generating the custom client:
   ```bash
   # For iOS
   npx expo run:ios
   
   # For Android
   npx expo run:android
   ```

---
---

# 🇧🇷 Versão em Português

O **Coffee-Go** é um aplicativo mobile desenvolvido em **React Native** com **Expo**. 

> **Aviso:** Este projeto foi criado com o objetivo principal de servir como uma **ferramenta de estudo** para explorar desenvolvimento mobile moderno, padrões de arquitetura e design no ecossistema React.

---

## 🎨 Design System: "Sensory Editorial"

O aplicativo foge do padrão de UI tradicional e implementa um Design System autoral chamado **Sensory Editorial**, focado em transmitir uma estética premium de "cafeteria boutique". 
- **Cores:** Paletas sofisticadas como `primary` (espresso intenso), `surface` (creamy foam) e `tertiary` (verde folha/cereja do café).
- **Tipografia:** Uso marcante de fontes serifadas elegantes (**Noto Serif**) combinadas com fontes sem serifa limpas e modernas (**Plus Jakarta Sans**).
- **Estilo Visual:** Elementos translúcidos (glassmorphism/blur), sombras suaves (*ambient shadows*) e bordas arredondadas.

---

## ✨ Funcionalidades

O aplicativo possui um fluxo de usuário completo focado na exploração de cafeterias:

- **Autenticação:** Login social seguro e prático usando a API do **Google Sign-In**.
- **Exploração por Mapa (Home):** O mapa principal rastreia a localização do usuário e utiliza a **Google Places API** para plotar *markers* interativos de cafeterias próximas. Renderização nativa do SDK do Google Maps.
- **Detalhes da Cafeteria (Details):** Uma tela rica construída sobre um cabeçalho translúcido, detalhando: foto do local, status "Aberto/Fechado", rating, comodidades (Pet Friendly, Outdoor, WiFi), atalho direto *"Como Chegar"* (abre rotas nativas como Google Maps, Apple Maps) e modal de Avaliações/Reviews.
- **Favoritos:** Os usuários podem curtir cafeterias e encontrá-las facilmente na aba de favoritos, gerenciados em memória.
- **Perfil e Histórico (Visited):** Na tela de perfil, o usuário consegue ver seus dados da conta Google e um histórico visual dos locais marcados ativamente como **"Visitados"**.

---

## 🏗 Arquitetura

O projeto adota a arquitetura **MVVM (Model-View-ViewModel)**. O código está organizado de forma estritamente modular e desacoplada dentro do diretório `/src`:

- **Model (`.model.ts`):** Entidades primitivas, tipagens (types/interfaces) e gerenciamento de domínios (ex: `CoffeeShop`).
- **ViewModel (`.view-model.ts`):** O "cérebro" das telas. Usa hooks customizados, integra com o Zustand (Stores), manipula regras de negócio, React Query, cache, navegação e retorna um objeto puro para a View consumir.
- **View (`.view.tsx`):** Componentes 100% visuais (*dumb components*). Recebem os dados passados pelo ViewModel através de _props_ e os renderizam na tela usando NativeWind.

Esta estrutura (`/src/features`) simplifica muito a manutenção, testes unitários e organização visual.

---

## 🛠 Frameworks e Bibliotecas (Libs)

- **[React Native & Expo](https://expo.dev/):** SDK base para a aplicação.
- **[Expo Router](https://docs.expo.dev/router/introduction/):** Navegação *file-based* baseada em rotas dinâmicas e layouts em abas (`Tabs`).
- **[NativeWind](https://www.nativewind.dev/) (Tailwind CSS):** Estilização inteiramente baseada em *utility classes*.
- **[Zustand](https://github.com/pmndrs/zustand):** Controle do estado global leve e escalável. Repartido em diferentes fluxos como `use-auth-store`, `use-favorites-store` e `use-visited-store`.
- **[@tanstack/react-query](https://tanstack.com/query/latest):** Otimiza as chamadas ao Google Places API através de _cache_, validação e auto-retry (state remoto).
- **[React Native Maps](https://github.com/react-native-maps/react-native-maps):** Motor de mapas configurado nativamente com a engine do `PROVIDER_GOOGLE`.
- **[Google Sign-In](https://github.com/react-native-google-signin/google-signin):** Modulo nativo de autenticação.

---

## 🚀 Como Executar Localmente

Como o projeto faz amplo uso de SDKs de mapa do Google no iOS e recursos do Sign-In do Google, **ele não pode rodar no aplicativo Expo Go padrão**. É necessário rodar o *Custom Development Client* (com build nativo).

1. Faça o clone deste repositório e acesse a pasta do projeto.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie e configure seu `.env.local` na raiz com as chaves exigidas:
   ```env
   EXPO_PUBLIC_GOOGLE_PLACES_API_KEY=sua_chave_places
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_maps_ios
   EXPO_PUBLIC_IOS_URL_SCHEMA=seu_esquema_ios
   ```
4. Faça o pré-build para regenerar as pastas `/ios` e `/android` conectadas ao seu app.config.js:
   ```bash
   npx expo prebuild --clean
   ```
5. Rode diretamente no emulador / dispositivo gerando o client customizado:
   ```bash
   # Para iOS
   npx expo run:ios
   
   # Para Android
   npx expo run:android
   ```
