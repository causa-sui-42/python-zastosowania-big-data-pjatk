import { useState, useCallback, type KeyboardEvent, type ReactNode } from 'react';
import styles from './styles.module.css';

interface FlashcardProps {
  question: string;
  answer: string;
}

export default function Flashcard({ question, answer }: FlashcardProps): ReactNode {
  const [flipped, setFlipped] = useState(false);

  const toggle = useCallback(() => setFlipped((f) => !f), []);

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <div className={styles.scene}>
      <div
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}
        onClick={toggle}
        onKeyDown={handleKey}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? `Odpowiedź: ${answer}` : `Pytanie: ${question}`}
      >
        {/* FRONT */}
        <div className={styles.face + ' ' + styles.front}>
          <span className={styles.label}>Pytanie</span>
          <p className={styles.question}>{question}</p>
          <span className={styles.hint}>Kliknij lub naciśnij Spację, żeby odkryć odpowiedź</span>
        </div>

        {/* BACK */}
        <div className={styles.face + ' ' + styles.back}>
          <span className={styles.label}>Odpowiedź</span>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </div>
  );
}
