import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="shalom-footer">
      <Container>
        {/* Main Footer */}
        <Row className="gy-5 pb-5">
          {/* Brand */}
          <Col lg={5}>
            <Link
              to="/"
              className="footer-brand d-inline-flex align-items-center gap-2"
            >
              <span className="brand-mark footer-brand-mark">
                S
              </span>

              <span className="brand-name">
                Shalom
                <span>Technologies</span>
              </span>
            </Link>

            <p className="footer-description mt-4 mb-0">
              We design and build modern digital experiences
              that help ambitious businesses grow, connect,
              and stand out.
            </p>

            <div className="footer-location mt-4">
              <span className="location-dot" />
              Nairobi, Kenya · Working globally
            </div>
          </Col>

          {/* Explore */}
          <Col xs={6} lg={2} className="offset-lg-1">
            <h2 className="footer-heading">
              Explore
            </h2>

            <ul className="footer-links list-unstyled mb-0">
              <li>
                <Link to="/work">Work</Link>
              </li>

              <li>
                <Link to="/services">Services</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/careers">Careers</Link>
              </li>
            </ul>
          </Col>

          {/* Company */}
          <Col xs={6} lg={2}>
            <h2 className="footer-heading">
              Company
            </h2>

            <ul className="footer-links list-unstyled mb-0">
              <li>
                <Link to="/contact">Contact</Link>
              </li>

              <li>
                <Link to="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link to="/cookies">
                  Cookies
                </Link>
              </li>
            </ul>
          </Col>

          {/* Connect */}
          <Col lg={2}>
            <h2 className="footer-heading">
              Connect
            </h2>

            <ul className="footer-links list-unstyled mb-0">
              <li>
                <a
                  href="mailto:hello@shalomtechnologies.com"
                >
                  Email
                </a>
              </li>

              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <div className="footer-bottom pt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <p className="mb-0">
              © {currentYear} Shalom Technologies.
              All rights reserved.
            </p>

            <p className="mb-0 footer-tagline">
              Built with purpose. Designed for impact.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;