---
id: 05-spark-sql-siec-kawiarni
title: "Lab 5: Spark SQL — Sieć kawiarni"
sidebar_label: "Lab 5 — Spark SQL"
description: "Praktyczne ćwiczenia ze Spark SQL i DataFrame API na syntetycznych danych transakcyjnych sieci kawiarni."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 5: Spark SQL — Sieć kawiarni

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

W tym laboratorium przeanalizujesz **~100 000 transakcji** z sieci kawiarni ☕ działającej w 15 lokalach w różnych miastach Polski. Przećwiczysz Spark SQL i DataFrame API na realistycznym, choć syntetycznym zbiorze danych sprzedażowych.

Po wykonaniu ćwiczenia będziesz potrafić:

- Rejestrować **tymczasowe widoki** i pisać zapytania **`spark.sql()`**
- Wykonywać agregacje (`groupBy`, `agg`) i porównywać je z odpowiednikiem SQL
- Łączyć dane transakcyjne z tabelą wymiarową (`join`, `broadcast`)
- Analizować dane czasowe (godzina, miesiąc) i liczyć wzrosty miesiąc do miesiąca
- Wskazywać najlepiej sprzedające się produkty i metody płatności per sklep/miasto

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-05-spark-sql-siec-kawiarni.ipynb">📥 <strong>Pobierz: cw-05-spark-sql-siec-kawiarni.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Zbiór danych jest **generowany proceduralnie** wewnątrz notebooka (nie trzeba niczego pobierać) — dzięki temu ćwiczenie działa identycznie w Google Colab i lokalnie.

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne transakcje sieci kawiarni ☕ |
| Liczba rekordów | ~100 000 transakcji |
| Liczba sklepów | 15 (w kilku miastach Polski) |
| Format | `pandas.DataFrame` → `pyspark.sql.DataFrame` |
| Kolumny | `transakcja_id`, `data_czas`, `sklep`, `miasto`, `produkt`, `kategoria` (`kawa`/`herbata`/`przekąska`/`inne`), `cena`, `ilosc`, `metoda_platnosci` |
| Tabela dodatkowa | `sklepy` — wymiar z regionem i miastem dla każdego sklepu |
| Generowanie | Losowe kombinacje produktów, cen i godzin (`random.seed(42)`) |

> 💡 Dlaczego syntetyczne dane? Bo pozwala to każdemu studentowi pracować na **identycznym** zbiorze (dzięki ziarnu losowości), bez zależności od zewnętrznych plików czy internetu.

---

## 📋 Zadania

Notebook zawiera **guided example** (przychód per miasto — SQL i DataFrame API) oraz **8 ćwiczeń**:

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Przychód per miasto — SQL vs DataFrame API | `createOrReplaceTempView`, `spark.sql()`, `groupBy`/`agg` |
| 1 | Najlepiej sprzedający się produkt per sklep | `groupBy`, `agg`, `orderBy`, `Window`/`row_number` |
| 2 | Przychód per kategoria i godzina dnia | `withColumn`, `hour()`, `pivot` |
| 3 | Wzrost przychodu miesiąc do miesiąca | `month()`, `lag()`, `Window.orderBy` |
| 4 | Join z tabelą `sklepy` — przychód per region | `join`, `broadcast` |
| 5 | Najpopularniejsza metoda płatności per miasto | `groupBy`, `count`, ranking |
| 6 | Zapytanie SQL z `HAVING` | `spark.sql()`, `GROUP BY ... HAVING` |
| 7 | Filtrowanie zaawansowane — poranny ruch | `withColumn`, `when/otherwise`, `filter` |
| 🌟 | Bonus: optymalizacja broadcast join | `explain()`, `broadcast()` |

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki bez błędów
- [ ] Ukończyłem/am co najmniej 6 z 8 ćwiczeń
- [ ] Testy automatyczne przechodzą (✅) dla ukończonych ćwiczeń
