import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Shalom Technologies
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navigation" />

        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/work">
              Work
            </Nav.Link>

            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/services">
              Services
            </Nav.Link>

            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;