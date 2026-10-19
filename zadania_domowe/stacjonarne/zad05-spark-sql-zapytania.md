# Zadanie domowe 5: Spark SQL — zapytania na własnym zbiorze danych

**Poziom trudności:** ⭐⭐ (Podstawowy-Średni)

**Termin:** Przed Zajęciami nr 6 (10.11.2026)

---

## 🎯 Cel zadania

Utrwalenie Spark SQL i DataFrame API poprzez samodzielne napisanie zapytań na **własnym, wybranym przez Ciebie** zbiorze danych (innym niż dane sieci kawiarni z laboratorium).

---

## 📋 Zadanie

Wybierz dowolny mały-średni zbiór danych (**minimum 200 wierszy, minimum 4 kolumny**, w tym przynajmniej jedna kolumna tekstowa/kategoryczna i jedna liczbowa) — np. z [Kaggle](https://www.kaggle.com/datasets), [UCI ML Repository](https://archive.ics.uci.edu/) albo dane wygenerowane samodzielnie (np. wyniki sportowe, biblioteka, ceny mieszkań, playlisty muzyczne).

Wczytaj dane do Spark DataFrame (Google Colab z `!pip install -q pyspark` lub lokalny Jupyter Notebook) i wykonaj poniższe zadania.

### Część 1: Wczytanie i eksploracja

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("ZadanieDomowe5").getOrCreate()

df = spark.createDataFrame(dane, schema=["kolumna1", "kolumna2", "..."])
df.printSchema()
df.show(10)
```

- Wczytaj dane i wyświetl schemat (`printSchema()`) oraz pierwsze 10 wierszy
- Zarejestruj DataFrame jako tymczasowy widok (`createOrReplaceTempView`)

### Część 2: Zapytania (wybierz 4 z 6)

1. 🔍 **TOP N** — Napisz zapytanie `spark.sql()`, które zwraca 5 rekordów z najwyższą wartością wybranej kolumny liczbowej
   *(Użyj `ORDER BY ... DESC LIMIT 5`)*

2. 📊 **Agregacja per grupa** — Oblicz sumę/średnią wybranej kolumny liczbowej w podziale na kolumnę kategoryczną
   *(Użyj `.groupBy()` i `.agg()` lub `GROUP BY` w SQL)*

3. 🔎 **Filtrowanie z warunkiem złożonym** — Znajdź rekordy spełniające co najmniej 2 warunki jednocześnie
   *(Użyj `.filter()` z `&`/`|` lub `WHERE ... AND/OR` w SQL)*

4. 🏷️ **Kolumna warunkowa** — Stwórz nową kolumnę kategoryzującą rekordy na min. 3 kategorie na podstawie wartości liczbowej
   *(Użyj `.withColumn()` i `F.when()/.otherwise()`)*

5. 🔗 **Porównanie DataFrame API vs SQL** — Wybierz jedno z powyższych zapytań i napisz je **dwoma sposobami**: DataFrame API oraz `spark.sql()`, pokazując że dają identyczny wynik
   *(Użyj `.subtract()` lub porównania `.collect()`, żeby to udowodnić)*

6. 📈 **Ranking wewnątrz grupy** — Dodaj kolumnę z rankingiem rekordu w obrębie jego grupy kategorycznej
   *(Użyj `Window.partitionBy()` i `F.row_number()`/`F.rank()`)*

---

## 💡 Wskazówki

- `F.col("nazwa_kolumny")` — odwołanie do kolumny
- `df.show(n, truncate=False)` — pełne wyświetlenie wyników bez ucinania tekstu
- `df.printSchema()` — sprawdź strukturę i typy danych
- Jeśli dane mają braki, obsłuż je przed analizą (`.na.drop()` lub `.na.fill()`)
- Dokumentacja: [spark.apache.org/docs/latest/api/python/](https://spark.apache.org/docs/latest/api/python/)

---

## 🔥 Zadanie bonusowe (opcjonalnie)

Wykonaj **join** swojego zbioru danych z drugą, małą tabelą, którą sam(a) stworzysz (np. tabela ze słownikiem kategorii lub regionów) i wymuś `broadcast()` na mniejszej tabeli. Porównaj plan wykonania (`explain()`) z i bez `broadcast()`.

---

## ❓ FAQ

**Q: Czy mogę użyć zbioru danych z laboratorium (sieć kawiarni)?**
A: Nie — celem zadania jest praca na **innym**, samodzielnie wybranym zbiorze danych.

**Q: Czy zapytania SQL i DataFrame API muszą dawać identyczny wynik co do wiersza?**
A: Tak, w zadaniu 5 (Część 2) — to właśnie ma pokazać, że oba podejścia są równoważne.

Powodzenia! 🚀
