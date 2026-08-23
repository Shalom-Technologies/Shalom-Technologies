import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router';

import useReveal from '../hooks/useReveal';

function Reveal({ children, className = '', delay = '' }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${delay} ${
        visible ? 'is-visible' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

function AnimatedCounter({ number, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!visible || hasAnimated.current) return;

    hasAnimated.current = true;

    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      start = Math.floor(number * eased);

      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [visible, number]);

  return (
    <div ref={ref} className="about-stat">
      <strong>
        {count}
        {suffix}
      </strong>

      <span>
        {number === 10
          ? 'Projects & experiments'
          : number === 3
          ? 'Core disciplines'
          : 'Digital-first approach'}
      </span>
    </div>
  );
}

function About() {
  return (
    <main className="about-page">

      {/* =========================================
          HERO
          ========================================= */}

      <section className="about-hero">
        <div className="about-hero-orbit orbit-one" />
        <div className="about-hero-orbit orbit-two" />
        <div className="about-hero-orbit orbit-three" />

        <Container>
          <div className="about-hero-content">

            <Reveal>
              <div className="section-eyebrow">
                <span className="eyebrow-line" />
                About Shalom Technologies
              </div>
            </Reveal>

            <Reveal delay="reveal-delay-1">
              <h1>
                We build digital
                <span>experiences with purpose.</span>
              </h1>
            </Reveal>

            <Reveal delay="reveal-delay-2">
              <p>
                Shalom Technologies is a digital studio focused
                on creating thoughtful websites, products, and
                digital experiences for ambitious businesses.
              </p>
            </Reveal>

          </div>
        </Container>

        <div className="about-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </section>


      {/* =========================================
          INTRO
          ========================================= */}

      <section className="about-introduction">
        <Container>
          <Row>
            <Col
              lg={{ span: 9, offset: 1 }}
            >
              <Reveal>
                <p className="about-large-statement">
                  Technology should feel human.
                  <span>
                    Beautiful when you see it.
                    Simple when you use it.
                    Powerful when it matters.
                  </span>
                </p>
              </Reveal>
            </Col>
          </Row>
        </Container>
      </section>


      {/* =========================================
          STORY
          ========================================= */}

      <section className="about-story">
        <Container>
          <Row className="align-items-center g-5">

            <Col lg={6}>
              <Reveal>
                <div className="about-visual">

                  <div className="about-visual-grid" />

                  <div className="about-symbol">
                    S
                  </div>

                  <div className="about-floating-card card-one">
                    <span>01</span>
                    Strategy
                  </div>

                  <div className="about-floating-card card-two">
                    <span>02</span>
                    Design
                  </div>

                  <div className="about-floating-card card-three">
                    <span>03</span>
                    Technology
                  </div>

                </div>
              </Reveal>
            </Col>

            <Col lg={5} className="offset-lg-1">

              <Reveal delay="reveal-delay-1">

                <div className="section-eyebrow">
                  <span className="eyebrow-line" />
                  Our story
                </div>

                <h2 className="about-section-title">
                  African perspective.
                  <span>Global ambition.</span>
                </h2>

                <p>
                  Shalom Technologies exists at the intersection
                  of creativity, technology, and business.
                </p>

                <p>
                  We believe Africa has an extraordinary
                  opportunity to shape the future of digital
                  experiences. Our approach combines local
                  perspective with modern technology and
                  globally minded design.
                </p>

                <p>
                  Whether we're building a company website,
                  digital product, or e-commerce experience,
                  our goal is the same:
                  <strong> make technology meaningful.</strong>
                </p>

              </Reveal>

            </Col>

          </Row>
        </Container>
      </section>


      {/* =========================================
          VALUES
          ========================================= */}

      <section className="about-values">

        <Container>

          <Reveal>
            <div className="about-section-heading">

              <div className="section-eyebrow">
                <span className="eyebrow-line" />
                What guides us
              </div>

              <h2>
                Principles over
                <span>trends.</span>
              </h2>

            </div>
          </Reveal>

          <div className="values-grid">

            <Reveal>
              <article className="value-card">

                <span className="value-number">
                  01
                </span>

                <h3>
                  Purpose
                </h3>

                <p>
                  Every design decision should serve a reason.
                  We don't add complexity simply because we can.
                </p>

              </article>
            </Reveal>


            <Reveal delay="reveal-delay-1">
              <article className="value-card">

                <span className="value-number">
                  02
                </span>

                <h3>
                  Craft
                </h3>

                <p>
                  Details matter. From typography and spacing
                  to performance and accessibility, we care
                  about the complete experience.
                </p>

              </article>
            </Reveal>


            <Reveal delay="reveal-delay-2">
              <article className="value-card">

                <span className="value-number">
                  03
                </span>

                <h3>
                  Partnership
                </h3>

                <p>
                  We don't want to simply deliver a website.
                  We want to understand your business and help
                  it move forward.
                </p>

              </article>
            </Reveal>

          </div>

        </Container>

      </section>


      {/* =========================================
          CAPABILITIES
          ========================================= */}

      <section className="about-capabilities">

        <Container>

          <Row>

            <Col lg={4}>

              <Reveal>

                <div className="section-eyebrow">
                  <span className="eyebrow-line" />
                  Capabilities
                </div>

                <h2 className="about-section-title">
                  What we
                  <span>bring to the table.</span>
                </h2>

              </Reveal>

            </Col>

            <Col lg={{ span: 7, offset: 1 }}>

              <div className="capabilities-list">

                {[
                  'Web Development',
                  'UI / UX Design',
                  'Brand Experiences',
                  'E-commerce',
                  'Digital Strategy',
                  'Frontend Engineering',
                ].map((item, index) => (

                  <Reveal
                    key={item}
                    delay={
                      index % 2 === 0
                        ? 'reveal-delay-1'
                        : 'reveal-delay-2'
                    }
                  >

                    <div className="capability-item">

                      <span>
                        0{index + 1}
                      </span>

                      <h3>
                        {item}
                      </h3>

                      <span className="capability-arrow">
                        ↗
                      </span>

                    </div>

                  </Reveal>

                ))}

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =========================================
          STATS
          ========================================= */}

      <section className="about-stats">

        <Container>

          <div className="stats-grid">

            <AnimatedCounter
              number={10}
              suffix="+"
            />

            <AnimatedCounter
              number={3}
            />

            <AnimatedCounter
              number={100}
              suffix="%"
            />

          </div>

        </Container>

      </section>


      {/* =========================================
          MANIFESTO
          ========================================= */}

      <section className="about-manifesto">

        <div className="manifesto-decoration">
          <div />
          <div />
          <div />
        </div>

        <Container>

          <Reveal>

            <div className="manifesto-content">

              <span>
                Our philosophy
              </span>

              <h2>
                Build boldly.
                <br />
                Design thoughtfully.
                <br />
                <em>Leave an impact.</em>
              </h2>

            </div>

          </Reveal>

        </Container>

      </section>


      {/* =========================================
          CTA
          ========================================= */}

      <section className="about-cta">

        <Container>

          <Reveal>

            <div className="about-cta-inner">

              <div>

                <span>
                  Have an idea?
                </span>

                <h2>
                  Let's make
                  <em>it real.</em>
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

          </Reveal>

        </Container>

      </section>

    </main>
  );
}

export default About;