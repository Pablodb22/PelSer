

export default function header() {
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <a className="navbar-brand text-danger fw-bold fs-3">PELSER</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><a className="nav-link active" href="/">Inicio</a></li>
                        <li className="nav-item"><a className="nav-link" href="/componentes/peliculas">Películas</a></li>
                        <li className="nav-item"><a className="nav-link" href="/series">Series</a></li>
                        <li className="nav-item"><a className="nav-link" href="/milista">Mi Lista</a></li>
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