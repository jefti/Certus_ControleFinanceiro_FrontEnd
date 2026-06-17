![Certus](public/logo-certus.png)

# Certus Controle Financeiro — Front-end

Interface web do **Certus Controle Financeiro**: autenticação, gestão cadastral e visualização de indicadores financeiros, consumindo a API REST do sistema.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)

---

Este repositório contém **apenas o front-end**. O back-end (Spring Boot) está disponível em:

- [Certus Controle Financeiro — Back-end](https://github.com/jefti/Certus_ControleFinanceiro_BackEnd/tree/main)

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Rotas da Aplicação](#rotas-da-aplicação)
- [Autenticação e Sessão](#autenticação-e-sessão)
- [Integração com a API](#integração-com-a-api)
- [Modelos de Dados](#modelos-de-dados)
- [Como Executar Localmente](#como-executar-localmente)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Testes](#testes)
- [Documentação Complementar](#documentação-complementar)
- [Autores](#autores)

## Visão Geral

O front-end cobre o fluxo principal de um sistema de controle financeiro:

- Autenticação de usuários (login com persistência de sessão via JWT)
- Cadastro de novos usuários
- Recuperação e redefinição de senha por código
- Área autenticada com atalhos para os módulos do sistema
- Cadastro de **Centros de Custo**
- Cadastro de **Títulos** financeiros (a pagar / a receber, com recorrência)
- **Dashboard** interativo com indicadores, fluxo de caixa e lançamentos
- Validação de faturamentos diretamente pelo painel

A aplicação é uma SPA (Single Page Application) em React + TypeScript, construída com Vite, e separa claramente rotas públicas (visitante) de rotas privadas (usuário autenticado).

## Funcionalidades

| Módulo | Descrição |
| --- | --- |
| **Login** | Autenticação por e-mail e senha, com validação de formulário e tratamento de credenciais inválidas. Mensagem de "sessão expirada" exibida ao retornar de uma sessão invalidada. |
| **Cadastro de usuário** | Criação de conta com nome, e-mail, celular e senha, incluindo confirmação de senha e validações. |
| **Recuperação de senha** | Solicitação de código por e-mail (*forgot-password*) e redefinição de senha com código (*reset-password*). |
| **Página inicial autenticada** | Saudação personalizada e cartões de atalho para os módulos disponíveis. |
| **Centro de Custos** | Listagem, criação, edição e exclusão de centros de custo (CRUD completo), com diálogo de confirmação. |
| **Títulos** | Cadastro de títulos a pagar/receber, com valor, vencimento, recorrência (semanal a anual), data fim e vínculo a centros de custo. |
| **Dashboard** | Indicadores de receitas, despesas e saldo; gráfico de fluxo de caixa (Recharts); tabela de lançamentos com filtro por período e validação de faturamento. |
| **Perfil do usuário** | Visualização dos dados da conta e encerramento de sessão. |
| **Navegação responsiva** | Cabeçalho com menus desktop e barra de navegação mobile dedicada. |

## Tecnologias

**Núcleo**

- [React 19](https://react.dev) — biblioteca de UI (com `lazy` / `Suspense` para code-splitting por rota)
- [TypeScript 6](https://www.typescriptlang.org) — tipagem estática
- [Vite 8](https://vite.dev) — build e dev server
- [React Router 7](https://reactrouter.com) — roteamento e rotas protegidas
- [Axios](https://axios-http.com) — cliente HTTP com interceptors
- [Recharts](https://recharts.org) — gráficos do dashboard
- [modern-normalize](https://github.com/sindresorhus/modern-normalize) — reset de estilos

**Qualidade e testes**

- [Vitest 4](https://vitest.dev) + [Testing Library](https://testing-library.com) + jsdom — testes unitários e de componentes
- [Playwright](https://playwright.dev) — testes end-to-end (Chromium, Firefox, WebKit)
- [ESLint 9](https://eslint.org) + typescript-eslint + plugins de React Hooks/Refresh

## Arquitetura

A aplicação segue uma organização por responsabilidade, com camadas bem definidas:

```
main.tsx
  └─ AuthProvider (contexto de autenticação)
       └─ BrowserRouter
            └─ App → AppRouter
                 ├─ PublicRoute  → PublicLayout  → páginas públicas
                 ├─ PrivateRoute → PrivateLayout → páginas autenticadas
                 └─ NotFoundLayout → NotFoundPage
```

- **`AuthProvider`** mantém `user`, `token` e `isAuthenticated`, expondo `signIn` / `signOut`. A sessão inicial é hidratada a partir do `localStorage`.
- **`PrivateRoute` / `PublicRoute`** controlam o acesso: usuários não autenticados são redirecionados a `/login`; usuários autenticados em rotas públicas são enviados a `/inicio`.
- **Serviços** (`src/services`) encapsulam todas as chamadas à API, retornando dados já tipados.
- **`apiCommunication`** é a instância Axios central que injeta o token e trata expiração de sessão de forma global.
- **Validações** (`src/validations`) concentram regras de formulário reutilizáveis.

## Estrutura do Projeto

```
.
├── e2e/                         # Testes end-to-end (Playwright)
│   └── auth-and-cost-center.spec.ts
├── public/                      # Assets estáticos (logos, ícones, favicon)
├── src/
│   ├── components/              # Componentes reutilizáveis
│   │   ├── ConfirmDialog/       # Diálogo de confirmação
│   │   ├── FloatingAlert/       # Alertas flutuantes (feedback)
│   │   ├── Header/              # Cabeçalhos público e privado
│   │   ├── PrimaryButton/       # Botão primário
│   │   └── TextField/           # Campo de formulário
│   ├── contexts/                # AuthContext e definição do contexto
│   ├── hooks/                   # useAuth
│   ├── layouts/                 # PublicLayout, PrivateLayout, NotFoundLayout
│   ├── pages/                   # Páginas (uma pasta por rota)
│   │   ├── HomePage/
│   │   ├── LoginPage/
│   │   ├── RegisterPage/
│   │   ├── ForgotPasswordPage/
│   │   ├── AuthenticatedLandingPage/
│   │   ├── DashboardPage/
│   │   ├── CostCenterPage/
│   │   ├── TitlesPage/
│   │   ├── UserPage/
│   │   └── NotFoundPage/
│   ├── routes/                  # AppRouter, PrivateRoute, PublicRoute
│   ├── services/                # Comunicação com a API (Axios)
│   ├── storage/                 # Persistência da sessão (localStorage)
│   ├── styles/                  # Estilos globais
│   ├── test/                    # Setup de testes (Vitest)
│   ├── types/                   # Tipagens de domínio e da API
│   ├── utils/                   # Funções utilitárias
│   ├── validations/             # Regras e validações de formulário
│   ├── App.tsx
│   └── main.tsx                 # Ponto de entrada
├── index.html
├── vite.config.ts               # Config do Vite + Vitest
├── playwright.config.ts         # Config dos testes E2E
├── eslint.config.js
└── tsconfig*.json
```

## Rotas da Aplicação

### Rotas públicas

Acessíveis apenas a visitantes não autenticados.

| Rota | Página | Descrição |
| --- | --- | --- |
| `/` | HomePage | Página inicial / apresentação |
| `/login` | LoginPage | Autenticação do usuário |
| `/cadastro` | RegisterPage | Criação de conta |
| `/recuperar-senha` | ForgotPasswordPage | Recuperação e redefinição de senha |

### Rotas privadas

Exigem usuário autenticado; caso contrário, redirecionam para `/login`.

| Rota | Página | Descrição |
| --- | --- | --- |
| `/inicio` | AuthenticatedLandingPage | Área inicial com atalhos |
| `/dashboard` | DashboardPage | Indicadores e fluxo de caixa |
| `/centro-de-custos` | CostCenterPage | CRUD de centros de custo |
| `/titulos` | TitlesPage | CRUD de títulos financeiros |
| `/usuario` | UserPage | Perfil do usuário |

Qualquer rota não reconhecida cai em `NotFoundPage` (`*`).

## Autenticação e Sessão

- Após o login, a resposta da API (`token` + `usuario`) é normalizada (removendo o prefixo `Bearer`) e salva em `localStorage` sob a chave `@certus:auth`.
- O `AuthProvider` reidrata a sessão ao iniciar a aplicação, mantendo o usuário logado entre recarregamentos.
- Toda requisição autenticada recebe o header `Authorization: Bearer <token>` via interceptor do Axios.

> [!IMPORTANT]
> Quando a API responde `401` ou `403` em uma requisição autenticada, o interceptor de resposta limpa a sessão, grava uma mensagem de "sessão expirada" em `sessionStorage` e redireciona para `/login` automaticamente.

## Integração com a API

Todas as chamadas usam a instância `apiCommunication` (Axios), com `baseURL` definida por `VITE_API_URL`.

| Serviço | Método/Endpoint | Descrição |
| --- | --- | --- |
| **authService** | `POST /api/auth/login` | Autenticação (retorna token + usuário) |
| **userService** | `POST /api/usuarios/cadastrar` | Cadastro de usuário |
| **passwordRecoveryService** | `POST /api/auth/forgot-password` | Solicita código de recuperação |
| | `POST /api/auth/reset-password` | Redefine a senha com o código |
| **costCenterService** | `GET /api/centros-de-custo/obter` | Lista centros de custo |
| | `POST /api/centros-de-custo/cadastrar` | Cria centro de custo |
| | `PUT /api/centros-de-custo/atualizar/:id` | Atualiza centro de custo |
| | `DELETE /api/centros-de-custo/deletar/:id` | Remove centro de custo |
| **titleService** | `GET /api/titulos/obter` | Lista títulos |
| | `POST /api/titulos/cadastrar` | Cria título |
| | `PUT /api/titulos/atualizar/:id` | Atualiza título |
| | `DELETE /api/titulos/deletar/:id` | Remove título |
| **dashboardService** | `GET /api/dashboard?periodoInicial=&periodoFinal=` | Indicadores e lançamentos do período |
| **faturamentoService** | `PATCH /api/faturamentos/:id/validar` | Valida um faturamento (data de pagamento + observação) |

> [!NOTE]
> O utilitário `getApiErrorMessage` (`src/services/httpError.ts`) padroniza a extração de mensagens de erro da API e corrige problemas de codificação (mojibake) em mensagens em português.

## Modelos de Dados

Principais tipos de domínio (`src/types`):

- **`AuthUser`** — `id`, `nome`, `email`, `celular?`, `dataCadastro?`, `dataInativacao?`
- **`CostCenter`** — `id`, `descricao`, `observacao`
- **`FinancialTitle`** — `id`, `descricao`, `valor`, `dataVencimento`, `tipo` (`PAGAR` | `RECEBER`), `recorrencia` (`SEMANAL` … `ANUAL`), `dataFim`, `ativo`, `quantidadeFaturamentos`, `centrosDeCusto[]`
- **`DashboardResponse`** — totais de receitas/despesas, saldo, contagens, `serieFluxoCaixa[]` e `lancamentos[]`
- **`DashboardLancamento`** — lançamento com `status` (`EM_ABERTO` | `PAGO` | `ATRASADO`)

## Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) 18+
- npm 9+
- Uma instância da [API back-end](https://github.com/jefti/Certus_ControleFinanceiro_BackEnd/tree/main) em execução (por padrão em `http://localhost:8080`)

### Passo a passo

```bash
# 1. Instale as dependências
npm install

# 2. Configure as variáveis de ambiente
cp .env.example .env   # ajuste VITE_API_URL se necessário

# 3. Inicie o ambiente de desenvolvimento
npm run dev
```

O Vite iniciará a aplicação localmente (por padrão em `http://localhost:5173`).

### Build de produção

```bash
npm run build     # checagem de tipos (tsc -b) + build do Vite
npm run preview   # serve a build de produção localmente
```

## Variáveis de Ambiente

O arquivo [`.env.example`](.env.example) lista as variáveis necessárias. Crie um `.env` a partir dele:

| Variável | Descrição | Padrão |
| --- | --- | --- |
| `VITE_API_URL` | URL base da API back-end | `http://localhost:8080` |

> [!TIP]
> Variáveis expostas ao cliente no Vite precisam do prefixo `VITE_`. O arquivo `.env` está no `.gitignore` e não deve ser versionado.

## Scripts Disponíveis

| Script | Comando | Descrição |
| --- | --- | --- |
| `dev` | `npm run dev` | Inicia o servidor de desenvolvimento (Vite) |
| `build` | `npm run build` | Checagem de tipos e build de produção |
| `preview` | `npm run preview` | Serve a build de produção |
| `lint` | `npm run lint` | Executa o ESLint |
| `test` | `npm run test` | Executa os testes unitários (Vitest) |
| `test:coverage` | `npm run test:coverage` | Testes com relatório de cobertura |
| `test:e2e` | `npm run test:e2e` | Executa os testes end-to-end (Playwright) |

## Testes

O projeto possui duas camadas de testes:

### Unitários e de componentes (Vitest)

Ambiente `jsdom` com Testing Library. A configuração e a cobertura estão em `vite.config.ts` (foco em `validations`, `storage`, `routes` e `services`).

```bash
npm run test            # roda toda a suíte
npm run test:coverage   # gera relatório de cobertura (text + html)
```

Cobre, entre outros: regras de validação de formulário, persistência da sessão, comunicação com a API, proteção de rotas e a página de centro de custo.

### End-to-end (Playwright)

Testes em `e2e/`, executados em Chromium, Firefox e WebKit. O Playwright sobe o app automaticamente (`npm run dev`) e usa uma API mockada (`VITE_API_URL=http://api.test`).

```bash
npx playwright install   # instala os navegadores (primeira vez)
npm run test:e2e
```

O fluxo coberto valida o redirecionamento de visitantes para o login, a autenticação e o cadastro de centro de custo com encerramento de sessão.

## Documentação Complementar

Para regras de negócio, modelagem e configuração da API, consulte o repositório do back-end:

- [Certus Controle Financeiro — Back-end (Spring Boot)](https://github.com/jefti/Certus_ControleFinanceiro_BackEnd/tree/main)
- [Changelog do front-end](./CHANGELOG.md)
- [Changelog geral do projeto](./CHANGELOG_GERAL.md)
- [Métricas consolidadas do projeto](./METRICAS_PROJETO.md)

## Autores

Projeto desenvolvido para trabalho acadêmico, com contribuições de:

- Marcelo Pinotti ([@marcelopinotti](https://github.com/marcelopinotti))
- jefti ([@jefti](https://github.com/jefti))
- LuisLealDev18
- HugoFelipe00
- Neemias Borges
