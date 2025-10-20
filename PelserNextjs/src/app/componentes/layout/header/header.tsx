'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Navbar, Nav, Container, NavDropdown, Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import * as restServicePagina from '../../../servicios/pagina';
import { ISerie } from '@/app/interfaces/ISeries';
import { IPelicula } from '@/app/interfaces/IPeliculas';

export default function Header() {

  const [usuarioLocal, setUsuarioLocal] = useState<string | null>(null);
  
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    setUsuarioLocal(usuario);
  }, []);


  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand className="text-danger fw-bold fs-3">PELSER</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/" >
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} href="/componentes/peliculas" >
              Películas
            </Nav.Link>
            <Nav.Link as={Link} href="/componentes/series" >
              Series
            </Nav.Link>
            <Nav.Link as={Link} href="/componentes/milista">
              Mi Lista
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center">
            {/* Dropdown de notificaciones */}
            {usuarioLocal ? (
              <Button
                href="/componentes/configuracion"
                variant="link"
                className="text-white m-0 p-0 ms-2"
              >
                <i className="bi bi-person-circle fs-5"></i>
              </Button>
            ) : (
              <Button
                href="/componentes/login"
                variant="link"
                className="text-white m-0 p-0 ms-2"
              >
                <i className="bi bi-person-circle fs-5"></i>
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
