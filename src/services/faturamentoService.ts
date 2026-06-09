import { apiCommunication } from './apiCommunication'
import type { DashboardLancamento } from '../types/dashboard'

interface ValidarFaturamentoRequest {
  dataPagamento?: string | null
  observacao?: string | null
}

function formatPaymentDateTime(value?: string | null) {
  if (!value) {
    return null
  }

  return value.length === 16 ? `${value}:00` : value
}

export async function validarFaturamento(
  id: number,
  data: ValidarFaturamentoRequest,
) {
  const response = await apiCommunication.patch<DashboardLancamento>(
    `/api/faturamentos/${id}/validar`,
    {
      ...data,
      dataPagamento: formatPaymentDateTime(data.dataPagamento),
    },
  )

  return response.data
}
