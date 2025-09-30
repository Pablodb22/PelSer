'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Navbar, Nav, Container, NavDropdown, Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand className="text-danger fw-bold fs-3">PELSER</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={isActive("/")}>Inicio</Nav.Link>
            </Link>
            <Link href="/componentes/peliculas" passHref legacyBehavior>
              <Nav.Link active={isActive("/componentes/peliculas")}>Películas</Nav.Link>
            </Link>
            <Link href="/componentes/series" passHref legacyBehavior>
              <Nav.Link active={isActive("/componentes/series")}>Series</Nav.Link>
            </Link>
            <Link href="/componentes/milista" passHref legacyBehavior>
              <Nav.Link active={isActive("/componentes/milista")}>Mi Lista</Nav.Link>
            </Link>
          </Nav>

          <div className="d-flex align-items-center">
            {/* Dropdown de notificaciones */}
            <NavDropdown
              title={
                <span className="position-relative">
                  <i className="bi bi-bell fs-5 text-white"></i>
                  <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                    3
                  </Badge>
                </span>
              }
              align="end"
              menuVariant="dark"
            >
              <NavDropdown.Header>Notificaciones</NavDropdown.Header>
              <NavDropdown.Item>🎬 Nueva película agregada</NavDropdown.Item>
              <NavDropdown.Item>📺 Nueva serie disponible</NavDropdown.Item>
              <NavDropdown.Item>❤️ Tu lista tiene 12 elementos</NavDropdown.Item>
            </NavDropdown>

            {/* Perfil */}
            <Link href="/componentes/configuracion" passHref legacyBehavior>
              <Button variant="link" className="text-white m-0 p-0 ms-2">
                <i className="bi bi-person-circle fs-5"></i>
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
