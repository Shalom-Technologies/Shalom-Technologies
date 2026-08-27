import useLoadingMessages, { DEFAULT_GENERATION_MESSAGES } from '../hooks/useLoadingMessages';
import styles from './LoadingIndicator.module.css';

/**
 * @param {boolean} active - whether the wait is currently happening
 * @param {Array} [messages] - override the default phrase set
 * @param {string} [srLabel] - accessible label for the spinner itself
 */
function LoadingIndicator({ active, messages = DEFAULT_GENERATION_MESSAGES, srLabel = 'Loading' }) {
  const message = useLoadingMessages(active, messages);

  if (!active) return null;

  return (
    <div className={styles.wrap}>
      <span className={styles.spinner} aria-hidden="true" />
      {/* aria-live="polite" + role="status" means screen readers announce
          each new message as it appears, without interrupting other speech. */}
      <p className={styles.message} role="status" aria-live="polite">
        <span className="visually-hidden">{srLabel}: </span>
        {message}
      </p>
    </div>
  );
}

export default LoadingIndicator;