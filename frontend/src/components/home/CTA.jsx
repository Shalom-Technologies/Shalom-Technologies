import Container from 'react-bootstrap/Container';
import { Link } from 'react-router';

function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-pattern" aria-hidden="true" />

      <Container>
        <div className="cta-content">
          <div className="section-eyebrow cta-eyebrow">
            <span className="eyebrow-line" />
            Let's work together
          </div>

          <h2>
            Have an idea?
            <span>Let's build it.</span>
          </h2>

          <p>
            Tell us what you're working on and let's explore
            what's possible.
          </p>

          <Link to="/contact" className="cta-button">
            Start a conversation
            <span>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default CTA;