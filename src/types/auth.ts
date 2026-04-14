export interface AuthUser {
  id: number
  nome: string
  email: string
}

export interface AuthSession {
  token: string
  user: AuthUser
}

export interface SignInPayload {
  email: string
  senha: string
}

export interface AuthContextData {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  signIn: (data: SignInPayload) => Promise<void>
  signOut: () => void
}
