'use client'

import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Link from 'next/link'
import Script from 'next/script'
import * as restServiceCliente from '../../servicios/cliente';
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setCargando(true)
    setMensaje(null)

    try {
      const res = await restServiceCliente.LoginUsario(correo, contrasena)
         
      if (res.ok) {
        setMensaje(`✅ Bienvenido, ${res.usuario.nombre_usuario}`)
        localStorage.setItem('usuario', JSON.stringify(res.usuario))
        router.push('/')
      } else {
        setMensaje(`❌ ${res.mensaje || 'Error al iniciar sesión'}`)
      }
    } catch (error) {
      setMensaje('⚠️ Error de conexión con el servidor')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div
      className="position-relative d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        overflow: 'hidden'
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(220, 53, 69, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)',
          zIndex: 1
        }}
      ></div>

      <div
        className="p-5 rounded-4 shadow-lg position-relative"
        style={{
          background: 'rgba(13, 13, 13, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '100%',
          maxWidth: '500px',
          zIndex: 2
        }}
      >
        <div className="text-center mb-5">
          <div className="mb-3">
            <span className="badge bg-danger rounded-pill px-4 py-2 fs-6 fw-bold">
              <i className="bi bi-star-fill me-2"></i>BIENVENIDO
            </span>
          </div>
          <h1 className="text-white fw-black display-4 mb-2">Iniciar Sesión</h1>
          <p className="text-light opacity-75 fs-5">Accede a tu cuenta</p>
        </div>

        <div>
          <div className="mb-4">
            <label htmlFor="loginEmail" className="form-label fw-bold text-white mb-2">
              <i className="bi bi-envelope-fill me-2 text-warning"></i>
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control text-white border-0 py-3 rounded-3"
              id="loginEmail"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="loginPassword" className="form-label fw-bold text-white mb-2">
              <i className="bi bi-lock-fill me-2 text-warning"></i>
              Contraseña
            </label>
            <input
              type="password"
              className="form-control text-white border-0 py-3 rounded-3"
              id="loginPassword"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div className="text-end mb-4">
            <Link href="#" className="text-warning text-decoration-none">
              <small>¿Olvidaste tu contraseña?</small>
            </Link>
          </div>

          <div className="d-grid mb-4">
            <button
              type="button"
              className="btn btn-warning fw-bold py-3 rounded-pill shadow-lg"
              style={{
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
              onClick={handleLogin}
              disabled={cargando}
            >
              {cargando ? 'Iniciando...' : <><i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión</>}
            </button>
          </div>

          {mensaje && (
            <div className="alert alert-dark border-warning text-center fw-bold py-2">
              {mensaje}
            </div>
          )}
        </div>

        <div className="position-relative my-4">
          <hr className="border-secondary opacity-25" />
          <span
            className="position-absolute top-50 start-50 translate-middle px-3 text-light opacity-75"
            style={{ background: 'rgba(13, 13, 13, 0.95)' }}
          >
            <small>o</small>
          </span>
        </div>

        <div className="text-center">
          <p className="text-light opacity-75 mb-0">
            ¿No tienes una cuenta?{' '}
            <Link href="/componentes/registro" className="text-warning fw-bold text-decoration-none">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
      ></Script>
    </div>
  )
}
