import type { SignInPayload, SignInResponse } from '../types/auth'
import { apiCommunication } from './apiCommunication'

export async function signInRequest( data: SignInPayload,): Promise<SignInResponse> {

  // const response = await apiCommunication.post<SignInResponse>(
  //   '/api/auth/login',
  //   data,
  // )
  // return response.data


  return {
    token: 'token-fake',
    usuario: {
      id: 1,
      nome: 'Usuário Teste',
      email: data.email,
    },
  }
}
