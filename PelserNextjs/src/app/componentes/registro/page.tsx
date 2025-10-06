'use client'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import Script from 'next/script'; // ✅ Import Script
import * as restServiceCliente from '../../servicios/cliente';

export default function RegistroPage() {

    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        nombre_usuario: '',
        correo: '',
        contrasena: '',
        fecha_creacion: new Date().toISOString()
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await restServiceCliente.registrarUsario(formData);
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

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
                    className="p-5 rounded-4 shadow-lg position-relative"
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
                    {/* ...contenido del formulario permanece igual... */}
                    <div className="text-center">
                        <p className="text-light opacity-75 mb-0">
                            ¿Ya tienes una cuenta? <Link href="/componentes/login" className="text-warning fw-bold text-decoration-none">Inicia sesión aquí</Link>
                        </p>
                    </div>
                </div>

                {/* ✅ Script cargado asíncronamente */}
                <Script 
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                    strategy="lazyOnload"
                />
            </div>
        </form>
    );
};
