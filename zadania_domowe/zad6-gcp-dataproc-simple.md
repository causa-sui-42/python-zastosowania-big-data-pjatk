# 📝 Zadanie domowe 6 — GCP Dataproc Mini-Project

**Termin:** Przed wykładem 7 (14.06.2026)  
**Szacowany czas:** 30-40 minut (w tym setup GCP)  
**Cel:** Uruchomienie PySpark joba w chmurze GCP

---

## 🎯 Zadanie: Pierwszy job PySpark w chmurze! ☁️

### Przygotowanie (10 min)

1. 📝 Zaloguj się do [Google Cloud Console](https://console.cloud.google.com)
2. 🔧 Aktywuj Google Cloud Skills Boost (jeśli masz dostęp) lub Free Trial
3. 📁 Stwórz bucket w Cloud Storage: `gs://[twoj-projekt]-spark-jobs`
4. 📂 Wrzuć tam przykładowy plik CSV z danymi (min. 100 wierszy)

### Zadanie główne

#### 1. 🚀 Uruchom klaster Dataproc (GUI)
```bash
# Parametry klastra:
- Nazwa: movie-analysis-cluster
- Region: europe-central2 (Warsaw)
- Typ: Single Node (1 master, 0 workers) — dla zadania demo wystarczy!
- Machine type: e2-medium
```

#### 2. 📝 Napisz PySpark job

Stwórz plik `job_analyze_data.py`:

```python
from pyspark.sql import SparkSession
import pyspark.sql.functions as F

# Initialize Spark
spark = SparkSession.builder.appName("GCP_Job").getOrCreate()

# Wczytaj dane z Cloud Storage
df = spark.read.csv("gs://[twoj-bucket]/twoj_plik.csv", header=True, inferSchema=True)

# Wykonaj prostą analizę
result = df.groupBy("kategoria").agg(
    F.count("*").alias("liczba"),
    F.avg("wartość").alias("średnia")
).orderBy(F.desc("liczba"))

# Zapisz wynik do Cloud Storage
result.write.mode("overwrite").csv("gs://[twoj-bucket]/output/results")

print("✅ Job zakończony pomyślnie!")
spark.stop()
```

#### 3. 🏃 Submit job do Dataproc

Opcja A — GUI:
- W konsoli GCP: Dataproc → Jobs → Submit Job
- Job type: PySpark
- Main Python file: `gs://[twoj-bucket]/job_analyze_data.py`

Opcja B — gcloud CLI:
```bash
gcloud dataproc jobs submit pyspark \
    gs://[twoj-bucket]/job_analyze_data.py \
    --cluster=movie-analysis-cluster \
    --region=europe-central2
```

#### 4. 📊 Sprawdź wyniki

- Otwórz Cloud Storage i sprawdź folder `output/results`
- Pobierz plik CSV i zrób screenshota pierwszych wierszy

---

## 🎁 Bonus (opcjonalnie)

- ⚙️ Uruchom job używając `gcloud` CLI zamiast GUI
- 🔄 Dodaj job, który czyta z **BigQuery** zamiast CSV
- 💾 Zapisz wynik do BigQuery Table zamiast CSV

---

## ☁️ Jak korzystać z GCP bez karty kredytowej?

Nie masz karty kredytowej albo nie chcesz ryzykować kosztów? Masz kilka darmowych opcji:

### Opcja 1: Google Cloud Skills Boost (QwikLabs) — 🏆 POLECANE

Platforma [cloudskillsboost.google](https://www.cloudskillsboost.google/) udostępnia **tymczasowe projekty GCP z aktywnym billingiem** — bez Twojej karty kredytowej. To najlepszy sposób na przetestowanie komend z tego zadania!

**Rekomendowane darmowe laby (0 kredytów):**

| Lab | Temat | Link |
|-----|-------|------|
| 🟢 Dataproc: Qwik Start - Console | Tworzenie klastra przez GUI | [cloudskillsboost.google](https://www.cloudskillsboost.google/focuses/586) |
| 🟢 Dataproc: Qwik Start - Command Line | Komendy `gcloud dataproc` | [cloudskillsboost.google](https://www.cloudskillsboost.google/focuses/585) |
| 🟢 BigQuery: Qwik Start - Console | Zapytania SQL w BigQuery | [cloudskillsboost.google](https://www.cloudskillsboost.google/focuses/1145) |
| 🔵 Running Apache Spark jobs on Cloud Dataproc | PySpark job na Dataproc | [cloudskillsboost.google](https://www.cloudskillsboost.google/focuses/672) |

**Rekomendowany quest (seria labów):**
- 🎓 [Perform Foundational Data, ML, and AI Tasks in Google Cloud](https://www.cloudskillsboost.google/course_templates/631) — obejmuje BigQuery, Dataproc, Cloud Storage

### Opcja 2: Google Cloud Shell — darmowy terminal gcloud

[Google Cloud Shell](https://shell.cloud.google.com) to **darmowy terminal w przeglądarce** dostępny dla każdego użytkownika Google. Wystarczy konto Gmail!

```bash
# Otwórz: https://shell.cloud.google.com
# Masz dostępne:
# ✅ gcloud CLI (pre-instalowane)
# ✅ 5 GB persistent storage
# ✅ Dostęp do BigQuery public datasets
# ❌ Brak własnego projektu z billingiem (komendy dataproc NIE zadziałają bez projektu)
```

Dla komend `gcloud dataproc` potrzebujesz projektu z billingiem — użyj Cloud Skills Boost!

### Opcja 3: BigQuery Sandbox (bez billing account)

BigQuery oferuje **tryb sandbox** dla kont bez billing account:
- ✅ 1 TB zapytań miesięcznie za darmo
- ✅ Publiczne datasety (NYC Taxi, GitHub, Wikipedia...)
- ❌ Bez trwałych tabel (dane usuwane po 60 dniach)

```bash
# Sandbox jest aktywny automatycznie gdy nie masz billing account
# Dostęp: https://console.cloud.google.com/bigquery
# Wystarczy konto Google!
```

---

## 💡 Wskazówki

- 💰 **Pamiętaj wyłączyć klaster po zadaniu!** (Delete cluster) — inaczej będzie się naliczać koszt
- ☁️ Bucket musi być w tym samym regionie co klaster
- 🔑 Upewnij się, że masz uprawnienia do Cloud Storage i Dataproc
- 📝 Logs joba zobaczysz w konsoli GCP: Dataproc → Jobs → [twój job] → Logs
- 🎓 **Bez karty?** Skorzystaj z Cloud Skills Boost — tymczasowy projekt GCP na czas laba!

**Remember:** Free Tier GCP daje $300 kredytu na start — wystarczy na wiele eksperymentów! 🎉

Powodzenia w chmurze! ☁️🚀
