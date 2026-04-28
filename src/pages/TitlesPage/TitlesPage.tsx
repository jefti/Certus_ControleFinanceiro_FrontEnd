import './TitlesPage.css'

export function TitlesPage() {
  return (
    <main className="titles-page">
      <section className="titles-page__main">
        <header className="titles-page__header">
          <span className="titles-page__eyebrow">Controle financeiro</span>
          <h1 className="titles-page__title">Cadastro de Titulos</h1>
          <p className="titles-page__description">
            Cadastre contas a pagar e a receber com uma interface organizada e
            alinhada ao restante do sistema.
          </p>
        </header>

        <section className="titles-page__card">
          <form className="titles-page__form" id="form">
            <input
              className="titles-page__input titles-page__input--wide"
              type="text"
              id="descricao"
              placeholder="Descricao"
              required
            />

            <input
              className="titles-page__input"
              type="number"
              id="valor"
              placeholder="Valor"
              required
            />

            <select className="titles-page__input" id="tipo" defaultValue="Pagar">
              <option value="Pagar">Pagar</option>
              <option value="Receber">Receber</option>
            </select>

            <input
              className="titles-page__input"
              type="text"
              id="categoria"
              placeholder="Categoria"
            />

            <input
              className="titles-page__input"
              type="text"
              id="centro_custo"
              placeholder="Centro de Custo"
            />

            <input
              className="titles-page__input"
              type="date"
              id="data_vencimento"
            />

            <button className="titles-page__button" type="submit">
              Salvar
            </button>
          </form>
        </section>

        <section className="titles-page__card titles-page__card--table">
          <div className="titles-page__table-header">
            <h2 className="titles-page__table-title">Seus Registros</h2>
          </div>

          <div className="titles-page__table-wrap">
            <table className="titles-page__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descricao</th>
                  <th>Valor</th>
                  <th>Tipo</th>
                  <th>Categoria</th>
                  <th>Centro de Custo</th>
                  <th>Vencimento</th>
                  <th>Acao</th>
                </tr>
              </thead>
              <tbody id="tabela">
                <tr>
                  <td colSpan={8} className="titles-page__empty">
                    Nenhum registro cadastrado ainda.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  )
}
