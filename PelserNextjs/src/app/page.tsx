'use client';
import React, { useEffect, useState } from 'react';
import * as restServicePagina from './servicios/pagina';
import { Skeleton, Box } from '@mui/material';
import { IPelicula } from './interfaces/IPeliculas';
import { ISerie } from './interfaces/ISeries';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Principal() {
  const [portada, setPortada] = useState<IPelicula | null>(null);
  const [peliculas, setPeliculas] = useState<IPelicula[] | null>(null);
  const [series, setSeries] = useState<ISerie[] | null>(null);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      setUser(JSON.parse(usuario));
    }
    async function cargarPeliculas() {
      const paginas = [1, 2, 3, 4, 5];
      const respuestas = await Promise.all(
        paginas.map(num => restServicePagina.obtenerPeliculasPrincipal(num))
      );
      const todas = respuestas.flatMap(r => r.results);
      const mezcladas = todas
        .filter((p) => p.poster_path && p.title)
        .sort(() => Math.random() - 0.5);
      const seleccionadas = mezcladas.slice(0, 11);
      const portadaIndex = Math.floor(Math.random() * seleccionadas.length);
      const portadaPelicula = seleccionadas[portadaIndex];

      console.log('Películas cargadas:', portadaPelicula);
      setPortada(portadaPelicula);
      setPeliculas(todas);
      console.log('Películas cargadas:', todas);
    }

    async function cargarSeries() {
      const respuesta = await restServicePagina.obtenerSeriePrincipal();
      setSeries(respuesta.results);
    }

    cargarSeries();
    cargarPeliculas();
  }, []);

  async function agregarMiLista() {
    if (!user) {
      router.push('/componentes/login');
      return;
    }

    if (!portada || typeof portada.id !== 'number') {
      console.warn('No hay una película destacada seleccionada para agregar.');
      return;
    }

    try {
      const respuesta = await restServicePagina.agregarPeliculaLista(user.id, portada.id, 0);
      if(respuesta.ok){
        alert('Película agregada a Mi Lista');
      }     
      if(respuesta.ok === false){
        alert(respuesta.message);
      }
    } catch (error) {
      console.error('Error al agregar a Mi Lista:', error);
    }
  }

  return (
    <div className="bg-dark min-vh-100">
      {/* Hero Section */}
      <section
        className="position-relative d-flex align-items-center justify-content-start text-white overflow-hidden"
        style={{
          height: '120vh',
          backgroundImage: portada
            ? `url(https://image.tmdb.org/t/p/original${portada.poster_path})`
            : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.85) 100%)',
            zIndex: 1
          }}
        ></div>

        {/* Overlay Pattern */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)',
            zIndex: 2
          }}
        ></div>

        <div className="container position-relative" style={{ zIndex: 3 }}>
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-7 col-xl-6">
              {portada ? (
                <div className="animate__animated animate__fadeInUp">
                  {/* Badge */}
                  <div className="mb-4">
                    <span className="badge bg-gradient bg-danger rounded-pill px-4 py-2 fs-6 fw-bold">
                      <i className="bi bi-fire me-2"></i>DESTACADO
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="display-1 fw-black mb-4 lh-1" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
                    {portada.title}
                  </h1>

                  {/* Action Buttons */}
                  <div className="d-flex flex-wrap gap-3">
                    <button className="btn btn-light btn-lg fw-bold px-5 py-3 rounded-pill shadow-lg" onClick={agregarMiLista}>
                      <i className="bi bi-plus-lg me-2 fs-4"></i>Mi Lista
                    </button>
                    <button className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill" onClick={() => router.push(`/componentes/individualPeli/${portada.id}`)}>
                      <i className="bi bi-info-circle fs-4"></i>
                    </button>
                  </div>
                </div>
              ) : (
                // Enhanced Skeleton Loading
                <div className="animate__animated animate__fadeIn">
                  <Box className="mb-4">
                    <Skeleton variant="rounded" width={120} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 20 }} />
                  </Box>
                  <Box className="mb-4">
                    <Skeleton variant="text" width="80%" height={80} sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
                    <Skeleton variant="text" width="60%" height={80} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                  </Box>
                  <Box className="d-flex gap-3 mb-5">
                    <Skeleton variant="rounded" width={100} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Skeleton variant="rounded" width={80} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Skeleton variant="rounded" width={90} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 12 }} />
                  </Box>
                  <Box className="d-flex gap-3">
                    <Skeleton variant="rounded" width={180} height={56} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 28 }} />
                    <Skeleton variant="rounded" width={140} height={56} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 28 }} />
                    <Skeleton variant="rounded" width={56} height={56} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 28 }} />
                  </Box>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-5" style={{ zIndex: 3 }}>
          <div className="text-center animate__animated animate__bounce animate__infinite">
            <i className="bi bi-chevron-down text-white opacity-75 fs-2"></i>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-dark position-relative" style={{ marginTop: '-10vh', zIndex: 10 }}>
        {/* Glass morphism container */}
        <div
          className="overflow-hidden shadow-lg"
          style={{
            background: 'rgba(13, 13, 13, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >

          {/* Peliculas Tendencias*/}
          <div className="container py-5">
            {/* Section Header */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <h2 className="text-white fw-black fs-1 mb-2">
                      Tendencias Ahora
                    </h2>
                    <p className="text-light opacity-75 fs-5 mb-0">Lo más popular del momento</p>
                  </div>
                  <Link href="/componentes/peliculas" className="btn btn-outline-light rounded-pill px-4">
                    <i className="bi bi-arrow-right me-2"></i> Ver Todo
                  </Link>
                </div>
              </div>
            </div>

            {/* Movies Grid */}
            <div className="row">
              <div className="col-12">
                <div
                  className="d-flex gap-4 pb-4 overflow-auto"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#dc3545 transparent'
                  }}
                >
                  {peliculas
                    ? peliculas
                      .slice(0, 10)
                      .map((movie, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 position-relative group"
                          style={{ width: '280px', minWidth: '280px' }}
                          onClick={() => router.push(`/componentes/individualPeli/${movie.id}`)}
                        >
                          <div
                            className="card bg-dark text-white border-0 rounded-4 overflow-hidden shadow-lg h-100 position-relative"
                            style={{
                              cursor: 'pointer',
                              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                              transform: 'scale(1)',
                              background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                            }}
                          >
                            {/* Rank Badge */}
                            <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 3 }}>
                              <div
                                className="badge bg-danger rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                style={{ width: '30px', height: '30px' }}
                              >
                                {index + 1}
                              </div>
                            </div>

                            {/* Image Container */}
                            <div className="position-relative overflow-hidden">
                              <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="card-img-top"
                                style={{
                                  height: '320px',
                                  objectFit: 'cover',
                                  transition: 'transform 0.4s ease'
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              />

                              {/* Gradient Overlay */}
                              <div
                                className="position-absolute bottom-0 start-0 w-100"
                                style={{
                                  height: '50%',
                                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                  zIndex: 1
                                }}
                              ></div>

                              {/* Play Button Overlay */}
                              <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 2 }}>
                                <button
                                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center opacity-0"
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={e => {
                                    e.currentTarget.style.opacity = '0.9';
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                  }}
                                  onMouseLeave={e => {
                                    e.currentTarget.style.opacity = '0';
                                    e.currentTarget.style.transform = 'scale(1)';
                                  }}
                                >
                                  <i className="bi bi-play-fill fs-3 text-dark"></i>
                                </button>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="card-body p-4">
                              <h5 className="card-title fw-bold mb-3 lh-sm" style={{ fontSize: '1.1rem' }}>
                                {movie.title}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))
                    : Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} className="flex-shrink-0" style={{ width: '280px', minWidth: '280px' }}>
                        <div className="card bg-dark border-0 rounded-4 overflow-hidden h-100">
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={320}
                            sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                          />
                          <Box className="p-4">
                            <Skeleton variant="text" width="85%" height={24} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
                            <Box className="d-flex justify-content-between align-items-center mb-3">
                              <Skeleton variant="text" width="40%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                              <Skeleton variant="text" width="25%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                            </Box>
                            <Box className="d-flex gap-2">
                              <Skeleton variant="rounded" height={32} sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 16 }} />
                              <Skeleton variant="rounded" width={40} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 16 }} />
                            </Box>
                          </Box>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/*Comedia*/}
          <div className="container py-5">
            {/* Section Header */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <h2 className="text-white fw-black fs-1 mb-2">
                      Comedia
                    </h2>
                    <p className="text-light opacity-75 fs-5 mb-0">Las peliculas más graciosas</p>
                  </div>
                  <Link href="/componentes/peliculas" className="btn btn-outline-light rounded-pill px-4">
                    <i className="bi bi-arrow-right me-2"></i> Ver Todo
                  </Link>
                </div>
              </div>
            </div>

            {/* Movies Grid */}
            <div className="row">
              <div className="col-12">
                <div
                  className="d-flex gap-4 pb-4 overflow-auto"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#dc3545 transparent'
                  }}
                >
                  {peliculas
                    ? peliculas
                      .filter(movie => movie.genre_ids?.includes(35))
                      .slice(0, 6)
                      .map((movie, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 position-relative group"
                          style={{ width: '280px', minWidth: '280px' }}
                          onClick={() => router.push(`/componentes/individualPeli/${movie.id}`)}
                        >
                          <div
                            className="card bg-dark text-white border-0 rounded-4 overflow-hidden shadow-lg h-100 position-relative"
                            style={{
                              cursor: 'pointer',
                              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                              transform: 'scale(1)',
                              background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                            }}
                          >

                            {/* Image Container */}
                            <div className="position-relative overflow-hidden">
                              <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="card-img-top"
                                style={{
                                  height: '320px',
                                  objectFit: 'cover',
                                  transition: 'transform 0.4s ease'
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              />

                              {/* Gradient Overlay */}
                              <div
                                className="position-absolute bottom-0 start-0 w-100"
                                style={{
                                  height: '50%',
                                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                  zIndex: 1
                                }}
                              ></div>

                              {/* Play Button Overlay */}
                              <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 2 }}>
                                <button
                                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center opacity-0"
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={e => {
                                    e.currentTarget.style.opacity = '0.9';
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                  }}
                                  onMouseLeave={e => {
                                    e.currentTarget.style.opacity = '0';
                                    e.currentTarget.style.transform = 'scale(1)';
                                  }}
                                >
                                  <i className="bi bi-play-fill fs-3 text-dark"></i>
                                </button>
                              </div>
                            </div>   
                            {/* Card Content */}
                            <div className="card-body p-4">
                              <h5 className="card-title fw-bold mb-3 lh-sm" style={{ fontSize: '1.1rem' }}>
                                {movie.title}
                              </h5>
                            </div>                      
                          </div>
                        </div>
                      ))
                    : Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} className="flex-shrink-0" style={{ width: '280px', minWidth: '280px' }}>
                        <div className="card bg-dark border-0 rounded-4 overflow-hidden h-100">
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={320}
                            sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                          />
                          <Box className="p-4">
                            <Skeleton variant="text" width="85%" height={24} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
                            <Box className="d-flex justify-content-between align-items-center mb-3">
                              <Skeleton variant="text" width="40%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                              <Skeleton variant="text" width="25%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                            </Box>
                            <Box className="d-flex gap-2">
                              <Skeleton variant="rounded" height={32} sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 16 }} />
                              <Skeleton variant="rounded" width={40} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 16 }} />
                            </Box>
                          </Box>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/*Ciencia Ficcion*/}
          <div className="container py-5">
            {/* Section Header */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <h2 className="text-white fw-black fs-1 mb-2">
                      Ciencia Ficcion
                    </h2>
                    <p className="text-light opacity-75 fs-5 mb-0">Lo peliculas más alucinantes</p>
                  </div>
                  <Link href="/componentes/peliculas" className="btn btn-outline-light rounded-pill px-4">
                    <i className="bi bi-arrow-right me-2"></i> Ver Todo
                  </Link>
                </div>
              </div>
            </div>

            {/* Movies Grid */}
            <div className="row">
              <div className="col-12">
                <div
                  className="d-flex gap-4 pb-4 overflow-auto"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#dc3545 transparent'
                  }}
                >
                  {peliculas
                    ? peliculas
                      .filter(movie => movie.genre_ids?.includes(878))
                      .slice(0, 6)
                      .map((movie, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 position-relative group"
                          style={{ width: '280px', minWidth: '280px' }}
                          onClick={() => router.push(`/componentes/individualPeli/${movie.id}`)}
                        >
                          <div
                            className="card bg-dark text-white border-0 rounded-4 overflow-hidden shadow-lg h-100 position-relative"
                            style={{
                              cursor: 'pointer',
                              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                              transform: 'scale(1)',
                              background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                            }}
                          >

                            {/* Image Container */}
                            <div className="position-relative overflow-hidden">
                              <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="card-img-top"
                                style={{
                                  height: '320px',
                                  objectFit: 'cover',
                                  transition: 'transform 0.4s ease'
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              />

                              {/* Gradient Overlay */}
                              <div
                                className="position-absolute bottom-0 start-0 w-100"
                                style={{
                                  height: '50%',
                                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                  zIndex: 1
                                }}
                              ></div>

                              {/* Play Button Overlay */}
                              <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 2 }}>
                                <button
                                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center opacity-0"
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={e => {
                                    e.currentTarget.style.opacity = '0.9';
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                  }}
                                  onMouseLeave={e => {
                                    e.currentTarget.style.opacity = '0';
                                    e.currentTarget.style.transform = 'scale(1)';
                                  }}
                                >
                                  <i className="bi bi-play-fill fs-3 text-dark"></i>
                                </button>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="card-body p-4">
                              <h5 className="card-title fw-bold mb-3 lh-sm" style={{ fontSize: '1.1rem' }}>
                                {movie.title}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))
                    : Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} className="flex-shrink-0" style={{ width: '280px', minWidth: '280px' }}>
                        <div className="card bg-dark border-0 rounded-4 overflow-hidden h-100">
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={320}
                            sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                          />
                          <Box className="p-4">
                            <Skeleton variant="text" width="85%" height={24} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
                            <Box className="d-flex justify-content-between align-items-center mb-3">
                              <Skeleton variant="text" width="40%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                              <Skeleton variant="text" width="25%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                            </Box>
                            <Box className="d-flex gap-2">
                              <Skeleton variant="rounded" height={32} sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 16 }} />
                              <Skeleton variant="rounded" width={40} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 16 }} />
                            </Box>
                          </Box>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/*Series Tendencias*/}
          <div className="container py-5">
            {/* Section Header */}
            <div className="row mb-5">
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <h2 className="text-white fw-black fs-1 mb-2">
                      Tendecias Series
                    </h2>
                    <p className="text-light opacity-75 fs-5 mb-0">Lo más popular del momento</p>
                  </div>
                  <Link href="/componentes/series" className="btn btn-outline-light rounded-pill px-4">
                    <i className="bi bi-arrow-right me-2"></i> Ver Todo
                  </Link>
                </div>
              </div>
            </div>

            {/* Series Grid */}
            <div className="row">
              <div className="col-12">
                <div
                  className="d-flex gap-4 pb-4 overflow-auto"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#dc3545 transparent'
                  }}
                >
                  {series
                    ? series
                      .slice(0, 10)
                      .map((series, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 position-relative group"
                          style={{ width: '280px', minWidth: '280px' }}
                          onClick={() => router.push(`/componentes/individualSerie/${series.id}`)}
                        >
                          <div
                            className="card bg-dark text-white border-0 rounded-4 overflow-hidden shadow-lg h-100 position-relative"
                            style={{
                              cursor: 'pointer',
                              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                              transform: 'scale(1)',
                              background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                            }}
                          >
                            {/* Rank Badge */}
                            <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 3 }}>
                              <div
                                className="badge bg-danger rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                style={{ width: '30px', height: '30px' }}
                              >
                                {index + 1}
                              </div>
                            </div>

                            {/* Image Container */}
                            <div className="position-relative overflow-hidden">
                              <img
                                src={`https://image.tmdb.org/t/p/w500${series.backdrop_path}`}
                                alt={series.name}
                                className="card-img-top"
                                style={{
                                  height: '320px',
                                  objectFit: 'cover',
                                  transition: 'transform 0.4s ease'
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              />

                              {/* Gradient Overlay */}
                              <div
                                className="position-absolute bottom-0 start-0 w-100"
                                style={{
                                  height: '50%',
                                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                  zIndex: 1
                                }}
                              ></div>

                              {/* Play Button Overlay */}
                              <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 2 }}>
                                <button
                                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center opacity-0"
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={e => {
                                    e.currentTarget.style.opacity = '0.9';
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                  }}
                                  onMouseLeave={e => {
                                    e.currentTarget.style.opacity = '0';
                                    e.currentTarget.style.transform = 'scale(1)';
                                  }}
                                >
                                  <i className="bi bi-play-fill fs-3 text-dark"></i>
                                </button>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="card-body p-4">
                              <h5 className="card-title fw-bold mb-3 lh-sm" style={{ fontSize: '1.1rem' }}>
                                {series.name}
                              </h5>                              
                            </div>
                          </div>
                        </div>
                      ))
                    : Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} className="flex-shrink-0" style={{ width: '280px', minWidth: '280px' }}>
                        <div className="card bg-dark border-0 rounded-4 overflow-hidden h-100">
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={320}
                            sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                          />
                          <Box className="p-4">
                            <Skeleton variant="text" width="85%" height={24} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
                            <Box className="d-flex justify-content-between align-items-center mb-3">
                              <Skeleton variant="text" width="40%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                              <Skeleton variant="text" width="25%" height={16} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                            </Box>
                            <Box className="d-flex gap-2">
                              <Skeleton variant="rounded" height={32} sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 16 }} />
                              <Skeleton variant="rounded" width={40} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 16 }} />
                            </Box>
                          </Box>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}