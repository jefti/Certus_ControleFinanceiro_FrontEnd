import axios from 'axios'
import type { CostCenter, CostCenterRequest } from '../types/CostCenter'

const BASE_URL = '/api/centros-de-custo'

export async function getCostCenters() {
  const response = await axios.get<CostCenter[]>(`${BASE_URL}/obter`)
  return response.data
}

export async function createCostCenter(data: CostCenterRequest) {
  const response = await axios.post<CostCenter>(
    `${BASE_URL}/cadastrar`,
    data
  )

  return response.data
}

export async function updateCostCenter(id: number, data: CostCenterRequest) {
  const response = await axios.put<CostCenter>(
    `${BASE_URL}/atualizar/${id}`,
    data
  )

  return response.data
}

export async function deleteCostCenter(id: number) {
  await axios.delete(`${BASE_URL}/deletar/${id}`)
}