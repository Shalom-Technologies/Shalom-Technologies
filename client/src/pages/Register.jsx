import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';
import styles from './Auth.module.css';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errors = {};
    if (!name.trim()) errors.name = 'Name is required.';
    if (!email.trim()) errors.email = 'Email is required.';
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    if (!validate()) return;

    setSubmitting(true);
    try {
      await register({ name: name.trim(), email: email.trim(), password });
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
        title="Create an Account"
        description="Create a free Shalom Technologies account to start describing and previewing your business website."
        path="/register"
        noIndex
      />

      <main className={styles.card}>
        <Link to="/" className={styles.logo}>
          Shalom Technologies
        </Link>
        <h1 className={styles.heading}>Create your account</h1>
        <p className={styles.subheading}>It only takes a minute to get started.</p>

        {formError && (
          <p className={styles.formError} role="alert">
            {formError}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className={`${styles.input} ${fieldErrors.name ? styles.inputError : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            />
            {fieldErrors.name && (
              <p id="name-error" className={styles.errorText}>
                {fieldErrors.name}
              </p>
            )}
          </div>

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
              autoComplete="new-password"
              className={`${styles.input} ${fieldErrors.password ? styles.inputError : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'password-error' : 'password-hint'}
            />
            {fieldErrors.password ? (
              <p id="password-error" className={styles.errorText}>
                {fieldErrors.password}
              </p>
            ) : (
              <p id="password-hint" className={styles.footerText} style={{ marginTop: '0.4rem', textAlign: 'left' }}>
                At least 8 characters.
              </p>
            )}
          </div>

          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </main>
    </div>
  );
}

export default RegisterPage;