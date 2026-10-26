# Zadanie domowe 9: BigQuery — analiza kosztów i wydajności zapytań

**Poziom trudności:** ⭐⭐⭐ (Średnio-zaawansowany)

---

## 🎯 Cel zadania

Utrwalenie umiejętności pisania zapytań SQL świadomych kosztów w BigQuery — oraz zrozumienia wpływu partycjonowania i clusteringu na wydajność i cenę zapytań.

---

## 📋 Zadanie

Wybierz **jedną** z poniższych ścieżek (w zależności od tego, czy masz dostęp do darmowego projektu GCP):

### Ścieżka A — Prawdziwy BigQuery (jeśli masz konto GCP)

1. Otwórz konsolę [BigQuery](https://console.cloud.google.com/bigquery) i znajdź publiczny dataset `bigquery-public-data.chicago_taxi_trips.taxi_trips` (lub inny publiczny dataset BigQuery wg własnego wyboru, np. `bigquery-public-data.new_york_taxi_trips`).
2. Napisz **trzy** zapytania SQL o rosnącej złożoności:
   - Proste `SELECT COUNT(*)` z warunkiem `WHERE` na dacie
   - Zapytanie z `GROUP BY` (np. średnia stawka per godzina lub dzielnica)
   - Zapytanie z `JOIN` lub podzapytaniem (np. porównanie dwóch okresów czasu)
3. Dla każdego zapytania uruchom **dry run** (przycisk "Query validator" w konsoli pokazuje "This query will process X GB" przed uruchomieniem) i zanotuj liczbę przeskanowanych GB.
4. Oblicz szacowany koszt każdego zapytania w modelu on-demand ($7.50 / TB).

### Ścieżka B — Offline (bez konta GCP)

1. Pobierz notebook z Laboratorium 9 (`cw-09-bigquery-przejazdy-taksowek.ipynb`) i wykorzystaj wygenerowany `taxi_df`.
2. Napisz **trzy** analizy pandas o rosnącej złożoności (analogiczne do zapytań SQL powyżej):
   - Proste liczenie wierszy z warunkiem (np. przejazdy w danym miesiącu)
   - Agregacja `groupby` (np. średnia stawka per godzina lub dzielnica)
   - Analiza łącząca dwie grupy (np. porównanie średniej stawki weekday vs weekend, tak jak w Ćwiczeniu 4)
3. Dla każdej analizy — **w komórce Markdown** — napisz, jak wyglądałoby **równoważne zapytanie SQL** w BigQuery i oszacuj (na podstawie tabeli kosztów z Ćwiczenia 6), ile GB by ono zeskanowało oraz ile by kosztowało, gdyby tabela miała 200 mln wierszy.

---

## 📦 Wymagania techniczne

- Notebook w Google Colab lub lokalnym Jupyter
- Dla Ścieżki A: zrzuty ekranu (screenshot) z konsoli BigQuery pokazujące wynik dry run ("This query will process X GB") dla każdego z 3 zapytań
- Dla Ścieżki B: kod pandas + towarzyszące komórki Markdown z szacunkiem kosztów SQL
- Krótkie podsumowanie (Markdown, 3-5 zdań): które z Twoich trzech zapytań/analiz byłoby najdroższe w prawdziwym BigQuery i dlaczego?

---

## 💡 Wskazówki

- W BigQuery koszt zależy od **przeskanowanych bajtów**, nie zwróconych wierszy — `LIMIT 10` nie obniża kosztu!
- Zapytania z `SELECT *` są zwykle najdroższe — zawsze wybieraj tylko potrzebne kolumny
- Partycjonowanie po dacie (`PARTITION BY DATE(...)`) i filtrowanie po tej kolumnie w `WHERE` znacząco obniża liczbę skanowanych bajtów
- Dokumentacja: [BigQuery pricing](https://cloud.google.com/bigquery/pricing), [Query plan explanation](https://cloud.google.com/bigquery/query-plan-explanation)
- Nie masz konta GCP? Skorzystaj z [Google Cloud Skills Boost](https://www.cloudskillsboost.google/) — tymczasowy projekt z aktywnym billingiem, bez Twojej karty kredytowej

---

## 💡 Rozwiązanie krok po kroku (przykład)

<details>
<summary><strong>📖 Kliknij, aby zobaczyć pełne przykładowe rozwiązanie (na przykładowym zbiorze danych)</strong></summary>

Poniższy przykład pokazuje pełne rozwiązanie **Ścieżki B (offline)** — trzy analizy pandas o rosnącej złożoności na syntetycznym zbiorze przypominającym przejazdy taksówek, wraz z oszacowaniem równoważnego kosztu zapytań SQL w BigQuery. Jeśli masz dostęp do GCP, analogicznie przeprowadź Ścieżkę A na `bigquery-public-data.chicago_taxi_trips.taxi_trips`, zapisując dry run każdego zapytania.

### Krok 0: Przykładowy zbiór danych (symulujący `taxi_df` z Laboratorium 9)

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
n = 500_000  # symulujemy fragment dużej tabeli

daty = pd.date_range("2023-01-01", "2023-12-31", freq="h")
dzielnice = ["Loop", "Lincoln Park", "Near North Side", "Hyde Park", "Logan Square"]

taxi_df = pd.DataFrame({
    "data_przejazdu": rng.choice(daty, n),
    "dzielnica": rng.choice(dzielnice, n),
    "stawka": rng.gamma(2.0, 8.0, n).round(2),
    "dystans_mil": rng.gamma(1.5, 2.0, n).round(2),
})
taxi_df["dzien_tygodnia"] = taxi_df["data_przejazdu"].dt.dayofweek
taxi_df["czy_weekend"] = taxi_df["dzien_tygodnia"].isin([5, 6])
```

### Krok 1: Proste liczenie wierszy z warunkiem

```python
przejazdy_marzec = taxi_df[taxi_df["data_przejazdu"].dt.month == 3]
print(f"Liczba przejazdów w marcu: {len(przejazdy_marzec)}")
```
**Równoważne zapytanie SQL (Markdown):**
```sql
SELECT COUNT(*)
FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`
WHERE EXTRACT(MONTH FROM trip_start_timestamp) = 3
  AND EXTRACT(YEAR FROM trip_start_timestamp) = 2023
```
**Szacunek kosztu:** Przy tabeli 200 mln wierszy i kolumnie `trip_start_timestamp` partycjonowanej po dacie, BigQuery skanuje tylko partycje z marca (~1/12 danych) — przy przybliżonym rozmiarze wiersza ~100 bajtów to ok. 200 mln × 100 B / 12 ≈ **1.7 GB**, czyli koszt rzędu 1.7 GB / 1024 × $7.50/TB ≈ **$0.012** (poniżej 1,5 centa). Bez partycjonowania trzeba by zeskanować całą tabelę (~20 GB), czyli koszt ok. **$0.15** — kilkunastokrotnie więcej.

### Krok 2: Agregacja groupby

```python
srednia_stawka_per_dzielnica = (
    taxi_df.groupby("dzielnica")["stawka"].mean().round(2).sort_values(ascending=False)
)
print(srednia_stawka_per_dzielnica)
```
**Równoważne zapytanie SQL:**
```sql
SELECT pickup_community_area, AVG(fare) AS srednia_stawka
FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`
GROUP BY pickup_community_area
ORDER BY srednia_stawka DESC
```
**Szacunek kosztu:** To zapytanie musi odczytać kolumny `pickup_community_area` i `fare` z całej tabeli (GROUP BY nie korzysta z partycjonowania po dacie, bo nie filtrujemy po dacie) — przy 200 mln wierszy i ~16 bajtach na te dwie kolumny łącznie, to ok. 200 mln × 16 B ≈ **3.2 GB**, koszt ok. **$0.023**.

### Krok 3: Analiza łącząca dwie grupy (weekday vs weekend)

```python
porownanie_weekday_weekend = (
    taxi_df.groupby("czy_weekend").agg(
        srednia_stawka=("stawka", "mean"),
        sredni_dystans=("dystans_mil", "mean"),
        liczba_przejazdow=("stawka", "count"),
    ).round(2)
)
print(porownanie_weekday_weekend)
```
**Równoważne zapytanie SQL:**
```sql
SELECT
  EXTRACT(DAYOFWEEK FROM trip_start_timestamp) IN (1, 7) AS czy_weekend,
  AVG(fare) AS srednia_stawka,
  AVG(trip_miles) AS sredni_dystans,
  COUNT(*) AS liczba_przejazdow
FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`
GROUP BY czy_weekend
```
**Szacunek kosztu:** To najdroższe z trzech zapytań — wymaga odczytu `trip_start_timestamp`, `fare` i `trip_miles` z całej, niepartycjonowanej (pod kątem tego zapytania) tabeli, czyli ok. 200 mln × 24 B ≈ **4.8 GB**, koszt ok. **$0.035**.

**Podsumowanie (Markdown, przykład):** Najdroższa okazuje się analiza porównująca weekday vs weekend (Krok 3), ponieważ odczytuje trzy kolumny z całej tabeli bez korzystania z partycjonowania po dacie. Najtańsze jest proste liczenie z filtrem po miesiącu (Krok 1), bo filtr trafia bezpośrednio w kolumnę partycjonującą, pozwalając BigQuery pominąć 11/12 danych. Wniosek ogólny: **zawsze filtruj po kolumnie partycjonującej, gdy to możliwe** — to najtańszy sposób na ograniczenie skanowanych bajtów w BigQuery.

</details>

---

**Termin:** Przed zajęciami nr 10 (08.12.2026)

Semestr: Zimowy 2026/2027
