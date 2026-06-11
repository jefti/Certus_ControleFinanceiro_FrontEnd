import { apiCommunication } from './apiCommunication'
import { saveAuthSession } from '../storage/authStorage'

describe('apiCommunication', () => {
  it('inclui o token JWT nas requisicoes autenticadas', async () => {
    saveAuthSession({
      token: 'token-teste',
      user: { id: 1, nome: 'Maria', email: 'maria@email.com', celular: '85999999999' },
    })

    const adapter = vi.fn(async (config) => ({
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    }))

    await apiCommunication.get('/teste', {
      adapter,
    })

    expect(adapter).toHaveBeenCalledOnce()
    expect(adapter.mock.calls[0][0].headers.Authorization).toBe('Bearer token-teste')
  })
})
