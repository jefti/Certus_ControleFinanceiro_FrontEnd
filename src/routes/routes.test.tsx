import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../contexts/authContextDefinition'
import type { AuthContextData } from '../types/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

function renderRoute(isAuthenticated: boolean, route: 'private' | 'public') {
  const context = {
    user: isAuthenticated ? { id: 1, nome: 'Maria', email: 'maria@email.com', celular: '85999999999' } : null,
    token: isAuthenticated ? 'token' : null,
    isAuthenticated,
    signIn: vi.fn(),
    signOut: vi.fn(),
  } satisfies AuthContextData

  const Guard = route === 'private' ? PrivateRoute : PublicRoute

  return render(
    <AuthContext.Provider value={context}>
      <MemoryRouter initialEntries={[route === 'private' ? '/privada' : '/login']}>
        <Routes>
          <Route element={<Guard />}>
            <Route
              path={route === 'private' ? '/privada' : '/login'}
              element={<p>{route === 'private' ? 'conteudo privado' : 'conteudo publico'}</p>}
            />
          </Route>
          <Route path="/login" element={<p>pagina login</p>} />
          <Route path="/inicio" element={<p>pagina inicio</p>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  )
}

describe('protecoes de rota', () => {
  it('redireciona visitante da rota privada para login', () => {
    renderRoute(false, 'private')
    expect(screen.getByText('pagina login')).toBeInTheDocument()
  })

  it('permite rota privada para usuario autenticado', () => {
    renderRoute(true, 'private')
    expect(screen.getByText('conteudo privado')).toBeInTheDocument()
  })

  it('redireciona usuario autenticado da rota publica para inicio', () => {
    renderRoute(true, 'public')
    expect(screen.getByText('pagina inicio')).toBeInTheDocument()
  })
})
