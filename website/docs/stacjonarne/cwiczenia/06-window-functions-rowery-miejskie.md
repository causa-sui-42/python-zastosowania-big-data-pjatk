---
id: 06-window-functions-rowery-miejskie
title: "Lab 6: Window Functions — Rowery miejskie"
sidebar_label: "Lab 6 — Window Functions"
description: "Praktyczne ćwiczenia z window functions (rank, lag, lead, running totals) na syntetycznym zbiorze przejazdów rowerów miejskich."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 6: Window Functions — Rowery miejskie

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

W tym laboratorium przećwiczysz **window functions** w PySpark na syntetycznym zbiorze ~200 000 przejazdów wypożyczalni rowerów miejskich 🚲. Nauczysz się liczyć rankingi stacji, sumy narastające, przerwy czasowe między przejazdami oraz czytać plan wykonania zapytania.

Po wykonaniu ćwiczenia będziesz potrafić:

- Definiować **window functions** przy pomocy `Window.partitionBy()` / `orderBy()`
- Liczyć **rankingi** (`rank`, `row_number`) i **sumy narastające** (`rowsBetween`)
- Używać `lag()` / `lead()` do analiz sekwencyjnych (poprzedni/następny przejazd)
- Czytać `.explain()` i rozpoznawać kosztowne operacje (`Exchange` / shuffle)
- Porównać `repartition()` i `coalesce()` pod kątem wydajności

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-06-window-functions-rowery-miejskie.ipynb">📥 <strong>Pobierz: cw-06-window-functions-rowery-miejskie.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Zbiór danych jest **generowany proceduralnie** wewnątrz notebooka (nie trzeba niczego pobierać) — dzięki temu ćwiczenie działa identycznie w Google Colab i lokalnie.

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne przejazdy wypożyczalni rowerów miejskich |
| Liczba rekordów | ~200 000 przejazdów |
| Miasta | Warszawa, Kraków, Poznań (po 8 stacji każde) |
| Kolumny | `trip_id`, `city`, `start_station`, `end_station`, `start_time`, `end_time`, `duration_min`, `user_type` (`abonament`/`jednorazowy`), `distance_km`, `trip_date` |
| Generowanie | Losowe czasy, dystanse i czasy trwania (`random.seed(42)`) |

> 💡 Dlaczego syntetyczne dane? Bo pozwala to każdemu studentowi pracować na **identycznym** zbiorze, bez zależności od zewnętrznych plików czy internetu.

---

## 📋 Zadania

Notebook zawiera **guided example** (ranking stacji wg wolumenu) oraz **7 ćwiczeń + bonus**:

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Ranking stacji wg liczby przejazdów per miasto | `Window.partitionBy`, `F.rank()` |
| 1 | Ranking miast wg łącznej liczby przejazdów | `Window.orderBy` (bez partycji) |
| 2 | Suma narastająca dziennych przejazdów per stacja | `rowsBetween`, `F.sum().over(...)` |
| 3 | Przerwa czasowa między kolejnymi przejazdami | `F.lag()` |
| 4 | Top-3 najbardziej ruchliwe stacje końcowe per miasto | `F.row_number()` |
| 5 | Średnia krocząca czasu trwania przejazdu | `rowsBetween(-2, 0)`, `F.avg()` |
| 6 | Czytanie planu zapytania | `.explain(True)`, `Exchange`, predicate pushdown |
| 7 | `repartition()` vs `coalesce()` — porównanie czasu | `time.time()`, `getNumPartitions()` |
| 🏆 Bonus | Wykrywanie anomalii "rebalancingu" rowerów | `F.lead()`, łączenie zdarzeń, progi czasowe |

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki bez błędów
- [ ] Ukończyłem/am co najmniej 5 z 7 ćwiczeń
- [ ] Testy automatyczne przechodzą (✅) dla ukończonych ćwiczeń

<Admonition type="tip" title="Pro tip">
  Zanim uzupełnisz `# TODO`, uruchom `.explain()` na własnym zapytaniu z poprzednich ćwiczeń — im wcześniej oswoisz się z planem wykonania, tym łatwiej będzie Ci debugować wydajność w przyszłych projektach.
</Admonition>

Semestr: Zimowy 2026/2027
