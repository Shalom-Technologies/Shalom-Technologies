import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router';

function AboutPreview() {
  return (
    <section className="home-section about-preview-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={5}>
            <div className="about-visual">
              <div className="about-pattern">
                <div className="about-pattern-inner">
                  <span>ST</span>
                </div>
              </div>

              <div className="about-location">
                Nairobi, Kenya
              </div>
            </div>
          </Col>

          <Col lg={{ span: 6, offset: 1 }}>
            <div className="section-eyebrow">
              <span className="eyebrow-line" />
              About Shalom
            </div>

            <h2 className="section-title">
              African roots.
              <span>Global perspective.</span>
            </h2>

            <p className="about-lead">
              Shalom Technologies is a digital studio focused on
              creating thoughtful, high-quality digital experiences
              for businesses ready to move forward.
            </p>

            <p className="about-body">
              We believe great technology should feel human.
              That's why we bring together strategy, design, and
              development to create digital products that are
              useful, beautiful, and built to last.
            </p>

            <Link to="/about" className="text-link">
              More about us
              <span>→</span>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AboutPreview;