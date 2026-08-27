import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';
import styles from './Auth.module.css';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errors = {};
    if (!email.trim()) errors.email = 'Email is required.';
    if (!password) errors.password = 'Password is required.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    if (!validate()) return;

    setSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.error || 'Something went wrong. Please try again.';
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Seo
        title="Log In"
        description="Log in to your Shalom Technologies account to view or continue building your website."
        path="/login"
        noIndex
      />

      <main className={styles.card}>
        <Link to="/" className={styles.logo}>
          Shalom Technologies
        </Link>
        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.subheading}>Log in to continue working on your website.</p>

        {formError && (
          <p className={styles.formError} role="alert">
            {formError}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            />
            {fieldErrors.email && (
              <p id="email-error" className={styles.errorText}>
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={`${styles.input} ${fieldErrors.password ? styles.inputError : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'password-error' : undefined}
            />
            {fieldErrors.password && (
              <p id="password-error" className={styles.errorText}>
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className={styles.footerText}>
          Don&apos;t have an account? <Link to="/register">Create one</Link>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;