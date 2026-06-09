import { apiCommunication } from './apiCommunication'
import type { FinancialTitle, TitleRequest } from '../types/title'

const BASE_URL = '/api/titulos'

export async function getTitles() {
  const response = await apiCommunication.get<FinancialTitle[]>(`${BASE_URL}/obter`)
  return response.data
}

export async function createTitle(data: TitleRequest) {
  const response = await apiCommunication.post<FinancialTitle>(
    `${BASE_URL}/cadastrar`,
    data,
  )

  return response.data
}

export async function updateTitle(id: number, data: TitleRequest) {
  const response = await apiCommunication.put<FinancialTitle>(
    `${BASE_URL}/atualizar/${id}`,
    data,
  )

  return response.data
}

export async function deleteTitle(id: number) {
  await apiCommunication.delete(`${BASE_URL}/deletar/${id}`)
}
