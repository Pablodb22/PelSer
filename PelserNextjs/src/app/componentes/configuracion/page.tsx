"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import * as restServiceCliente from "../../servicios/cliente";

export default function PerfilPage() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


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
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-2">
              <i className="bi bi-person-circle text-danger me-3"></i>Mi Perfil
            </h1>
            <p className="lead text-light opacity-75">
              Gestiona tu cuenta y configuraciones
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            {/* Avatar */}
            <div className="card bg-dark border-secondary rounded-4 shadow-lg mb-4">
              <div className="card-header bg-transparent border-bottom border-secondary p-4">
                <h4 className="fw-bold mb-0">
                  <i className="bi bi-image text-danger me-2"></i>Foto de Perfil
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="text-center">
                  <div className="position-relative d-inline-block mb-4">
                    <div
                      className="rounded-circle bg-secondary d-flex align-items-center justify-content-center position-relative overflow-hidden"
                      style={{ width: "120px", height: "120px" }}
                    >
                      <img
                        src="https://via.placeholder.com/120x120/dc3545/ffffff?text=JD"
                        alt="Avatar"
                        className="rounded-circle"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <button
                      className="btn btn-danger btn-sm rounded-circle position-absolute bottom-0 end-0 shadow"
                      style={{ width: "35px", height: "35px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#avatarModal"
                    >
                      <i className="bi bi-camera-fill"></i>
                    </button>
                  </div>
                  <p className="text-light opacity-75 mb-0">
                    Haz clic en el icono de cámara para cambiar tu foto
                  </p>
                </div>
              </div>
            </div>

            {/* Información Personal */}
            <div className="card bg-dark border-secondary rounded-4 shadow-lg mb-4">
              <div className="card-header bg-transparent border-bottom border-secondary p-4">
                <h4 className="fw-bold mb-0">
                  <i className="bi bi-person-fill text-danger me-2"></i>Información Personal
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-light">
                      <i className="bi bi-person me-2"></i>Nombre Completo
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-secondary text-white border-0"
                        value={user ? `${user.nombre} ${user.apellidos}` : 'Cargando...'}
                        readOnly
                      />
                      <button className="btn btn-outline-light" type="button">
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-light">
                      <i className="bi bi-envelope me-2"></i>Correo Electrónico
                    </label>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control bg-secondary text-white border-0"
                        value={user ? `${user.correo}` : 'Cargando...'}
                        readOnly
                      />
                      <button className="btn btn-outline-light" type="button">
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-light">
                      <i className="bi bi-at me-2"></i>Nombre de Usuario
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-secondary text-white border-0"
                        value={user ? `${user.nombre_usuario}` : 'Cargando...'}
                        readOnly
                      />
                      <button className="btn btn-outline-light" type="button">
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-light">
                      <i className="bi bi-calendar-check me-2"></i>Miembro desde
                    </label>
                    <input
                      type="text"
                      className="form-control bg-secondary text-white border-0"
                      value={
                        user
                          ? new Date(user.fecha_creacion).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })
                          : 'Cargando...'
                      }

                      readOnly
                    />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="btn btn-success rounded-pill px-4 me-2">
                    <i className="bi bi-check-circle me-2"></i>Guardar Cambios
                  </button>
                  <button className="btn btn-outline-light rounded-pill px-4">
                    <i className="bi bi-x-circle me-2"></i>Cancelar
                  </button>
                </div>
              </div>
            </div>

            {/* Seguridad */}
            <div className="card bg-dark border-secondary rounded-4 shadow-lg mb-4">
              <div className="card-header bg-transparent border-bottom border-secondary p-4">
                <h4 className="fw-bold mb-0">
                  <i className="bi bi-shield-lock text-danger me-2"></i>Seguridad
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-light">
                      <i className="bi bi-lock me-2"></i>Contraseña Actual
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control bg-secondary text-white border-0"
                        placeholder="Ingresa tu contraseña actual"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-light">
                      <i className="bi bi-key me-2"></i>Nueva Contraseña
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control bg-secondary text-white border-0"
                        placeholder="Ingresa tu nueva contraseña"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold text-light">
                      <i className="bi bi-shield-check me-2"></i>Confirmar Nueva Contraseña
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control bg-secondary text-white border-0"
                        placeholder="Confirma tu nueva contraseña"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="btn btn-warning rounded-pill px-4">
                    <i className="bi bi-shield-check me-2"></i>Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>


            <div className="card bg-dark border-secondary rounded-4 shadow-lg mb-4">
              <div className="card-header bg-transparent border-bottom border-secondary p-4">
                <h4 className="fw-bold mb-0">
                  <i className="bi bi-box-arrow-right text-danger me-2"></i>Acciones de Cuenta
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  <button
                    className="btn btn-danger btn-lg rounded-pill px-4"
                    data-bs-toggle="modal"
                    data-bs-target="#logoutModal"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                  </button>
                  <button
                    className="btn btn-outline-danger btn-lg rounded-pill px-4"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteAccountModal"
                  >
                    <i className="bi bi-trash me-2"></i>Eliminar Cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
