# Zadanie domowe 9: Zbuduj własny Pipeline MLlib

**Poziom trudności:** ⭐⭐⭐⭐ (Zaawansowany)

---

## 🎯 Cel zadania

Utrwalenie budowy **ML Pipeline** w Spark MLlib poprzez zastosowanie go na **samodzielnie wybranym** zbiorze danych — innym niż wyświetlenia reklam (CTR) z laboratorium.

---

## 📋 Zadanie

Wybierz dowolny zbiór danych z problemem **klasyfikacji binarnej** (kolumna etykiety 0/1 lub Tak/Nie), zawierający zarówno kolumny **liczbowe**, jak i **kategoryczne**. Może to być np.:

- Predykcja rezygnacji klienta (churn) w telekomunikacji lub subskrypcji
- Predykcja przetrwania pasażera (np. zbiór Titanic)
- Predykcja niespłacenia kredytu na podstawie danych finansowych klienta
- Dowolny inny zbiór z [Kaggle](https://www.kaggle.com/datasets) — **inny niż wykorzystany na zajęciach**

Wykonaj w Jupyter Notebook (Google Colab, PySpark) następujące kroki:

### Część 1: Przygotowanie danych
- Wczytaj dane jako Spark DataFrame (z pliku CSV/URL lub wygenerowane proceduralnie, `random.seed(42)`)
- Zidentyfikuj kolumny kategoryczne i zakoduj je przy pomocy `StringIndexer` + `OneHotEncoder`
- Połącz wszystkie features w jedną kolumnę wektorową przy pomocy `VectorAssembler`

### Część 2: Budowa Pipeline
- Zbuduj `Pipeline` łączący wszystkie etapy preprocessing + model
- Podziel dane na zbiór treningowy i testowy (70/30) używając `.randomSplit(seed=42)`
- Wytrenuj **dwa** modele: `LogisticRegression` oraz `RandomForestClassifier`

### Część 3: Ewaluacja
- Oblicz **AUC** (`BinaryClassificationEvaluator`) dla obu modeli i porównaj je
- Oblicz **accuracy** i **precision/recall** (`MulticlassClassificationEvaluator`) dla lepszego modelu
- Krótko opisz (2-3 zdania w komórce Markdown): który model wypadł lepiej i dlaczego mogło tak być?

### Część 4: Zapis modelu
- Zapisz wytrenowany `PipelineModel` na dysku (`.save()`)
- Wczytaj go ponownie (`PipelineModel.load()`) i zweryfikuj, że predykcje są identyczne jak przed zapisem

---

## 📦 Wymagania techniczne

- Notebook w Google Colab lub lokalnym Jupyter z zainstalowanym `pyspark` (`!pip install -q pyspark`)
- Dane wczytane z pliku CSV/URL lub wygenerowane proceduralnie (`random.seed(42)` dla powtarzalności)
- Kod Pipeline zawierający komentarze wyjaśniające wybór kolumn kategorycznych i liczbowych
- Krótkie podsumowanie wniosków (Markdown, 3-5 zdań) na końcu notebooka

---

## 💡 Wskazówki

- `Pipeline(stages=[...])` w MLlib działa jak `sklearn.pipeline.Pipeline`: `pipeline.fit(train).transform(test)`
- `VectorAssembler` wymaga podania listy kolumn do `inputCols` — nie zapomnij dołączyć zakodowanych kolumn kategorycznych!
- `BinaryClassificationEvaluator` wymaga kolumny `rawPrediction`, a nie `prediction`
- Dokumentacja: [spark.apache.org/docs/latest/ml-guide.html](https://spark.apache.org/docs/latest/ml-guide.html)

Powodzenia! 🚀🤖
