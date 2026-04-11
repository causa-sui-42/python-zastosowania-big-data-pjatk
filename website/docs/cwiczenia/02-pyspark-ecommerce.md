---
id: 02-pyspark-ecommerce
title: "Lab 2: Analiza danych e-commerce z PySpark"
sidebar_label: "Lab 2 — PySpark E-commerce"
description: "Praktyczna analiza 500 000 transakcji e-commerce na Apache Spark — filtrowanie, agregacje, Spark SQL."
---

import Admonition from '@theme/Admonition';

# Laboratorium 2: Analiza danych e-commerce z PySpark

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Podstawowy–Średni &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Cel ćwiczenia

W tym laboratorium przeanalizujesz **500 000 transakcji** ze sklepu internetowego używając **Apache Spark**. Zobaczysz, jak PySpark radzi sobie z danymi, które byłyby powolne w pandas.

Po wykonaniu ćwiczenia będziesz potrafić:

- Tworzyć `SparkSession` i wczytywać dane do `DataFrame`
- Filtrować, selekcjonować i agregować dane w PySpark API
- Pisać zapytania **Spark SQL** na widokach tymczasowych
- Interpretować wyniki analizy biznesowej

---

## � Pobierz notebook

<a href="/notebooks/cw-02-big-data-pyspark-ecommerce.ipynb" download>📥 <strong>Pobierz: cw-02-big-data-pyspark-ecommerce.ipynb</strong></a>

---

## 📦 Zbiór danych

| Atrybut | Wartość |
|---------|---------|
| Liczba rekordów | ~500 000 transakcji |
| Okres | 12 miesięcy |
| Format | CSV |
| Kolumny | `order_id`, `customer_id`, `product_category`, `product_name`, `quantity`, `unit_price`, `total_price`, `order_date`, `country`, `payment_method`, `delivery_days`, `is_returned` |

---

## 📋 Zadania

Notebook zawiera **7 głównych ćwiczeń** i **1 zadanie bonusowe**:

| Nr | Temat | Akcja Spark |
|----|-------|-------------|
| 1 | Wczytanie danych i eksploracja | `read.csv`, `printSchema`, `describe` |
| 2 | Analiza zamówień wg krajów | `groupBy`, `count`, `orderBy` |
| 3 | Najpopularniejsze kategorie | `groupBy`, `sum`, `alias` |
| 4 | Analiza geograficzna | `groupBy`, `agg`, Spark SQL |
| 5 | Metody płatności | `groupBy`, `pivot` |
| 6 | Czasy dostawy | `filter`, `avg`, `percentile_approx` |
| 7 | Zwroty produktów | `filter`, `join`, analiza przyczyn |
| 🌟 | Bonus: Dashboard w Spark SQL | widoki tymczasowe + zapytania SQL |

---

## 💡 Fragment kodu — przykład ze startera

```python
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

# Inicjalizacja Spark
spark = SparkSession.builder \
    .appName("EcommerceAnalysis") \
    .config("spark.sql.adaptive.enabled", "true") \
    .getOrCreate()

# Wczytanie danych
df = spark.read.csv(
    "ecommerce_transactions.csv",
    header=True,
    inferSchema=True
)

print(f"Liczba rekordów: {df.count():,}")  # Liczba rekordów: 500,000
df.printSchema()

# Zadanie 2: Zamówienia według krajów
wynik = (
    df
    .groupBy("country")
    .agg(
        F.count("order_id").alias("liczba_zamowien"),
        F.sum("total_price").alias("przychod_total"),
        F.avg("total_price").alias("srednia_wartosc"),
    )
    .orderBy(F.desc("liczba_zamowien"))
)
wynik.show(10)
```

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki bez błędów
- [ ] Odpowiedziałem/am na pytania interpretacyjne w komórkach Markdown
- [ ] Ukończyłem/am co najmniej 5 z 7 ćwiczeń
- [ ] Opcjonalnie: zadanie bonusowe (Spark SQL dashboard)

<Admonition type="warning" title="Oddawanie pracy">
  Oddaj gotowy notebook przez link w systemie uczelnianym lub wyślij bezpośrednio przez formularz wskazany przez prowadzącego.
</Admonition>
