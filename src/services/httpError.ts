import axios from 'axios'
import type { ApiErrorResponse } from '../types/api'

function normalizeMojibake(message: string) {
  return message
    .replaceAll('NÃ£o', 'Nao')
    .replaceAll('nÃ£o', 'nao')
    .replaceAll('possÃ­vel', 'possivel')
    .replaceAll('operaÃ§Ã£o', 'operacao')
    .replaceAll('negÃ³cio', 'negocio')
    .replaceAll('validaÃ§Ã£o', 'validacao')
    .replaceAll('autenticaÃ§Ã£o', 'autenticacao')
    .replaceAll('invÃ¡lidas', 'invalidas')
    .replaceAll('TÃ\xadtulo', 'Titulo')
    .replaceAll('tÃ\xadtulo', 'titulo')
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (typeof error.response?.data === 'string') {
      return normalizeMojibake(error.response.data)
    }

    return normalizeMojibake(
      (
      error.response?.data?.mensagem ||
      error.response?.data?.erro ||
      error.response?.data?.message ||
      fallbackMessage
    )
    )
  }

  if (error instanceof Error && error.message) {
    return normalizeMojibake(error.message)
  }

  return fallbackMessage
}
