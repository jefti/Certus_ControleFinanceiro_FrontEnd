import { useEffect, useRef, useState } from "react";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";
import { FloatingAlert } from "../../components/FloatingAlert/FloatingAlert";
import {
  createTitle,
  deleteTitle,
  getTitles,
  updateTitle,
} from "../../services/titleService";
import { getCostCenters } from "../../services/costCenterService";
import { getApiErrorMessage } from "../../services/httpError";
import type { CostCenter } from "../../types/CostCenter";
import type {
  FinancialTitle,
  RecurrenceType,
  TitleRequest,
  TitleType,
} from "../../types/title";
import "./TitlesPage.css";

type TitleFormState = {
  descricao: string;
  valor: string;
  tipo: TitleType;
  centroDeCustoId: string;
  dataVencimento: string;
  recorrencia: RecurrenceType | "";
  dataFim: string;
};

const initialFormState: TitleFormState = {
  descricao: "",
  valor: "",
  tipo: "PAGAR",
  centroDeCustoId: "",
  dataVencimento: "",
  recorrencia: "",
  dataFim: "",
};

const titleTypeLabel: Record<TitleType, string> = {
  PAGAR: "Pagar",
  RECEBER: "Receber",
};

const recurrenceOptions: Array<{ value: RecurrenceType; label: string }> = [
  { value: "SEMANAL", label: "Semanal" },
  { value: "MENSAL", label: "Mensal" },
  { value: "BIMESTRAL", label: "Bimestral" },
  { value: "TRIMESTRAL", label: "Trimestral" },
  { value: "SEMESTRAL", label: "Semestral" },
  { value: "ANUAL", label: "Anual" },
];

const amountPattern = /^\d*(?:[.,]\d{0,2})?$/;

export function TitlesPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const listRef = useRef<HTMLElement | null>(null);
  const [titles, setTitles] = useState<FinancialTitle[]>([]);
  const [costCenters, setCostCenters] = useState<CostCenter[]>([]);
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [formState, setFormState] = useState<TitleFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const isBusy = isLoading || isSubmitting || pendingDeleteId !== null;

  useEffect(() => {
    void loadPageData();
  }, []);

  async function loadPageData() {
    try {
      setIsLoading(true);
      const [titleData, costCenterData] = await Promise.all([
        getTitles(),
        getCostCenters(),
      ]);

      setTitles(titleData);
      setCostCenters(costCenterData);
    } catch (error) {
      setAlertMessage(
        getApiErrorMessage(error, "Nao foi possivel carregar os titulos.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  function updateField<Key extends keyof TitleFormState>(
    field: Key,
    value: TitleFormState[Key]
  ) {
    setFormState((currentState) => {
      const nextState = { ...currentState, [field]: value };

      if (field === "recorrencia" && !value) {
        nextState.dataFim = "";
      }

      return nextState;
    });
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

    if (!amountPattern.test(formState.valor.trim())) {
      return "Informe um valor numerico valido com ate duas casas decimais.";
    }

    const numericValue = Number(normalizeAmountValue(formState.valor));

    if (!formState.valor.trim() || Number.isNaN(numericValue) || numericValue <= 0) {
      return "Informe um valor valido maior que zero.";
    }

    if (!formState.dataVencimento) {
      return "Informe a data de vencimento.";
    }

    if (!formState.centroDeCustoId) {
      return "Selecione um centro de custo.";
    }

    if (formState.recorrencia && !formState.dataFim) {
      return "Informe a data final quando houver recorrencia.";
    }

    if (
      formState.recorrencia &&
      formState.dataFim &&
      formState.dataFim < formState.dataVencimento
    ) {
      return "A data final da recorrencia deve ser igual ou posterior ao vencimento.";
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

  function buildPayload(): TitleRequest {
    return {
      descricao: formState.descricao.trim(),
      valor: Number(normalizeAmountValue(formState.valor)),
      dataVencimento: formState.dataVencimento,
      tipo: formState.tipo,
      recorrencia: formState.recorrencia || null,
      dataFim: formState.recorrencia ? formState.dataFim : null,
      centroDeCustoIds: [Number(formState.centroDeCustoId)],
    };
  }

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatDate(date: string | null) {
    if (!date) {
      return "-";
    }

    const [year, month, day] = date.split("-");

    if (!year || !month || !day) {
      return date;
    }

    return `${day}/${month}/${year}`;
  }

  function getCostCenterDescription(title: FinancialTitle) {
    return title.centrosDeCusto.map((costCenter) => costCenter.descricao).join(", ");
  }

  function handleAmountChange(value: string) {
    const sanitizedValue = value.replace(/[^\d.,]/g, "");

    if (!amountPattern.test(sanitizedValue)) {
      return;
    }

    updateField("valor", sanitizedValue);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setSuccessMessage("");
      setAlertMessage(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      setSuccessMessage("");

      const payload = buildPayload();

      if (editingTitleId !== null) {
        const updatedTitle = await updateTitle(editingTitleId, payload);

        setTitles((currentTitles) =>
          currentTitles.map((title) =>
            title.id === editingTitleId ? updatedTitle : title
          )
        );

        setSuccessMessage("Titulo atualizado com sucesso.");
      } else {
        const createdTitle = await createTitle(payload);

        setTitles((currentTitles) => [...currentTitles, createdTitle]);
        setSuccessMessage("Titulo cadastrado com sucesso.");
      }

      resetForm();
    } catch (error) {
      setSuccessMessage("");
      setAlertMessage(
        getApiErrorMessage(error, "Nao foi possivel salvar o titulo.")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(title: FinancialTitle) {
    if (isBusy) return;

    setEditingTitleId(title.id);
    setFormState({
      descricao: title.descricao,
      valor: String(title.valor),
      tipo: title.tipo,
      centroDeCustoId: String(title.centrosDeCusto[0]?.id ?? ""),
      dataVencimento: title.dataVencimento,
      recorrencia: title.recorrencia ?? "",
      dataFim: title.dataFim ?? "",
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
    if (isBusy) return;
    setConfirmDeleteId(titleId);
  }

  async function handleDeleteConfirm() {
    if (confirmDeleteId === null) return;

    try {
      setPendingDeleteId(confirmDeleteId);
      await deleteTitle(confirmDeleteId);

      setTitles((currentTitles) =>
        currentTitles.filter((title) => title.id !== confirmDeleteId)
      );

      if (editingTitleId === confirmDeleteId) {
        resetForm();
      }

      setSuccessMessage("Titulo excluido com sucesso.");
    } catch (error) {
      setSuccessMessage("");
      setAlertMessage(
        getApiErrorMessage(error, "Nao foi possivel excluir o titulo.")
      );
    } finally {
      setConfirmDeleteId(null);
      setPendingDeleteId(null);
    }
  }

  function getBusyMessage() {
    if (isLoading) {
      return "Carregando titulos e centros de custo...";
    }

    if (pendingDeleteId !== null) {
      return "Excluindo titulo...";
    }

    if (editingTitleId !== null) {
      return "Salvando alteracoes...";
    }

    return "Cadastrando titulo...";
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
            Cadastre contas a pagar e a receber vinculando cada titulo ao centro
            de custo correto do usuario autenticado.
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
                Preencha os dados principais do titulo. O centro de custo e
                carregado automaticamente com base no usuario autenticado.
              </p>
            </div>

            {isBusy && (
              <div className="titles-page__loading-banner" role="status" aria-live="polite">
                <span className="titles-page__loading-spinner" />
                <span>{getBusyMessage()}</span>
              </div>
            )}

            <input
              className="titles-page__input titles-page__input--wide"
              type="text"
              placeholder="Descricao"
              value={formState.descricao}
              disabled={isBusy}
              onChange={(event) => updateField("descricao", event.target.value)}
              required
            />

            <input
              className="titles-page__input"
              type="text"
              inputMode="decimal"
              placeholder="Valor"
              value={formState.valor}
              disabled={isBusy}
              onChange={(event) => handleAmountChange(event.target.value)}
              required
            />

            <select
              className="titles-page__input"
              value={formState.tipo}
              disabled={isBusy}
              onChange={(event) =>
                updateField("tipo", event.target.value as TitleType)
              }
            >
              <option value="PAGAR">Pagar</option>
              <option value="RECEBER">Receber</option>
            </select>

            <select
              className="titles-page__input"
              value={formState.centroDeCustoId}
              disabled={isBusy || costCenters.length === 0}
              onChange={(event) =>
                updateField("centroDeCustoId", event.target.value)
              }
              required
            >
              <option value="">
                {costCenters.length === 0
                  ? "Nenhum centro de custo disponivel"
                  : "Selecione um centro de custo"}
              </option>
              {costCenters.map((costCenter) => (
                <option key={costCenter.id} value={costCenter.id}>
                  {costCenter.descricao}
                </option>
              ))}
            </select>

            <input
              className="titles-page__input"
              type="date"
              value={formState.dataVencimento}
              disabled={isBusy}
              onChange={(event) =>
                updateField("dataVencimento", event.target.value)
              }
              required
            />

            <select
              className="titles-page__input"
              value={formState.recorrencia}
              disabled={isBusy}
              onChange={(event) =>
                updateField(
                  "recorrencia",
                  event.target.value as TitleFormState["recorrencia"]
                )
              }
            >
              <option value="">Sem recorrencia</option>
              {recurrenceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <input
              className="titles-page__input"
              type="date"
              value={formState.dataFim}
              disabled={isBusy || !formState.recorrencia}
              min={formState.dataVencimento || undefined}
              onChange={(event) => updateField("dataFim", event.target.value)}
            />

            <div className="titles-page__actions">
              <button className="titles-page__button" type="submit" disabled={isBusy}>
                {editingTitleId !== null
                  ? isSubmitting
                    ? "Salvando alteracoes..."
                    : "Salvar alteracoes"
                  : isSubmitting
                  ? "Cadastrando..."
                  : "Cadastrar titulo"}
              </button>

              {editingTitleId !== null && (
                <button
                  className="titles-page__button titles-page__button--secondary"
                  type="button"
                  disabled={isBusy}
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

          {isLoading ? (
            <div className="titles-page__empty-state">
              <strong>Carregando titulos...</strong>
              <p>Aguarde enquanto buscamos os dados do usuario autenticado.</p>
            </div>
          ) : titles.length === 0 ? (
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
                      <th>Recorrencia</th>
                      <th>Acoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {titles.map((title) => (
                      <tr key={title.id}>
                        <td>{title.descricao}</td>
                        <td>{formatCurrency(title.valor)}</td>
                        <td>{titleTypeLabel[title.tipo]}</td>
                        <td>{getCostCenterDescription(title) || "-"}</td>
                        <td>{formatDate(title.dataVencimento)}</td>
                        <td>
                          {title.recorrencia
                            ? `${title.recorrencia} ate ${formatDate(title.dataFim)}`
                            : "Sem recorrencia"}
                        </td>
                        <td>
                          <div className="titles-page__table-actions">
                            <button
                              type="button"
                              className="titles-page__action-button"
                              disabled={isBusy}
                              onClick={() => handleEdit(title)}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              className="titles-page__action-button titles-page__action-button--danger"
                              disabled={isBusy}
                              onClick={() => handleDeleteRequest(title.id)}
                            >
                              {pendingDeleteId === title.id ? "Excluindo..." : "Excluir"}
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
                        {titleTypeLabel[title.tipo]}
                      </span>
                    </div>

                    <div className="titles-page__mobile-card-meta">
                      <span>{formatCurrency(title.valor)}</span>
                      <span>{formatDate(title.dataVencimento)}</span>
                    </div>

                    <p className="titles-page__mobile-card-text">
                      Centro de custo: {getCostCenterDescription(title) || "-"}
                    </p>

                    <p className="titles-page__mobile-card-text">
                      {title.recorrencia
                        ? `Recorrencia ${title.recorrencia} ate ${formatDate(title.dataFim)}`
                        : "Sem recorrencia"}
                    </p>

                    <div className="titles-page__mobile-card-actions">
                      <button
                        type="button"
                        className="titles-page__action-button"
                        disabled={isBusy}
                        onClick={() => handleEdit(title)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="titles-page__action-button titles-page__action-button--danger"
                        disabled={isBusy}
                        onClick={() => handleDeleteRequest(title.id)}
                      >
                        {pendingDeleteId === title.id ? "Excluindo..." : "Excluir"}
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

function normalizeAmountValue(value: string) {
  return value.trim().replace(",", ".");
}
