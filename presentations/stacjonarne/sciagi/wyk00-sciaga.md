---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 0: Python — od podstaw do pandas i PySpark'
footer: 'PJATK | Python w Zastosowaniach Big Data | Studia stacjonarne'
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 13.5px;
    padding: 18px 26px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 { font-size: 1.3em; color: #2d5986; margin: 0 0 6px 0; }
  h2 { font-size: 1.0em; color: #2d5986; margin: 6px 0 2px 0; border-bottom: 2px solid #2d5986; padding-bottom: 1px; }
  .cols { display: flex; gap: 20px; }
  .col { flex: 1; }
  ul { margin: 2px 0 6px 0; padding-left: 16px; }
  li { margin-bottom: 2px; }
  code { font-size: 0.82em; background: #f0f2f5; padding: 0 3px; border-radius: 3px; }
  pre { font-size: 0.78em; background: #f0f2f5; padding: 6px 8px; border-radius: 5px; margin: 2px 0 6px 0; }
---

# 🐍 Wykład 0 — Python → pandas → PySpark

<div class="cols">
<div class="col">

## Podstawy Pythona
- Typy: `int`, `float`, `str`, `bool`, `None`
- `if/elif/else`, `match/case`
- Pętle: `for x in iterable`, `while warunek`
- Kolekcje: `list` (mutowalna), `tuple` (niemutowalna), `set` (unikalne), `dict` (klucz→wartość)
- Comprehension: `[x**2 for x in range(10) if x % 2 == 0]`
- Funkcje: `def f(a, b=1, *args, **kwargs):`
- Wyjątki: `try / except / finally`

## pandas — kluczowe operacje
```python
df = pd.read_csv("plik.csv")
df[df["col"] > 10]                # filtrowanie
df.groupby("kat")["col"].mean()    # agregacja
df.merge(df2, on="id", how="left")
df["nowa"] = df["a"] / df["b"]     # nowa kolumna
```

</div>
<div class="col">

## PySpark — odpowiedniki
```python
spark = SparkSession.builder \
    .master("local[*]").getOrCreate()
df = spark.read.csv("plik.csv", header=True)
df.filter(df.col > 10)
df.groupBy("kat").agg(avg("col"))
df.join(df2, on="id", how="left")
df.withColumn("nowa", col("a")/col("b"))
```

## Kiedy pandas, kiedy Spark?
- **pandas**: dane mieszczą się w RAM jednej maszyny (zazwyczaj < kilka GB)
- **Spark**: dane rosną / nie mieszczą się w pamięci → przetwarzanie **rozproszone** na klastrze
- Ta sama logika (filtrowanie, groupby, join) — inna skala wykonania

## Najczęstsze pułapki
- Mylenie `=` (przypisanie) z `==` (porównanie)
- Modyfikacja listy podczas iteracji po niej
- Brak `.copy()` przy kopiowaniu DataFrame (widok vs kopia)

</div>
</div>
