---
id: 09-mllib-wprowadzenie
title: "Wykład 9: Spark MLlib — Machine Learning na dużą skalę"
sidebar_label: "09 — MLlib wprowadzenie"
description: "Spark MLlib: VectorAssembler, StringIndexer, OneHotEncoder, ML Pipelines, LogisticRegression, RandomForestClassifier i BinaryClassificationEvaluator."
---

import Admonition from '@theme/Admonition';

# Wykład 9: Spark MLlib — Machine Learning na dużą skalę

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

**Zajęcia nr 9** — 01.12.2026 (wtorek)

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Dlaczego **scikit-learn nie skaluje się** poza pamięć jednej maszyny
- Jak zbudowana jest **Spark MLlib** (`pyspark.ml`) — Transformer, Estimator, Pipeline, Evaluator
- Jak przygotować dane pod ML: `VectorAssembler`, `StringIndexer`, `OneHotEncoder`
- Jak budować i uruchamiać **ML Pipeline** (`fit`/`transform`)
- Jak trenować modele: `LogisticRegression`, `RandomForestClassifier`
- Jak ewaluować model klasyfikacji binarnej: `BinaryClassificationEvaluator` (AUC)
- Czym różni się workflow **scikit-learn** od **MLlib** — i gdzie leżą typowe pułapki

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie Markdown (Marp). Możesz je otworzyć bezpośrednio lub wyeksportować do PDF.
</Admonition>

📄 **[Otwórz slajdy PDF](/stacjonarne/pdfs/wyk09-mllib-wprowadzenie.pdf)**

---

## 🗂️ Zakres wykładu

### 1. scikit-learn vs MLlib

| Cecha | scikit-learn | Spark MLlib |
|-------|-------------|-------------|
| Skala | Jedna maszyna (RAM) | Klaster (TB+) |
| Struktura danych | pandas DataFrame / NumPy array | Spark DataFrame |
| API | `fit()` / `predict()` | `fit()` / `transform()` |
| Feature prep | `ColumnTransformer` | `VectorAssembler` |
| Wykonanie | Jeden proces | Rozproszone (lazy evaluation) |

> 🔑 **Zasada kciuka:** Dane < 10 GB → scikit-learn. Dane > 10 GB (albo rosną) → **MLlib**!

### 2. Przygotowanie danych

`StringIndexer` koduje kolumny tekstowe na indeksy liczbowe, `OneHotEncoder` zamienia je na wektory rzadkie (bez fałszywej kolejności), a `VectorAssembler` łączy wszystkie features w jedną kolumnę wektorową — dokładny odpowiednik macierzy `X` z scikit-learn.

### 3. ML Pipeline

```python
from pyspark.ml import Pipeline
from pyspark.ml.feature import StringIndexer, OneHotEncoder, VectorAssembler
from pyspark.ml.classification import LogisticRegression

pipeline = Pipeline(stages=[
    StringIndexer(inputCol="typ_urzadzenia", outputCol="typ_urzadzenia_idx"),
    OneHotEncoder(inputCol="typ_urzadzenia_idx", outputCol="typ_urzadzenia_ohe"),
    VectorAssembler(
        inputCols=["typ_urzadzenia_ohe", "pozycja_num"],
        outputCol="features"
    ),
    LogisticRegression(featuresCol="features", labelCol="clicked")
])

model = pipeline.fit(train_df)
predictions = model.transform(test_df)
```

### 4. Modele klasyfikacji

| Model | Zalety | Wady |
|-------|--------|------|
| `LogisticRegression` | Szybki, prosty, interpretowalny | Zakłada liniowość granic decyzyjnych |
| `RandomForestClassifier` | Wychwytuje nieliniowości, odporny na outliery | Wolniejszy, więcej pamięci |

### 5. Ewaluacja modelu

```python
from pyspark.ml.evaluation import BinaryClassificationEvaluator

evaluator = BinaryClassificationEvaluator(
    labelCol="clicked", rawPredictionCol="rawPrediction", metricName="areaUnderROC"
)
auc = evaluator.evaluate(predictions)
print(f"AUC: {auc:.4f}")
```

### 6. Najczęstsze pułapki

- Brak `VectorAssembler` przed modelem — MLlib nie przyjmuje "gołych" kolumn
- `StringIndexer` bez `OneHotEncoder` — model liniowy widzi fałszywą kolejność kategorii
- `fit()` przed podziałem na train/test — data leakage
- Mylenie `rawPrediction` z `prediction` przy konfiguracji evaluatora

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego `StringIndexer` sam w sobie może wprowadzić model w błąd?
2. Co się stanie, jeśli wywołasz `pipeline.fit()` na całym zbiorze danych zamiast tylko na zbiorze treningowym?
3. Kiedy `RandomForestClassifier` jest lepszym wyborem niż `LogisticRegression`, a kiedy odwrotnie?
:::

---

## 📚 Polecane materiały

- [Spark MLlib Guide](https://spark.apache.org/docs/latest/ml-guide.html)
- [MLlib API Reference (pyspark.ml)](https://spark.apache.org/docs/latest/api/python/reference/pyspark.ml.html)
- [Pipelines w Spark ML](https://spark.apache.org/docs/latest/ml-pipeline.html)

---

## ➡️ Co dalej?

Na dzisiejszych **ćwiczeniach** zbudujesz pełny pipeline MLlib do predykcji **kliknięć w reklamy (CTR)** na ~300 000 wyświetleń reklamowych 📱🖱️.

Na **Wykładzie 10 (08.12.2026)** przechodzimy do zaawansowanego MLlib — **tuning hiperparametrów** (`ParamGridBuilder`, `CrossValidator`)!

<Admonition type="tip" title="Przed następnymi zajęciami">
  Upewnij się, że rozumiesz różnicę między `Estimator` a `Transformer` — to fundament, na którym zbudujemy tuning hiperparametrów na Wykładzie 10.
</Admonition>

Semestr: Zimowy 2026/2027
