---
id: 05-spark-sql-dataframes
title: "Wykład 5: Spark SQL — od podstaw po zaawansowane zapytania i optymalizację"
sidebar_label: "05 — Spark SQL"
description: "Structured API Sparka — DataFrames, schematy, select/filter/groupBy/agg, joiny i Spark SQL na przykładzie sieci kawiarni, a także window functions, UDF i optymalizacja zapytań (Catalyst, Tungsten)."
---

import Admonition from '@theme/Admonition';

# Wykład 5: Spark SQL — od podstaw po zaawansowane zapytania i optymalizację

**Czas trwania:** ~180 minut &nbsp;|&nbsp; **Poziom:** Średni/Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Dlaczego **DataFrame** to lepsza abstrakcja niż surowe RDD (Catalyst Optimizer, schema, wydajność)
- Jak utworzyć **SparkSession** i zdefiniować **schemat** danych (`StructType`, `inferSchema`)
- Jak czytać dane w formatach **CSV**, **JSON** i **Parquet**
- Jak wykonywać podstawowe transformacje: `select`, `filter`, `withColumn`, `groupBy`, `agg`, `orderBy`
- Jak wykonywać **joiny** (`inner`, `left`, `broadcast`) i kiedy każdy z nich stosować
- Jak uruchamiać **surowy SQL** na DataFrames przez `spark.sql()` i tymczasowe widoki
- Jak porównać składnię **DataFrame API** i **Spark SQL** dla tego samego zadania
- Jak używać **window functions** (`Window.partitionBy`/`orderBy`, `rank`, `row_number`, `lag`, `lead`, `rowsBetween`) do rankingów i sum narastających
- Kiedy warto (a kiedy nie warto) pisać własny **UDF** i jak duży jest jego koszt wydajnościowy
- Jak działa **Catalyst Optimizer** — 4 fazy planowania zapytania i optymalizacje typu predicate pushdown
- Czym różni się **Tungsten** (silnik wykonawczy) od Catalysta (planista)
- Jak dobrać strategię partycjonowania: `repartition()` vs `coalesce()`
- Jak czytać `.explain()` i rozpoznawać kosztowne operacje (`Exchange`, shuffle)
- Jak korzystać z **cache/persist** i innych wskazówek wydajnościowych

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie Markdown (Marp). Możesz je otworzyć bezpośrednio lub wyeksportować do PDF.
</Admonition>

📄 **[Otwórz slajdy PDF](pathname:///stacjonarne/pdfs/wyk05-spark-sql-dataframes.pdf)**

---

## 🗂️ Zakres wykładu

### Część 1: Podstawy Spark SQL

### 1. Od RDD do DataFrame

RDD daje pełną elastyczność, ale Spark nie zna typów danych ani struktury — nie może więc niczego zoptymalizować. **DataFrame** dodaje **schemat** (nazwy kolumn i typy), dzięki czemu Spark może zastosować **Catalyst Optimizer** i przyspieszyć zapytania 10–100×.

```python
# RDD — trzeba pamiętać, że element[3] to cena
rdd.map(lambda row: row[3] * row[4])

# DataFrame — kolumny mają nazwy i typy
df.select(col("cena") * col("ilosc"))
```

### 2. SparkSession i schematy

```python
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, IntegerType

spark = SparkSession.builder.appName("SiecKawiarni").getOrCreate()

schema = StructType([
    StructField("sklep", StringType(), False),
    StructField("miasto", StringType(), False),
    StructField("produkt", StringType(), False),
    StructField("cena", DoubleType(), False),
    StructField("ilosc", IntegerType(), False),
])

df = spark.read.csv("transakcje.csv", header=True, schema=schema)
```

### 3. Czytanie danych: CSV, JSON, Parquet

| Format | Rozmiar | Szybkość odczytu | Schema wbudowana? |
|--------|---------|-------------------|---------------------|
| CSV | Duży | Wolna | ❌ |
| JSON | Duży | Średnia | Częściowo |
| **Parquet** | **Mały** | **Bardzo szybka** | ✅ |

### 4. Podstawowe transformacje

- `select`, `filter` / `where`, `withColumn`, `when`/`otherwise`
- `groupBy`, `agg` (`count`, `sum`, `avg`, `max`, `min`)
- `orderBy` / `sort`

```python
from pyspark.sql.functions import col, sum as _sum

przychod = (
    df.withColumn("wartosc", col("cena") * col("ilosc"))
      .groupBy("miasto")
      .agg(_sum("wartosc").alias("przychod"))
      .orderBy(col("przychod").desc())
)
```

### 5. Joiny

| Typ joina | Co dostajemy | Kiedy używać |
|-----------|-------------|-------------|
| `inner` | Tylko pasujące wiersze | Domyślny, najczęstszy |
| `left` / `left_outer` | Wszystko z lewej + pasujące z prawej | Chcemy zachować "główną" tabelę |
| `full_outer` | Wszystko z obu tabel | Pełny obraz, dużo `null`-i |
| broadcast | Mała tabela kopiowana do każdego executora | Jedna z tabel jest bardzo mała (np. wymiar `sklepy`) |

```python
from pyspark.sql.functions import broadcast

wynik = transakcje.join(broadcast(sklepy), "sklep")
```

### 6. Spark SQL — surowy SQL na DataFrames

```python
transakcje.createOrReplaceTempView("transakcje")
sklepy.createOrReplaceTempView("sklepy")

wynik = spark.sql("""
    SELECT s.miasto, SUM(t.cena * t.ilosc) AS przychod
    FROM transakcje t
    JOIN sklepy s ON t.sklep = s.sklep
    GROUP BY s.miasto
    ORDER BY przychod DESC
""")
```

### 7. DataFrame API vs SQL

Oba podejścia przechodzą przez ten sam **Catalyst Optimizer** i generują identyczny plan wykonania — wybór jest kwestią czytelności, nie wydajności.

### 8. Częste pułapki

- Brak `.otherwise()` w łańcuchu `when()` → ciche `null`-e
- `crossJoin` / join bez klucza → eksplozja liczby wierszy
- Sortowanie (`orderBy`) całego dużego DataFrame przed ograniczeniem wyniku

### Część 2: Zaawansowane zapytania i optymalizacja

### 9. Window functions — ranking i analizy sekwencyjne

`groupBy` redukuje liczbę wierszy. Window function dodaje kolumnę obliczoną na "oknie" powiązanych wierszy — **bez** utraty żadnego wiersza.

```python
from pyspark.sql import functions as F
from pyspark.sql.window import Window

window_spec = Window.partitionBy("start_station").orderBy(F.desc("duration_min"))

ranked = trips.withColumn("rank", F.rank().over(window_spec))
```

| Funkcja | Zastosowanie |
|---------|--------------|
| `row_number()` | Unikalny numer wiersza w partycji |
| `rank()` / `dense_rank()` | Ranking z (lub bez) luk przy remisach |
| `lag()` / `lead()` | Wartość z poprzedniego / następnego wiersza |
| `sum().over(rowsBetween(...))` | Suma narastająca (running total) |

### 10. UDF (User Defined Functions)

Własne funkcje Pythona rejestrowane w Spark SQL — potężne, ale **kosztowne**, bo Catalyst traktuje je jak "czarną skrzynkę" (brak optymalizacji, serializacja JVM↔Python per wiersz).

### 11. Catalyst Optimizer

Parsed Logical Plan → Analyzed Logical Plan → Optimized Logical Plan → Physical Plan. Optymalizacje: predicate pushdown, column pruning, constant folding, join reordering.

### 12. Tungsten — silnik wykonawczy

Binary in-memory format, whole-stage code generation, zarządzanie pamięcią off-heap — to Tungsten sprawia, że DataFrame/Spark SQL jest szybszy niż surowe RDD.

### 13. Partycjonowanie

`repartition(n)` / `repartition("kolumna")` — zawsze shuffle. `coalesce(n)` — zmniejsza partycje zwykle bez pełnego shuffla.

### 14. Czytanie `.explain()`

Szukanie `Exchange` (shuffle), `BroadcastHashJoin` vs `SortMergeJoin`, `FileScan` z column pruning.

### 15. Cache, persist i inne wskazówki wydajnościowe

`cache()`/`persist()`/`unpersist()`, broadcast join, filtrowanie wcześnie — shuffle późno.

### 16. Częste pułapki (zaawansowane)

- Window function z innym `partitionBy` w tym samym zapytaniu → osobny shuffle za każdym razem
- UDF zamiast wbudowanej funkcji Spark SQL tam, gdzie wystarczyłaby ona sama
- Ignorowanie `.explain()` przed optymalizacją wolnego zapytania

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego format kolumnowy (Parquet) jest szybszy niż CSV przy zapytaniach agregujących?
2. Czym różni się `inner join` od `left_semi join`?
3. Kiedy warto wymusić `broadcast()` zamiast pozwolić Sparkowi zdecydować automatycznie?
4. Dlaczego window function z innym `partitionBy` w tym samym zapytaniu powoduje **osobny** shuffle?
5. Kiedy `row_number()` jest bezpieczniejszym wyborem niż `rank()` do wybrania "top N"?
6. Co konkretnie różni rolę Catalysta od roli Tungstena?
:::

---

## 📚 Polecane materiały

- [Spark SQL Guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)
- [PySpark DataFrame API Reference](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/index.html)
- [Catalyst Optimizer — Deep Dive](https://databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html)
- [Window Functions API (PySpark)](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/window.html)
- [Project Tungsten (Databricks)](https://databricks.com/blog/2015/04/28/project-tungsten-bringing-spark-closer-to-bare-metal.html)

---

## ➡️ Co dalej?

Na **Laboratorium 5** przećwiczysz Spark SQL i DataFrame API — od podstawowych zapytań, przez joiny, aż po window functions i optymalizację — na ~100 000 transakcjach z sieci kawiarni ☕ oraz ~200 000 przejazdach rowerów miejskich 🚲: przychody, godziny szczytu, rankingi stacji, running totals i wykrywanie anomalii.

Na **Wykładzie 6 (10.11.2026)** przechodzimy do przygotowania danych do Machine Learning — **Feature Engineering**!
