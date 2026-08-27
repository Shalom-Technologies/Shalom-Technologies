import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProject, finalizeProject } from '../api/projects';
import { getPricing, selectAddOns, payDeposit } from '../api/pricing';
import LoadingIndicator from '../components/LoadingIndicator';
import Seo from '../components/Seo';
import styles from './Checkout.module.css';

function formatMoney(amount, symbol) {
  return `${symbol}${amount.toFixed(2)}`;
}

function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [step, setStep] = useState('addons'); // 'addons' | 'payment'
  const [loadError, setLoadError] = useState('');
  const [savingAddOns, setSavingAddOns] = useState(false);
  const [addOnsError, setAddOnsError] = useState('');
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');

  useEffect(() => {
    let isMounted = true;
    Promise.all([getProject(id), getPricing()])
      .then(([projectData, pricingData]) => {
        if (!isMounted) return;

        if (projectData.status !== 'reviewing') {
          // Already finalized (or not ready yet) — nothing to check out.
          navigate(`/projects/${id}/confirmation`, { replace: true });
          return;
        }

        setProject(projectData);
        setPricing(pricingData);
        setSelectedIds(projectData.addOns?.map((a) => a.id) || []);

        // If add-ons were already selected and a deposit already paid in a
        // previous visit, skip straight to the payment step's paid state.
        if (projectData.subtotal > 0) {
          setStep('payment');
        }
      })
      .catch((err) => {
        if (isMounted) setLoadError(err.response?.data?.error || 'Could not load this project.');
      });
    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  function toggleAddOn(addOnId) {
    setSelectedIds((prev) =>
      prev.includes(addOnId) ? prev.filter((x) => x !== addOnId) : [...prev, addOnId]
    );
  }

  async function handleContinueToPayment() {
    setAddOnsError('');
    setSavingAddOns(true);
    try {
      const updated = await selectAddOns(id, selectedIds);
      setProject(updated);
      setStep('payment');
    } catch (err) {
      setAddOnsError(err.response?.data?.error || 'Could not save your add-ons. Please try again.');
    } finally {
      setSavingAddOns(false);
    }
  }

  async function handlePay() {
    setPayError('');
    setPaying(true);
    try {
      await payDeposit(id);
      // Placeholder payment succeeded — immediately finalize and send to
      // the team, then move on to the confirmation screen.
      await finalizeProject(id);
      navigate(`/projects/${id}/confirmation`);
    } catch (err) {
      setPayError(err.response?.data?.error || 'Payment could not be processed. Please try again.');
      setPaying(false);
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

  if (!project || !pricing) {
    return (
      <LoadingIndicator active srLabel="Loading checkout" messages={[{ after: 0, text: 'Loading checkout…' }]} />
    );
  }

  const symbol = pricing.currencySymbol;
  const selectedAddOns = pricing.addOns.filter((a) => selectedIds.includes(a.id));
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const estimatedSubtotal = pricing.basePrice + addOnsTotal;
  const estimatedDeposit = estimatedSubtotal * pricing.depositPercentage;

  // Once the server has confirmed add-ons (step === 'payment'), prefer the
  // authoritative saved values over the client-side estimate.
  const displaySubtotal = project.subtotal > 0 ? project.subtotal : estimatedSubtotal;
  const displayDeposit = project.depositAmount > 0 ? project.depositAmount : estimatedDeposit;

  return (
    <div className={styles.page}>
      <Seo
        title="Checkout"
        description="Choose add-ons and pay your deposit to send your project to our development team."
        path={`/projects/${id}/checkout`}
        noIndex
      />

      <Link to="/" className={styles.logo}>
        Shalom Technologies
      </Link>

      <main className={styles.card}>
        {step === 'addons' && (
          <>
            <h1 className={styles.heading}>Add anything extra?</h1>
            <p className={styles.subheading}>
              Optional add-ons for your site. You can skip this and continue with just the
              base site if you&apos;d prefer.
            </p>

            <fieldset className={styles.addOnsList}>
              <legend className="visually-hidden">Select optional add-ons</legend>
              {pricing.addOns.map((addOn) => {
                const checkboxId = `addon-${addOn.id}`;
                const checked = selectedIds.includes(addOn.id);
                return (
                  <label key={addOn.id} htmlFor={checkboxId} className={styles.addOnCard}>
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddOn(addOn.id)}
                      className={styles.addOnCheckbox}
                    />
                    <span className={styles.addOnInfo}>
                      <span className={styles.addOnName}>{addOn.name}</span>
                      <span className={styles.addOnDescription}>{addOn.description}</span>
                    </span>
                    <span className={styles.addOnPrice}>{formatMoney(addOn.price, symbol)}</span>
                  </label>
                );
              })}
            </fieldset>

            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>Base website</span>
                <span>{formatMoney(pricing.basePrice, symbol)}</span>
              </div>
              {selectedAddOns.map((a) => (
                <div className={styles.summaryRow} key={a.id}>
                  <span>{a.name}</span>
                  <span>{formatMoney(a.price, symbol)}</span>
                </div>
              ))}
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Estimated subtotal</span>
                <span>{formatMoney(estimatedSubtotal, symbol)}</span>
              </div>
            </div>

            {addOnsError && (
              <p className={styles.formError} role="alert">
                {addOnsError}
              </p>
            )}

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleContinueToPayment}
              disabled={savingAddOns}
            >
              {savingAddOns ? 'Saving…' : 'Continue to payment'}
            </button>
          </>
        )}

        {step === 'payment' && (
          <>
            <h1 className={styles.heading}>Pay your deposit</h1>
            <p className={styles.subheading}>
              A {(pricing.depositPercentage * 100).toFixed(0)}% deposit secures your spot in our
              build queue. The remaining balance is due once your site is delivered.
            </p>

            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>Base website</span>
                <span>{formatMoney(project.basePrice || pricing.basePrice, symbol)}</span>
              </div>
              {(project.addOns?.length ? project.addOns : selectedAddOns).map((a) => (
                <div className={styles.summaryRow} key={a.id}>
                  <span>{a.name}</span>
                  <span>{formatMoney(a.price, symbol)}</span>
                </div>
              ))}
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Subtotal</span>
                <span>{formatMoney(displaySubtotal, symbol)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.depositRow}`}>
                <span>Deposit due now ({(pricing.depositPercentage * 100).toFixed(0)}%)</span>
                <span>{formatMoney(displayDeposit, symbol)}</span>
              </div>
            </div>

            {payError && (
              <p className={styles.formError} role="alert">
                {payError}
              </p>
            )}

            {paying ? (
              <LoadingIndicator
                active
                srLabel="Processing payment"
                messages={[{ after: 0, text: 'Sending your project to our team…' }]}
              />
            ) : (
              <button type="button" className={styles.primaryButton} onClick={handlePay}>
                Pay {formatMoney(displayDeposit, symbol)} deposit
              </button>
            )}

            <p className={styles.paymentNote}>
              Payment processing is not yet connected — clicking pay simulates a successful
              deposit for now.
            </p>

            <button
              type="button"
              className={styles.backButton}
              onClick={() => setStep('addons')}
              disabled={paying}
            >
              &larr; Back to add-ons
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default CheckoutPage;