import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router';

function NavigationBar() {
  return (
    <Navbar
      expand="lg"
      className="shalom-navbar py-3"
      sticky="top"
    >
      <Container>
        {/* Placeholder Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="shalom-brand d-flex align-items-center gap-2"
        >
          <span className="brand-mark" aria-hidden="true">
            S
          </span>

          <span className="brand-name">
            Shalom
            <span>Technologies</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navigation"
          aria-label="Toggle navigation"
        />

        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link
              as={NavLink}
              to="/"
              end
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/work"
            >
              Work
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/about"
            >
              About
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/services"
            >
              Services
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/contact"
            >
              Contact
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/contact"
              className="nav-cta ms-lg-3"
            >
              Start a project
              <span className="nav-cta-arrow" aria-hidden="true">
                →
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;