---
id: 09-cloud-computing-gcp
title: "Wykład 9: Cloud Computing i GCP — BigQuery, Dataproc"
sidebar_label: "09 — Cloud & GCP"
description: "Cloud computing, Google Cloud Platform: BigQuery (serverless data warehouse), Dataproc (managed Spark), architektura data lake/warehouse/lakehouse, koszty i partycjonowanie."
---

import Admonition from '@theme/Admonition';

# Wykład 9: Cloud Computing i GCP — BigQuery, Dataproc

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

**Zajęcia nr 9** — 01.12.2026 (wtorek)

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Dlaczego warto przenosić obciążenia Big Data **do chmury** i czym są modele **IaaS / PaaS / SaaS**
- Jak wygląda ekosystem Big Data w **Google Cloud Platform**: Cloud Storage, BigQuery, Dataproc, Dataflow
- Czym różni się **data lake**, **data warehouse** i **lakehouse** — i gdzie w tej układance jest GCS, a gdzie BigQuery
- Jak działa architektura **BigQuery** (Dremel, Colossus) — serverless, kolumnowy silnik SQL na petabajtach
- Jak świadomie kontrolować **koszty** zapytań — bajty skanowane, `dry_run`, **partycjonowanie** i **clustering** tabel
- Jak łączyć się z BigQuery z **Pythona** (`google-cloud-bigquery`) i z **PySpark** na Dataproc
- Czym jest **Dataproc** i jak tworzyć/kasować klastry Spark w chmurze (`gcloud`)
- Jakie są typowe **pułapki kosztowe i bezpieczeństwa** w GCP

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie Markdown (Marp). Możesz je otworzyć bezpośrednio lub wyeksportować do PDF.
</Admonition>

📄 **[Otwórz slajdy PDF](pathname:///stacjonarne/pdfs/wyk09-cloud-computing-gcp.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Dlaczego chmura?

Analogia: kupno domu (on-premise) vs wynajem mieszkania (cloud). Płacisz za **zużycie**, nie za **posiadanie** sprzętu — kluczowe przy nieprzewidywalnych, okazjonalnych obciążeniach Big Data.

### 2. Modele usług — IaaS / PaaS / SaaS

| Model | Co dostajesz? | Przykład w GCP |
|-------|----------------|-------------------|
| **IaaS** | Serwery, sieć, storage | Compute Engine |
| **PaaS** | + OS + runtime | Dataproc |
| **SaaS** | Wszystko gotowe | BigQuery |

### 3. GCP — ekosystem Big Data

| Usługa | Typ | Rola |
|--------|-----|------|
| **Cloud Storage (GCS)** | Object storage | Data lake — surowe pliki |
| **BigQuery** | Serverless data warehouse | SQL na petabajtach |
| **Dataproc** | Managed Spark/Hadoop | Ciężkie przetwarzanie PySpark |
| **Dataflow** | Managed Apache Beam | Batch + streaming ETL (Wykład 10) |

### 4. Data lake vs data warehouse vs lakehouse

| Cecha | Data Lake | Data Warehouse | Lakehouse |
|-------|-----------|------------------|-----------|
| Dane | Surowe, dowolny format | Ustrukturyzowane | Oba naraz |
| Schema | Schema-on-read | Schema-on-write | Elastyczne |
| Przykład GCP | Cloud Storage | BigQuery | BigLake |

### 5. BigQuery — architektura i koszty

BigQuery to serverless data warehouse zbudowany na silniku **Dremel** (masywnie równoległe wykonywanie zapytań) i storage'u **Colossus** (dane kolumnowe). Płacisz za **przeskanowane bajty**, nie za zwrócone wiersze:

```sql
-- Analiza publicznego datasetu Chicago Taxi Trips
SELECT
    EXTRACT(HOUR FROM trip_start_timestamp) AS godzina,
    ROUND(AVG(fare), 2) AS srednia_stawka
FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`
WHERE trip_start_timestamp BETWEEN '2023-01-01' AND '2023-01-31'
GROUP BY godzina
ORDER BY godzina;
```

Kontrola kosztów przed uruchomieniem zapytania (`dry_run`):

```python
from google.cloud import bigquery

client = bigquery.Client()
job_config = bigquery.QueryJobConfig(dry_run=True, use_query_cache=False)
job = client.query("SELECT * FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`", job_config=job_config)
print(f"{job.total_bytes_processed / 1e9:.2f} GB do zeskanowania")
```

Partycjonowanie i clustering drastycznie obniżają koszty:

```sql
CREATE TABLE moj_projekt.taxi.trips_partitioned
PARTITION BY DATE(trip_start_timestamp)
CLUSTER BY pickup_community_area
AS SELECT * FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`;
```

### 6. Łączenie z BigQuery z Pythona

```python
df = client.query("""
    SELECT payment_type, COUNT(*) AS liczba
    FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`
    GROUP BY payment_type
""").to_dataframe()  # 👈 od razu pandas DataFrame!
```

### 7. Dataproc — managed Spark w chmurze

```bash
# Tworzenie ephemeral klastra z autoscalingiem i auto-usuwaniem
gcloud dataproc clusters create pjatk-taxi-cluster \
    --region=europe-central2 \
    --num-workers=2 \
    --num-secondary-workers=2 --secondary-worker-type=preemptible \
    --max-idle=1h

# Submittowanie joba PySpark
gcloud dataproc jobs submit pyspark analiza_taxi.py \
    --cluster=pjatk-taxi-cluster --region=europe-central2

# Zawsze sprzątaj po sobie!
gcloud dataproc clusters delete pjatk-taxi-cluster --region=europe-central2 --quiet
```

### 8. Typowe pułapki

- `SELECT *` na dużych tabelach — skanuje wszystkie kolumny = niepotrzebny koszt
- Zapomniany, działający 24/7 klaster Dataproc
- Brak partycjonowania/clusteringu na często odpytywanych tabelach
- Publiczne buckety GCS bez świadomej konfiguracji IAM

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego `SELECT COUNT(*)` może być dużo tańsze niż `SELECT *` na tej samej tabeli?
2. Kiedy opłaca się utrzymywać klaster Dataproc 24/7, a kiedy lepszy jest model ephemeral?
3. Co się stanie z kosztem zapytania, jeśli dodasz `PARTITION BY` do tabeli, którą odpytujesz codziennie po dacie?
:::

---

## 📚 Polecane materiały

- [BigQuery Documentation](https://cloud.google.com/bigquery/docs)
- [BigQuery public datasets — Chicago Taxi Trips](https://cloud.google.com/bigquery/public-data)
- [Dataproc Documentation](https://cloud.google.com/dataproc/docs)
- [google-cloud-bigquery Python client](https://cloud.google.com/python/docs/reference/bigquery/latest)
- [Google Cloud Skills Boost](https://www.cloudskillsboost.google/)

---

## ➡️ Co dalej?

Na dzisiejszych **ćwiczeniach** przeanalizujesz przejazdy taksówek w Chicago przy pomocy BigQuery (z pełnym fallbackiem offline, gdyby konto GCP nie było dostępne) 🚕📊.

Na **Wykładzie 10 (08.12.2026)** przechodzimy do **przetwarzania strumieniowego** — Structured Streaming i Kafka!

<Admonition type="tip" title="Przed następnymi zajęciami">
  Upewnij się, że rozumiesz różnicę między batch a streaming processing — to punkt wyjścia do Structured Streaming.
</Admonition>

Semestr: Zimowy 2026/2027
