---
id: 10-mllib-zaawansowany
title: "Wykład 10: Zaawansowany MLlib — tuning hiperparametrów"
sidebar_label: "10 — MLlib zaawansowany"
description: "ParamGridBuilder, CrossValidator, TrainValidationSplit, class imbalance, GBTClassifier, AUC-PR vs AUC-ROC oraz zapis modeli MLlib."
---

import Admonition from '@theme/Admonition';

# Wykład 10: Zaawansowany MLlib — tuning hiperparametrów

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

**Zajęcia nr 10** — 08.12.2026 (wtorek)

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

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

📄 **[Otwórz slajdy PDF](/stacjonarne/pdfs/wyk10-mllib-zaawansowany.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Hiperparametry i `ParamGridBuilder`

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

### 2. `CrossValidator` vs `TrainValidationSplit`

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

### 3. Class imbalance: `weightCol` i undersampling

Przy fraud rate ~1-2% model chętnie "poświęci" klasę mniejszościową. Ważenie przykładów (`weightCol`) i undersampling to dwa sposoby przeciwdziałania temu bez utraty wszystkich danych naraz.

```python
from pyspark.sql import functions as F

fraud_weight = train_df.filter("is_fraud = 0").count() / train_df.filter("is_fraud = 1").count()

train_weighted = train_df.withColumn(
    "class_weight", F.when(F.col("is_fraud") == 1, fraud_weight).otherwise(1.0)
)

rf = RandomForestClassifier(featuresCol="features", labelCol="is_fraud", weightCol="class_weight")
```

### 4. `GBTClassifier`

Gradient-Boosted Trees trenują drzewa sekwencyjnie, każde kolejne poprawiając błędy poprzednich. Obsługuje wyłącznie klasyfikację binarną w MLlib — idealnie pasuje do wykrywania fraudów.

```python
from pyspark.ml.classification import GBTClassifier

gbt = GBTClassifier(featuresCol="features", labelCol="is_fraud", maxIter=50, maxDepth=5, seed=42)
```

### 5. AUC-ROC vs AUC-PR

| Metryka | Uwzględnia | Wrażliwa na imbalance? |
|---------|------------|--------------------------|
| AUC-ROC | TPR i FPR (w tym True Negatives) | ❌ Mało — dominacja TN "maskuje" słabości |
| AUC-PR | Precision i Recall klasy pozytywnej | ✅ Bardzo — realna jakość na rzadkiej klasie |

### 6. Zapis i odczyt modelu

```python
best_model.write().overwrite().save("/tmp/cardshield_best_model")

from pyspark.ml import PipelineModel
loaded_model = PipelineModel.load("/tmp/cardshield_best_model")
```

### 7. Skalowanie CrossValidator

| Czynnik | Wpływ na czas |
|---------|---------------|
| `numFolds` × rozmiar siatki | Liniowo więcej treningów |
| Brak `.cache()` na danych treningowych | Kosztowne przeliczanie przy każdym foldzie |
| `parallelism` | Szybciej, ale więcej zasobów klastra naraz |

### 8. Najczęstsze pułapki

- Ocena wyłącznie przez AUC-ROC na mocno niezbalansowanych danych
- Zbyt duża siatka `ParamGridBuilder` prowadząca do eksplozji liczby treningów
- Brak `.cache()` na `train_df` przed `CrossValidator.fit()`
- Trzymanie się progu decyzyjnego 0.5 bez analizy kosztów FP/FN
- Zbyt agresywne wagi klas prowadzące do nadmiernej liczby fałszywych alarmów

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego model ze świetnym AUC-ROC może być bezużyteczny do wykrywania fraudów?
2. Co się stanie z czasem trenowania, jeśli podwoisz rozmiar siatki `ParamGridBuilder` przy `numFolds=5`?
3. Kiedy `TrainValidationSplit` jest rozsądnym kompromisem zamiast `CrossValidator`?
:::

---

## 📚 Polecane materiały

- [Spark ML Tuning Guide](https://spark.apache.org/docs/latest/ml-tuning.html)
- [pyspark.ml.classification.GBTClassifier](https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.ml.classification.GBTClassifier.html)
- [pyspark.ml.evaluation.BinaryClassificationEvaluator](https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.ml.evaluation.BinaryClassificationEvaluator.html)

---

## ➡️ Co dalej?

Na dzisiejszych **ćwiczeniach** zbudujesz pełny pipeline MLlib z tuningiem hiperparametrów do **wykrywania fraudów transakcji kartą płatniczą** na ~500 000 transakcji 💳🕵️.

Na **Wykładzie 11 (15.12.2026)** przechodzimy do **Cloud Computing i GCP** — BigQuery i Dataproc!

<Admonition type="tip" title="Przed następnymi zajęciami">
  Upewnij się, że rozumiesz różnicę między AUC-ROC a AUC-PR — na Wykładzie 11 porównamy lokalny tuning z uruchamianiem zadań Spark w chmurze (Dataproc).
</Admonition>

Semestr: Zimowy 2026/2027
