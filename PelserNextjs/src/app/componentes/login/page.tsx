'use client'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import Script from 'next/script';

export default function LoginPage (){
     return (
        <div 
            className="position-relative d-flex align-items-center justify-content-center min-vh-100"
            style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
                overflow: 'hidden'
            }}
        >
            {/* Animated background overlay */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: 'radial-gradient(circle at 30% 20%, rgba(220, 53, 69, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)',
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
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
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
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-end mb-4">
                        <Link href="#" className="text-warning text-decoration-none">
                            <small>¿Olvidaste tu contraseña?</small>
                        </Link>
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
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Iniciar Sesión
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
                        ¿No tienes una cuenta? <Link href="/componentes/registro" className="text-warning fw-bold text-decoration-none">Regístrate aquí</Link>
                    </p>
                </div>
            </div>
            <Script  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"  strategy="lazyOnload"></Script>
        </div>
    );
};