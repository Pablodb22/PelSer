'use client'
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    function isActive(path:any) {
        return pathname === path ? "active" : "";
    }

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <a className="navbar-brand text-danger fw-bold fs-3">PELSER</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><a className={`nav-link ${isActive("/")}`} href="/">Inicio</a></li>
                        <li className="nav-item"><a className={`nav-link ${isActive("/componentes/peliculas")}`} href="/componentes/peliculas">Películas</a></li>
                        <li className="nav-item"><a className={`nav-link ${isActive("/componentes/series")}`} href="/componentes/series">Series</a></li>
                        <li className="nav-item"><a className={`nav-link ${isActive("/componentes/milista")}`} href="/componentes/milista">Mi Lista</a></li>
                    </ul>
                    <div className="d-flex">
                        <button className="btn btn-link text-white me-2"><i className="bi bi-search"></i></button>
                        <button className="btn btn-link text-white me-2"><i className="bi bi-bell"></i></button>
                        <button className="btn btn-link text-white"><i className="bi bi-person-circle"></i></button>
                    </div>
                </div>
            </div>
        </header>
    );
}