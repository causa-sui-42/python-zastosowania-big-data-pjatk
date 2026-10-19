# Zadanie domowe 4: PySpark RDD na własnych danych tekstowych

**Poziom trudności:** ⭐⭐⭐ (Średni)

---

## 🎯 Cel zadania

Utrwalenie operacji RDD (`map`, `filter`, `reduceByKey`, `takeOrdered`) poprzez samodzielną analizę zbioru tekstowego lub logu — innego niż ten używany na laboratorium. Zobaczysz, jak te same wzorce transformacji stosuje się do różnych typów danych tekstowych.

---

## 📋 Zadanie

Wybierz **jeden** z poniższych zbiorów danych:

- **Opcja A:** Dowolny plik tekstowy (min. 5000 słów) — np. rozdział książki z [Wolnych Lektur](https://wolnelektury.pl/), artykuł, transkrypcja
- **Opcja B:** Przykładowy log serwera dostarczony przez prowadzącego (mniejsza wersja logów z laboratorium, ~5000 linii)
- **Opcja C:** Własny zbiór logów/tekstu z innego źródła (min. 5000 rekordów)

### Część 1: Setup i wczytanie

- Zainicjalizuj `SparkSession` i `SparkContext` w Google Colab
- Wczytaj dane jako RDD (`sc.parallelize()` z listy linii lub `sc.textFile()`)
- Wypisz liczbę elementów RDD (`count()`) i przykładowe pierwsze 5 (`take(5)`)

### Część 2: Parsowanie i filtrowanie

- Napisz funkcję `parsuj(linia)`, która zamienia surową linię na ustrukturyzowaną krotkę lub słownik
- Zastosuj ją przez `map()` do całego RDD
- Odfiltruj (`filter()`) dane wg co najmniej jednego sensownego kryterium (np. tylko błędy HTTP, tylko słowa dłuższe niż 3 znaki, tylko wpisy z określonego zakresu dat)

### Część 3: Agregacje po kluczu

Wykonaj minimum **3 różne agregacje** przy użyciu `reduceByKey`, np.:
- Zliczanie wystąpień (częstość słów, liczba requestów per endpoint/IP)
- Sumowanie wartości numerycznych (czas odpowiedzi, długość linii)
- Obliczanie średniej (suma + licznik, potem `mapValues`)

### Część 4: Ekstremum i sortowanie

- Użyj `takeOrdered()` lub `sortBy()` + `take()`, żeby znaleźć **top 10** wyników wg wybranej metryki
- Skomentuj (Markdown), co te wyniki oznaczają w kontekście Twoich danych

---

## 📦 Wymagania techniczne

- Notebook w **Google Colab** z PySpark (`!pip install pyspark`)
- Wszystkie transformacje wykonane **wyłącznie operacjami RDD** (żadnego DataFrame/Spark SQL — to temat kolejnego wykładu!)
- Kod z komentarzami wyjaśniającymi każdy krok
- `random.seed()` ustawione, jeśli generujesz dane syntetycznie

---

## 💡 Wskazówki

- Instalacja w Colab: `!pip install pyspark`
- Inicjalizacja:
  ```python
  from pyspark.sql import SparkSession
  spark = SparkSession.builder.appName("Zadanie4").master("local[*]").getOrCreate()
  sc = spark.sparkContext
  ```
- Zawsze preferuj `reduceByKey` nad `groupByKey` — mniej danych przesyłanych przez sieć (shuffle)
- Do wczytania tekstu z internetu użyj `httpx`:
  ```python
  import httpx
  tekst = httpx.get("https://www.gutenberg.org/cache/epub/.../plik.txt").text
  linie = tekst.splitlines()
  rdd = sc.parallelize(linie)
  ```
- Pamiętaj: `map()` zwraca tyle samo elementów ile wejście, `flatMap()` "spłaszcza" wynik — użyj `flatMap`, gdy dzielisz linię na wiele słów

---

## 🔥 Zadanie bonusowe (opcjonalnie)

Zaimplementuj prostą regułę wykrywania anomalii (np. słowo/klucz występujący nienaturalnie często w krótkim fragmencie danych) — wyłącznie operacjami RDD, bez `pandas`.

---

## ❓ FAQ

**Q: Czy mogę użyć logów z laboratorium?**
A: Nie — wybierz **inny** zbiór danych, żeby ćwiczyć na nowym przykładzie.

**Q: Czy mogę użyć `groupByKey` zamiast `reduceByKey`?**
A: Możesz, ale stracisz punkty za wydajność — w komentarzu wyjaśnij, dlaczego `reduceByKey` jest lepszym wyborem.

**Q: Ile rekordów minimum muszę mieć w danych?**
A: Minimum 5000 — powyżej tej liczby sensowne jest już użycie Sparka zamiast czystego Pythona.

---

Powodzenia! ⚡
