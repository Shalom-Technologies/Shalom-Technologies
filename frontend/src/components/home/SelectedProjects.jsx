import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router';

const projects = [
  {
    number: '01',
    title: 'Nuru Finance',
    category: 'Fintech · Web Application',
    description:
      'A modern financial platform designed to make personal finance easier to understand.',
  },
  {
    number: '02',
    title: 'Kijiji Collective',
    category: 'E-commerce · Brand Experience',
    description:
      'A digital storefront celebrating contemporary African design and independent makers.',
  },
  {
    number: '03',
    title: 'Amani Health',
    category: 'Healthcare · Digital Product',
    description:
      'A simple, accessible platform connecting patients with better healthcare experiences.',
  },
];

function SelectedProjects() {
  return (
    <section className="home-section projects-section">
      <Container>
        <Row className="align-items-end mb-5">
          <Col lg={7}>
            <div className="section-eyebrow">
              <span className="eyebrow-line" />
              Selected work
            </div>

            <h2 className="section-title">
              Ideas brought
              <span>to life.</span>
            </h2>
          </Col>

          <Col lg={4} className="ms-auto">
            <p className="section-intro">
              A selection of digital experiences we've designed
              and built.
            </p>
          </Col>
        </Row>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Link
              to="/work"
              className={`project-card project-card-${index + 1}`}
              key={project.number}
            >
              <div className="project-image">
                <div className="project-image-pattern">
                  <span>{project.number}</span>
                </div>

                <div className="project-overlay">
                  View project <span>↗</span>
                </div>
              </div>

              <div className="project-meta">
                <div>
                  <span className="project-number">
                    {project.number}
                  </span>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>
                </div>

                <span className="project-category">
                  {project.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="projects-footer">
          <span>
            More projects, more stories, more possibilities.
          </span>

          <Link to="/work" className="text-link">
            See all projects
            <span>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default SelectedProjects;