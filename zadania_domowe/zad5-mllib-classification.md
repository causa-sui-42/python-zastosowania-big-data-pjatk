# 📝 Zadanie domowe 5 — MLlib Classification Pipeline

**Szacowany czas:** 30 minut  
**Cel:** Zbudowanie ML Pipeline w Spark MLlib

---

## 🎯 Zadanie: Klasyfikacja klientów e-commerce 🛒

Przewiduj, czy klient dokona zakupu na podstawie jego aktywności na stronie.

### Setup

```python
from pyspark.sql import SparkSession
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler, StandardScaler, StringIndexer
from pyspark.ml.classification import LogisticRegression, RandomForestClassifier
from pyspark.ml.evaluation import BinaryClassificationEvaluator

spark = SparkSession.builder.appName("CustomerPrediction").getOrCreate()

# Przykładowe dane
data = [
    (25, 5, 15.5, "mobile", 1),
    (45, 12, 45.0, "desktop", 1),
    (30, 2, 5.0, "mobile", 0),
    (50, 20, 120.0, "desktop", 1),
    (22, 1, 2.5, "tablet", 0),
    # ... więcej danych
]

columns = ["age", "pages_viewed", "time_on_site_min", "device_type", "purchased"]
df = spark.createDataFrame(data, columns)
```

### Zadania do wykonania

#### 1. 🔧 Preprocessing
- [ ] Użyj `StringIndexer` do zakodowania `device_type`
- [ ] Użyj `VectorAssembler` do połączenia wszystkich features w jeden wektor
- [ ] Przeskaluj features używając `StandardScaler`

#### 2. 🤖 Model Pipeline
- [ ] Stwórz `Pipeline` łączący wszystkie kroki preprocessing + model
- [ ] Podziel dane na train/test (70/30) używając `.randomSplit()`
- [ ] Wytrenuj `LogisticRegression` lub `RandomForestClassifier`

#### 3. 📊 Ewaluacja
- [ ] Oblicz AUC (Area Under ROC Curve) używając `BinaryClassificationEvaluator`
- [ ] Wyświetl macierz konfuzji (możesz użyć `.groupBy().pivot()`)

---

## ✅ Oczekiwany wynik

```python
# Pipeline
Pipeline stages:
1. StringIndexer: device_type -> device_type_indexed
2. VectorAssembler: all features -> features_raw
3. StandardScaler: features_raw -> features
4. LogisticRegression: features -> prediction

# Ewaluacja
AUC: 0.85
Accuracy: 0.82

Confusion Matrix:
             Predicted
           0      1
Actual 0  [45]  [10]
       1  [ 8]  [37]
```

---

## � Bonus: 🌟 
1. Dodaj `CrossValidator` do tuningowania hiperparametrów!
2. Porównaj Logistic Regression vs Random Forest — który lepszy?

---

## 💡 Wskazówki

- `Pipeline` w MLlib działa jak w scikit-learn: `pipeline.fit(train).transform(test)`
- `VectorAssembler` wymaga podania listy kolumn do inputCols
- Dokumentacja: [spark.apache.org/docs/latest/ml-guide.html](https://spark.apache.org/docs/latest/ml-guide.html)

Powodzenia! 🚀🤖
