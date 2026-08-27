import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../api/projects';
import LoadingIndicator from '../components/LoadingIndicator';
import Seo from '../components/Seo';
import styles from './Confirmation.module.css';

function ConfirmationPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getProject(id)
      .then((data) => {
        if (isMounted) setProject(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.response?.data?.error || 'Could not load this project.');
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (error) {
    return (
      <div className={styles.wrapper}>
        <p role="alert">{error}</p>
        <Link to="/dashboard">Back to dashboard</Link>
      </div>
    );
  }

  if (!project) {
    return (
      <LoadingIndicator active srLabel="Loading" messages={[{ after: 0, text: 'Loading…' }]} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <Seo
        title="Project Submitted"
        description="Your website project has been sent to our development team."
        path={`/projects/${id}/confirmation`}
        noIndex
      />

      <div className={styles.checkIcon} aria-hidden="true">
        ✓
      </div>

      <h1 className={styles.heading}>Your project is with our team</h1>
      <p className={styles.body}>
        Thanks for your deposit — we&apos;ve received your brief and one of our developers will
        begin building your real site shortly. We&apos;ll keep you updated on your dashboard as
        work progresses.
      </p>

      {project.addOns?.length > 0 && (
        <div className={styles.summaryBox}>
          <p className={styles.summaryTitle}>What you ordered</p>
          <ul className={styles.addOnsList}>
            <li>Base website</li>
            {project.addOns.map((a) => (
              <li key={a.id}>{a.name}</li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/dashboard" className={styles.primaryButton}>
        Go to your dashboard
      </Link>
    </div>
  );
}

export default ConfirmationPage;