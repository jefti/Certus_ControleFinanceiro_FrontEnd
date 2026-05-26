export interface CostCenter {
  id: number
  descricao: string
  observacao: string
}

export interface CostCenterRequest {
  id?: number
  descricao: string
  observacao: string
}