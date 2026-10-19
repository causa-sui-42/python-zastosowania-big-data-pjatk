---
id: 01-eda-statystyki-sportowe
title: "Lab 1: EDA — Statystyki sportowe"
sidebar_label: "Lab 1 — EDA sportowe"
description: "Praktyczne zastosowanie statystyki opisowej i EDA na syntetycznym zbiorze danych o maratonach amatorskich."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 1: EDA — Statystyki sportowe

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Podstawowy &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

W tym laboratorium przeprowadzisz **eksploracyjną analizę danych (EDA)** na syntetycznym zbiorze wyników amatorskiego maratonu, korzystając z NumPy, pandas, matplotlib i seaborn.

Po wykonaniu ćwiczenia będziesz potrafić:

- Wygenerować i wczytać zbiór danych sportowych
- Obliczać miary tendencji centralnej (średnia, mediana, moda) i rozproszenia (wariancja, odchylenie std, kwantyle)
- Wykrywać wartości odstające (outliery) metodą IQR
- Tworzyć wizualizacje statystyczne (histogramy, boxploty, heatmapy korelacji)
- Grupować dane i porównywać kategorie zawodników

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-01-eda-statystyki-sportowe.ipynb">📥 <strong>Pobierz: cw-01-eda-statystyki-sportowe.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Notebook generuje syntetyczny (ale realistyczny) zbiór danych o ~1300 zawodnikach amatorskiego maratonu — bezpośrednio w Google Colab, bez pobierania plików z zewnątrz.

| Kolumna | Opis | Typ |
|---------|------|-----|
| `zawodnik_id` | Unikalny numer startowy | int |
| `wiek` | Wiek zawodnika (lata) | int |
| `plec` | Płeć (K/M) | category |
| `czas_min` | Czas ukończenia maratonu (minuty) | float |
| `tempo_min_km` | Tempo biegu (minuty/km) | float |
| `kategoria_wiekowa` | Kategoria wiekowa (18-29, 30-39, 40-49, 50-59, 60+) | category |
| `miejsce` | Pozycja w klasyfikacji generalnej | int |
| `rok` | Rok zawodów (2026) | int |

---

## 📋 Zadania

Notebook zawiera **8 głównych ćwiczeń** oraz wyzwanie bonusowe:

| Nr | Temat | Koncepty |
|----|-------|----------|
| 1 | Pierwszy rzut oka na dane | `shape`, `columns`, `describe()` |
| 2 | Miary tendencji centralnej | `mean()`, `median()`, `mode()` |
| 3 | Miary rozproszenia i IQR | `var()`, `std()`, `quantile()`, IQR |
| 4 | Wykrywanie outlierów metodą IQR | Filtrowanie DataFrame, `granica_gorna` |
| 5 | Histogram tempa biegu | `plt.hist`, `plt.axvline`, opisywanie wykresów |
| 6 | Boxplot wg kategorii wiekowej | `seaborn.boxplot`, `groupby().median()` |
| 7 | Korelacja i heatmapa | `corr()`, `seaborn.heatmap` |
| 8 | Grupowanie i agregacja wg płci | `groupby().agg(['mean', 'std', 'count'])` |
| 🏆 | Bonus: test t-Studenta dla grup wiekowych | `scipy.stats.ttest_ind` (wnioskowanie z końcówki Wykładu 1) |

---

## 💡 Fragment kodu — przykład ze startera

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

np.random.seed(42)

# Generowanie syntetycznych danych maratonu
n = 1300
wiek = np.clip(np.random.normal(loc=38, scale=9, size=n), 18, 75).astype(int)
plec = np.random.choice(['K', 'M'], size=n, p=[0.42, 0.58])
czas_min = 230 + (np.abs(wiek - 35) * 0.8) + np.random.normal(0, 25, size=n)

df = pd.DataFrame({'wiek': wiek, 'plec': plec, 'czas_min': czas_min.round(1)})

print(f"Liczba zawodników: {len(df)}")
df.describe()

# Ćwiczenie 2: Miary tendencji centralnej
print(f"Średni czas: {df['czas_min'].mean():.1f} min")
print(f"Mediana: {df['czas_min'].median():.1f} min")

# Ćwiczenie 5: Histogram tempa biegu
plt.figure(figsize=(10, 6))
plt.hist(df['czas_min'], bins=30, edgecolor='black', alpha=0.7)
plt.axvline(df['czas_min'].mean(), color='red', linestyle='--',
            label=f"Średnia: {df['czas_min'].mean():.1f}")
plt.xlabel('Czas ukończenia (min)')
plt.ylabel('Liczba zawodników')
plt.title('Rozkład czasów ukończenia maratonu')
plt.legend()
plt.show()
```

---

## 🎯 Czego się nauczysz

Po wykonaniu całego notebooka będziesz wiedzieć:

- Jak **szybko** zrozumieć nowy zbiór danych (EDA — Exploratory Data Analysis)
- Jak interpretować **boxplot** i wykrywać wartości odstające metodą IQR
- Czym jest **korelacja** i dlaczego korelacja ≠ przyczynowość
- Jak wstępnie porównać grupy (np. płeć, kategoria wiekowa) przed przeprowadzeniem formalnego testu statystycznego

---

## 🚀 Co dalej?

W bonusowym ćwiczeniu sprawdzisz testem t, czy różnice zaobserwowane dziś są **statystycznie istotne**. Na Wykładzie 2 (13.10.2026) wchodzimy w świat **Big Data** — zobaczysz, jak przechowywać i czytać dane, gdy zamiast 1 300 zawodników masz miliardy rekordów (CSV vs Parquet, partycjonowanie)!

---

<Admonition type="tip" title="Pro tip">
  Zanim porównasz dwie grupy testem statystycznym — **zawsze** najpierw zobacz je na boxplocie! Oko często wychwytuje różnicę szybciej niż p-wartość. 👀
</Admonition>
