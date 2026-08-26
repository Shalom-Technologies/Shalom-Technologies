import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import styles from './Home.module.css';

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shalom Technologies',
  description:
    'Shalom Technologies helps East African businesses go from an idea to a live website in days, not months.',
  url: 'https://www.shalomtechnologies.com',
  areaServed: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia'],
};

const steps = [
  {
    number: '01',
    title: 'Describe your business',
    body: 'Tell us what you do, who your customers are, and what you want your site to achieve. Two minutes, plain language, no jargon required.',
  },
  {
    number: '02',
    title: 'Review your draft',
    body: 'We generate a working preview instantly. Ask for changes — colors, layout, wording — and see them applied in real time, up to five rounds.',
  },
  {
    number: '03',
    title: 'We build it for real',
    body: 'Once you approve the draft, our team takes it from there and builds, tests, and launches your real, production-ready site.',
  },
];

function HomePage() {
  return (
    <>
      <Seo
        title="Websites for East African Businesses, Built Fast"
        description="Shalom Technologies turns your business description into a live, professional website — drafted instantly, refined with your feedback, and built for real by our team."
        path="/"
        structuredData={organizationStructuredData}
      />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo} aria-label="Shalom Technologies home">
            Shalom Technologies
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
            Get started
          </Link>
        </div>
      </header>

      <main id="main-content">
        {/* ---------------------------------------------------------- Hero */}
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Built for East African businesses</p>
            <h1 id="hero-heading" className={styles.heroHeading}>
              Describe your business. Get a real website.
            </h1>
            <p className={styles.heroSubhead}>
              No agencies to chase, no templates to wrestle with. Tell us about your
              business, review a live draft, and our team builds the finished site —
              usually within days.
            </p>
            <div className={styles.heroActions}>
              <Link to="/describe" className={styles.primaryButton}>
                Describe your site
              </Link>
              <a href="#how-it-works" className={styles.secondaryButton}>
                See how it works
              </a>
            </div>
          </div>

          <div
            className={styles.heroVisual}
            role="img"
            aria-label="A rough sketch of a website transforming into a finished, colorful website design"
          >
            <div className={styles.sketchCard} aria-hidden="true">
              <span className={styles.sketchLine} />
              <span className={styles.sketchLine} />
              <span className={styles.sketchBlock} />
              <span className={styles.sketchLine} />
            </div>
            <span className={styles.heroArrow} aria-hidden="true">
              →
            </span>
            <div className={styles.finishedCard} aria-hidden="true">
              <span className={styles.finishedBar} />
              <span className={styles.finishedHeading} />
              <span className={styles.finishedBlock} />
              <span className={styles.finishedButton} />
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- How it works */}
        <section
          id="how-it-works"
          className={styles.section}
          aria-labelledby="how-it-works-heading"
        >
          <h2 id="how-it-works-heading" className={styles.sectionHeading}>
            From description to live site, in three steps
          </h2>

          <ol className={styles.stepsList}>
            {steps.map((step) => (
              <li key={step.number} className={styles.stepCard}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {step.number}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
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
          <h2 id="why-shalom-heading" className={styles.sectionHeading}>
            Built with the East African market in mind
          </h2>

          <div className={styles.reasonsGrid}>
            <div className={styles.reasonCard}>
              <h3>Real people finish the job</h3>
              <p>
                Your draft is reviewed and built out by an actual development team —
                not left as an unfinished AI mockup you have to fix yourself.
              </p>
            </div>
            <div className={styles.reasonCard}>
              <h3>Priced for growing businesses</h3>
              <p>
                Transparent pricing designed for small businesses and SMEs across
                Kenya, Uganda, Tanzania, Rwanda, and beyond — no hidden agency markups.
              </p>
            </div>
            <div className={styles.reasonCard}>
              <h3>Fast, without cutting corners</h3>
              <p>
                Most projects go from first draft to a live, working website in days —
                so you can start reaching customers sooner.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- Closing CTA */}
        <section className={styles.ctaSection} aria-labelledby="cta-heading">
          <h2 id="cta-heading" className={styles.ctaHeading}>
            Ready to see what your site could look like?
          </h2>
          <p className={styles.ctaSubhead}>
            It takes two minutes to describe your business. There&apos;s no cost to
            see your first draft.
          </p>
          <Link to="/describe" className={styles.primaryButton}>
            Start now — it&apos;s free to preview
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerLogo}>Shalom Technologies</p>
            <p className={styles.footerTagline}>
              Websites for East African businesses, built fast.
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
            </ul>
          </nav>
        </div>
        <p className={styles.footerCopyright}>
          &copy; {new Date().getFullYear()} Shalom Technologies. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default HomePage;