---
id: 06-cloud-gcp-qwiklabs
title: "Lab 6: BigQuery, Dataproc i Spark w chmurze GCP"
sidebar_label: "Lab 6 — Cloud GCP"
description: "Praktyczne ćwiczenia z BigQuery, Dataproc i zarządzanie klastrami Spark w Google Cloud Platform."
---

import Admonition from '@theme/Admonition';

# Laboratorium 6: BigQuery, Dataproc i Spark w chmurze GCP

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Cel ćwiczenia

Twoja firma **DataDrive Polska** 🛒 otrzymała zlecenie — analiza danych sprzedażowych z BigQuery public datasets. Nauczysz się korzystać z chmury Google do analizy Big Data.

Laboratorium składa się z dwóch części:
- **Część A** (ćw. 1-4): BigQuery — zapytania SQL na publicznych zbiorach danych (free tier)
- **Część B** (ćw. 5-7): Dataproc — tworzenie klastrów Spark i submittowanie jobów (walkthrough)

---

## � Pobierz notebook

<a href="/notebooks/cw-06-cloud-spark-gcp-qwiklabs.ipynb" download>📥 <strong>Pobierz: cw-06-cloud-spark-gcp-qwiklabs.ipynb</strong></a>

---

## 📋 Zadania

| Nr | Temat | Techniki |
|----|-------|----------|
| 1 | Połączenie z BigQuery | `google-cloud-bigquery`, auth, test query |
| 2 | Eksploracja danych | Chicago Taxi Trips, count, unique values |
| 3 | Analiza SQL | Top firmy, avg fare, godziny szczytu |
| 4 | Wizualizacja | Trendy miesięczne, histogram, matplotlib |
| 5 | Dataproc walkthrough | `gcloud` CLI, tworzenie klastra |
| 6 | PySpark job na Dataproc | Skrypt PySpark + submit do chmury |
| 7 | Optymalizacja kosztów | Kalkulator kosztów BigQuery vs Dataproc |
| 🌟 | Bonus: Cloud Skills Boost | Darmowy quest na QwikLabs |

<Admonition type="info" title="Google Cloud Skills Boost">
  Zalecane darmowe kursy do samodzielnego ćwiczenia:
  - [Perform Foundational Data, ML, and AI Tasks](https://www.cloudskillsboost.google/course_templates/631)
  - [Running Apache Spark jobs on Cloud Dataproc](https://www.cloudskillsboost.google/focuses/672)
</Admonition>
