---
id: 02-formaty-danych-hulajnogi
title: "Lab 2: CSV vs Parquet — dane z wypożyczalni hulajnóg"
sidebar_label: "Lab 2 — Parquet i partycjonowanie"
description: "Praktyczne porównanie formatów CSV i Parquet, kompresja, typy danych, partycjonowanie, przetwarzanie w kawałkach i równoległe na 500 000 przejazdów hulajnogami."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 2: CSV vs Parquet — dane z wypożyczalni hulajnóg 🛴

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Podstawowy–Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

W tym laboratorium **zmierzysz na własne oczy**, jak format zapisu i sposób organizacji danych wpływają na rozmiar plików, zużycie pamięci i czas przetwarzania. To fundament pod Hadoop, Spark i BigQuery w kolejnych tygodniach.

Po wykonaniu ćwiczenia będziesz potrafić:

- Porównać **CSV** i **Parquet** pod względem rozmiaru i czasu odczytu
- Zmniejszyć zużycie RAM przez dobór **typów danych**
- Stosować **column pruning** i różne kodeki **kompresji**
- **Partycjonować** dane i czytać tylko potrzebne partycje
- Przetwarzać plik większy niż pamięć **w kawałkach**
- Zrównoleglić obliczenia na partycjach we wzorcu **map → reduce**

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-02-formaty-danych-hulajnogi.ipynb">📥 <strong>Pobierz: cw-02-formaty-danych-hulajnogi.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Dane są **generowane syntetycznie** w notebooku (NumPy, `np.random.default_rng(42)`) — nie musisz niczego pobierać.

| Atrybut | Wartość |
|---------|---------|
| Scenariusz | Przejazdy z wypożyczalni hulajnóg elektrycznych w 8 polskich miastach |
| Liczba wierszy | 500 000 przejazdów (kwiecień–wrzesień 2026) |
| Kolumny | `przejazd_id`, `data`, `miasto`, `operator`, `typ_uzytkownika`, `czas_min`, `dystans_km`, `ocena`, `kwota_pln` |
| Rozmiar | ~35 MB jako CSV, ~4× mniej jako Parquet |
| Biblioteki | `pandas`, `pyarrow`, `duckdb` (preinstalowane w Google Colab) |

---

## 📋 Zadania

Notebook zawiera **1 przykład z pełnym rozwiązaniem** i **8 ćwiczeń** (w tym 1 bonusowe):

| Nr | Temat | Koncepty |
|----|-------|----------|
| Przykład | CSV vs Parquet — rozmiar i czas odczytu | `to_parquet`, `read_parquet`, schemat |
| 1 | Typy danych a pamięć RAM | `memory_usage(deep=True)`, `category`, `int8` |
| 2 | Column pruning | `read_parquet(columns=...)` |
| 3 | Kodeki kompresji | `none`, `snappy`, `gzip`, `zstd` |
| 4 | Partycjonowanie Hive-style | `partition_cols`, `filters` |
| 5 | Plik większy niż RAM | `read_csv(chunksize=...)`, map → reduce |
| 6 | Równoległe przetwarzanie partycji | `ThreadPoolExecutor`, map → reduce |
| 7 | Problem małych plików | koszt otwierania wielu plików |
| 8 (bonus) | SQL na plikach Parquet | `duckdb`, `hive_partitioning` |

---

## 💡 Fragment kodu — przykład ze startera

```python
import pandas as pd

df.to_csv("hulajnogi.csv", index=False)
df.to_parquet("hulajnogi.parquet")  # domyślnie: kompresja snappy

# Partycjonowanie po mieście — każde miasto w osobnym katalogu
df.to_parquet("hulajnogi_partycje/", partition_cols=["miasto"])

# Czytamy tylko partycję Krakowa i tylko 2 kolumny
krakow = pd.read_parquet(
    "hulajnogi_partycje/",
    columns=["kwota_pln", "czas_min"],
    filters=[("miasto", "==", "Kraków")],
)
print(f"Przejazdów w Krakowie: {len(krakow):,}")
```

---

## 🎯 Czego się nauczysz

Po wykonaniu całego notebooka będziesz wiedzieć:

- Dlaczego w Big Data **Parquet zastępuje CSV** niemal wszędzie
- Jak **partycjonowanie** i **column pruning** zmniejszają liczbę czytanych bajtów
- Dlaczego **tysiące małych plików** potrafią zabić wydajność
- Jak wygląda wzorzec **map → reduce**, zanim zobaczysz go w Hadoopie i Sparku

---

## 🚀 Co dalej?

W kolejnym laboratorium przejdziemy do **ekosystemu Hadoop** — wzorzec *map → reduce*, który dziś napisałeś ręcznie na jednej maszynie, uruchomisz w stylu MapReduce znanym z klastrów!

---

<Admonition type="tip" title="Pro tip">
  W chmurze (BigQuery, Dataproc) płacisz za **przeczytane bajty**. Dobry format i przemyślane partycjonowanie to nie tylko szybsze zapytania — to także **niższy rachunek** 💸
</Admonition>
