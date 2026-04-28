import axios from 'axios'

export const apiCommunication = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiCommunication.interceptors.request.use((config) => {
  const authData = localStorage.getItem('@certus:auth')

  if (authData) {
    try {
      const session = JSON.parse(authData)

      if (session.token) {
        config.headers.Authorization = `Bearer ${session.token}`
      }
    } catch {
      localStorage.removeItem('@certus:auth')
    }
  }

  return config
})
