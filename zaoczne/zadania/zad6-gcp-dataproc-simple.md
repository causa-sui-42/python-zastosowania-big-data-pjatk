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

## ✅ Co wysłać?

1. 📸 **Screenshot** klastra Dataproc (pokazujący że działa)
2. 📸 **Screenshot** statusu joba (Succeeded ✅)
3. 📁 Kod `job_analyze_data.py`
4. 📸 Pierwsze 5 wierszy z wyniku (z Cloud Storage)

---

## 🎁 Bonus (opcjonalnie)

- ⚙️ Uruchom job używając `gcloud` CLI zamiast GUI
- 🔄 Dodaj job, który czyta z **BigQuery** zamiast CSV
- 💾 Zapisz wynik do BigQuery Table zamiast CSV

---

## 💡 Wskazówki

- 💰 **Pamiętaj wyłączyć klaster po zadaniu!** (Delete cluster) — inaczej będzie się naliczać koszt
- ☁️ Bucket musi być w tym samym regionie co klaster
- 🔑 Upewnij się, że masz uprawnienia do Cloud Storage i Dataproc
- 📝 Logs joba zobaczysz w konsoli GCP: Dataproc → Jobs → [twój job] → Logs

**Remember:** Free Tier GCP daje $300 kredytu na start — wystarczy na wiele eksperymentów! 🎉

Powodzenia w chmurze! ☁️🚀
