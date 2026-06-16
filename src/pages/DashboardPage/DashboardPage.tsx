import { useEffect, useState } from "react";
import {
  Bar,
  ComposedChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FloatingAlert } from "../../components/FloatingAlert/FloatingAlert";
import { getDashboard } from "../../services/dashboardService";
import { validarFaturamento } from "../../services/faturamentoService";
import { getApiErrorMessage } from "../../services/httpError";
import type { DashboardLancamento, DashboardResponse } from "../../types/dashboard";
import "./DashboardPage.css";

function getCurrentMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    inicio: start.toISOString().slice(0, 10),
    fim: end.toISOString().slice(0, 10),
  };
}

const initialMonthRange = getCurrentMonthRange();

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

  const [year, month, day] = date.slice(0, 10).split("-");

  if (!year || !month || !day) {
    return date;
  }

  return `${day}/${month}/${year}`;
}

function formatTipo(tipo: DashboardLancamento["tipo"]) {
  return tipo === "RECEBER" ? "Receber" : "Pagar";
}

function formatStatus(status: DashboardLancamento["status"]) {
  switch (status) {
    case "PAGO":
      return "Pago";
    case "ATRASADO":
      return "Atrasado";
    default:
      return "Em aberto";
  }
}

function toDateKey(date: string | null) {
  return date ? date.slice(0, 10) : null;
}

function getSignedValue(lancamento: DashboardLancamento) {
  return lancamento.tipo === "RECEBER" ? lancamento.valor : -lancamento.valor;
}

function buildDailyChartRows(
  lancamentos: DashboardLancamento[],
  periodoInicial: string,
  periodoFinal: string,
) {
  const rows: Array<{
    data: string;
    movimentoPrevisto: number;
    movimentoReal: number;
    previsto: number;
    realizado: number;
  }> = [];

  const start = new Date(`${periodoInicial}T00:00:00`);
  const end = new Date(`${periodoFinal}T00:00:00`);
  let previstoAcumulado = 0;
  let realizadoAcumulado = 0;

  for (const cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    const key = cursor.toISOString().slice(0, 10);

    const movimentoPrevisto = lancamentos
      .filter((item) => toDateKey(item.dataVencimento) === key)
      .reduce((total, item) => total + getSignedValue(item), 0);

    const movimentoReal = lancamentos
      .filter((item) => toDateKey(item.dataPagamento) === key)
      .reduce((total, item) => total + getSignedValue(item), 0);

    previstoAcumulado += movimentoPrevisto;
    realizadoAcumulado += movimentoReal;

    rows.push({
      data: formatDate(key),
      movimentoPrevisto,
      movimentoReal,
      previsto: previstoAcumulado,
      realizado: realizadoAcumulado,
    });
  }

  return rows;
}

export function DashboardPage() {
  const [periodo, setPeriodo] = useState(initialMonthRange);
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [pendingLancamento, setPendingLancamento] = useState<DashboardLancamento | null>(null);
  const [dataPagamento, setDataPagamento] = useState("");

  useEffect(() => {
    void loadDashboard(initialMonthRange.inicio, initialMonthRange.fim, true);
  }, []);

  async function loadDashboard(
    periodoInicial: string,
    periodoFinal: string,
    initialLoad = false,
  ) {
    try {
      if (initialLoad) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const response = await getDashboard(periodoInicial, periodoFinal);
      setDashboard(response);
    } catch (error) {
      setAlertMessage(
        getApiErrorMessage(error, "Nao foi possivel carregar o dashboard.")
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  function handleApplyPeriod() {
    if (!periodo.inicio || !periodo.fim) {
      setAlertMessage("Informe o periodo inicial e final para consultar o dashboard.");
      return;
    }

    if (periodo.fim < periodo.inicio) {
      setAlertMessage("O periodo final deve ser maior ou igual ao periodo inicial.");
      return;
    }

    void loadDashboard(periodo.inicio, periodo.fim);
  }

  const chartRowsWithBalance = dashboard
    ? buildDailyChartRows(dashboard.lancamentos, dashboard.periodoInicial, dashboard.periodoFinal)
    : [];

  const summaryCards = dashboard
    ? [
        {
          title: "Total de receitas",
          value: formatCurrency(dashboard.totalReceitas),
          tone: "positive" as const,
        },
        {
          title: "Total de despesas",
          value: formatCurrency(dashboard.totalDespesas),
          tone: "negative" as const,
        },
        {
          title: "Saldo do periodo",
          value: formatCurrency(dashboard.saldo),
          tone: "neutral" as const,
        },
      ]
    : [];

  const bottomStats = dashboard
    ? [
        { value: String(dashboard.quantidadeCentrosDeCusto), label: "Centros de custo" },
        { value: String(dashboard.quantidadeTitulosAtivos), label: "Titulos ativos" },
        { value: String(dashboard.quantidadeLancamentos), label: "Lancamentos no periodo" },
        { value: `${dashboard.periodoInicial} a ${dashboard.periodoFinal}`, label: "Periodo consultado" },
      ]
    : [];

  const topLancamentos = dashboard?.lancamentos.slice(0, 5) ?? [];

  function openPaymentModal(lancamento: DashboardLancamento) {
    setPendingLancamento(lancamento);
    setDataPagamento("");
  }

  function closePaymentModal() {
    if (isSubmittingPayment) return;
    setPendingLancamento(null);
    setDataPagamento("");
  }

  async function handlePaymentConfirm() {
    if (!pendingLancamento) {
      return;
    }

    try {
      setIsSubmittingPayment(true);

      await validarFaturamento(pendingLancamento.id, {
        dataPagamento: dataPagamento || null,
        observacao: null,
      });

      await loadDashboard(periodo.inicio, periodo.fim);
      setPendingLancamento(null);
      setDataPagamento("");
    } catch (error) {
      setAlertMessage(
        getApiErrorMessage(error, "Nao foi possivel ajustar o pagamento.")
      );
    } finally {
      setIsSubmittingPayment(false);
    }
  }

  return (
    <main className="dashboard-page">
      <FloatingAlert
        isOpen={Boolean(alertMessage)}
        title="Nao foi possivel continuar"
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />

      {pendingLancamento ? (
        <div
          className="dashboard-page__payment-modal-backdrop"
          role="presentation"
          onClick={closePaymentModal}
        >
          <section
            className="dashboard-page__payment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-payment-title"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="dashboard-page__payment-modal-eyebrow">Confirmacao</span>
            <h2 id="dashboard-payment-title" className="dashboard-page__payment-modal-title">
              Confirmar pagamento
            </h2>
            <p className="dashboard-page__payment-modal-message">
              Confirme a data do pagamento/recebimento para <strong>{pendingLancamento.tituloDescricao}</strong>.
            </p>

            <label className="dashboard-page__payment-field">
              <span>Data e hora do pagamento</span>
              <input
                type="datetime-local"
                value={dataPagamento}
                disabled={isSubmittingPayment}
                onChange={(event) => setDataPagamento(event.target.value)}
              />
            </label>

            <div className="dashboard-page__payment-modal-actions">
              <button
                type="button"
                className="dashboard-page__modal-button dashboard-page__modal-button--secondary"
                disabled={isSubmittingPayment}
                onClick={closePaymentModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="dashboard-page__modal-button dashboard-page__modal-button--primary"
                disabled={isSubmittingPayment}
                onClick={handlePaymentConfirm}
              >
                {isSubmittingPayment ? "Confirmando..." : "Confirmar pagamento"}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      <div className="dashboard-page__container">
        <header className="dashboard-page__topbar">
          <div>
            <span className="dashboard-page__eyebrow">Fluxo de caixa</span>
            <h1 className="dashboard-page__title">Dashboard</h1>
            <p className="dashboard-page__subtitle">
              Visualize o desempenho financeiro do periodo com base nos faturamentos
              reais do usuario autenticado.
            </p>
          </div>

          <div className="dashboard-page__filters">
            <label className="dashboard-page__filter-field">
              <span>Periodo inicial</span>
              <input
                type="date"
                value={periodo.inicio}
                disabled={isLoading || isRefreshing}
                onChange={(event) =>
                  setPeriodo((current) => ({ ...current, inicio: event.target.value }))
                }
              />
            </label>

            <label className="dashboard-page__filter-field">
              <span>Periodo final</span>
              <input
                type="date"
                value={periodo.fim}
                disabled={isLoading || isRefreshing}
                onChange={(event) =>
                  setPeriodo((current) => ({ ...current, fim: event.target.value }))
                }
              />
            </label>

            <button
              type="button"
              className="dashboard-page__primary-button"
              disabled={isLoading || isRefreshing}
              onClick={handleApplyPeriod}
            >
              {isRefreshing ? "Atualizando..." : "Atualizar dashboard"}
            </button>
          </div>
        </header>

        {isLoading ? (
          <section className="dashboard-page__empty-state">
            <strong>Carregando dashboard...</strong>
            <p>Estamos consolidando os lancamentos do periodo selecionado.</p>
          </section>
        ) : !dashboard ? (
          <section className="dashboard-page__empty-state">
            <strong>Dashboard indisponivel.</strong>
            <p>Tente atualizar novamente para carregar os dados financeiros.</p>
          </section>
        ) : (
          <>
            <section className="dashboard-page__summary-grid">
              {summaryCards.map((card) => (
                <article
                  key={card.title}
                  className={`dashboard-page__summary-card dashboard-page__summary-card--${card.tone}`}
                >
                  <span className="dashboard-page__summary-label">{card.title}</span>
                  <strong className="dashboard-page__summary-value">{card.value}</strong>
                </article>
              ))}
            </section>

            <section className="dashboard-page__content-grid">
              <section className="dashboard-page__chart-panel">
                <div className="dashboard-page__panel-header">
                  <div>
                    <h2 className="dashboard-page__panel-title">Fluxo de caixa por data</h2>
                    <p className="dashboard-page__panel-description">
                      As colunas mostram a variacao diaria prevista. As linhas
                      comparam o acumulado previsto contra o acumulado ja realizado.
                    </p>
                  </div>
                </div>

                {chartRowsWithBalance.length === 0 ? (
                  <div className="dashboard-page__empty-inline">
                    <strong>Nenhum lancamento encontrado no periodo.</strong>
                    <p>Ajuste o intervalo de datas para consultar outros registros.</p>
                  </div>
                ) : (
                  <div className="dashboard-page__chart-canvas">
                    <ResponsiveContainer width="100%" height={320}>
                      <ComposedChart
                        data={chartRowsWithBalance}
                        margin={{ top: 10, right: 6, left: -16, bottom: 4 }}
                      >
                        <defs>
                          <linearGradient id="dashboard-income-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2eb875" stopOpacity={0.28} />
                            <stop offset="95%" stopColor="#2eb875" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="dashboard-expense-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d96a5f" stopOpacity={0.24} />
                            <stop offset="95%" stopColor="#d96a5f" stopOpacity={0} />
                          </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} stroke="#e8edf3" strokeDasharray="3 3" />
                        <XAxis
                          dataKey="data"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#8da0b3" }}
                          dy={8}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          width={64}
                          tick={{ fontSize: 12, fill: "#8da0b3" }}
                          tickFormatter={(value) => `R$ ${Number(value).toFixed(0)}`}
                        />
                        <Tooltip
                          formatter={(value: number, name: string) => [
                            formatCurrency(Number(value)),
                            name === "movimentoPrevisto"
                              ? "Movimento diario"
                              : name === "previsto"
                              ? "Previsto acumulado"
                              : "Realizado acumulado",
                          ]}
                          cursor={false}
                          contentStyle={{
                            border: "1px solid #dce3ea",
                            borderRadius: "12px",
                            boxShadow: "0 12px 28px rgba(15, 23, 42, 0.12)",
                            fontSize: "12px",
                          }}
                        />
                        <Bar
                          dataKey="movimentoPrevisto"
                          fill="#d7e6f2"
                          radius={[10, 10, 10, 10]}
                          maxBarSize={10}
                        />
                        <Line
                          type="monotone"
                          dataKey="previsto"
                          stroke="#2f6b94"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 5, fill: "#2f6b94", stroke: "#ffffff", strokeWidth: 2 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="realizado"
                          stroke="#2eb875"
                          strokeWidth={3}
                          strokeDasharray="8 5"
                          dot={false}
                          activeDot={{ r: 5, fill: "#2eb875", stroke: "#ffffff", strokeWidth: 2 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="dashboard-page__bottom-stats">
                  {bottomStats.map((item) => (
                    <article key={item.label} className="dashboard-page__bottom-stat">
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </article>
                  ))}
                </div>
              </section>

              <aside className="dashboard-page__side-panel">
                <div className="dashboard-page__panel-header dashboard-page__panel-header--side">
                  <div>
                    <h2 className="dashboard-page__panel-title">Proximos lancamentos</h2>
                    <p className="dashboard-page__panel-description">
                      Primeiros itens do periodo ordenados por vencimento.
                    </p>
                  </div>
                </div>

                <div className="dashboard-page__quick-list">
                  {topLancamentos.length === 0 ? (
                    <div className="dashboard-page__empty-inline">
                      <strong>Sem lancamentos para exibir.</strong>
                      <p>Quando houver itens no periodo, eles aparecerao aqui.</p>
                    </div>
                  ) : (
                    topLancamentos.map((item) => (
                      <article key={item.id} className="dashboard-page__quick-item">
                        <span
                          className={`dashboard-page__quick-tag dashboard-page__quick-tag--${item.status.toLowerCase()}`}
                        >
                          {formatStatus(item.status)}
                        </span>

                        <div className="dashboard-page__quick-row">
                          <div className="dashboard-page__quick-title-wrap">
                            <span
                              className={`dashboard-page__quick-dot dashboard-page__quick-dot--${item.tipo.toLowerCase()}`}
                            />
                            <div>
                              <strong className="dashboard-page__quick-title">
                                {item.tituloDescricao}
                              </strong>
                              <p className="dashboard-page__quick-meta">
                                {formatTipo(item.tipo)} | {formatCurrency(item.valor)}
                              </p>
                            </div>
                          </div>

                          <span className="dashboard-page__quick-date">
                            {formatDate(item.dataVencimento)}
                          </span>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </aside>
            </section>

            <section className="dashboard-page__table-panel">
              <div className="dashboard-page__panel-header">
                <div>
                  <h2 className="dashboard-page__panel-title">Lancamentos do periodo</h2>
                  <p className="dashboard-page__panel-description">
                    Todos os faturamentos encontrados para o intervalo selecionado.
                  </p>
                </div>
              </div>

              {dashboard.lancamentos.length === 0 ? (
                <div className="dashboard-page__empty-inline">
                  <strong>Nenhum lancamento neste periodo.</strong>
                  <p>Experimente ampliar o intervalo de consulta.</p>
                </div>
              ) : (
                <>
                  <div className="dashboard-page__table-wrap">
                    <table className="dashboard-page__table">
                      <thead>
                        <tr>
                          <th>Titulo</th>
                          <th>Tipo</th>
                          <th>Vencimento</th>
                          <th>Valor</th>
                          <th>Status</th>
                          <th>Pagamento</th>
                          <th>Acoes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboard.lancamentos.map((item) => (
                          <tr key={item.id}>
                            <td>{item.tituloDescricao}</td>
                            <td>{formatTipo(item.tipo)}</td>
                            <td>{formatDate(item.dataVencimento)}</td>
                            <td>{formatCurrency(item.valor)}</td>
                            <td>{formatStatus(item.status)}</td>
                            <td>{formatDate(item.dataPagamento)}</td>
                            <td>
                              {item.status === "PAGO" ? (
                                <span className="dashboard-page__table-action-hint">
                                  Pago
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  className="dashboard-page__table-action-button"
                                  onClick={() => openPaymentModal(item)}
                                >
                                  Confirmar pagamento
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="dashboard-page__mobile-list">
                    {dashboard.lancamentos.map((item) => (
                      <article key={item.id} className="dashboard-page__mobile-card">
                        <div className="dashboard-page__mobile-card-top">
                          <strong className="dashboard-page__mobile-card-title">
                            {item.tituloDescricao}
                          </strong>
                          <span className="dashboard-page__mobile-card-status">
                            {formatStatus(item.status)}
                          </span>
                        </div>

                        <div className="dashboard-page__mobile-card-meta">
                          <span>{formatTipo(item.tipo)}</span>
                          <span>{formatCurrency(item.valor)}</span>
                        </div>

                        <p className="dashboard-page__mobile-card-text">
                          Vencimento: {formatDate(item.dataVencimento)}
                        </p>

                        <p className="dashboard-page__mobile-card-text">
                          Pagamento: {formatDate(item.dataPagamento)}
                        </p>

                        {item.status !== "PAGO" ? (
                          <button
                            type="button"
                            className="dashboard-page__table-action-button"
                            onClick={() => openPaymentModal(item)}
                          >
                            Confirmar pagamento
                          </button>
                        ) : null}
                      </article>
                    ))}
                  </div>
                </>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
