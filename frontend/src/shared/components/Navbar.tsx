import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo v2.png";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, userRole, logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid p-0">
        <NavLink className="navbar-brand px-3" to="/">
          <img
            src={logo}
            alt="Ticket Plus Logo"
            style={{
              height: "70px",
            }}
          />
        </NavLink>

        <button
          className="navbar-toggler mx-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 px-3 align-items-lg-center">
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/informacion">
                Nosotros
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                {userRole === "CLIENTE" && (
                  <li className="nav-item">
                    <NavLink className={navLinkClass} to="/ver-boletos">
                      Ver boletos
                    </NavLink>
                  </li>
                )}

                {(userRole === "MANAGER" || userRole === "ADMIN") && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }: { isActive: boolean }) =>
                        isActive
                          ? "nav-link active text-warning fw-bold"
                          : "nav-link text-warning"
                      }
                      to="/dashboard"
                    >
                      {userRole === "ADMIN" ? "Panel Admin" : "Gestionar Eventos"}
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/perfil">
                    Mi Perfil
                  </NavLink>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-start"
                    style={{ textDecoration: "none" }}
                    onClick={logout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/login">
                    Iniciar Sesion
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/registro">
                    Registrarse
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
