---
id: 03-spark-sql-dataframes
title: "Wykład 3: Spark SQL, DataFrames i optymalizacja zapytań"
sidebar_label: "03 — Spark SQL & DataFrames"
description: "Spark SQL, DataFrame API, joiny, window functions, UDF, Catalyst Optimizer i optymalizacja wydajności."
---

import Admonition from '@theme/Admonition';

# Wykład 3: Spark SQL, DataFrames i optymalizacja zapytań

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Jak korzystać z **Spark SQL** i pisać zapytania SQL na DataFrames
- Jak wykonywać **zaawansowane transformacje**: joiny, pivoty, agregacje
- Jak działają **Window Functions** w Spark (rank, lag, lead, running totals)
- Jak tworzyć i rejestrować **UDF** (User Defined Functions)
- Jak **Catalyst Optimizer** optymalizuje zapytania i jak czytać plan wykonania (`explain()`)
- Jak **poprawić wydajność**: partycjonowanie, cache, broadcast joins, AQE

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie Markdown (Marp). Możesz je otworzyć bezpośrednio lub wyeksportować do PDF.
</Admonition>

📄 **[Otwórz slajdy PDF](/pdfs/wyk3-spark-sql-dataframes-intermediate.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Spark SQL — jeden interfejs do wszystkiego

Spark SQL pozwala pisać zapytania SQL na DataFrames, Hive, JSON, Parquet i innych źródłach — z jednym API.

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("SparkSQL Demo").getOrCreate()
df = spark.read.csv("dane.csv", header=True, inferSchema=True)

# DataFrame API
df.select("name", "age").filter(df.age > 25).show()

# SQL API — ten sam wynik!
df.createOrReplaceTempView("osoby")
spark.sql("SELECT name, age FROM osoby WHERE age > 25").show()
```

### 2. DataFrame API — zaawansowane operacje

- `select`, `filter`, `withColumn`, `when/otherwise`
- `groupBy`, `agg`, `pivot`, `rollup`, `cube`

### 3. Joiny w Spark

Inner, left, right, full outer, cross, semi i anti join — pełna mapa typów joinów z przykładami.

### 4. Window Functions

`row_number()`, `rank()`, `dense_rank()`, `lag()`, `lead()` — operacje analityczne w ramach partycji.

### 5. UDF (User Defined Functions)

Tworzenie własnych funkcji i rejestrowanie ich w Spark SQL.

### 6. Catalyst Optimizer

Jak Spark optymalizuje zapytania: logical plan → optimized plan → physical plan → execution.

### 7. Wskazówki wydajnościowe

Cache, broadcast joins, unikanie shuffli, Adaptive Query Execution (AQE).

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Kiedy lepiej użyć SQL, a kiedy DataFrame API?
2. Dlaczego UDFs są wolniejsze od wbudowanych funkcji Spark?
3. Jak `explain()` pomaga zdiagnozować problemy z wydajnością?
:::

---

## 📚 Dalsze czytanie

- [Spark SQL Guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)
- [Window Functions API](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/window.html)
- [Catalyst Optimizer — Deep Dive](https://databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html)

---

## ➡️ Co dalej?

W **Laboratorium 3** przećwiczysz Spark SQL, joiny, window functions i UDF na danych z platformy streamingowej StreamPL 🎬. Potem — **Wykład 4: Wstęp do Machine Learning**!
