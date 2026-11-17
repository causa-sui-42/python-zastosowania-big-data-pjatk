---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 5: Spark SQL i DataFrames'
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
  code { font-size: 0.82em; background: #f0f2f5; padding: 0 3px; border-radius: 3px; }
---

# 🧮 Wykład 5 — Spark SQL i DataFrames

<div class="cols">
<div class="col">

## DataFrame vs RDD
- DataFrame ma **schemat** + korzysta z **Catalyst Optimizer** → zwykle wydajniejszy
- `SparkSession` to punkt wejścia; `StructType`/`StructField` definiują schemat

## Podstawowe operacje
```python
df.select("a","b").filter(df.a > 10)
df.withColumn("c", col("a")+col("b"))
df.groupBy("k").agg(avg("v"), sum("v"))
df.orderBy(col("v").desc())
```

## Joiny
- `inner`, `left`, `full_outer`
- `broadcast(df_mala)` — gdy jedna tabela jest mała (unika shuffla)

## Spark SQL = DataFrame API
```python
df.createOrReplaceTempView("t")
spark.sql("SELECT * FROM t WHERE a > 10")
```
Identyczna wydajność — to kwestia stylu zapisu!

</div>
<div class="col">

## Window Functions
```python
w = Window.partitionBy("k").orderBy("v")
df.withColumn("rn", row_number().over(w))
df.withColumn("rk", rank().over(w))
df.withColumn("prev", lag("v").over(w))
```
- `row_number()` — zawsze unikalny (1,2,3...)
- `rank()`/`dense_rank()` — remisy dostają tę samą rangę

## UDF — kosztowne!
- Catalyst **nie optymalizuje** UDF (czarna skrzynka) → unikaj, gdy jest wbudowana funkcja

## Catalyst + Tungsten
- Catalyst: 4 fazy planu (analiza → optymalizacja logiczna → plan fizyczny → generacja kodu)
- Tungsten — silnik wykonawczy (zarządzanie pamięcią, generacja bytecode)

## Optymalizacja
- `repartition(n)` — zawsze **pełny shuffle**
- `coalesce(n)` — zwykle **bez** pełnego shuffla (tylko zmniejszanie)
- `.explain()` → szukaj `Exchange` (shuffle), `BroadcastHashJoin` vs `SortMergeJoin`
- `cache()`/`persist()` dla danych używanych wielokrotnie

</div>
</div>
