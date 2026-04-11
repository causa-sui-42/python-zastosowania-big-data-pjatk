---
id: cheatsheets
title: Cheat Sheety
sidebar_label: "📄 Cheat Sheety"
---

# 📄 Cheat Sheety

Skrócone ściągawki do wydrukowania lub trzymania przed sobą podczas ćwiczeń.

## PySpark DataFrame API

```python
# === SparkSession ===
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("MojaAplikacja").getOrCreate()

# === Wczytywanie danych ===
df = spark.read.csv("plik.csv", header=True, inferSchema=True)
df = spark.read.parquet("plik.parquet")
df = spark.read.json("plik.json")

# === Eksploracja ===
df.show(5)              # Pokaż 5 wierszy
df.printSchema()        # Schemat typów
df.describe().show()    # Statystyki
df.count()              # Liczba wierszy
df.columns              # Lista kolumn

# === Selekcja i filtrowanie ===
df.select("kol1", "kol2")
df.filter(df["wiek"] > 18)
df.where("kraj = 'PL'")
df.distinct()
df.dropDuplicates(["id"])
df.dropna()

# === Transformacje ===
from pyspark.sql import functions as F

df.withColumn("nowa", F.col("cena") * 1.23)
df.withColumnRenamed("stara", "nowa")
df.drop("niepotrzebna")
df.orderBy(F.desc("cena"))
df.limit(100)

# === Agregacje ===
df.groupBy("kategoria").count()
df.groupBy("kraj").agg(
    F.sum("przychod").alias("suma"),
    F.avg("cena").alias("srednia"),
    F.max("data").alias("ostatnia"),
)

# === Spark SQL ===
df.createOrReplaceTempView("zamowienia")
spark.sql("SELECT kraj, COUNT(*) FROM zamowienia GROUP BY kraj").show()

# === Zapis ===
df.write.parquet("output/", mode="overwrite")
df.write.csv("output/", header=True, mode="overwrite")
```

## Hadoop Komendy HDFS

```bash
# Listowanie
hdfs dfs -ls /                      # lista plików w root
hdfs dfs -ls /user/student/

# Kopiowanie
hdfs dfs -put lokalny.csv /user/student/    # local → HDFS
hdfs dfs -get /user/student/plik.csv ./     # HDFS → local
hdfs dfs -cp /src /dst                      # kopia na HDFS

# Operacje plikowe
hdfs dfs -mkdir /user/student/katalog
hdfs dfs -rm /user/student/plik.csv
hdfs dfs -rm -r /user/student/katalog
hdfs dfs -cat /user/student/plik.csv
hdfs dfs -head 100 /user/student/plik.csv

# Informacje
hdfs dfs -du -h /user/student/             # rozmiar
hdfs fsck /user/student/plik.csv           # zdrowie bloku
```

## Przydatne funkcje PySpark

```python
from pyspark.sql import functions as F

# Stringi
F.upper("kol"), F.lower("kol"), F.trim("kol")
F.concat(F.col("imie"), F.lit(" "), F.col("nazwisko"))
F.split("kol", ",")
F.regexp_replace("kol", r"\s+", "_")

# Daty
F.to_date("kol", "yyyy-MM-dd")
F.year("data"), F.month("data"), F.dayofweek("data")
F.datediff(F.current_date(), "data_zamowienia")

# Null-safe
F.coalesce("kol1", "kol2", F.lit("domyslna"))
F.when(F.col("cena") > 100, "drogi").otherwise("tani")
F.isnull("kol"), F.isnotnull("kol")

# Okno
from pyspark.sql.window import Window
window = Window.partitionBy("kraj").orderBy(F.desc("przychod"))
df.withColumn("rank", F.rank().over(window))
```
