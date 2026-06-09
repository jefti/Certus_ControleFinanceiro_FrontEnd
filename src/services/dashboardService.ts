import { apiCommunication } from './apiCommunication'
import type { DashboardResponse } from '../types/dashboard'

export async function getDashboard(periodoInicial: string, periodoFinal: string) {
  const response = await apiCommunication.get<DashboardResponse>('/api/dashboard', {
    params: {
      periodoInicial,
      periodoFinal,
    },
  })

  return response.data
}
