import { Link } from 'react-router-dom'
import './header.css'

export function PublicHeader() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link className="app-header__brand" to="/">
          {/* <img className="app-header__logo" src={logo} alt="Certus" /> */}
          Certus
        </Link>

        <nav className="app-header__nav">
          <Link className="app-header__link" to="/login">
            Login
          </Link>

          <Link className="app-header__cta" to="/cadastro">
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  )
}
