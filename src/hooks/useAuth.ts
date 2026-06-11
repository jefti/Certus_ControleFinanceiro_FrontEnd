import { useContext } from 'react'
import { AuthContext } from '../contexts/authContextDefinition'

export function useAuth() {
  return useContext(AuthContext)
}
