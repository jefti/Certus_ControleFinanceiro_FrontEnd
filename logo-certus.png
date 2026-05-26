import "./HomePage.css";

const serviceItems = [
  {
    title: "Controle de Despesas",
    description:
      "Monitore saídas em tempo real, classifique lançamentos e identifique com rapidez os custos que mais impactam o caixa.",
  },
  {
    title: "Gestão de Contas",
    description:
      "Acompanhe contas a pagar e a receber com mais organização, previsibilidade e segurança no fluxo financeiro.",
  },
  {
    title: "Dashboards Financeiros",
    description:
      "Visualize indicadores estratégicos, acompanhe resultados e transforme dados em decisões mais assertivas.",
  },
];

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__overlay" />

        <div className="home-hero__content">
          <span className="home-hero__eyebrow">Gestão financeira com clareza</span>

          <h1 className="home-hero__title">CERTUS GESTÃO FINANCEIRA</h1>

          <p className="home-hero__description">
            Centralize rotinas financeiras, acompanhe movimentações com precisão
            e tenha mais controle para planejar, decidir e crescer com
            confiança.
          </p>

          <div className="home-hero__actions">
            <a className="home-hero__button" href="#servicos">
              Conheça as soluções
            </a>

            <div className="home-hero__badge">
              Mais organização financeira, visão estratégica e decisões
              sustentadas por dados.
            </div>
          </div>
        </div>
      </section>

      <section className="home-services" id="servicos">
        <div className="home-services__header">
          <span className="home-section__eyebrow">Nossos serviços</span>
          <h2 className="home-services__title">
            Soluções para uma gestão financeira mais eficiente
          </h2>
          <p className="home-services__subtitle">
            Recursos desenvolvidos para dar mais controle, agilidade e
            visibilidade à rotina financeira da sua empresa.
          </p>
        </div>

        <div className="home-services__grid">
          {serviceItems.map((service) => (
            <article className="home-service-card" key={service.title}>
              <div className="home-service-card__icon" aria-hidden="true">
                <span />
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <p>2026 CERTUS Gestão Financeira - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
