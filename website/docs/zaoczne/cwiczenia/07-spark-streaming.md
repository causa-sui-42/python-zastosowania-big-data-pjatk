---
id: 07-spark-streaming
title: "Lab 7: Spark Structured Streaming — przetwarzanie w czasie rzeczywistym"
sidebar_label: "Lab 7 — Spark Streaming"
description: "Structured Streaming: rate source, window operations, watermarks, file-based streaming, system alertów IoT."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 7: Spark Structured Streaming

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni–Zaawansowany &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Cel ćwiczenia

Jesteś inżynierem danych w **SmartCity Warszawa** 🏙️ — projekcie inteligentnego miasta. Czujniki IoT wysyłają dane w czasie rzeczywistym: temperatura, wilgotność, natężenie ruchu, jakość powietrza. Twój system musi je przetwarzać na bieżąco!

Po wykonaniu ćwiczenia będziesz potrafić:

- Tworzyć strumienie danych z `readStream` / `writeStream`
- Stosować **okna czasowe**: tumbling i sliding windows
- Obsługiwać **spóźnione dane** z watermarks
- Przetwarzać pliki przyrostowo (file-based streaming)
- Budować **system alertów** w czasie rzeczywistym

---

## � Pobierz notebook

<DownloadLink href="/zaoczne/notebooks/cw-07-spark-streaming.ipynb">📥 <strong>Pobierz: cw-07-spark-streaming.ipynb</strong></DownloadLink>

---

## 📋 Zadania

| Nr | Temat | Techniki |
|----|-------|----------|
| 1 | Pierwszy strumień | rate source, `readStream`, memory sink |
| 2 | Filtrowanie strumienia | UDF, filtr temperatury > 30°C |
| 3 | Agregacje + output modes | `groupBy`, Complete vs Update vs Append |
| 4 | Tumbling windows | `window("timestamp", "10 seconds")` |
| 5 | Sliding windows | `window("timestamp", "20 seconds", "10 seconds")` |
| 6 | Watermarks | `withWatermark()`, spóźnione dane |
| 7 | File-based streaming | Zapis/odczyt plików, checkpointing |
| 🌟 | Bonus: System alertów | Anomaly detection + `foreachBatch` |

<Admonition type="info" title="Uwaga techniczna">
  Ćwiczenia działają w pełni na Google Colab bez Kafka — używamy rate source, file-based streaming i memory sink. Każdy strumień automatycznie zatrzymuje się po 30 sekundach.
</Admonition>

<Admonition type="tip" title="Przetestuj streaming w chmurze GCP — bez karty kredytowej!">
  Chcesz zobaczyć jak wygląda streaming produkcyjny? Skorzystaj z darmowych labów na [Cloud Skills Boost](https://www.cloudskillsboost.google/) — tymczasowe projekty GCP bez Twojej karty!

  **Odpowiedniki z ćwiczenia w chmurze:**
  | W notebooku | W GCP | Lab |
  |-------------|-------|-----|
  | `rate source` | Cloud Pub/Sub | [Pub/Sub: Qwik Start - Console](https://www.cloudskillsboost.google/focuses/3719) |
  | `writeStream console` | BigQuery streaming | [Streaming Analytics into BigQuery](https://www.cloudskillsboost.google/focuses/1206) |
  | `format("socket")` | Dataflow (Apache Beam) | [Dataflow: Qwik Start - Templates](https://www.cloudskillsboost.google/focuses/1101) |

  **🟢 Darmowe laby — zacznij od tych:**
  - [Cloud Pub/Sub: Qwik Start - Console](https://www.cloudskillsboost.google/focuses/3719) — message broker, odpowiednik Kafki w GCP
  - [Dataflow: Qwik Start - Templates](https://www.cloudskillsboost.google/focuses/1101) — serverless stream processing
  - [Streaming Analytics into BigQuery](https://www.cloudskillsboost.google/focuses/1206) — strumień → BigQuery
  - [Streaming Data Processing: Pub/Sub to BigQuery](https://www.cloudskillsboost.google/focuses/1159) — end-to-end pipeline

  **🖥️ Google Cloud Shell** — [shell.cloud.google.com](https://shell.cloud.google.com) — darmowy terminal dla każdego użytkownika Google (wystarczy Gmail)!
</Admonition>
