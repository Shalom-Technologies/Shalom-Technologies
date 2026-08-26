import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router';

import projects from '../data/projects';

function ProjectCaseStudy() {
  const { slug } = useParams();

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    return (
      <main className="case-study-not-found">
        <Container>
          <h1>Project not found.</h1>

          <Link to="/work" className="text-link">
            Back to work
            <span>→</span>
          </Link>
        </Container>
      </main>
    );
  }

  return (
    <main className="case-study">
      {/* Hero */}
      <section className="case-study-hero">
        <Container>
          <Link
            to="/work"
            className="case-study-back"
          >
            ← Back to work
          </Link>

          <div className="case-study-heading">
            <div className="section-eyebrow">
              <span className="eyebrow-line" />
              {project.category}
            </div>

            <h1>
              {project.title}
              <span>{project.type}</span>
            </h1>

            <p>{project.description}</p>
          </div>

          <div
            className={`case-study-cover ${project.colorClass}`}
          >
            <div className="case-study-cover-letter">
              {project.title.charAt(0)}
            </div>

            <div className="case-study-cover-label">
              {project.client}
            </div>
          </div>
        </Container>
      </section>

      {/* Project information */}
      <section className="case-study-info">
        <Container>
          <Row className="g-5">
            <Col lg={3}>
              <div className="case-study-meta">
                <span>Client</span>
                <strong>{project.client}</strong>
              </div>

              <div className="case-study-meta">
                <span>Year</span>
                <strong>{project.year}</strong>
              </div>
            </Col>

            <Col lg={3}>
              <div className="case-study-meta">
                <span>Services</span>

                <div className="case-study-services">
                  {project.services.map((service) => (
                    <strong key={service}>
                      {service}
                    </strong>
                  ))}
                </div>
              </div>
            </Col>

            <Col lg={{ span: 5, offset: 1 }}>
              <div className="case-study-meta">
                <span>Overview</span>

                <p>
                  {project.description}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Challenge */}
      <section className="case-study-content">
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }}>
              <div className="case-study-section">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" />
                  The challenge
                </div>

                <h2>
                  Understanding the problem.
                </h2>

                <p>
                  {project.challenge}
                </p>
              </div>

              {/* Placeholder image */}
              <div
                className={`case-study-image ${project.colorClass}`}
              >
                <span>Project Visual</span>
              </div>

              <div className="case-study-section">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" />
                  The solution
                </div>

                <h2>
                  Designing a better experience.
                </h2>

                <p>
                  {project.solution}
                </p>
              </div>

              <div className="case-study-image case-study-image-secondary">
                <span>Interface Preview</span>
              </div>

              <div className="case-study-section">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" />
                  The outcome
                </div>

                <h2>
                  Designed for what comes next.
                </h2>

                <p>
                  {project.outcome}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="case-study-testimonial">
          <Container>
            <div className="case-study-quote">
              <span className="testimonial-mark">
                “
              </span>

              <blockquote>
                {project.testimonial.quote}
              </blockquote>

              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {project.testimonial.name.charAt(0)}
                </div>

                <div>
                  <strong>
                    {project.testimonial.name}
                  </strong>

                  <span>
                    {project.testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="case-study-next">
        <Container>
          <div className="case-study-next-inner">
            <div>
              <span>Have a project in mind?</span>

              <h2>
                Let's build something
                <em>meaningful.</em>
              </h2>
            </div>

            <Link
              to="/contact"
              className="cta-button"
            >
              Start a conversation
              <span>→</span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default ProjectCaseStudy;