export interface AuthUser {
  id: number
  nome: string
  email: string
  celular?: string
  dataCadastro?: string
  dataInativacao?: string | null
}

export interface AuthSession {
  token: string
  user: AuthUser
}

export interface SignInPayload {
  email: string
  senha: string
}

export interface SignInResponse {
  token: string
  usuario: AuthUser
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  email: string
  codigo: string
  novaSenha: string
}

export interface MessageResponse {
  message: string
}

export interface AuthContextData {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  signIn: (data: SignInPayload) => Promise<void>
  signOut: () => void
}
