---
id: 04-apache-spark-rdd-podstawy
title: "Wykład 4: Apache Spark — architektura, RDD i podstawy PySpark"
sidebar_label: "04 — Spark i RDD"
description: "Architektura Apache Spark, koncepcja RDD, transformacje i akcje, lazy evaluation oraz pierwsze kroki w PySpark."
---

import Admonition from '@theme/Admonition';

# Wykład 4: Apache Spark — architektura, RDD i podstawy PySpark

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Jak zbudowana jest aplikacja Spark — **driver**, **executory** i **cluster manager**
- Czym jest **RDD** (Resilient Distributed Dataset) i dlaczego jest odporny na awarie
- Czym różnią się **transformacje** od **akcji** i dlaczego Spark jest "leniwy" (lazy evaluation)
- Jak korzystać z podstawowych operacji RDD: `map`, `filter`, `flatMap`, `reduceByKey`, `groupByKey`
- Jak uruchomić `SparkSession` w Google Colab i uniknąć najczęstszych pułapek wydajnościowych

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie PDF. Możesz je otworzyć bezpośrednio w przeglądarce lub pobrać.
</Admonition>

📄 **[Otwórz slajdy PDF](/stacjonarne/pdfs/wyk04-apache-spark-rdd-podstawy.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Dlaczego Spark, a nie tylko Hadoop?

Na Wykładzie 3 poznaliście MapReduce — model, w którym każdy krok obliczeń zapisuje wyniki pośrednie na dysk. To bezpieczne, ale **wolne**.

**Apache Spark** przetwarza dane **w pamięci RAM** przez cały czas trwania zadania, co daje ogromne przyspieszenie — szczególnie przy algorytmach iteracyjnych (uczenie maszynowe, analiza grafów).

| Operacja | Hadoop MapReduce | Apache Spark |
|----------|------------------|---------------|
| Sortowanie 100 TB | ~72 min (dysk) | ~23 min (RAM + dysk) |
| Regresja logistyczna (10 iteracji) | ~110 s/iterację | ~0.9 s/iterację |

---

### 2. Architektura aplikacji Spark

| Komponent | Rola |
|-----------|------|
| **Driver** | Uruchamia Twój kod, tworzy `SparkSession`, planuje zadania i zbiera wyniki |
| **Cluster Manager** | Przydziela zasoby obliczeniowe (standalone, YARN, Kubernetes, lub `local[*]`) |
| **Executory** | Procesy robocze, które faktycznie wykonują transformacje i przechowują dane w pamięci (cache) |

```python
from pyspark.sql import SparkSession

spark = (
    SparkSession.builder
    .appName("Wyklad4-RDD-Podstawy")
    .master("local[*]")   # tryb lokalny — cały CPU maszyny jako "klaster"
    .getOrCreate()
)

sc = spark.sparkContext
print(f"Wersja Sparka: {sc.version}")
print(f"Domyślna liczba partycji: {sc.defaultParallelism}")
```

---

### 3. RDD — Resilient Distributed Dataset

**RDD** to podstawowa, niskopoziomowa struktura danych w Sparku — niemutowalna, rozproszona kolekcja obiektów.

- **Resilient** — odporny na awarie dzięki **lineage** (historii transformacji), z której Spark może odtworzyć utracone partycje
- **Distributed** — dane podzielone na partycje rozproszone na wielu maszynach
- **Dataset** — kolekcja dowolnych obiektów Python

```python
liczby = sc.parallelize([1, 2, 3, 4, 5], numSlices=2)
print(liczby.getNumPartitions())  # 2
print(liczby.collect())           # [1, 2, 3, 4, 5]
```

---

### 4. Transformacje vs akcje

| | Transformacje | Akcje |
|---|---------------|-------|
| Wykonanie | Leniwe (lazy) — budują tylko plan (DAG) | Natychmiastowe — uruchamiają obliczenia |
| Zwracają | Nowe RDD | Konkretny wynik (liczbę, listę, plik) |
| Przykłady | `map`, `filter`, `flatMap`, `reduceByKey` | `collect`, `count`, `take`, `reduce` |

```python
podwojone = liczby.map(lambda x: x * 2)   # transformacja — jeszcze nic się nie liczy
wynik = podwojone.collect()               # akcja — TERAZ Spark liczy
```

---

### 5. Najczęstsze operacje RDD

```python
logi = sc.parallelize([
    "192.168.1.1 GET /home 200",
    "10.0.0.5 GET /api/users 404",
])

endpointy = logi.map(lambda l: l.split(" ")[2])
bledy = logi.filter(lambda l: l.split(" ")[-1].startswith(("4", "5")))

pary = sc.parallelize([("/home", 1), ("/home", 1), ("/login", 1)])
liczniki = pary.reduceByKey(lambda a, b: a + b)
# [('/home', 2), ('/login', 1)]
```

> ⚠️ Zawsze preferuj `reduceByKey` nad `groupByKey` — redukuje dane lokalnie przed shuffle (przesyłem danych przez sieć).

---

### 6. Częste pułapki

- 🚨 `collect()` na dużym RDD — sprowadza wszystkie dane do drivera i może wywołać `OutOfMemoryError`. Używaj `take(n)` lub `count()`.
- 🚨 `groupByKey` zamiast `reduceByKey` — niepotrzebny, kosztowny shuffle.
- 🚨 Brak `cache()` przy wielokrotnym użyciu tego samego RDD — Spark przelicza cały lineage od nowa za każdym razem.

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego niemutowalność RDD (immutability) ułatwia odporność na awarie?
2. Co się stanie, jeśli wywołasz `collect()` na RDD zawierającym 500 mln elementów, na maszynie z 8 GB RAM?
3. Kiedy `groupByKey` jest jednak *konieczne* (nie da się zastąpić `reduceByKey`)?
:::

---

## 📚 Polecane materiały

- [Apache Spark — RDD Programming Guide](https://spark.apache.org/docs/latest/rdd-programming-guide.html)
- Książka: *"Learning Spark, 2nd Edition"* — Damji et al. (O'Reilly), rozdz. 1–3
- [Databricks — Apache Spark Internals](https://www.databricks.com/glossary/what-is-rdd)

---

## ➡️ Co dalej?

Na **Wykładzie 5 (03.11.2026)** przejdziemy do **Spark SQL i DataFrames** — dodamy do RDD schemat danych, poznamy optymalizator Catalyst i nauczymy się pisać zapytania SQL na petabajtach danych.

Dziś na ćwiczeniach zastosujesz RDD w praktyce — przeanalizujesz ~50 000 syntetycznych logów serwera WWW!

<Admonition type="info" title="Semestr">
  Zimowy 2026/2027 &nbsp;|&nbsp; Studia stacjonarne &nbsp;|&nbsp; Prowadzący: Pavlo Melnyk (melnyk@pjwstk.edu.pl)
</Admonition>
