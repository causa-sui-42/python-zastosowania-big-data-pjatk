---
id: 07-spark-streaming
title: "Wykład 7: Spark Streaming i przetwarzanie strumieniowe danych"
sidebar_label: "07 — Spark Streaming"
description: "Structured Streaming w Spark: okna czasowe, watermarks, integracja z Kafka, przetwarzanie w czasie rzeczywistym."
---

import Admonition from '@theme/Admonition';

# Wykład 7: Spark Streaming i przetwarzanie strumieniowe danych

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni–Zaawansowany &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Czym jest **przetwarzanie strumieniowe** i czym różni się od batch processing
- Jak działa **Spark Structured Streaming** — unbounded table concept
- Jak korzystać z **readStream/writeStream** API
- Jak stosować **okna czasowe**: tumbling, sliding, session windows
- Jak obsługiwać **spóźnione dane** za pomocą watermarks
- Jak integrować Spark Streaming z **Apache Kafka**
- Jak monitorować i debugować strumienie (checkpointing, Spark UI)

---

## ✅ Materiały do wykładu

📄 **[Otwórz slajdy PDF](/pdfs/wyk7-spark-streaming-intermediate.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Batch vs Streaming

<img src="/img/streaming-architecture.svg" alt="Architektura Spark Streaming + Kafka" style={{maxWidth: '100%', margin: '1rem 0'}} />

| Cecha | Batch | Streaming |
|-------|-------|-----------|
| Opóźnienie | Minuty–godziny | Milisekundy–sekundy |
| Dane | Skończone | Nieskończone |
| Przetwarzanie | Cały zbiór naraz | Przyrostowe |
| Przykład | Raport dzienny | Wykrywanie oszustw |

### 2. Structured Streaming — model unbounded table

Strumień danych traktowany jako **nieskończona tabela**, do której stale dopisywane są nowe wiersze. Operacje SQL/DataFrame działają normalnie!

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Streaming").getOrCreate()

# Czytanie strumienia
df = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "events") \
    .load()

# Przetwarzanie jak zwykły DataFrame!
counts = df.groupBy("event_type").count()

# Zapis wyników
query = counts.writeStream \
    .outputMode("complete") \
    .format("console") \
    .start()
```

### 3. Window Operations

Tumbling window, sliding window, session window — agregacje w oknach czasowych.

### 4. Watermarks

Mechanizm obsługi spóźnionych danych: `withWatermark("timestamp", "10 minutes")`.

### 5. Integracja z Kafka

End-to-end: czytanie z Kafka → przetwarzanie → zapis do Kafka/konsoli/plików.

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Kiedy potrzebujesz streamingu, a kiedy wystarczy batch co 5 minut?
2. Co się stanie z danymi, które przyjdą po zamknięciu okna i po upływie watermark?
3. Dlaczego exactly-once semantics jest trudne do osiągnięcia?
:::

---

## 📚 Dalsze czytanie

- [Structured Streaming Guide](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)
- [Kafka Integration](https://spark.apache.org/docs/latest/structured-streaming-kafka-integration.html)
- Książka: *"Stream Processing with Apache Spark"* — Zaharia et al. (O'Reilly)

---

## ➡️ Co dalej?

W **Laboratorium 7** zbudujesz system przetwarzania danych IoT z SmartCity Warszawa 🏙️ w czasie rzeczywistym. Na **ostatnim zjeździe (28.06)** — podsumowanie kursu i **obrona projektu zaliczeniowego**!
