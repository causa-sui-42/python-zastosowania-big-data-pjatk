---
id: 03-mapreduce-analiza-recenzji
title: "Lab 3: MapReduce — Analiza recenzji filmowych"
sidebar_label: "Lab 3 — MapReduce"
description: "Manualna implementacja map/shuffle/reduce w czystym Pythonie na zbiorze syntetycznych recenzji filmowych."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 3: MapReduce — Analiza recenzji filmowych

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

W tym laboratorium zaimplementujesz **własny, uproszczony MapReduce w czystym Pythonie** — bez Sparka, bez klastra Hadoop — żeby zbudować solidną intuicję przed tym, jak te same idee zobaczymy w PySparku na kolejnym wykładzie.

Po wykonaniu ćwiczenia będziesz potrafić:

- Zaimplementować fazy **map**, **shuffle** i **reduce** ręcznie w Pythonie
- Policzyć częstość słów osobno dla recenzji pozytywnych i negatywnych
- Napisać własną, generyczną funkcję w stylu **`reduceByKey`**
- Połączyć statystykę opisową (z Wykładu 1) z analizą tekstu (długość recenzji, rozkłady)
- Zrównoleglić prosty word count przy pomocy `concurrent.futures`, żeby *poczuć* na własnej skórze, dlaczego MapReduce w ogóle jest szybszy

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-03-mapreduce-analiza-recenzji.ipynb">📥 <strong>Pobierz: cw-03-mapreduce-analiza-recenzji.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Zbiór danych jest **generowany proceduralnie** wewnątrz notebooka (nie trzeba niczego pobierać) — dzięki temu ćwiczenie działa identycznie w Google Colab i lokalnie.

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne recenzje filmowe (PL) |
| Liczba rekordów | ~2000 recenzji |
| Format | Lista słowników / `pandas.DataFrame` w pamięci |
| Kolumny | `review_id`, `text`, `sentiment` (`"pozytywna"` / `"negatywna"`), `word_count` |
| Generowanie | Losowe łączenie szablonów zdań i słów kluczowych (`random.seed(42)`) |

> 💡 Dlaczego syntetyczne dane? Bo pozwala to każdemu studentowi pracować na **identycznym** zbiorze (dzięki ziarnu losowości), bez zależności od zewnętrznych plików czy internetu.

---

## 📋 Zadania

Notebook zawiera **guided example** (manualny word count na małej próbce) oraz **8 ćwiczeń**:

| Nr | Temat | Koncepty |
|----|-------|----------|
| Przykład | Manualny map/shuffle/reduce word count | `defaultdict`, słowniki, list comprehensions |
| 1 | Częstość słów per klasa sentymentu | Filtrowanie, `Counter` / ręczne zliczanie |
| 2 | Top-N najczęstszych słów kluczowych | Sortowanie po wartości słownika |
| 3 | Własna funkcja `reduce_by_key()` | Funkcje wyższego rzędu, generyczność |
| 4 | Zliczanie długości recenzji (word count per recenzja) | List comprehensions, agregacja |
| 5 | Statystyki opisowe długości recenzji | Nawiązanie do Wykładu 1 — średnia, mediana, odchylenie std |
| 6 | Porównanie słownictwa: pozytywne vs negatywne | Zbiory (`set`), różnica zbiorów |
| 7 | Filtrowanie "słów szumu" (stopwords) | Listy wykluczeń, czyszczenie danych |
| 8 | Ranking recenzji po liczbie słów kluczowych | Łączenie wcześniejszych funkcji |
| 🏆 Bonus | Zrównoleglenie word count przez `concurrent.futures` | `ProcessPoolExecutor`, podział danych na chunki |

---

## 💡 Fragment kodu — przykład ze startera

```python
import random
from collections import defaultdict

random.seed(42)

# --- Generowanie syntetycznych recenzji (fragment) ---
pozytywne_zdania = [
    "Świetny film, polecam każdemu!",
    "Aktorzy zagrali fenomenalnie, fabuła wciągająca.",
]
negatywne_zdania = [
    "Strasznie nudny film, szkoda czasu.",
    "Fabuła bez sensu, aktorstwo słabe.",
]

def wygeneruj_recenzje(n: int) -> list[dict]:
    recenzje = []
    for i in range(n):
        sentyment = random.choice(["pozytywna", "negatywna"])
        zdania = pozytywne_zdania if sentyment == "pozytywna" else negatywne_zdania
        tekst = random.choice(zdania)
        recenzje.append({"review_id": i, "text": tekst, "sentiment": sentyment})
    return recenzje

recenzje = wygeneruj_recenzje(2000)
print(f"Wygenerowano {len(recenzje)} recenzji")

# --- Guided example: manualny MapReduce word count ---
def map_reduce_word_count(teksty: list[str]) -> dict[str, int]:
    mapped = [(slowo, 1) for tekst in teksty for slowo in tekst.lower().split()]
    grouped: dict[str, list[int]] = defaultdict(list)
    for slowo, wartosc in mapped:
        grouped[slowo].append(wartosc)
    return {slowo: sum(wartosci) for slowo, wartosci in grouped.items()}

wyniki = map_reduce_word_count([r["text"] for r in recenzje[:5]])
print(wyniki)
```

---

## 🚀 Co dalej?

To był MapReduce "na piechotę" — czysty Python, jedna maszyna, ręczne fazy map/shuffle/reduce. Na **Wykładzie 4** zobaczysz, jak dokładnie ten sam pomysł wygląda w **Apache Spark (PySpark)** — te same koncepcje, ale zoptymalizowane, rozproszone i dużo szybsze!

---

<Admonition type="tip" title="Pro tip">
  Zanim sięgniesz po Sparka w prawdziwym projekcie — spróbuj najpierw rozwiązać problem w czystym Pythonie na próbce danych. Jeśli rozumiesz, *co* robi `map` i `reduce` ręcznie, PySpark będzie dla Ciebie po prostu wygodniejszym API do tego samego pomysłu.
</Admonition>

Semestr: Zimowy 2026/2027
