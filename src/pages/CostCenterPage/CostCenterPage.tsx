import { useEffect, useRef, useState } from "react";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";
import { FloatingAlert } from "../../components/FloatingAlert/FloatingAlert";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { TextField } from "../../components/TextField/TextField";
import {
  createCostCenter,
  deleteCostCenter,
  getCostCenters,
  updateCostCenter,
} from "../../services/costCenterService";
import { getApiErrorMessage } from "../../services/httpError";
import type { CostCenter } from "../../types/CostCenter";
import "./CostCenterPage.css";

export function CostCenterPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const listRef = useRef<HTMLElement | null>(null);
  const [costCenters, setCostCenters] = useState<CostCenter[]>([]);
  const [editingCostCenterId, setEditingCostCenterId] = useState<number | null>(
    null
  );
  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const isBusy = isLoading || isSubmitting || pendingDeleteId !== null;

  useEffect(() => {
    void loadCostCenters();
  }, []);

  async function loadCostCenters() {
    try {
      setIsLoading(true);
      const data = await getCostCenters();
      setCostCenters(data);
    } catch (error) {
      setAlertMessage(
        getApiErrorMessage(
          error,
          "Nao foi possivel carregar os centros de custo."
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setDescricao("");
    setObservacao("");
    setEditingCostCenterId(null);

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
    const normalizedDescription = descricao.trim();

    if (!normalizedDescription) {
      return "Informe a descricao do centro de custo.";
    }

    if (normalizedDescription.length > 255) {
      return "A descricao deve ter no maximo 255 caracteres.";
    }

    if (observacao.trim().length > 500) {
      return "A observacao deve ter no maximo 500 caracteres.";
    }

    const duplicatedCostCenter = costCenters.some((costCenter) => {
      const sameDescription =
        costCenter.descricao.trim().toLowerCase() ===
        normalizedDescription.toLowerCase();

      if (!sameDescription) {
        return false;
      }

      if (editingCostCenterId === null) {
        return true;
      }

      return costCenter.id !== editingCostCenterId;
    });

    if (duplicatedCostCenter) {
      return "Já existe um centro de custo com essa descrição.";
    }

    return "";
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

      const payload = {
        descricao: descricao.trim(),
        observacao: observacao.trim(),
      };

      if (editingCostCenterId !== null) {
        const updatedCostCenter = await updateCostCenter(
          editingCostCenterId,
          payload
        );

        setCostCenters((currentCostCenters) =>
          currentCostCenters.map((costCenter) =>
            costCenter.id === editingCostCenterId
              ? updatedCostCenter
              : costCenter
          )
        );

        setSuccessMessage("Centro de custo atualizado com sucesso.");
      } else {
        const createdCostCenter = await createCostCenter(payload);

        setCostCenters((currentCostCenters) => [
          ...currentCostCenters,
          createdCostCenter,
        ]);

        setSuccessMessage("Centro de custo cadastrado com sucesso.");
      }

      resetForm();
    } catch (error) {
      setSuccessMessage("");
      setAlertMessage(
        getApiErrorMessage(
          error,
          "Nao foi possivel salvar o centro de custo."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(costCenter: CostCenter) {
    if (isBusy) return;

    setEditingCostCenterId(costCenter.id);
    setDescricao(costCenter.descricao);
    setObservacao(costCenter.observacao);
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

  function handleDeleteRequest(costCenterId: number) {
    if (isBusy) return;
    setConfirmDeleteId(costCenterId);
  }

  async function handleDeleteConfirm() {
    if (confirmDeleteId === null) return;

    try {
      setPendingDeleteId(confirmDeleteId);
      await deleteCostCenter(confirmDeleteId);

      setCostCenters((currentCostCenters) =>
        currentCostCenters.filter((costCenter) => costCenter.id !== confirmDeleteId)
      );

      if (editingCostCenterId === confirmDeleteId) {
        resetForm();
      }

      setSuccessMessage("Centro de custo excluido com sucesso.");
    } catch (error) {
      setSuccessMessage("");
      setAlertMessage(
        getApiErrorMessage(
          error,
          "Nao foi possivel excluir o centro de custo."
        )
      );
    } finally {
      setConfirmDeleteId(null);
      setPendingDeleteId(null);
    }
  }

  function getBusyMessage() {
    if (isLoading) {
      return "Carregando centros de custo...";
    }

    if (pendingDeleteId !== null) {
      return "Excluindo centro de custo...";
    }

    if (editingCostCenterId !== null) {
      return "Salvando alteracoes...";
    }

    return "Cadastrando centro de custo...";
  }

  return (
    <section className="cost-center-page">
      <ConfirmDialog
        isOpen={confirmDeleteId !== null}
        title="Excluir centro de custo"
        message="Tem certeza que deseja excluir este centro de custo?"
        confirmLabel="Excluir"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDeleteId(null)}
      />

      <FloatingAlert
        isOpen={Boolean(alertMessage)}
        title="Não foi possível concluir à operação"
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />

      <div className="cost-center-background-detail cost-center-background-detail-left" />
      <div className="cost-center-background-detail cost-center-background-detail-right" />

      <div className="cost-center-container">
        <header className="cost-center-header">
          <div className="cost-center-header-content">
            <span className="cost-center-eyebrow">Gestao financeira</span>

            <h2 className="cost-center-title">Centro de Custos</h2>

            <p className="cost-center-description">
              Cadastre e organize os centros de custo usados para classificar
              receitas e despesas, facilitando a analise financeira e a gestao
              dos lancamentos vinculados ao usuario.
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

        <div className="cost-center-content-grid">
          <form
            ref={formRef}
            className={`cost-center-form${isBusy ? " cost-center-form--busy" : ""}`}
            onSubmit={handleSubmit}
          >
            <div className="cost-center-section-heading">
              <span>Cadastro</span>

              <h3>
                {editingCostCenterId !== null
                  ? "Editar centro de custo"
                  : "Cadastrar centro de custo"}
              </h3>

              <p>
                Informe a descricao do centro de custo e, se necessario,
                adicione uma observacao para complementar o cadastro.
              </p>
            </div>

            {isBusy && (
              <div className="cost-center-loading-banner" role="status" aria-live="polite">
                <span className="cost-center-loading-spinner" />
                <span>{getBusyMessage()}</span>
              </div>
            )}

            <div className="cost-center-form-grid">
              <TextField
                label="Descricao:"
                type="text"
                placeholder="Ex: Alimentacao, Transporte, Salario"
                value={descricao}
                disabled={isBusy}
                onChange={(event) => setDescricao(event.target.value)}
              />

              <div className="cost-center-field cost-center-field-full">
                <label className="cost-center-label">Observacao:</label>

                <textarea
                  className="cost-center-textarea"
                  placeholder="Ex: Centro usado para classificar despesas mensais de transporte."
                  value={observacao}
                  maxLength={500}
                  disabled={isBusy}
                  onChange={(event) => setObservacao(event.target.value)}
                />

                <small className="cost-center-counter">
                  {observacao.length}/500 caracteres
                </small>
              </div>
            </div>

            {successMessage && (
              <p className="cost-center-success-message">{successMessage}</p>
            )}

            <div className="cost-center-actions">
              <PrimaryButton type="submit" disabled={isBusy}>
                {editingCostCenterId !== null
                  ? isSubmitting
                    ? "Salvando alteracoes..."
                    : "Salvar alteracoes"
                  : isSubmitting
                  ? "Cadastrando..."
                  : "Cadastrar centro de custo"}
              </PrimaryButton>

              {editingCostCenterId !== null && (
                <button
                  type="button"
                  className="cost-center-cancel-button"
                  disabled={isBusy}
                  onClick={resetForm}
                >
                  Cancelar edicao
                </button>
              )}
            </div>
          </form>

          <aside className="cost-center-info-panel">
            <span className="cost-center-info-tag">Centro de Custo</span>

            <h3>Como usar esta tela?</h3>

            <p>
              O centro de custo funciona como uma categoria financeira. Ele
              permite agrupar receitas e despesas por finalidade, area ou tipo
              de movimentacao.
            </p>

            <div className="cost-center-info-list">
              <div>
                <strong>1</strong>
                <span>Cadastre uma descricao clara para o centro de custo.</span>
              </div>

              <div>
                <strong>2</strong>
                <span>Use a observacao para registrar detalhes complementares.</span>
              </div>

              <div>
                <strong>3</strong>
                <span>
                  Edite centros existentes quando houver mudanca de nome ou
                  finalidade.
                </span>
              </div>

              <div>
                <strong>4</strong>
                <span>Exclua apenas centros que nao devem mais ser utilizados.</span>
              </div>
            </div>
          </aside>
        </div>

        <section ref={listRef} className="cost-center-list-box">
          <div className="cost-center-list-header">
            <div>
              <span className="cost-center-eyebrow">Historico</span>

              <h3 className="cost-center-section-title">
                Centros de custo cadastrados
              </h3>
            </div>

            <p className="cost-center-list-description">
              Consulte, edite ou exclua os centros de custo disponiveis para
              organizar seus lancamentos financeiros.
            </p>
          </div>

          {isLoading ? (
            <div className="cost-center-empty-state">
              <strong>Carregando centros de custo...</strong>

              <p>
                Aguarde um instante enquanto buscamos os dados cadastrados para
                o usuario autenticado.
              </p>
            </div>
          ) : costCenters.length === 0 ? (
            <div className="cost-center-empty-state">
              <strong>Nenhum centro de custo cadastrado ainda.</strong>

              <p>
                Assim que voce cadastrar um centro de custo, ele aparecera nesta
                area com descricao, observacao e acoes disponiveis.
              </p>
            </div>
          ) : (
            <>
              <div className="cost-center-table-wrapper">
                <table className="cost-center-table">
                  <thead>
                    <tr>
                      <th>Descricao</th>
                      <th>Observacao</th>
                      <th>Acoes</th>
                    </tr>
                  </thead>

                  <tbody>
                    {costCenters.map((costCenter) => (
                      <tr key={costCenter.id}>
                        <td>{costCenter.descricao}</td>

                        <td>
                          {costCenter.observacao.trim()
                            ? costCenter.observacao
                            : "-"}
                        </td>

                        <td>
                          <div className="cost-center-table-actions">
                            <button
                              type="button"
                              className="cost-center-edit-button"
                              disabled={isBusy}
                              onClick={() => handleEdit(costCenter)}
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              className="cost-center-delete-button"
                              disabled={isBusy}
                              onClick={() => handleDeleteRequest(costCenter.id)}
                            >
                              {pendingDeleteId === costCenter.id
                                ? "Excluindo..."
                                : "Excluir"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="cost-center-mobile-list">
                {costCenters.map((costCenter) => (
                  <article key={costCenter.id} className="cost-center-mobile-card">
                    <strong className="cost-center-mobile-card__value">
                      {costCenter.descricao}
                    </strong>

                    {costCenter.observacao.trim() ? (
                      <p className="cost-center-mobile-card__text">
                        {costCenter.observacao}
                      </p>
                    ) : null}

                    <div className="cost-center-mobile-card__actions">
                      <button
                        type="button"
                        className="cost-center-edit-button"
                        disabled={isBusy}
                        onClick={() => handleEdit(costCenter)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="cost-center-delete-button"
                        disabled={isBusy}
                        onClick={() => handleDeleteRequest(costCenter.id)}
                      >
                        {pendingDeleteId === costCenter.id ? "Excluindo..." : "Excluir"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </section>
  );
}
