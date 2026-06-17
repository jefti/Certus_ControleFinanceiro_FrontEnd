# CHANGELOG

Este arquivo registra as funcionalidades implementadas no **front-end** do projeto **Certus Controle Financeiro**, organizadas por sprint a partir do histórico real do Git e alinhadas ao backlog do produto.

Observações:

- este documento cobre apenas as entregas do **front-end**
- somente mudanças presentes na branch atual sincronizada com a `main` entram como commits de referência
- merges e commits exclusivamente administrativos foram consolidados quando não representavam funcionalidade nova
- as datas seguem o histórico do Git

---

## Sprint 001

**Período:** 02/03/2026 a 07/04/2026

### Entregas

- inicialização do repositório front-end
- criação da base do projeto com **React + Vite**
- definição da estrutura inicial para evolução da interface

### Commits de referência

- **2026-04-07** `first commit`
- **2026-04-07** `feat: react-vite`

---

## Sprint 002

**Período:** 16/04/2026 a 22/04/2026

### Funcionalidades implementadas

- base de comunicação com a API
- contexto global de autenticação
- proteção de rotas públicas e privadas
- layouts separados para áreas autenticadas e públicas
- navegação condicional no cabeçalho
- tela de login
- tela de cadastro
- fluxo inicial de recuperação de senha
- homepage pública inicial

### User Stories atendidas

- `US01` Registro de nova conta
- `US02` Login da conta
- `US04` Recuperação de senha
- `US21` Homepage organizada para novos clientes
- `US22` Navegação pelo header
- `US24` Redirecionamento sem autorização

### Commits de referência

- **2026-04-13** `feat: apiCommunication`
- **2026-04-13** `feat: add auth context and useAuth hook`
- **2026-04-15** `feat: add public and private route guards`
- **2026-04-15** `feat: add conditional header navigation`
- **2026-04-15** `feat: add public and private layouts`
- **2026-04-16** `feat: add auth routing layouts and header navigation`
- **2026-04-16** `feat: add login page and reusable form components`
- **2026-04-19** `feat: Register page`
- **2026-04-21** `feat: recuperação de senha`
- **2026-04-21** `fix(forgot-password): ajusta fluxo e estado do campo de email`
- **2026-04-21** `HomePage`

---

## Sprint 003

**Período:** 23/04/2026 a 20/05/2026

### Funcionalidades implementadas

- landing page pública do sistema
- organização das rotas da aplicação
- primeira versão da página de centros de custo
- primeira versão da página de títulos
- evolução da área autenticada com novas páginas e atalhos
- refinamentos do header e da navegação autenticada
- integração mais madura dos fluxos de autenticação com o back-end
- ajustes visuais e sanitização de código

### User Stories atendidas

- `US03` Logout do sistema
- `US16` Cadastrar centro de gastos
- `US21` Homepage organizada para novos clientes
- `US22` Navegação pelo header
- `US23` Página de rota inexistente

### Commits de referência

- **2026-04-25** `Landing Page`
- **2026-04-25** `Centro de Custos`
- **2026-04-25** `atualizacao das rotas`
- **2026-04-27** `fix: remover centro de custos errado`
- **2026-04-27** `fix(header): refine authenticated and public header navigation`
- **2026-04-27** `feat(routes): organize authenticated routes and add missing pages`
- **2026-04-27** `feat(authenticated-home): align menu cards with current project scope`
- **2026-04-27** `titles page`
- **2026-04-28** `feat(auth): integrate frontend authentication flows`
- **2026-04-28** `feat(user): shorten user display names`
- **2026-04-28** `fix: styles`
- **2026-04-28** `chore: code sanitize`

---

## Sprint 004

**Período:** 20/05/2026 a 27/05/2026

### Funcionalidades implementadas

- liberação definitiva da página de centros de custo no fluxo autenticado
- início da integração de cadastro de centro de custo com a API
- criação da página de cadastro de custo e serviços relacionados
- integração de requisições do front-end com o back-end
- primeiros ajustes para o módulo de dashboard
- melhorias de responsividade

### User Stories atendidas

- `US16` Cadastrar centro de gastos
- `US17` Editar centro de gastos existente
- `US18` Excluir centro de gastos
- `US08` Associar gastos a uma fonte
- `US13` Associar receitas a uma fonte

### Commits de referência

- **2026-05-21** `fix: unlock center cost page access`
- **2026-05-21** `remove: center cost paused page`
- **2026-05-23** `pagina de cadastro de custo`
- **2026-05-23** `costservice`
- **2026-05-23** `types costcenter`
- **2026-05-24** `fix: authenticatedLandingPage import`
- **2026-05-25** `feat: backend requisitions integration`
- **2026-05-25** `feat: responsividade`
- **2026-05-25** `dashboard mock`

---

## Sprint 005

**Período:** 28/05/2026 a 09/06/2026

### Funcionalidades implementadas

- implementação da tela de dashboard
- introdução de indicadores visuais e consolidação da área inicial autenticada
- suporte à visualização de expiração de usuário

### User Stories atendidas

- `US19` Visualizar resumo do mês atual
- `US20` Gráfico de gastos por categoria

### Commits de referência

- **2026-06-08** `feat: dashboard`
- **2026-06-08** `feat: user expiration`

---

## Sprint 007

**Período:** 10/06/2026 a 14/06/2026

### Funcionalidades implementadas

- estruturação da base de testes do front-end

### User Stories atendidas

- `US31` Plano de testes

### Commits de referência

- **2026-06-11** `tests: tests setup`

---

## Sprint 008

**Período:** 15/06/2026 a 17/06/2026

### Funcionalidades implementadas

- atualização do README com documentação completa do front-end
- revisão textual de informações desatualizadas
- criação e revisão do changelog do front-end
- criação do changelog geral do projeto
- criação das métricas consolidadas do projeto
- inclusão dos links de changelog e métricas no README

### User Stories atendidas

- `US25` Manual do usuário
- `US26` Manual técnico
- `US32` Relatório da sprint
- `US33` Changelog do projeto

### Commits de referência na branch atual

- **2026-06-16** `docs: atualiza README com documentação completa do front-end`
- **2026-06-16** `fix: exchange outdated text information`
- **2026-06-17** `Doc: changelogs e metrics`

### Alterações documentais desta entrega

- `CHANGELOG.md`
- `CHANGELOG_GERAL.md`
- `METRICAS_PROJETO.md`
- links de documentação no `README.md`

---

## Resumo de evolução do front-end

- autenticação completa com login, cadastro e recuperação de senha
- navegação pública e autenticada com proteção de rotas
- homepage e landing page para apresentação do sistema
- módulos de centros de custo e títulos integrados ao fluxo principal
- dashboard com indicadores financeiros
- melhorias de responsividade, documentação e testes
