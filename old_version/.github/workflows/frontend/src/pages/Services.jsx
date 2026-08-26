import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router';

const serviceCategories = [
  {
    number: '01',
    title: 'Digital Experiences',
    description:
      'High-performance websites and digital storefronts designed to make your business stand out.',
    services: [
      {
        number: '01',
        title: 'Custom Business Websites',
        description:
          'Strategic, beautifully designed websites built around your business goals.',
        price: 'From KES 75,000',
        features: [
          'Custom UI/UX',
          'React development',
          'Responsive design',
          'SEO foundation',
          'Analytics',
          'Contact forms',
          'Deployment',
          'Post-launch support',
        ],
      },
      {
        number: '02',
        title: 'Landing Pages',
        description:
          'Conversion-focused landing experiences designed to turn attention into action.',
        price: 'From KES 35,000',
        features: [
          'Conversion-focused design',
          'Responsive development',
          'Lead capture',
          'Analytics',
          'SEO foundation',
          'Fast deployment',
        ],
      },
      {
        number: '03',
        title: 'E-commerce Development',
        description:
          'Modern online stores designed to make selling products simple and scalable.',
        price: 'From KES 120,000',
        features: [
          'Product catalogue',
          'Shopping cart',
          'Checkout',
          'M-Pesa integration',
          'Payment gateways',
          'Order management',
          'Analytics',
        ],
      },
      {
        number: '04',
        title: 'Website Redesign',
        description:
          'Transform an outdated website into a modern, fast and conversion-focused digital experience.',
        price: 'From KES 60,000',
        features: [
          'UX audit',
          'Visual redesign',
          'Mobile optimization',
          'Performance improvements',
          'SEO improvements',
          'Modern frontend',
        ],
      },
    ],
  },
  {
    number: '02',
    title: 'Digital Products',
    description:
      'Custom software and interfaces that turn complex business ideas into useful digital products.',
    services: [
      {
        number: '05',
        title: 'Web Applications',
        description:
          'Custom digital products, platforms and internal tools built around your workflows.',
        price: 'From KES 200,000',
        features: [
          'Custom architecture',
          'React development',
          'Dashboards',
          'Authentication',
          'Database integration',
          'API integration',
          'Deployment',
        ],
      },
      {
        number: '06',
        title: 'UI / UX Design',
        description:
          'Thoughtful interfaces that make digital products intuitive, useful and enjoyable.',
        price: 'From KES 50,000',
        features: [
          'User flows',
          'Wireframes',
          'High-fidelity designs',
          'Design systems',
          'Responsive layouts',
          'Interactive prototypes',
        ],
      },
      {
        number: '07',
        title: 'API & Integrations',
        description:
          'Connect your website or application to the tools and services your business already uses.',
        price: 'From KES 25,000',
        features: [
          'M-Pesa / Daraja',
          'Payment gateways',
          'CRM integrations',
          'Google APIs',
          'Maps',
          'Email platforms',
          'Custom APIs',
        ],
      },
    ],
  },
  {
    number: '03',
    title: 'Growth & Partnership',
    description:
      'Ongoing digital support that keeps your website performing, improving and working for your business.',
    services: [
      {
        number: '08',
        title: 'SEO & Performance',
        description:
          'Be found, load faster and create a better experience for the people who discover you.',
        price: 'From KES 20,000 / month',
        features: [
          'Technical SEO',
          'Core Web Vitals',
          'Google Search Console',
          'Analytics',
          'Local SEO',
          'Performance monitoring',
          'Ongoing optimization',
        ],
      },
      {
        number: '09',
        title: 'Maintenance & Support',
        description:
          'Keep your digital presence secure, updated and continuously improving after launch.',
        price: 'From KES 10,000 / month',
        features: [
          'Updates',
          'Backups',
          'Security monitoring',
          'Content changes',
          'Performance monitoring',
          'Priority support',
        ],
      },
      {
        number: '10',
        title: 'Digital Strategy',
        description:
          'Get clarity on what to build, why to build it and how your digital presence should grow.',
        price: 'From KES 15,000 / session',
        features: [
          'Business goals',
          'Audience research',
          'Digital audit',
          'Competitor analysis',
          'Technology recommendations',
          'Project roadmap',
        ],
      },
    ],
  },
];

function Services() {
  return (
    <main className="services-page">

      {/* =========================================
          HERO
          ========================================= */}

      <section className="services-hero">

        <div className="services-hero-pattern">
          <span />
          <span />
          <span />
        </div>

        <Container>
          <div className="services-hero-content">

            <div className="section-eyebrow">
              <span className="eyebrow-line" />
              What we do
            </div>

            <h1>
              Digital work
              <span>with purpose.</span>
            </h1>

            <p>
              From ambitious websites to custom digital products,
              we help businesses turn ideas into meaningful
              digital experiences.
            </p>

          </div>
        </Container>

      </section>


      {/* =========================================
          INTRO
          ========================================= */}

      <section className="services-introduction">

        <Container>

          <Row>

            <Col
              lg={{ span: 9, offset: 1 }}
            >

              <p className="services-statement">
                We combine
                <span>strategy, design and technology</span>
                to create digital experiences that look
                exceptional and work hard for your business.
              </p>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =========================================
          SERVICES
          ========================================= */}

      <section className="services-list">

        <Container>

          {serviceCategories.map((category) => (

            <div
              className="service-category"
              key={category.number}
            >

              {/* Category heading */}

              <div className="service-category-heading">

                <div className="service-category-number">
                  {category.number}
                </div>

                <div>

                  <h2>
                    {category.title}
                  </h2>

                  <p>
                    {category.description}
                  </p>

                </div>

              </div>


              {/* Service cards */}

              <div className="services-grid">

                {category.services.map((service) => (

                  <article
                    className="service-card"
                    key={service.number}
                  >

                    <div className="service-card-top">

                      <span className="service-number">
                        {service.number}
                      </span>

                      <span className="service-arrow">
                        ↗
                      </span>

                    </div>

                    <h3>
                      {service.title}
                    </h3>

                    <p className="service-description">
                      {service.description}
                    </p>

                    <div className="service-price">
                      {service.price}
                    </div>

                    <div className="service-features">

                      {service.features.map((feature) => (

                        <span key={feature}>
                          <span className="feature-check">
                            ✓
                          </span>

                          {feature}
                        </span>

                      ))}

                    </div>

                    <Link
                      to="/contact"
                      className="service-link"
                    >
                      Discuss this service
                      <span>→</span>
                    </Link>

                  </article>

                ))}

              </div>

            </div>

          ))}

        </Container>

      </section>


      {/* =========================================
          CUSTOM PROJECT
          ========================================= */}

      <section className="services-custom">

        <div className="services-custom-decoration">
          <div />
          <div />
          <div />
        </div>

        <Container>

          <Row className="align-items-center">

            <Col lg={8}>

              <span className="services-custom-label">
                Something different?
              </span>

              <h2>
                Have a project
                <span>that doesn't fit a box?</span>
              </h2>

              <p>
                Every business is different. If you have a unique
                idea, complex requirement or something we've never
                built before, let's talk about it.
              </p>

            </Col>

            <Col
              lg={4}
              className="text-lg-end mt-4 mt-lg-0"
            >

              <Link
                to="/contact"
                className="services-custom-button"
              >
                Tell us about it
                <span>→</span>
              </Link>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =========================================
          PROCESS CTA
          ========================================= */}

      <section className="services-process">

        <Container>

          <div className="services-process-inner">

            <div>

              <span className="services-process-label">
                How we work
              </span>

              <h2>
                Good work starts
                <span>with a good process.</span>
              </h2>

            </div>

            <Link
              to="/#process"
              className="services-process-link"
            >
              Explore our process
              <span>→</span>
            </Link>

          </div>

        </Container>

      </section>

    </main>
  );
}

export default Services;