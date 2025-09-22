export default function SeriesPage() {
  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%)",
        backdropFilter: "blur(20px)",
        marginTop: "6vh",
      }}
    >
      <div className="container py-5">
        
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden">
              <span className="input-group-text bg-dark text-white border-0 px-4">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-dark text-white border-0"               
              />
            </div>
          </div>
        </div>

     
      <div className="row mb-5">
        <div className="col-12 text-center">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <button className="btn btn-danger shadow rounded-pill px-4 py-2">
              Todas
            </button>
            <button className="btn btn-outline-light rounded-pill px-4 py-2">
              Drama
            </button>
            <button className="btn btn-outline-light rounded-pill px-4 py-2">
              Comedia
            </button>
            <button className="btn btn-outline-light rounded-pill px-4 py-2">
              Suspenso
            </button>
            <button className="btn btn-outline-light rounded-pill px-4 py-2">
              Ciencia Ficción
            </button>
            <button className="btn btn-outline-light rounded-pill px-4 py-2">
              Crimen
            </button>
            <button className="btn btn-outline-light rounded-pill px-4 py-2">
              Documentales
            </button>
            <button className="btn btn-outline-light rounded-pill px-4 py-2">
              Animación
            </button>
          </div>
        </div>
      </div>

      
      <div className="row g-4">
       
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="card bg-dark text-white border-0 rounded-4 shadow-lg overflow-hidden h-100 position-relative">
            <div className="position-relative">
              <img
                src="https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg"
                className="card-img-top"
                alt="The Last of Us"
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
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge bg-danger">NUEVA TEMPORADA</span>
              </div>
              <div
                className="position-absolute bottom-0 start-0 w-100"
                style={{
                  height: "50%",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                }}
              ></div>
            </div>
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-3">The Last of Us</h5>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <small className="text-light opacity-75">
                  <i className="bi bi-calendar3 me-2"></i>2023 • 2 Temporadas
                </small>
                <span className="fw-bold text-warning">
                  <i className="bi bi-star-fill me-1"></i>9.2
                </span>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-light btn-sm rounded-pill flex-fill">
                  <i className="bi bi-plus-lg me-1"></i>Mi Lista
                </button>
                <button className="btn btn-outline-light btn-sm rounded-pill">
                  <i className="bi bi-info-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

       
      </div>

     
      <div className="text-center mt-5">
        <button className="btn btn-outline-light btn-lg rounded-pill px-5 shadow">
          <i className="bi bi-arrow-down-circle me-2"></i> Cargar Más Series
        </button>
      </div>
    </div>
    </div>
  );
}
