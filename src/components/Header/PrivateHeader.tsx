import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function PrivateHeader() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate('/login')
  }

  return (
    <header>
      <nav>
        <Link to="/inicio">Certus Controle Financeiro</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/usuario">Usuário</Link>
        <Link to="/cadastros">Cadastros</Link>
      </nav>

      <div>
        <span>{user?.nome}</span>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </header>
  )
}
