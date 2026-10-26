---
id: 05-spark-sql-siec-kawiarni
title: "Lab 5: Spark SQL (Sieć kawiarni) + Window Functions (Rowery miejskie)"
sidebar_label: "Lab 5 — Spark SQL + Window Functions"
description: "Praktyczne ćwiczenia ze Spark SQL i DataFrame API na syntetycznych danych transakcyjnych sieci kawiarni (Część A) oraz z window functions (rank, lag, lead, running totals) na syntetycznym zbiorze przejazdów rowerów miejskich (Część B)."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 5: Spark SQL (Sieć kawiarni) + Window Functions (Rowery miejskie)

**Czas trwania:** ~180 minut (2× ~90 minut) &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

To laboratorium łączy dwa powiązane tematy w jednym notebooku:

- **Część A — Spark SQL i DataFrames ☕:** przeanalizujesz **~100 000 transakcji** z sieci kawiarni działającej w 15 lokalach w różnych miastach Polski.
- **Część B — Window Functions 🚲:** przeanalizujesz **~200 000 przejazdów** wypożyczalni rowerów miejskich, licząc rankingi, sumy narastające i przerwy czasowe.

Po wykonaniu ćwiczenia będziesz potrafić:

**Część A:**
- Rejestrować **tymczasowe widoki** i pisać zapytania **`spark.sql()`**
- Wykonywać agregacje (`groupBy`, `agg`) i porównywać je z odpowiednikiem SQL
- Łączyć dane transakcyjne z tabelą wymiarową (`join`, `broadcast`)
- Analizować dane czasowe (godzina, miesiąc) i liczyć wzrosty miesiąc do miesiąca
- Wskazywać najlepiej sprzedające się produkty i metody płatności per sklep/miasto

**Część B:**
- Definiować **window functions** przy pomocy `Window.partitionBy()` / `orderBy()`
- Liczyć **rankingi** (`rank`, `row_number`) i **sumy narastające** (`rowsBetween`)
- Używać `lag()` / `lead()` do analiz sekwencyjnych (poprzedni/następny przejazd)
- Czytać `.explain()` i rozpoznawać kosztowne operacje (`Exchange` / shuffle)
- Porównać `repartition()` i `coalesce()` pod kątem wydajności

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-05-spark-sql-siec-kawiarni.ipynb">📥 <strong>Pobierz: cw-05-spark-sql-siec-kawiarni.ipynb</strong></DownloadLink>

---

## 📦 Zbiory danych

Obie części generują dane **proceduralnie** wewnątrz notebooka (nie trzeba niczego pobierać) — dzięki temu ćwiczenie działa identycznie w Google Colab i lokalnie. Część B generuje **własny, niezależny** zbiór danych — nie korzysta z danych Części A.

### Część A — transakcje sieci kawiarni

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne transakcje sieci kawiarni ☕ |
| Liczba rekordów | ~100 000 transakcji |
| Liczba sklepów | 15 (w kilku miastach Polski) |
| Format | `pandas.DataFrame` → `pyspark.sql.DataFrame` |
| Kolumny | `transakcja_id`, `data_czas`, `sklep`, `miasto`, `produkt`, `kategoria` (`kawa`/`herbata`/`przekąska`/`inne`), `cena`, `ilosc`, `metoda_platnosci` |
| Tabela dodatkowa | `sklepy` — wymiar z regionem i miastem dla każdego sklepu |
| Generowanie | Losowe kombinacje produktów, cen i godzin (`random.seed(42)`) |

### Część B — przejazdy rowerów miejskich

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne przejazdy wypożyczalni rowerów miejskich |
| Liczba rekordów | ~200 000 przejazdów |
| Miasta | Warszawa, Kraków, Poznań (po 8 stacji każde) |
| Kolumny | `trip_id`, `city`, `start_station`, `end_station`, `start_time`, `end_time`, `duration_min`, `user_type` (`abonament`/`jednorazowy`), `distance_km`, `trip_date` |
| Generowanie | Losowe czasy, dystanse i czasy trwania (`random.seed(42)`) |

> 💡 Dlaczego syntetyczne dane? Bo pozwala to każdemu studentowi pracować na **identycznym** zbiorze (dzięki ziarnu losowości), bez zależności od zewnętrznych plików czy internetu.

---

## 📋 Zadania

Notebook zawiera dwie części, każda z własnym **guided example** i zestawem ćwiczeń.

### Część A: Spark SQL i DataFrames — Sieć kawiarni (guided example + 7 ćwiczeń + bonus)

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Przychód per miasto — SQL vs DataFrame API | `createOrReplaceTempView`, `spark.sql()`, `groupBy`/`agg` |
| A1 | Najlepiej sprzedający się produkt per sklep | `groupBy`, `agg`, `orderBy`, `Window`/`row_number` |
| A2 | Przychód per kategoria i godzina dnia | `withColumn`, `hour()`, `pivot` |
| A3 | Wzrost przychodu miesiąc do miesiąca | `month()`, `lag()`, `Window.orderBy` |
| A4 | Join z tabelą `sklepy` — przychód per region | `join`, `broadcast` |
| A5 | Najpopularniejsza metoda płatności per miasto | `groupBy`, `count`, ranking |
| A6 | Zapytanie SQL z `HAVING` | `spark.sql()`, `GROUP BY ... HAVING` |
| A7 | Filtrowanie zaawansowane — poranny ruch | `withColumn`, `when/otherwise`, `filter` |
| A🌟 | Bonus: optymalizacja broadcast join | `explain()`, `broadcast()` |

### Część B: Window Functions — Rowery miejskie (guided example + 7 ćwiczeń + bonus)

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Ranking stacji wg liczby przejazdów per miasto | `Window.partitionBy`, `F.rank()` |
| B1 | Ranking miast wg łącznej liczby przejazdów | `Window.orderBy` (bez partycji) |
| B2 | Suma narastająca dziennych przejazdów per stacja | `rowsBetween`, `F.sum().over(...)` |
| B3 | Przerwa czasowa między kolejnymi przejazdami | `F.lag()` |
| B4 | Top-3 najbardziej ruchliwe stacje końcowe per miasto | `F.row_number()` |
| B5 | Średnia krocząca czasu trwania przejazdu | `rowsBetween(-2, 0)`, `F.avg()` |
| B6 | Czytanie planu zapytania | `.explain(True)`, `Exchange`, predicate pushdown |
| B7 | `repartition()` vs `coalesce()` — porównanie czasu | `time.time()`, `getNumPartitions()` |
| B🏆 | Bonus: wykrywanie anomalii "rebalancingu" rowerów | `F.lead()`, łączenie zdarzeń, progi czasowe |

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki obu części bez błędów
- [ ] Ukończyłem/am co najmniej 6 z 7 ćwiczeń Części A (Spark SQL)
- [ ] Ukończyłem/am co najmniej 5 z 7 ćwiczeń Części B (Window Functions)
- [ ] Testy automatyczne przechodzą (✅) dla ukończonych ćwiczeń

<Admonition type="tip" title="Pro tip">
  Zanim uzupełnisz `# TODO` w Części B, uruchom `.explain()` na własnym zapytaniu z Części A — im wcześniej oswoisz się z planem wykonania, tym łatwiej będzie Ci debugować wydajność w przyszłych projektach.
</Admonition>
