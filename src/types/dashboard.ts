export type DashboardTitleType = 'PAGAR' | 'RECEBER'
export type DashboardStatusType = 'EM_ABERTO' | 'PAGO' | 'ATRASADO'

export interface DashboardSerie {
  data: string
  totalReceitas: number
  totalDespesas: number
  saldo: number
}

export interface DashboardLancamento {
  id: number
  tituloId: number
  tituloDescricao: string
  tipo: DashboardTitleType
  dataVencimento: string
  valor: number
  dataPagamento: string | null
  status: DashboardStatusType
  observacao: string | null
}

export interface DashboardResponse {
  periodoInicial: string
  periodoFinal: string
  totalReceitas: number
  totalDespesas: number
  saldo: number
  quantidadeTitulosAtivos: number
  quantidadeCentrosDeCusto: number
  quantidadeLancamentos: number
  serieFluxoCaixa: DashboardSerie[]
  lancamentos: DashboardLancamento[]
}
