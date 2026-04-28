import { Link } from 'react-router-dom'
import '../TitlesPage/TitlesPage.css'

export function CostCenterPausedPage() {
  return (
    <main className="construction-page">
      <section className="construction-page__panel">
        <div className="construction-page__content">
          <span className="construction-page__eyebrow">
            M{"\u00f3"}dulo pausado
          </span>
          <h1 className="construction-page__title">Centro de Custos</h1>
          <p className="construction-page__description">
            A implementa{"\u00e7"}{"\u00e3"}o atual foi desativada porque n
            {"\u00e3"}o representa o conceito correto de centro de custos do
            projeto. Esta {"\u00e1"}rea fica pausada por enquanto e ser{"\u00e1"}
            refeita na pr{"\u00f3"}xima etapa.
          </p>

          <div className="construction-page__actions">
            <Link className="construction-page__button" to="/inicio">
              Voltar ao in{"\u00ed"}cio
            </Link>
            <Link
              className="construction-page__button construction-page__button--secondary"
              to="/dashboard"
            >
              Ir para o dashboard
            </Link>
          </div>
        </div>

        <div className="construction-page__visual" aria-hidden="true">
          <div className="construction-page__glow construction-page__glow--gold" />
          <div className="construction-page__glow construction-page__glow--green" />
          <div className="construction-page__image-frame">
            <img
              src="/logo-certus-resumed.png"
              alt=""
              className="construction-page__image"
            />
          </div>
          <div className="construction-page__badge">
            Revis{"\u00e3"}o pendente
          </div>
        </div>
      </section>
    </main>
  )
}
