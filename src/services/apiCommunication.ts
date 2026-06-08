import axios from 'axios'
import { clearAuthSession, loadAuthSession } from '../storage/authStorage'

const SESSION_EXPIRED_MESSAGE_KEY = '@certus:session-expired-message'

export const apiCommunication = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiCommunication.interceptors.request.use((config) => {
  const session = loadAuthSession()

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`
  }

  return config
})

apiCommunication.interceptors.response.use(
  (response) => response,
  (error) => {
    const hasAuthHeader = Boolean(error.config?.headers?.Authorization)

    if ([401, 403].includes(error.response?.status) && hasAuthHeader) {
      clearAuthSession()
      sessionStorage.setItem(
        SESSION_EXPIRED_MESSAGE_KEY,
        'Sua sessao expirou ou se tornou invalida. Faca login novamente para continuar.',
      )

      if (window.location.pathname !== '/login') {
        window.location.replace('/login')
      }
    }

    return Promise.reject(error)
  },
)
