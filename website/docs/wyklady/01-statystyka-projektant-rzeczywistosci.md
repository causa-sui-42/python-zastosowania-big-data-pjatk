---
id: 01-statystyka-projektant-rzeczywistosci
title: "Wykład 1: Statystyka — Projektant Rzeczywistości"
sidebar_label: "01 — Statystyka"
description: "Wprowadzenie do statystyki opisowej i wnioskowania — fundamenty analizy danych i Data Science."
---

import Admonition from '@theme/Admonition';

# Wykład 1: Statystyka — Projektant Rzeczywistości

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Podstawowy &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Dlaczego **statystyka** jest fundamentem Data Science i Big Data
- Czym różni się **statystyka opisowa** od **wnioskowania statystycznego**
- Jak interpretować **miary tendencji centralnej** (średnia, mediana, moda)
- Co to są **rozkłady prawdopodobieństwa** i dlaczego są ważne
- Jak używać statystyki do **podejmowania decyzji** w oparciu o dane

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie PDF. Możesz je otworzyć bezpośrednio w przeglądarce lub pobrać.
</Admonition>

📄 **[Otwórz slajdy PDF](/pdfs/wyk1-statystyka-projektant-rzeczywistosci.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Dlaczego statystyka?

Statystyka to **język, którym mówią dane**. Bez statystyki:

- Nie zrozumiesz, czy wzrost sprzedaży to przypadek, czy rzeczywisty trend
- Nie ocenisz, czy model ML naprawdę działa, czy tylko "zgaduje"
- Nie podejmiesz trafnej decyzji biznesowej w warunkach niepewności

**Statystyka to projektant rzeczywistości** — pozwala nam budować modele świata z niepełnych, zaszumionych danych.

---

### 2. Statystyka opisowa

**Statystyka opisowa** podsumowuje i wizualizuje dane **bez wyciągania wniosków poza zbiór**.

Podstawowe miary:

| Miara | Opis | Przykład w Pythonie |
|-------|------|-------------------|
| **Średnia** | Wartość centralna | `df['wiek'].mean()` |
| **Mediana** | Środkowa wartość po posortowaniu | `df['wiek'].median()` |
| **Moda** | Najczęstsza wartość | `df['miasto'].mode()` |
| **Wariancja** | Rozrzut wokół średniej | `df['wiek'].var()` |
| **Odchylenie std** | Pierwiastek z wariancji | `df['wiek'].std()` |
| **Kwantyle** | Percentyle (Q1, Q2/mediana, Q3) | `df['wiek'].quantile([0.25, 0.5, 0.75])` |

---

### 3. Rozkłady prawdopodobieństwa

**Rozkład** opisuje, jak często różne wartości występują w zbiorze danych.

Najważniejsze rozkłady:

- **Rozkład normalny (Gaussa)** — większość zjawisk naturalnych (wzrost ludzi, błędy pomiarowe)
- **Rozkład jednostajny** — wszystkie wartości równie prawdopodobne (rzut kostką)
- **Rozkład Poissona** — liczba zdarzeń w czasie (liczba klientów/godzinę)
- **Rozkład wykładniczy** — czas między zdarzeniami (czas życia sprzętu)

```python
import numpy as np
import matplotlib.pyplot as plt

# Próbka z rozkładu normalnego
dane = np.random.normal(loc=100, scale=15, size=1000)
plt.hist(dane, bins=30, edgecolor='black')
plt.xlabel('Wartość')
plt.ylabel('Częstość')
plt.title('Rozkład normalny (μ=100, σ=15)')
plt.show()
```

---

### 4. Wnioskowanie statystyczne

**Wnioskowanie** to wyciąganie wniosków o **całej populacji** na podstawie **próby**.

Kluczowe koncepty:

- **Przedział ufności** — z 95% pewnością prawdziwa średnia mieści się tu
- **Testy hipotez** — czy różnica między grupami jest statystycznie istotna?
- **p-wartość** — prawdopodobieństwo, że wynik to przypadek (p < 0.05 = znaczący)

Przykład: Chcesz wiedzieć, czy nowa kampania reklamowa zwiększyła sprzedaż. Testujesz **hipotezę zerową** (H0): "kampania nie ma wpływu".

---

### 5. Praktyczne zastosowania

| Dziedzina | Zastosowanie statystyki |
|-----------|------------------------|
| **Marketing** | A/B testing — która wersja strony daje więcej konwersji? |
| **Finanse** | VaR (Value at Risk) — maksymalna strata z 95% prawdopodobieństwem |
| **Medycyna** | Testy kliniczne — czy lek naprawdę działa? |
| **Data Science** | Walidacja modeli ML — confusion matrix, AUC, F1-score |
| **Big Data** | Statystyki próbkowe — szacowanie parametrów z milionów rekordów |

---

## 📚 Polecane materiały

- **Książka:** *Practical Statistics for Data Scientists* — Peter Bruce & Andrew Bruce
- **Online:** [Khan Academy — Statistics](https://www.khanacademy.org/math/statistics-probability)
- **Python:** Dokumentacja NumPy i pandas — `describe()`, `corr()`, `cov()`

---

## 🚀 Co dalej?

W następnym wykładzie przejdziemy do **Big Data** — zobaczysz, jak statystyka skaluje się do miliardów rekordów z Apache Spark!

---

<Admonition type="note" title="Zadanie do przemyślenia">
  Zbierasz dane o 1000 klientach. Średni wiek to 35 lat, a odchylenie standardowe 12 lat. Jaki procent klientów ma między 23 a 47 lat? (Wskazówka: reguła 68-95-99.7 dla rozkładu normalnego)
</Admonition>
