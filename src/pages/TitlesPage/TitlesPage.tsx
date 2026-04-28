import './TitlesPage.css'

export function TitlesPage() {
  return (
   <><main className="main">

    <h1>Cadastro de Título</h1>

    <form id="form">
        <input type="text" id="descricao" placeholder="Descrição" required/>
        <input type="number" id="valor" placeholder="Valor" required/>

        <select id="tipo">
            <option value="Pagar">Pagar</option>
            <option value="Receber">Receber</option>
        </select>

        <input type="text" id="categoria" placeholder="Categoria"/>
        <input type="text" id="centro_custo" placeholder="Centro de Custo"/>
        <input type="date" id="data_vencimento"/>

        <button type="submit">Salvar</button>
    </form>

    <h2>Seus Registros</h2>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Categoria</th>
                <th>Centro de Custo</th>
                <th>Vencimento</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody id="tabela"></tbody>
    </table>

</main></>
  )
}
