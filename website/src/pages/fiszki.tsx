import { useState, useCallback, useEffect, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Flashcard from '../components/Flashcard';
import { FLASHCARDS, CATEGORY_META, type FlashcardCategory } from '../data/flashcards';
import styles from './fiszki.module.css';

const STORAGE_KEY = 'pbd_fiszki_known';
const ALL_CATEGORIES = Object.keys(CATEGORY_META) as FlashcardCategory[];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Fiszki(): ReactNode {
  const [activeCategory, setActiveCategory] = useState<FlashcardCategory | 'all'>('all');
  const [deck, setDeck] = useState(() => shuffle(FLASHCARDS));
  const [index, setIndex] = useState(0);
  const [known, setKnown] = useState<Set<number>>(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      return stored ? new Set(JSON.parse(stored) as number[]) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist known set
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...known]));
    } catch {
      // localStorage not available (SSR)
    }
  }, [known]);

  // Rebuild deck when category changes
  const filtered = activeCategory === 'all'
    ? FLASHCARDS
    : FLASHCARDS.filter((f) => f.category === activeCategory);

  const handleCategoryChange = useCallback((cat: FlashcardCategory | 'all') => {
    setActiveCategory(cat);
    setDeck(shuffle(activeCategory === 'all' ? FLASHCARDS : FLASHCARDS.filter((f) => f.category === cat)));
    setIndex(0);
  }, [activeCategory]);

  const handleShuffle = useCallback(() => {
    setDeck(shuffle(filtered));
    setIndex(0);
  }, [filtered]);

  const handlePrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const handleNext = useCallback(() => setIndex((i) => Math.min(deck.length - 1, i + 1)), [deck.length]);

  const current = deck[index] ?? null;

  const markKnown = useCallback(() => {
    if (!current) return;
    setKnown((prev) => {
      const next = new Set(prev);
      if (next.has(current.id)) {
        next.delete(current.id);
      } else {
        next.add(current.id);
      }
      return next;
    });
  }, [current]);

  const resetProgress = useCallback(() => {
    setKnown(new Set());
  }, []);

  const knownInDeck = deck.filter((f) => known.has(f.id)).length;
  const progress = deck.length > 0 ? Math.round((knownInDeck / deck.length) * 100) : 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'k' || e.key === 'K') markKnown();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, markKnown]);

  return (
    <Layout
      title="Fiszki"
      description="Interaktywne fiszki do nauki Big Data, Apache Spark i Python — idealne przed egzaminem."
    >
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <Heading as="h1">🃏 Fiszki</Heading>
            <p className={styles.subtitle}>
              Interaktywne karty do powtórki kluczowych pojęć. Kliknij kartę, żeby zobaczyć odpowiedź.
              Użyj strzałek ← → do nawigacji i klawisza <kbd>K</kbd>, żeby oznaczyć fiszkę jako poznaną.
            </p>
          </div>

          {/* Category filter */}
          <div className={styles.categories}>
            <button
              className={`${styles.catBtn} ${activeCategory === 'all' ? styles.catActive : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              🌐 Wszystkie ({FLASHCARDS.length})
            </button>
            {ALL_CATEGORIES.map((cat) => {
              const { label, emoji } = CATEGORY_META[cat];
              const count = FLASHCARDS.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {emoji} {label} ({count})
                </button>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className={styles.progressSection}>
            <div className={styles.progressInfo}>
              <span>Poznane: <strong>{knownInDeck}</strong> / {deck.length}</span>
              <span>{progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            {known.size > 0 && (
              <button className={styles.resetBtn} onClick={resetProgress}>
                Zresetuj postęp
              </button>
            )}
          </div>

          {/* Card */}
          {current ? (
            <div className={styles.cardArea}>
              <div className={styles.cardCounter}>
                {index + 1} / {deck.length}
                {current && (
                  <span className={styles.categoryTag}>
                    {CATEGORY_META[current.category].emoji} {CATEGORY_META[current.category].label}
                  </span>
                )}
              </div>

              <Flashcard question={current.question} answer={current.answer} />

              {/* Controls */}
              <div className={styles.controls}>
                <button
                  className={styles.navBtn}
                  onClick={handlePrev}
                  disabled={index === 0}
                  aria-label="Poprzednia fiszka"
                >
                  ← Poprzednia
                </button>

                <button
                  className={`${styles.knownBtn} ${known.has(current.id) ? styles.knownActive : ''}`}
                  onClick={markKnown}
                  aria-pressed={known.has(current.id)}
                >
                  {known.has(current.id) ? '✅ Poznana' : '⬜ Oznacz jako poznaną'}
                </button>

                <button
                  className={styles.navBtn}
                  onClick={handleNext}
                  disabled={index === deck.length - 1}
                  aria-label="Następna fiszka"
                >
                  Następna →
                </button>
              </div>

              <div className={styles.shuffleRow}>
                <button className={styles.shuffleBtn} onClick={handleShuffle}>
                  🔀 Przetasuj karty
                </button>
              </div>
            </div>
          ) : (
            <p className={styles.empty}>Brak fiszek dla wybranej kategorii.</p>
          )}

          {/* Keyboard shortcuts legend */}
          <div className={styles.shortcuts}>
            <strong>Skróty klawiszowe:</strong>&nbsp;
            <kbd>Spacja</kbd> odkryj odpowiedź &nbsp;
            <kbd>←</kbd> poprzednia &nbsp;
            <kbd>→</kbd> następna &nbsp;
            <kbd>K</kbd> oznacz jako poznaną
          </div>
        </div>
      </main>
    </Layout>
  );
}
