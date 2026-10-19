# Zadanie domowe 6: Window Functions — ranking i running totals na własnym zbiorze danych

**Poziom trudności:** ⭐⭐⭐ (Średni)

---

## 🎯 Cel zadania

Utrwalenie **window functions** w Spark SQL/PySpark poprzez zastosowanie ich na **samodzielnie wybranym** zbiorze danych — innym niż przejazdy rowerów miejskich z laboratorium.

---

## 📋 Zadanie

Wybierz dowolny zbiór danych zawierający kolumnę identyfikującą **grupę** (np. kategoria produktu, klient, drużyna, sklep, artysta) oraz kolumnę **czasową lub liczbową**, po której można sortować (np. data transakcji, wynik, liczba odsłon). Może to być np.:

- Historia transakcji sklepu internetowego (klient, data, kwota)
- Wyniki meczów drużyny sportowej w sezonie (drużyna, kolejka, liczba punktów)
- Historia odtworzeń utworów muzycznych (artysta, data, liczba odtworzeń)
- Dowolny inny zbiór z [Kaggle](https://www.kaggle.com/datasets) — **inny niż wykorzystany na zajęciach**

Wykonaj w Jupyter Notebook (Google Colab, PySpark) następujące analizy:

### Część 1: Ranking (min. 2 funkcje okienkowe)
- Zdefiniuj `Window.partitionBy(...).orderBy(...)` odpowiednie dla Twojego zbioru
- Nadaj ranking rekordów w ramach grupy, używając **zarówno** `F.rank()`, jak i `F.row_number()`
- Wypisz **top 3** rekordy w każdej grupie (użyj tej funkcji, która gwarantuje dokładnie 3 wiersze!)

### Część 2: Suma narastająca (running total)
- Policz **sumę narastającą** wybranej wartości liczbowej (np. przychód, punkty, liczba odtworzeń) w obrębie grupy, uporządkowaną chronologicznie
- Użyj `rowsBetween(Window.unboundedPreceding, Window.currentRow)`
- Zweryfikuj, że ostatnia wartość sumy narastającej w każdej grupie równa się sumie wszystkich wartości tej grupy

### Część 3: Analiza sekwencyjna (`lag`/`lead`)
- Dodaj kolumnę z wartością z **poprzedniego** rekordu w tej samej grupie (`F.lag()`)
- Oblicz **różnicę** (lub przerwę czasową) między bieżącym a poprzednim rekordem
- Krótko opisz (2-3 zdania w komórce Markdown): co ta różnica mówi o Twoich danych?

### Część 4: Plan zapytania
- Uruchom `.explain(True)` na jednym z powyższych zapytań z window function
- Zrzut ekranu lub wklejony tekst planu + odpowiedź na pytanie: czy widzisz w planie `Window` i `Exchange`? Co to oznacza?

---

## 📦 Wymagania techniczne

- Notebook w Google Colab lub lokalnym Jupyter z zainstalowanym `pyspark` (`!pip install -q pyspark`)
- Dane wczytane z pliku CSV/URL lub wygenerowane proceduralnie (`random.seed(42)` dla powtarzalności)
- Kod z window functions zawierający komentarze wyjaśniające wybór `partitionBy`/`orderBy`
- Krótkie podsumowanie wniosków (Markdown, 3-5 zdań) na końcu notebooka

---

## 💡 Wskazówki

- `Window.partitionBy("grupa").orderBy("kolumna_czasowa")` — Twoja podstawowa mantra
- Pamiętaj o różnicy: `rank()` vs `row_number()` przy remisach
- Jeśli Twoje dane nie mają naturalnej kolumny czasowej, możesz sortować po dowolnej kolumnie liczbowej (np. numer kolejki, identyfikator rosnący)
- Dokumentacja: [Window Functions API (PySpark)](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/window.html)

---

## 🔥 Zadanie bonusowe (opcjonalnie)

Policz **średnią kroczącą** (moving average) z ostatnich 3 rekordów w każdej grupie (`rowsBetween(-2, 0)`) i porównaj ją wizualnie (wykres) z wartościami surowymi — pokazuje to, jak window functions mogą wygładzać szum w danych.

---

## ❓ FAQ

**Q: Czy mogę użyć tego samego zbioru danych, co w poprzednich zadaniach domowych?**
A: Nie — celem jest przećwiczenie window functions na **nowych** danych, żeby sprawdzić, czy rozumiesz koncepcję, a nie tylko kopiujesz kod.

**Q: Czy muszę mieć duży zbiór danych (jak na zajęciach — 200 000 wierszy)?**
A: Nie, kilkaset-kilka tysięcy rekordów w zupełności wystarczy, żeby poprawnie zademonstrować window functions.

**Q: Co jeśli moje dane nie mają wyraźnych "grup"?**
A: Możesz potraktować cały zbiór jako jedną grupę (`Window.orderBy(...)` bez `partitionBy`) — tak jak w Ćwiczeniu 1 z laboratorium.

---

Powodzenia! 🚲📊
