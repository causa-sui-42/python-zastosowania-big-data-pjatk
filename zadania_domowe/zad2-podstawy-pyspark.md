# Zadanie domowe 2: Podstawy PySpark na własnych danych

**Poziom trudności:** ⭐⭐⭐ (Średni)

---

## 🎯 Cel zadania

Nauczenie się podstaw Apache Spark poprzez samodzielną analizę danych. Zobaczysz różnicę między pandas a PySpark i zrozumiesz, kiedy używać którego narzędzia.

---

## 📋 Zadanie

Pobierz zbiór danych zawierający **co najmniej 10 000 rekordów** (zalecane: 100k+) i wykonaj analizę w PySpark.

Sugestie źródeł:
- [Kaggle Datasets](https://www.kaggle.com/datasets)
- [UCI ML Repository](https://archive.ics.uci.edu/ml/index.php)
- [Google Dataset Search](https://datasetsearch.research.google.com/)

### Część 1: Setup i wczytanie
- Zainicjalizuj `SparkSession` w Google Colab
- Wczytaj dane do Spark DataFrame (CSV, JSON lub Parquet)
- Wyświetl schemat (`printSchema()`) i pierwsze 10 wierszy
- Policz liczbę rekordów i kolumn

### Część 2: Transformacje
Wykonaj minimum **5 różnych operacji**:
- Filtrowanie (`filter()` lub `where()`)
- Selekcja kolumn (`select()`)
- Tworzenie nowej kolumny (`withColumn()`)
- Sortowanie (`orderBy()`)
- Usunięcie duplikatów (`dropDuplicates()`)
- Zmiana typu kolumny (`cast()`)

### Część 3: Agregacje
- Wykonaj `groupBy()` z agregacjami (`count()`, `avg()`, `sum()`, `max()`, `min()`)
- Użyj min. **3 różnych funkcji agregujących**
- Pokaż top 10 wyników (`limit(10)`)

### Część 4: Spark SQL
- Zarejestruj DataFrame jako widok tymczasowy (`createOrReplaceTempView()`)
- Napisz zapytanie SQL wykonujące agregację lub join
- Wyświetl wynik

---

## 📦 Wymagania techniczne

- Notebook w **Google Colab** z PySpark
- Instalacja: `!pip install pyspark`
- Wszystkie transformacje muszą być w **PySpark** (nie pandas)
- Kod z komentarzami wyjaśniającymi każdy krok

---

## 💡 Wskazówki

- W Colab zainstaluj PySpark: `!pip install pyspark`
- Inicjalizacja Spark w Colab:
  ```python
  from pyspark.sql import SparkSession
  spark = SparkSession.builder.appName("Zadanie2").getOrCreate()
  ```
- Jeśli dane są w CSV na Kaggle, wczytaj przez pandas i konwertuj: `spark.createDataFrame(df_pandas)`
- Dla większych plików (>100MB) użyj `spark.read.csv()` bezpośrednio
- Pamiętaj o `.show()` na końcu transformacji, żeby zobaczyć wynik!

---

## 🔥 Zadanie bonusowe (opcjonalnie)

Porównaj wydajność **pandas vs PySpark** na tym samym zadaniu:
- Wykonaj tę samą agregację w pandas i PySpark
- Zmierz czas wykonania (`%%time` w Jupyter)
- Opisz różnice (nawet jeśli PySpark będzie wolniejszy — wyjaśnij dlaczego!)

---

## ❓ FAQ

**Q: Czy mogę użyć danych z laboratorium?**  
A: Tak, ale musisz wykonać **inne operacje** niż te z laboratorium.

**Q: Co jeśli PySpark jest wolniejszy niż pandas?**  
A: To normalne na małych danych (<1GB) — Spark ma overhead związany z dystrybuowaniem. Opisz to w zadaniu bonusowym!

**Q: Czy mogę użyć DataFrame API zamiast Spark SQL w części 4?**  
A: Nie, ta część wymaga **jawnego użycia SQL** przez `spark.sql()`.

---

Powodzenia! 🔥
