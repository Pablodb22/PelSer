'use client'
import { usePathname } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Header() {
  const pathname = usePathname();
  function isActive(path: any) {
    return pathname === path ? "active" : "";
  }

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand text-danger fw-bold fs-3">PELSER</a>
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
              <a className={`nav-link ${isActive("/")}`} href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${isActive("/componentes/peliculas")}`} href="/componentes/peliculas">Películas</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${isActive("/componentes/series")}`} href="/componentes/series">Series</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${isActive("/componentes/milista")}`} href="/componentes/milista">Mi Lista</a>
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
                <li><a className="dropdown-item" href="#">🎬 Nueva película agregada</a></li>
                <li><a className="dropdown-item" href="#">📺 Nueva serie disponible</a></li>
                <li><a className="dropdown-item" href="#">❤️ Tu lista tiene 12 elementos</a></li>                
              </ul>
            </div>

            {/* Perfil */}
            <a href="/componentes/configuracion" className="btn btn-link text-white">
              <i className="bi bi-person-circle fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
