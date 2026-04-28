import type { AuthUser } from '../types/auth'
import type { UserPayload } from '../types/user'
import { apiCommunication } from './apiCommunication'

export async function registerUserRequest(data: UserPayload): Promise<AuthUser> {
  const response = await apiCommunication.post<AuthUser>('/api/usuarios/cadastrar', data)
  return response.data
}
