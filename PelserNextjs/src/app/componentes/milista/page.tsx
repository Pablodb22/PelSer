"use client";

import Link from "next/link";

export default function MiListaPage() {
  return (
    <div
      className="bg-dark text-white"
      style={{
        background: "linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%)",
        minHeight: "100vh",
        paddingTop: "6vh",
      }}
    >
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-2">
              <i className="bi bi-bookmark-heart-fill text-danger me-3"></i>Mi
              Lista
            </h1>
            <p className="lead text-light opacity-75">
              Tus películas y series favoritas guardadas
            </p>
            <div className="mt-4">
              <span className="badge bg-danger rounded-pill px-3 py-2 fs-6">
                <i className="bi bi-collection-fill me-2"></i>12 elementos
                guardados
              </span>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-danger rounded-pill px-4">Todos</button>
              <button className="btn btn-outline-light rounded-pill px-4">
                Películas
              </button>
              <button className="btn btn-outline-light rounded-pill px-4">
                Series
              </button>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="card bg-dark text-white border-0 rounded-4 shadow-lg overflow-hidden h-100 position-relative">
              <div className="position-relative">
                <img
                  src="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
                  className="card-img-top"
                  alt="Oppenheimer"
                  style={{ height: "320px", objectFit: "cover" }}
                />
                <div
                  className="card-img-overlay d-flex align-items-center justify-content-center p-0"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <button
                    className="btn btn-light rounded-circle shadow d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="bi bi-play-fill fs-3 text-dark"></i>
                  </button>
                </div>
                <div className="position-absolute top-0 start-0 m-3">
                  <button
                    className="btn btn-danger btn-sm rounded-circle"
                    title="Remover de mi lista"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-success">PELÍCULA</span>
                </div>
                <div
                  className="position-absolute bottom-0 start-0 w-100"
                  style={{
                    height: "50%",
                    background:
                      "linear-gradient(transparent, rgba(0,0,0,0.85))",
                  }}
                ></div>
              </div>
              <div className="card-body p-4">
                <h5 className="card-title fw-bold mb-3">Oppenheimer</h5>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <small className="text-light opacity-75">
                    <i className="bi bi-calendar3 me-2"></i>2023
                  </small>
                  <span className="fw-bold text-warning">
                    <i className="bi bi-star-fill me-1"></i>8.4
                  </span>
                </div>
                <div className="mb-3">
                  <small className="text-success">
                    <i className="bi bi-plus-circle-fill me-1"></i>Agregado hace
                    2 días
                  </small>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-danger btn-sm rounded-pill flex-fill">
                    <i className="bi bi-play-fill me-1"></i>Ver Ahora
                  </button>
                  
                  <Link
                    href="/detalle/oppenheimer"
                    className="btn btn-outline-light btn-sm rounded-pill"
                  >
                    <i className="bi bi-info-circle"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
