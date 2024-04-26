## Projeto Demo WhatsApp

## Descrição do Projeto

O WhatsApp Clone é uma aplicação desenvolvida com Next.js 14, React.js, TypeScript, TailwindCSS, Convex e Clerk, proporcionando uma experiência semelhante ao WhatsApp com funcionalidades avançadas.

## Principais Funcionalidades

- **Autenticação com Clerk:** Autenticação segura utilizando Clerk para garantir o acesso seguro dos usuários.

- **Chat Privado e Grupos:** Os usuários podem criar e participar de chats privados e em grupo para comunicação.

- **Status Online/Offline:** Exibição do status de online/offline para os usuários.

- **Expulsar Usuários do Grupo:** Funcionalidade para expulsar usuários de um grupo, se o usuário for o administrador.

- **Envio de Imagens e Vídeos:** Os usuários podem enviar imagens e vídeos diretamente no chat.

- **Tratamento de Erros:** Manipulação de erros tanto no servidor quanto no cliente para uma experiência de usuário fluida.

- **Gerenciamento de Estado Global com Zustand:** Utilização do Zustand para gerenciamento de estado global da aplicação.

- **Conceitos Avançados como WebHooks:** Implementação de conceitos avançados, como WebHooks, para funcionalidades adicionais.

- **Modo Claro/Escuro:** Suporte para modo claro e escuro para personalização da interface.

## Dependências

O projeto utiliza diversas dependências para garantir seu funcionamento suave:

- `@clerk/nextjs:` ^4.29.12
- `@radix-ui/react-avatar:` ^1.0.4
- `@radix-ui/react-dialog:` ^1.0.5
- `@radix-ui/react-dropdown-menu:` ^2.0.6
- `@radix-ui/react-icons:` ^1.3.0
- `@radix-ui/react-slot:` ^1.0.2
- `@radix-ui/react-toast:` ^1.1.5
- `class-variance-authority:` ^0.7.0
- `clsx:` ^2.1.0
- `convex:` ^1.11.0
- `emoji-picker-react:` ^4.9.2
- `lucide-react:` ^0.368.0
- `next:` 14.2.0
- `next-themes:` ^0.3.0
- `react:` ^18
- `react-dom:` ^18
- `react-player:` ^2.16.0
- `svix:` ^1.21.0
- `tailwind-merge:` ^2.2.2
- `tailwindcss-animate:` ^1.0.7
- `zustand:` ^4.5.2
- `@types/node:` ^20
- `@types/react:` ^18
- `@types/react-dom:` ^18
- `eslint:` ^8
- `eslint-config-next:` 14.2.0
- `postcss:` ^8
- `tailwindcss:` ^3.4.1
- `typescript:` ^5

## Como Executar o Projeto

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js e o npm (ou yarn) instalados.
3. Instale as dependências do projeto utilizando o seguinte comando:

```bash
npm install
# ou
yarn install
```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes chaves e seus respectivos valores:

```env
CONVEX_DEPLOYMENT=seu_valor_aqui
NEXT_PUBLIC_CONVEX_URL=seu_valor_aqui
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=seu_valor_aqui
CLERK_SECRET_KEY=seu_valor_aqui
```

Certifique-se de substituir `seu_valor_aqui` pelos valores corretos de cada chave.

5. Para iniciar o servidor de desenvolvimento, utilize o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

6. O projeto estará disponível em `http://localhost:3000`.
