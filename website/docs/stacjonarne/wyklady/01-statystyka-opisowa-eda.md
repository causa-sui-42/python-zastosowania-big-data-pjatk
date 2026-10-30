---
id: 01-statystyka-opisowa-eda
title: "Wykład 1: Statystyka opisowa i eksploracyjna analiza danych"
sidebar_label: "01 — Statystyka opisowa"
description: "Wprowadzenie do statystyki opisowej, rozkładów prawdopodobieństwa i EDA — fundamenty analizy danych w Pythonie."
---

import Admonition from '@theme/Admonition';

# Wykład 1: Statystyka opisowa i eksploracyjna analiza danych

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Podstawowy &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Dlaczego **statystyka opisowa** to pierwszy krok w każdym projekcie Data Science / Big Data
- Jak obliczać i interpretować **miary tendencji centralnej** (średnia, mediana, moda)
- Jak obliczać i interpretować **miary rozproszenia** (wariancja, odchylenie standardowe, kwantyle)
- Czym są **rozkłady prawdopodobieństwa** (normalny, jednostajny, Poissona, wykładniczy) i gdzie je spotkasz
- Jak przeprowadzić **eksploracyjną analizę danych (EDA)** w pandas krok po kroku
- Jak unikać najczęstszych pułapek statystycznych (skośność, korelacja vs przyczynowość, mała próba)
- Jaka jest **intuicja wnioskowania statystycznego** — przedział ufności, hipoteza zerowa i p-wartość

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie PDF. Możesz je otworzyć bezpośrednio w przeglądarce lub pobrać.
</Admonition>

📄 **[Otwórz slajdy PDF](pathname:///stacjonarne/pdfs/wyk01-statystyka-opisowa-eda.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Dlaczego statystyka opisowa?

Zanim wytrenujesz jakikolwiek model Machine Learning, zanim napiszesz zapytanie Spark SQL na miliardach rekordów — musisz **zrozumieć swoje dane**. Statystyka opisowa to zestaw narzędzi, które pozwalają szybko odpowiedzieć na pytania: gdzie jest "środek" danych, jak bardzo są rozrzucone i czy coś w nich jest nietypowe.

**Statystyka opisowa** różni się od **wnioskowania statystycznego** (którego intuicję poznamy pod koniec tego wykładu) tym, że nie wyciąga wniosków poza posiadaną próbę — jedynie ją podsumowuje.

Bez tego kroku:
- Model ML może "dziwnie" się zachowywać, bo nie zauważyłeś braków danych
- Możesz podjąć błędną decyzję biznesową, bo średnia została zniekształcona przez outlier
- Big Data bez EDA to po prostu... dużo niezrozumianych liczb

---

### 2. Populacja, próba i typy zmiennych

**Populacja** to wszystkie możliwe obserwacje danego zjawiska (np. wszyscy amatorscy maratończycy na świecie). **Próba** to podzbiór, na którym faktycznie pracujemy — np. wyniki jednego konkretnego maratonu z 1200 zawodnikami.

Prawie zawsze pracujemy na próbie i staramy się wnioskować o populacji — to jest fundament całej statystyki.

| Typ zmiennej | Opis | Przykład |
|--------------|------|----------|
| **Numeryczna ciągła** | Dowolna wartość w zakresie | czas ukończenia maratonu (min) |
| **Numeryczna dyskretna** | Wartości całkowite, policzalne | liczba maratonów w karierze zawodnika |
| **Kategoryczna nominalna** | Kategorie bez naturalnego porządku | płeć, miasto startu |
| **Kategoryczna porządkowa** | Kategorie z naturalnym porządkiem | kategoria wiekowa (18-29, 30-39, ...) |

```python
import pandas as pd

df = pd.read_csv("maratony.csv")
df.dtypes                                     # jaki typ ma każda kolumna?
df['kategoria_wiekowa'] = df['kategoria_wiekowa'].astype('category')
```

---

### 3. Miary tendencji centralnej

| Miara | Opis | Przykład w Pythonie | Wrażliwość na outliery |
|-------|------|---------------------|-------------------------|
| **Średnia** | Suma wartości / liczba obserwacji | `df['czas_min'].mean()` | Wysoka |
| **Mediana** | Środkowa wartość po posortowaniu | `df['czas_min'].median()` | Niska |
| **Moda** | Najczęściej występująca wartość | `df['kategoria_wiekowa'].mode()` | Nie dotyczy |

**Złota zasada:** zawsze porównuj średnią i medianę. Jeśli znacznie się różnią, oznacza to skośność rozkładu albo obecność wartości odstających (outlierów).

```python
czasy = df['czas_min']
roznica = czasy.mean() - czasy.median()
print(f"Różnica średnia-mediana: {roznica:.1f} min")
if abs(roznica) > 5:
    print("⚠️ Prawdopodobna skośność lub outliery — sprawdź boxplot!")
```

---

### 4. Miary rozproszenia

Sam "środek" danych to za mało — musimy wiedzieć, jak bardzo dane są rozrzucone wokół niego.

| Miara | Opis | Przykład w Pythonie |
|-------|------|---------------------|
| **Wariancja** | Średni kwadrat odchylenia od średniej | `df['czas_min'].var()` |
| **Odchylenie standardowe** | Pierwiastek z wariancji — wraca do oryginalnych jednostek | `df['czas_min'].std()` |
| **Kwantyle** | Wartości dzielące dane na równe części (Q1, Q2/mediana, Q3) | `df['czas_min'].quantile([0.25, 0.5, 0.75])` |
| **IQR** | Rozstęp międzykwartylowy (Q3 − Q1) — podstawa wykrywania outlierów | `q3 - q1` |

Zasada wykrywania outlierów metodą IQR: wartość jest odstająca, jeśli jest mniejsza niż `Q1 − 1.5×IQR` lub większa niż `Q3 + 1.5×IQR`.

---

### 5. Rozkłady prawdopodobieństwa

**Rozkład** opisuje, jak często poszczególne wartości pojawiają się w zbiorze danych. Znajomość rozkładu pomaga przewidzieć prawdopodobieństwo wystąpienia danej wartości i wykryć anomalie.

| Rozkład | Charakterystyka | Przykład zastosowania |
|---------|------------------|------------------------|
| **Normalny (Gaussa)** | Symetryczny, "krzywa dzwonowa" | Czasy ukończenia maratonu, wzrost ludzi |
| **Jednostajny** | Wszystkie wartości równie prawdopodobne | Rzut uczciwą kostką, numery startowe |
| **Poissona** | Liczba zdarzeń w ustalonym czasie | Liczba biegaczy mijających punkt kontrolny na minutę |
| **Wykładniczy** | Czas między kolejnymi zdarzeniami | Odstępy czasowe między zawodnikami na mecie |

```python
import numpy as np
import matplotlib.pyplot as plt

czasy = np.random.normal(loc=250, scale=40, size=1200)  # μ=250 min, σ=40 min
plt.hist(czasy, bins=30, edgecolor='black')
plt.xlabel('Czas ukończenia (min)')
plt.ylabel('Liczba zawodników')
plt.title('Rozkład czasów ukończenia maratonu')
plt.show()
```

**Reguła 68-95-99.7** dla rozkładu normalnego:

| Zakres | % obserwacji |
|--------|---------------|
| μ ± 1σ | ~68% |
| μ ± 2σ | ~95% |
| μ ± 3σ | ~99.7% |

---

### 6. Eksploracyjna analiza danych (EDA) — workflow

**EDA (Exploratory Data Analysis)** to pierwszy kontakt ze zbiorem danych — zanim zaczniesz cokolwiek modelować.

```
1. Wczytaj dane           → pd.read_csv() / dane syntetyczne
2. Podejrzyj strukturę    → .head(), .info(), .dtypes
3. Sprawdź jakość danych  → braki, duplikaty, zakresy wartości
4. Policz statystyki      → .describe(), .mean(), .std()
5. Zwizualizuj            → histogram, boxplot, heatmapa
6. Wyciągnij wnioski      → co jest ciekawe? co trzeba naprawić?
```

```python
import pandas as pd

df = pd.read_csv("maratony.csv")

print(df.shape)              # (liczba wierszy, liczba kolumn)
df.info()                     # typy danych i liczba brakujących wartości
print(df.isna().sum())        # ile braków w każdej kolumnie
print(f"Duplikaty: {df.duplicated().sum()}")
print(df.describe())           # kompletna statystyka opisowa w jednej linii!
```

---

### 7. Wizualizacja danych

| Typ wykresu | Kiedy używać |
|-------------|--------------|
| **Histogram** | Pokazuje kształt rozkładu jednej zmiennej numerycznej |
| **Boxplot** | Porównuje grupy, wykrywa outliery na podstawie IQR |
| **Heatmapa korelacji** | Pokazuje siłę i kierunek zależności między zmiennymi numerycznymi |
| **Scatter plot** | Wizualizuje zależność między dwiema zmiennymi numerycznymi |

```python
import seaborn as sns

sns.boxplot(data=df, x='kategoria_wiekowa', y='czas_min')
plt.title('Czas ukończenia wg kategorii wiekowej')
plt.show()
```

Zasady dobrej wizualizacji: zawsze dodawaj tytuł, etykiety osi oraz legendę (jeśli potrzebna), a wykres dopasuj do typu danych (histogram dla rozkładu, boxplot dla porównań grup, scatter dla zależności).

---

### 8. Częste pułapki statystyczne

- **Średnia kłamie przy skośności** — jeden bardzo duży (lub mały) wynik potrafi całkowicie zniekształcić średnią. Zawsze porównuj ją z medianą.
- **Korelacja ≠ przyczynowość** — dwie zmienne mogą być silnie skorelowane z powodu trzeciego czynnika (zmienna zakłócająca), a nie dlatego, że jedna powoduje drugą.
- **Zbyt mała próba** — im mniej obserwacji, tym większa niepewność estymatorów (średniej, odchylenia std). Wnioski z 5 obserwacji o 50 000 osobach są bardzo ryzykowne.
- **Kwartet Anscombe'a** — różne zbiory danych mogą mieć identyczne statystyki opisowe, ale kompletnie inny kształt. Zawsze rysuj wykres, zanim wyciągniesz wnioski!

---

### 9. Krótko o wnioskowaniu statystycznym

Statystyka opisowa mówi, co jest **w próbie**. **Wnioskowanie statystyczne** pozwala ostrożnie powiedzieć coś o **całej populacji** — zawsze z pewną niepewnością.

- **Przedział ufności (95% CI)** — zakres wartości, który przy powtarzaniu badania w 95% przypadków obejmowałby prawdziwą średnią populacji
- **Hipoteza zerowa (H0)** — założenie „brak efektu/różnicy”, które próbujemy obalić danymi
- **p-wartość** — prawdopodobieństwo uzyskania wyniku co najmniej tak ekstremalnego, **zakładając, że H0 jest prawdziwa**. Mała p-wartość (zwykle < 0.05) → odrzucamy H0

```python
from scipy import stats

mlodzi = df.loc[df["wiek"] < 35, "czas_min"]
starsi = df.loc[df["wiek"] >= 35, "czas_min"]

wynik = stats.ttest_ind(mlodzi, starsi, equal_var=False)
print(f"p = {wynik.pvalue:.4f}")  # p < 0.05 → różnica raczej nie jest przypadkiem
```

> ⚠️ W Big Data przy milionach rekordów niemal **każda** różnica wychodzi „statystycznie istotna” — dlatego zawsze patrz też na **wielkość** różnicy i jej znaczenie praktyczne.

---

## 📚 Polecane materiały

- **Książka:** *Practical Statistics for Data Scientists* — Peter Bruce & Andrew Bruce (rozdz. 1-2)
- **Online:** [Khan Academy — Statistics](https://www.khanacademy.org/math/statistics-probability)
- **Python:** Dokumentacja pandas — [`describe()`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html), `corr()`, `quantile()`

---

## 🚀 Co dalej?

Na **Wykładzie 2 (13.10.2026)** wchodzimy w świat **Big Data** — zobaczysz, co się dzieje, gdy zamiast 1 200 maratończyków masz **miliardy rekordów**: formaty danych (CSV vs Parquet), kompresja, partycjonowanie i przechowywanie danych w Data Lake.

---

<Admonition type="note" title="Zadanie do przemyślenia">
  Masz 1200 zawodników maratonu. Średni czas ukończenia to 250 minut, a odchylenie standardowe 40 minut. Jaki procent zawodników ukończył bieg między 210 a 290 minut? (Wskazówka: reguła 68-95-99.7 dla rozkładu normalnego)
</Admonition>
