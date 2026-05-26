import axios from 'axios'
import type { ApiErrorResponse } from '../types/api'

export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (typeof error.response?.data === 'string') {
      return error.response.data
    }

    return (
      error.response?.data?.mensagem ||
      error.response?.data?.erro ||
      error.response?.data?.message ||
      fallbackMessage
    )
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallbackMessage
}
