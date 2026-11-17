---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 8: Spark MLlib'
footer: 'PJATK | Python w Zastosowaniach Big Data | Studia stacjonarne'
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 12.5px;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 { font-size: 1.25em; color: #2d5986; margin: 0 0 6px 0; }
  h2 { font-size: 0.95em; color: #2d5986; margin: 5px 0 2px 0; border-bottom: 2px solid #2d5986; padding-bottom: 1px; }
  .cols { display: flex; gap: 18px; }
  .col { flex: 1; }
  ul { margin: 2px 0 5px 0; padding-left: 15px; }
  li { margin-bottom: 1px; }
  code { font-size: 0.8em; background: #f0f2f5; padding: 0 3px; border-radius: 3px; }
  pre { font-size: 0.72em; background: #f0f2f5; padding: 5px 7px; border-radius: 5px; margin: 2px 0 5px 0; }
---

# 🧠 Wykład 8 — Spark MLlib

<div class="cols">
<div class="col">

## Kiedy MLlib zamiast scikit-learn?
- Dane > ~10 GB lub stale rosnące — nie mieszczą się w RAM jednej maszyny

## Architektura `pyspark.ml`
- **Estimator** — ma `.fit()` → zwraca Transformer (np. `LogisticRegression`)
- **Transformer** — ma `.transform()` (np. wytrenowany model, `StringIndexer`)
- **Pipeline** — łączy wiele etapów w jeden `.fit()`/`.transform()`
- **Evaluator** — ocenia jakość (np. `BinaryClassificationEvaluator`)

## Przygotowanie danych
```python
indexer = StringIndexer(inputCol="kat", outputCol="kat_idx")
encoder = OneHotEncoder(inputCols=["kat_idx"], outputCols=["kat_oh"])
assembler = VectorAssembler(
    inputCols=["kat_oh","liczba1","liczba2"],
    outputCol="features")
pipeline = Pipeline(stages=[indexer, encoder, assembler, model])
model = pipeline.fit(train_df)   # TYLKO na danych treningowych!
```

</div>
<div class="col">

## Ewaluacja
```python
evaluator = BinaryClassificationEvaluator(
    rawPredictionCol="rawPrediction",
    metricName="areaUnderROC")
auc = evaluator.evaluate(predictions)
```
- Przy mocnym imbalance: **AUC-PR > AUC-ROC**

## Tuning hiperparametrów
```python
grid = ParamGridBuilder() \
    .addGrid(model.maxDepth, [5, 10, 20]) \
    .addGrid(model.numTrees, [50, 100]) \
    .build()
cv = CrossValidator(estimator=pipeline, estimatorParamMaps=grid,
                     evaluator=evaluator, numFolds=5)
```
- **CrossValidator** — k-fold, solidniejszy, wolniejszy (`numFolds × len(grid)` treningów)
- **TrainValidationSplit** — jeden podział, szybszy

## Class imbalance
- `weightCol` — ważenie przykładów klasy mniejszościowej
- Undersampling — redukcja klasy większościowej

## Zapis / odczyt modelu
```python
model.write().overwrite().save("/path")
loaded = PipelineModel.load("/path")
```

</div>
</div>
