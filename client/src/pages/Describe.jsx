import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createProject } from '../api/projects';
import LoadingIndicator from '../components/LoadingIndicator';
import Seo from '../components/Seo';
import styles from './Describe.module.css';

const MIN_LENGTH = 10;

function DescribePage() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const trimmed = description.trim();
    if (trimmed.length < MIN_LENGTH) {
      setError(`Please share a bit more detail (at least ${MIN_LENGTH} characters).`);
      return;
    }

    setSubmitting(true);
    try {
      const project = await createProject(trimmed);
      navigate(`/projects/${project._id}`);
    } catch (err) {
      const message =
        err.response?.data?.error || 'Something went wrong generating your draft. Please try again.';
      setError(message);
      setSubmitting(false);
    }
    // Deliberately not resetting `submitting` on success — we're navigating
    // away, so the loading state should persist until the new page mounts.
  }

  return (
    <div className={styles.wrapper}>
      <Seo
        title="Describe Your Business"
        description="Tell us about your business and get an instant website draft to review."
        path="/describe"
        noIndex
      />

      <Link to="/" className={styles.logo}>
        Shalom Technologies
      </Link>

      {submitting ? (
        <LoadingIndicator active srLabel="Generating your website draft" />
      ) : (
        <main className={styles.card}>
          <h1 className={styles.heading}>Tell us about your business</h1>
          <p className={styles.subheading}>
            Include what you do, who your customers are, and anything specific you&apos;d
            like on the site. The more detail you give, the better your first draft will be.
          </p>

          {error && (
            <p className={styles.formError} role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="description" className="visually-hidden">
              Describe your business and the website you want
            </label>
            <textarea
              id="description"
              className={styles.textarea}
              rows={8}
              placeholder="e.g. I run a small catering business in Nairobi specializing in event catering for weddings and corporate functions. I want a site that shows our menu, past events, and lets people request a quote."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'description-error' : undefined}
            />
            {error && (
              <span id="description-error" className="visually-hidden">
                {error}
              </span>
            )}

            <button type="submit" className={styles.submitButton}>
              Generate my draft
            </button>
          </form>
        </main>
      )}
    </div>
  );
}

export default DescribePage;