---
id: 08-mllib-wprowadzenie
title: "Wykład 8: Spark MLlib — od podstaw po tuning hiperparametrów"
sidebar_label: "08 — MLlib"
description: "Spark MLlib: VectorAssembler, StringIndexer, OneHotEncoder, ML Pipelines, LogisticRegression, RandomForestClassifier, BinaryClassificationEvaluator oraz tuning hiperparametrów — ParamGridBuilder, CrossValidator, TrainValidationSplit, class imbalance, GBTClassifier."
---

import Admonition from '@theme/Admonition';

# Wykład 8: Spark MLlib — od podstaw po tuning hiperparametrów

**Czas trwania:** ~180 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

**Zajęcia nr 8** — 24.11.2026 (wtorek)

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
- Jak automatycznie dostrajać hiperparametry przy pomocy `ParamGridBuilder` i `CrossValidator`
- Czym różni się `CrossValidator` od `TrainValidationSplit` i kiedy wybrać który
- Jak radzić sobie z **class imbalance** w Spark: ważenie klas (`weightCol`) oraz undersampling
- Jak trenować i oceniać `GBTClassifier` (Gradient-Boosted Trees)
- Dlaczego przy mocno niezbalansowanych danych **AUC-PR** jest lepszą metryką niż AUC-ROC
- Jak zapisać i wczytać wytrenowany `PipelineModel`
- Na co uważać przy skalowaniu `CrossValidator`: cache, liczba partycji, koszt obliczeniowy

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie Markdown (Marp). Możesz je otworzyć bezpośrednio lub wyeksportować do PDF.
</Admonition>

📄 **[Otwórz slajdy PDF](/stacjonarne/pdfs/wyk08-mllib-wprowadzenie.pdf)**

---

## 🗂️ Zakres wykładu

### Część 1: Wprowadzenie do Spark MLlib

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

### 6. Najczęstsze pułapki (wprowadzenie)

- Brak `VectorAssembler` przed modelem — MLlib nie przyjmuje "gołych" kolumn
- `StringIndexer` bez `OneHotEncoder` — model liniowy widzi fałszywą kolejność kategorii
- `fit()` przed podziałem na train/test — data leakage
- Mylenie `rawPrediction` z `prediction` przy konfiguracji evaluatora

### Część 2: Tuning hiperparametrów i CrossValidator

### 7. Hiperparametry i `ParamGridBuilder`

**Hiperparametr** to ustawienie modelu wybrane przed treningiem, którego model nie uczy się z danych (np. `numTrees`, `maxDepth`). `ParamGridBuilder` buduje siatkę wszystkich kombinacji hiperparametrów do przetestowania.

```python
from pyspark.ml.tuning import ParamGridBuilder
from pyspark.ml.classification import RandomForestClassifier

rf = RandomForestClassifier(featuresCol="features", labelCol="is_fraud")

grid = (
    ParamGridBuilder()
    .addGrid(rf.numTrees, [50, 100, 200])
    .addGrid(rf.maxDepth, [5, 8, 12])
    .build()
)
```

### 8. `CrossValidator` vs `TrainValidationSplit`

| Cecha | `CrossValidator` | `TrainValidationSplit` |
|-------|-------------------|--------------------------|
| Liczba treningów | `numFolds × len(grid)` | `len(grid)` |
| Solidność oceny | Wysoka (k-fold) | Niższa (jeden podział) |
| Kiedy używać | Mniejsze dane, dokładniejsza ocena | Bardzo duże dane, szybka iteracja |

```python
from pyspark.ml.tuning import CrossValidator
from pyspark.ml.evaluation import BinaryClassificationEvaluator

evaluator = BinaryClassificationEvaluator(
    labelCol="is_fraud", rawPredictionCol="rawPrediction", metricName="areaUnderPR"
)

cv = CrossValidator(
    estimator=pipeline, estimatorParamMaps=grid,
    evaluator=evaluator, numFolds=3, parallelism=2, seed=42,
)

cv_model = cv.fit(train_df.cache())
best_model = cv_model.bestModel  # gotowy PipelineModel
```

### 9. Class imbalance: `weightCol` i undersampling

Przy fraud rate ~1-2% model chętnie "poświęci" klasę mniejszościową. Ważenie przykładów (`weightCol`) i undersampling to dwa sposoby przeciwdziałania temu bez utraty wszystkich danych naraz.

```python
from pyspark.sql import functions as F

fraud_weight = train_df.filter("is_fraud = 0").count() / train_df.filter("is_fraud = 1").count()

train_weighted = train_df.withColumn(
    "class_weight", F.when(F.col("is_fraud") == 1, fraud_weight).otherwise(1.0)
)

rf = RandomForestClassifier(featuresCol="features", labelCol="is_fraud", weightCol="class_weight")
```

### 10. `GBTClassifier`

Gradient-Boosted Trees trenują drzewa sekwencyjnie, każde kolejne poprawiając błędy poprzednich. Obsługuje wyłącznie klasyfikację binarną w MLlib — idealnie pasuje do wykrywania fraudów.

```python
from pyspark.ml.classification import GBTClassifier

gbt = GBTClassifier(featuresCol="features", labelCol="is_fraud", maxIter=50, maxDepth=5, seed=42)
```

### 11. AUC-ROC vs AUC-PR

| Metryka | Uwzględnia | Wrażliwa na imbalance? |
|---------|------------|--------------------------|
| AUC-ROC | TPR i FPR (w tym True Negatives) | ❌ Mało — dominacja TN "maskuje" słabości |
| AUC-PR | Precision i Recall klasy pozytywnej | ✅ Bardzo — realna jakość na rzadkiej klasie |

### 12. Zapis i odczyt modelu

```python
best_model.write().overwrite().save("/tmp/cardshield_best_model")

from pyspark.ml import PipelineModel
loaded_model = PipelineModel.load("/tmp/cardshield_best_model")
```

### 13. Skalowanie CrossValidator

| Czynnik | Wpływ na czas |
|---------|---------------|
| `numFolds` × rozmiar siatki | Liniowo więcej treningów |
| Brak `.cache()` na danych treningowych | Kosztowne przeliczanie przy każdym foldzie |
| `parallelism` | Szybciej, ale więcej zasobów klastra naraz |

### 14. Najczęstsze pułapki (tuning)

- Ocena wyłącznie przez AUC-ROC na mocno niezbalansowanych danych
- Zbyt duża siatka `ParamGridBuilder` prowadząca do eksplozji liczby treningów
- Brak `.cache()` na `train_df` przed `CrossValidator.fit()`
- Trzymanie się progu decyzyjnego 0.5 bez analizy kosztów FP/FN
- Zbyt agresywne wagi klas prowadzące do nadmiernej liczby fałszywych alarmów

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego `StringIndexer` sam w sobie może wprowadzić model w błąd?
2. Co się stanie, jeśli wywołasz `pipeline.fit()` na całym zbiorze danych zamiast tylko na zbiorze treningowym?
3. Kiedy `RandomForestClassifier` jest lepszym wyborem niż `LogisticRegression`, a kiedy odwrotnie?
4. Dlaczego model ze świetnym AUC-ROC może być bezużyteczny do wykrywania fraudów?
5. Co się stanie z czasem trenowania, jeśli podwoisz rozmiar siatki `ParamGridBuilder` przy `numFolds=5`?
6. Kiedy `TrainValidationSplit` jest rozsądnym kompromisem zamiast `CrossValidator`?
:::

---

## 📚 Polecane materiały

- [Spark MLlib Guide](https://spark.apache.org/docs/latest/ml-guide.html)
- [MLlib API Reference (pyspark.ml)](https://spark.apache.org/docs/latest/api/python/reference/pyspark.ml.html)
- [Pipelines w Spark ML](https://spark.apache.org/docs/latest/ml-pipeline.html)
- [Spark ML Tuning Guide](https://spark.apache.org/docs/latest/ml-tuning.html)
- [pyspark.ml.classification.GBTClassifier](https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.ml.classification.GBTClassifier.html)
- [pyspark.ml.evaluation.BinaryClassificationEvaluator](https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.ml.evaluation.BinaryClassificationEvaluator.html)

---

## ➡️ Co dalej?

Na dzisiejszych **ćwiczeniach** zbudujesz pełny pipeline MLlib — od podstawowego modelu, przez tuning hiperparametrów — do predykcji **kliknięć w reklamy (CTR)** na ~300 000 wyświetleń reklamowych 📱🖱️ oraz do **wykrywania fraudów transakcji kartą płatniczą** na ~500 000 transakcji 💳🕵️.

Na **Wykładzie 9 (01.12.2026)** przechodzimy do **Cloud Computing i GCP** — BigQuery i Dataproc!

<Admonition type="tip" title="Przed następnymi zajęciami">
  Upewnij się, że rozumiesz różnicę między AUC-ROC a AUC-PR — na Wykładzie 9 porównamy lokalny tuning z uruchamianiem zadań Spark w chmurze (Dataproc).
</Admonition>

Semestr: Zimowy 2026/2027
