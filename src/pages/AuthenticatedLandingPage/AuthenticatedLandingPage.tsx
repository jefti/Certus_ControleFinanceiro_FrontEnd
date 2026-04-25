import { Link } from 'react-router-dom'
import { PrivateHeader } from '../../components/Header/PrivateHeader'
import { useAuth } from '../../hooks/useAuth'
import './AuthenticatedLandingPage.css'

type HomeShortcut = {
  title: string
  description: string
  path: string
  status: string
}

const shortcuts: HomeShortcut[] = [
  {
    title: 'Dashboard',
    description: 'Veja o resumo do mês, total de receitas, gastos e saldo atual.',
    path: '/dashboard',
    status: 'Resumo financeiro',
  },
  {
    title: 'Gastos',
    description: 'Cadastre, edite e acompanhe gastos recorrentes e não recorrentes.',
    path: '/gastos',
    status: 'Despesas',
  },
  {
    title: 'Receitas',
    description: 'Registre entradas mensais, ganhos extras e receitas recorrentes.',
    path: '/receitas',
    status: 'Entradas',
  },
  {
    title: 'Centro de Custos',
    description: 'Organize fontes e categorias para agrupar gastos e receitas.',
    path: '/centro-de-custos',
    status: 'Agrupamento',
  },
  {
    title: 'Cadastros',
    description: 'Acesse os cadastros gerais usados no controle financeiro.',
    path: '/cadastros',
    status: 'Gerenciar',
  },
  {
    title: 'Usuário',
    description: 'Atualize seus dados de perfil, nome, e-mail e informações da conta.',
    path: '/usuario',
    status: 'Conta',
  },
]

export function AuthenticatedLandingPage() {
  const { user } = useAuth()

  return (
    <>
      <PrivateHeader />

      <main className="authenticated-landing-page">
        <section className="authenticated-landing-page__hero">
          <div>
            <span className="authenticated-landing-page__eyebrow">
              Certus Controle Financeiro
            </span>

            <h1 className="authenticated-landing-page__title">
              Olá, {user?.nome || 'usuário'}.
            </h1>

            <p className="authenticated-landing-page__text">
              Escolha uma área para começar a controlar suas receitas, gastos e
              centros de custo com mais clareza.
            </p>
          </div>

          <div className="authenticated-landing-page__summary">
            <strong>Acesso rápido</strong>
            <span>
              Resumo mensal, lançamentos financeiros e cadastros em poucos cliques.
            </span>
          </div>
        </section>

        <section
          className="authenticated-landing-page__actions"
          aria-label="Atalhos do sistema"
        >
          {shortcuts.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="authenticated-landing-page__card"
            >
              <div>
                <span className="authenticated-landing-page__card-status">
                  {item.status}
                </span>

                <h2 className="authenticated-landing-page__card-title">
                  {item.title}
                </h2>

                <p className="authenticated-landing-page__card-description">
                  {item.description}
                </p>
              </div>

              <span className="authenticated-landing-page__card-button">
                Acessar
              </span>
            </Link>
          ))}
        </section>
      </main>
    </>
  )
}