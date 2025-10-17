"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import * as restServicePagina from '../../servicios/pagina';
import { ILista } from '../../interfaces/ILista';
import { IPelicula } from '@/app/interfaces/IPeliculas';
import { ISerie } from '@/app/interfaces/ISeries';

export default function MiListaPage() {
  const [lista, setLista] = useState<ILista[]>([]);
  const [usuario, setUsuario] = useState<any>(null);
  const [peliculas, setPeliculas] = useState<IPelicula[]>([]);
  const [series, setSeries] = useState<ISerie[]>([]);
  const [conjunto, setConjunto] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<'todos' | 'peliculas' | 'series'>('todos'); 

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (!user) {
      window.location.href = '/componentes/login';
      return;
    }
    setUsuario(JSON.parse(user));
  }, []);

  useEffect(() => {
    async function buscarListaDatos() {
      try {
        if (!usuario) return;
        const respuesta = await restServicePagina.obtenerListaUsuario(usuario.id);
        setLista(respuesta);
      } catch (error) {
        console.error('Error al obtener la lista:', error);
      }
    }
    buscarListaDatos();
  }, [usuario]);

  useEffect(() => {
    async function buscarPeliculasYSeries() {
      try {
        setLoading(true);
        const peliculasTemp: IPelicula[] = [];
        const seriesTemp: ISerie[] = [];
        const conjuntoTemp: any[] = [];
        const added = new Set<string>();

        const promesas = lista.map(async (item) => {
          if (item.id_pelicula) {
            try {
              const pelicula = await restServicePagina.obtenerPeliculaDetalle(item.id_pelicula);
              if (pelicula && pelicula.id && !added.has(`pelicula-${pelicula.id}`)) {
                peliculasTemp.push(pelicula);
                conjuntoTemp.push({
                  type: 'pelicula',
                  id: pelicula.id,
                  listaId: item.id,
                  poster_path: pelicula.poster_path ?? pelicula.backdrop_path ?? '',
                  title: pelicula.title ?? pelicula.name ?? 'Sin título',
                  date: pelicula.release_date ?? pelicula.first_air_date ?? '',
                  vote_average: pelicula.vote_average ?? 0,
                  raw: pelicula
                });
                added.add(`pelicula-${pelicula.id}`);
              }
            } catch (error) {
              console.error(`Error al obtener película ${item.id_pelicula}:`, error);
            }
          }

          if (item.id_series) {
            try {
              const serie = await restServicePagina.obtenerSerieDetalle(item.id_series);
              if (serie && serie.id && !added.has(`serie-${serie.id}`)) {
                seriesTemp.push(serie);
                conjuntoTemp.push({
                  type: 'serie',
                  id: serie.id,
                  listaId: item.id,
                  poster_path: serie.backdrop_path ?? serie.poster_path ?? '',
                  title: serie.name ?? serie.title ?? 'Sin título',
                  date: serie.first_air_date ?? serie.release_date ?? '',
                  vote_average: serie.vote_average ?? 0,
                  raw: serie
                });
                added.add(`serie-${serie.id}`);
              }
            } catch (error) {
              console.error(`Error al obtener serie ${item.id_series}:`, error);
            }
          }
        });

        await Promise.all(promesas);

        setPeliculas(peliculasTemp);
        setSeries(seriesTemp);
        setConjunto(conjuntoTemp);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles:', error);
        setLoading(false);
      }
    }
    if (lista && lista.length > 0) buscarPeliculasYSeries();
    else {
      setPeliculas([]);
      setSeries([]);
      setConjunto([]);
      setLoading(false);
    }
  }, [lista]);

  async function borrarLista(listaId: number) {
    try {
      const respuesta = await restServicePagina.borrarListaUsuario(usuario.id, listaId);
      if (respuesta.ok) {
        setLista(prevLista => prevLista.filter(item => item.id !== listaId));
      }
    } catch (error) {
      console.error('Error al borrar de la lista:', error);
    }
  }
 
  const itemsFiltrados =
    filtro === 'todos'
      ? conjunto
      : filtro === 'peliculas'
      ? conjunto.filter((item) => item.type === 'pelicula')
      : conjunto.filter((item) => item.type === 'serie');

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
              <i className="bi bi-bookmark-heart-fill text-danger me-3"></i>Mi Lista
            </h1>
            <p className="lead text-light opacity-75">
              Tus películas y series favoritas guardadas
            </p>
            <div className="mt-4">
              <span className="badge bg-danger rounded-pill px-3 py-2 fs-6">
                <i className="bi bi-collection-fill me-2"></i>{lista.length} elementos guardados
              </span>
            </div>
          </div>
        </div>
        
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="d-flex gap-2 flex-wrap">
              <button
                className={`btn rounded-pill px-4 ${filtro === 'todos' ? 'btn-danger' : 'btn-outline-light'}`}
                onClick={() => setFiltro('todos')}
              >
                Todos
              </button>
              <button
                className={`btn rounded-pill px-4 ${filtro === 'peliculas' ? 'btn-danger' : 'btn-outline-light'}`}
                onClick={() => setFiltro('peliculas')}
              >
                Películas
              </button>
              <button
                className={`btn rounded-pill px-4 ${filtro === 'series' ? 'btn-danger' : 'btn-outline-light'}`}
                onClick={() => setFiltro('series')}
              >
                Series
              </button>
            </div>
          </div>
        </div>
      
        <div className="row g-4 mb-5">
          {loading
            ? Array.from({ length: lista.length || 8 }).map((_, i) => (
                <div key={i} className="col-lg-3 col-md-4 col-sm-6">
                  <Box className="card bg-dark border-0 rounded-4 shadow-lg overflow-hidden h-100">
                    <Skeleton variant="rectangular" height={320} animation="wave" />
                    <Box className="p-4">
                      <Skeleton variant="text" width="80%" height={28} animation="wave" />
                      <Skeleton variant="text" width="60%" height={20} animation="wave" />
                    </Box>
                  </Box>
                </div>
              ))
            : itemsFiltrados.length > 0 && itemsFiltrados.map((item) => (
                <div key={`${item.type}-${item.id}`} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card bg-dark text-white border-0 rounded-4 shadow-lg overflow-hidden h-100 position-relative">
                    <div className="position-relative">
                      <Link
                        href={
                          item.type === "pelicula"
                            ? `/componentes/individualPeli/${item.id}`
                            : `/componentes/individualSerie/${item.id}`
                        }
                        className="d-block"
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          className="card-img-top"
                          alt={item.title}
                          style={{ height: "320px", objectFit: "cover", cursor: "pointer" }}
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
                      </Link>

                      <div className="position-absolute top-0 start-0 m-3">
                        <button
                          className="btn btn-danger btn-sm rounded-circle"
                          onClick={() => borrarLista(item.listaId)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>

                      <div className="position-absolute top-0 end-0 m-3">
                        <span
                          className={`badge ${item.type === "pelicula" ? "bg-success" : "bg-info"}`}
                        >
                          {item.type === "pelicula" ? "PELÍCULA" : "SERIE"}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={item.type === 'pelicula' ? `/componentes/individualPeli/${item.id}` : `/componentes/individualSerie/${item.id}`}
                      className="card-body p-4 text-decoration-none text-white d-block"
                      style={{ cursor: 'pointer' }}
                    >
                      <h5 className="card-title fw-bold mb-3">{item.title}</h5>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
