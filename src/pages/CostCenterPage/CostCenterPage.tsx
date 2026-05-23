import { useState } from "react";
import "./CostCenterPage.css";

import { TextField } from "../../components/TextField/TextField";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";

type CostCenter = {
  id: number;
  descricao: string;
  observacao: string;
};

export function CostCenterPage() {
  const [costCenters, setCostCenters] = useState<CostCenter[]>([]);
  const [editingCostCenterId, setEditingCostCenterId] = useState<number | null>(
    null
  );

  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function resetForm() {
    setDescricao("");
    setObservacao("");
    setEditingCostCenterId(null);
    setError("");
  }

  function validateForm() {
    if (!descricao.trim()) {
      return "Informe a descrição do centro de custo.";
    }

    if (descricao.trim().length > 255) {
      return "A descrição deve ter no máximo 255 caracteres.";
    }

    if (observacao.trim().length > 500) {
      return "A observação deve ter no máximo 500 caracteres.";
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

    const costCenterData: CostCenter = {
      id: editingCostCenterId ?? Date.now(),
      descricao: descricao.trim(),
      observacao: observacao.trim(),
    };

    if (editingCostCenterId) {
      setCostCenters((currentCostCenters) =>
        currentCostCenters.map((costCenter) =>
          costCenter.id === editingCostCenterId ? costCenterData : costCenter
        )
      );

      setSuccessMessage("Centro de custo atualizado com sucesso.");
    } else {
      setCostCenters((currentCostCenters) => [
        ...currentCostCenters,
        costCenterData,
      ]);

      setSuccessMessage("Centro de custo cadastrado com sucesso.");
    }

    resetForm();
  }

  function handleEdit(costCenter: CostCenter) {
    setEditingCostCenterId(costCenter.id);
    setDescricao(costCenter.descricao);
    setObservacao(costCenter.observacao);
    setError("");
    setSuccessMessage("");
  }

  function handleDelete(costCenterId: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este centro de custo?"
    );

    if (!confirmDelete) return;

    setCostCenters((currentCostCenters) =>
      currentCostCenters.filter((costCenter) => costCenter.id !== costCenterId)
    );

    if (editingCostCenterId === costCenterId) {
      resetForm();
    }

    setSuccessMessage("Centro de custo excluído com sucesso.");
    setError("");
  }

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
              Cadastre e organize os centros de custo usados para classificar
              receitas e despesas, facilitando a análise financeira e a gestão
              dos lançamentos vinculados ao usuário.
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
          <form className="cost-center-form" onSubmit={handleSubmit}>
            <div className="cost-center-section-heading">
              <span>Cadastro</span>

              <h3>
                {editingCostCenterId
                  ? "Editar centro de custo"
                  : "Cadastrar centro de custo"}
              </h3>

              <p>
                Informe a descrição do centro de custo e, se necessário,
                adicione uma observação para complementar o cadastro.
              </p>
            </div>

            <div className="cost-center-form-grid">
              <TextField
                label="Descrição:"
                type="text"
                placeholder="Ex: Alimentação, Transporte, Salário"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
              />

              <div className="cost-center-field cost-center-field-full">
                <label className="cost-center-label">Observação:</label>

                <textarea
                  className="cost-center-textarea"
                  placeholder="Ex: Centro usado para classificar despesas mensais de transporte."
                  value={observacao}
                  maxLength={500}
                  onChange={(event) => setObservacao(event.target.value)}
                />

                <small className="cost-center-counter">
                  {observacao.length}/500 caracteres
                </small>
              </div>
            </div>

            {error && <p className="cost-center-error-message">{error}</p>}

            {successMessage && (
              <p className="cost-center-success-message">{successMessage}</p>
            )}

            <div className="cost-center-actions">
              <PrimaryButton type="submit">
                {editingCostCenterId
                  ? "Salvar alterações"
                  : "Cadastrar centro de custo"}
              </PrimaryButton>

              {editingCostCenterId && (
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
              O centro de custo funciona como uma categoria financeira. Ele
              permite agrupar receitas e despesas por finalidade, área ou tipo
              de movimentação.
            </p>

            <div className="cost-center-info-list">
              <div>
                <strong>1</strong>
                <span>Cadastre uma descrição clara para o centro de custo.</span>
              </div>

              <div>
                <strong>2</strong>
                <span>
                  Use a observação para registrar detalhes complementares.
                </span>
              </div>

              <div>
                <strong>3</strong>
                <span>
                  Edite centros existentes quando houver mudança de nome ou
                  finalidade.
                </span>
              </div>

              <div>
                <strong>4</strong>
                <span>
                  Exclua apenas centros que não devem mais ser utilizados.
                </span>
              </div>
            </div>
          </aside>
        </div>

        <section className="cost-center-list-box">
          <div className="cost-center-list-header">
            <div>
              <span className="cost-center-eyebrow">Histórico</span>

              <h3 className="cost-center-section-title">
                Centros de custo cadastrados
              </h3>
            </div>

            <p>
              Consulte, edite ou exclua os centros de custo disponíveis para
              organizar seus lançamentos financeiros.
            </p>
          </div>

          {costCenters.length === 0 ? (
            <div className="cost-center-empty-state">
              <strong>Nenhum centro de custo cadastrado ainda.</strong>

              <p>
                Assim que você cadastrar um centro de custo, ele aparecerá nesta
                área com descrição, observação e ações disponíveis.
              </p>
            </div>
          ) : (
            <div className="cost-center-table-wrapper">
              <table className="cost-center-table">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Observação</th>
                    <th>Ações</th>
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
                            onClick={() => handleEdit(costCenter)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="cost-center-delete-button"
                            onClick={() => handleDelete(costCenter.id)}
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