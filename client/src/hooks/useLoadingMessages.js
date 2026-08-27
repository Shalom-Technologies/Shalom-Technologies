import { useEffect, useRef, useState } from 'react';

// Default phrase set for AI generation waits. Each entry activates once
// `after` milliseconds have elapsed since the wait began — messages escalate
// to reassure the user the longer it takes, rather than repeating the same
// static text the whole time.
export const DEFAULT_GENERATION_MESSAGES = [
  { after: 0, text: 'The model is thinking…' },
  { after: 4000, text: 'Sketching out the layout…' },
  { after: 9000, text: 'Choosing colors and styling…' },
  { after: 16000, text: "It's taking a little longer than expected — hang in there." },
  { after: 26000, text: 'Still working on it. Good things take a little time.' },
  { after: 40000, text: 'Almost there. Thanks for your patience.' },
];

/**
 * Returns the current loading message, advancing through `messages` as time
 * passes while `active` is true. Resets to the first message whenever
 * `active` goes from false to true again (e.g. a new tweak request).
 *
 * @param {boolean} active
 * @param {Array<{after: number, text: string}>} messages
 */
function useLoadingMessages(active, messages = DEFAULT_GENERATION_MESSAGES) {
  const [message, setMessage] = useState(messages[0].text);
  const startedAtRef = useRef(null);

  useEffect(() => {
    if (!active) {
      startedAtRef.current = null;
      setMessage(messages[0].text);
      return undefined;
    }

    startedAtRef.current = Date.now();
    setMessage(messages[0].text);

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startedAtRef.current;
      // Find the latest threshold we've passed.
      let current = messages[0].text;
      for (const entry of messages) {
        if (elapsed >= entry.after) {
          current = entry.text;
        }
      }
      setMessage(current);
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- messages is expected to be a stable/static array
  }, [active]);

  return message;
}

export default useLoadingMessages;