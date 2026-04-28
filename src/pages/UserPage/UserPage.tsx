import { useAuth } from '../../hooks/useAuth'
import { getUserInitial, getUserNickname } from '../../utils/userDisplay'
import './UserPage.css'

export function UserPage() {
  const { user } = useAuth()

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
              Esta {"\u00e1"}rea centraliza os dados principais da conta e fica
              pronta para receber os pr{"\u00f3"}ximos ajustes de perfil do
              sistema.
            </p>
          </div>
        </div>

        <div className="user-page__card">
          <span className="user-page__label">Status</span>
          <strong>
            Perfil em evolu{"\u00e7"}{"\u00e3"}o
          </strong>
          <p>
            Os dados abaixo j{"\u00e1"} ajudam na confer{"\u00ea"}ncia da sess
            {"\u00e3"}o atual enquanto a tela completa de perfil est{"\u00e1"}
            sendo finalizada.
          </p>
        </div>
      </section>

      <section className="user-page__grid">
        <article className="user-page__info-card">
          <span className="user-page__label">Nome completo</span>
          <strong>{user?.nome ?? `N${"\u00e3"}o informado`}</strong>
        </article>

        <article className="user-page__info-card">
          <span className="user-page__label">E-mail</span>
          <strong>{user?.email ?? `N${"\u00e3"}o informado`}</strong>
        </article>

        <article className="user-page__info-card">
          <span className="user-page__label">Identificador</span>
          <strong>{user?.id ?? '-'}</strong>
        </article>
      </section>
    </main>
  )
}
