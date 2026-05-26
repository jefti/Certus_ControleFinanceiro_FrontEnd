import apiCommunication from './apiCommunication'

interface FinancialData {
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

interface DashboardResponse {
  financialData: FinancialData[]
  chartData: ChartData[]
  transactions: Transaction[]
}

class DashboardService {
  async getDashboardData(): Promise<DashboardResponse> {
    try {
      const response = await apiCommunication.get<DashboardResponse>('/dashboard')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error)
      // Retornar dados mock em caso de erro
      return this.getMockData()
    }
  }

  private getMockData(): DashboardResponse {
    return {
      financialData: [
        { title: 'Total Receitas', value: 15500.0, percentage: 12.5, type: 'income' },
        { title: 'Total Despesas', value: 8200.0, percentage: -8.2, type: 'expense' },
        { title: 'Saldo', value: 7300.0, percentage: 5.3, type: 'balance' },
      ],
      chartData: [
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
      ],
      transactions: [
        {
          id: '1',
          description: 'Pagamento de Aluguel',
          amount: 1500.0,
          date: new Date().toISOString(),
          status: 'pending',
          type: 'expense',
        },
        {
          id: '2',
          description: 'Depósito Salário',
          amount: 5000.0,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed',
          type: 'income',
        },
        {
          id: '3',
          description: 'Pagamento Fatura Cartão',
          amount: 2500.0,
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'overdue',
          type: 'expense',
        },
      ],
    }
  }
}

export default new DashboardService()
