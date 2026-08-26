import Container from 'react-bootstrap/Container';

function WorkHero() {
  return (
    <section className="work-hero">
      <Container>
        <div className="section-eyebrow">
          <span className="eyebrow-line" />
          Selected work
        </div>

        <h1 className="work-title">
          Ideas we've
          <span>brought to life.</span>
        </h1>

        <p className="work-intro">
          A selection of digital experiences, websites, and
          products we've designed and built for ambitious
          businesses.
        </p>
      </Container>
    </section>
  );
}

export default WorkHero;