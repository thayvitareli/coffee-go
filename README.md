# Coffee-Go ☕️

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
