---
id: 02-formaty-przechowywanie-danych
title: "Wykład 2: Dane w skali — formaty i przechowywanie danych"
sidebar_label: "02 — Formaty i przechowywanie danych"
description: "Most między analizą danych a Big Data: CSV vs Parquet, Arrow i Avro, kompresja, partycjonowanie, przetwarzanie równoległe oraz Data Lake i Lakehouse."
---

import Admonition from '@theme/Admonition';

# Wykład 2: Dane w skali — formaty i przechowywanie danych

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Podstawowy &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Kiedy dane przestają być „małe” i dlaczego **najdroższe jest czytanie danych (I/O)**, a nie liczenie
- Czym różni się format **wierszowy** od **kolumnowego**
- Dlaczego **Parquet** jest standardem analityki (column pruning, predicate pushdown) i do czego służą **Arrow** i **Avro**
- Jak dobrać **kompresję** (snappy, zstd, gzip) i **typy danych**, żeby oszczędzić dysk i RAM
- Jak działa **partycjonowanie** danych i czym grozi **problem małych plików**
- Czym różni się **scale up** od **scale out** i jak zrównoleglić obliczenia w Pythonie
- Czym są **Data Warehouse**, **Data Lake**, **Lakehouse** i **architektura medalionowa**

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie PDF. Możesz je otworzyć bezpośrednio w przeglądarce lub pobrać.
</Admonition>

📄 **[Otwórz slajdy PDF](/stacjonarne/pdfs/wyk02-formaty-przechowywanie-danych.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Kiedy dane przestają być „małe”?

Na Wykładzie 1 analizowaliśmy 1 200 maratończyków — plik CSV wczytywał się w mgnieniu oka. A co, jeśli zamiast 1 200 wierszy masz **1,2 miliarda** zdarzeń z zegarków sportowych? ⌚

| Rozmiar danych | Narzędzie | Gdzie się mieści? |
|----------------|-----------|-------------------|
| do ~1 GB | pandas | swobodnie w RAM laptopa |
| 1–100 GB | pandas + Parquet + chunki, DuckDB, Polars | na dysku jednej maszyny |
| 100 GB+ | Spark, BigQuery | tylko na **klastrze** |

> 💡 Zasada kciuka: pandas potrzebuje **5–10× więcej RAM** niż rozmiar pliku CSV.

---

### 2. Wiersze vs kolumny

- **Format wierszowy** (CSV, JSON, Avro) — zapisuje rekord po rekordzie. Świetny do zapisu i do systemów transakcyjnych.
- **Format kolumnowy** (Parquet, ORC) — zapisuje kolumnę po kolumnie. Zapytanie analityczne czyta **tylko potrzebne kolumny**, a podobne wartości obok siebie **świetnie się kompresują**.

---

### 3. Przegląd formatów

| Format | Układ | Schemat | Kompresja | Typowe zastosowanie |
|--------|-------|---------|-----------|---------------------|
| **CSV** | wierszowy | ❌ | słaba | wymiana danych, Excel |
| **JSON / JSON Lines** | wierszowy | ❌ | słaba | API, logi |
| **Avro** | wierszowy | ✅ | dobra | strumienie (Kafka), zapis rekord po rekordzie |
| **Parquet** | kolumnowy | ✅ | świetna | analityka, Data Lake, Spark, BigQuery |
| **Arrow** | kolumnowy (w RAM) | ✅ | — | wymiana danych w pamięci (pandas ↔ Spark ↔ DuckDB) |

```python
import pandas as pd

df.to_parquet("przejazdy.parquet")  # domyślnie kompresja snappy

# Column pruning — czytamy tylko 2 kolumny, reszta nie jest nawet odczytywana z dysku
df_male = pd.read_parquet("przejazdy.parquet", columns=["miasto", "kwota_pln"])
```

**Predicate pushdown** — Parquet przechowuje statystyki (min/max) dla bloków danych, więc silnik może **pominąć całe bloki**, które na pewno nie spełniają warunku `WHERE`.

---

### 4. Kompresja i typy danych

| Kodek | Rozmiar | Szybkość | Kiedy? |
|-------|---------|----------|--------|
| **snappy** | średni | ⚡ bardzo szybki | domyślny wybór, „gorące” dane |
| **zstd** | mały | szybki | dobry kompromis |
| **gzip** | mały | wolny | archiwa, rzadko czytane dane |

Dobór typów danych (`category` zamiast `object`, `int8` zamiast `int64`) potrafi zmniejszyć zużycie RAM **kilkukrotnie**. Pliki większe niż pamięć czytamy **w kawałkach** (`chunksize=`).

---

### 5. Partycjonowanie i problem małych plików

**Partycjonowanie** (układ Hive-style) dzieli dane na katalogi według wartości kolumny, np. `miasto=Kraków/`, `data=2026-10-13/`. Zapytanie z filtrem czyta **tylko pasujące katalogi**.

```python
df.to_parquet("przejazdy/", partition_cols=["miasto"])
krakow = pd.read_parquet("przejazdy/", filters=[("miasto", "==", "Kraków")])
```

> ⚠️ **Problem małych plików:** tysiące plików po kilka KB to koszmar wydajności — każde otwarcie pliku kosztuje (w chmurze: osobne zapytanie HTTP). Celuj w pliki **128 MB – 1 GB** i nie partycjonuj po kolumnach o bardzo wielu unikalnych wartościach.

---

### 6. Przetwarzanie równoległe — scale up vs scale out

- **Scale up** — większa maszyna (więcej rdzeni, więcej RAM). Proste, ale ma swój sufit.
- **Scale out** — więcej maszyn (klaster). Praktycznie bez limitu, ale wymaga rozproszonego przetwarzania.

Pierwszy krok to wykorzystanie wszystkich rdzeni jednej maszyny — wzorzec **map → reduce** na partycjach:

```python
from concurrent.futures import ProcessPoolExecutor

with ProcessPoolExecutor() as pool:
    wyniki_czesciowe = list(pool.map(przetworz_partycje, lista_plikow))  # MAP

wynik = sum(wyniki_czesciowe)  # REDUCE
```

---

### 7. Gdzie trzymać dane? Data Warehouse, Data Lake, Lakehouse

| | Data Warehouse | Data Lake | Data Lakehouse |
|--|----------------|-----------|----------------|
| Dane | ustrukturyzowane | wszystkie (surowe) | wszystkie |
| Schemat | przy zapisie | przy odczycie | przy zapisie (opcjonalnie) |
| Przykład | BigQuery | Parquet w GCS / S3 | Delta Lake, Apache Iceberg |

**Architektura medalionowa:** 🥉 Bronze (surowe dane) → 🥈 Silver (oczyszczone) → 🥇 Gold (gotowe agregaty dla biznesu).

---

### 8. Teaser: SQL bezpośrednio na plikach

```python
import duckdb

duckdb.sql("""
    SELECT miasto, SUM(kwota_pln) AS przychod
    FROM read_parquet('przejazdy/**/*.parquet', hive_partitioning = true)
    GROUP BY miasto
    ORDER BY przychod DESC
""").df()
```

Tę samą ideę — SQL na plikach w Data Lake — zobaczysz w **Spark SQL** (Wykład 5) i **BigQuery** (Wykład 11).

---

## 📚 Polecane materiały

- **Online:** [Apache Parquet — dokumentacja](https://parquet.apache.org/docs/)
- **Online:** [pandas — Scaling to large datasets](https://pandas.pydata.org/docs/user_guide/scale.html)
- **Online:** [DuckDB — Reading Parquet files](https://duckdb.org/docs/data/parquet/overview)
- **Książka:** *Designing Data-Intensive Applications* — Martin Kleppmann (rozdział 3: Storage and Retrieval)

---

## 🚀 Co dalej?

W następnym wykładzie (Wykład 3) przechodzimy z jednej maszyny na **klaster**: **Big Data i ekosystem Hadoop** — HDFS, MapReduce i YARN. Wzorzec *map → reduce*, który dziś poznaliśmy, zobaczysz w wersji na tysiące serwerów! 🐘

---

<Admonition type="note" title="Zadanie do przemyślenia">
  Masz tabelę z 200 kolumnami i 5 latami danych. Analityk prawie zawsze pyta o 3 kolumny z ostatniego miesiąca. W jakim formacie, z jaką kompresją i z jakim partycjonowaniem zapiszesz te dane, żeby jego zapytania czytały jak najmniej bajtów?
</Admonition>
