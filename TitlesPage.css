import type {
  ForgotPasswordPayload,
  MessageResponse,
  ResetPasswordPayload,
} from '../types/auth'
import { apiCommunication } from './apiCommunication'

export async function forgotPasswordRequest(
  data: ForgotPasswordPayload,
): Promise<MessageResponse> {
  const response = await apiCommunication.post<MessageResponse>(
    '/api/auth/forgot-password',
    data,
  )

  return response.data
}

export async function resetPasswordRequest(
  data: ResetPasswordPayload,
): Promise<MessageResponse> {
  const response = await apiCommunication.post<MessageResponse>(
    '/api/auth/reset-password',
    data,
  )

  return response.data
}
