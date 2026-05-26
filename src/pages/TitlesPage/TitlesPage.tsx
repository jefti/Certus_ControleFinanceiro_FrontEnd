import { useRef, useState } from "react";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";
import { FloatingAlert } from "../../components/FloatingAlert/FloatingAlert";
import "./TitlesPage.css";

type TitleType = "Pagar" | "Receber";

type FinancialTitle = {
  id: number;
  descricao: string;
  valor: string;
  tipo: TitleType;
  centroDeCusto: string;
  dataVencimento: string;
};

type TitleFormState = {
  descricao: string;
  valor: string;
  tipo: TitleType;
  centroDeCusto: string;
  dataVencimento: string;
};

const initialFormState: TitleFormState = {
  descricao: "",
  valor: "",
  tipo: "Pagar",
  centroDeCusto: "",
  dataVencimento: "",
};

export function TitlesPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const listRef = useRef<HTMLElement | null>(null);
  const [titles, setTitles] = useState<FinancialTitle[]>([]);
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [formState, setFormState] = useState<TitleFormState>(initialFormState);
  const [successMessage, setSuccessMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  function updateField<Key extends keyof TitleFormState>(
    field: Key,
    value: TitleFormState[Key]
  ) {
    setFormState((currentState) => ({ ...currentState, [field]: value }));
  }

  function resetForm() {
    setFormState(initialFormState);
    setEditingTitleId(null);
    setSuccessMessage("");

    window.requestAnimationFrame(() => {
      const listTop = listRef.current?.getBoundingClientRect().top;

      if (typeof listTop === "number") {
        window.scrollTo({
          top: window.scrollY + listTop - 84,
          behavior: "smooth",
        });
      }
    });
  }

  function validateForm() {
    if (!formState.descricao.trim()) {
      return "Informe a descricao do titulo.";
    }

    if (!formState.valor.trim()) {
      return "Informe o valor do titulo.";
    }

    const numericValue = Number(formState.valor.replace(",", "."));

    if (Number.isNaN(numericValue) || numericValue <= 0) {
      return "Informe um valor valido maior que zero.";
    }

    const duplicatedTitle = titles.some((title) => {
      const sameDescription =
        title.descricao.trim().toLowerCase() ===
        formState.descricao.trim().toLowerCase();

      if (!sameDescription) {
        return false;
      }

      if (editingTitleId === null) {
        return true;
      }

      return title.id !== editingTitleId;
    });

    if (duplicatedTitle) {
      return "Ja existe um titulo com essa descricao.";
    }

    return "";
  }

  function formatCurrency(value: string) {
    const normalizedValue = Number(value.replace(",", "."));

    if (Number.isNaN(normalizedValue)) {
      return value;
    }

    return normalizedValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatDate(date: string) {
    if (!date) {
      return "Sem vencimento";
    }

    const [year, month, day] = date.split("-");

    if (!year || !month || !day) {
      return date;
    }

    return `${day}/${month}/${year}`;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setSuccessMessage("");
      setAlertMessage(validationError);
      return;
    }

    const normalizedTitle: FinancialTitle = {
      id: editingTitleId ?? Date.now(),
      descricao: formState.descricao.trim(),
      valor: formState.valor.trim().replace(",", "."),
      tipo: formState.tipo,
      centroDeCusto: formState.centroDeCusto.trim(),
      dataVencimento: formState.dataVencimento,
    };

    if (editingTitleId !== null) {
      setTitles((currentTitles) =>
        currentTitles.map((title) =>
          title.id === editingTitleId ? normalizedTitle : title
        )
      );

      setSuccessMessage("Titulo atualizado com sucesso.");
    } else {
      setTitles((currentTitles) => [...currentTitles, normalizedTitle]);
      setSuccessMessage("Titulo cadastrado com sucesso.");
    }

    setFormState(initialFormState);
    setEditingTitleId(null);
  }

  function handleEdit(title: FinancialTitle) {
    setEditingTitleId(title.id);
    setFormState({
      descricao: title.descricao,
      valor: title.valor,
      tipo: title.tipo,
      centroDeCusto: title.centroDeCusto,
      dataVencimento: title.dataVencimento,
    });
    setSuccessMessage("");

    window.requestAnimationFrame(() => {
      const formTop = formRef.current?.getBoundingClientRect().top;

      if (typeof formTop === "number") {
        window.scrollTo({
          top: window.scrollY + formTop - 84,
          behavior: "smooth",
        });
      }
    });
  }

  function handleDeleteRequest(titleId: number) {
    setConfirmDeleteId(titleId);
  }

  function handleDeleteConfirm() {
    if (confirmDeleteId === null) return;
    setTitles((currentTitles) =>
      currentTitles.filter((title) => title.id !== confirmDeleteId)
    );

    if (editingTitleId === confirmDeleteId) {
      setFormState(initialFormState);
      setEditingTitleId(null);
    }

    setConfirmDeleteId(null);
    setSuccessMessage("Titulo excluido com sucesso.");
  }

  return (
    <main className="titles-page">
      <ConfirmDialog
        isOpen={confirmDeleteId !== null}
        title="Excluir titulo"
        message="Tem certeza que deseja excluir este titulo?"
        confirmLabel="Excluir"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDeleteId(null)}
      />

      <FloatingAlert
        isOpen={Boolean(alertMessage)}
        title="Nao foi possivel continuar"
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />

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
          <form ref={formRef} className="titles-page__form" onSubmit={handleSubmit}>
            <div className="titles-page__form-heading">
              <span>Cadastro</span>
              <h2>
                {editingTitleId !== null ? "Editar titulo" : "Cadastrar titulo"}
              </h2>
              <p>
                Preencha os dados principais do titulo e mantenha o controle das
                contas do projeto.
              </p>
            </div>

            <input
              className="titles-page__input titles-page__input--wide"
              type="text"
              placeholder="Descricao"
              value={formState.descricao}
              onChange={(event) => updateField("descricao", event.target.value)}
              required
            />

            <input
              className="titles-page__input"
              type="text"
              inputMode="decimal"
              placeholder="Valor"
              value={formState.valor}
              onChange={(event) => updateField("valor", event.target.value)}
              required
            />

            <select
              className="titles-page__input"
              value={formState.tipo}
              onChange={(event) =>
                updateField("tipo", event.target.value as TitleType)
              }
            >
              <option value="Pagar">Pagar</option>
              <option value="Receber">Receber</option>
            </select>


            <input
              className="titles-page__input"
              type="text"
              placeholder="Centro de Custo"
              value={formState.centroDeCusto}
              onChange={(event) =>
                updateField("centroDeCusto", event.target.value)
              }
            />

            <input
              className="titles-page__input"
              type="date"
              value={formState.dataVencimento}
              onChange={(event) =>
                updateField("dataVencimento", event.target.value)
              }
            />

            <div className="titles-page__actions">
              <button className="titles-page__button" type="submit">
                {editingTitleId !== null ? "Salvar alteracoes" : "Salvar"}
              </button>

              {editingTitleId !== null && (
                <button
                  className="titles-page__button titles-page__button--secondary"
                  type="button"
                  onClick={resetForm}
                >
                  Cancelar edicao
                </button>
              )}
            </div>
          </form>

          {successMessage && (
            <p className="titles-page__success-message">{successMessage}</p>
          )}
        </section>

        <section ref={listRef} className="titles-page__card titles-page__card--table">
          <div className="titles-page__table-header">
            <div>
              <span className="titles-page__eyebrow titles-page__eyebrow--table">
                Historico
              </span>
              <h2 className="titles-page__table-title">Seus registros</h2>
            </div>

            <p className="titles-page__table-description">
              Edite ou exclua os titulos cadastrados conforme a evolucao do seu
              controle financeiro.
            </p>
          </div>

          {titles.length === 0 ? (
            <div className="titles-page__empty-state">
              <strong>Nenhum titulo cadastrado ainda.</strong>
              <p>Assim que voce salvar um titulo, ele aparecera nesta area.</p>
            </div>
          ) : (
            <>
              <div className="titles-page__table-wrap">
                <table className="titles-page__table">
                  <thead>
                    <tr>
                      <th>Descricao</th>
                      <th>Valor</th>
                      <th>Tipo</th>
                      <th>Centro de Custo</th>
                      <th>Vencimento</th>
                      <th>Acoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {titles.map((title) => (
                      <tr key={title.id}>
                        <td>{title.descricao}</td>
                        <td>{formatCurrency(title.valor)}</td>
                        <td>{title.tipo}</td>
                        <td>{title.centroDeCusto || "-"}</td>
                        <td>{formatDate(title.dataVencimento)}</td>
                        <td>
                          <div className="titles-page__table-actions">
                            <button
                              type="button"
                              className="titles-page__action-button"
                              onClick={() => handleEdit(title)}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              className="titles-page__action-button titles-page__action-button--danger"
                              onClick={() => handleDeleteRequest(title.id)}
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

              <div className="titles-page__mobile-list">
                {titles.map((title) => (
                  <article key={title.id} className="titles-page__mobile-card">
                    <div className="titles-page__mobile-card-top">
                      <strong className="titles-page__mobile-card-title">
                        {title.descricao}
                      </strong>
                      <span
                        className={`titles-page__mobile-card-badge titles-page__mobile-card-badge--${title.tipo.toLowerCase()}`}
                      >
                        {title.tipo}
                      </span>
                    </div>

                    <div className="titles-page__mobile-card-meta">
                      <span>{formatCurrency(title.valor)}</span>
                      <span>{formatDate(title.dataVencimento)}</span>
                    </div>

                    {( title.centroDeCusto) && (
                      <p className="titles-page__mobile-card-text">
                        {title.centroDeCusto}
                      </p>
                    )}

                    <div className="titles-page__mobile-card-actions">
                      <button
                        type="button"
                        className="titles-page__action-button"
                        onClick={() => handleEdit(title)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="titles-page__action-button titles-page__action-button--danger"
                        onClick={() => handleDeleteRequest(title.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}
