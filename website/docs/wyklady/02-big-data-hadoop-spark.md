---
id: 02-big-data-hadoop-spark
title: "Wykład 2: Wprowadzenie do Big Data, Hadoop i Spark"
sidebar_label: "02 — Big Data, Hadoop & Spark"
description: "Dlaczego Big Data? Ekosystem Hadoop, architektura HDFS, MapReduce i Apache Spark — od zera."
---

import Admonition from '@theme/Admonition';
import DocImage from '@site/src/components/DocImage';

# Wykład 2: Wprowadzenie do Big Data, Hadoop i Spark

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Podstawowy &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Co to jest **Big Data** i dlaczego tradycyjne narzędzia sobie z nim nie radzą
- Jak działa ekosystem **Apache Hadoop** (HDFS + MapReduce + YARN)
- Dlaczego **Apache Spark** jest 100× szybszy od MapReduce
- Jak wygląda nowoczesna architektura Big Data (Lambda, Kappa, Data Lakehouse)

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie PDF. Możesz je otworzyć bezpośrednio w przeglądarce lub pobrać.
</Admonition>

📄 **[Otwórz slajdy PDF](/pdfs/wyk2-intro-big-data-hadoop-spark-beginner.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Co to jest Big Data?

**Big Data** to dane, które są zbyt duże, zbyt szybkie lub zbyt różnorodne, żeby przetworzyć je tradycyjnymi narzędziami (np. jedną bazą SQL na jednym serwerze).

Klasyczna definicja opiera się na **3V** (dziś mówi się o 5V lub więcej):

| V | Nazwa | Opis | Przykład |
|---|-------|------|---------|
| Volume | **Wolumen** | Ogromna ilość danych | Facebook: 4 PB nowych danych/dzień |
| Velocity | **Prędkość** | Dane napływają w czasie rzeczywistym | Twitter: 6 000 tweetów/sekundę |
| Variety | **Różnorodność** | Ustrukturyzowane, pół- i nieustrukturyzowane | Logi, zdjęcia, JSON, CSV, wideo |
| Veracity | **Wiarygodność** | Dane mogą być błędne lub niekompletne | Brakujące wartości, duplikaty |
| Value | **Wartość** | Dane same w sobie nic nie znaczą — liczy się insight | Wzrost sprzedaży o 15% dzięki rekomendacjom |

---

### 2. Ekosystem Apache Hadoop

Hadoop to **platforma open-source** do przechowywania i przetwarzania danych w sposób rozproszony — na klastrze wielu zwykłych serwerów.

Kluczowe komponenty:

<DocImage src="/img/hadoop-spark-ecosystem.svg" alt="Ekosystem Hadoop + Spark" style={{maxWidth: '100%', margin: '1rem 0'}} />

**HDFS** — przechowuje pliki w blokach (domyślnie 128 MB) replikowanych na 3 węzłach. Odporny na awarie!

**MapReduce** — model programowania: najpierw `map` (transform), potem `reduce` (aggregate). Wolny, bo wszystko idzie przez dysk.

---

### 3. Dlaczego Apache Spark?

**Apache Spark** rozwiązuje główną bolączkę MapReduce — przetwarza dane **w pamięci RAM** zamiast na dysku.

```python
# MapReduce: miliony operacji I/O na dysk
# Spark: dane trzymane w pamięci przez cały czas przetwarzania

from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("Wykład 1 Demo") \
    .getOrCreate()

# Wczytuję dane
df = spark.read.csv("sprzedaz.csv", header=True, inferSchema=True)

# Agregacja — PySpark wie jak to zrównoleglić
wynik = df.groupBy("kategoria").sum("przychod")
wynik.show()
# +----------------+---------------+
# |kategoria       |sum(przychod)  |
# +----------------+---------------+
# |Elektronika     |2847329.50     |
# |Odzież          |1203847.20     |
# +----------------+---------------+
```

**Spark jest 10–100× szybszy od MapReduce** dla zadań iteracyjnych (ML, grafy).

---

### 4. Nowoczesna architektura Big Data

```
Źródła danych          Ingestion Layer         Storage & Processing
─────────────         ───────────────         ─────────────────────
IoT Sensors    ──►    Apache Kafka     ──►    Data Lake (GCS/S3)
Web Logs       ──►    Pub/Sub          ──►    Apache Spark
Bazy SQL       ──►    Batch ETL        ──►    BigQuery
APIs           ──►    Dataflow         ──►    Delta Lake
                                              ▼
                                         Warstwa analityczna
                                         (dashboardy, ML, raporty)
```

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Jaką firmę znasz, która **musi** używać Big Data? Jakie dane przetwarza?
2. Dlaczego replikacja danych na 3 węzłach jest lepsza niż RAID w jednym serwerze?
3. Kiedy **NIE** potrzebujesz Big Data — kiedy wystarczy zwykła baza SQL?
:::

---

## 📚 Dalsze czytanie

- [Apache Hadoop — oficjalna dokumentacja](https://hadoop.apache.org/docs/stable/)
- [Apache Spark — Quick Start](https://spark.apache.org/docs/latest/quick-start.html)
- Książka: *"Hadoop: The Definitive Guide"* — Tom White (O'Reilly)
- Książka: *"Learning Spark, 2nd Edition"* — Damji et al. (O'Reilly)

---

## ➡️ Co dalej?

Kolejny krok to **Laboratorium 1** — przeanalizujemy prawdziwy zbiór danych e-commerce (500 tys. rekordów) używając PySpark. Zacznij od przeczytania instrukcji ćwiczenia!
