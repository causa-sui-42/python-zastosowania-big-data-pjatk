---
id: 10-streaming-structured-kafka
title: "Wykład 10: Przetwarzanie strumieniowe — Structured Streaming i Kafka"
sidebar_label: "10 — Streaming i Kafka"
description: "Spark Structured Streaming: unbounded table, readStream/writeStream, windowed aggregations, watermarking, output modes oraz wprowadzenie do Apache Kafka (topics, partitions, producers, consumers)."
---

import Admonition from '@theme/Admonition';

# Wykład 10: Przetwarzanie strumieniowe — Structured Streaming i Kafka

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

**Zajęcia nr 10** — 08.12.2026 (wtorek)

<Admonition type="info" title="Ostatni wykład merytoryczny kursu">
  Nawiążemy dziś do **Wykładu 9 (01.12.2026) — Cloud Computing i GCP**: tam uruchamialiśmy zadania Spark w chmurze (Dataproc), dziś przechodzimy do przetwarzania danych w czasie rzeczywistym. To również **ostatni wykład merytoryczny** kursu.
</Admonition>

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Czym różni się **przetwarzanie strumieniowe** od batch processing
- Jak działa **Apache Kafka** na poziomie koncepcyjnym: topics, partitions, producers, consumers, brokers
- Jak działa **model unbounded table** w Spark Structured Streaming
- Jak korzystać z **`readStream` / `writeStream`** API
- Jak stosować **windowed aggregations** (tumbling, sliding) do agregacji w czasie
- Jak obsługiwać **spóźnione dane** za pomocą watermarkingu
- Czym różnią się **output modes**: append, update, complete
- Jak wygląda architektura **Kafka + Spark** w praktyce

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie Markdown (Marp). Możesz je otworzyć bezpośrednio lub wyeksportować do PDF.
</Admonition>

📄 **[Otwórz slajdy PDF](pathname:///stacjonarne/pdfs/wyk10-streaming-structured-kafka.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Batch vs Streaming

| Cecha | Batch 📦 | Streaming 🌊 |
|-------|----------|--------------|
| Dane | Skończony zbiór | Nieskończony strumień |
| Opóźnienie | Minuty–godziny | Milisekundy–sekundy |
| Przykład | Miesięczny raport jakości powietrza | Alert o przekroczeniu normy PM2.5 |
| Złożoność | Niższa | Wyższa ⚠️ |

### 2. Apache Kafka — podstawowe koncepcje

| Pojęcie | Opis |
|---------|------|
| **Topic** | Logiczny kanał danych (np. jeden temat = jeden typ eventu) |
| **Partition** | Podział topiku umożliwiający równoległe przetwarzanie |
| **Producer** | Aplikacja/urządzenie wysyłające dane do topiku |
| **Consumer** | Aplikacja odbierająca i przetwarzająca dane z topiku |
| **Broker** | Serwer Kafki przechowujący i serwujący dane topiku |

### 3. Structured Streaming — model unbounded table

Strumień danych traktowany jest jako **nieskończona tabela**, do której stale dopisywane są nowe wiersze. Standardowe operacje DataFrame/SQL działają bez zmian!

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, window, avg

spark = SparkSession.builder.appName("JakoscPowietrza").getOrCreate()

# Czytanie strumienia (docelowo: Kafka; w Colab: pliki JSON)
odczyty = (spark.readStream
    .schema(schemat_czujnikow)
    .json("/dane/strumien_czujnikow/"))

# Windowed aggregation z watermarkiem
srednie_pm25 = (odczyty
    .withWatermark("timestamp", "10 minutes")
    .groupBy(window(col("timestamp"), "5 minutes"), col("sensor_id"))
    .agg(avg("pm25").alias("srednia_pm25")))

# Zapis wyniku
query = (srednie_pm25.writeStream
    .outputMode("complete")
    .format("memory")
    .queryName("srednie_pm25_tabela")
    .start())
```

### 4. Output modes

| Output Mode | Co zapisuje? | Kiedy używać? |
|-------------|---------------|----------------|
| **Append** | Tylko nowe wiersze | Filtry/mapy bez agregacji, np. surowe alerty |
| **Complete** | Cała tabela wyników | Agregacje (`groupBy`) — nadpisuje wszystko |
| **Update** | Tylko zmienione wiersze | Agregacje — mniejszy narzut zapisu |

### 5. Watermarking

Mechanizm obsługi spóźnionych danych z czujników: `withWatermark("timestamp", "10 minutes")` — dane spóźnione o więcej niż podany próg są odrzucane, a stan agregacji zwalniany z pamięci.

### 6. Architektura Kafka + Spark

Czujniki (producers) → Kafka topic → Spark Structured Streaming (windowed avg, watermark, alerty) → dashboard / system alertów / data lake. W środowisku Colab bez klastra Kafki symulujemy lewą stronę generatorem plików JSON, który Spark czyta identycznie przez `readStream`.

### 7. Najczęstsze pułapki

- Brak `checkpointLocation` → utrata stanu po restarcie
- Brak watermarku przy agregacjach → rosnące zużycie pamięci (OOM)
- `outputMode("append")` z `groupBy()` bez watermarku → błąd wykonania
- Testowanie od razu na prawdziwej Kafce zamiast zacząć od file/rate source

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego Kafka przechowuje wiadomości w wielu partycjach zamiast jednej długiej kolejce?
2. Co się stanie z odczytem czujnika, który dotrze po upływie okna watermarku?
3. Kiedy wybierzesz `outputMode("complete")`, a kiedy `"update"` dla tej samej agregacji?
:::

---

## 📚 Polecane materiały

- [Structured Streaming Programming Guide](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)
- [Spark + Kafka Integration Guide](https://spark.apache.org/docs/latest/structured-streaming-kafka-integration.html)
- Książka: *Learning Spark, 2nd Edition* — rozdział o Structured Streaming
- Confluent — Apache Kafka Fundamentals (darmowy kurs online)

---

## ➡️ Co dalej?

Na dzisiejszych **ćwiczeniach** zbudujesz system monitoringu jakości powietrza w czasie rzeczywistym — z symulowanym strumieniem z ~30 czujników 🌬️📡.

**Test teoretyczny** odbędzie się **15.12.2026** i obejmuje materiał z **Wykładów 1–10** — 30 zamkniętych pytań ABCD (jedna poprawna odpowiedź, bez punktów ujemnych, bez pytań otwartych). Sprawdź stronę **"Egzamin"**, aby poznać dokładny zakres i format. **Obrona projektu zaliczeniowego** odbędzie się **22.12.2026** — sprawdź stronę **"Projekt zaliczeniowy"**, jeśli jeszcze tego nie zrobiłeś/aś!

<Admonition type="tip" title="Przed testem teoretycznym">
  To był ostatni wykład merytoryczny kursu — świetny moment, by zacząć powtórkę materiału z Wykładów 1–10. Zadanie domowe do tego wykładu to również dobra okazja do utrwalenia wiedzy przed testem.
</Admonition>

Semestr: Zimowy 2026/2027
