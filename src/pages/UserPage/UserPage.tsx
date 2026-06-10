import { useAuth } from '../../hooks/useAuth'
import { getUserInitial, getUserNickname } from '../../utils/userDisplay'
import './UserPage.css'

export function UserPage() {
  const { user } = useAuth()
  const accountStatus = user?.dataInativacao ? 'Conta inativa' : 'Conta ativa'
  const memberSince = formatDateTime(user?.dataCadastro)
  const hasMemberSince = memberSince !== 'Nao informado'
  const lastAccess = new Date().toLocaleString('pt-BR')
  const phone = user?.celular?.trim() || 'Nao informado'
  const email = user?.email ?? 'Nao informado'
  const fullName = user?.nome ?? 'Nao informado'

  return (
    <main className="user-page">
      <section className="user-page__hero">
        <div className="user-page__identity">
          <div className="user-page__avatar" aria-hidden="true">
            {getUserInitial(user?.nome)}
          </div>

          <div>
            <span className="user-page__eyebrow">
              Conta do usu{"\u00e1"}rio
            </span>
            <h1 className="user-page__title">
              {getUserNickname(user?.nome)}
            </h1>
            <p className="user-page__text">
              Acompanhe os dados principais da sua conta, confira a sessao atual
              e valide rapidamente as informacoes usadas no sistema financeiro.
            </p>
          </div>
        </div>

        <aside className="user-page__card user-page__card--status">
          <span className="user-page__label">Sessao atual</span>
          <strong>{accountStatus}</strong>
          <p>
            Ultimo acesso registrado nesta navegacao em {lastAccess}.
          </p>

          <div className="user-page__status-list">
            <div className="user-page__status-item">
              <span className="user-page__label">E-mail da sessao</span>
              <strong>{email}</strong>
            </div>

            {hasMemberSince && (
              <div className="user-page__status-item">
                <span className="user-page__label">Desde</span>
                <strong>{memberSince}</strong>
              </div>
            )}
          </div>
        </aside>
      </section>

      <section className="user-page__grid">
        <article className="user-page__info-card">
          <span className="user-page__label">Nome completo</span>
          <strong>{fullName}</strong>
        </article>

        <article className="user-page__info-card">
          <span className="user-page__label">E-mail</span>
          <strong>{email}</strong>
        </article>

        <article className="user-page__info-card">
          <span className="user-page__label">Celular</span>
          <strong>{phone}</strong>
        </article>

        {hasMemberSince && (
          <article className="user-page__info-card">
            <span className="user-page__label">Cadastro da conta</span>
            <strong>{memberSince}</strong>
          </article>
        )}

        <article className="user-page__info-card">
          <span className="user-page__label">Situacao</span>
          <strong>{accountStatus}</strong>
        </article>

        <article className="user-page__info-card">
          <span className="user-page__label">Sessao carregada</span>
          <strong>Dados sincronizados com a autenticacao atual</strong>
        </article>
      </section>

      <section className="user-page__panel">
        <article className="user-page__panel-card">
          <span className="user-page__label">Resumo util</span>
          <h2 className="user-page__panel-title">O que vale conferir aqui</h2>
          <p className="user-page__text">
            Se nome, e-mail ou celular estiverem inconsistentes, isso pode
            impactar a identificacao da conta e futuras notificacoes do sistema.
          </p>
        </article>

        <article className="user-page__panel-card">
          <span className="user-page__label">Sessao</span>
          <h2 className="user-page__panel-title">Dados da autenticacao</h2>
          <ul className="user-page__facts">
            <li>Conta autenticada com o e-mail {email}.</li>
            <li>Status atual: {accountStatus.toLowerCase()}.</li>
            <li>Perfil carregado com os dados mais recentes da sessao.</li>
          </ul>
        </article>
      </section>
    </main>
  )
}

function formatDateTime(value?: string | number | Date | null) {
  if (value === null || value === undefined || value === '') {
    return 'Nao informado'
  }

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime()) || value.getFullYear() <= 1970) {
      return 'Nao informado'
    }

    return value.toLocaleString('pt-BR')
  }

  if (typeof value === 'number') {
    const parsedFromNumber = new Date(value)

    if (
      Number.isNaN(parsedFromNumber.getTime()) ||
      parsedFromNumber.getFullYear() <= 1970
    ) {
      return 'Nao informado'
    }

    return parsedFromNumber.toLocaleString('pt-BR')
  }

  if (typeof value !== 'string') {
    return 'Nao informado'
  }

  const normalizedValue = value.trim()

  if (!normalizedValue) {
    return 'Nao informado'
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    const [year, month, day] = normalizedValue.split('-')
    return `${day}/${month}/${year}`
  }

  const parsedDate = new Date(normalizedValue)

  if (Number.isNaN(parsedDate.getTime()) || parsedDate.getFullYear() <= 1970) {
    return 'Nao informado'
  }

  return parsedDate.toLocaleString('pt-BR')
}
