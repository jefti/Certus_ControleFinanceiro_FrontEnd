import { useState } from "react";
import "./CostCenterPage.css";
import { TextField } from "../../components/TextField/TextField";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";

type ExpenseType = "recorrente" | "nao-recorrente";

type Expense = {
  id: number;
  description: string;
  value: number;
  date: string;
  type: ExpenseType;
  periodicity?: string;
  source: string;
};

const availableSources = [
  "Marketing",
  "Infraestrutura",
  "Equipe",
  "Ferramentas",
  "Operacional",
];

export function CostCenterPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);

  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<ExpenseType>("recorrente");
  const [periodicity, setPeriodicity] = useState("");
  const [source, setSource] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setDescription("");
    setValue("");
    setDate("");
    setType("recorrente");
    setPeriodicity("");
    setSource("");
    setEditingExpenseId(null);
    setError("");
  }

  function validateForm() {
    if (!description.trim()) {
      return "Informe a descrição do gasto.";
    }

    if (!value || Number(value) <= 0) {
      return "Informe um valor válido para o gasto.";
    }

    if (!date) {
      return "Informe a data do gasto.";
    }

    if (!source) {
      return "Selecione um centro de custo.";
    }

    if (type === "recorrente" && !periodicity) {
      return "Selecione a periodicidade do gasto recorrente.";
    }

    return "";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    setError("");

    const expenseData: Expense = {
      id: editingExpenseId ?? Date.now(),
      description: description.trim(),
      value: Number(value),
      date,
      type,
      periodicity: type === "recorrente" ? periodicity : undefined,
      source,
    };

    setTimeout(() => {
      if (editingExpenseId) {
        setExpenses((currentExpenses) =>
          currentExpenses.map((expense) =>
            expense.id === editingExpenseId ? expenseData : expense
          )
        );

        setSuccessMessage("Gasto atualizado com sucesso.");
      } else {
        setExpenses((currentExpenses) => [...currentExpenses, expenseData]);
        setSuccessMessage("Gasto cadastrado com sucesso.");
      }

      setLoading(false);
      resetForm();
    }, 500);
  }

  function handleEdit(expense: Expense) {
    setEditingExpenseId(expense.id);
    setDescription(expense.description);
    setValue(String(expense.value));
    setDate(expense.date);
    setType(expense.type);
    setPeriodicity(expense.periodicity ?? "");
    setSource(expense.source);
    setError("");
    setSuccessMessage("");
  }

  function handleDelete(expenseId: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este gasto?"
    );

    if (!confirmDelete) return;

    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId)
    );

    if (editingExpenseId === expenseId) {
      resetForm();
    }

    setSuccessMessage("Gasto excluído com sucesso.");
    setError("");
  }

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatDate(date: string) {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
  }

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.value,
    0
  );

  const recurringExpenses = expenses.filter(
    (expense) => expense.type === "recorrente"
  ).length;

  const nonRecurringExpenses = expenses.filter(
    (expense) => expense.type === "nao-recorrente"
  ).length;

  return (
    <section className="cost-center-page">
      <div className="cost-center-background-detail cost-center-background-detail-left" />
      <div className="cost-center-background-detail cost-center-background-detail-right" />

      <div className="cost-center-container">
        <header className="cost-center-header">
          <div className="cost-center-header-content">
            <span className="cost-center-eyebrow">Gestão financeira</span>

            <h2 className="cost-center-title">Centro de Custos</h2>

            <p className="cost-center-description">
              Organize seus gastos por centro de custo, acompanhe despesas
              recorrentes e não recorrentes e mantenha seus lançamentos
              financeiros mais claros.
            </p>
          </div>

          <div className="cost-center-logo-box">
            <img
              className="cost-center-img"
              src="/logo-certus.png"
              alt="Certus"
            />
          </div>
        </header>

        <section className="cost-center-summary">
          <div className="cost-center-summary-item cost-center-summary-item-primary">
            <span>Total de gastos</span>
            <strong>{formatCurrency(totalExpenses)}</strong>
            <small>Soma de todos os gastos cadastrados.</small>
          </div>

          <div className="cost-center-summary-item">
            <span>Gastos cadastrados</span>
            <strong>{expenses.length}</strong>
            <small>Total de lançamentos registrados.</small>
          </div>

          <div className="cost-center-summary-item">
            <span>Recorrentes</span>
            <strong>{recurringExpenses}</strong>
            <small>Gastos com repetição periódica.</small>
          </div>

          <div className="cost-center-summary-item">
            <span>Não recorrentes</span>
            <strong>{nonRecurringExpenses}</strong>
            <small>Gastos pontuais cadastrados.</small>
          </div>
        </section>

        <div className="cost-center-content-grid">
          <form className="cost-center-form" onSubmit={handleSubmit}>
            <div className="cost-center-section-heading">
              <span>Cadastro</span>
              <h3>
                {editingExpenseId ? "Editar gasto" : "Registrar novo gasto"}
              </h3>
              <p>
                Preencha os dados do lançamento e vincule-o ao centro de custo
                correspondente.
              </p>
            </div>

            <div className="cost-center-form-grid">
              <TextField
                label="Descrição:"
                type="text"
                placeholder="Ex: Internet, aluguel, manutenção"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <TextField
                label="Valor:"
                type="number"
                placeholder="Ex: 150.00"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />

              <TextField
                label={type === "recorrente" ? "Data de início:" : "Data:"}
                type="date"
                placeholder=""
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />

              <div className="cost-center-field">
                <label className="cost-center-label">Tipo de gasto:</label>

                <select
                  className="cost-center-select"
                  value={type}
                  onChange={(event) => {
                    const selectedType = event.target.value as ExpenseType;
                    setType(selectedType);

                    if (selectedType === "nao-recorrente") {
                      setPeriodicity("");
                    }
                  }}
                >
                  <option value="recorrente">Recorrente</option>
                  <option value="nao-recorrente">Não recorrente</option>
                </select>
              </div>

              {type === "recorrente" && (
                <div className="cost-center-field">
                  <label className="cost-center-label">Periodicidade:</label>

                  <select
                    className="cost-center-select"
                    value={periodicity}
                    onChange={(event) => setPeriodicity(event.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Quinzenal">Quinzenal</option>
                    <option value="Mensal">Mensal</option>
                    <option value="Anual">Anual</option>
                  </select>
                </div>
              )}

              <div className="cost-center-field">
                <label className="cost-center-label">Centro de custo:</label>

                <select
                  className="cost-center-select"
                  value={source}
                  onChange={(event) => setSource(event.target.value)}
                >
                  <option value="">Selecione um centro de custo</option>

                  {availableSources.map((sourceOption) => (
                    <option key={sourceOption} value={sourceOption}>
                      {sourceOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="cost-center-error-message">{error}</p>}

            {successMessage && (
              <p className="cost-center-success-message">{successMessage}</p>
            )}

            <div className="cost-center-actions">
              <PrimaryButton type="submit">
                {loading
                  ? "Salvando..."
                  : editingExpenseId
                  ? "Salvar alterações"
                  : "Cadastrar gasto"}
              </PrimaryButton>

              {editingExpenseId && (
                <button
                  type="button"
                  className="cost-center-cancel-button"
                  onClick={resetForm}
                >
                  Cancelar edição
                </button>
              )}
            </div>
          </form>

          <aside className="cost-center-info-panel">
            <span className="cost-center-info-tag">Centro de Custo</span>

            <h3>Como usar esta tela?</h3>

            <p>
              O centro de custo ajuda a separar os gastos por área, finalidade
              ou origem. Isso facilita entender para onde o dinheiro está indo
              e quais categorias pesam mais no orçamento.
            </p>

            <div className="cost-center-info-list">
              <div>
                <strong>1</strong>
                <span>Escolha se o gasto é recorrente ou pontual.</span>
              </div>

              <div>
                <strong>2</strong>
                <span>Informe valor, data e descrição do lançamento.</span>
              </div>

              <div>
                <strong>3</strong>
                <span>Vincule o gasto ao centro de custo correto.</span>
              </div>

              <div>
                <strong>4</strong>
                <span>Acompanhe os totais na listagem e nos resumos.</span>
              </div>
            </div>
          </aside>
        </div>

        <section className="cost-center-list-box">
          <div className="cost-center-list-header">
            <div>
              <span className="cost-center-eyebrow">Histórico</span>
              <h3 className="cost-center-section-title">
                Gastos cadastrados
              </h3>
            </div>

            <p>
              Consulte, edite ou exclua lançamentos vinculados aos centros de
              custo.
            </p>
          </div>

          {expenses.length === 0 ? (
            <div className="cost-center-empty-state">
              <strong>Nenhum gasto cadastrado ainda.</strong>

              <p>
                Assim que você registrar um gasto, ele aparecerá nesta área com
                valor, data, tipo, periodicidade e centro de custo.
              </p>
            </div>
          ) : (
            <div className="cost-center-table-wrapper">
              <table className="cost-center-table">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Periodicidade</th>
                    <th>Centro de custo</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.description}</td>
                      <td>{formatCurrency(expense.value)}</td>
                      <td>{formatDate(expense.date)}</td>
                      <td>
                        <span
                          className={`cost-center-badge ${
                            expense.type === "recorrente"
                              ? "cost-center-badge-recurring"
                              : "cost-center-badge-not-recurring"
                          }`}
                        >
                          {expense.type === "recorrente"
                            ? "Recorrente"
                            : "Não recorrente"}
                        </span>
                      </td>
                      <td>{expense.periodicity ?? "-"}</td>
                      <td>{expense.source}</td>
                      <td>
                        <div className="cost-center-table-actions">
                          <button
                            type="button"
                            className="cost-center-edit-button"
                            onClick={() => handleEdit(expense)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="cost-center-delete-button"
                            onClick={() => handleDelete(expense.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}