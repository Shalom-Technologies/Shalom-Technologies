import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject, tweakProject, finalizeProject } from '../api/projects';
import LoadingIndicator from '../components/LoadingIndicator';
import Seo from '../components/Seo';
import styles from './Preview.module.css';

const MAX_TWEAKS = 5;

function PreviewPage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [tweakMessage, setTweakMessage] = useState('');
  const [tweaking, setTweaking] = useState(false);
  const [tweakError, setTweakError] = useState('');
  const [finalizing, setFinalizing] = useState(false);
  const [finalizeError, setFinalizeError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getProject(id)
      .then((data) => {
        if (isMounted) setProject(data);
      })
      .catch((err) => {
        if (isMounted) {
          setLoadError(err.response?.data?.error || 'Could not load this project.');
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  async function handleTweakSubmit(e) {
    e.preventDefault();
    setTweakError('');

    const trimmed = tweakMessage.trim();
    if (!trimmed) return;

    setTweaking(true);
    try {
      const updated = await tweakProject(id, trimmed);
      setProject(updated);
      setTweakMessage('');
    } catch (err) {
      setTweakError(err.response?.data?.error || 'That tweak could not be applied. Please try again.');
    } finally {
      setTweaking(false);
    }
  }

  async function handleFinalize() {
    setFinalizeError('');
    setFinalizing(true);
    try {
      const updated = await finalizeProject(id);
      setProject(updated);
    } catch (err) {
      setFinalizeError(err.response?.data?.error || 'Could not finalize this project. Please try again.');
    } finally {
      setFinalizing(false);
    }
  }

  if (loadError) {
    return (
      <div className={styles.centeredMessage}>
        <p role="alert">{loadError}</p>
        <Link to="/dashboard">Back to dashboard</Link>
      </div>
    );
  }

  if (!project) {
    return <LoadingIndicator active srLabel="Loading your project" messages={[{ after: 0, text: 'Loading your project…' }]} />;
  }

  const tweaksRemaining = MAX_TWEAKS - project.tweaksUsed;
  const canTweak = project.status === 'reviewing' && tweaksRemaining > 0;
  const isFinalized = project.status !== 'reviewing' && project.status !== 'generating';

  return (
    <div className={styles.page}>
      <Seo
        title="Your Website Draft"
        description="Review and refine your website draft before it's built for real."
        path={`/projects/${id}`}
        noIndex
      />

      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          Shalom Technologies
        </Link>
        <Link to="/dashboard" className={styles.backLink}>
          &larr; Back to dashboard
        </Link>
      </header>

      <div className={styles.layout}>
        {/* ------------------------------------------------------ Preview */}
        <section className={styles.previewPane} aria-labelledby="preview-heading">
          <h1 id="preview-heading" className={styles.paneHeading}>
            Live preview
          </h1>
          <div className={styles.iframeWrap}>
            <iframe
              title="Your website draft preview"
              srcDoc={project.mockupCode}
              sandbox="allow-scripts"
              className={styles.iframe}
            />
          </div>
        </section>

        {/* ------------------------------------------------------ Tweak chat */}
        <section className={styles.chatPane} aria-labelledby="chat-heading">
          <div className={styles.chatHeader}>
            <h2 id="chat-heading" className={styles.paneHeading}>
              Refine your draft
            </h2>
            <span className={styles.tweakCounter}>
              {isFinalized ? 'Finalized' : `${tweaksRemaining} of ${MAX_TWEAKS} tweaks left`}
            </span>
          </div>

          <ul className={styles.conversation} aria-live="polite">
            {project.conversation.map((entry, i) => (
              <li
                key={i}
                className={entry.role === 'user' ? styles.userMessage : styles.assistantMessage}
              >
                <span className="visually-hidden">
                  {entry.role === 'user' ? 'You said: ' : 'Shalom said: '}
                </span>
                {entry.message}
              </li>
            ))}
          </ul>

          {tweaking && (
            <LoadingIndicator active srLabel="Applying your tweak" />
          )}

          {isFinalized ? (
            <div className={styles.finalizedNotice} role="status">
              <p>
                Your project is with our team now. We&apos;ll be in touch as we build your
                real site — check your dashboard for status updates.
              </p>
            </div>
          ) : (
            <>
              {tweakError && (
                <p className={styles.formError} role="alert">
                  {tweakError}
                </p>
              )}

              <form onSubmit={handleTweakSubmit} className={styles.tweakForm}>
                <label htmlFor="tweak-input" className="visually-hidden">
                  Describe a change you'd like
                </label>
                <input
                  id="tweak-input"
                  type="text"
                  className={styles.tweakInput}
                  placeholder={
                    canTweak
                      ? 'e.g. Make the header background darker'
                      : 'You have used all available tweaks'
                  }
                  value={tweakMessage}
                  onChange={(e) => setTweakMessage(e.target.value)}
                  disabled={!canTweak || tweaking}
                />
                <button
                  type="submit"
                  className={styles.tweakSubmit}
                  disabled={!canTweak || tweaking || !tweakMessage.trim()}
                >
                  Send
                </button>
              </form>

              {finalizeError && (
                <p className={styles.formError} role="alert">
                  {finalizeError}
                </p>
              )}

              <button
                type="button"
                className={styles.finalizeButton}
                onClick={handleFinalize}
                disabled={finalizing}
              >
                {finalizing ? 'Finalizing…' : 'Finalize & send to our team'}
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default PreviewPage;