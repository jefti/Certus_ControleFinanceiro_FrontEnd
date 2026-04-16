import { Link } from 'react-router-dom'

export function PublicHeader() {
  return (
    <header>
      <nav>
        <Link to="/">Certus Controle Financeiro</Link>
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
        <Link to="/recuperar-senha">Recuperar senha</Link>
      </nav>
    </header>
  )
}