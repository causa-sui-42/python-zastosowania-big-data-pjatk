---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 2: Formaty i przechowywanie danych'
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
  table { font-size: 0.8em; border-collapse: collapse; }
  table, th, td { border: 1px solid #ccc; padding: 2px 6px; }
---

# 🗄️ Wykład 2 — Dane w skali: formaty i przechowywanie

<div class="cols">
<div class="col">

## Format wierszowy vs kolumnowy
| Format | Typ | Cechy |
|---|---|---|
| CSV | wierszowy | czytelny, brak schematu, wolny |
| JSON Lines | wierszowy | zagnieżdżone dane |
| Avro | wierszowy | schemat + ewolucja schematu |
| **Parquet** | **kolumnowy** | schemat, kompresja, szybkie agregacje |
| Arrow | kolumnowy | format w pamięci (zero-copy) |

## Parquet — dlaczego szybki?
- **Column pruning** — czyta tylko potrzebne kolumny
- **Predicate pushdown** — filtruje przy odczycie, nie po
- Kompresja: snappy (szybka), zstd, gzip (mocniejsza)

</div>
<div class="col">

## Optymalizacja pamięci / I/O
- Dobór typów (`int32` zamiast `int64` gdy można)
- Typ `category` w pandas dla kolumn z małą liczbą unikalnych wartości
- Przetwarzanie **w kawałkach** (`chunksize=`) gdy dane nie mieszczą się w RAM

## Partycjonowanie i architektura
- **Hive-style**: `rok=2026/miesiac=01/dane.parquet`
- Problem **small files** — zbyt wiele małych plików spowalnia odczyt
- **Scale up** (mocniejsza maszyna) vs **scale out** (więcej maszyn)
- Wzorzec **map → reduce** jako fundament przetwarzania rozproszonego

## Architektura danych
- **Data Warehouse** — dane ustrukturyzowane, SQL
- **Data Lake** — dane surowe, dowolny format
- **Lakehouse** — łączy oba światy
- Architektura **medalionowa**: Bronze (surowe) → Silver (czyste) → Gold (biznesowe)

</div>
</div>
