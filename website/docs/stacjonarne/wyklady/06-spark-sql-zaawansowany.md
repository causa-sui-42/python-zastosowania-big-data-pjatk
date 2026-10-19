---
id: 06-spark-sql-zaawansowany
title: "Wykład 6: Zaawansowany Spark SQL — window functions i optymalizacja"
sidebar_label: "06 — Spark SQL zaawansowany"
description: "Window functions, UDF, Catalyst Optimizer, silnik Tungsten i strategie partycjonowania w Spark SQL."
---

import Admonition from '@theme/Admonition';

# Wykład 6: Zaawansowany Spark SQL — window functions i optymalizacja

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

**Zajęcia nr 6** — 10.11.2026 (wtorek)

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

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

📄 **[Otwórz slajdy PDF](/stacjonarne/pdfs/wyk06-spark-sql-zaawansowany.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Window functions — ranking i analizy sekwencyjne

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

### 2. UDF (User Defined Functions)

Własne funkcje Pythona rejestrowane w Spark SQL — potężne, ale **kosztowne**, bo Catalyst traktuje je jak "czarną skrzynkę" (brak optymalizacji, serializacja JVM↔Python per wiersz).

### 3. Catalyst Optimizer

Parsed Logical Plan → Analyzed Logical Plan → Optimized Logical Plan → Physical Plan. Optymalizacje: predicate pushdown, column pruning, constant folding, join reordering.

### 4. Tungsten — silnik wykonawczy

Binary in-memory format, whole-stage code generation, zarządzanie pamięcią off-heap — to Tungsten sprawia, że DataFrame/Spark SQL jest szybszy niż surowe RDD.

### 5. Partycjonowanie

`repartition(n)` / `repartition("kolumna")` — zawsze shuffle. `coalesce(n)` — zmniejsza partycje zwykle bez pełnego shuffla.

### 6. Czytanie `.explain()`

Szukanie `Exchange` (shuffle), `BroadcastHashJoin` vs `SortMergeJoin`, `FileScan` z column pruning.

### 7. Cache, persist i inne wskazówki wydajnościowe

`cache()`/`persist()`/`unpersist()`, broadcast join, filtrowanie wcześnie — shuffle późno.

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego window function z innym `partitionBy` w tym samym zapytaniu powoduje **osobny** shuffle?
2. Kiedy `row_number()` jest bezpieczniejszym wyborem niż `rank()` do wybrania "top N"?
3. Co konkretnie różni rolę Catalysta od roli Tungstena?
:::

---

## 📚 Polecane materiały

- [Spark SQL Guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)
- [Window Functions API (PySpark)](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/window.html)
- [Catalyst Optimizer — Deep Dive (Databricks)](https://databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html)
- [Project Tungsten (Databricks)](https://databricks.com/blog/2015/04/28/project-tungsten-bringing-spark-closer-to-bare-metal.html)

---

## ➡️ Co dalej?

Na dzisiejszych **ćwiczeniach** przećwiczysz window functions na pełnym zbiorze ~200 000 przejazdów rowerów miejskich 🚲 — rankingi stacji, running totals, wykrywanie luk czasowych i anomalii rebalancingu.

Na **Wykładzie 7 (17.11.2026)** przechodzimy do przygotowania danych do Machine Learning — **Feature Engineering**!

Semestr: Zimowy 2026/2027
