'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as restServicePagina from '../../../servicios/pagina';
import { IPelicula } from '../../../interfaces/IPeliculas';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

type MediaItem = IPelicula & {
    overview?: string;
    genres?: Array<{ id: number; name: string }>;
    runtime?: number;
};

export default function IndividualPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const [pelicula, setPelicula] = useState<MediaItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [peliculasParecidas, setPeliculasParecidas] = useState<IPelicula[]>([]);
    const [user, setUser] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // Favorito
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoriteRecordId, setFavoriteRecordId] = useState<number | null>(null);

    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
          setUser(JSON.parse(usuario));
        }
    }, []);

    useEffect(() => {
        async function obtenerFavorito(){      
            try{        
              if (!user || !id) return;
              const resp = await restServicePagina.obtenerPeliculaFavorito(user.id, 0, Number(id));
              if(resp?.ok && resp.data){
                const fav = resp.data;
                setIsFavorited(true);
                setFavoriteRecordId(fav.id ?? null);
                if (typeof fav.favorito === 'number') {
                  setRating(fav.favorito);
                }
              }else{
                setIsFavorited(false);
                setFavoriteRecordId(null);
                setRating(0);
              }
            }catch(err){
              console.error('Error al obtener el favorito:', err);
            }    
        }
      
        obtenerFavorito();
    }, [user, id]);

    useEffect(() => {        
        const fetchPelicula = async () => {
            try {
                setLoading(true);
                const response = await restServicePagina.obtenerPeliculaDetalle(Number(id));

                if (response && !response.success) {
                    setPelicula(response);
                }

                const genreNames = response.genres?.slice(0, 2).map((g: { id: number; name: string }) => g.id).join(', ');
                const response2 = await restServicePagina.obtenerPeliculasPorCategoria(genreNames);

                if (response2 && response2.results) {
                    const filtradas = response2.results.filter(
                        (s: IPelicula) => s.id !== Number(id)
                    );
                    setPeliculasParecidas(filtradas);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error al cargar la película:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchPelicula();
        }
    }, [id]);

    async function agregarMiLista() {
        if (!user) {
          router.push('/componentes/login');
          return;
        }
    
        if (!pelicula || typeof pelicula.id !== 'number') {
          console.warn('No hay una película destacada seleccionada para agregar.');
          return;
        }
    
        try {
          const respuesta = await restServicePagina.agregarPeliculaLista(user.id, pelicula.id, 0);
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

    const handleOpenModal = () => {
        if (!user) {
            router.push('/componentes/login');
            return;
        }
        // si ya tiene calificación, rating ya está establecido; simplemente abrir modal para editar
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setHoverRating(0);
        // no resetear rating para que la puntuación existente se mantenga hasta cancelar
    };

    const handleSubmitRating = async () => {
        if (!user) {
            router.push('/componentes/login');
            return;
        }

        if (rating === 0) {
            alert('Por favor selecciona una calificación');
            return;
        }

        try {
            const resp = await restServicePagina.agregarCalificacionPelicula(user.id, pelicula!.id, 0, rating);
            if (resp.ok) {
                alert(`Has calificado esta película con ${rating} estrellas`);
                setIsFavorited(true);
                if (resp.data) {
                  const data = Array.isArray(resp.data) ? resp.data[0] : resp.data;
                  if (data?.id) setFavoriteRecordId(data.id);
                }
                handleCloseModal();
            } else {
                alert(resp.message ?? 'Error al guardar la calificación');
            }
        } catch (error) {
            console.error('Error al guardar la calificación:', error);
        }
    };

    const handleDeleteFavorite = async () => {
        if (!user) {
          router.push('/componentes/login');
          return;
        }
        try {
          const resp = await restServicePagina.borrarSerieFavorito(user.id, pelicula!.id, 0);
          if (resp.ok) {
            alert('Favorito eliminado');
            setIsFavorited(false);
            setFavoriteRecordId(null);
            setRating(0);
            handleCloseModal();
          } else {
            alert(resp.message ?? 'Error al eliminar favorito');
          }
        } catch (err) {
          console.error('Error al borrar favorito:', err);
        }
    };

    const handleStarClick = (starIndex: number, isHalf: boolean) => {
        const value = isHalf ? starIndex - 0.5 : starIndex;
        setRating(value);
    };

    const handleStarHover = (starIndex: number, isHalf: boolean) => {
        const value = isHalf ? starIndex - 0.5 : starIndex;
        setHoverRating(value);
    };

    if (loading) {
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
                    <Box className="mb-4">
                        <Skeleton variant="text" width={200} height={50} animation="wave" />
                    </Box>
                    <div className="row g-4">
                        <div className="col-lg-5">
                            <Skeleton variant="rectangular" height={600} animation="wave" className="rounded-4" />
                        </div>
                        <div className="col-lg-7">
                            <Skeleton variant="text" width="80%" height={60} animation="wave" className="mb-3" />
                            <Skeleton variant="text" width="40%" height={30} animation="wave" className="mb-4" />
                            <Skeleton variant="rectangular" height={200} animation="wave" className="rounded-4 mb-4" />
                            <Skeleton variant="rectangular" height={60} animation="wave" className="rounded-pill" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!pelicula) {
        return (
            <div
                className="min-vh-100 d-flex align-items-center justify-content-center"
                style={{
                    background: "linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div className="text-center">
                    <div className="alert alert-dark border-secondary text-white shadow-lg" style={{ maxWidth: '500px' }}>
                        <i className="bi bi-exclamation-triangle-fill fs-1 text-warning mb-3 d-block"></i>
                        <h4>Película no encontrada</h4>
                        <p className="mb-4">No pudimos encontrar la información de esta película.</p>
                        <button
                            className="btn btn-outline-light rounded-pill px-5"
                            onClick={() => router.back()}
                        >
                            <i className="bi bi-arrow-left me-2"></i>Volver
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-vh-100"
            style={{
                background: "linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%)",
                backdropFilter: "blur(20px)",
                marginTop: "6vh",
            }}
        >
            {/* Hero Section con imagen de fondo */}
            <div
                className="position-relative"
                style={{
                    height: '50vh',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${pelicula.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className="position-absolute w-100 h-100"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.9) 80%, #0d0d0d 100%)',
                    }}
                ></div>

                <div className="container position-relative h-100">
                    <button
                        className="btn btn-dark rounded-pill px-4 py-2 shadow-lg mt-4"
                        onClick={() => router.back()}
                        style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                        <i className="bi bi-arrow-left me-2"></i>Volver
                    </button>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="container" style={{ marginTop: '-15vh' }}>
                <div className="row g-4">
                    {/* Poster */}
                    <div className="col-lg-4">
                        <div className="card bg-dark border-0 rounded-4 shadow-lg overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                                alt={pelicula.title}
                                className="card-img-top"
                                style={{ height: '600px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Información */}
                    <div className="col-lg-8">
                        <div className="text-white">
                            {/* Badge de tipo */}
                            <span className="badge bg-danger rounded-pill px-3 py-2 mb-3">
                                <i className="bi bi-film me-2"></i>
                                Película
                            </span>

                            <h1 className="display-4 fw-bold mb-3">{pelicula.title}</h1>

                            <div className="d-flex align-items-center gap-4 mb-4 flex-wrap">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-calendar3 me-2 text-warning"></i>
                                    <span className="fs-5">{pelicula.release_date}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-star-fill me-2 text-warning"></i>
                                    <span className="fs-5 fw-bold">{pelicula.vote_average}</span>
                                </div>
                                {pelicula.runtime && (
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-clock me-2 text-warning"></i>
                                        <span className="fs-5">{pelicula.runtime} min</span>
                                    </div>
                                )}
                            </div>

                            {/* Géneros */}
                            {pelicula.genres && pelicula.genres.length > 0 && (
                                <div className="mb-4">
                                    <div className="d-flex gap-2 flex-wrap">
                                        {pelicula.genres.map((genre) => (
                                            <span key={genre.id} className="badge bg-secondary rounded-pill px-3 py-2">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Botones de acción */}
                            <div className="d-flex gap-3 mb-5 flex-wrap">  
                                <button className="btn btn-light btn-lg rounded-pill px-5 shadow-lg" onClick={agregarMiLista}>
                                    <i className="bi bi-plus-lg me-2"></i>Mi Lista
                                </button>
                                <button 
                                    className={`btn ${isFavorited ? 'btn-warning' : 'btn-outline-light'} btn-lg rounded-circle shadow`} 
                                    style={{ width: '60px', height: '60px' }}
                                    onClick={handleOpenModal}
                                >
                                    <i className={`bi ${isFavorited ? 'bi-heart-fill' : 'bi-heart'} fs-5`}></i>
                                </button>                                
                            </div>

                            {/* Descripción */}
                            <div className="card bg-dark border-0 rounded-4 shadow-lg p-4 mb-4">
                                <h4 className="text-warning d-block fw-semibold">
                                    <i className="bi bi-info-circle me-2 text-warning"></i>
                                    Sinopsis
                                </h4>
                                <p className="lead text-light">
                                    {pelicula.overview || 'No hay descripción disponible para esta película.'}
                                </p>
                            </div>

                            {/* Información adicional */}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="card bg-dark border-0 rounded-4 shadow p-4">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-warning rounded-circle p-3 me-3">
                                                <i className="bi bi-film fs-4 text-dark"></i>
                                            </div>
                                            <div>
                                                <small className="text-warning d-block fw-semibold">Tipo</small>
                                                <h5 className="mb-0 text-light fw-bold">Película</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card bg-dark border-0 rounded-4 shadow p-4">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-warning rounded-circle p-3 me-3">
                                                <i className="bi bi-calendar-check fs-4 text-dark"></i>
                                            </div>
                                            <div>
                                                <small className="text-warning d-block fw-semibold">Estreno</small>
                                                <h5 className="mb-0 text-light fw-bold">{pelicula.release_date}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Películas similares */}
                <div className="mt-5 pb-5">
                    <h3 className="text-white fw-bold mb-4">
                        <i className="bi bi-collection-play me-2"></i>
                        Peliculas Similares
                    </h3>

                    {peliculasParecidas && peliculasParecidas.length > 0 ? (
                        <div className="row g-4">
                            {peliculasParecidas.slice(1, 7).map((pelis) => (
                                <div
                                    key={pelis.id}
                                    className="col-6 col-md-4 col-lg-2"
                                    style={{ minWidth: '200px' }}
                                    onClick={() => router.push(`/componentes/individualPeli/${pelis.id}`)}
                                >
                                    <div
                                        className="card bg-dark border-0 rounded-4 shadow-lg overflow-hidden h-100"
                                        style={{
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`}
                                            alt={pelis.title}
                                            className="card-img-top"
                                            style={{
                                                height: '250px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <div className="card-body text-white p-3">
                                            <h6 className="fw-bold text-truncate mb-2">{pelis.title}</h6>
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-star-fill text-warning me-2"></i>
                                                <span>{pelis.vote_average}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-white opacity-50 py-5">
                            <i className="bi bi-tv fs-1 mb-3 d-block"></i>
                            <p>No se encontraron peliculas similares.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Calificación */}
            {showModal && (
                <div 
                    className="modal fade show d-block" 
                    tabIndex={-1} 
                    style={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        paddingTop: '5vh'
                    }}
                    onClick={handleCloseModal}
                >
                    <div 
                        className="modal-dialog"
                        style={{ margin: '0 auto' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content bg-dark text-white border-0 rounded-4 shadow-lg">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title">
                                    <i className="bi bi-heart-fill text-danger me-2"></i>
                                    {isFavorited ? 'Modificar calificación' : 'Califica esta película'}
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white" 
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body text-center py-5">
                                <h4 className="mb-4">{pelicula.title}</h4>
                                <p className="text-muted mb-4">¿Qué te pareció esta película?</p>
                                
                                {/* Estrellas con medias estrellas */}
                                <div className="d-flex justify-content-center gap-1 mb-4">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
                                        const currentRating = hoverRating || rating;
                                        const isFull = star <= currentRating;
                                        const isHalf = star - 0.5 === currentRating;
                                        
                                        return (
                                            <div 
                                                key={star} 
                                                style={{ 
                                                    position: 'relative', 
                                                    display: 'inline-block',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseLeave={() => setHoverRating(0)}
                                            >
                                                <i
                                                    className={`bi ${isFull || isHalf ? 'bi-star-fill' : 'bi-star'} fs-3`}
                                                    style={{
                                                        color: isFull || isHalf ? '#ffc107' : '#6c757d',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                ></i>
                                                
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '50%',
                                                        height: '100%',
                                                        zIndex: 2
                                                    }}
                                                    onClick={() => handleStarClick(star, true)}
                                                    onMouseEnter={() => handleStarHover(star, true)}
                                                ></div>
                                                
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 0,
                                                        width: '50%',
                                                        height: '100%',
                                                        zIndex: 2
                                                    }}
                                                    onClick={() => handleStarClick(star, false)}
                                                    onMouseEnter={() => handleStarHover(star, false)}
                                                ></div>

                                                {isHalf && (
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '50%',
                                                            height: '100%',
                                                            overflow: 'hidden',
                                                            zIndex: 1
                                                        }}
                                                    >
                                                        <i
                                                            className="bi bi-star-fill fs-3"
                                                            style={{
                                                                color: '#ffc107',
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0
                                                            }}
                                                        ></i>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {rating > 0 && (
                                    <div className="alert alert-warning rounded-pill">
                                        <strong>{rating}</strong> {rating === 1 ? 'estrella' : 'estrellas'}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer border-secondary">
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary rounded-pill px-4"
                                    onClick={handleCloseModal}
                                >
                                    Cancelar
                                </button>
                                {isFavorited && (
                                    <button 
                                        type="button" 
                                        className="btn btn-danger rounded-pill px-4 me-auto"
                                        onClick={handleDeleteFavorite}
                                    >
                                        <i className="bi bi-trash me-2"></i>Eliminar
                                    </button>
                                )}
                                <button 
                                    type="button" 
                                    className="btn btn-warning rounded-pill px-4"
                                    onClick={handleSubmitRating}
                                    disabled={rating === 0}
                                >
                                    <i className="bi bi-check-lg me-2"></i>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}