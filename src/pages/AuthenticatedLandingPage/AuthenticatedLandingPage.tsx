import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getUserNickname } from '../../utils/userDisplay'
import { shortcuts } from './HomeShortCut'
import './authenticatedLandingPage.css'

export function AuthenticatedLandingPage() {
  const { user } = useAuth()

  return (
    <main className="authenticated-landing-page">
      <section className="authenticated-landing-page__hero">
        <div>
          <span className="authenticated-landing-page__eyebrow">
            Certus Controle Financeiro
          </span>

          <h1 className="authenticated-landing-page__title">
            Ol{"\u00e1"}, {getUserNickname(user?.nome)}.
          </h1>

          <p className="authenticated-landing-page__text">
            Acesse as quatro {"\u00e1"}reas centrais do projeto e acompanhe o que
            j{"\u00e1"} est{"\u00e1"} pronto e o que ainda est{"\u00e1"} em
            evolu{"\u00e7"}{"\u00e3"}o.
          </p>
        </div>

        <div className="authenticated-landing-page__summary">
          <strong>Menu principal</strong>
          <span>
            Dashboard, centro de custos, t{"\u00edtulos"} e conta do usu
            {"\u00e1"}rio reunidos em um {"\u00fanico"} ponto de entrada.
          </span>
        </div>
      </section>

      <section
        className="authenticated-landing-page__actions"
        aria-label="Atalhos do sistema"
      >
        {shortcuts.map((item) => (
          <div
            key={item.path}
            className={`authenticated-landing-page__card${
              item.disabled ? ' authenticated-landing-page__card--disabled' : ''
            }`}
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

            {item.disabled ? (
              <span className="authenticated-landing-page__card-button authenticated-landing-page__card-button--disabled">
                {item.buttonLabel}
              </span>
            ) : (
              <Link
                to={item.path}
                className="authenticated-landing-page__card-button"
              >
                {item.buttonLabel}
              </Link>
            )}
          </div>
        ))}
      </section>
    </main>
  )
}
