'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();

  function isActive(path: string) { // <-- reemplazamos any por string
    return pathname === path ? "active" : "";
  }

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <span className="navbar-brand text-danger fw-bold fs-3">PELSER</span> {/* no es link */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${isActive("/")}`}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link href="/componentes/peliculas" className={`nav-link ${isActive("/componentes/peliculas")}`}>Películas</Link>
            </li>
            <li className="nav-item">
              <Link href="/componentes/series" className={`nav-link ${isActive("/componentes/series")}`}>Series</Link>
            </li>
            <li className="nav-item">
              <Link href="/componentes/milista" className={`nav-link ${isActive("/componentes/milista")}`}>Mi Lista</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {/* Dropdown de notificaciones */}
            <div className="dropdown me-2">
              <button
                className="btn btn-link text-white position-relative"
                type="button"
                id="dropdownNotificaciones"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-bell fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow" aria-labelledby="dropdownNotificaciones" style={{ minWidth: "250px" }}>
                <li><h6 className="dropdown-header">Notificaciones</h6></li>
                <li><span className="dropdown-item">🎬 Nueva película agregada</span></li>
                <li><span className="dropdown-item">📺 Nueva serie disponible</span></li>
                <li><span className="dropdown-item">❤️ Tu lista tiene 12 elementos</span></li>                
              </ul>
            </div>

            {/* Perfil */}
            <Link href="/componentes/configuracion" className="btn btn-link text-white">
              <i className="bi bi-person-circle fs-5"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
