import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import styles from './Home.module.css';

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shalom Technologies',
  description:
    'Shalom Technologies helps East African businesses turn ideas into professional websites using AI.',
  url: 'https://www.shalomtechnologies.com',
  areaServed: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia'],
};

const steps = [
  {
    number: '01',
    label: 'You',
    title: 'Describe your business',
    body: 'Tell us what you do, who you serve, and what you want your website to achieve. Just use your own words.',
  },
  {
    number: '02',
    label: 'AI',
    title: 'Watch your idea take shape',
    body: 'Our AI turns your description into a polished website concept. Change the layout, colors, copy, or direction until it feels right.',
  },
  {
    number: '03',
    label: 'Shalom',
    title: 'We make it real',
    body: 'Once you are happy with the design, our team builds, tests, and launches your production-ready website.',
  },
];

const reasons = [
  {
    icon: '✦',
    title: 'Made for East Africa',
    body: 'We understand the businesses building Africa’s next chapter — from Nairobi startups to family businesses in Kampala, Dar es Salaam, Kigali and beyond.',
  },
  {
    icon: '◌',
    title: 'AI-powered, human-finished',
    body: 'AI gets you from blank page to a strong first design. Our developers take it the rest of the way.',
  },
  {
    icon: '↗',
    title: 'Built to help you grow',
    body: 'A professional website should do more than look good. It should make it easier for customers to discover, trust, and contact your business.',
  },
];

function HomePage() {
  return (
    <>
      <Seo
        title="AI Websites for East African Businesses"
        description="Describe your business and Shalom Technologies uses AI to create a professional website design. Refine it, approve it, and our team builds the real site."
        path="/"
        structuredData={organizationStructuredData}
      />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo} aria-label="Shalom Technologies home">
            <span className={styles.logoMark} aria-hidden="true">
              S
            </span>
            <span>Shalom</span>
          </Link>

          <nav aria-label="Primary">
            <ul className={styles.navList}>
              <li>
                <a href="#how-it-works">How it works</a>
              </li>
              <li>
                <a href="#why-shalom">Why Shalom</a>
              </li>
              <li>
                <Link to="/login">Log in</Link>
              </li>
            </ul>
          </nav>

          <Link to="/describe" className={styles.navCta}>
            Start building
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      <main id="main-content">
        {/* ---------------------------------------------------------- Hero */}
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroGlow} aria-hidden="true" />

          <div className={styles.heroText}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Built for East African businesses
            </div>

            <h1 id="hero-heading" className={styles.heroHeading}>
              Your idea.
              <br />
              <span className={styles.heroHeadingAccent}>A website.</span>
              <br />
              Made real.
            </h1>

            <p className={styles.heroSubhead}>
              Describe your business in plain language and watch AI turn your idea
              into a professional website design — then let our team build it for
              real.
            </p>

            <div className={styles.heroActions}>
              <Link to="/describe" className={styles.primaryButton}>
                Describe your website
                <span aria-hidden="true">→</span>
              </Link>

              <a href="#how-it-works" className={styles.secondaryButton}>
                See how it works
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className={styles.heroTrust}>
              <div className={styles.avatarStack} aria-hidden="true">
                <span>K</span>
                <span>U</span>
                <span>T</span>
                <span>R</span>
              </div>

              <p>
                <strong>Built for businesses across East Africa</strong>
                <span>Kenya · Uganda · Tanzania · Rwanda · Ethiopia</span>
              </p>
            </div>
          </div>

          <div
            className={styles.heroVisual}
            role="img"
            aria-label="An AI website generation interface showing a business description becoming a finished website"
          >
            <div className={`${styles.visualOrb} ${styles.orbOne}`} aria-hidden="true" />
            <div className={`${styles.visualOrb} ${styles.orbTwo}`} aria-hidden="true" />

            <div className={styles.aiWindow}>
              <div className={styles.windowTop}>
                <div className={styles.windowDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>

                <span className={styles.windowLabel}>
                  Shalom AI
                  <span className={styles.liveDot} />
                </span>
              </div>

              <div className={styles.aiPrompt}>
                <div className={styles.promptAvatar} aria-hidden="true">
                  Y
                </div>

                <div>
                  <span className={styles.promptLabel}>YOUR IDEA</span>
                  <p>
                    “I run a modern coffee shop in Nairobi. I want a warm,
                    welcoming website where people can see our menu and order
                    online.”
                  </p>
                </div>
              </div>

              <div className={styles.aiDivider}>
                <span>AI is designing</span>
                <span className={styles.loadingLine} />
              </div>

              <div className={styles.generatedSite}>
                <div className={styles.generatedNav}>
                  <strong>MAISHA COFFEE</strong>
                  <span>Menu</span>
                  <span>Our Story</span>
                  <span className={styles.miniNavButton}>Order</span>
                </div>

                <div className={styles.generatedHero}>
                  <div>
                    <small>COFFEE · COMMUNITY · NAIROBI</small>
                    <h3>Good coffee.<br />Good company.</h3>
                    <span className={styles.generatedCta}>
                      Explore our menu →
                    </span>
                  </div>

                  <div className={styles.coffeeShape} aria-hidden="true">
                    <div className={styles.coffeeCup} />
                    <div className={styles.coffeeSteam} />
                  </div>
                </div>

                <div className={styles.generatedCards}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className={styles.aiBadge}>
                <span>✦</span>
                Generated from your description
              </div>
            </div>

            <div className={styles.floatingCard}>
              <span className={styles.floatingIcon}>✓</span>
              <div>
                <strong>Design ready</strong>
                <span>Looks good? Let&apos;s build it.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- Marquee */}
        <div className={styles.marketStrip} aria-label="Countries we serve">
          <div className={styles.marketTrack}>
            <span>KENYA</span>
            <i>✦</i>
            <span>UGANDA</span>
            <i>✦</i>
            <span>TANZANIA</span>
            <i>✦</i>
            <span>RWANDA</span>
            <i>✦</i>
            <span>ETHIOPIA</span>
            <i>✦</i>
            <span>KENYA</span>
            <i>✦</i>
            <span>UGANDA</span>
            <i>✦</i>
            <span>TANZANIA</span>
            <i>✦</i>
            <span>RWANDA</span>
            <i>✦</i>
            <span>ETHIOPIA</span>
          </div>
        </div>

        {/* --------------------------------------------------- How it works */}
        <section
          id="how-it-works"
          className={styles.section}
          aria-labelledby="how-it-works-heading"
        >
          <div className={styles.sectionIntro}>
            <p className={styles.sectionEyebrow}>How it works</p>
            <h2 id="how-it-works-heading" className={styles.sectionHeading}>
              From a few words to
              <span> something real.</span>
            </h2>
            <p className={styles.sectionLead}>
              You don&apos;t need to know anything about web design. You just need
              to know your business.
            </p>
          </div>

          <ol className={styles.stepsList}>
            {steps.map((step) => (
              <li key={step.number} className={styles.stepCard}>
                <div className={styles.stepTop}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {step.number}
                  </span>
                  <span className={styles.stepLabel}>{step.label}</span>
                </div>

                <div className={styles.stepIcon} aria-hidden="true">
                  {step.number === '01' && '✎'}
                  {step.number === '02' && '✦'}
                  {step.number === '03' && '↗'}
                </div>

                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>

                <span className={styles.stepArrow} aria-hidden="true">
                  →
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------ Why Shalom */}
        <section
          id="why-shalom"
          className={styles.sectionAlt}
          aria-labelledby="why-shalom-heading"
        >
          <div className={styles.sectionAltInner}>
            <div className={styles.whyVisual} aria-hidden="true">
              <div className={styles.mapPattern}>
                <span className={`${styles.mapDot} ${styles.dotNairobi}`}>Nairobi</span>
                <span className={`${styles.mapDot} ${styles.dotKampala}`}>Kampala</span>
                <span className={`${styles.mapDot} ${styles.dotDar}`}>Dar</span>
                <span className={`${styles.mapDot} ${styles.dotKigali}`}>Kigali</span>
              </div>

              <div className={styles.locationBadge}>
                <span>●</span>
                East Africa
              </div>
            </div>

            <div className={styles.whyContent}>
              <p className={styles.sectionEyebrow}>Why Shalom</p>

              <h2 id="why-shalom-heading" className={styles.sectionHeading}>
                Global technology.
                <br />
                <span>Local understanding.</span>
              </h2>

              <p className={styles.whyLead}>
                Your business shouldn&apos;t have to look like it came from a
                template built for somewhere else.
              </p>

              <div className={styles.reasonsGrid}>
                {reasons.map((reason) => (
                  <div key={reason.title} className={styles.reasonCard}>
                    <span className={styles.reasonIcon} aria-hidden="true">
                      {reason.icon}
                    </span>

                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- Closing CTA */}
        <section className={styles.ctaSection} aria-labelledby="cta-heading">
          <div className={styles.ctaPattern} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <p className={styles.sectionEyebrow}>Your turn</p>

          <h2 id="cta-heading" className={styles.ctaHeading}>
            What will you build?
          </h2>

          <p className={styles.ctaSubhead}>
            Tell us about your business. See your first website concept for free.
          </p>

          <Link to="/describe" className={styles.primaryButton}>
            Start with your idea
            <span aria-hidden="true">→</span>
          </Link>

          <p className={styles.ctaNote}>
            No credit card · Takes about 2 minutes
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoMark} aria-hidden="true">
                S
              </span>
              <span>Shalom</span>
            </Link>

            <p className={styles.footerTagline}>
              Websites for East African businesses, built with AI and finished by
              humans.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className={styles.footerLinks}>
              <li>
                <a href="#how-it-works">How it works</a>
              </li>
              <li>
                <a href="#why-shalom">Why Shalom</a>
              </li>
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/describe">Start building</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.footerBottom}>
          <p>
            &copy; {new Date().getFullYear()} Shalom Technologies. All rights
            reserved.
          </p>
          <p>Built in East Africa ✦</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
