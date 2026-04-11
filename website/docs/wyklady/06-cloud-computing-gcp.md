---
id: 06-cloud-computing-gcp
title: "Wykład 6: Cloud Computing i zarządzanie klastrami Spark w GCP"
sidebar_label: "06 — Cloud Computing & GCP"
description: "Cloud computing, Google Cloud Platform: Dataproc, BigQuery, Cloud Storage. Zarządzanie klastrami Spark w chmurze."
---

import Admonition from '@theme/Admonition';
import DocImage from '@site/src/components/DocImage';

# Wykład 6: Cloud Computing i zarządzanie klastrami Spark w GCP

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Co to jest **Cloud Computing** (IaaS, PaaS, SaaS) i dlaczego jest kluczowy dla Big Data
- Jak działają kluczowe usługi **Google Cloud Platform**: Cloud Storage, BigQuery, Dataproc, Dataflow, Pub/Sub
- Jak **tworzić i zarządzać klastrami Spark** na Dataproc (gcloud CLI)
- Jak **submittować joby PySpark** do chmury
- Jak **optymalizować koszty** w chmurze (preemptible VMs, ephemeral clusters)
- Jak korzystać z **BigQuery** jako serverless data warehouse
- Gdzie znaleźć **darmowe kursy GCP** (Google Cloud Skills Boost / QwikLabs)

---

## ✅ Materiały do wykładu

📄 **[Otwórz slajdy PDF](/pdfs/wyk6-cloud-computing-spark-gcp-intermediate.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Cloud Computing — podstawy

Analogia: kupno domu (on-premise) vs wynajem mieszkania (cloud). Pay-per-use, elastyczność, autoskalowanie.

### 2. Google Cloud Platform — ekosystem Big Data

<DocImage src="/img/gcp-architecture.svg" alt="Architektura Big Data w GCP" style={{maxWidth: '100%', margin: '1rem 0'}} />

| Usługa | Typ | Odpowiednik |
|--------|-----|-------------|
| **Cloud Storage (GCS)** | Object storage | AWS S3, Azure Blob |
| **BigQuery** | Serverless DW | AWS Athena, Azure Synapse |
| **Dataproc** | Managed Spark/Hadoop | AWS EMR, Azure HDInsight |
| **Dataflow** | Managed Beam | AWS Kinesis, Azure Stream Analytics |
| **Pub/Sub** | Messaging | AWS SNS/SQS, Kafka |

### 3. Dataproc — Spark w chmurze

```bash
# Tworzenie klastra
gcloud dataproc clusters create moj-klaster \
    --region=europe-central2 \
    --num-workers=3 \
    --worker-machine-type=n1-standard-4

# Submittowanie joba PySpark
gcloud dataproc jobs submit pyspark analiza.py \
    --cluster=moj-klaster \
    --region=europe-central2
```

### 4. BigQuery — SQL na petabajtach

Serverless, bez infrastruktury do zarządzania. Płacisz za ilość przetworzonych danych.

### 5. Google Cloud Skills Boost

Rekomendowane darmowe kursy i questy do samodzielnego ćwiczenia.

---

## 📚 Dalsze czytanie

- [Google Cloud Skills Boost](https://www.cloudskillsboost.google/)
- [Dataproc Documentation](https://cloud.google.com/dataproc/docs)
- [BigQuery Documentation](https://cloud.google.com/bigquery/docs)

---

## ➡️ Co dalej?

W **Laboratorium 6** poćwiczysz BigQuery na publicznych zbiorach danych i poznasz workflow Dataproc. Następnie — **Wykład 7: Spark Streaming**!
