---
id: 00-python-podstawy-pandas-spark
title: "Lab 0: Python — od podstaw do pandas i PySpark"
sidebar_label: "Lab 0 — Python → Spark"
description: "Ćwiczenia praktyczne: listy, słowniki, funkcje, pandas DataFrame oraz PySpark — dla studentów z różnych backgroundów technicznych."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 0: Python — od podstaw do pandas i PySpark

**Czas trwania:** ~120 minut &nbsp;|&nbsp; **Poziom:** Podstawowy → Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

W tym laboratorium przećwiczysz fundamenty Pythona, a następnie zastosujesz je w **pandas** i **PySpark** na syntetycznym zbiorze danych o studentach.

Po wykonaniu ćwiczenia będziesz potrafić:

- Operować na listach, słownikach, zbiorach i krotkach (w tym comprehensions)
- Pisać funkcje z obsługą wyjątków
- Tworzyć, filtrować, grupować i łączyć dane w pandas
- Wykonywać te same operacje w PySpark (DataFrame API + Spark SQL)

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-00-python-podstawy-pandas-spark.ipynb">📥 <strong>Pobierz: cw-00-python-podstawy-pandas-spark.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Notebook generuje niewielki, syntetyczny zbiór danych o 5 studentach (imię, wiek, kierunek, miasto, średnia ocen) — bezpośrednio w kodzie, bez pobierania plików z zewnątrz. Dzięki temu w pełni skupiasz się na nauce składni i operacji, a nie na wczytywaniu danych.

---

## 📋 Zadania

Notebook podzielony jest na trzy części oraz wyzwanie bonusowe:

| Nr | Część | Temat | Koncepty |
|----|-------|-------|----------|
| 1 | 🧩 Python | Lista zakupów | List comprehension, `round()`, `sum()` |
| 2 | 🧩 Python | Zliczanie słów | `collections.Counter`, `.most_common()` |
| 3 | 🧩 Python | Funkcja z obsługą błędów | `try`/`except`, bezpieczne wartości domyślne |
| 4 | 🐼 pandas | Filtrowanie i nowa kolumna | Maskowanie boolowskie, operacje wektorowe |
| 5 | 🐼 pandas | Grupowanie i agregacja | `groupby().agg()`, `reset_index()`, sortowanie |
| 6 | ⚡ PySpark | Filtrowanie w PySpark | `.filter()`, `.select()`, akcja `.count()` |
| 7 | ⚡ PySpark | Spark SQL | `createOrReplaceTempView`, `spark.sql()` |
| 🏆 | — | Bonus: pandas vs PySpark | Funkcje okienkowe lub `.toPandas()` |

<Admonition type="info" title="Dla każdego poziomu">
  Ćwiczenia 1–3 to szybkie powtórzenie podstaw Pythona. Jeśli już je znasz, przejdź od razu do części pandas/PySpark — ale rozwiąż testy, żeby upewnić się, że wszystko działa tak samo jak u prowadzącego.
</Admonition>

---

## 💡 Fragment kodu — przykład ze startera

```python
import pandas as pd
from pyspark.sql import SparkSession
import pyspark.sql.functions as F

spark = SparkSession.builder.appName("Cwiczenie0").getOrCreate()

df = pd.DataFrame({
    "imie": ["Ada", "Alan", "Grace", "Linus", "Margaret"],
    "wiek": [20, 22, 21, 23, 20],
    "srednia_ocen": [4.8, 3.9, 4.5, 4.1, 5.0],
})

df_spark = spark.createDataFrame(df)
df_spark.filter(F.col("wiek") >= 21).select("imie", "wiek").show()
```
