# Zadanie domowe 5: Spark SQL — zapytania i window functions na własnym zbiorze danych

**Poziom trudności:** ⭐⭐⭐ (Podstawowy-Średni / Średni)

**Termin:** Przed Zajęciami nr 6 (10.11.2026)

---

## 🎯 Cel zadania

Utrwalenie Spark SQL, DataFrame API oraz **window functions** poprzez samodzielne napisanie zapytań na **własnym, wybranym przez Ciebie** zbiorze danych — innym niż dane sieci kawiarni oraz przejazdy rowerów miejskich z laboratorium.

Zadanie składa się z **dwóch części**: w Części 1 napiszesz podstawowe zapytania Spark SQL, a w Części 2 zastosujesz funkcje okienkowe (ranking, suma narastająca, `lag`/`lead`) na tym samym lub innym własnym zbiorze danych.

---

## Część 1: Zapytania Spark SQL

Wybierz dowolny mały-średni zbiór danych (**minimum 200 wierszy, minimum 4 kolumny**, w tym przynajmniej jedna kolumna tekstowa/kategoryczna i jedna liczbowa) — np. z [Kaggle](https://www.kaggle.com/datasets), [UCI ML Repository](https://archive.ics.uci.edu/) albo dane wygenerowane samodzielnie (np. wyniki sportowe, biblioteka, ceny mieszkań, playlisty muzyczne).

Wczytaj dane do Spark DataFrame (Google Colab z `!pip install -q pyspark` lub lokalny Jupyter Notebook) i wykonaj poniższe zadania.

### 1.1 Wczytanie i eksploracja

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("ZadanieDomowe5").getOrCreate()

df = spark.createDataFrame(dane, schema=["kolumna1", "kolumna2", "..."])
df.printSchema()
df.show(10)
```

- Wczytaj dane i wyświetl schemat (`printSchema()`) oraz pierwsze 10 wierszy
- Zarejestruj DataFrame jako tymczasowy widok (`createOrReplaceTempView`)

### 1.2 Zapytania (wybierz 4 z 6)

1. 🔍 **TOP N** — Napisz zapytanie `spark.sql()`, które zwraca 5 rekordów z najwyższą wartością wybranej kolumny liczbowej
   *(Użyj `ORDER BY ... DESC LIMIT 5`)*

2. 📊 **Agregacja per grupa** — Oblicz sumę/średnią wybranej kolumny liczbowej w podziale na kolumnę kategoryczną
   *(Użyj `.groupBy()` i `.agg()` lub `GROUP BY` w SQL)*

3. 🔎 **Filtrowanie z warunkiem złożonym** — Znajdź rekordy spełniające co najmniej 2 warunki jednocześnie
   *(Użyj `.filter()` z `&`/`|` lub `WHERE ... AND/OR` w SQL)*

4. 🏷️ **Kolumna warunkowa** — Stwórz nową kolumnę kategoryzującą rekordy na min. 3 kategorie na podstawie wartości liczbowej
   *(Użyj `.withColumn()` i `F.when()/.otherwise()`)*

5. 🔗 **Porównanie DataFrame API vs SQL** — Wybierz jedno z powyższych zapytań i napisz je **dwoma sposobami**: DataFrame API oraz `spark.sql()`, pokazując że dają identyczny wynik
   *(Użyj `.subtract()` lub porównania `.collect()`, żeby to udowodnić)*

6. 📈 **Ranking wewnątrz grupy** — Dodaj kolumnę z rankingiem rekordu w obrębie jego grupy kategorycznej
   *(Użyj `Window.partitionBy()` i `F.row_number()`/`F.rank()`)*

### 💡 Wskazówki do Części 1

- `F.col("nazwa_kolumny")` — odwołanie do kolumny
- `df.show(n, truncate=False)` — pełne wyświetlenie wyników bez ucinania tekstu
- `df.printSchema()` — sprawdź strukturę i typy danych
- Jeśli dane mają braki, obsłuż je przed analizą (`.na.drop()` lub `.na.fill()`)
- Dokumentacja: [spark.apache.org/docs/latest/api/python/](https://spark.apache.org/docs/latest/api/python/)

### 🔥 Zadanie bonusowe do Części 1 (opcjonalnie)

Wykonaj **join** swojego zbioru danych z drugą, małą tabelą, którą sam(a) stworzysz (np. tabela ze słownikiem kategorii lub regionów) i wymuś `broadcast()` na mniejszej tabeli. Porównaj plan wykonania (`explain()`) z i bez `broadcast()`.

---

## Część 2: Window Functions — ranking i running totals

Wybierz dowolny zbiór danych zawierający kolumnę identyfikującą **grupę** (np. kategoria produktu, klient, drużyna, sklep, artysta) oraz kolumnę **czasową lub liczbową**, po której można sortować (np. data transakcji, wynik, liczba odsłon). Może to być np.:

- Historia transakcji sklepu internetowego (klient, data, kwota)
- Wyniki meczów drużyny sportowej w sezonie (drużyna, kolejka, liczba punktów)
- Historia odtworzeń utworów muzycznych (artysta, data, liczba odtworzeń)
- Dowolny inny zbiór z [Kaggle](https://www.kaggle.com/datasets) — **inny niż wykorzystany na zajęciach**

Możesz wykorzystać ten sam zbiór danych co w Części 1, jeśli zawiera kolumnę grupującą i kolumnę do sortowania, albo wybrać inny.

Wykonaj w Jupyter Notebook (Google Colab, PySpark) następujące analizy:

### 2.1 Ranking (min. 2 funkcje okienkowe)
- Zdefiniuj `Window.partitionBy(...).orderBy(...)` odpowiednie dla Twojego zbioru
- Nadaj ranking rekordów w ramach grupy, używając **zarówno** `F.rank()`, jak i `F.row_number()`
- Wypisz **top 3** rekordy w każdej grupie (użyj tej funkcji, która gwarantuje dokładnie 3 wiersze!)

### 2.2 Suma narastająca (running total)
- Policz **sumę narastającą** wybranej wartości liczbowej (np. przychód, punkty, liczba odtworzeń) w obrębie grupy, uporządkowaną chronologicznie
- Użyj `rowsBetween(Window.unboundedPreceding, Window.currentRow)`
- Zweryfikuj, że ostatnia wartość sumy narastającej w każdej grupie równa się sumie wszystkich wartości tej grupy

### 2.3 Analiza sekwencyjna (`lag`/`lead`)
- Dodaj kolumnę z wartością z **poprzedniego** rekordu w tej samej grupie (`F.lag()`)
- Oblicz **różnicę** (lub przerwę czasową) między bieżącym a poprzednim rekordem
- Krótko opisz (2-3 zdania w komórce Markdown): co ta różnica mówi o Twoich danych?

### 2.4 Plan zapytania
- Uruchom `.explain(True)` na jednym z powyższych zapytań z window function
- Zrzut ekranu lub wklejony tekst planu + odpowiedź na pytanie: czy widzisz w planie `Window` i `Exchange`? Co to oznacza?

### 📦 Wymagania techniczne do Części 2

- Notebook w Google Colab lub lokalnym Jupyter z zainstalowanym `pyspark` (`!pip install -q pyspark`)
- Dane wczytane z pliku CSV/URL lub wygenerowane proceduralnie (`random.seed(42)` dla powtarzalności)
- Kod z window functions zawierający komentarze wyjaśniające wybór `partitionBy`/`orderBy`
- Krótkie podsumowanie wniosków (Markdown, 3-5 zdań) na końcu notebooka

### 💡 Wskazówki do Części 2

- `Window.partitionBy("grupa").orderBy("kolumna_czasowa")` — Twoja podstawowa mantra
- Pamiętaj o różnicy: `rank()` vs `row_number()` przy remisach
- Jeśli Twoje dane nie mają naturalnej kolumny czasowej, możesz sortować po dowolnej kolumnie liczbowej (np. numer kolejki, identyfikator rosnący)
- Dokumentacja: [Window Functions API (PySpark)](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/window.html)

### 🔥 Zadanie bonusowe do Części 2 (opcjonalnie)

Policz **średnią kroczącą** (moving average) z ostatnich 3 rekordów w każdej grupie (`rowsBetween(-2, 0)`) i porównaj ją wizualnie (wykres) z wartościami surowymi — pokazuje to, jak window functions mogą wygładzać szum w danych.

---

## ✅ Checklist ukończenia zadania

- [ ] Część 1: wczytane dane + schemat + 10 wierszy, widok tymczasowy zarejestrowany
- [ ] Część 1: 4 z 6 zapytań wykonane (w tym porównanie DataFrame API vs SQL, jeśli wybrane)
- [ ] Część 2: ranking (`rank()` i `row_number()`) + top 3 rekordy w grupie
- [ ] Część 2: suma narastająca zweryfikowana względem sumy grupy
- [ ] Część 2: `lag`/`lead` + komentarz interpretacyjny
- [ ] Część 2: `.explain(True)` + odpowiedź na pytanie o `Window`/`Exchange`
- [ ] Krótkie podsumowanie wniosków na końcu notebooka

---

## 💡 Rozwiązanie krok po kroku (przykład)

<details>
<summary><strong>📖 Kliknij, aby zobaczyć pełne przykładowe rozwiązanie (na przykładowym zbiorze danych)</strong></summary>

Poniższy przykład pokazuje pełne rozwiązanie **obu części** zadania na przykładowym, syntetycznym zbiorze danych `odtworzenia_muzyki` (historia odtworzeń utworów muzycznych — artysta, utwór, data, liczba odtworzeń, gatunek). Twoje zadanie dotyczy **innego, samodzielnie wybranego** zbioru — potraktuj poniższy kod jako wzorzec do adaptacji, nie do kopiowania 1:1.

### Krok 0: Generowanie przykładowego zbioru danych

```python
!pip install -q pyspark
from pyspark.sql import SparkSession
import pyspark.sql.functions as F
from pyspark.sql.window import Window
import random
from datetime import date, timedelta

spark = SparkSession.builder.appName("ZadanieDomowe5").getOrCreate()
random.seed(42)

artysci = ["Artysta A", "Artysta B", "Artysta C", "Artysta D", "Artysta E"]
gatunki = {"Artysta A": "Pop", "Artysta B": "Rock", "Artysta C": "Pop",
           "Artysta D": "Hip-Hop", "Artysta E": "Rock"}

dane = []
poczatek = date(2024, 1, 1)
for artysta in artysci:
    for dzien in range(60):  # 60 dni historii per artysta -> min. 200 wierszy łącznie
        data_odtworzenia = poczatek + timedelta(days=dzien)
        odtworzenia = max(0, int(random.gauss(5000, 1500)))
        dane.append((artysta, gatunki[artysta], data_odtworzenia.isoformat(), odtworzenia))

df = spark.createDataFrame(dane, schema=["artysta", "gatunek", "data", "odtworzenia"])
df = df.withColumn("data", F.to_date("data"))
df.printSchema()
df.show(10)
df.createOrReplaceTempView("odtworzenia")
```

## Rozwiązanie Części 1: Zapytania Spark SQL

### Krok 1.1: TOP N

```python
top5 = spark.sql("""
    SELECT artysta, data, odtworzenia
    FROM odtworzenia
    ORDER BY odtworzenia DESC
    LIMIT 5
""")
top5.show()
```

### Krok 1.2: Agregacja per grupa

```python
suma_per_artysta = spark.sql("""
    SELECT artysta, gatunek, SUM(odtworzenia) AS suma_odtworzen, ROUND(AVG(odtworzenia), 1) AS srednia_odtworzen
    FROM odtworzenia
    GROUP BY artysta, gatunek
    ORDER BY suma_odtworzen DESC
""")
suma_per_artysta.show()
```

### Krok 1.3: Filtrowanie z warunkiem złożonym

```python
df.filter((F.col("gatunek") == "Pop") & (F.col("odtworzenia") > 6000)).show(10)
```

### Krok 1.4: Kolumna warunkowa

```python
df_kategoria = df.withColumn(
    "kategoria_popularnosci",
    F.when(F.col("odtworzenia") < 3500, "niska")
     .when(F.col("odtworzenia") < 6500, "srednia")
     .otherwise("wysoka")
)
df_kategoria.groupBy("kategoria_popularnosci").count().show()
```

### Krok 1.5: Porównanie DataFrame API vs SQL (to samo zapytanie, dwa sposoby)

```python
wynik_sql = spark.sql("""
    SELECT artysta, SUM(odtworzenia) AS suma_odtworzen
    FROM odtworzenia GROUP BY artysta
""")

wynik_api = df.groupBy("artysta").agg(F.sum("odtworzenia").alias("suma_odtworzen"))

# subtract() zwraca wiersze obecne w jednym zbiorze, a nieobecne w drugim - pusty wynik = identyczność
roznica = wynik_sql.subtract(wynik_api)
print(f"Liczba różniących się wierszy: {roznica.count()}")  # oczekiwane: 0
```

### Krok 1.6: Ranking wewnątrz grupy

```python
okno_ranking = Window.partitionBy("artysta").orderBy(F.col("odtworzenia").desc())
df.withColumn("ranking_w_grupie", F.row_number().over(okno_ranking)).show(15)
```

## Rozwiązanie Części 2: Window Functions

### Krok 2.1: Ranking (rank i row_number)

```python
okno = Window.partitionBy("artysta").orderBy(F.col("data"))

df_ranking = (
    df.withColumn("rank", F.rank().over(Window.partitionBy("artysta").orderBy(F.col("odtworzenia").desc())))
      .withColumn("row_number", F.row_number().over(Window.partitionBy("artysta").orderBy(F.col("odtworzenia").desc())))
)
# row_number() gwarantuje dokładnie 3 wiersze per grupa nawet przy remisach - rank() mógłby dać więcej
df_ranking.filter(F.col("row_number") <= 3).orderBy("artysta", "row_number").show(15)
```

### Krok 2.2: Suma narastająca (running total)

```python
okno_narastajace = (
    Window.partitionBy("artysta").orderBy("data")
    .rowsBetween(Window.unboundedPreceding, Window.currentRow)
)
df_running = df.withColumn("suma_narastajaca", F.sum("odtworzenia").over(okno_narastajace))
df_running.orderBy("artysta", "data").show(10)

# Weryfikacja: ostatnia suma narastająca w grupie == suma całej grupy
ostatnie_wartosci = (
    df_running.withColumn("czy_ostatni", F.row_number().over(
        Window.partitionBy("artysta").orderBy(F.col("data").desc())) == 1)
    .filter("czy_ostatni")
    .select("artysta", "suma_narastajaca")
)
sumy_grup = df.groupBy("artysta").agg(F.sum("odtworzenia").alias("suma_calkowita"))
weryfikacja = ostatnie_wartosci.join(sumy_grup, "artysta")
weryfikacja.show()
# suma_narastajaca powinna być równa suma_calkowita dla każdego artysty
```

### Krok 2.3: Analiza sekwencyjna (lag/lead)

```python
okno_czasowe = Window.partitionBy("artysta").orderBy("data")
df_lag = df.withColumn("odtworzenia_poprzedni_dzien", F.lag("odtworzenia", 1).over(okno_czasowe))
df_lag = df_lag.withColumn("zmiana_dzien_do_dnia", F.col("odtworzenia") - F.col("odtworzenia_poprzedni_dzien"))
df_lag.orderBy("artysta", "data").show(10)
```
**Komentarz (Markdown):** Kolumna `zmiana_dzien_do_dnia` pokazuje dobowe wahania popularności utworów — duże dodatnie skoki mogą sygnalizować viralowy moment (np. udział w popularnej playliście), a duże spadki — koniec chwilowej popularności.

### Krok 2.4: Plan zapytania

```python
df_running.explain(True)
```
**Odpowiedź:** W planie fizycznym widoczne są węzły `Window` (obliczenie funkcji okienkowej) oraz `Exchange` (przetasowanie/shuffle danych pomiędzy partycjami wg `partitionBy`). Oznacza to, że Spark musi przegrupować dane tak, by wszystkie wiersze danej grupy (`artysta`) trafiły na ten sam executor przed policzeniem okna — to kosztowna, ale konieczna operacja przy window functions.

</details>

---

## ❓ FAQ

**Q: Czy mogę użyć zbioru danych z laboratorium (sieć kawiarni / rowery miejskie)?**
A: Nie — celem zadania jest praca na **innym**, samodzielnie wybranym zbiorze danych.

**Q: Czy zapytania SQL i DataFrame API muszą dawać identyczny wynik co do wiersza?**
A: Tak, w Części 1 (zadanie 5) — to właśnie ma pokazać, że oba podejścia są równoważne.

**Q: Czy mogę użyć tego samego zbioru danych w obu częściach zadania?**
A: Tak, pod warunkiem że zawiera kolumnę grupującą i kolumnę do sortowania potrzebną w Części 2. Możesz też wybrać dwa różne zbiory.

**Q: Czy muszę mieć duży zbiór danych (jak na zajęciach — 200 000 wierszy)?**
A: Nie, kilkaset-kilka tysięcy rekordów w zupełności wystarczy, żeby poprawnie zademonstrować zapytania i window functions.

**Q: Co jeśli moje dane w Części 2 nie mają wyraźnych "grup"?**
A: Możesz potraktować cały zbiór jako jedną grupę (`Window.orderBy(...)` bez `partitionBy`) — tak jak w Ćwiczeniu 1 z laboratorium.

Powodzenia! 🚀📊
