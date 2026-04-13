# Certus Controle Financeiro - Front-end

Interface web do projeto **Certus Controle Financeiro**, desenvolvida para consumir a API do sistema e oferecer uma experiência fluida de autenticação, gestão cadastral e visualização de indicadores financeiros.

Este repositório contém apenas o front-end. O back-end da aplicação está disponível em:

- [Certus Controle Financeiro - Back-end](https://github.com/jefti/Certus_ControleFinanceiro_BackEnd/tree/main)

## Visão Geral

O front-end foi planejado para atender o fluxo principal do sistema financeiro acadêmico:

- login de usuário
- cadastro de usuário
- recuperação de senha
- página de usuário
- páginas de cadastro para as tabelas do sistema
- dashboard interativo com informações financeiras

## Status do Projeto

Projeto em desenvolvimento.

As telas e integrações serão implementadas de forma incremental, acompanhando a evolução da API e das regras de negócio do back-end.

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- ESLint

## Funcionalidades Previstas

- autenticação de usuários
- fluxo de cadastro e acesso ao sistema
- recuperação de senha
- gerenciamento de dados cadastrais
- integração com endpoints REST do back-end
- dashboard interativo com indicadores e visualizações financeiras
- navegação entre módulos do sistema

## Estrutura Esperada do Front-end

O projeto será organizado para separar responsabilidades entre:

- páginas
- componentes reutilizáveis
- serviços de consumo da API
- tipagens
- estilos
- contexto de autenticação e estado global, quando necessário

## Integração com o Back-end

O front-end consome a API responsável por:

- autenticação
- cadastro de usuários
- gerenciamento de títulos
- gerenciamento de centros de custo
- dashboard financeiro

Repositório da API:

- [Back-end Spring Boot](https://github.com/jefti/Certus_ControleFinanceiro_BackEnd/tree/main)

## Como Executar Localmente

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Por padrão, a aplicação será iniciada pelo Vite em ambiente local.

### Build de produção

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

## Variáveis de Ambiente

Conforme a integração com a API for avançando, o front-end poderá utilizar variáveis de ambiente para configurar a URL base do back-end e outras chaves de execução.

Exemplo comum em projetos com Vite:

```env
VITE_API_URL=http://localhost:8080
```

## Padrão de Comunicação com a API

O front-end será preparado para consumir endpoints REST e enviar token de autenticação nas rotas protegidas.

Exemplo de responsabilidades previstas:

- login e persistência da sessão
- tratamento de erro de autenticação
- consumo de endpoints de listagem e cadastro
- exibição de dados do dashboard

## Documentação Complementar

Para entender regras de negócio, modelagem e configuração da API, consulte o repositório complementar:

- [Back-end do projeto](https://github.com/jefti/Certus_ControleFinanceiro_BackEnd/tree/main)

## Autores

Projeto desenvolvido para trabalho acadêmico.
