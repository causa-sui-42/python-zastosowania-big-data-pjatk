---
id: 06-feature-engineering-ml
title: "Wykład 6: Przygotowanie danych do ML — Feature Engineering"
sidebar_label: "06 — Feature Engineering"
description: "Encoding, skalowanie, tworzenie nowych cech, Pipeline i ColumnTransformer w scikit-learn — na przykładzie statystyk e-sportowych."
---

import Admonition from '@theme/Admonition';

# Wykład 6: Przygotowanie danych do ML — Feature Engineering

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

**Zajęcia nr 6** — 10.11.2026 (wtorek)

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Gdzie w **ML workflow** mieści się feature engineering i dlaczego to często najważniejszy krok
- Jak obsługiwać **brakujące wartości** przy pomocy `SimpleImputer` (median/mode)
- Jak kodować zmienne kategoryczne: **OneHotEncoder** (nominalne) vs **OrdinalEncoder** (uporządkowane, np. ranga gracza)
- Jak skalować cechy numeryczne: **StandardScaler** vs **MinMaxScaler**
- Jak tworzyć nowe cechy: **ratio**, **binning** (`pd.cut`), **cechy wielomianowe** (`PolynomialFeatures`)
- Podstawy radzenia sobie z **niezbalansowanymi klasami**
- Jak składać transformacje w `sklearn.pipeline.Pipeline` i `ColumnTransformer`
- Dlaczego kolejność **train/test split** ma znaczenie i czym jest **data leakage**

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie Markdown (Marp). Możesz je otworzyć bezpośrednio lub wyeksportować do PDF.
</Admonition>

📄 **[Otwórz slajdy PDF](/stacjonarne/pdfs/wyk06-feature-engineering-ml.pdf)**

---

## 🗂️ Zakres wykładu

### 1. ML workflow i miejsce feature engineering

```
Surowe dane → EDA → Czyszczenie → Feature Engineering
           → Train/Test Split → Trenowanie modelu → Ewaluacja
```

Dobre cechy potrafią przynieść większy wzrost jakości modelu niż zmiana algorytmu.

### 2. Brakujące wartości

| Strategia | Kiedy stosować |
|-----------|----------------|
| `SimpleImputer(strategy="median")` | Cechy numeryczne, odporne na outliers |
| `SimpleImputer(strategy="most_frequent")` | Cechy kategoryczne |
| Kategoria `"nieznany"` | Duży % braków — sam brak może być sygnałem |

### 3. Encoding zmiennych kategorycznych

| Encoder | Zastosowanie | Przykład z e-sportu |
|---------|--------------|----------------------|
| `OneHotEncoder` | Kategorie bez porządku | `country` |
| `OrdinalEncoder` | Kategorie z naturalnym porządkiem | `rank` (Brąz → Wyzwanie) |
| `LabelEncoder` | Głównie do kodowania targetu `y` | klasa wygrana/przegrana |

### 4. Skalowanie i normalizacja

```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

scaler = StandardScaler()   # mean=0, std=1 — najczęstszy wybór
minmax = MinMaxScaler()     # skaluje do [0, 1]
```

### 5. Tworzenie nowych cech

- **Ratio**: `df["kda_per_hour"] = df["kda"] / df["hours_per_week"]`
- **Binning**: `pd.cut(df["hours_per_week"], bins=[...], labels=[...])`
- **Cechy wielomianowe**: `PolynomialFeatures(degree=2)`

### 6. Niezbalansowane klasy

`class_weight="balanced"`, oversampling (SMOTE), zmiana metryki na F1 lub precision-recall AUC zamiast accuracy.

### 7. `Pipeline` + `ColumnTransformer`

```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder, OrdinalEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier

numeric_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
])

preprocessor = ColumnTransformer(transformers=[
    ("num", numeric_transformer, numeric_features),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
    ("ord", OrdinalEncoder(categories=[rank_order]), ordinal_features),
])

full_pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(random_state=42)),
])

full_pipeline.fit(X_train, y_train)
```

### 8. Train/test split i data leakage

Wszystkie transformacje (`fit`) wykonujemy **wyłącznie** na `X_train`. `fit_transform()` na całym zbiorze przed splitem to najczęstsza przyczyna sztucznie zawyżonych wyników.

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego `rank` gracza kodujemy `OrdinalEncoder`, a `country` — `OneHotEncoder`?
2. Co dokładnie oznacza "data leakage" i dlaczego `scaler.fit()` na całym zbiorze jest błędem?
3. Kiedy binning (`pd.cut`) pomaga modelowi, a kiedy szkodzi?
:::

---

## 📚 Polecane materiały

- [scikit-learn — Preprocessing data](https://scikit-learn.org/stable/modules/preprocessing.html)
- [scikit-learn — ColumnTransformer](https://scikit-learn.org/stable/modules/compose.html#columntransformer-for-heterogeneous-data)
- [scikit-learn — Pipelines](https://scikit-learn.org/stable/modules/compose.html#pipeline)
- [Kaggle — Feature Engineering course](https://www.kaggle.com/learn/feature-engineering)

---

## ➡️ Co dalej?

Na dzisiejszych **ćwiczeniach** zbudujesz kompletny `Pipeline` feature engineering na zbiorze ~5000 syntetycznych graczy e-sportowych 🎮 — imputacja, encoding rangi, nowe cechy i poprawny train/test split.

Na **Wykładzie 7 (17.11.2026)** przechodzimy do **Modeli ML: klasyfikacja, regresja i ewaluacja** — wykorzystamy dziś przygotowane cechy do trenowania prawdziwych modeli!

Semestr: Zimowy 2026/2027
