import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We understand your business, audience, goals, and what success looks like.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'We shape the visual direction and user experience around your brand.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'We turn the approved designs into a fast, responsive, high-quality digital product.',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'We test, refine, optimize, and help you confidently take your product live.',
  },
];

function Process() {
  return (
    <section className="home-section process-section">
      <Container>
        <Row className="mb-5">
          <Col lg={7}>
            <div className="section-eyebrow">
              <span className="eyebrow-line" />
              Our process
            </div>

            <h2 className="section-title">
              From idea
              <span>to impact.</span>
            </h2>
          </Col>
        </Row>

        <Row className="g-0 process-grid">
          {steps.map((step) => (
            <Col md={6} lg={3} key={step.number}>
              <div className="process-step">
                <div className="process-number">
                  {step.number}
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Process;