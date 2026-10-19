---
id: 05-spark-sql-dataframes
title: "Wykład 5: Spark SQL i DataFrames"
sidebar_label: "05 — Spark SQL"
description: "Structured API Sparka — DataFrames, schematy, select/filter/groupBy/agg, joiny i Spark SQL na przykładzie sieci kawiarni."
---

import Admonition from '@theme/Admonition';

# Wykład 5: Spark SQL i DataFrames

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

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

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie Markdown (Marp). Możesz je otworzyć bezpośrednio lub wyeksportować do PDF.
</Admonition>

📄 **[Otwórz slajdy PDF](/stacjonarne/pdfs/wyk05-spark-sql-dataframes.pdf)**

---

## 🗂️ Zakres wykładu

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

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego format kolumnowy (Parquet) jest szybszy niż CSV przy zapytaniach agregujących?
2. Czym różni się `inner join` od `left_semi join`?
3. Kiedy warto wymusić `broadcast()` zamiast pozwolić Sparkowi zdecydować automatycznie?
:::

---

## 📚 Polecane materiały

- [Spark SQL Guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)
- [PySpark DataFrame API Reference](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/index.html)
- [Catalyst Optimizer — Deep Dive](https://databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html)

---

## ➡️ Co dalej?

Na **Laboratorium 5** przećwiczysz Spark SQL i DataFrame API na ~100 000 transakcjach z sieci kawiarni ☕ — przychody, godziny szczytu i ulubione produkty klientów!

Na **Wykładzie 6 (10.11.2026)** przejdziemy do **zaawansowanego Spark SQL**: window functions (`rank`, `lag`, `lead`) i optymalizacji zapytań (`explain()`, caching, unikanie shuffli).
