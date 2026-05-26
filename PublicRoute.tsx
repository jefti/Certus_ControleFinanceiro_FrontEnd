import { useState, useEffect } from 'react'
import { Header } from '@/components/Header/PrivateHeader'
import PrimaryButton from '@/components/PrimaryButton'
import FloatingAlert from '@/components/FloatingAlert'
import './dashboard.css'

interface FinancialCard {
  title: string
  value: number
  percentage: number
  type: 'income' | 'expense' | 'balance'
}

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  status: 'pending' | 'completed' | 'overdue'
  type: 'income' | 'expense'
}

interface ChartData {
  month: string
  income: number
  expense: number
}

export function DashboardPage() {
  const [financialData, setFinancialData] = useState<FinancialCard[]>([])
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [alertMessage, setAlertMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Dados mockados - substituir por chamada de API real
      const mockFinancialData: FinancialCard[] = [
        { title: 'Total Receitas', value: 15500.00, percentage: 12.5, type: 'income' },
        { title: 'Total Despesas', value: 8200.00, percentage: -8.2, type: 'expense' },
        { title: 'Saldo', value: 7300.00, percentage: 5.3, type: 'balance' },
      ]

      const mockChartData: ChartData[] = [
        { month: 'Jan', income: 4000, expense: 2400 },
        { month: 'Fev', income: 3000, expense: 1398 },
        { month: 'Mar', income: 4500, expense: 3800 },
        { month: 'Abr', income: 5000, expense: 3500 },
        { month: 'Mai', income: 3500, expense: 2500 },
        { month: 'Jun', income: 5500, expense: 3000 },
        { month: 'Jul', income: 6000, expense: 3500 },
        { month: 'Ago', income: 4500, expense: 2800 },
        { month: 'Set', income: 5000, expense: 3200 },
        { month: 'Out', income: 5500, expense: 3000 },
        { month: 'Nov', income: 4800, expense: 3500 },
        { month: 'Diz', income: 5200, expense: 3800 },
      ]

      const mockTransactions: Transaction[] = [
        {
          id: '1',
          description: 'Pagamento de Aluguel',
          amount: 1500.00,
          date: new Date().toISOString(),
          status: 'pending',
          type: 'expense',
        },
        {
          id: '2',
          description: 'Depósito Salário',
          amount: 5000.00,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed',
          type: 'income',
        },
        {
          id: '3',
          description: 'Pagamento Fatura Cartão',
          amount: 2500.00,
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'overdue',
          type: 'expense',
        },
      ]

      setFinancialData(mockFinancialData)
      setChartData(mockChartData)
      setTransactions(mockTransactions)
    } catch (error) {
      setAlertMessage({ message: 'Erro ao carregar dados do dashboard', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído'
      case 'pending':
        return 'Pendente'
      case 'overdue':
        return 'Atrasado'
      default:
        return status
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'status-completed'
      case 'pending':
        return 'status-pending'
      case 'overdue':
        return 'status-overdue'
      default:
        return ''
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <PrimaryButton
              text="Atualizar"
              onClick={fetchDashboardData}
              disabled={loading}
              type="button"
            />
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Carregando dados...</p>
            </div>
          ) : (
            <>
              {/* Financial Cards */}
              <div className="financial-cards-grid">
                {financialData.map((card) => (
                  <div key={card.title} className={`financial-card financial-card-${card.type}`}>
                    <div className="card-header">
                      <h3 className="card-title">{card.title}</h3>
                      <span className={`card-percentage ${card.percentage >= 0 ? 'positive' : 'negative'}`}>
                        {card.percentage > 0 ? '+' : ''}{card.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <p className="card-value">{formatCurrency(card.value)}</p>
                  </div>
                ))}
              </div>

              {/* Chart and Transactions */}
              <div className="dashboard-grid">
                <div className="chart-container">
                  <h2 className="section-title">Receitas vs Despesas</h2>
                  <div className="chart-placeholder">
                    <table className="chart-table">
                      <thead>
                        <tr>
                          <th>Mês</th>
                          <th>Receitas</th>
                          <th>Despesas</th>
                          <th>Diferença</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.map((data) => (
                          <tr key={data.month}>
                            <td>{data.month}</td>
                            <td className="value-positive">{formatCurrency(data.income)}</td>
                            <td className="value-negative">{formatCurrency(data.expense)}</td>
                            <td className={data.income - data.expense > 0 ? 'value-positive' : 'value-negative'}>
                              {formatCurrency(data.income - data.expense)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Transactions List */}
                <div className="transactions-container">
                  <h2 className="section-title">Próximas Transações</h2>
                  <div className="transactions-list">
                    {transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <div key={transaction.id} className={`transaction-item ${getStatusClass(transaction.status)}`}>
                          <div className="transaction-info">
                            <h4 className="transaction-description">{transaction.description}</h4>
                            <p className="transaction-date">{formatDate(transaction.date)}</p>
                          </div>
                          <div className="transaction-details">
                            <p className={`transaction-amount ${transaction.type === 'income' ? 'positive' : 'negative'}`}>
                              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </p>
                            <span className={`transaction-status ${getStatusClass(transaction.status)}`}>
                              {getStatusLabel(transaction.status)}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="empty-message">Nenhuma transação para exibir</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <p className="metric-label">Transações este mês</p>
                  <p className="metric-value">{transactions.length}</p>
                </div>
                <div className="metric-card">
                  <p className="metric-label">Média de Gastos</p>
                  <p className="metric-value">
                    {formatCurrency(
                      transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) / 12
                    )}
                  </p>
                </div>
                <div className="metric-card">
                  <p className="metric-label">Saldo Total</p>
                  <p className="metric-value positive">
                    {formatCurrency(
                      transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) -
                        transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </p>
                </div>
                <div className="metric-card">
                  <p className="metric-label">Taxa Média</p>
                  <p className="metric-value">2.5%</p>
                </div>
              </div>
            </>
          )}

          {alertMessage && (
            <FloatingAlert
              message={alertMessage.message}
              type={alertMessage.type}
              onClose={() => setAlertMessage(null)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
