import { useState, useCallback, useMemo, useEffect, type ReactNode } from 'react';
import styles from './styles.module.css';

export interface QuizQuestion {
  question: string;
  code?: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

interface QuizProps {
  /** Unique id used to persist the best score in localStorage, e.g. "wyk01". */
  quizId: string;
  questions: QuizQuestion[];
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;
const STORAGE_PREFIX = 'pbd_quiz_best_';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz({ quizId, questions }: QuizProps): ReactNode {
  const [order, setOrder] = useState<number[]>(() => shuffle(questions.map((_, i) => i)));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [best, setBest] = useState<number | null>(null);

  const storageKey = `${STORAGE_PREFIX}${quizId}`;

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      setBest(stored ? Number(stored) : null);
    } catch {
      setBest(null);
    }
  }, [storageKey]);

  const total = questions.length;
  const current = questions[order[index]];
  const progress = total > 0 ? Math.round(((index + (finished ? 1 : 0)) / total) * 100) : 0;

  const handleRestart = useCallback(() => {
    setOrder(shuffle(questions.map((_, i) => i)));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }, [questions]);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (selected !== null) return;
      setSelected(optionIndex);
      if (optionIndex === current.correctIndex) {
        setScore((s) => s + 1);
      }
    },
    [selected, current],
  );

  const handleNext = useCallback(() => {
    if (index + 1 >= total) {
      setFinished(true);
      const finalScore = score; // score already includes last answer via handleAnswer
      try {
        const prevBest = Number(localStorage.getItem(storageKey) ?? 0);
        if (finalScore > prevBest) {
          localStorage.setItem(storageKey, String(finalScore));
          setBest(finalScore);
        }
      } catch {
        // localStorage not available (SSR) — ignore
      }
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }, [index, total, score, storageKey]);

  const percentage = useMemo(
    () => (total > 0 ? Math.round((score / total) * 100) : 0),
    [score, total],
  );

  if (total === 0) {
    return <p>Brak pytań do wyświetlenia.</p>;
  }

  if (finished) {
    return (
      <div className={styles.resultCard}>
        <div className={styles.resultEmoji}>
          {percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '📚'}
        </div>
        <h3>Wynik: {score} / {total} ({percentage}%)</h3>
        <p className={styles.resultMessage}>
          {percentage >= 80
            ? 'Świetnie! Materiał opanowany/a na wysokim poziomie.'
            : percentage >= 50
              ? 'Nieźle! Warto jeszcze wrócić do kilku zagadnień.'
              : 'Warto powtórzyć materiał wykładu i spróbować ponownie.'}
        </p>
        {best !== null && (
          <p className={styles.bestScore}>🥇 Twój najlepszy wynik: {best} / {total}</p>
        )}
        <button className={styles.restartBtn} onClick={handleRestart}>
          🔄 Spróbuj ponownie
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quiz}>
      <div className={styles.progressInfo}>
        <span>Pytanie {index + 1} z {total}</span>
        <span>Wynik: {score}</span>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <p className={styles.question}>{current.question}</p>

      {current.code && (
        <pre className={styles.code}>
          <code>{current.code}</code>
        </pre>
      )}

      <div className={styles.options}>
        {current.options.map((option, i) => {
          const isCorrect = i === current.correctIndex;
          const isSelected = i === selected;
          let optionClass = styles.option;
          if (selected !== null) {
            if (isCorrect) optionClass += ` ${styles.optionCorrect}`;
            else if (isSelected) optionClass += ` ${styles.optionWrong}`;
            else optionClass += ` ${styles.optionDisabled}`;
          }
          return (
            <button
              key={i}
              className={optionClass}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
            >
              <span className={styles.optionLetter}>{LETTERS[i]}</span>
              <span>{option}</span>
              {selected !== null && isCorrect && <span className={styles.mark}>✅</span>}
              {selected !== null && isSelected && !isCorrect && <span className={styles.mark}>❌</span>}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className={styles.explanation}>
          <strong>{selected === current.correctIndex ? '✅ Poprawnie!' : '❌ Niepoprawnie.'}</strong>{' '}
          {current.explanation}
        </div>
      )}

      {selected !== null && (
        <button className={styles.nextBtn} onClick={handleNext}>
          {index + 1 >= total ? 'Zobacz wynik 🏁' : 'Następne pytanie →'}
        </button>
      )}
    </div>
  );
}
