---
id: 05-mllib-spark-ml
title: "Wykład 5: Machine Learning na dużych zbiorach — MLlib w Spark"
sidebar_label: "05 — MLlib & Spark ML"
description: "Spark MLlib: Pipelines, VectorAssembler, klasyfikacja, regresja, ewaluacja i tuning modeli na dużych danych."
---

import Admonition from '@theme/Admonition';
import DocImage from '@site/src/components/DocImage';

# Wykład 5: Machine Learning na dużych zbiorach — MLlib w Spark

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Dlaczego **scikit-learn nie wystarczy** na terabajtowe zbiory danych
- Jak używać **Spark MLlib** (spark.ml) do budowania modeli ML na klastrze
- Jak przygotować dane z **VectorAssembler**, **StringIndexer**, **OneHotEncoder**, **StandardScaler**
- Jak budować **ML Pipelines** w Spark (stages, fit, transform)
- Jak trenować modele: **LogisticRegression**, **RandomForest**, **GBT**
- Jak **ewaluować** modele: BinaryClassificationEvaluator, MulticlassClassificationEvaluator
- Jak **tuningować** hiperparametry: ParamGridBuilder, CrossValidator

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie PDF. Możesz je otworzyć bezpośrednio w przeglądarce lub pobrać.
</Admonition>

📄 **[Otwórz slajdy PDF](/zaoczne/pdfs/wyk5-mllib-spark-ml-intermediate.pdf)**

---

## 🗂️ Zakres wykładu

### 1. scikit-learn vs MLlib

<DocImage src="/img/sklearn-vs-mllib.svg" alt="scikit-learn vs Spark MLlib" style={{maxWidth: '100%', margin: '1rem 0'}} />

| Cecha | scikit-learn | Spark MLlib |
|-------|-------------|-------------|
| Skala | Jeden komputer | Klaster (TB+) |
| API | fit/predict | fit/transform (Pipeline) |
| Dane | pandas DataFrame | Spark DataFrame |
| Feature prep | ColumnTransformer | VectorAssembler |

### 2. ML Pipelines

```python
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler, StringIndexer
from pyspark.ml.classification import RandomForestClassifier

pipeline = Pipeline(stages=[
    StringIndexer(inputCol="kategoria", outputCol="kategoria_idx"),
    VectorAssembler(inputCols=["wiek", "dochod", "kategoria_idx"], outputCol="features"),
    RandomForestClassifier(featuresCol="features", labelCol="churn")
])

model = pipeline.fit(train_df)
predictions = model.transform(test_df)
```

### 3. Ewaluacja i Tuning

CrossValidator + ParamGridBuilder do automatycznego wyszukiwania najlepszych hiperparametrów.

---

## 📚 Dalsze czytanie

- [Spark MLlib Guide](https://spark.apache.org/docs/latest/ml-guide.html)
- [MLlib API Reference](https://spark.apache.org/docs/latest/api/python/reference/pyspark.ml.html)

---

## ➡️ Co dalej?

W **Laboratorium 5** zbudujesz model churn prediction dla TelekomPL na 500k rekordów. Następnie — **Wykład 6: Cloud Computing i GCP**!
