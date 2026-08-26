import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const testimonials = [
  {
    quote:
      'Shalom transformed our vision into a digital experience that finally felt like our brand.',
    name: 'Client Name',
    role: 'Founder, Company',
  },
  {
    quote:
      'Thoughtful, collaborative, and incredibly detail-oriented from start to finish.',
    name: 'Client Name',
    role: 'Director, Company',
  },
];

function Testimonials() {
  return (
    <section className="home-section testimonials-section">
      <Container>
        <Row>
          <Col lg={7}>
            <div className="section-eyebrow">
              <span className="eyebrow-line" />
              Client stories
            </div>

            <h2 className="section-title">
              Good work
              <span>speaks for itself.</span>
            </h2>
          </Col>
        </Row>

        <Row className="g-4 mt-3">
          {testimonials.map((testimonial, index) => (
            <Col lg={6} key={index}>
              <article className="testimonial-card">
                <div className="testimonial-mark">
                  “
                </div>

                <blockquote>
                  {testimonial.quote}
                </blockquote>

                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Testimonials;