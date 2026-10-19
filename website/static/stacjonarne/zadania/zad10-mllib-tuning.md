# Zadanie domowe 10: Tuning hiperparametrów w MLlib

**Poziom trudności:** ⭐⭐⭐⭐⭐ (Zaawansowany)

---

## 🎯 Cel zadania

Utrwalenie **tuningu hiperparametrów** modelu MLlib przy pomocy `ParamGridBuilder` i `CrossValidator` na **samodzielnie wybranym** zbiorze danych — innym niż transakcje kartą płatniczą z laboratorium.

---

## 📋 Zadanie

Wybierz dowolny zbiór danych z problemem **klasyfikacji binarnej** (kolumna etykiety 0/1 lub Tak/Nie), najlepiej z pewnym stopniem niezbalansowania klas. Może to być np.:

- Predykcja awarii maszyny na podstawie danych z czujników IoT
- Predykcja rezygnacji klienta (churn) w subskrypcji lub telekomunikacji
- Predykcja niespłacenia kredytu na podstawie danych finansowych klienta
- Dowolny inny zbiór z [Kaggle](https://www.kaggle.com/datasets) — **inny niż wykorzystany na zajęciach**

Wykonaj w Jupyter Notebook (Google Colab, PySpark) następujące kroki:

### Część 1: Przygotowanie danych i baseline
- Wczytaj dane jako Spark DataFrame (z pliku CSV/URL lub wygenerowane proceduralnie, `random.seed(42)`)
- Przygotuj features (`StringIndexer` + `VectorAssembler` dla kolumn kategorycznych i liczbowych)
- Podziel dane na zbiór treningowy i testowy (70/30) używając `.randomSplit(seed=42)` i zcache'uj zbiór treningowy
- Wytrenuj baseline'owy model (np. `RandomForestClassifier` z domyślnymi hiperparametrami) i oblicz `areaUnderPR`

### Część 2: Tuning z `ParamGridBuilder` i `CrossValidator`
- Zbuduj siatkę hiperparametrów (`ParamGridBuilder`) dla wybranego modelu — min. 2 hiperparametry, min. 2 wartości każdy
- Owiń `Pipeline` w `CrossValidator` (`numFolds=3`), oceniając `areaUnderPR`
- Wytrenuj `CrossValidator` na zbiorze treningowym i wyciągnij `bestModel`
- Porównaj AUC-PR modelu bazowego z modelem po tuningu — czy tuning pomógł?

### Część 3: Ewaluacja i analiza
- Wyciągnij z `bestModel` wybrane przez CV wartości hiperparametrów
- Oblicz macierz konfuzji przy domyślnym progu (0.5) oraz przy jednym, innym progu do wyboru
- Krótko opisz (3-5 zdań w komórce Markdown): czy zbiór był niezbalansowany, jak to sprawdziłeś/aś, i czy tuning oraz zmiana progu poprawiły wyniki

### Część 4: Zapis modelu
- Zapisz wytrenowany `bestModel` (`PipelineModel`) na dysku (`.write().overwrite().save()`)
- Wczytaj go ponownie (`PipelineModel.load()`) i zweryfikuj, że predykcje są identyczne jak przed zapisem

---

## 📦 Wymagania techniczne

- Notebook w Google Colab lub lokalnym Jupyter z zainstalowanym `pyspark` (`!pip install -q pyspark`)
- Dane wczytane z pliku CSV/URL lub wygenerowane proceduralnie (`random.seed(42)` dla powtarzalności)
- Kod tuningu zawierający komentarze wyjaśniające wybór hiperparametrów i wartości siatki
- Krótkie podsumowanie wniosków (Markdown, 3-5 zdań) na końcu notebooka

---

## 💡 Wskazówki

- `CrossValidator(estimator=pipeline, ...)` przyjmuje **cały** `Pipeline` jako estimator, nie sam model
- Pamiętaj o `train_df.cache()` przed `cv.fit()` — inaczej CV wielokrotnie przelicza te same dane
- `BinaryClassificationEvaluator` z `metricName="areaUnderPR"` jest lepszą metryką niż `"areaUnderROC"` przy niezbalansowanych danych
- Dokumentacja: [spark.apache.org/docs/latest/ml-tuning.html](https://spark.apache.org/docs/latest/ml-tuning.html)

Powodzenia! 🚀🕵️
