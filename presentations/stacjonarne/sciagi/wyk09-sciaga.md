---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 9: Cloud Computing i GCP'
footer: 'PJATK | Python w Zastosowaniach Big Data | Studia stacjonarne'
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 13px;
    padding: 18px 26px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 { font-size: 1.3em; color: #2d5986; margin: 0 0 6px 0; }
  h2 { font-size: 1.0em; color: #2d5986; margin: 6px 0 2px 0; border-bottom: 2px solid #2d5986; padding-bottom: 1px; }
  .cols { display: flex; gap: 20px; }
  .col { flex: 1; }
  ul { margin: 2px 0 6px 0; padding-left: 16px; }
  li { margin-bottom: 2px; }
  code { font-size: 0.82em; background: #f0f2f5; padding: 0 3px; border-radius: 3px; }
---

# ☁️ Wykład 9 — Cloud Computing i GCP

<div class="cols">
<div class="col">

## Model chmurowy
- Płacisz za **zużycie**, nie za posiadanie sprzętu (jak wynajem vs zakup domu)
- Opłacalne przy nieregularnym/okazjonalnym obciążeniu

## Modele usług
| Model | Usługa GCP | Kto zarządza czym |
|---|---|---|
| IaaS | Compute Engine | Ty: system, aplikacje |
| PaaS | Dataproc | Ty: konfiguracja klastra Spark |
| SaaS | BigQuery | Google: wszystko, Ty tylko zapytania |

## Data lake vs warehouse vs lakehouse
- **GCS** — data lake, dowolny format (surowe dane)
- **BigQuery** — data warehouse, dane ustrukturyzowane
- **BigLake** — lakehouse, łączy oba światy

</div>
<div class="col">

## BigQuery — koszty
- Silnik **Dremel**, storage **Colossus**
- Płatność za **przeskanowane bajty**, nie za zwrócone wiersze!
```python
job_config = bigquery.QueryJobConfig(dry_run=True)
# sprawdź koszt PRZED uruchomieniem
```
- Unikaj `SELECT *` → wybieraj tylko potrzebne kolumny
- `PARTITION BY DATE(...)` — skanuj tylko pasujące partycje
- `CLUSTER BY` — sortuje dane wewnątrz partycji (szybsze filtry)

## Dataproc
```bash
gcloud dataproc clusters create moj-klaster \
    --region=europe-central2 --max-idle=1h
gcloud dataproc jobs submit pyspark analiza.py \
    --cluster=moj-klaster --region=europe-central2
gcloud dataproc clusters delete moj-klaster
```
- **Ephemeral** klastry — twórz na czas zadania, usuwaj zaraz po
- Pułapka: zapomniany klaster działający 24/7 = niepotrzebne koszty!

</div>
</div>
