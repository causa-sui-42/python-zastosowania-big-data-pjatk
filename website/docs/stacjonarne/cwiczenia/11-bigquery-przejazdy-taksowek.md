---
id: 11-bigquery-przejazdy-taksowek
title: "Lab 11: BigQuery i Dataproc — Przejazdy taksówek"
sidebar_label: "Lab 11 — BigQuery/GCP"
description: "Analiza przejazdów taksówek w Chicago przy pomocy BigQuery (publiczny dataset) z offline'owym fallbackiem — koszty zapytań, partycjonowanie i równoważny kod PySpark na Dataproc."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 11: BigQuery i Dataproc — Przejazdy taksówek

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

Pracujesz jako analityk danych dla miasta **Chicago** 🚕. Miasto publikuje w BigQuery ogromny publiczny dataset przejazdów taksówek — Twoim zadaniem jest znaleźć wzorce w danych (godziny szczytu, napiwki, dystanse) i oszacować, ile kosztowałaby taka analiza w chmurze.

Po wykonaniu ćwiczenia będziesz potrafić:

- Odpytać publiczny dataset BigQuery `bigquery-public-data.chicago_taxi_trips.taxi_trips` (lub jego offline'owy odpowiednik)
- Przeanalizować wzorce w danych — najbardziej ruchliwe dzielnice, napiwki, korelacje, wzorce weekday/weekend
- Oszacować **koszt** zapytania BigQuery na podstawie liczby przeskanowanych bajtów
- Przełożyć logikę SQL/pandas na PySpark, tak jakby uruchamiać ją na klastrze Dataproc

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-11-bigquery-przejazdy-taksowek.ipynb">📥 <strong>Pobierz: cw-11-bigquery-przejazdy-taksowek.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Chicago Taxi Trips (publiczny dataset BigQuery) + offline fallback |
| Prawdziwe źródło | `bigquery-public-data.chicago_taxi_trips.taxi_trips` (~200 mln wierszy) |
| Offline fallback | ~50 000 syntetycznych przejazdów, wygenerowanych w notebooku (`numpy`, `random.seed(42)`) |
| Kolumny | `trip_id`, `pickup_datetime`, `pickup_community_area`, `trip_miles`, `trip_seconds`, `fare`, `tips`, `payment_type`, `company` |

> 💡 **Dwie ścieżki, jeden notebook.** Jeśli masz darmowy projekt GCP (1 TB zapytań BigQuery/msc za darmo), możesz uruchomić prawdziwe zapytania SQL pokazane jako materiał referencyjny w komórkach Markdown. Jeśli nie masz konta GCP — wszystkie ćwiczenia wykonasz na w pełni funkcjonalnym, syntetycznym DataFrame, który naśladuje strukturę i statystyki prawdziwego datasetu. Notebook działa **identycznie dobrze** w obu przypadkach.

---

## 📋 Zadania

Notebook zawiera **guided example** (średnia stawka wg godziny dnia — SQL + pandas) oraz **6 ćwiczeń + bonus**:

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Średnia stawka wg godziny dnia | SQL (referencyjnie) + `groupby`, `agg` |
| 1 | Najbardziej ruchliwe dzielnice odbioru | `groupby`, `sort_values`, `head` |
| 2 | Średni procent napiwku wg formy płatności | kolumna pomocnicza, `groupby().mean()` |
| 3 | Korelacja dystansu i stawki | `.corr()` |
| 4 | Dzień powszedni vs weekend | `dt.dayofweek`, `groupby` |
| 5 | Rozkład form płatności | `value_counts(normalize=True)` |
| 6 | Szacowanie kosztu zapytania BigQuery | bajty/wiersz × liczba wierszy, cena za TB |
| 🏆 Bonus | Równoważny kod PySpark (Dataproc) | `spark-bigquery-connector`, `groupBy`, `orderBy` |

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki bez błędów
- [ ] Ukończyłem/am co najmniej 5 z 6 ćwiczeń
- [ ] Testy automatyczne przechodzą (✅) dla ukończonych ćwiczeń

<Admonition type="tip" title="Pro tip">
  Zanim zaczniesz Ćwiczenie 6 (koszt zapytania), wróć do wykładu i przypomnij sobie, dlaczego BigQuery liczy koszt na podstawie **przeskanowanych bajtów**, a nie zwróconych wierszy!
</Admonition>

Semestr: Zimowy 2026/2027
