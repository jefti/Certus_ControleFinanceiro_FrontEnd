import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './header.css'

export function PrivateHeader() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate('/login')
  }

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <nav className="app-header__nav">
          <Link className="app-header__brand" to="/inicio">
            {/* <img className="app-header__logo" src={logo} alt="Certus" /> */}
            Certus
          </Link>

          <Link className="app-header__link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="app-header__link" to="/usuario">
            Usuário
          </Link>
          <Link className="app-header__link" to="/cadastros">
            Cadastros
          </Link>
        </nav>

        <div className="app-header__actions">
          <span className="app-header__user">{user?.nome}</span>
          <button className="app-header__button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
