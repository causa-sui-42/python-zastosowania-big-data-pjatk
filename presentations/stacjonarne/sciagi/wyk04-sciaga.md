---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 4: Apache Spark — architektura, RDD, PySpark'
footer: 'PJATK | Python w Zastosowaniach Big Data | Studia stacjonarne'
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 13.5px;
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

# ⚡ Wykład 4 — Apache Spark: architektura i RDD

<div class="cols">
<div class="col">

## Dlaczego Spark > MapReduce
- Przetwarzanie **w pamięci (RAM)**, nie na dysku między krokami
- Regresja logistyczna: Hadoop ~110s/iterację vs Spark ~0.9s/iterację

## Architektura
- **Driver** — planuje zadania, tworzy DAG
- **Cluster Manager** — przydziela zasoby (standalone, YARN, Kubernetes)
- **Executory** — wykonują zadania na węzłach

## RDD = Resilient Distributed Dataset
- **Resilient** — odporny dzięki **lineage** (historii transformacji)
- **Distributed** — rozbity na partycje na wielu maszynach
- **Dataset** — kolekcja danych
- **Niemutowalny** — ułatwia odtworzenie po awarii

</div>
<div class="col">

## Transformacje (lazy) vs Akcje (eager)
```python
rdd.map(f)          # transformacja — nic się nie dzieje
rdd.filter(f)        # transformacja
rdd.reduceByKey(f)    # transformacja
rdd.collect()        # AKCJA — wykonuje cały plan
rdd.count()          # AKCJA
rdd.take(5)          # AKCJA
```

## Pułapki wydajnościowe
- `collect()` na ogromnym RDD → **OutOfMemory** na driverze!
- `groupByKey()` przesyła WSZYSTKIE wartości przez sieć
- `reduceByKey()` redukuje lokalnie przed shufflem — zawsze preferuj
- Brak `.cache()` przy wielokrotnym użyciu tego samego RDD → ponowne przeliczanie

## Szybki start w Colab
```python
sc = SparkContext(master="local[*]")
rdd = sc.parallelize([1,2,3], numSlices=2)
```
`local[*]` = użyj wszystkich dostępnych rdzeni CPU jako "klaster"

</div>
</div>
