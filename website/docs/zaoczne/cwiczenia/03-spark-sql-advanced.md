---
id: 03-spark-sql-advanced
title: "Lab 3: Spark SQL i zaawansowane transformacje"
sidebar_label: "Lab 3 — Spark SQL Advanced"
description: "Praktyczne ćwiczenia z Spark SQL, joinów, window functions i UDF na danych platformy streamingowej."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 3: Spark SQL i zaawansowane transformacje

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Cel ćwiczenia

W tym laboratorium przećwiczysz zaawansowane operacje **Spark SQL** na danych z platformy streamingowej **StreamPL** 🎬. Nauczysz się joinów, window functions, pivotów i tworzenia własnych UDF.

Po wykonaniu ćwiczenia będziesz potrafić:

- Pisać zaawansowane zapytania **Spark SQL** na widokach tymczasowych
- Wykonywać **joiny** różnych typów i rozumieć ich działanie
- Stosować **Window Functions** (rank, lead, lag, running totals)
- Tworzyć **tabele przestawne** (pivot)
- Definiować i rejestrować **UDF**

---

## � Pobierz notebook

<DownloadLink href="/zaoczne/notebooks/cw-03-spark-sql-advanced-transformations.ipynb">📥 <strong>Pobierz: cw-03-spark-sql-advanced-transformations.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

| Atrybut | Wartość |
|---------|---------|
| Źródło | StreamPL — polska platforma streamingowa 🎬 |
| Liczba rekordów | ~200 000 sesji oglądania |
| Okres | 12 miesięcy |
| Kolumny | `user_id`, `movie_title`, `genre`, `watch_date`, `watch_duration_min`, `rating`, `device`, `subscription_type`, `country` |

---

## 📋 Zadania

| Nr | Temat | Techniki |
|----|-------|----------|
| 1 | Eksploracja danych | `groupBy`, `count`, `orderBy` |
| 2 | Filtrowanie zaawansowane | `withColumn`, `when/otherwise`, `filter` |
| 3 | Agregacje i pivot | `avg`, `pivot`, tabele przestawne |
| 4 | Joiny | `join`, inner/left/anti join |
| 5 | Window Functions | `row_number`, `rank`, `Window.partitionBy` |
| 6 | Spark SQL | `createOrReplaceTempView`, `spark.sql()` |
| 7 | UDF | `F.udf()`, `StringType`, rejestracja funkcji |
| 🌟 | Bonus: Dashboard | SQL views + window functions + matplotlib |

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki bez błędów
- [ ] Ukończyłem/am co najmniej 5 z 7 ćwiczeń
- [ ] Testy automatyczne przechodzą (✅) dla ukończonych ćwiczeń
