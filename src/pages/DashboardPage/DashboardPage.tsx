import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "./DashboardPage.css";

const summaryCards = [
  {
    title: "Total depositos",
    value: "R$ 1.200,00",
    tone: "positive" as const,
    icon: "$",
    points: [26, 29, 31, 30, 34, 35, 35, 39, 42, 41, 43, 45],
  },
  {
    title: "Total despesas",
    value: "R$ 1.200,00",
    tone: "negative" as const,
    icon: "$",
    points: [34, 31, 29, 35, 32, 33, 30, 31, 33, 34, 33, 32],
  },
  {
    title: "Saldo",
    value: "R$ 1.200,00",
    tone: "neutral" as const,
    icon: "S",
    points: [],
  },
];

const chartPeriods = [
  { value: "semana", label: "Semana" },
  { value: "mes", label: "Mes" },
  { value: "ano", label: "ano" },
  { value: "tudo", label: "tudo" },
] as const;

type ChartPeriod = (typeof chartPeriods)[number]["value"];

const chartDataByPeriod: Record<
  ChartPeriod,
  {
    meses: string[];
    receita: number[];
    despesa: number[];
  }
> = {
  semana: {
    meses: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    receita: [42, 55, 49, 62, 58, 71, 65],
    despesa: [24, 32, 29, 36, 33, 41, 38],
  },
  mes: {
    meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    receita: [40, 30, 50, 55, 32, 68, 74, 47, 56, 63, 52, 60],
    despesa: [22, 31, 39, 60, 22, 42, 60, 34, 49, 43, 67, 74],
  },
  ano: {
    meses: ["2021", "2022", "2023", "2024", "2025", "2026"],
    receita: [38, 46, 57, 61, 72, 79],
    despesa: [25, 33, 39, 41, 52, 58],
  },
  tudo: {
    meses: ["1", "2", "3", "4", "5", "6", "7", "8"],
    receita: [28, 40, 34, 57, 49, 68, 59, 76],
    despesa: [19, 26, 31, 38, 29, 43, 48, 54],
  },
};

const bottomStats = [
  { value: "12,721", label: "Numero de custo" },
  { value: "3", label: "Gastos fixos" },
  { value: "R$2.500,00", label: "Remuneracao" },
  { value: "12,275h", label: "Working Hours" },
];

const quickItems = [
  {
    tag: "Prox. de pagamento",
    title: "Aluguel",
    date: "2023-12-26 07:15:00",
    tone: "warning" as const,
  },
  {
    tag: "Pagamento finalizado",
    title: "Seguro",
    date: "2023-12-26 07:15:00",
    tone: "success" as const,
  },
  {
    tag: "",
    title: "Cartao de credito",
    date: "2023-12-26 07:15:00",
    tone: "muted" as const,
  },
];

function buildMiniLine(points: number[]) {
  if (!points.length) {
    return "";
  }

  const width = 240;
  const height = 54;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(max - min, 1);

  return points
    .map((point, index) => {
      const x = (width / Math.max(points.length - 1, 1)) * index;
      const y = height - ((point - min) / range) * 22 - 12;

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>("mes");
  const chartSeries = chartDataByPeriod[selectedPeriod];
  const chartRows = chartSeries.meses.map((mes, index) => ({
    mes,
    receita: chartSeries.receita[index],
    despesa: chartSeries.despesa[index],
  }));

  return (
    <main className="dashboard-page">
      <div className="dashboard-page__container">
        <header className="dashboard-page__topbar">
          <h1 className="dashboard-page__title">Dashboard</h1>
        </header>

        <section className="dashboard-page__summary-grid">
          {summaryCards.map((card) => (
            <article
              key={card.title}
              className={`dashboard-page__summary-card dashboard-page__summary-card--${card.tone}`}
            >
              <div className="dashboard-page__summary-head">
                <div>
                  <span className="dashboard-page__summary-label">{card.title}</span>
                  <strong className="dashboard-page__summary-value">{card.value}</strong>
                </div>

                <span className="dashboard-page__summary-icon">{card.icon}</span>
              </div>

              {card.points.length > 0 ? (
                <svg
                  className="dashboard-page__summary-chart"
                  viewBox="0 0 240 54"
                  aria-hidden="true"
                >
                  <path
                    d={buildMiniLine(card.points)}
                    className="dashboard-page__summary-line"
                  />
                </svg>
              ) : null}
            </article>
          ))}
        </section>

        <section className="dashboard-page__content-grid">
          <section className="dashboard-page__chart-panel">
            <div className="dashboard-page__panel-header">
              <h2 className="dashboard-page__panel-title">Projects Overview</h2>

              <div className="dashboard-page__tabs" aria-label="Periodo do grafico">
                {chartPeriods.map((period) => (
                  <button
                    key={period.value}
                    type="button"
                    className={`dashboard-page__tab${
                      period.value === selectedPeriod ? " dashboard-page__tab--active" : ""
                    }`}
                    onClick={() => setSelectedPeriod(period.value)}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="dashboard-page__chart-area">
              <div className="dashboard-page__chart-canvas">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartRows}
                    margin={{ top: 10, right: 6, left: -16, bottom: 4 }}
                  >
                    <defs>
                      <linearGradient id="dashboard-income-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#32c971" stopOpacity={0.26} />
                        <stop offset="95%" stopColor="#32c971" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="dashboard-expense-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ea7575" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#ea7575" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      vertical={false}
                      stroke="#e8edf3"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="mes"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#9aa6b2" }}
                      dy={8}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      width={34}
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      tick={{ fontSize: 12, fill: "#9aa6b2" }}
                    />
                    <Tooltip
                      cursor={false}
                      contentStyle={{
                        border: "1px solid #dce3ea",
                        borderRadius: "12px",
                        boxShadow: "0 12px 28px rgba(15, 23, 42, 0.12)",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="receita"
                      stroke="#32c971"
                      strokeWidth={4}
                      fill="url(#dashboard-income-gradient)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#32c971", stroke: "#ffffff", strokeWidth: 2 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="despesa"
                      stroke="#ea7575"
                      strokeWidth={4}
                      fill="url(#dashboard-expense-gradient)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#ea7575", stroke: "#ffffff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

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
              <h2 className="dashboard-page__panel-title">Meus itens</h2>

              <div className="dashboard-page__side-actions">
                <button type="button" className="dashboard-page__ghost-button">
                  + add
                </button>
                <button type="button" className="dashboard-page__ghost-button">
                  Ver Tudo
                </button>
              </div>
            </div>

            <div className="dashboard-page__quick-list">
              {quickItems.map((item) => (
                <article key={item.title} className="dashboard-page__quick-item">
                  {item.tag ? (
                    <span
                      className={`dashboard-page__quick-tag dashboard-page__quick-tag--${item.tone}`}
                    >
                      {item.tag}
                    </span>
                  ) : null}

                  <div className="dashboard-page__quick-row">
                    <div className="dashboard-page__quick-title-wrap">
                      <span
                        className={`dashboard-page__quick-dot dashboard-page__quick-dot--${item.tone}`}
                      />
                      <strong className="dashboard-page__quick-title">{item.title}</strong>
                    </div>

                    <span className="dashboard-page__quick-date">{item.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
