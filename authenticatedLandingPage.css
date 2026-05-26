import type { AuthSession } from '../types/auth'

const AUTH_STORAGE_KEY = '@certus:auth'

export function saveAuthSession(session: AuthSession) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

export function loadAuthSession(): AuthSession | null {
  const data = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!data) {
    return null
  }

  try {
    return JSON.parse(data) as AuthSession
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}