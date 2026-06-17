# Métricas do Projeto

Este documento consolida as métricas dos repositórios **Certus Controle Financeiro Front-end** e **Certus Controle Financeiro Back-end** considerando somente commits presentes na branch `main`.

- **Data da medição:** 17/06/2026
- **Branch considerada:** `main`
- **Front-end:** `Certus_ControleFinanceiro_FrontEnd`
- **Back-end:** `Certus_ControleFinanceiro_BackEnd`
- **Período do Git analisado:** 07/04/2026 a 17/06/2026
- **Backlog analisado:** 7 épicos e 33 user stories concluídas

## Metodologia

- Somente commits presentes na `main` foram contabilizados.
- Branches não mescladas na `main` não entram nas métricas de commits, linhas ou velocity.
- Autores normalizados:
  - `jefti` e `Jefti Meira` = **Jefti Meira**
  - `Marcelo` e `Marcelo Pinotti` = **Marcelo Pinotti**
  - `LuisLealDev18` = **Luis Leal**
  - `HugoFelipe00` = **Hugo Felipe**
  - `Neemias Borges` = **Neemias Borges**
- Commits totais incluem merge commits.
- Commits de implementação excluem merge commits.
- Linhas de código consideram arquivos versionados na `main` de código, testes e configuração.
- Foram excluídos arquivos gerados ou externos: `node_modules`, `dist`, `coverage`, `target`, `playwright-report`, `test-results`, `logs`, binários e lockfiles.
- Horas estimadas usam dias-pessoa ativos no Git: 1 pessoa com commit em 1 dia = 1 dia-pessoa.
- Cenário base de horas: 4h por dia-pessoa ativo.
- O changelog e este arquivo de métricas são artefatos da Sprint 008. Eles entram nas métricas de commits somente depois de commitados na `main`.

## Resumo Executivo

| Métrica | Valor |
| --- | ---: |
| Repositórios analisados | 2 |
| Contribuidores únicos normalizados | 5 |
| Épicos do backlog | 7 |
| User stories concluídas | 33 |
| Commits totais na `main` | 245 |
| Commits de implementação, sem merges | 171 |
| Merge commits | 74 |
| Pull requests integrados por merge | 60 |
| Arquivos versionados na `main` | 191 |
| Arquivos de código/teste/configuração contados | 170 |
| Linhas de código, testes e configuração | 13.945 |
| Linhas de aplicação | 11.352 |
| Linhas de testes | 2.199 |
| Linhas de configuração | 394 |
| Linhas adicionadas no histórico, sem merges | 20.409 |
| Linhas removidas no histórico, sem merges | 4.751 |
| Dias-pessoa ativos no Git | 50 |
| Horas estimadas, 3h/dia | 150h |
| Horas estimadas, 4h/dia | 200h |
| Horas estimadas, 6h/dia | 300h |

## Métricas por Repositório

| Métrica | Front-end `main` | Back-end `main` |
| --- | ---: | ---: |
| Primeiro commit | 07/04/2026 | 07/04/2026 |
| Último commit analisado | 16/06/2026 | 09/06/2026 |
| Commits totais | 77 | 168 |
| Commits sem merge | 48 | 123 |
| Merge commits | 29 | 45 |
| Pull requests integrados por merge | 28 | 32 |
| Arquivos versionados | 88 | 103 |
| Arquivos de código/teste/configuração contados | 75 | 95 |
| Linhas totais contadas | 8.170 | 5.775 |
| Linhas de aplicação | 7.774 | 3.578 |
| Linhas de testes | 314 | 1.885 |
| Linhas de configuração | 82 | 312 |
| Linhas adicionadas, sem merges | 12.268 | 8.141 |
| Linhas removidas, sem merges | 3.677 | 1.074 |

## Contribuições por Autor

| Autor normalizado | Commits totais | Commits sem merge |
| --- | ---: | ---: |
| Jefti Meira | 151 | 87 |
| Marcelo Pinotti | 83 | 73 |
| Luis Leal | 8 | 8 |
| Hugo Felipe | 2 | 2 |
| Neemias Borges | 1 | 1 |

## Linhas por Tipo de Arquivo

### Front-end

| Tipo | Arquivos | Linhas |
| --- | ---: | ---: |
| `.css` | 15 | 3.627 |
| `.tsx` | 27 | 3.576 |
| `.ts` | 31 | 931 |
| `.js` | 1 | 23 |
| `.html` | 1 | 13 |

### Back-end

| Tipo | Arquivos | Linhas |
| --- | ---: | ---: |
| `.java` | 84 | 5.277 |
| `.xml` | 1 | 230 |
| `.sql` | 5 | 105 |
| `.yml` | 2 | 87 |
| `.yaml` | 2 | 73 |
| `.properties` | 1 | 3 |

## Qualidade e Testes

| Métrica | Valor |
| --- | ---: |
| Arquivos de teste mapeados na `main` | 18 |
| Cenários únicos de teste mapeados na `main` | 82 |
| Execuções de teste validadas nesta revisão | 86 |
| Testes unitários/componentes do front-end | 13/13 passando |
| Testes E2E do front-end | 6/6 passando |
| Testes do back-end `main` | 67/67 passando |
| Build back-end `main` com `mvnw verify` | Sucesso |
| Cobertura front-end, statements | 50,54% |
| Cobertura front-end, branches | 58,33% |
| Cobertura front-end, functions | 31,57% |
| Cobertura front-end, lines | 56,79% |
| Cobertura geral back-end `main`, instructions | 53,79% |
| Cobertura geral back-end `main`, branches | 46,40% |
| JaCoCo check configurado no back-end `main` | Aprovado |

Comandos executados:

```bash
npm run test:coverage
npm run test:e2e
.\mvnw.cmd verify
```

Observações:

- O back-end foi validado em um worktree temporário criado a partir da `main`.
- O stack trace exibido ao final do Maven vem de um teste que simula exceção inesperada; a suíte passou com build success.

## Métricas de Arquitetura

### Front-end

| Item | Quantidade |
| --- | ---: |
| Páginas React | 11 |
| Componentes reutilizáveis | 6 |
| Serviços de API | 10 |
| Arquivos de rotas | 4 |
| Arquivos de tipos | 6 |
| Arquivos de validação | 4 |
| Cenários E2E | 2 |
| Navegadores no E2E | Chromium, Firefox, WebKit |

### Back-end

| Item | Quantidade |
| --- | ---: |
| Controllers | 7 |
| Services | 16 |
| Repositories | 5 |
| Entidades/enums de domínio | 8 |
| Arquivos de DTO/mappers | 24 |
| Migrations Flyway | 5 |
| Anotações de mapeamento HTTP | 28 |
| Classes analisadas pelo JaCoCo | 58 |

## Velocity por Sprint

| Sprint | Período | Commits totais | Commits sem merge | User stories | Pontos estimados | Horas estimadas |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Sprint 001 | 02/03 a 07/04 | 3 | 3 | 0 | 0 | 4h |
| Sprint 002 | 08/04 a 22/04 | 94 | 71 | 6 | 28 | 88h |
| Sprint 003 | 23/04 a 20/05 | 63 | 38 | 8 | 20 | 36h |
| Sprint 004 | 21/05 a 27/05 | 53 | 41 | 12 | 44 | 40h |
| Sprint 005 | 28/05 a 09/06 | 25 | 15 | 5 | 9 | 20h |
| Sprint 007 | 10/06 a 14/06 | 2 | 1 | 1 | 1 | 4h |
| Sprint 008 | 15/06 a 17/06 | 5 | 2 | 1 | 1 | 8h |

## Commits da Sprint 007 na `main`

### Front-end

- **2026-06-11** `tests: tests setup`
- **2026-06-11** `Merge pull request #33 from jefti/feat/testes`

### Back-end

- Sem commits na `main` entre 10/06/2026 e 14/06/2026.

## Commits da Sprint 008 na `main`

### Front-end

- **2026-06-16** `docs: atualiza README com documentação completa do front-end`
- **2026-06-16** `Merge pull request #34 from jefti/feat/readme`
- **2026-06-16** `Merge pull request #35 from jefti/develop`
- **2026-06-16** `fix: exchange outdated text information`
- **2026-06-16** `Merge pull request #36 from jefti/fix/textErrors`

### Back-end

- Sem commits na `main` entre 15/06/2026 e 17/06/2026.

### Artefatos documentais preparados nesta Sprint 008

- `CHANGELOG.md`
- `CHANGELOG_GERAL.md`
- `METRICAS_PROJETO.md`
- links de acesso no `README.md`
