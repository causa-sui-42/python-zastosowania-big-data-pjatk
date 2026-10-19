---
id: egzamin
title: "Egzamin teoretyczny"
sidebar_label: "📝 Egzamin teoretyczny"
description: "Informacje o egzaminie teoretycznym, przewodnik do nauki i przykładowe pytania — 70% oceny końcowej."
---

import Admonition from '@theme/Admonition';

# 📝 Egzamin teoretyczny

**Kurs:** Python w Zastosowaniach Big Data &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027 &nbsp;|&nbsp; **Studia stacjonarne** &nbsp;|&nbsp; **Prowadzący:** Pavlo Melnyk (melnyk@pjwstk.edu.pl)

---

<Admonition type="danger" title="70% oceny końcowej — 19.01.2027">
  Egzamin teoretyczny odbędzie się na **Zajęciach nr 13 — 19.01.2027 (wtorek)**, w tym samym dniu, w którym odbywają się **obrony projektów zaliczeniowych**. Sprawdź koniecznie stronę **["Projekt zaliczeniowy"](./projekt-zaliczeniowy.md)**, aby poznać godzinę swojej obrony — egzamin i obrony odbywają się na tych samych zajęciach.
</Admonition>

## 🎯 Waga egzaminu w ocenie końcowej

| Składnik oceny | Waga |
|-----------------|------|
| **Egzamin teoretyczny** | **70%** |
| Projekt zaliczeniowy | **30%** |
| Aktywność na zajęciach (bonus) | +10% (ponad 100%) |

Egzamin jest **największym składnikiem oceny końcowej**. Zadania domowe nie są oceniane — ale to najlepszy sposób, żeby się do niego przygotować!

---

## 📋 Format egzaminu

<Admonition type="info" title="Format: test pisemny">
  **Test pisemny, notatki zamknięte (closed-book)** — dozwolony jedynie kalkulator (nie kalkulator w telefonie!). Formularz papierowy, egzamin indywidualny.
</Admonition>

| Parametr | Wartość |
|----------|---------|
| **Forma** | Pisemny, zamknięte notatki (closed-book) |
| **Liczba pytań zamkniętych** | 20 (jednokrotny lub wielokrotny wybór) |
| **Liczba pytań otwartych** | 3 (krótka odpowiedź) |
| **Czas trwania** | 60 minut |
| **Próg zaliczenia** | 50% punktów |
| **Zakres materiału** | Wykłady 1–12 (całość) |
| **Dozwolone pomoce** | Wyłącznie kalkulator |

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

### Wykład 5 — Spark SQL i DataFrames

- DataFrame vs RDD — schemat i Catalyst Optimizer
- `SparkSession`, `StructType`/`StructField`, formaty CSV/JSON/Parquet
- Transformacje: `select`, `filter`, `withColumn`, `groupBy`, `agg`, `orderBy`
- Typy joinów: `inner`, `left`, `full_outer`, `broadcast`
- Spark SQL (`spark.sql()`, `createOrReplaceTempView`) — ta sama wydajność co DataFrame API

### Wykład 6 — Zaawansowany Spark SQL: window functions i optymalizacja

- Window functions: `Window.partitionBy`/`orderBy`, `row_number`, `rank`/`dense_rank`, `lag`/`lead`, `rowsBetween`
- UDF — koszt wydajnościowy (Catalyst nie optymalizuje "czarnej skrzynki")
- Catalyst Optimizer: 4 fazy planu zapytania; Tungsten jako silnik wykonawczy
- `repartition()` (zawsze shuffle) vs `coalesce()` (zwykle bez pełnego shuffla)
- `.explain()`: `Exchange` (shuffle), `BroadcastHashJoin` vs `SortMergeJoin`; `cache()`/`persist()`

### Wykład 7 — Przygotowanie danych do ML: Feature Engineering

- Miejsce feature engineering w ML workflow
- Braki danych: `SimpleImputer` (median dla numerycznych, most_frequent dla kategorycznych)
- Encoding: `OneHotEncoder` (nominalne) vs `OrdinalEncoder` (porządkowe) vs `LabelEncoder` (target)
- Skalowanie: `StandardScaler` vs `MinMaxScaler`; nowe cechy (ratio, binning, `PolynomialFeatures`)
- `Pipeline` + `ColumnTransformer`, train/test split i data leakage

### Wykład 8 — Modele ML: klasyfikacja, regresja i ewaluacja

- Klasyfikacja vs regresja — algorytmy i metryki
- Logistic Regression, Decision Tree, Random Forest, Gradient Boosting
- Parametry vs hiperparametry; bias-variance tradeoff (underfitting vs overfitting)
- Metryki klasyfikacji: accuracy, precision, recall, F1, ROC-AUC, confusion matrix
- Metryki regresji: MAE, RMSE, R²; cross-validation i `GridSearchCV`

### Wykład 9 — Spark MLlib: Machine Learning na dużą skalę

- Kiedy scikit-learn przestaje wystarczać (>10 GB / rosnące dane)
- `pyspark.ml`: Transformer, Estimator, Pipeline, Evaluator
- Przygotowanie danych: `StringIndexer`, `OneHotEncoder`, `VectorAssembler`
- `LogisticRegression` vs `RandomForestClassifier` w MLlib
- `BinaryClassificationEvaluator` (AUC); pułapki: brak `VectorAssembler`, fit przed splitem

### Wykład 10 — Zaawansowany MLlib: tuning hiperparametrów

- `ParamGridBuilder` — siatka kombinacji hiperparametrów
- `CrossValidator` (k-fold, solidniejszy) vs `TrainValidationSplit` (szybszy, jeden podział)
- Class imbalance: `weightCol`, undersampling
- `GBTClassifier` (Gradient-Boosted Trees), AUC-ROC vs AUC-PR (ta druga lepsza przy imbalance)
- Zapis/odczyt `PipelineModel` (`write().overwrite().save()` / `PipelineModel.load()`)

### Wykład 11 — Cloud Computing i GCP: BigQuery, Dataproc

- Modele usług: IaaS / PaaS / SaaS (Compute Engine / Dataproc / BigQuery)
- Data lake vs data warehouse vs lakehouse (GCS vs BigQuery vs BigLake)
- BigQuery: silnik Dremel, storage Colossus, płatność za przeskanowane bajty, `dry_run`
- Partycjonowanie (`PARTITION BY`) i clustering (`CLUSTER BY`) jako sposób obniżenia kosztów
- Dataproc: ephemeral klastry Spark w chmurze (`gcloud dataproc clusters create/delete`)

### Wykład 12 — Przetwarzanie strumieniowe: Structured Streaming i Kafka

- Batch vs streaming: opóźnienie, złożoność, przykłady zastosowań
- Kafka: topic, partition, producer, consumer, broker
- Structured Streaming: model unbounded table, `readStream`/`writeStream`
- Windowed aggregations (tumbling/sliding) i watermarking (obsługa spóźnionych danych)
- Output modes: `append`, `complete`, `update`; pułapki (brak `checkpointLocation`, brak watermarku)

---

## 💡 Jak się przygotować

<Admonition type="tip" title="Plan powtórki">
  Nie zostawiaj powtórki na ostatni wieczór — materiał obejmuje 12 wykładów, a egzamin sprawdza **zrozumienie**, nie tylko zapamiętanie definicji.
</Admonition>

1. **Przejrzyj slajdy PDF każdego wykładu** — to Twoje główne źródło, uzupełnione o strony dokumentacji (te same, z których powstał ten przewodnik).
2. **Wróć do notatników ćwiczeniowych** — jeśli pamiętasz, *dlaczego* użyłeś `reduceByKey` zamiast `groupByKey` albo `OrdinalEncoder` zamiast `OneHotEncoder` w konkretnym zadaniu, zapamiętasz to na egzaminie znacznie lepiej niż z samej definicji.
3. **Odtwórz kluczowe wzory i tabele z pamięci** — np. wzory na precision/recall/F1, regułę 68-95-99.7, kroki testowania hipotez, fazy MapReduce. Zapisz je na kartce bez podglądania, a potem porównaj z materiałem.
4. **Tłumacz pojęcia na głos** — jeśli potrafisz w 2 zdaniach wytłumaczyć koledze, czym różni się `CrossValidator` od `TrainValidationSplit`, naprawdę to rozumiesz (a nie tylko rozpoznajesz nazwę).
5. **Pracuj w grupach** — zadawajcie sobie nawzajem pytania z sekcji "Przemyśl to 🤔" na końcu każdego wykładu; to świetny materiał do dyskusji.
6. **Przećwicz pytania z banku poniżej** — bez podglądania odpowiedzi, a dopiero potem sprawdź się kluczem.
7. **Zwróć uwagę na "dlaczego", nie tylko "co"** — pytania otwarte często pytają o uzasadnienie decyzji (np. "dlaczego Parquet jest szybszy niż CSV"), nie samą definicję.

---

## ❓ Przykładowe pytania (question bank)

Poniżej znajdziesz **26 przykładowych pytań** (po 2 na każdy wykład) — mieszanka pytań zamkniętych i otwartych, oparta na rzeczywistej treści wykładów. Traktuj je jako trening, nie jako gwarancję dokładnych pytań na egzaminie.

### Wykład 1 — Statystyka opisowa i EDA

**Pytanie 1 (zamknięte).** Zbiór czasów ukończenia maratonu ma średnią 260 min i medianę 240 min. Co to najprawdopodobniej sugeruje?

A) Rozkład jest idealnie symetryczny
B) **Rozkład jest prawoskośny lub zawiera wysokie wartości odstające** ✅
C) Dane na pewno mają rozkład normalny
D) Odchylenie standardowe musi wynosić zero

✅ Poprawna odpowiedź: B — duża różnica między średnią a medianą to sygnał skośności lub outlierów.

**Pytanie 2 (otwarte).** Wyjaśnij krótko, dlaczego IQR (rozstęp międzykwartylowy) jest lepszą miarą do wykrywania outlierów niż samo odchylenie standardowe.

*Model odpowiedzi:* IQR opiera się na kwantylach (Q1, Q3), które są odporne na wartości ekstremalne — nie są przez nie zniekształcane. Odchylenie standardowe zależy od średniej i kwadratów odchyleń, więc pojedynczy outlier silnie je zawyża, co utrudnia wykrycie innych, mniej ekstremalnych odstępstw.

### Wykład 2 — Dane w skali: formaty i przechowywanie danych

**Pytanie 3 (zamknięte).** Analityk czyta z tabeli o 200 kolumnach tylko 3 kolumny. Dlaczego zapytanie na pliku Parquet będzie znacznie szybsze niż na pliku CSV?

A) Parquet zawsze trzyma dane w pamięci RAM
B) **Parquet jest formatem kolumnowym, więc odczytuje tylko potrzebne kolumny (column pruning)** ✅
C) CSV nie obsługuje więcej niż 100 kolumn
D) Parquet nie stosuje kompresji, więc nie trzeba dekompresować danych

✅ Poprawna odpowiedź: B — w formacie kolumnowym wartości jednej kolumny leżą obok siebie, więc silnik może pominąć pozostałe 197 kolumn.

**Pytanie 4 (otwarte).** Czym jest partycjonowanie danych (np. `miasto=Kraków/`) i dlaczego partycjonowanie po kolumnie `user_id` z milionem unikalnych wartości to zły pomysł?

*Model odpowiedzi:* Partycjonowanie dzieli dane na katalogi według wartości kolumny, dzięki czemu zapytanie z filtrem na tej kolumnie czyta tylko pasujące katalogi zamiast całego zbioru. Partycjonowanie po kolumnie o bardzo dużej liczbie unikalnych wartości tworzy miliony malutkich plików (problem małych plików) — koszt otwierania i listowania plików oraz metadanych przewyższa zysk, a odczyt staje się wolniejszy niż z kilku dużych plików.

### Wykład 3 — Big Data i ekosystem Hadoop

**Pytanie 5 (zamknięte, wielokrotny wybór).** Które z poniższych są częścią modelu 5V Big Data? (zaznacz wszystkie poprawne)

A) **Volume** ✅
B) **Velocity** ✅
C) Validation
D) **Veracity** ✅

✅ Poprawne odpowiedzi: A, B, D (Volume, Velocity, Veracity) — pozostałe to Variety i Value; "Validation" nie należy do 5V.

**Pytanie 6 (otwarte, kod).** Co zwróci poniższa funkcja dla `dokumenty = ["a b a", "b c"]`?

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

*Model odpowiedzi:* `{'a': 2, 'b': 2, 'c': 1}` — faza map produkuje pary (słowo, 1), shuffle grupuje po kluczu, reduce sumuje wartości dla każdego klucza.

### Wykład 4 — Apache Spark: architektura, RDD i podstawy PySpark

**Pytanie 7 (zamknięte).** Która z poniższych operacji RDD jest **akcją**, a nie transformacją?

A) `map()`
B) `filter()`
C) **`collect()`** ✅
D) `reduceByKey()`

✅ Poprawna odpowiedź: C — `collect()` natychmiast uruchamia obliczenia i zwraca konkretny wynik do drivera; pozostałe są leniwe (lazy).

**Pytanie 8 (otwarte).** Dlaczego zaleca się używanie `reduceByKey()` zamiast `groupByKey()`, gdy chcemy zsumować wartości dla każdego klucza?

*Model odpowiedzi:* `reduceByKey()` redukuje (agreguje) dane lokalnie na każdym executorze przed shuffle'em, więc przez sieć przesyłane są już częściowe sumy — mniej danych do przetasowania. `groupByKey()` najpierw przesyła wszystkie surowe wartości przez sieć, a dopiero potem je grupuje, co jest znacznie kosztowniejsze.

### Wykład 5 — Spark SQL i DataFrames

**Pytanie 9 (zamknięte).** Który format plików ma wbudowaną schemę i jest najszybszy do zapytań agregujących w Spark SQL?

A) CSV
B) JSON
C) **Parquet** ✅
D) TXT

✅ Poprawna odpowiedź: C — Parquet to format kolumnowy z wbudowaną schemą, zoptymalizowany pod odczyt i agregacje.

**Pytanie 10 (otwarte).** Kiedy warto jawnie wymusić `broadcast()` przy joinie dwóch DataFrame'ów w Spark SQL?

*Model odpowiedzi:* Gdy jedna z tabel jest znacznie mniejsza od drugiej (np. tabela wymiarowa "sklepy" vs duża tabela faktów "transakcje") i mieści się w pamięci każdego executora. `broadcast()` kopiuje małą tabelę do wszystkich executorów, eliminując kosztowny shuffle dużej tabeli.

### Wykład 6 — Zaawansowany Spark SQL: window functions i optymalizacja

**Pytanie 11 (zamknięte).** Która funkcja okienkowa nadaje unikalny, kolejny numer każdemu wierszowi w partycji, nawet przy remisach?

A) `rank()`
B) `dense_rank()`
C) **`row_number()`** ✅
D) `lag()`

✅ Poprawna odpowiedź: C — `row_number()` zawsze zwraca unikalne, kolejne liczby, bez luk i bez powtórzeń nawet przy identycznych wartościach sortowania.

**Pytanie 12 (otwarte).** Czym różni się rola Catalyst Optimizera od roli silnika Tungsten w Spark SQL?

*Model odpowiedzi:* Catalyst to planista zapytań — analizuje logiczny plan zapytania i optymalizuje go (predicate pushdown, column pruning, constant folding, join reordering), tworząc plan fizyczny. Tungsten to silnik wykonawczy — odpowiada za fizyczną realizację tego planu: binarny format danych w pamięci, whole-stage code generation i zarządzanie pamięcią off-heap.

### Wykład 7 — Przygotowanie danych do ML: Feature Engineering

**Pytanie 13 (zamknięte).** Do zakodowania kolumny "ranga gracza" (Brąz → Srebro → Złoto → Wyzwanie) powinniśmy użyć:

A) `OneHotEncoder`
B) **`OrdinalEncoder`** ✅
C) `StandardScaler`
D) `SimpleImputer`

✅ Poprawna odpowiedź: B — ranga ma naturalny porządek, więc `OrdinalEncoder` zachowuje tę informację, w przeciwieństwie do `OneHotEncoder`.

**Pytanie 14 (otwarte).** Co to jest "data leakage" w kontekście przygotowania danych do ML i jak `fit()` scalera przed podziałem train/test może je spowodować?

*Model odpowiedzi:* Data leakage to sytuacja, w której informacje ze zbioru testowego (lub przyszłości) "przeciekają" do procesu trenowania, sztucznie zawyżając ocenę modelu. Jeśli `scaler.fit()` wykonamy na całym zbiorze przed podziałem, statystyki (średnia, odchylenie) obliczone dla skalowania będą już "widziały" dane testowe — model pośrednio korzysta z informacji, których w rzeczywistości nie powinien znać podczas treningu.

### Wykład 8 — Modele ML: klasyfikacja, regresja i ewaluacja

**Pytanie 15 (zamknięte).** Model wykrywający rzadką chorobę (1% przypadków) ma 99% accuracy, ale recall = 2%. Która metryka lepiej ujawnia problem?

A) Accuracy
B) **Recall / F1-score** ✅
C) R²
D) MAE

✅ Poprawna odpowiedź: B — przy niezbalansowanych klasach accuracy jest myląca; recall pokazuje, że model wykrywa prawie żadnych rzeczywistych przypadków choroby.

**Pytanie 16 (otwarte).** Wyjaśnij różnicę między underfittingiem a overfittingiem w kontekście bias-variance tradeoff.

*Model odpowiedzi:* Underfitting (wysoki bias) to sytuacja, gdy model jest zbyt prosty, by uchwycić wzorce w danych — słabo radzi sobie zarówno na zbiorze treningowym, jak i testowym. Overfitting (wysoka wariancja) to sytuacja, gdy model jest zbyt złożony i "zapamiętuje" szum danych treningowych — świetnie działa na train, ale znacznie gorzej na danych testowych/nowych.

### Wykład 9 — Spark MLlib: Machine Learning na dużą skalę

**Pytanie 17 (zamknięte).** Który komponent MLlib jest odpowiedzialny za połączenie wielu kolumn cech w jedną kolumnę wektorową `features`?

A) `StringIndexer`
B) **`VectorAssembler`** ✅
C) `OneHotEncoder`
D) `BinaryClassificationEvaluator`

✅ Poprawna odpowiedź: B — `VectorAssembler` łączy wskazane kolumny w jedną kolumnę wektorową, wymaganą przez modele MLlib.

**Pytanie 18 (otwarte).** Dlaczego użycie samego `StringIndexer` (bez `OneHotEncoder`) do zakodowania kolumny nominalnej, np. "kraj", może wprowadzić model liniowy w błąd?

*Model odpowiedzi:* `StringIndexer` przypisuje kolejne liczby całkowite (0, 1, 2, ...) kategoriom bez żadnego naturalnego porządku. Model liniowy (np. `LogisticRegression`) potraktuje te liczby jako mające porządek/odległość (np. że "Polska"=2 jest "bliżej" "Niemiec"=1 niż "USA"=5), co jest fałszywym założeniem dla zmiennej nominalnej. `OneHotEncoder` eliminuje ten problem, tworząc niezależne kolumny binarne.

### Wykład 10 — Zaawansowany MLlib: tuning hiperparametrów

**Pytanie 19 (zamknięte).** Przy silnie niezbalansowanym zbiorze danych (np. 1% fraudów) która metryka lepiej odzwierciedla jakość modelu niż AUC-ROC?

A) Accuracy
B) **AUC-PR (Precision-Recall)** ✅
C) R²
D) MAE

✅ Poprawna odpowiedź: B — AUC-PR skupia się na precision i recall klasy pozytywnej (rzadkiej), podczas gdy AUC-ROC jest "maskowane" przez dominującą liczbę True Negatives.

**Pytanie 20 (otwarte).** Czym różni się `CrossValidator` od `TrainValidationSplit` i kiedy wybrałbyś ten drugi?

*Model odpowiedzi:* `CrossValidator` wykonuje pełną walidację k-fold (`numFolds × liczba kombinacji siatki` treningów), dając bardziej wiarygodną ocenę, ale kosztem czasu. `TrainValidationSplit` wykonuje tylko jeden podział train/validation na każdą kombinację hiperparametrów (`liczba kombinacji` treningów) — wybieramy go przy bardzo dużych zbiorach danych, gdzie pełny k-fold byłby zbyt kosztowny obliczeniowo, a szybka iteracja jest ważniejsza niż maksymalna solidność oceny.

### Wykład 11 — Cloud Computing i GCP: BigQuery, Dataproc

**Pytanie 21 (zamknięte).** Za co dokładnie płacimy, wykonując zapytanie SQL w BigQuery?

A) Za czas wykonania zapytania (sekundy)
B) **Za liczbę przeskanowanych bajtów** ✅
C) Za liczbę zwróconych wierszy
D) Za liczbę użytych tabel

✅ Poprawna odpowiedź: B — BigQuery (silnik Dremel + storage Colossus) rozlicza zapytania na podstawie ilości danych przeskanowanych, niezależnie od czasu wykonania czy rozmiaru wyniku.

**Pytanie 22 (otwarte).** Wyjaśnij, dlaczego dodanie `PARTITION BY DATE(...)` do często odpytywanej po dacie tabeli BigQuery obniża koszty zapytań.

*Model odpowiedzi:* Partycjonowanie fizycznie dzieli tabelę na segmenty odpowiadające wartościom klucza partycji (np. jeden segment na dzień). Zapytanie z filtrem `WHERE data = '...'` skanuje tylko odpowiednie partycje, a nie całą tabelę — co drastycznie zmniejsza liczbę przeskanowanych bajtów, a więc i koszt zapytania.

### Wykład 12 — Przetwarzanie strumieniowe: Structured Streaming i Kafka

**Pytanie 23 (zamknięte).** W Spark Structured Streaming strumień danych jest modelowany jako:

A) Kolejka FIFO wiadomości
B) **Nieskończona (unbounded) tabela, do której dopisywane są nowe wiersze** ✅
C) Zbiór statycznych plików Parquet
D) Graf skierowany operacji RDD

✅ Poprawna odpowiedź: B — to kluczowa koncepcja Structured Streaming: standardowe operacje DataFrame/SQL działają na strumieniu tak, jakby to była rosnąca tabela.

**Pytanie 24 (otwarte).** Do czego służy watermarking (`withWatermark`) w Spark Structured Streaming i co się dzieje z danymi, które przychodzą po upływie zdefiniowanego progu?

*Model odpowiedzi:* Watermarking definiuje, jak długo Spark czeka na spóźnione dane, zanim uzna okno agregacji za "zamknięte" i zwolni jego stan z pamięci. Dane, które przychodzą później niż próg watermarku (np. `withWatermark("timestamp", "10 minutes")`), są odrzucane — pozwala to uniknąć nieograniczonego wzrostu zużycia pamięci przy długotrwałych agregacjach strumieniowych.

### Dodatkowe pytania przekrojowe

**Pytanie 25 (zamknięte).** Który z poniższych kroków ML workflow powinien wystąpić **przed** podziałem na zbiór treningowy i testowy?

A) `scaler.fit_transform()` na całym zbiorze
B) **Wczytanie i wstępna eksploracja (EDA) surowych danych** ✅
C) `GridSearchCV.fit()`
D) Ewaluacja finalnego modelu metrykami testowymi

✅ Poprawna odpowiedź: B — EDA na surowych danych nie powoduje wycieku informacji; wszelkie `fit()` transformatorów (scaler, imputer, encoder) muszą nastąpić dopiero **po** podziale, wyłącznie na zbiorze treningowym.

**Pytanie 26 (otwarte).** Podaj jedno podobieństwo i jedną różnicę między przetwarzaniem danych w scikit-learn a w Spark MLlib.

*Model odpowiedzi:* Podobieństwo: oba używają koncepcji pipeline'u łączącego kroki przygotowania danych i model (`Pipeline` w obu bibliotekach), a workflow jest koncepcyjnie ten sam (przygotowanie cech → trening → ewaluacja). Różnica: scikit-learn działa na jednej maszynie w pamięci RAM (pandas/NumPy) i używa `fit()`/`predict()`, natomiast Spark MLlib jest rozproszony na klastrze, operuje na Spark DataFrame i używa modelu `fit()`/`transform()` (Estimator/Transformer) — co pozwala skalować się na dane rzędu terabajtów.

---

## ⚠️ Uwagi końcowe

<Admonition type="warning" title="Zapamiętaj przed egzaminem">
  - Egzamin obejmuje **całość materiału z Wykładów 1–12** — żaden wykład nie jest pominięty.
  - Egzamin jest **indywidualny i zamknięty (closed-book)** — jedyną dozwoloną pomocą jest **kalkulator**.
  - **Zabierz ze sobą legitymację studencką (lub inny dokument tożsamości ze zdjęciem)** — bez niej nie przystąpisz do egzaminu.
  - Egzamin odbywa się tego samego dnia co obrony projektów zaliczeniowych (19.01.2027) — sprawdź wcześniej harmonogram na stronie **["Projekt zaliczeniowy"](./projekt-zaliczeniowy.md)**.
  - Próg zaliczenia to **50% punktów** — powodzenia! 🎓
</Admonition>
