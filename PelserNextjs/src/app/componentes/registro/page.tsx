'use client'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import { useState } from 'react'
import * as restServiceCliente from '../../servicios/cliente';
import Script from 'next/script';
import bcrypt from 'bcryptjs';

export default function RegistroPage (){

    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        nombre_usuario: '',
        correo: '',
        contrasena: '',
        fecha_creacion: new Date().toISOString()
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        // Encripta la contraseña aquí, justo antes de enviar
        const usuario = {
          ...formData,
          contrasena: bcrypt.hashSync(formData.contrasena, 10)
        }
        const respuesta = await restServiceCliente.registrarUsario(usuario)
        if (respuesta.ok) {
          alert('Usuario registrado correctamente ✅')
          window.location.href = '/componentes/login';
        } else {
          alert('Error al registrar el usuario ❌')
          console.error('Error en la respuesta del servidor:', respuesta.error);
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      }
    }


     return (
        <form onSubmit={handleSubmit}>
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
                    background: 'radial-gradient(circle at 30% 20%, rgba(220, 53, 69, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)',
                    zIndex: 1
                }}
            ></div>

            <div 
                className="p-5 rounded-4 shadow-lg position-relative "
                style={{
                    background: 'rgba(13, 13, 13, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    width: '100%',
                    maxWidth: '500px',
                    zIndex: 2,
                    marginTop: '100px',
                    marginBottom: '40px'


                }}
            >
                <div className="text-center mb-5">
                    <div className="mb-3">
                        <span className="badge bg-danger rounded-pill px-4 py-2 fs-6 fw-bold">
                            <i className="bi bi-star-fill me-2"></i>ÚNETE AHORA
                        </span>
                    </div>
                    <h1 className="text-white fw-black display-4 mb-2">Crear Cuenta</h1>
                    <p className="text-light opacity-75 fs-5">Completa tus datos</p>
                </div>

                <div>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label fw-bold text-white mb-2">
                            <i className="bi bi-person-fill me-2 text-warning"></i>
                            Nombre
                        </label>
                        <input 
                            type="text" 
                            className="form-control text-white border-0 py-3 rounded-3" 
                            name="nombre"                           
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="apellidos" className="form-label fw-bold text-white mb-2">
                            <i className="bi bi-person-fill me-2 text-warning"></i>
                            Apellidos
                        </label>
                        <input 
                            type="text" 
                            className="form-control text-white border-0 py-3 rounded-3" 
                            name="apellidos"                            
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nombre_usuario" className="form-label fw-bold text-white mb-2">
                            <i className="bi bi-at me-2 text-warning"></i>
                            Nombre de Usuario
                        </label>
                        <input 
                            type="text" 
                            className="form-control text-white border-0 py-3 rounded-3" 
                            name="nombre_usuario" 
                          
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label fw-bold text-white mb-2">
                            <i className="bi bi-envelope-fill me-2 text-warning"></i>
                            Correo Electrónico
                        </label>
                        <input 
                            type="email" 
                            className="form-control text-white border-0 py-3 rounded-3" 
                            name="correo" 
                           
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contrasena" className="form-label fw-bold text-white mb-2">
                            <i className="bi bi-lock-fill me-2 text-warning"></i>
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            className="form-control text-white border-0 py-3 rounded-3" 
                            name="contrasena" 
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="d-grid mb-4">
                        <button 
                            type="submit" 
                            className="btn btn-warning fw-bold py-3 rounded-pill shadow-lg"
                            style={{
                                fontSize: '1.1rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 193, 7, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <i className="bi bi-person-plus-fill me-2"></i>
                            Crear Cuenta
                        </button>
                    </div>
                </div>

                {/* Divider */}
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
                        ¿Ya tienes una cuenta? <Link href="/componentes/login" className="text-warning fw-bold text-decoration-none">Inicia sesión aquí</Link>
                    </p>
                </div>
            </div>
           <Script  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"  strategy="lazyOnload"></Script>
        </div>
    </form>
    );
};