"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import * as restServiceCliente from '../../servicios/cliente';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function PerfilPage() {
  const [user, setUser] = useState<any>(null);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");  
  const [correo, setCorreo] = useState<string>("");
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [contrasenaActual, setContrasenaActual] = useState<string>("");
  const [nuevaContrasena, setNuevaContrasena] = useState<string>("");
  const [confirmarContrasena, setConfirmarContrasena] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Solo acceder a localStorage después del montaje en el cliente
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("usuario");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    
    generateAvatars();
  }, []);

  useEffect(() => {
    if (user) {
      setCorreo(user.correo || "");
      setNombreUsuario(user.nombre_usuario || "");
    }
  }, [user]);

  const generateAvatars = () => {
    const styles = [
      "adventurer",
      "avataaars",
      "bottts",
      "fun-emoji",
      "lorelei",
      "pixel-art",
    ];
    const generatedAvatars = styles.map((style) => {
      const seed = Math.random().toString(36).substring(7);
      return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
    });
    setAvatars(generatedAvatars);
    setSelectedAvatar("");
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleSaveAvatar = async () => {
    if (selectedAvatar && user && typeof window !== 'undefined') {
      try {
        const result = await restServiceCliente.actualizarAvatarUsuario(user.id, selectedAvatar);
        
        if (result.ok) {         
          const updatedUser = { ...user, avatar_url: selectedAvatar };
          localStorage.setItem("usuario", JSON.stringify(updatedUser));
          setUser(updatedUser);                                        
          alert("Avatar actualizado correctamente");
        } else {
          throw new Error("Error al actualizar el avatar");
        }
      } catch (error) {
        console.error("Error al actualizar el avatar:", error);
        alert("Error al actualizar el avatar. Por favor, intenta de nuevo.");
      }
    }
  };

  const handleGuardarCambios = async () => {
    if (!user || typeof window === 'undefined') return;
    
    const result = await restServiceCliente.configurarUsuario(user.id, correo, nombreUsuario);
    if (result.ok) {
      const updatedUser = { ...user, correo, nombre_usuario: nombreUsuario };
      localStorage.setItem("usuario", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Datos actualizados correctamente");
    } else {
      alert("Error al actualizar los datos");
    }
  };

  const handleCambiarContrasena = async () => {
    if (!user) return;
    if (!nuevaContrasena || nuevaContrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const result = await restServiceCliente.cambiarContrasena(user.id, nuevaContrasena);
    if (result.ok) {
      alert("Contraseña cambiada correctamente");
      setContrasenaActual("");
      setNuevaContrasena("");
      setConfirmarContrasena("");
    } else {
      alert("Error al cambiar la contraseña");
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("usuario");
      window.location.href = "/";
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || typeof window === 'undefined') return;
    
    const data = await restServiceCliente.borrarCuenta(user.id);
    if (data.ok) {
      localStorage.removeItem("usuario");
      window.location.href = "/";
    } else {
      alert("Error al eliminar la cuenta");
    }
  };

  // Mostrar un loading mientras el componente se monta en el cliente
  if (!mounted) {
    return (
      <div
        className="bg-dark text-white d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%)",
          minHeight: "100vh",
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando perfil...</p>
        </div>
      </div>
    );
  }

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
                  <i className="bi bi-image text-danger me-2"></i>Foto de
                  Perfil
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
                        src={user?.avatar_url || "https://via.placeholder.com/120"}
                        alt="Avatar"
                        className="rounded-circle"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <button
                      className="btn btn-danger btn-sm rounded-circle position-absolute bottom-0 end-0 shadow"
                      style={{ width: "35px", height: "35px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#avatarModal"
                      onClick={generateAvatars}
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
                  <i className="bi bi-person-fill text-danger me-2"></i>
                  Información Personal
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
                        value={
                          user
                            ? `${user.nombre} ${user.apellidos}`
                            : "Cargando..."
                        }
                        readOnly
                      />                      
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-light">
                      <i className="bi bi-envelope me-2"></i>Correo
                      Electrónico
                    </label>
                    <div className="input-group">
                      <input
                        name="correo"
                        type="email"
                        className="form-control bg-secondary text-white border-0"
                        value={correo}
                        onChange={e => setCorreo(e.target.value)}
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
                        name="nombre_usuario"
                        type="text"
                        className="form-control bg-secondary text-white border-0"
                        value={nombreUsuario}
                        onChange={e => setNombreUsuario(e.target.value)}
                      />
                      <button className="btn btn-outline-light" type="button">
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-light">
                      <i className="bi bi-calendar-check me-2"></i>Miembro
                      desde
                    </label>
                    <input
                      type="text"
                      className="form-control bg-secondary text-white border-0"
                      value={
                        user
                          ? new Date(user.fecha_creacion).toLocaleDateString(
                              "es-ES",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "Cargando..."
                      }
                      readOnly
                    />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="btn btn-success rounded-pill px-4 me-2" onClick={handleGuardarCambios}>
                    <i className="bi bi-check-circle me-2"></i>Guardar Cambios
                  </button>                 
                </div>
              </div>
            </div>

            {/* Seguridad */}
            <div className="card bg-dark border-secondary rounded-4 shadow-lg mb-4">
              <div className="card-header bg-transparent border-bottom border-secondary p-4">
                <h4 className="fw-bold mb-0">
                  <i className="bi bi-shield-lock text-danger me-2"></i>
                  Seguridad
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
                        value={contrasenaActual}
                        onChange={e => setContrasenaActual(e.target.value)}
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
                        value={nuevaContrasena}
                        onChange={e => setNuevaContrasena(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold text-light">
                      <i className="bi bi-shield-check me-2"></i>Confirmar
                      Nueva Contraseña
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control bg-secondary text-white border-0"
                        placeholder="Confirma tu nueva contraseña"
                        value={confirmarContrasena}
                        onChange={e => setConfirmarContrasena(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="btn btn-warning rounded-pill px-4" onClick={handleCambiarContrasena}>
                    <i className="bi bi-shield-check me-2"></i>Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>

            {/* Acciones de Cuenta */}
            <div className="card bg-dark border-secondary rounded-4 shadow-lg mb-4">
              <div className="card-header bg-transparent border-bottom border-secondary p-4">
                <h4 className="fw-bold mb-0">
                  <i className="bi bi-box-arrow-right text-danger me-2"></i>
                  Acciones de Cuenta
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  <button
                    className="btn btn-danger btn-lg rounded-pill px-4"
                    data-bs-toggle="modal"
                    data-bs-target="#logoutModal"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>Cerrar
                    Sesión
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

      {/* Modal de Avatares */}
      <div
        className="modal fade"
        id="avatarModal"
        tabIndex={-1}
        aria-labelledby="avatarModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-dark border-secondary">
            <div className="modal-header border-bottom border-secondary">
              <h5
                className="modal-title fw-bold text-white"
                id="avatarModalLabel"
              >
                <i className="bi bi-image text-danger me-2"></i>Selecciona tu
                Avatar
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <p className="text-light opacity-75 text-center mb-4">
                Elige uno de estos avatares generados aleatoriamente
              </p>
              <div className="row g-3">
                {avatars.map((avatar, index) => (
                  <div key={index} className="col-4 col-md-4">
                    <div
                      className={`position-relative ${
                        selectedAvatar === avatar
                          ? "border border-danger border-3"
                          : "border border-secondary"
                      } rounded-3 p-2 bg-secondary`}
                      style={{
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => handleAvatarSelect(avatar)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <img
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="w-100 rounded-3"
                        style={{ aspectRatio: "1/1", objectFit: "cover" }}
                      />
                      {selectedAvatar === avatar && (
                        <div
                          className="position-absolute top-0 end-0 bg-danger rounded-circle m-2"
                          style={{ width: "30px", height: "30px" }}
                        >
                          <i className="bi bi-check-circle-fill text-white d-flex align-items-center justify-content-center h-100"></i>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-light rounded-pill px-4 me-2"
                  onClick={generateAvatars}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>Generar Nuevos
                </button>
              </div>
            </div>
            <div className="modal-footer border-top border-secondary">
              <button
                type="button"
                className="btn btn-outline-light rounded-pill px-4"
                data-bs-dismiss="modal"
              >
                <i className="bi bi-x-circle me-2"></i>Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-pill px-4"
                onClick={handleSaveAvatar}
                disabled={!selectedAvatar}
              >
                <i className="bi bi-check-circle me-2"></i>Guardar Avatar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Cerrar Sesión */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex={-1}
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark border-secondary">
            <div className="modal-header border-bottom border-secondary">
              <h5
                className="modal-title fw-bold text-white"
                id="logoutModalLabel"
              >
                <i className="bi bi-box-arrow-right text-danger me-2"></i>
                Cerrar Sesión
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <p className="text-light text-center mb-0">
                ¿Estás seguro de que deseas cerrar sesión?
              </p>
            </div>
            <div className="modal-footer border-top border-secondary">
              <button
                type="button"
                className="btn btn-outline-light rounded-pill px-4"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-pill px-4"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Eliminar Cuenta */}
      <div
        className="modal fade"
        id="deleteAccountModal"
        tabIndex={-1}
        aria-labelledby="deleteAccountModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark border-secondary">
            <div className="modal-header border-bottom border-secondary">
              <h5
                className="modal-title fw-bold text-white"
                id="deleteAccountModalLabel"
              >
                <i className="bi bi-trash text-danger me-2"></i>Eliminar Cuenta
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <p className="text-light text-center mb-3">
                ¿Estás seguro de que deseas eliminar tu cuenta?
              </p>
              <p className="text-danger text-center fw-bold mb-0">
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="modal-footer border-top border-secondary">
              <button
                type="button"
                className="btn btn-outline-light rounded-pill px-4"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-pill px-4"
                onClick={handleDeleteAccount}
              >
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}