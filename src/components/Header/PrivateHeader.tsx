import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getUserInitial, getUserNickname } from "../../utils/userDisplay";
import "./header.css";

const mobileNavItems = [
  { label: "Inicio", path: "/inicio" },
  { label: "Dashboard", path: "/dashboard" },
];

export function PrivateHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileCadastrosOpen, setIsMobileCadastrosOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMobileCadastrosOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileCadastrosOpen && !isProfileMenuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (mobileNavRef.current && !mobileNavRef.current.contains(target)) {
        setIsMobileCadastrosOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMobileCadastrosOpen, isProfileMenuOpen]);

  function handleLogout() {
    signOut();
    navigate("/login");
  }

  function isCadastrosActive() {
    return (
      location.pathname === "/centro-de-custos" || location.pathname === "/titulos"
    );
  }

  return (
    <>
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

            <nav className="app-header__nav app-header__nav--desktop">
              <div className="app-header__dropdown">
                <button
                  type="button"
                  className="app-header__link app-header__link--button"
                  aria-haspopup="true"
                >
                  Cadastros
                  <span className="app-header__caret" aria-hidden="true">v</span>
                </button>

                <div className="app-header__dropdown-menu">
                  <Link className="app-header__dropdown-item" to="/centro-de-custos">
                    Centro de custo
                  </Link>
                  <Link className="app-header__dropdown-item" to="/titulos">
                    Titulos
                  </Link>
                </div>
              </div>

              <NavLink
                className={({ isActive }) =>
                  `app-header__link${isActive ? " app-header__link--active" : ""}`
                }
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </nav>
          </div>

          <div className="app-header__actions">
            <div
              ref={profileRef}
              className={`app-header__profile${
                isProfileMenuOpen ? " app-header__profile--open" : ""
              }`}
              tabIndex={0}
              onClick={() => setIsProfileMenuOpen((current) => !current)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setIsProfileMenuOpen((current) => !current);
                }

                if (event.key === "Escape") {
                  setIsProfileMenuOpen(false);
                }
              }}
            >
              <div className="app-header__avatar" aria-hidden="true">
                {getUserInitial(user?.nome)}
              </div>

              <div className="app-header__profile-copy">
                <span className="app-header__profile-label">Usuario conectado</span>
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
                  onClick={(event) => {
                    event.stopPropagation();
                    handleLogout();
                  }}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="app-mobile-nav" ref={mobileNavRef}>
        {isMobileCadastrosOpen && (
          <div className="app-mobile-nav__sheet">
            <span className="app-mobile-nav__sheet-label">Cadastros</span>

            <NavLink
              className={({ isActive }) =>
                `app-mobile-nav__sheet-link${
                  isActive ? " app-mobile-nav__sheet-link--active" : ""
                }`
              }
              to="/centro-de-custos"
            >
              Centro de custo
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `app-mobile-nav__sheet-link${
                  isActive ? " app-mobile-nav__sheet-link--active" : ""
                }`
              }
              to="/titulos"
            >
              Titulos
            </NavLink>
          </div>
        )}

        <nav className="app-mobile-nav__bar" aria-label="Navegacao principal">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) =>
                `app-mobile-nav__item${
                  isActive ? " app-mobile-nav__item--active" : ""
                }`
              }
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}

          <button
            type="button"
            className={`app-mobile-nav__item${
              isCadastrosActive() || isMobileCadastrosOpen
                ? " app-mobile-nav__item--active"
                : ""
            }`}
            onClick={() => setIsMobileCadastrosOpen((current) => !current)}
            aria-expanded={isMobileCadastrosOpen}
            aria-controls="app-mobile-cadastros-sheet"
          >
            Cadastros
          </button>
        </nav>
      </div>
    </>
  );
}
