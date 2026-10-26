---
id: egzamin
title: "Egzamin teoretyczny"
sidebar_label: "📝 Egzamin teoretyczny"
description: "Informacje o teście teoretycznym, przewodnik do nauki i przykładowe pytania — 70% oceny końcowej."
---

import Admonition from '@theme/Admonition';

# 📝 Egzamin teoretyczny

**Kurs:** Python w Zastosowaniach Big Data &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027 &nbsp;|&nbsp; **Studia stacjonarne** &nbsp;|&nbsp; **Prowadzący:** Pavlo Melnyk (melnyk@pjwstk.edu.pl)

---

<Admonition type="danger" title="70% oceny końcowej — 15.12.2026">
  Test teoretyczny odbędzie się na **Zajęciach nr 11 — 15.12.2026 (wtorek)**. Obrony projektów zaliczeniowych odbywają się na **osobnych, kolejnych zajęciach — 22.12.2026**. Sprawdź koniecznie stronę **["Projekt zaliczeniowy"](./projekt-zaliczeniowy.md)**, aby poznać godzinę swojej obrony oraz termin oddania projektu (19.12.2026).
</Admonition>

## 🎯 Waga egzaminu w ocenie końcowej

| Składnik oceny | Waga |
|-----------------|------|
| **Test teoretyczny** | **70%** |
| Projekt zaliczeniowy | **30%** |
| Aktywność na zajęciach (bonus) | +10% (ponad 100%) |

Test teoretyczny jest **największym składnikiem oceny końcowej**. Zadania domowe nie są oceniane — ale to najlepszy sposób, żeby się do niego przygotować!

---

## 📋 Format egzaminu

<Admonition type="info" title="Format: test pisemny, wyłącznie pytania zamknięte">
  **Test pisemny, notatki zamknięte (closed-book)** — dozwolony jedynie kalkulator (nie kalkulator w telefonie!). Formularz papierowy, test indywidualny.
</Admonition>

| Parametr | Wartość |
|----------|---------|
| **Forma** | Pisemny, zamknięte notatki (closed-book) |
| **Liczba pytań** | **30 pytań zamkniętych** — jednokrotny wybór z 4 opcji (A/B/C/D), jedna poprawna odpowiedź |
| **Punktacja** | +1 punkt za poprawną odpowiedź, 0 punktów za błędną/brak odpowiedzi — **brak punktów ujemnych** |
| **Czas trwania** | 45 minut |
| **Próg zaliczenia** | 50% punktów (15/30) |
| **Zakres materiału** | Wykłady 1–10 (całość) |
| **Dozwolone pomoce** | Wyłącznie kalkulator |

<Admonition type="tip" title="Brak punktów ujemnych — zawsze zaznacz odpowiedź!">
  Ponieważ nie ma punktów ujemnych za błędną odpowiedź, **zawsze warto zaznaczyć jakąś odpowiedź**, nawet jeśli nie jesteś pewien/pewna — brak odpowiedzi i błędna odpowiedź są punktowane tak samo (0 punktów), więc zgadywanie nigdy Cię nie kosztuje.
</Admonition>

---

## 📚 Zakres materiału (przewodnik do nauki)

Poniższa tabela to Twoja mapa do powtórki — dla każdego wykładu wypisano kluczowe pojęcia, które **musisz** znać na egzamin.

### Wykład 1 — Statystyka opisowa i EDA

- Populacja vs próba, typy zmiennych (numeryczna ciągła/dyskretna, kategoryczna nominalna/porządkowa)
- Miary tendencji centralnej (średnia, mediana, moda) i wrażliwość na outliery
- Miary rozproszenia: wariancja, odchylenie standardowe, kwantyle, IQR i reguła wykrywania outlierów
- Rozkłady prawdopodobieństwa: normalny, jednostajny, Poissona, wykładniczy; reguła 68-95-99.7
- Workflow EDA i pułapki (skośność, korelacja ≠ przyczynowość, kwartet Anscombe'a)
- Intuicja wnioskowania statystycznego: przedział ufności, hipoteza zerowa, p-wartość i jej poprawna interpretacja

### Wykład 2 — Dane w skali: formaty i przechowywanie danych

- Kiedy dane przestają być „małe”; dlaczego w Big Data wąskim gardłem jest I/O
- Format wierszowy vs kolumnowy; CSV, JSON Lines, Avro, Parquet, Arrow — wady, zalety, zastosowania
- Parquet: schemat w pliku, column pruning, predicate pushdown, kompresja (snappy, zstd, gzip)
- Optymalizacja pamięci (typy danych, `category`), przetwarzanie w kawałkach (chunks)
- Partycjonowanie Hive-style i problem małych plików; scale up vs scale out; wzorzec map → reduce
- Data Warehouse vs Data Lake vs Lakehouse, architektura medalionowa (Bronze/Silver/Gold)

### Wykład 3 — Big Data i ekosystem Hadoop

- 5V Big Data (Volume, Velocity, Variety, Veracity, Value)
- HDFS: NameNode, DataNode, Secondary NameNode, replication factor (domyślnie 3)
- MapReduce: fazy map / shuffle / reduce, dlaczego jest wolny (zapis na dysk)
- YARN: ResourceManager, NodeManager, ApplicationMaster, Container
- Ekosystem: Hive, HBase, Sqoop, Oozie

### Wykład 4 — Apache Spark: architektura, RDD i podstawy PySpark

- Dlaczego Spark jest szybszy niż MapReduce (przetwarzanie w RAM)
- Architektura: Driver, Cluster Manager, Executory
- RDD: Resilient (lineage), Distributed, Dataset
- Transformacje (lazy) vs akcje (eager): `map`, `filter`, `flatMap`, `reduceByKey` vs `collect`, `count`, `take`
- Pułapki: `collect()` na dużych danych, `groupByKey` vs `reduceByKey`, brak `cache()`

### Wykład 5 — Spark SQL i DataFrames: od podstaw po zaawansowane zapytania i optymalizację

- DataFrame vs RDD — schemat i Catalyst Optimizer
- `SparkSession`, `StructType`/`StructField`, formaty CSV/JSON/Parquet
- Transformacje: `select`, `filter`, `withColumn`, `groupBy`, `agg`, `orderBy`
- Typy joinów: `inner`, `left`, `full_outer`, `broadcast`
- Spark SQL (`spark.sql()`, `createOrReplaceTempView`) — ta sama wydajność co DataFrame API
- Window functions: `Window.partitionBy`/`orderBy`, `row_number`, `rank`/`dense_rank`, `lag`/`lead`, `rowsBetween`
- UDF — koszt wydajnościowy (Catalyst nie optymalizuje "czarnej skrzynki")
- Catalyst Optimizer: 4 fazy planu zapytania; Tungsten jako silnik wykonawczy
- `repartition()` (zawsze shuffle) vs `coalesce()` (zwykle bez pełnego shuffla)
- `.explain()`: `Exchange` (shuffle), `BroadcastHashJoin` vs `SortMergeJoin`; `cache()`/`persist()`

### Wykład 6 — Przygotowanie danych do ML: Feature Engineering

- Miejsce feature engineering w ML workflow
- Braki danych: `SimpleImputer` (median dla numerycznych, most_frequent dla kategorycznych)
- Encoding: `OneHotEncoder` (nominalne) vs `OrdinalEncoder` (porządkowe) vs `LabelEncoder` (target)
- Skalowanie: `StandardScaler` vs `MinMaxScaler`; nowe cechy (ratio, binning, `PolynomialFeatures`)
- `Pipeline` + `ColumnTransformer`, train/test split i data leakage

### Wykład 7 — Modele ML: klasyfikacja, regresja i ewaluacja

- Klasyfikacja vs regresja — algorytmy i metryki
- Logistic Regression, Decision Tree, Random Forest, Gradient Boosting
- Parametry vs hiperparametry; bias-variance tradeoff (underfitting vs overfitting)
- Metryki klasyfikacji: accuracy, precision, recall, F1, ROC-AUC, confusion matrix
- Metryki regresji: MAE, RMSE, R²; cross-validation i `GridSearchCV`

### Wykład 8 — Spark MLlib: od podstaw Machine Learning na dużą skalę po tuning hiperparametrów

- Kiedy scikit-learn przestaje wystarczać (>10 GB / rosnące dane)
- `pyspark.ml`: Transformer, Estimator, Pipeline, Evaluator
- Przygotowanie danych: `StringIndexer`, `OneHotEncoder`, `VectorAssembler`
- `LogisticRegression` vs `RandomForestClassifier` w MLlib
- `BinaryClassificationEvaluator` (AUC); pułapki: brak `VectorAssembler`, fit przed splitem
- `ParamGridBuilder` — siatka kombinacji hiperparametrów
- `CrossValidator` (k-fold, solidniejszy) vs `TrainValidationSplit` (szybszy, jeden podział)
- Class imbalance: `weightCol`, undersampling
- `GBTClassifier` (Gradient-Boosted Trees), AUC-ROC vs AUC-PR (ta druga lepsza przy imbalance)
- Zapis/odczyt `PipelineModel` (`write().overwrite().save()` / `PipelineModel.load()`)

### Wykład 9 — Cloud Computing i GCP: BigQuery, Dataproc

- Modele usług: IaaS / PaaS / SaaS (Compute Engine / Dataproc / BigQuery)
- Data lake vs data warehouse vs lakehouse (GCS vs BigQuery vs BigLake)
- BigQuery: silnik Dremel, storage Colossus, płatność za przeskanowane bajty, `dry_run`
- Partycjonowanie (`PARTITION BY`) i clustering (`CLUSTER BY`) jako sposób obniżenia kosztów
- Dataproc: ephemeral klastry Spark w chmurze (`gcloud dataproc clusters create/delete`)

### Wykład 10 — Przetwarzanie strumieniowe: Structured Streaming i Kafka

- Batch vs streaming: opóźnienie, złożoność, przykłady zastosowań
- Kafka: topic, partition, producer, consumer, broker
- Structured Streaming: model unbounded table, `readStream`/`writeStream`
- Windowed aggregations (tumbling/sliding) i watermarking (obsługa spóźnionych danych)
- Output modes: `append`, `complete`, `update`; pułapki (brak `checkpointLocation`, brak watermarku)

---

## 💡 Jak się przygotować

<Admonition type="tip" title="Plan powtórki">
  Nie zostawiaj powtórki na ostatni wieczór — materiał obejmuje 10 wykładów, a test sprawdza **zrozumienie**, nie tylko zapamiętanie definicji.
</Admonition>

1. **Przejrzyj slajdy PDF każdego wykładu** — to Twoje główne źródło, uzupełnione o strony dokumentacji (te same, z których powstał ten przewodnik).
2. **Wróć do notatników ćwiczeniowych** — jeśli pamiętasz, *dlaczego* użyłeś `reduceByKey` zamiast `groupByKey` albo `OrdinalEncoder` zamiast `OneHotEncoder` w konkretnym zadaniu, zapamiętasz to na egzaminie znacznie lepiej niż z samej definicji.
3. **Odtwórz kluczowe wzory i tabele z pamięci** — np. wzory na precision/recall/F1, regułę 68-95-99.7, kroki testowania hipotez, fazy MapReduce. Zapisz je na kartce bez podglądania, a potem porównaj z materiałem.
4. **Tłumacz pojęcia na głos** — jeśli potrafisz w 2 zdaniach wytłumaczyć koledze, czym różni się `CrossValidator` od `TrainValidationSplit`, naprawdę to rozumiesz (a nie tylko rozpoznajesz nazwę).
5. **Pracuj w grupach** — zadawajcie sobie nawzajem pytania z sekcji "Przemyśl to 🤔" na końcu każdego wykładu; to świetny materiał do dyskusji.
6. **Przećwicz pytania z banku poniżej** — bez podglądania odpowiedzi, a dopiero potem sprawdź się kluczem. Format jest identyczny jak na prawdziwym teście: 4 opcje (A/B/C/D), jedna poprawna.
7. **Zwróć uwagę na "dlaczego", nie tylko "co"** — wiele pytań (i dystraktorów) testuje uzasadnienie decyzji (np. "dlaczego Parquet jest szybszy niż CSV"), nie samą definicję.

---

## ❓ Przykładowe pytania (question bank)

Poniżej znajdziesz **30 przykładowych pytań** (po 3 na każdy wykład) w dokładnie takim formacie, jak na prawdziwym teście — **pytania zamknięte, 4 opcje (A/B/C/D), jedna poprawna odpowiedź, brak punktów ujemnych**. Traktuj je jako trening, nie jako gwarancję dokładnych pytań na egzaminie.

### Wykład 1 — Statystyka opisowa i EDA

**Pytanie 1.** Zbiór czasów ukończenia maratonu ma średnią 260 min i medianę 240 min. Co to najprawdopodobniej sugeruje?

A) Rozkład jest idealnie symetryczny
B) **Rozkład jest prawoskośny lub zawiera wysokie wartości odstające** ✅
C) Dane na pewno mają rozkład normalny
D) Odchylenie standardowe musi wynosić zero

✅ Poprawna odpowiedź: B — duża różnica między średnią a medianą to sygnał skośności lub outlierów.

**Pytanie 2.** Dlaczego IQR (rozstęp międzykwartylowy) jest lepszą miarą do wykrywania outlierów niż samo odchylenie standardowe?

A) Ponieważ ignoruje medianę zbioru danych
B) **Ponieważ opiera się na kwantylach (Q1, Q3), które są odporne na wartości ekstremalne** ✅
C) Ponieważ zawsze wynosi zero dla danych symetrycznych
D) Ponieważ odchylenie standardowe nie zależy od średniej

✅ Poprawna odpowiedź: B — pojedynczy outlier silnie zawyża odchylenie standardowe (bo zależy ono od kwadratów odchyleń od średniej), podczas gdy kwantyle nie są przez niego zniekształcane.

**Pytanie 3.** Zgodnie z regułą 68-95-99.7 dla rozkładu normalnego, jaki (w przybliżeniu) procent obserwacji znajduje się w przedziale ±2 odchylenia standardowe od średniej?

A) 68%
B) **95%** ✅
C) 99.7%
D) 50%

✅ Poprawna odpowiedź: B — ±1σ obejmuje ~68%, ±2σ obejmuje ~95%, a ±3σ obejmuje ~99.7% obserwacji.

### Wykład 2 — Dane w skali: formaty i przechowywanie danych

**Pytanie 4.** Analityk czyta z tabeli o 200 kolumnach tylko 3 kolumny. Dlaczego zapytanie na pliku Parquet będzie znacznie szybsze niż na pliku CSV?

A) Parquet zawsze trzyma dane w pamięci RAM
B) **Parquet jest formatem kolumnowym, więc odczytuje tylko potrzebne kolumny (column pruning)** ✅
C) CSV nie obsługuje więcej niż 100 kolumn
D) Parquet nie stosuje kompresji, więc nie trzeba dekompresować danych

✅ Poprawna odpowiedź: B — w formacie kolumnowym wartości jednej kolumny leżą obok siebie, więc silnik może pominąć pozostałe 197 kolumn.

**Pytanie 5.** Dlaczego partycjonowanie zbioru danych po kolumnie `user_id` z milionem unikalnych wartości to zazwyczaj zły pomysł?

A) **Tworzy to miliony bardzo małych plików/katalogów, co pogarsza wydajność (problem małych plików)** ✅
B) Parquet nie obsługuje partycjonowania po kolumnach tekstowych
C) `user_id` nie może być użyty jako klucz partycji
D) Zwiększa to współczynnik kompresji danych

✅ Poprawna odpowiedź: A — partycjonowanie po kolumnie o bardzo dużej liczbie unikalnych wartości tworzy ogromną liczbę malutkich partycji, co jest znacznie mniej wydajne niż partycjonowanie po kolumnie o rozsądnej kardynalności (np. `miasto` czy `data`).

**Pytanie 6.** W architekturze medalionowej (Bronze/Silver/Gold), warstwa **Silver** zawiera dane, które są:

A) Surowe, dokładnie takie, jakie wpłynęły ze źródła
B) **Oczyszczone, zwalidowane i ustandaryzowane, ale jeszcze nie zagregowane biznesowo** ✅
C) Gotowe raporty i wskaźniki biznesowe (KPI)
D) Wyłącznie metadane katalogowe, bez samych danych

✅ Poprawna odpowiedź: B — Bronze to dane surowe, Silver to dane oczyszczone/ujednolicone, Gold to dane zagregowane gotowe do raportowania biznesowego.

### Wykład 3 — Big Data i ekosystem Hadoop

**Pytanie 7.** Które z poniższych pojęć **NIE** jest częścią modelu 5V Big Data?

A) Volume
B) Velocity
C) **Validation** ✅
D) Veracity

✅ Poprawna odpowiedź: C — model 5V to Volume, Velocity, Variety, Veracity, Value; "Validation" do niego nie należy.

**Pytanie 8.** Co zwróci poniższa funkcja dla `dokumenty = ["a b a", "b c"]`?

```python
def map_reduce_word_count(dokumenty: list[str]) -> dict[str, int]:
    mapped = []
    for dokument in dokumenty:
        mapped.extend((slowo, 1) for slowo in dokument.lower().split())
    grouped = {}
    for slowo, wartosc in mapped:
        grouped.setdefault(slowo, []).append(wartosc)
    return {slowo: sum(w) for slowo, w in grouped.items()}
```

A) `{'a': 1, 'b': 1, 'c': 1}`
B) **`{'a': 2, 'b': 2, 'c': 1}`** ✅
C) `{'a': 3, 'b': 2, 'c': 1}`
D) Funkcja zwróci błąd (Error)

✅ Poprawna odpowiedź: B — faza map produkuje pary (słowo, 1), shuffle grupuje po kluczu, reduce sumuje wartości dla każdego klucza.

**Pytanie 9.** Jaki jest domyślny collection factor (replication factor) w HDFS?

A) 1
B) 2
C) **3** ✅
D) 5

✅ Poprawna odpowiedź: C — domyślnie każdy blok danych w HDFS jest replikowany na 3 różne DataNode'y, co zapewnia odporność na awarie.

### Wykład 4 — Apache Spark: architektura, RDD i podstawy PySpark

**Pytanie 10.** Która z poniższych operacji RDD jest **akcją**, a nie transformacją?

A) `map()`
B) `filter()`
C) **`collect()`** ✅
D) `reduceByKey()`

✅ Poprawna odpowiedź: C — `collect()` natychmiast uruchamia obliczenia i zwraca konkretny wynik do drivera; pozostałe są leniwe (lazy).

**Pytanie 11.** Dlaczego `reduceByKey()` jest zazwyczaj wydajniejszy niż `groupByKey()`, gdy chcemy zsumować wartości dla każdego klucza?

A) **Ponieważ redukuje (agreguje) dane lokalnie na każdym executorze przed shuffle'em** ✅
B) Ponieważ nie wymaga podania klucza
C) Ponieważ zawsze działa wyłącznie w pamięci, bez zapisu na dysk
D) Ponieważ nie korzysta z sieci w ogóle

✅ Poprawna odpowiedź: A — `reduceByKey()` agreguje dane lokalnie przed przesłaniem ich przez sieć, więc shuffle przenosi już częściowe sumy, a nie wszystkie surowe wartości jak w `groupByKey()`.

**Pytanie 12.** Co oznacza litera "R" w nazwie RDD?

A) Random
B) **Resilient** ✅
C) Reduced
D) Replicated

✅ Poprawna odpowiedź: B — Resilient Distributed Dataset: "resilient" (odporny na awarie) dzięki mechanizmowi lineage, który pozwala odtworzyć utracone partycje.

### Wykład 5 — Spark SQL i DataFrames: od podstaw po zaawansowane zapytania i optymalizację

**Pytanie 13.** Który format plików ma wbudowaną schemę i jest najszybszy do zapytań agregujących w Spark SQL?

A) CSV
B) JSON
C) **Parquet** ✅
D) TXT

✅ Poprawna odpowiedź: C — Parquet to format kolumnowy z wbudowaną schemą, zoptymalizowany pod odczyt i agregacje.

**Pytanie 14.** Kiedy warto jawnie wymusić `broadcast()` przy joinie dwóch DataFrame'ów w Spark SQL?

A) Gdy obie tabele są bardzo duże
B) **Gdy jedna z tabel jest znacznie mniejsza i mieści się w pamięci każdego executora** ✅
C) Nigdy — Spark zawsze automatycznie wybiera najlepszą strategię joina
D) Tylko przy operacjach `groupBy`/`agg`, nigdy przy joinach

✅ Poprawna odpowiedź: B — `broadcast()` kopiuje małą tabelę do wszystkich executorów, eliminując kosztowny shuffle dużej tabeli.

**Pytanie 15.** Która funkcja okienkowa nadaje unikalny, kolejny numer każdemu wierszowi w partycji, nawet przy remisach?

A) `rank()`
B) `dense_rank()`
C) **`row_number()`** ✅
D) `lag()`

✅ Poprawna odpowiedź: C — `row_number()` zawsze zwraca unikalne, kolejne liczby, bez luk i bez powtórzeń nawet przy identycznych wartościach sortowania.

### Wykład 6 — Przygotowanie danych do ML: Feature Engineering

**Pytanie 16.** Do zakodowania kolumny "ranga gracza" (Brąz → Srebro → Złoto → Wyzwanie) powinniśmy użyć:

A) `OneHotEncoder`
B) **`OrdinalEncoder`** ✅
C) `StandardScaler`
D) `SimpleImputer`

✅ Poprawna odpowiedź: B — ranga ma naturalny porządek, więc `OrdinalEncoder` zachowuje tę informację, w przeciwieństwie do `OneHotEncoder`.

**Pytanie 17.** Dlaczego wykonanie `scaler.fit()` na całym zbiorze danych **przed** podziałem train/test może spowodować data leakage?

A) `StandardScaler` nie powinien być w ogóle używany w uczeniu maszynowym
B) **Statystyki użyte do skalowania (średnia, odchylenie) "widzą" już dane testowe, zawyżając ocenę modelu** ✅
C) `fit()` zawsze wymaga wcześniejszego podziału train/test, inaczej zgłosi błąd
D) To nie jest prawdziwy problem — kolejność `fit()` i podziału nie ma znaczenia

✅ Poprawna odpowiedź: B — jeśli `fit()` wykonamy na całym zbiorze, model pośrednio korzysta z informacji o danych testowych, których w rzeczywistości nie powinien znać podczas treningu.

**Pytanie 18.** Którą strategię imputacji braków danych stosuje się zazwyczaj domyślnie dla zmiennych **numerycznych** w `SimpleImputer`?

A) `most_frequent`
B) **`median`** ✅
C) Zawsze wstawiamy stałą wartość `0`
D) Zawsze usuwamy wiersze z brakami

✅ Poprawna odpowiedź: B — mediana jest odporna na wartości odstające, w przeciwieństwie do średniej; `most_frequent` stosuje się raczej dla zmiennych kategorycznych.

### Wykład 7 — Modele ML: klasyfikacja, regresja i ewaluacja

**Pytanie 19.** Model wykrywający rzadką chorobę (1% przypadków) ma 99% accuracy, ale recall = 2%. Która metryka lepiej ujawnia problem z tym modelem?

A) Accuracy
B) **Recall / F1-score** ✅
C) R²
D) MAE

✅ Poprawna odpowiedź: B — przy niezbalansowanych klasach accuracy jest myląca; recall pokazuje, że model wykrywa prawie żadnych rzeczywistych przypadków choroby.

**Pytanie 20.** Model świetnie radzi sobie na zbiorze treningowym, ale znacznie gorzej na zbiorze testowym. Na czym cierpi ten model?

A) Underfitting (wysoki bias)
B) **Overfitting (wysoka wariancja)** ✅
C) Data leakage w zbiorze treningowym
D) Zbyt małą liczbę hiperparametrów

✅ Poprawna odpowiedź: B — model "zapamiętał" szum danych treningowych zamiast nauczyć się ogólnych wzorców, dlatego słabo generalizuje na nowe dane.

**Pytanie 21.** Która metryka regresji jest najbardziej wrażliwa na duże błędy (outliery), ponieważ podnosi odchylenia do kwadratu?

A) MAE
B) **RMSE** ✅
C) R²
D) Accuracy

✅ Poprawna odpowiedź: B — RMSE (Root Mean Squared Error) podnosi błędy do kwadratu przed uśrednieniem, więc duże pojedyncze błędy mają nieproporcjonalnie duży wpływ na wynik, w przeciwieństwie do MAE.

### Wykład 8 — Spark MLlib: od podstaw Machine Learning na dużą skalę po tuning hiperparametrów

**Pytanie 22.** Który komponent MLlib jest odpowiedzialny za połączenie wielu kolumn cech w jedną kolumnę wektorową `features`?

A) `StringIndexer`
B) **`VectorAssembler`** ✅
C) `OneHotEncoder`
D) `BinaryClassificationEvaluator`

✅ Poprawna odpowiedź: B — `VectorAssembler` łączy wskazane kolumny w jedną kolumnę wektorową, wymaganą przez modele MLlib.

**Pytanie 23.** Przy silnie niezbalansowanym zbiorze danych (np. 1% fraudów) która metryka lepiej odzwierciedla jakość modelu niż AUC-ROC?

A) Accuracy
B) **AUC-PR (Precision-Recall)** ✅
C) R²
D) MAE

✅ Poprawna odpowiedź: B — AUC-PR skupia się na precision i recall klasy pozytywnej (rzadkiej), podczas gdy AUC-ROC jest "maskowane" przez dominującą liczbę True Negatives.

**Pytanie 24.** Kiedy warto wybrać `TrainValidationSplit` zamiast `CrossValidator` przy tuningu hiperparametrów w MLlib?

A) **Gdy zbiór danych jest bardzo duży, a pełny k-fold byłby zbyt kosztowny obliczeniowo** ✅
B) Nigdy — `CrossValidator` jest zawsze lepszym wyborem
C) Tylko gdy mamy bardzo mało danych (poniżej 100 rekordów)
D) `TrainValidationSplit` nie istnieje w Spark MLlib

✅ Poprawna odpowiedź: A — `TrainValidationSplit` wykonuje tylko jeden podział train/validation na każdą kombinację hiperparametrów, więc jest znacznie szybszy niż pełna walidacja k-fold, co ma znaczenie przy bardzo dużych zbiorach danych.

### Wykład 9 — Cloud Computing i GCP: BigQuery, Dataproc

**Pytanie 25.** Za co dokładnie płacimy, wykonując standardowe zapytanie SQL w BigQuery (on-demand)?

A) Za czas wykonania zapytania (sekundy)
B) **Za liczbę przeskanowanych bajtów** ✅
C) Za liczbę zwróconych wierszy
D) Za liczbę użytych tabel

✅ Poprawna odpowiedź: B — model cenowy BigQuery on-demand opiera się na ilości danych przeskanowanych przez zapytanie, niezależnie od czasu jego wykonania.

**Pytanie 26.** Dlaczego dodanie `PARTITION BY DATE(...)` do często odpytywanej po dacie tabeli BigQuery obniża koszty zapytań?

A) Zmniejsza fizyczny rozmiar tabeli zapisanej na dysku
B) **Zapytanie z filtrem po dacie skanuje tylko pasujące partycje, a nie całą tabelę** ✅
C) Partycjonowanie całkowicie wyłącza opłaty za zapytania
D) BigQuery bez partycjonowania w ogóle nie pozwala na wykonanie zapytania

✅ Poprawna odpowiedź: B — partycjonowanie fizycznie dzieli tabelę na segmenty (np. jeden na dzień); zapytanie z filtrem `WHERE data = '...'` skanuje tylko odpowiednie partycje, co drastycznie zmniejsza liczbę przeskanowanych bajtów.

**Pytanie 27.** W klasyfikacji modeli usług chmurowych IaaS / PaaS / SaaS, usługa **BigQuery** (w pełni zarządzany, bezserwerowy silnik zapytań) najlepiej pasuje do modelu:

A) IaaS (Infrastructure as a Service)
B) PaaS (Platform as a Service)
C) **SaaS (Software as a Service)** ✅
D) On-premise (infrastruktura lokalna)

✅ Poprawna odpowiedź: C — BigQuery jest w pełni zarządzaną usługą analityczną typu SaaS; dla porównania Compute Engine to IaaS, a Dataproc (zarządzane klastry Spark/Hadoop) to PaaS.

### Wykład 10 — Przetwarzanie strumieniowe: Structured Streaming i Kafka

**Pytanie 28.** W Spark Structured Streaming strumień danych jest modelowany jako:

A) Kolejka FIFO wiadomości
B) **Nieskończona (unbounded) tabela, do której dopisywane są nowe wiersze** ✅
C) Zbiór statycznych plików Parquet
D) Graf skierowany operacji RDD

✅ Poprawna odpowiedź: B — to kluczowa koncepcja Structured Streaming: standardowe operacje DataFrame/SQL działają na strumieniu tak, jakby to była rosnąca tabela.

**Pytanie 29.** Co dzieje się z danymi, które przychodzą później niż próg zdefiniowany przez `withWatermark` w Spark Structured Streaming?

A) Są zawsze przetwarzane, niezależnie od opóźnienia
B) **Są odrzucane, co pozwala zwolnić stan okien agregacji z pamięci** ✅
C) Są automatycznie zapisywane do oddzielnego pliku błędów
D) Powodują natychmiastowe zatrzymanie całego streamu

✅ Poprawna odpowiedź: B — watermarking definiuje, jak długo Spark czeka na spóźnione dane, zanim uzna okno agregacji za "zamknięte" i zwolni jego stan — dane spóźnione ponad ten próg są odrzucane, by uniknąć nieograniczonego wzrostu zużycia pamięci.

**Pytanie 30.** Który output mode w Spark Structured Streaming zapisuje **wyłącznie nowe wiersze** dodane od ostatniego zapytania (bez modyfikacji wcześniej zapisanych)?

A) `complete`
B) **`append`** ✅
C) `update`
D) `overwrite`

✅ Poprawna odpowiedź: B — `append` zapisuje tylko nowe wiersze dołączone od ostatniego wyzwolenia zapytania; `complete` zapisuje cały zaktualizowany wynik za każdym razem, a `update` zapisuje tylko zmienione wiersze.

---

## ⚠️ Uwagi końcowe

<Admonition type="warning" title="Zapamiętaj przed egzaminem">
  - Test obejmuje **całość materiału z Wykładów 1–10** — żaden wykład nie jest pominięty.
  - Test jest **indywidualny i zamknięty (closed-book)** — jedyną dozwoloną pomocą jest **kalkulator**.
  - **Zabierz ze sobą legitymację studencką (lub inny dokument tożsamości ze zdjęciem)** — bez niej nie przystąpisz do testu.
  - Test odbywa się **15.12.2026** (Zajęcia nr 11) — obrony projektów zaliczeniowych odbywają się **osobnego dnia, 22.12.2026** (sprawdź **["Projekt zaliczeniowy"](./projekt-zaliczeniowy.md)**).
  - Test zawiera **wyłącznie pytania zamknięte** (30 × ABCD, jedna poprawna odpowiedź) — **brak punktów ujemnych**, więc zawsze zaznacz jakąś odpowiedź.
  - Próg zaliczenia to **50% punktów (15/30)** — powodzenia! 🎓
</Admonition>
