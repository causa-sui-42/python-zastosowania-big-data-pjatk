---
marp: true
theme: default
size: 16:9
paginate: true
header: '📚 Python w Zastosowaniach Big Data — Wykład 8'
footer: 'PJATK | Studia stacjonarne | 24.11.2026'
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 20px;
  }
  code {
    font-size: 0.85em;
  }
  h1 {
    color: #2d5986;
  }
  h2 {
    color: #2d5986;
    font-size: 1.3em;
  }
  table {
    font-size: 0.85em;
  }
  pre {
    font-size: 0.9em;
  }
---

# 🤖 Spark MLlib — od podstaw po tuning hiperparametrów
## Gdy scikit-learn krzyczy "MemoryError!" 💥 — i jak potem wycisnąć z modelu maksimum

**Python w Zastosowaniach Big Data** | Wykład 8
Prowadzący: Pavlo Melnyk

---

## 📋 Plan wykładu

**Część 1 — Wprowadzenie do Spark MLlib:**
1. Recap: co umiemy z scikit-learn (Wykład 7)
2. Dlaczego scikit-learn nie skaluje się na duże dane
3. Spark MLlib — architektura i filozofia
4. Przygotowanie danych: `VectorAssembler`
5. Kodowanie kategorii: `StringIndexer` i `OneHotEncoder`
6. `Pipeline` API — fit/transform na sterydach
7. Modele: `LogisticRegression` i `RandomForestClassifier`
8. Ewaluacja: `BinaryClassificationEvaluator`
9. scikit-learn vs MLlib — porównanie side-by-side

**Część 2 — Tuning hiperparametrów i CrossValidator:**
10. `ParamGridBuilder` i `CrossValidator` — automatyczny tuning
11. `TrainValidationSplit` — szybsza alternatywa
12. Class imbalance, ważenie klas i `GBTClassifier`
13. AUC-ROC vs AUC-PR, zapis `PipelineModel` i skalowanie CV
14. Najczęstsze pułapki

> 🎯 **Po tym wykładzie:** Zbudujesz pełny pipeline ML w Spark MLlib — od surowych danych do wytrenowanego, automatycznie dostrojonego i poprawnie wyewaluowanego modelu!

---

## 🎬 Część 1: Wprowadzenie do Spark MLlib

---

## 💡 Hook — Dlaczego tu jesteśmy?

Na Wykładzie 7 nauczyliście się scikit-learn: `fit()`, `predict()`, `Pipeline`, `ColumnTransformer`. Wszystko działa świetnie... dopóki dane mieszczą się w RAM jednego laptopa 💻

```python
# scikit-learn na 50 000 wierszy — pyk i gotowe! 🎉
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X_train, y_train)
```

```python
# scikit-learn na 300 000 000 wierszy logów reklamowych... 💀
model.fit(X_train_ads, y_train_ads)
# MemoryError: Unable to allocate 128. GiB for an array
```

> Reklamodawcy generują **miliardy** wyświetleń dziennie. Czas poznać **Spark MLlib**! 🔥

---

## 🔄 Recap: Co umiemy z scikit-learn?

Na Wykładzie 7 poznaliśmy pełny warsztat ML na jednej maszynie:

| Koncept | scikit-learn | Status |
|---------|-------------|--------|
| Preprocessing | `SimpleImputer`, `StandardScaler` | ✅ Umiemy! |
| Encoding | `OneHotEncoder`, `LabelEncoder` | ✅ Umiemy! |
| Pipeline | `sklearn.pipeline.Pipeline` | ✅ Umiemy! |
| Modele | `LogisticRegression`, `RandomForestClassifier` | ✅ Umiemy! |
| Ewaluacja | `accuracy_score`, `roc_auc_score` | ✅ Umiemy! |
| Train/Test Split | `train_test_split()` | ✅ Umiemy! |

> 💪 Dziś **przenosimy** ten sam sposób myślenia na klaster Spark!

---

## ⚠️ Problem: pamięć jednej maszyny to limit

scikit-learn wymaga, by **cały** zbiór danych (i macierz features) zmieścił się w RAM procesu Pythona:

| Scenariusz | Rozmiar danych | scikit-learn | MLlib |
|-----------|---------------|---------------|-------|
| Ankieta studencka | 5 MB | ✅ Instant | ⚡ Overkill |
| Sklep internetowy | 2 GB | ✅ 1 min | ✅ 2 min |
| Logi wyświetleń reklam (1 dzień) | 50 GB | 💀 OOM | ✅ 5 min |
| Logi wyświetleń reklam (1 miesiąc) | 1.5 TB | 🪦 Nieosiągalne | ✅ 40 min |
| Historia kliknięć (1 rok, globalnie) | 20 TB | 🪦 Nieosiągalne | ✅ kilka godzin |

> 🔑 **Zasada kciuka:** Dane < 10 GB → scikit-learn. Dane > 10 GB (albo rosną) → **MLlib**!

---

## 🤔 Think About It

**Pytanie:** Sieć reklamowa wyświetla **2 miliardy** reklam dziennie. Każdy rekord to ok. 200 bajtów (kategoria, urządzenie, pozycja, timestamp...).

- Ile to danych **dziennie**? A w skali **miesiąca**?
- Czy Twój laptop z 16 GB RAM da radę wczytać to do pandas?

<!-- 2 mld × 200 B ≈ 400 GB dziennie, ~12 TB miesięcznie. Zdecydowanie nie zmieści się w RAM pojedynczej maszyny 😱 -->

> To właśnie scenariusz, w którym **Spark MLlib** ratuje sytuację! 🦸

---

## 🚀 Czym jest Spark MLlib?

**MLlib** (a dokładniej `pyspark.ml`) to biblioteka Machine Learning wbudowana w Spark, zaprojektowana od zera do pracy **rozproszonej**.

| Cecha | scikit-learn | Spark MLlib |
|-------|-------------|-------------|
| Skala | Jedna maszyna (RAM) | Klaster (TB+) |
| Struktura danych | pandas DataFrame / NumPy array | Spark DataFrame |
| API | `fit()` / `predict()` | `fit()` / `transform()` |
| Feature prep | `ColumnTransformer` | `VectorAssembler` |
| Wykonanie | Jeden proces | Rozproszone (lazy evaluation) |
| Modele | Dziesiątki algorytmów | Mniejszy, ale rosnący zestaw |

> 💡 **Analogia:** scikit-learn to szefowa kuchni gotująca sama. MLlib to cała armia kucharzy w wielkiej restauracji — każdy przygotowuje swoją część dania równolegle! 👨‍🍳👩‍🍳

---

## 🧱 Architektura MLlib (spark.ml)

MLlib operuje wyłącznie na **Spark DataFrame** — nie na RDD (to stary, przestarzały `mllib` package, którego już nie używamy).

Kluczowe komponenty:

- **Transformer** — przekształca DataFrame w inny DataFrame (np. `VectorAssembler.transform()`)
- **Estimator** — algorytm, który uczy się na danych i produkuje Transformer (np. `LogisticRegression.fit()` → `LogisticRegressionModel`)
- **Pipeline** — łańcuch Transformerów i Estimatorów wykonywanych sekwencyjnie
- **Evaluator** — mierzy jakość modelu na podstawie kolumny z predykcjami

> 🔑 Zapamiętaj: **Estimator.fit() → Transformer**, **Transformer.transform() → DataFrame**

---

## 🔧 Przygotowanie danych: `VectorAssembler`

MLlib wymaga, aby wszystkie features były połączone w **jedną kolumnę** typu wektor — to zastępuje macierz `X` z scikit-learn.

```python
from pyspark.ml.feature import VectorAssembler

assembler = VectorAssembler(
    inputCols=["wiek_grupy", "pozycja_num", "godzina"],
    outputCol="features_raw"
)

df_with_features = assembler.transform(df)
df_with_features.select("features_raw").show(3, truncate=False)
```

```
+--------------------+
|features_raw        |
+--------------------+
|[2.0, 1.0, 14.0]    |
|[1.0, 0.0, 9.0]     |
|[3.0, 2.0, 21.0]    |
+--------------------+
```

> ⚠️ `VectorAssembler` **nie** koduje zmiennych kategorycznych typu string — potrzebujemy do tego `StringIndexer`!

---

## 🔤 Kodowanie kategorii: `StringIndexer`

`StringIndexer` zamienia string na indeks liczbowy (podobnie do `LabelEncoder` w scikit-learn):

```python
from pyspark.ml.feature import StringIndexer

indexer = StringIndexer(
    inputCol="typ_urzadzenia",
    outputCol="typ_urzadzenia_idx"
)

model = indexer.fit(df)
indexed = model.transform(df)
indexed.select("typ_urzadzenia", "typ_urzadzenia_idx").distinct().show()
```

```
+---------------+------------------+
|typ_urzadzenia |typ_urzadzenia_idx|
+---------------+------------------+
|mobile         |0.0               |
|desktop        |1.0               |
|tablet         |2.0               |
+---------------+------------------+
```

> ⚠️ Indeksy 0, 1, 2 sugerują **kolejność** — modele liniowe mogą to źle zinterpretować. Wchodzi `OneHotEncoder`!

---

## 🎯 One-Hot Encoding w MLlib

```python
from pyspark.ml.feature import OneHotEncoder

encoder = OneHotEncoder(
    inputCol="typ_urzadzenia_idx",
    outputCol="typ_urzadzenia_ohe"
)

encoded = encoder.fit(indexed).transform(indexed)
encoded.select("typ_urzadzenia_idx", "typ_urzadzenia_ohe").show(3)
```

```
+------------------+------------------+
|typ_urzadzenia_idx|typ_urzadzenia_ohe|
+------------------+------------------+
|0.0               |(2,[0],[1.0])     |
|1.0               |(2,[1],[1.0])     |
|2.0               |(2,[],[])         |
+------------------+------------------+
```

> 💡 To `SparseVector` — kategoria "tablet" (ostatnia) jest zakodowana jako wektor zerowy, by uniknąć kolinearności (jak `drop='first'` w scikit-learn).

---

## 🔗 Pipeline API — łączymy wszystko

Zamiast ręcznie wywoływać każdy krok, budujemy **Pipeline** — dokładnie jak `sklearn.pipeline.Pipeline`, ale na sterydach rozproszonych:

```python
from pyspark.ml import Pipeline
from pyspark.ml.classification import LogisticRegression

pipeline = Pipeline(stages=[
    StringIndexer(inputCol="typ_urzadzenia", outputCol="typ_urzadzenia_idx"),
    OneHotEncoder(inputCol="typ_urzadzenia_idx", outputCol="typ_urzadzenia_ohe"),
    VectorAssembler(
        inputCols=["typ_urzadzenia_ohe", "pozycja_num", "wiek_grupy_idx"],
        outputCol="features"
    ),
    LogisticRegression(featuresCol="features", labelCol="clicked")
])

model = pipeline.fit(train_df)          # 👈 trenuje CAŁY łańcuch
predictions = model.transform(test_df)  # 👈 transformuje testowe dane
```

> 🎯 `pipeline.fit()` zwraca `PipelineModel` — gotowy do `transform()` na nowych danych, np. w produkcji!

---

## 🌲 Modele: `LogisticRegression` i `RandomForestClassifier`

```python
from pyspark.ml.classification import LogisticRegression, RandomForestClassifier

# Model liniowy — szybki, interpretowalny
lr = LogisticRegression(featuresCol="features", labelCol="clicked", maxIter=20)

# Ensemble drzew — zwykle wyższa jakość, wolniejszy trening
rf = RandomForestClassifier(
    featuresCol="features", labelCol="clicked", numTrees=100, maxDepth=8
)
```

| Model | Zalety | Wady |
|-------|--------|------|
| `LogisticRegression` | Szybki, prosty, interpretowalny | Zakłada liniowość granic decyzyjnych |
| `RandomForestClassifier` | Wychwytuje nieliniowości, odporny na outliery | Wolniejszy, więcej pamięci |

> 💡 W praktyce: zacznij od `LogisticRegression` jako baseline, potem porównaj z `RandomForestClassifier`.

---

## 📊 Ewaluacja: `BinaryClassificationEvaluator`

```python
from pyspark.ml.evaluation import BinaryClassificationEvaluator

evaluator = BinaryClassificationEvaluator(
    labelCol="clicked",
    rawPredictionCol="rawPrediction",
    metricName="areaUnderROC"
)

auc = evaluator.evaluate(predictions)
print(f"AUC: {auc:.4f}")
# AUC: 0.8123
```

> 🎯 **AUC (Area Under ROC Curve)** — im bliżej 1.0, tym lepiej model odróżnia kliknięcia od braku kliknięcia. 0.5 = losowe zgadywanie!

Dla dokładniejszej analizy (accuracy, precision, recall) używamy `MulticlassClassificationEvaluator` — działa też dla klasyfikacji binarnej.

---

## ⚖️ scikit-learn vs MLlib — side by side

```python
# scikit-learn
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LogisticRegression

preprocess = ColumnTransformer([
    ("ohe", OneHotEncoder(), ["typ_urzadzenia"])
])
pipe = Pipeline([("prep", preprocess), ("model", LogisticRegression())])
pipe.fit(X_train, y_train)
y_pred = pipe.predict(X_test)
```

```python
# Spark MLlib
from pyspark.ml import Pipeline
from pyspark.ml.feature import StringIndexer, OneHotEncoder, VectorAssembler
from pyspark.ml.classification import LogisticRegression

pipeline = Pipeline(stages=[StringIndexer(...), OneHotEncoder(...),
                             VectorAssembler(...), LogisticRegression(...)])
model = pipeline.fit(train_df)
predictions = model.transform(test_df)
```

> 🔑 Ten sam **mental model** — Pipeline, fit, transform/predict — inna infrastruktura pod spodem!

---

## ⚠️ Najczęstsze pułapki (Część 1)

| Pułapka | Dlaczego to problem | Rozwiązanie |
|---------|---------------------|-------------|
| Zapomniany `VectorAssembler` | Model nie przyjmuje "gołych" kolumn | Zawsze łącz features w jedną kolumnę wektorową |
| `StringIndexer` bez `OneHotEncoder` | Model liniowy widzi fałszywą kolejność kategorii | Dodaj `OneHotEncoder` po `StringIndexer` |
| `fit()` na całym zbiorze przed splitem | Data leakage — model "widział" dane testowe | Zawsze `randomSplit()` **przed** `fit()` na Pipeline |
| Ignorowanie `rawPrediction` vs `prediction` | Evaluator AUC wymaga `rawPrediction`, nie etykiety 0/1 | Sprawdź nazwę kolumny wymaganą przez evaluator |
| Zbyt mały `numTrees`/`maxDepth` na dużych danych | Underfitting mimo dużego zbioru | Testuj kilka konfiguracji, monitoruj AUC na zbiorze testowym |

---

## 🔁 Część 1 recap

Zanim przejdziemy do tuningu, krótkie podsumowanie:

| Koncept | Opis | Status |
|---------|------|--------|
| `Transformer` / `Estimator` | `transform()` vs `fit()` | ✅ Umiemy! |
| `VectorAssembler` | łączenie features w wektor | ✅ Umiemy! |
| `StringIndexer` / `OneHotEncoder` | kodowanie kategorii | ✅ Umiemy! |
| `Pipeline` | łańcuch kroków fit/transform | ✅ Umiemy! |
| `BinaryClassificationEvaluator` | AUC-ROC | ✅ Umiemy! |

> 💪 Świetna baza! Teraz dodajemy **automatyczny tuning** i uczymy się radzić sobie z **danymi niezbalansowanymi**.

---

## 🎬 Część 2: Tuning hiperparametrów i CrossValidator

---

## 💡 Hook — Dlaczego tu jesteśmy?

Wytrenowałeś/aś model wykrywania fraudów. Ma **99% accuracy**! Szef jest zachwycony... dopóki nie zapyta, ile fraudów faktycznie wykrył 🤨

```python
# Model, który zawsze przewiduje "brak fraudu"
def naive_model(transaction):
    return 0  # zawsze "nie fraud"

# Accuracy przy fraud rate 1%?
# 99% transakcji to nie-fraudy -> model ma 99% accuracy!
# ...i wykrywa ZERO fraudów 💀
```

> Dziś nauczymy się, jak **poprawnie** trenować i oceniać modele na danych, gdzie klasa, na której nam zależy, to zaledwie 1-2% wszystkich przykładów.

---

## 🤔 Think About It

**Pytanie:** Pracujesz dla banku. Model wykrywania fraudów ma 99.3% accuracy. Czy to dobry model?

<!-- Niekoniecznie! Przy fraud rate ~1%, model, który NIGDY nie wykrywa fraudu, też ma ~99% accuracy. Trzeba spojrzeć na precision/recall klasy fraud, najlepiej przez AUC-PR. -->

---

## 🎛️ Czym są hiperparametry?

**Hiperparametr** to ustawienie modelu, którego **nie uczymy się z danych** — sami je wybieramy przed treningiem.

| Model | Przykładowe hiperparametry |
|-------|----------------------------|
| `RandomForestClassifier` | `numTrees`, `maxDepth`, `minInstancesPerNode` |
| `GBTClassifier` | `maxIter`, `maxDepth`, `stepSize` |
| `LogisticRegression` | `regParam`, `elasticNetParam` |

> ⚠️ Ręczne zgadywanie hiperparametrów = godziny straconego czasu i modele gorsze niż być mogły!

---

## 🔧 `ParamGridBuilder` — buduj siatkę automatycznie

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

print(len(grid))  # 👈 3 x 3 = 9 kombinacji do przetestowania!
```

> 🔑 Każda kombinacja = osobny model do wytrenowania i oceny. Uważaj na eksplozję kombinatoryczną!

---

## 🔁 `CrossValidator` — k-fold CV w Spark

```python
from pyspark.ml.tuning import CrossValidator
from pyspark.ml.evaluation import BinaryClassificationEvaluator

evaluator = BinaryClassificationEvaluator(
    labelCol="is_fraud", rawPredictionCol="rawPrediction", metricName="areaUnderPR"
)

cv = CrossValidator(
    estimator=pipeline,          # 👈 cały Pipeline, nie tylko model!
    estimatorParamMaps=grid,
    evaluator=evaluator,
    numFolds=3,
    parallelism=2,               # 👈 ile kombinacji trenować równolegle
    seed=42,
)

cv_model = cv.fit(train_df)
best_model = cv_model.bestModel   # to już PipelineModel!
```

> 💰 **Koszt:** `numFolds × len(grid)` pełnych treningów Pipeline'u. 3 foldy × 9 kombinacji = **27 treningów**!

---

## ⚡ `TrainValidationSplit` — szybsza alternatywa

```python
from pyspark.ml.tuning import TrainValidationSplit

tvs = TrainValidationSplit(
    estimator=pipeline,
    estimatorParamMaps=grid,
    evaluator=evaluator,
    trainRatio=0.8,               # 👈 pojedynczy split zamiast k-fold
    parallelism=2,
    seed=42,
)

tvs_model = tvs.fit(train_df)
```

| | `CrossValidator` | `TrainValidationSplit` |
|--|-------------------|--------------------------|
| Liczba treningów | `numFolds × len(grid)` | `len(grid)` |
| Solidność oceny | Wysoka (k-fold) | Niższa (jeden split) |
| Kiedy używać | Mniejsze dane, mniej kombinacji | Bardzo duże dane, szybka iteracja |

---

## 🕵️ Class Imbalance — problem, który psuje model po cichu

Fraudy to **1-2%** transakcji. Model chętnie "poświęci" tę małą klasę, żeby zminimalizować ogólny błąd!

```python
df.groupBy("is_fraud").count().show()
# +--------+------+
# |is_fraud| count|
# +--------+------+
# |       0|493200|
# |       1|  6800|
# +--------+------+
```

> 🔑 **Zasada kciuka:** Gdy klasa pozytywna < 10% danych — standardowe metryki i domyślne wagi klas Cię oszukają!

---

## ⚖️ Radzenie sobie z imbalance: `weightCol`

Zamiast fizycznie usuwać dane (undersampling), możemy **ważyć przykłady** podczas treningu:

```python
from pyspark.sql import functions as F

n_fraud = train_df.filter("is_fraud = 1").count()
n_ok = train_df.filter("is_fraud = 0").count()
fraud_weight = n_ok / n_fraud   # 👈 im rzadsza klasa, tym większa waga

train_weighted = train_df.withColumn(
    "class_weight",
    F.when(F.col("is_fraud") == 1, fraud_weight).otherwise(1.0)
)

rf = RandomForestClassifier(
    featuresCol="features", labelCol="is_fraud", weightCol="class_weight"
)
```

> 💡 Model "widzi" każdy przykład fraudu jakby wystąpił wielokrotnie — bez fizycznego duplikowania danych!

---

## 📉 Undersampling — alternatywa w Spark

```python
majority = train_df.filter("is_fraud = 0")
minority = train_df.filter("is_fraud = 1")

fraction = minority.count() / majority.count()
majority_sampled = majority.sample(fraction=fraction, seed=42)

train_balanced = majority_sampled.union(minority)
train_balanced.groupBy("is_fraud").count().show()
```

| Podejście | Zalety | Wady |
|-----------|--------|------|
| `weightCol` | Zachowuje wszystkie dane | Nie każdy model wspiera wagi |
| Undersampling | Prosty, szybszy trening | Tracimy dane większości klasy |

---

## 🌲 `GBTClassifier` — Gradient-Boosted Trees

Kolejne drzewa **poprawiają błędy** poprzednich — często lepsze wyniki niż `RandomForestClassifier`, ale wolniejszy trening sekwencyjny.

```python
from pyspark.ml.classification import GBTClassifier

gbt = GBTClassifier(
    featuresCol="features", labelCol="is_fraud",
    maxIter=50, maxDepth=5, seed=42,
)

gbt_model = gbt.fit(train_df)
predictions = gbt_model.transform(test_df)
```

| Model | Trenowanie drzew | Zwykle najlepsze przy |
|-------|-------------------|------------------------|
| `RandomForestClassifier` | Równolegle, niezależnie | Duże, szumowe dane |
| `GBTClassifier` | Sekwencyjnie, poprawiając błędy | Mniejsze różnice klas, precyzja |

> ⚠️ `GBTClassifier` w MLlib obsługuje **tylko klasyfikację binarną** — idealny do `is_fraud` (0/1)!

---

## 📊 AUC-ROC vs AUC-PR — którą wybrać?

```python
roc_eval = BinaryClassificationEvaluator(labelCol="is_fraud", metricName="areaUnderROC")
pr_eval  = BinaryClassificationEvaluator(labelCol="is_fraud", metricName="areaUnderPR")

print(f"AUC-ROC: {roc_eval.evaluate(predictions):.4f}")  # np. 0.94 — świetnie! 🎉
print(f"AUC-PR:  {pr_eval.evaluate(predictions):.4f}")   # np. 0.42 — hmm... 🤔
```

| Metryka | Uwzględnia | Wrażliwa na imbalance? |
|---------|------------|--------------------------|
| AUC-ROC | TPR i FPR (w tym True Negatives) | ❌ Mało — TN dominują i "ukrywają" błędy |
| AUC-PR | Precision i Recall klasy pozytywnej | ✅ Bardzo — pokazuje realną jakość na rzadkiej klasie |

> 🔑 **Przy fraud rate 1-2%, zawsze patrz najpierw na AUC-PR!**

---

## 💾 Zapis i odczyt `PipelineModel`

```python
best_model = cv_model.bestModel

# Zapis
best_model.write().overwrite().save("/tmp/cardshield_best_model")

# Odczyt (np. w innym procesie / na produkcji)
from pyspark.ml import PipelineModel
loaded_model = PipelineModel.load("/tmp/cardshield_best_model")

predictions = loaded_model.transform(nowe_transakcje)
```

> 💡 `PipelineModel` zapisuje **wszystkie** stage'y (indexery, assemblery, model) — nie musisz nic odtwarzać ręcznie przy wdrożeniu!

---

## 🚀 Skalowanie CV: cache i partycje

```python
train_df = train_df.repartition(8).cache()   # 👈 CrossValidator odczytuje train wielokrotnie!

cv_model = cv.fit(train_df)
```

| Czynnik | Wpływ na czas CV |
|---------|------------------|
| `numFolds` | Liniowy — więcej foldów = więcej treningów |
| Rozmiar siatki (`len(grid)`) | Liniowy — każda kombinacja to osobny trening |
| `parallelism` | Więcej równoległości = szybciej, ale więcej RAM na klastrze |
| Brak `.cache()` na danych treningowych | Spark przelicza dane od nowa przy **każdym** foldzie! |
| Zbyt mało/dużo partycji | Złe rozłożenie pracy na executory |

> ⚠️ Brak cache'owania danych treningowych to najczęstsza przyczyna "dlaczego mój CrossValidator trwa wieczność"!

---

## ⚠️ Najczęstsze pułapki (Część 2)

| Pułapka | Dlaczego to problem | Rozwiązanie |
|---------|----------------------|-------------|
| Ocena tylko przez AUC-ROC na niezbalansowanych danych | Metryka "kłamie" — wygląda świetnie mimo słabego modelu | Zawsze sprawdzaj też AUC-PR |
| Zbyt duża siatka `ParamGridBuilder` | Eksplozja liczby treningów, godziny czekania | Zacznij od małej siatki, rozszerzaj stopniowo |
| Brak `.cache()` przed `CrossValidator` | Wielokrotne, kosztowne przeliczanie danych | `train_df.cache()` przed `cv.fit()` |
| Próg decyzyjny 0.5 "z automatu" | Model rzadko przekracza 0.5 dla rzadkiej klasy | Dostosuj próg do kosztów FP/FN biznesowo |
| Ważenie klas bez przemyślenia wag | Zbyt duża waga = model "przewrażliwiony" na fraud | Zacznij od inverse frequency, testuj warianty |

---

## 📝 Podsumowanie — kluczowe wnioski

1. ✅ scikit-learn ma limit — RAM jednej maszyny; MLlib skaluje się na klaster
2. ✅ MLlib operuje na Spark DataFrame przez `Transformer` i `Estimator`
3. ✅ `VectorAssembler`, `StringIndexer`, `OneHotEncoder` i `Pipeline` to fundament każdego projektu MLlib
4. ✅ `BinaryClassificationEvaluator` (AUC) to standardowa metryka klasyfikacji binarnej
5. ✅ `ParamGridBuilder` + `CrossValidator` automatyzują tuning hiperparametrów
6. ✅ Przy class imbalance zawsze patrz na **AUC-PR**, nie tylko AUC-ROC
7. ✅ `weightCol` to elegancki sposób radzenia sobie z niezbalansowanymi danymi
8. ✅ `GBTClassifier` często bije `RandomForestClassifier`, ale trenuje się wolniej
9. ✅ Cache'uj dane treningowe przed `CrossValidator` — inaczej zapłacisz za to czasem

---

## 🔮 Co dalej?

Na dzisiejszych **ćwiczeniach** zbudujesz pełny pipeline MLlib z tuningiem hiperparametrów — od predykcji **kliknięć w reklamy (CTR)** po wykrywanie fraudów kartą płatniczą na setkach tysięcy transakcji! 📱🖱️💳🕵️

**Wykład 9 (01.12.2026):** Cloud Computing i GCP — BigQuery, Dataproc ☁️

---

## ❓ Pytania?

**Dziękuję za uwagę! 🎉**

Zajęcia nr 8 | 24.11.2026
