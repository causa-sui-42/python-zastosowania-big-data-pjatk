---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 3: Big Data i ekosystem Hadoop'
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
---

# 🐘 Wykład 3 — Big Data i ekosystem Hadoop

<div class="cols">
<div class="col">

## 5V Big Data
- **Volume** — ilość danych
- **Velocity** — szybkość napływu
- **Variety** — różnorodność formatów
- **Veracity** — wiarygodność/jakość
- **Value** — wartość biznesowa

## HDFS (Hadoop Distributed File System)
- **NameNode** — przechowuje metadane (gdzie są bloki)
- **DataNode** — przechowuje faktyczne bloki danych
- **Secondary NameNode** — pomocniczy checkpoint (NIE backup!)
- **Replication factor = 3** domyślnie (odporność na awarie)

</div>
<div class="col">

## MapReduce
- Fazy: **Map → Shuffle → Reduce**
- Map: przetwarza dane lokalnie, produkuje pary klucz-wartość
- Shuffle: grupuje po kluczu, przesyła przez sieć
- Reduce: agreguje wartości dla każdego klucza
- **Wolny**, bo zapisuje wyniki pośrednie **na dysk** między fazami

## YARN (Yet Another Resource Negotiator)
- **ResourceManager** — globalne zarządzanie zasobami klastra
- **NodeManager** — zarządzanie zasobami na danym węźle
- **ApplicationMaster** — zarządza pojedynczą aplikacją
- **Container** — jednostka alokacji zasobów (CPU + RAM)

## Ekosystem Hadoop
- **Hive** — SQL nad danymi w HDFS
- **HBase** — baza NoSQL (kolumnowa) nad HDFS
- **Sqoop** — import/eksport danych z/do RDBMS
- **Oozie** — orkiestracja i planowanie workflow

</div>
</div>
