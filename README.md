# CoffeGo ☕️

O CoffeGo é um aplicativo desenvolvido em **React Native** com **Expo**. Este projeto foi criado com o objetivo principal de servir como uma **ferramenta de estudo** para explorar e aprender sobre o desenvolvimento mobile moderno, padrões de arquitetura e design no ecossistema React.

---

## 🏗 Arquitetura

O projeto adota a arquitetura **MVVM (Model-View-ViewModel)**. O código principal está organizado dentro do diretório `/src`, promovendo uma separação clara das responsabilidades:

- **Model:** Gerencia os dados da aplicação, tipos e as regras fundamentais.
- **View (`.view.tsx`):** Componentes puramente visuais (UI).
- **ViewModel (`.viewmodel.ts`):** Camada do meio que conecta a View aos Models/Serviços. Contém a lógica de apresentação e interações antes de atualizar o estado visual.

A navegação baseia-se no **Expo Router**, possuindo roteamento em formato de arquivos no diretório `app`.

Estrutura de pastas da arquitetura (`/src`):
- `/components`: Componentes visuais genéricos e reutilizáveis.
- `/features`: Agrupa as telas da aplicação, onde cada funcionalidade contém seus arquivos *View* e *ViewModel*.
- `/hooks`: Hooks React customizados do projeto.
- `/services`: Abstração de consumo de APIs e módulos externos.
- `/store`: Gerenciador de estado global da aplicação.

---

## 🔌 APIs Usadas

Durante a construção do aplicativo, houve a integração com as seguintes APIs externas para estudo:

- **Google Places API:** Utilizada para buscar cafeterias nas proximidades, exibindo informações e marcadores diretamente no mapa integrado à aplicação.
- **Google Sign In API:** Implementada para integrar o fluxo de autenticação, permitindo logar seguro aos usuários via conta do Google.

---

## 🛠 Frameworks e Bibliotecas (Libs)

Diversas bibliotecas robustas foram incluídas em prol do ecossistema front-end do React Native:

- **[React Native](https://reactnative.dev/) & [Expo](https://expo.dev/):** SDK e framework central para desenvolvimento e build (iOS, Android, Web).
- **[Expo Router](https://docs.expo.dev/router/introduction/):** Solução moderna de roteamento (file-based routing).
- **[NativeWind](https://www.nativewind.dev/) (com [Tailwind CSS](https://tailwindcss.com/)):** Usado intensivamente para estilizar e configurar o Design System ("Sensory Editorial") por meio de utility classes.
- **[Zustand](https://github.com/pmndrs/zustand):** Ferramenta fácil, concisa e altamente escalável para gerenciar o estado global do projeto.
- **[@tanstack/react-query (React Query)](https://tanstack.com/query/latest):** Gerencia requisições assíncronas, estado remoto, sincronização e cache de fetchs de dados de maneira performática.
- **[React Native Maps](https://github.com/react-native-maps/react-native-maps):** Exibição do componente geográfico de Mapas e manipulação de marcadores interativos com a API Places.
- **[@react-native-google-signin/google-signin](https://github.com/react-native-google-signin/google-signin):** Serviço OAuth2 de validação e sign-in da plataforma Google.
- **[@react-native-community/geolocation](https://github.com/react-native-geolocation/react-native-geolocation):** Acesso nativo rápido e preciso aos sensores de localização real do smartphone do usuário.

---

## 🚀 Como Executar Localmente

Para testar ou debugar o projeto localmente:

1. Faça o clone deste repositório.
2. Acesse a pasta do projeto (root) e instale as dependências:
   ```bash
   npm install
   ```
3. Crie seu arquivo de ambiente (`.env.local` na raiz) e preencha as chaves públicas necessárias:
   - `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY=SUA_CHAVE_AQUI`
   - _Entre outras que estão configuradas localmente para Google Cloud Platform e Firebase/Web Client._
4. Inicie o Metro Bundler do Expo:
   ```bash
   npx expo start
   ```
