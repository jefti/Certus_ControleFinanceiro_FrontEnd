import type { CostCenter } from './CostCenter'

export type TitleType = 'PAGAR' | 'RECEBER'

export type RecurrenceType =
  | 'SEMANAL'
  | 'MENSAL'
  | 'BIMESTRAL'
  | 'TRIMESTRAL'
  | 'SEMESTRAL'
  | 'ANUAL'

export interface FinancialTitle {
  id: number
  descricao: string
  valor: number
  dataVencimento: string
  tipo: TitleType
  recorrencia: RecurrenceType | null
  dataFim: string | null
  ativo: boolean
  quantidadeFaturamentos: number
  centrosDeCusto: CostCenter[]
}

export interface TitleRequest {
  id?: number
  descricao: string
  valor: number
  dataVencimento: string
  tipo: TitleType
  recorrencia: RecurrenceType | null
  dataFim: string | null
  centroDeCustoIds: number[]
}
