# Zadanie domowe 2: Benchmark formatów danych i mini Data Lake

**Poziom trudności:** ⭐⭐ (Podstawowy-Średni)

---

## 🎯 Cel zadania

Samodzielne porównanie formatów zapisu danych i zaprojektowanie prostego, partycjonowanego **mini Data Lake** na wybranym zbiorze danych — tak, żeby typowe zapytania czytały jak najmniej bajtów.

---

## 📋 Zadanie

Wybierz **własny zbiór danych** inny niż przejazdy hulajnogami z laboratorium — publiczny (np. Kaggle, dane.gov.pl, NYC Taxi) lub wygenerowany syntetycznie w NumPy. Zbiór musi mieć **co najmniej 1 000 000 wierszy** i **co najmniej 6 kolumn**, w tym przynajmniej jedną kolumnę z datą lub kategorią nadającą się do partycjonowania.

Wykonaj pełną analizę w Jupyter Notebook:

### Część 1: Benchmark formatów
- Zapisz dane jako **CSV**, **JSON Lines** i **Parquet** (co najmniej 2 różne kodeki kompresji)
- Dla każdego wariantu zmierz **rozmiar pliku** i **czas zapisu/odczytu**
- Przedstaw wyniki w tabeli (DataFrame) i na **wykresie słupkowym**

### Część 2: Optymalizacja pamięci
- Zmierz zużycie RAM (`memory_usage(deep=True)`) przed i po optymalizacji typów danych (`category`, mniejsze typy liczbowe, `datetime64`)
- Porównaj czas odczytu **wszystkich kolumn** z odczytem **tylko 2–3 kolumn** (column pruning)

### Część 3: Mini Data Lake
- Zaproponuj **typowe zapytanie biznesowe** do swoich danych (np. „przychód per miesiąc w danym regionie”)
- Zapisz dane z **partycjonowaniem** dobranym pod to zapytanie (`partition_cols=`) i uzasadnij wybór kolumny
- Wykonaj zapytanie z użyciem `filters=` i porównaj czas z odczytem całego, niepartycjonowanego pliku
- Policz, ile plików powstało i jaki jest ich średni rozmiar — czy grozi Ci **problem małych plików**?

### Część 4: Wnioski
- Napisz krótkie podsumowanie (5–7 zdań): jaki format, kompresję i partycjonowanie wybrałbyś dla tych danych w produkcji i dlaczego?

---

## 📦 Wymagania techniczne

- Notebook musi być wykonany w **Google Colab** lub Jupyter Notebook
- Używaj bibliotek: `pandas`, `pyarrow`, `numpy`, `matplotlib` (lub `seaborn`)
- Do pomiaru czasu używaj `time.perf_counter()` (lub `%timeit`)
- Kod musi być czytelny, z komentarzami wyjaśniającymi kluczowe kroki
- Każdy wykres musi mieć tytuł i etykiety osi

---

## 💡 Wskazówki

- Do rozmiaru katalogu z partycjami: `sum(p.stat().st_size for p in Path(katalog).rglob("*.parquet"))`
- Pierwszy odczyt pliku bywa wolniejszy (cache systemu plików) — zmierz czas kilka razy i weź medianę
- Nie partycjonuj po kolumnie z tysiącami unikalnych wartości (np. `user_id`) — to prosta droga do problemu małych plików
- Jeśli generujesz dane syntetycznie, użyj `np.random.default_rng(seed)` z ustalonym ziarnem

---

## 🔥 Zadanie bonusowe

Wykonaj to samo zapytanie biznesowe w **DuckDB** bezpośrednio na partycjonowanych plikach Parquet (`read_parquet('katalog/**/*.parquet', hive_partitioning = true)`) i porównaj czas z wersją w pandas.

---

## ❓ FAQ

**Q: Mój zbiór danych nie mieści się w RAM Colaba. Co robić?**  
A: Świetnie — to prawdziwe Big Data! Czytaj CSV w kawałkach (`chunksize=`) i dopisuj kolejne kawałki do Parquet albo zmniejsz próbkę do kilku milionów wierszy.

**Q: Czy muszę używać danych rzeczywistych?**  
A: Nie — dane wygenerowane syntetycznie są w pełni akceptowalne, o ile scenariusz jest realistyczny.

**Q: Wyniki czasowe różnią się przy każdym uruchomieniu. Czy to błąd?**  
A: Nie, to normalne. Powtórz pomiar kilka razy i raportuj medianę — liczą się proporcje, a nie dokładne milisekundy.

---

Powodzenia! 🚀
