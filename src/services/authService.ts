import type { SignInPayload, SignInResponse } from '../types/auth'

export async function signInRequest(
  data: SignInPayload,
): Promise<SignInResponse> {
  return {
    token: 'token-fake',
    usuario: {
      id: 1,
      nome: 'Usuario Teste',
      email: data.email,
    },
  }
}
