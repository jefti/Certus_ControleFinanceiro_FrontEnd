import { clearAuthSession, loadAuthSession, saveAuthSession } from './authStorage'

const session = {
  token: 'jwt-token',
  user: {
    id: 1,
    nome: 'Maria Silva',
    email: 'maria@email.com',
    celular: '85999999999',
  },
}

describe('authStorage', () => {
  it('salva, carrega e limpa a sessao', () => {
    saveAuthSession(session)
    expect(loadAuthSession()).toEqual(session)

    clearAuthSession()
    expect(loadAuthSession()).toBeNull()
  })

  it('remove uma sessao corrompida', () => {
    localStorage.setItem('@certus:auth', '{invalido')

    expect(loadAuthSession()).toBeNull()
    expect(localStorage.getItem('@certus:auth')).toBeNull()
  })
})
