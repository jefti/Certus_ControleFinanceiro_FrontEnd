import'./homepage.css' 

export function HomePage() {
  return (
    <>
<section className="hero">
    <div className="hero-text">
        <h2>CERTUS GESTÃO FINANCEIRA</h2>
        <p>Sua solução confiável em gestão financeira</p>
        <button>Saiba Mais</button>
    </div>
</section>

<section className="servicos">
    <h2>Nossos Serviços</h2>

    <div className="cards">
        <div className="card">
            <h3>Controle de Despesas</h3>
            <p>Gerencie suas despesas pessoais e empresariais.</p>
        </div>

        <div className="card">
            <h3>Gestão de Contas</h3>
            <p>Controle contas a pagar e receber com praticidade.</p>
        </div>

        <div className="card">
            <h3>Dashboards Financeiros</h3>
            <p>Visualize seus dados com gráficos intuitivos.</p>
        </div>
    </div>
</section>

<footer>
    <p>?</p>
</footer>
</>
  )
}
