'use client';

import { useEffect, useState } from "react";
import * as restServicePagina from '../../servicios/pagina';
import { ICategoria } from '../../interfaces/ICategorias';
import { ISerie } from "@/app/interfaces/ISeries";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function SeriesPage() {
  const [categorias, setCategorias] = useState<ICategoria[]>([]); 
  const [series, setSeries] = useState<ISerie[]>([]);
  const [visibleCount, setVisibleCount] = useState(16); 
  const [query, setQuery] = useState(""); 
  const [loading, setLoading] = useState(true); // ✅ nuevo estado

  useEffect(() => {
    async function recuperarCategorias(){
      const respuesta=await restServicePagina.obtenerCategorias2();      
      setCategorias(respuesta.genres);
    }

    async function cargarSeries() {
      setLoading(true);
      const paginas = [1, 2, 3, 4, 5, 6, 7, 8];      
      const respuestas = await Promise.all(
        paginas.map(num => restServicePagina.obtenerSeries(num))
      );
      const todas = respuestas.flatMap(r => r.results);                                       
      setSeries(todas); 
      setLoading(false); // ✅ se terminó de cargar
    }

    recuperarCategorias();
    cargarSeries();
  },[]);

  const seriesFiltradas = series.filter((serie) =>
    serie.name.toLowerCase().includes(query.toLowerCase())
  );

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
      
        {/* Buscador */}
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden">
              <span className="input-group-text bg-dark text-white border-0 px-4">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-dark text-white border-0"
                placeholder="Buscar Serie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
              />
            </div>
          </div>
        </div>
       
        {/* Categorías */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  className="btn btn-outline-light rounded-pill px-4 py-2 transition"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Series o Skeletons */}
        <div className="row g-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="col-lg-3 col-md-4 col-sm-6">
                  <Box className="card bg-dark border-0 rounded-4 shadow-lg overflow-hidden h-100">
                    <Skeleton
                      variant="rectangular"
                      height={320}
                      animation="wave"
                    />
                    <Box className="p-4">
                      <Skeleton
                        variant="text"
                        width="80%"
                        height={28}
                        animation="wave"
                      />
                      <Skeleton
                        variant="text"
                        width="60%"
                        height={20}
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </div>
              ))
            : seriesFiltradas.slice(0, visibleCount).map((serie) => (
                <div key={serie.id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card bg-dark text-white border-0 rounded-4 shadow-lg overflow-hidden h-100 movie-card">
                    <div className="position-relative">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`}
                        className="card-img-top"
                        alt={serie.name}
                        style={{ height: "320px", objectFit: "cover" }}
                      />
                      <div className="card-img-overlay d-flex align-items-center justify-content-center p-0 opacity-0 hover-overlay">
                        <button className="btn btn-light rounded-circle shadow d-flex align-items-center justify-content-center">
                          <i className="bi bi-play-fill fs-3 text-dark"></i>
                        </button>
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
                      <h5 className="card-title fw-bold mb-3">{serie.name}</h5>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <small className="text-light opacity-75">
                          <i className="bi bi-calendar3 me-2"></i>
                          {serie.first_air_date}
                        </small>
                        <span className="fw-bold text-warning">
                          <i className="bi bi-star-fill me-1"></i>
                          {serie.vote_average}
                        </span>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-light btn-sm rounded-pill flex-fill">
                          <i className="bi bi-plus-lg me-1"></i>Lista
                        </button>
                        <button className="btn btn-outline-light btn-sm rounded-pill">
                          <i className="bi bi-info-circle"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
       
        {/* Botón cargar más */}
        {!loading && visibleCount < seriesFiltradas.length && (
          <div className="text-center mt-5">
            <button
              className="btn btn-outline-light btn-lg rounded-pill px-5 shadow"
              onClick={() => setVisibleCount((prev) => prev + 16)} 
            >
              <i className="bi bi-arrow-down-circle me-2"></i> Cargar Más
            </button>
          </div>
        )}
      </div>      
    </div>
  );
}
