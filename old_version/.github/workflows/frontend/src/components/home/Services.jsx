import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router';

const services = [
  {
    number: '01',
    title: 'Web Design & Development',
    description:
      'Beautiful, responsive websites designed around your brand, audience, and business goals.',
  },
  {
    number: '02',
    title: 'Digital Products',
    description:
      'Thoughtful interfaces and web applications that turn complex ideas into simple experiences.',
  },
  {
    number: '03',
    title: 'Website Redesigns',
    description:
      'Modernize an outdated digital presence with a fresh visual identity and better user experience.',
  },
];

function Services() {
  return (
    <section className="home-section services-section">
      <Container>
        <Row className="mb-5 align-items-end">
          <Col lg={7}>
            <div className="section-eyebrow">
              <span className="eyebrow-line" />
              What we do
            </div>

            <h2 className="section-title">
              Digital solutions
              <span>with purpose.</span>
            </h2>
          </Col>

          <Col lg={4} className="ms-auto">
            <p className="section-intro">
              From first idea to final launch, we combine strategy,
              design, and technology to create digital experiences
              that matter.
            </p>
          </Col>
        </Row>

        <div className="services-list">
          {services.map((service) => (
            <div className="service-item" key={service.number}>
              <div className="service-number">
                {service.number}
              </div>

              <div className="service-content">
                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </div>

              <div className="service-arrow">↗</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Link to="/services" className="text-link">
            Explore all services
            <span>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default Services;