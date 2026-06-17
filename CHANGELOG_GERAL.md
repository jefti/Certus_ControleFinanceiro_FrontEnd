# Changelog Geral

Este changelog consolida as entregas do **Certus Controle Financeiro** considerando os repositórios de front-end e back-end em conjunto. Somente mudanças presentes na branch `main` entram como commits de referência.

Arquivos relacionados:

- [Changelog do front-end](./CHANGELOG.md)
- [Métricas consolidadas do projeto](./METRICAS_PROJETO.md)
- Changelog do back-end no repositório `Certus_ControleFinanceiro_BackEnd`

## Sprint 001

**Período:** 02/03/2026 a 07/04/2026

### Entregas consolidadas

- definição do tema do projeto, stack e organização inicial
- criação dos repositórios do front-end e back-end
- inicialização do front-end com React + Vite
- inicialização do back-end com Spring Boot

### Resultado

- projeto estruturado para evolução em duas camadas
- base inicial do produto criada no Git

## Sprint 002

**Janela de implementação no Git:** 08/04/2026 a 22/04/2026

### Front-end

- comunicação inicial com a API
- contexto global de autenticação
- rotas públicas e privadas
- layouts público e autenticado
- tela de login
- tela de cadastro
- recuperação de senha
- homepage pública inicial

### Back-end

- tratamento padronizado de erros
- entidades e DTOs iniciais de usuário, título e centro de custo
- migrations iniciais com Flyway
- autenticação JWT
- login por e-mail
- configuração de senha com BCrypt
- endpoint de health check
- documentação Swagger inicial
- primeiros testes unitários com JaCoCo

### User Stories

- `US01`, `US02`, `US04`, `US21`, `US22`, `US24`

## Sprint 003

**Período:** 23/04/2026 a 20/05/2026

### Front-end

- landing page
- organização de rotas
- página de centros de custo
- página de títulos
- home autenticada com atalhos
- refinamentos de navegação e header
- integração mais madura dos fluxos de autenticação

### Back-end

- recuperação de senha com persistência, serviço e endpoints
- envio de e-mail com Resend
- padronização temporal com `Instant`
- actuator e health check
- preparação de deploy no Render
- CRUD de centro de custo
- CRUD de título
- escopo de dados por usuário autenticado
- validações de entrada
- segurança com usuário ativo e method security

### User Stories

- `US03`, `US05`, `US16`, `US17`, `US18`, `US23`, `US26`, `US27`

## Sprint 004

**Período:** 21/05/2026 a 27/05/2026

### Front-end

- liberação da página de centros de custo no fluxo autenticado
- cadastro e serviços de centro de custo
- integração de requisições com o back-end
- melhorias de responsividade
- primeiros ajustes para dashboard

### Back-end

- modelagem de recorrência
- criação da entidade `Faturamento`
- geração automática de faturamentos por título
- endpoints de listagem e validação de faturamentos
- testes da lógica recorrente e de faturamento
- documentação Swagger do fluxo financeiro
- Docker Compose, Prometheus e melhorias de observabilidade

### User Stories

- `US06`, `US07`, `US08`, `US09`, `US10`, `US11`, `US12`, `US13`, `US14`, `US15`, `US30`, `US31`

## Sprint 005

**Período:** 28/05/2026 a 09/06/2026

### Front-end

- implementação da tela de dashboard
- indicadores visuais de receitas, despesas e saldo
- suporte a fluxo de usuário expirado

### Back-end

- controller e service de dashboard
- consultas agregadas para totais financeiros
- DTOs específicos para dashboard
- documentação OpenAPI ampliada
- ajustes de cobertura e build

### User Stories

- `US19`, `US20`, `US25`, `US28`, `US29`, `US32`

## Sprint 007

**Período:** 10/06/2026 a 14/06/2026

### Front-end

- estruturação dos testes do front-end

### Back-end

- não houve commits de back-end na branch `main` dentro desta janela

### User Stories

- `US31`

## Sprint 008

**Período:** 15/06/2026 a 17/06/2026

### Front-end

- atualização da documentação do README
- revisão textual de informações desatualizadas

### Back-end

- não houve commits de back-end na branch `main` dentro desta janela

### Documentação do projeto

- criação e revisão do changelog do front-end
- criação e revisão do changelog do back-end
- criação do changelog geral do projeto
- criação das métricas consolidadas do projeto
- inclusão dos links de changelog e métricas nos READMEs

### User Stories

- `US32`, `US33`

## Resultado Geral

- 33 user stories concluídas
- autenticação, cadastro, recuperação de senha e navegação protegida
- CRUD de centros de custo, títulos e faturamentos
- suporte a receitas e despesas recorrentes e não recorrentes
- dashboard financeiro consolidado
- documentação técnica, Swagger/OpenAPI, changelogs e métricas
- testes unitários, integração, componentes e E2E
- observabilidade, deploy e melhorias de segurança
