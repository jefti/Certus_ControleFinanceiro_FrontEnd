import { Link } from 'react-router-dom'
import './TitlesPage.css'

export function TitlesPage() {
  return (
    <main className="construction-page">
      <section className="construction-page__panel">
        <div className="construction-page__content">
          <span className="construction-page__eyebrow">
            M{"\u00f3"}dulo em constru{"\u00e7"}{"\u00e3"}o
          </span>
          <h1 className="construction-page__title">T{"\u00edtulos"}</h1>
          <p className="construction-page__description">
            Esta {"\u00e1"}rea foi reservada para o gerenciamento de t
            {"\u00edtulos"} financeiros. A rota j{"\u00e1"} est{"\u00e1"} pronta,
            e a tela fica organizada enquanto a estrutura funcional definitiva
            {"\u00e9"} desenhada.
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
            Em constru{"\u00e7"}{"\u00e3"}o
          </div>
        </div>
      </section>
    </main>
  )
}
