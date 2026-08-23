import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-pattern" aria-hidden="true" />

      <Container>
        <Row className="align-items-center min-vh-75">
          <Col lg={8} xl={7}>
            <div className="hero-content">
              <div className="section-eyebrow">
                <span className="eyebrow-line" />
                Shalom Technologies
              </div>

              <h1 className="hero-title">
                Digital experiences
                <span>built for impact.</span>
              </h1>

              <p className="hero-description">
                We design and build modern websites and digital
                products that help ambitious businesses connect,
                grow, and stand out.
              </p>

              <div className="hero-actions">
                <Button
                  as={Link}
                  to="/contact"
                  className="shalom-btn shalom-btn-primary"
                >
                  Start a project
                  <span>→</span>
                </Button>

                <Button
                  as={Link}
                  to="/work"
                  className="shalom-btn shalom-btn-link"
                >
                  Explore our work
                  <span>↗</span>
                </Button>
              </div>
            </div>
          </Col>

          <Col lg={4} xl={{ span: 4, offset: 1 }}>
            <div className="hero-visual">
              <div className="hero-visual-frame">
                <div className="hero-visual-top">
                  <span>SELECTED WORK</span>
                  <span>01 / 04</span>
                </div>

                <div className="hero-project-placeholder">
                  <span className="hero-project-symbol">S</span>

                  <div className="hero-project-label">
                    <span>Digital</span>
                    <strong>Transformation</strong>
                  </div>
                </div>

                <div className="hero-visual-bottom">
                  <span>Design</span>
                  <span>Development</span>
                  <span>Strategy</span>
                </div>
              </div>

              <div className="hero-accent-shape" />
            </div>
          </Col>
        </Row>

        <div className="hero-scroll">
          <span className="hero-scroll-line" />
          Scroll to explore
        </div>
      </Container>
    </section>
  );
}

export default Hero;