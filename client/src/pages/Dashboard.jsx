import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listProjects } from '../api/projects';
import LoadingIndicator from '../components/LoadingIndicator';
import Seo from '../components/Seo';
import styles from './Dashboard.module.css';

// Maps each project status to a human label and a badge color class.
// Centralized here so the mapping stays consistent and is easy to extend
// if you add more statuses later.
const STATUS_META = {
  generating: { label: 'Generating draft', className: 'badgeNeutral' },
  reviewing: { label: 'In review', className: 'badgeBlue' },
  pending_build: { label: 'Awaiting build', className: 'badgeAccent' },
  in_development: { label: 'In development', className: 'badgeAccent' },
  live: { label: 'Live', className: 'badgeSuccess' },
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function truncate(text, maxLength = 110) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

// Decides where the "primary action" link on a project card should go,
// based on its current status.
function getPrimaryAction(project) {
  switch (project.status) {
    case 'reviewing':
      return { to: `/projects/${project._id}`, label: 'Continue reviewing' };
    case 'live':
      return { to: `/projects/${project._id}`, label: 'View details' };
    default:
      // generating, pending_build, in_development all land on the same
      // preview page, which already shows the right "finalized" state.
      return { to: `/projects/${project._id}`, label: 'View project' };
  }
}

function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    listProjects()
      .then((data) => {
        if (isMounted) setProjects(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.response?.data?.error || 'Could not load your projects.');
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.page}>
      <Seo
        title="Dashboard"
        description="View and manage your Shalom Technologies website projects."
        path="/dashboard"
        noIndex
      />

      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          Shalom Technologies
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.titleRow}>
          <div>
            <h1 className={styles.heading}>
              Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
            </h1>
            <p className={styles.subheading}>Here&apos;s where your website projects live.</p>
          </div>
          <Link to="/describe" className={styles.newProjectButton}>
            + New project
          </Link>
        </div>

        {error && (
          <p className={styles.formError} role="alert">
            {error}
          </p>
        )}

        {!projects && !error && (
          <LoadingIndicator
            active
            srLabel="Loading your projects"
            messages={[{ after: 0, text: 'Loading your projects…' }]}
          />
        )}

        {projects && projects.length === 0 && (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyHeading}>You haven&apos;t started a project yet</h2>
            <p className={styles.emptyBody}>
              Describe your business and see a live draft of your website in minutes.
            </p>
            <Link to="/describe" className={styles.emptyButton}>
              Describe your site
            </Link>
          </div>
        )}

        {projects && projects.length > 0 && (
          <ul className={styles.projectGrid}>
            {projects.map((project) => {
              const statusMeta = STATUS_META[project.status] || STATUS_META.reviewing;
              const action = getPrimaryAction(project);

              return (
                <li key={project._id} className={styles.projectCard}>
                  <div className={styles.cardTop}>
                    <span className={`${styles.badge} ${styles[statusMeta.className]}`}>
                      {statusMeta.label}
                    </span>
                    <span className={styles.cardDate}>{formatDate(project.createdAt)}</span>
                  </div>

                  <p className={styles.cardDescription}>{truncate(project.description)}</p>

                  {project.addOns?.length > 0 && (
                    <p className={styles.cardAddOns}>
                      Add-ons: {project.addOns.map((a) => a.name).join(', ')}
                    </p>
                  )}

                  <div className={styles.cardFooter}>
                    <Link to={action.to} className={styles.cardAction}>
                      {action.label} &rarr;
                    </Link>
                    {project.status === 'live' && project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.liveLink}
                      >
                        Visit live site &#8599;
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;