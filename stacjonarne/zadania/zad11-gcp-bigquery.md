# Zadanie domowe 11: BigQuery — analiza kosztów i wydajności zapytań

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

1. Pobierz notebook z Laboratorium 11 (`cw-11-bigquery-przejazdy-taksowek.ipynb`) i wykorzystaj wygenerowany `taxi_df`.
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

**Termin:** Przed zajęciami nr 12 (12.01.2027) — pamiętaj o przerwie świątecznej! ❄️🎄

Semestr: Zimowy 2026/2027
