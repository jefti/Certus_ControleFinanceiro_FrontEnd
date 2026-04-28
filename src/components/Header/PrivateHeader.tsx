import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getUserInitial, getUserNickname } from "../../utils/userDisplay";
import "./header.css";

export function PrivateHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate("/login");
  }

  return (
    <header className="app-header app-header--private">
      <div className="app-header__inner">
        <div className="app-header__nav-group">
          <Link className="app-header__brand" to="/inicio">
            <img
              className="app-header__logo"
              src="/logo-certus-resumed.png"
              alt="Certus"
            />
          </Link>

          <nav className="app-header__nav">
            <div className="app-header__dropdown">
              <button
                type="button"
                className="app-header__link app-header__link--button"
                aria-haspopup="true"
              >
                Cadastros
                <span className="app-header__caret" aria-hidden="true">▾</span>
              </button>

              <div className="app-header__dropdown-menu">
                <span className="app-header__dropdown-item app-header__dropdown-item--disabled">
                  Centro de custo
                </span>
                <Link className="app-header__dropdown-item" to="/titulos">
                  Títulos
                </Link>
              </div>
            </div>

            <Link className="app-header__link" to="/dashboard">
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="app-header__actions">
          <div className="app-header__profile" tabIndex={0}>
            <div className="app-header__avatar" aria-hidden="true">
              {getUserInitial(user?.nome)}
            </div>

            <div className="app-header__profile-copy">
              <span className="app-header__profile-label">
                Usuário conectado
              </span>
              <span className="app-header__user">
                {getUserNickname(user?.nome)}
              </span>
            </div>

            <div className="app-header__profile-menu">
              <Link className="app-header__dropdown-item" to="/usuario">
                Meu perfil
              </Link>

              <button
                type="button"
                className="app-header__dropdown-item app-header__dropdown-item--danger"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
