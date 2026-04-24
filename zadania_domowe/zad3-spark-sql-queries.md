# 📝 Zadanie domowe 3 — Spark SQL Queries

**Termin:** Przed wykładem 4 (26.04.2026)  
**Szacowany czas:** 20-30 minut  
**Cel:** Utrwalenie Spark SQL i operacji DataFrame API

---

## 🎯 Zadanie: Analiza danych o filmach 🎬

Masz DataFrame ze 100 najpopularniejszych filmów z lat 2020-2026. Twoim zadaniem jest odpowiedzieć na pytania używając Spark SQL lub DataFrame API.

### Setup

```python
from pyspark.sql import SparkSession
import pyspark.sql.functions as F

spark = SparkSession.builder.appName("MovieAnalysis").getOrCreate()

# Przykładowe dane
data = [
    ("The Matrix 4", 2021, "Sci-Fi", 8.1, 175),
    ("Dune", 2021, "Sci-Fi", 8.5, 233),
    ("Spider-Man: No Way Home", 2021, "Action", 8.9, 892),
    ("Top Gun: Maverick", 2022, "Action", 8.7, 714),
    ("Avatar 2", 2022, "Sci-Fi", 7.9, 1342),
    ("Oppenheimer", 2023, "Drama", 8.8, 329),
    ("Barbie", 2023, "Comedy", 7.2, 537),
    ("Dune: Part Two", 2024, "Sci-Fi", 9.0, 678),
]

df = spark.createDataFrame(data, ["title", "year", "genre", "rating", "box_office_millions"])
df.createOrReplaceTempView("movies")
```

### Pytania (wybierz 3 z 5)

1. 🎬 **TOP 3** — Wyświetl 3 filmy z najwyższym ratingiem  
   *(Użyj `.orderBy()` i `.limit()`)*

2. 💰 **Box Office Heroes** — Oblicz średnie wpływy dla każdego gatunku  
   *(Użyj `.groupBy()` i `.agg(F.avg())`)*

3. 🔍 **SQL Style** — Napisz zapytanie SQL, które znajdzie wszystkie filmy Sci-Fi z ratingiem > 8.0  
   *(Użyj `spark.sql()`)*

4. 📊 **Window Function** — Dodaj kolumnę z rankingiem filmu w obrębie jego gatunku (według ratingu)  
   *(Użyj `Window.partitionBy()` i `F.rank()`)*

5. 🎭 **Conditional Column** — Stwórz nową kolumnę `blockbuster`, która ma wartość `True` gdy wpływy > 500M  
   *(Użyj `.withColumn()` i `F.when()`)*

---

**Bonus:** 🌟 Dodaj własne 5 filmów i powtórz analizy!

---

## 💡 Wskazówki

- `F.col("nazwa_kolumny")` — odwołanie do kolumny
- `df.show()` — wyświetl wyniki
- `df.printSchema()` — sprawdź strukturę
- Dokumentacja: [spark.apache.org/docs/latest/api/python/](https://spark.apache.org/docs/latest/api/python/)

Powodzenia! 🚀
