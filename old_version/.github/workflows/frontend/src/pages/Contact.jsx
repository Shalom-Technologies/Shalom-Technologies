import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    /*
      ============================================
      EMAILJS WILL GO HERE
      ============================================

      Later, replace this demo block with:

      import emailjs from '@emailjs/browser';

      emailjs.send(
        'YOUR_EMAILJS_SERVICE_ID',
        'YOUR_EMAILJS_TEMPLATE_ID',
        formData,
        'YOUR_EMAILJS_PUBLIC_KEY'
      );

      ============================================
    */

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    setIsSubmitting(false);
    setSubmitted(true);

    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      budget: '',
      message: '',
    });
  };

  return (
    <main className="contact-page">

      {/* =========================================
          HERO
          ========================================= */}

      <section className="contact-hero">

        <Container>

          <div className="contact-hero-content">

            <div className="section-eyebrow">
              <span className="eyebrow-line" />
              Start a project
            </div>

            <h1>
              Let's build
              <span>something meaningful.</span>
            </h1>

            <p>
              Tell us a little about your project, your goals,
              and where you want to go. We'll take it from there.
            </p>

          </div>

        </Container>

      </section>


      {/* =========================================
          CONTACT CONTENT
          ========================================= */}

      <section className="contact-content">

        <Container>

          <Row className="g-5">

            {/* -------------------------------------
                Contact details
                ------------------------------------- */}

            <Col lg={4}>

              <div className="contact-details">

                <div className="contact-detail">

                  <span>
                    Email
                  </span>

                  <a href="mailto:hello@shalomtechnologies.com">
                    hello@shalomtechnologies.com
                  </a>

                </div>


                <div className="contact-detail">

                  <span>
                    Location
                  </span>

                  <p>
                    Nairobi, Kenya
                    <br />
                    Working globally.
                  </p>

                </div>


                <div className="contact-detail">

                  <span>
                    Availability
                  </span>

                  <p>
                    Currently accepting selected
                    projects and collaborations.
                  </p>

                </div>


                <div className="contact-detail">

                  <span>
                    Follow
                  </span>

                  <div className="contact-socials">

                    <a href="#" aria-label="LinkedIn">
                      LinkedIn
                    </a>

                    <a href="#" aria-label="Instagram">
                      Instagram
                    </a>

                    <a href="#" aria-label="GitHub">
                      GitHub
                    </a>

                  </div>

                </div>

              </div>

            </Col>


            {/* -------------------------------------
                Form
                ------------------------------------- */}

            <Col lg={{ span: 7, offset: 1 }}>

              {!submitted ? (

                <Form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >

                  <div className="contact-form-heading">

                    <span>
                      Project enquiry
                    </span>

                    <h2>
                      Tell us about
                      <em>your project.</em>
                    </h2>

                  </div>


                  {/* Name */}

                  <Form.Group
                    className="contact-field"
                    controlId="contactName"
                  >

                    <Form.Label>
                      Your name
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </Form.Group>


                  {/* Email */}

                  <Form.Group
                    className="contact-field"
                    controlId="contactEmail"
                  >

                    <Form.Label>
                      Email address
                    </Form.Label>

                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </Form.Group>


                  {/* Company */}

                  <Form.Group
                    className="contact-field"
                    controlId="contactCompany"
                  >

                    <Form.Label>
                      Company
                      <small>Optional</small>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="company"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={handleChange}
                    />

                  </Form.Group>


                  {/* Service */}

                  <Form.Group
                    className="contact-field"
                    controlId="contactService"
                  >

                    <Form.Label>
                      What can we help with?
                    </Form.Label>

                    <Form.Select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select a service
                      </option>

                      <option value="Website Development">
                        Website Development
                      </option>

                      <option value="UI/UX Design">
                        UI / UX Design
                      </option>

                      <option value="E-commerce">
                        E-commerce
                      </option>

                      <option value="Web Application">
                        Web Application
                      </option>

                      <option value="Digital Strategy">
                        Digital Strategy
                      </option>

                      <option value="Other">
                        Something else
                      </option>

                    </Form.Select>

                  </Form.Group>


                  {/* Budget */}

                  <Form.Group
                    className="contact-field"
                    controlId="contactBudget"
                  >

                    <Form.Label>
                      Estimated budget
                    </Form.Label>

                    <Form.Select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select a range
                      </option>

                      <option value="Under $1,000">
                        Under $1,000
                      </option>

                      <option value="$1,000 - $3,000">
                        $1,000 – $3,000
                      </option>

                      <option value="$3,000 - $5,000">
                        $3,000 – $5,000
                      </option>

                      <option value="$5,000 - $10,000">
                        $5,000 – $10,000
                      </option>

                      <option value="$10,000+">
                        $10,000+
                      </option>

                    </Form.Select>

                  </Form.Group>


                  {/* Message */}

                  <Form.Group
                    className="contact-field"
                    controlId="contactMessage"
                  >

                    <Form.Label>
                      Tell us about the project
                    </Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="message"
                      placeholder="What are you trying to build? What problem are you trying to solve?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />

                  </Form.Group>


                  <Button
                    type="submit"
                    className="contact-submit"
                    disabled={isSubmitting}
                  >

                    {isSubmitting
                      ? 'Sending...'
                      : 'Send enquiry'}

                    {!isSubmitting && (
                      <span>→</span>
                    )}

                  </Button>


                  <p className="contact-form-note">
                    By submitting this form, you agree to our{' '}
                    <Link to="/privacy">
                      Privacy Policy
                    </Link>.
                  </p>

                </Form>

              ) : (

                /* -----------------------------------
                   SUCCESS STATE
                   ----------------------------------- */

                <div className="contact-success">

                  <div className="success-icon">
                    ✓
                  </div>

                  <span>
                    Message received
                  </span>

                  <h2>
                    Your details
                    <em>have been sent.</em>
                  </h2>

                  <p>
                    Thanks for reaching out. We'll review
                    your project details and get back to you
                    as soon as possible.
                  </p>

                  <button
                    type="button"
                    className="contact-reset"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </button>

                </div>

              )}

            </Col>

          </Row>

        </Container>

      </section>


      {/* =========================================
          BOTTOM CTA
          ========================================= */}

      <section className="contact-bottom">

        <Container>

          <div className="contact-bottom-inner">

            <span>
              Shalom Technologies
            </span>

            <h2>
              Good things
              <span>start with a conversation.</span>
            </h2>

          </div>

        </Container>

      </section>

    </main>
  );
}

export default Contact;