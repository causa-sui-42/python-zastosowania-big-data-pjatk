# Zadanie domowe 8: Zbuduj własny Pipeline MLlib i dostrój jego hiperparametry

**Poziom trudności:** ⭐⭐⭐⭐⭐ (Zaawansowany)

---

## 🎯 Cel zadania

Utrwalenie budowy **ML Pipeline** w Spark MLlib oraz **tuningu hiperparametrów** przy pomocy `ParamGridBuilder` i `CrossValidator`, poprzez zastosowanie ich na **samodzielnie wybranym** zbiorze danych — innym niż wyświetlenia reklam (CTR) oraz transakcje kartą płatniczą z laboratorium.

Zadanie składa się z **dwóch części**: w Części 1 zbudujesz kompletny Pipeline MLlib i porównasz dwa modele, a w Części 2 dostroisz hiperparametry lepszego podejścia za pomocą cross-walidacji.

---

## Część 1: Budowa Pipeline MLlib

Wybierz dowolny zbiór danych z problemem **klasyfikacji binarnej** (kolumna etykiety 0/1 lub Tak/Nie), zawierający zarówno kolumny **liczbowe**, jak i **kategoryczne**. Może to być np.:

- Predykcja rezygnacji klienta (churn) w telekomunikacji lub subskrypcji
- Predykcja przetrwania pasażera (np. zbiór Titanic)
- Predykcja niespłacenia kredytu na podstawie danych finansowych klienta
- Dowolny inny zbiór z [Kaggle](https://www.kaggle.com/datasets) — **inny niż wykorzystany na zajęciach**

Wykonaj w Jupyter Notebook (Google Colab, PySpark) następujące kroki:

### 1.1 Przygotowanie danych
- Wczytaj dane jako Spark DataFrame (z pliku CSV/URL lub wygenerowane proceduralnie, `random.seed(42)`)
- Zidentyfikuj kolumny kategoryczne i zakoduj je przy pomocy `StringIndexer` + `OneHotEncoder`
- Połącz wszystkie features w jedną kolumnę wektorową przy pomocy `VectorAssembler`

### 1.2 Budowa Pipeline
- Zbuduj `Pipeline` łączący wszystkie etapy preprocessing + model
- Podziel dane na zbiór treningowy i testowy (70/30) używając `.randomSplit(seed=42)`
- Wytrenuj **dwa** modele: `LogisticRegression` oraz `RandomForestClassifier`

### 1.3 Ewaluacja
- Oblicz **AUC** (`BinaryClassificationEvaluator`) dla obu modeli i porównaj je
- Oblicz **accuracy** i **precision/recall** (`MulticlassClassificationEvaluator`) dla lepszego modelu
- Krótko opisz (2-3 zdania w komórce Markdown): który model wypadł lepiej i dlaczego mogło tak być?

### 1.4 Zapis modelu
- Zapisz wytrenowany `PipelineModel` na dysku (`.save()`)
- Wczytaj go ponownie (`PipelineModel.load()`) i zweryfikuj, że predykcje są identyczne jak przed zapisem

### 📦 Wymagania techniczne do Części 1

- Notebook w Google Colab lub lokalnym Jupyter z zainstalowanym `pyspark` (`!pip install -q pyspark`)
- Dane wczytane z pliku CSV/URL lub wygenerowane proceduralnie (`random.seed(42)` dla powtarzalności)
- Kod Pipeline zawierający komentarze wyjaśniające wybór kolumn kategorycznych i liczbowych
- Krótkie podsumowanie wniosków (Markdown, 3-5 zdań) na końcu notebooka

### 💡 Wskazówki do Części 1

- `Pipeline(stages=[...])` w MLlib działa jak `sklearn.pipeline.Pipeline`: `pipeline.fit(train).transform(test)`
- `VectorAssembler` wymaga podania listy kolumn do `inputCols` — nie zapomnij dołączyć zakodowanych kolumn kategorycznych!
- `BinaryClassificationEvaluator` wymaga kolumny `rawPrediction`, a nie `prediction`
- Dokumentacja: [spark.apache.org/docs/latest/ml-guide.html](https://spark.apache.org/docs/latest/ml-guide.html)

---

## Część 2: Tuning hiperparametrów

Możesz użyć tego samego zbioru danych i Pipeline'u z Części 1, albo wybrać nowy zbiór danych z problemem **klasyfikacji binarnej**, najlepiej z pewnym stopniem niezbalansowania klas. Może to być np.:

- Predykcja awarii maszyny na podstawie danych z czujników IoT
- Predykcja rezygnacji klienta (churn) w subskrypcji lub telekomunikacji
- Predykcja niespłacenia kredytu na podstawie danych finansowych klienta
- Dowolny inny zbiór z [Kaggle](https://www.kaggle.com/datasets) — **inny niż wykorzystany na zajęciach**

Wykonaj w Jupyter Notebook (Google Colab, PySpark) następujące kroki:

### 2.1 Przygotowanie danych i baseline
- Wczytaj dane jako Spark DataFrame (z pliku CSV/URL lub wygenerowane proceduralnie, `random.seed(42)`)
- Przygotuj features (`StringIndexer` + `VectorAssembler` dla kolumn kategorycznych i liczbowych)
- Podziel dane na zbiór treningowy i testowy (70/30) używając `.randomSplit(seed=42)` i zcache'uj zbiór treningowy
- Wytrenuj baseline'owy model (np. `RandomForestClassifier` z domyślnymi hiperparametrami) i oblicz `areaUnderPR`

### 2.2 Tuning z `ParamGridBuilder` i `CrossValidator`
- Zbuduj siatkę hiperparametrów (`ParamGridBuilder`) dla wybranego modelu — min. 2 hiperparametry, min. 2 wartości każdy
- Owiń `Pipeline` w `CrossValidator` (`numFolds=3`), oceniając `areaUnderPR`
- Wytrenuj `CrossValidator` na zbiorze treningowym i wyciągnij `bestModel`
- Porównaj AUC-PR modelu bazowego z modelem po tuningu — czy tuning pomógł?

### 2.3 Ewaluacja i analiza
- Wyciągnij z `bestModel` wybrane przez CV wartości hiperparametrów
- Oblicz macierz konfuzji przy domyślnym progu (0.5) oraz przy jednym, innym progu do wyboru
- Krótko opisz (3-5 zdań w komórce Markdown): czy zbiór był niezbalansowany, jak to sprawdziłeś/aś, i czy tuning oraz zmiana progu poprawiły wyniki

### 2.4 Zapis modelu
- Zapisz wytrenowany `bestModel` (`PipelineModel`) na dysku (`.write().overwrite().save()`)
- Wczytaj go ponownie (`PipelineModel.load()`) i zweryfikuj, że predykcje są identyczne jak przed zapisem

### 📦 Wymagania techniczne do Części 2

- Notebook w Google Colab lub lokalnym Jupyter z zainstalowanym `pyspark` (`!pip install -q pyspark`)
- Dane wczytane z pliku CSV/URL lub wygenerowane proceduralnie (`random.seed(42)` dla powtarzalności)
- Kod tuningu zawierający komentarze wyjaśniające wybór hiperparametrów i wartości siatki
- Krótkie podsumowanie wniosków (Markdown, 3-5 zdań) na końcu notebooka

### 💡 Wskazówki do Części 2

- `CrossValidator(estimator=pipeline, ...)` przyjmuje **cały** `Pipeline` jako estimator, nie sam model
- Pamiętaj o `train_df.cache()` przed `cv.fit()` — inaczej CV wielokrotnie przelicza te same dane
- `BinaryClassificationEvaluator` z `metricName="areaUnderPR"` jest lepszą metryką niż `"areaUnderROC"` przy niezbalansowanych danych
- Dokumentacja: [spark.apache.org/docs/latest/ml-tuning.html](https://spark.apache.org/docs/latest/ml-tuning.html)

---

## ✅ Checklist ukończenia zadania

- [ ] Część 1: Pipeline z `StringIndexer` + `OneHotEncoder` + `VectorAssembler` zbudowany
- [ ] Część 1: dwa modele (`LogisticRegression`, `RandomForestClassifier`) wytrenowane i porównane (AUC, accuracy, precision/recall)
- [ ] Część 1: `PipelineModel` zapisany i wczytany ponownie z weryfikacją identycznych predykcji
- [ ] Część 2: baseline (`areaUnderPR`) obliczony przed tuningiem
- [ ] Część 2: `ParamGridBuilder` (min. 2 hiperparametry × min. 2 wartości) + `CrossValidator` (`numFolds=3`) uruchomione
- [ ] Część 2: `bestModel` porównany z baseline, hiperparametry wybrane przez CV wypisane
- [ ] Część 2: macierz konfuzji przy dwóch progach + `bestModel` zapisany i wczytany ponownie
- [ ] Krótkie podsumowanie wniosków na końcu notebooka (obie części)

---

## 💡 Rozwiązanie krok po kroku (przykład)

<details>
<summary><strong>📖 Kliknij, aby zobaczyć pełne przykładowe rozwiązanie (na przykładowym zbiorze danych)</strong></summary>

Poniższy przykład pokazuje pełne rozwiązanie **obu części** zadania na przykładowym, syntetycznym zbiorze danych `churn_subskrypcja` (rezygnacja z subskrypcji — klasyfikacja binarna z cechami liczbowymi i kategorycznymi). Twoje zadanie dotyczy **innego, samodzielnie wybranego** zbioru — potraktuj poniższy kod jako wzorzec do adaptacji, nie do kopiowania 1:1.

### Krok 0: Generowanie przykładowego zbioru danych

```python
!pip install -q pyspark
from pyspark.sql import SparkSession
import pyspark.sql.functions as F
from pyspark.ml.feature import StringIndexer, OneHotEncoder, VectorAssembler
from pyspark.ml.classification import LogisticRegression, RandomForestClassifier
from pyspark.ml import Pipeline, PipelineModel
from pyspark.ml.evaluation import BinaryClassificationEvaluator, MulticlassClassificationEvaluator
from pyspark.ml.tuning import ParamGridBuilder, CrossValidator
import random

spark = SparkSession.builder.appName("Zadanie8").getOrCreate()
random.seed(42)

n = 3000
dane = []
for i in range(n):
    staz_miesiace = random.randint(1, 60)
    oplata = round(random.gauss(60, 20), 2)
    typ_planu = random.choice(["podstawowy", "standard", "premium"])
    liczba_reklamacji = random.choices([0, 1, 2, 3], weights=[0.6, 0.25, 0.1, 0.05])[0]
    logit = -0.04 * staz_miesiace + 0.015 * oplata + 0.6 * liczba_reklamacji \
        + (1.0 if typ_planu == "podstawowy" else 0.0) - 1.2
    prawdopodobienstwo = 1 / (1 + 2.718281828 ** (-logit))
    rezygnacja = 1 if random.random() < prawdopodobienstwo else 0
    dane.append((staz_miesiace, oplata, typ_planu, liczba_reklamacji, rezygnacja))

df = spark.createDataFrame(dane, schema=["staz_miesiace", "oplata", "typ_planu", "liczba_reklamacji", "label"])
df.groupBy("label").count().show()
```

## Rozwiązanie Części 1: Budowa Pipeline MLlib

### Krok 1.1: Przygotowanie danych

```python
# Kolumna kategoryczna "typ_planu" -> StringIndexer + OneHotEncoder
indexer = StringIndexer(inputCol="typ_planu", outputCol="typ_planu_idx")
encoder = OneHotEncoder(inputCols=["typ_planu_idx"], outputCols=["typ_planu_ohe"])

assembler = VectorAssembler(
    inputCols=["staz_miesiace", "oplata", "liczba_reklamacji", "typ_planu_ohe"],
    outputCol="features"
)
```

### Krok 1.2: Budowa Pipeline i dwa modele

```python
train_df, test_df = df.randomSplit([0.7, 0.3], seed=42)

lr = LogisticRegression(featuresCol="features", labelCol="label")
pipeline_lr = Pipeline(stages=[indexer, encoder, assembler, lr])
model_lr = pipeline_lr.fit(train_df)

rf = RandomForestClassifier(featuresCol="features", labelCol="label", numTrees=100, seed=42)
pipeline_rf = Pipeline(stages=[indexer, encoder, assembler, rf])
model_rf = pipeline_rf.fit(train_df)
```

### Krok 1.3: Ewaluacja

```python
pred_lr = model_lr.transform(test_df)
pred_rf = model_rf.transform(test_df)

evaluator_auc = BinaryClassificationEvaluator(labelCol="label", metricName="areaUnderROC")
auc_lr = evaluator_auc.evaluate(pred_lr)
auc_rf = evaluator_auc.evaluate(pred_rf)
print(f"AUC LogisticRegression: {auc_lr:.3f}, AUC RandomForest: {auc_rf:.3f}")

evaluator_multi = MulticlassClassificationEvaluator(labelCol="label", predictionCol="prediction")
for metryka in ["accuracy", "precisionByLabel", "recallByLabel"]:
    wynik = evaluator_multi.setMetricName(metryka).evaluate(pred_rf)
    print(f"RandomForest {metryka}: {wynik:.3f}")
```
**Komentarz (Markdown):** RandomForest zwykle wypada lepiej niż LogisticRegression, gdy w danych są nieliniowe zależności i interakcje między cechami (np. wpływ liczby reklamacji różni się w zależności od typu planu) — drzewa decyzyjne wychwytują takie wzorce lepiej niż model liniowy.

### Krok 1.4: Zapis i wczytanie modelu

```python
model_rf.write().overwrite().save("model_rf_zad8")
model_rf_wczytany = PipelineModel.load("model_rf_zad8")

pred_po_wczytaniu = model_rf_wczytany.transform(test_df)
roznice = pred_rf.select("prediction").subtract(pred_po_wczytaniu.select("prediction"))
print(f"Liczba różniących się predykcji po wczytaniu modelu: {roznice.count()}")  # oczekiwane: 0
```

## Rozwiązanie Części 2: Tuning hiperparametrów

### Krok 2.1: Baseline

```python
train_df.cache()  # unikamy wielokrotnego przeliczania tych samych danych podczas CV

rf_baseline = RandomForestClassifier(featuresCol="features", labelCol="label", seed=42)
pipeline_baseline = Pipeline(stages=[indexer, encoder, assembler, rf_baseline])
model_baseline = pipeline_baseline.fit(train_df)

evaluator_pr = BinaryClassificationEvaluator(labelCol="label", metricName="areaUnderPR")
auc_pr_baseline = evaluator_pr.evaluate(model_baseline.transform(test_df))
print(f"Baseline areaUnderPR: {auc_pr_baseline:.3f}")
```

### Krok 2.2: ParamGridBuilder + CrossValidator

```python
grid = (
    ParamGridBuilder()
    .addGrid(rf_baseline.numTrees, [50, 150])
    .addGrid(rf_baseline.maxDepth, [5, 10])
    .build()
)

cv = CrossValidator(
    estimator=pipeline_baseline,
    estimatorParamMaps=grid,
    evaluator=evaluator_pr,
    numFolds=3,
    seed=42,
)
cv_model = cv.fit(train_df)
best_model = cv_model.bestModel

auc_pr_best = evaluator_pr.evaluate(best_model.transform(test_df))
print(f"areaUnderPR po tuningu: {auc_pr_best:.3f} (baseline: {auc_pr_baseline:.3f})")
```

### Krok 2.3: Ewaluacja i analiza

```python
najlepszy_rf = best_model.stages[-1]
print(f"Wybrane przez CV: numTrees={najlepszy_rf.getNumTrees}, maxDepth={najlepszy_rf.getOrDefault('maxDepth')}")

pred_best = best_model.transform(test_df)
pred_best.groupBy("label", "prediction").count().show()  # macierz konfuzji przy progu 0.5

# Inny próg decyzyjny (np. 0.3 - wykrywamy więcej rezygnacji kosztem precyzji)
from pyspark.ml.functions import vector_to_array
pred_z_progiem = pred_best.withColumn("prob_rezygnacji", vector_to_array("probability")[1])
pred_z_innym_progiem = pred_z_progiem.withColumn(
    "prediction_prog_03", (F.col("prob_rezygnacji") >= 0.3).cast("double")
)
pred_z_innym_progiem.groupBy("label", "prediction_prog_03").count().show()
```
**Komentarz (Markdown, przykład):** Zbiór jest umiarkowanie niezbalansowany (ok. 25% rezygnacji), co sprawdziłem przez `df.groupBy("label").count()`. Tuning poprawił `areaUnderPR` względem baseline, a obniżenie progu decyzyjnego do 0.3 zwiększa recall (wykrywamy więcej faktycznych rezygnacji) kosztem precyzji — to świadomy kompromis biznesowy: lepiej czasem fałszywie zaalarmować dział retencji, niż przeoczyć realną rezygnację klienta.

### Krok 2.4: Zapis modelu

```python
best_model.write().overwrite().save("best_model_zad8")
best_model_wczytany = PipelineModel.load("best_model_zad8")

roznice_best = pred_best.select("prediction").subtract(best_model_wczytany.transform(test_df).select("prediction"))
print(f"Liczba różniących się predykcji: {roznice_best.count()}")  # oczekiwane: 0
```

</details>

---

Powodzenia! 🚀🤖🕵️
