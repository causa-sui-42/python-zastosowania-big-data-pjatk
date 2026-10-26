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

## 💡 Rozwiązanie krok po kroku (przykład)

<details>
<summary><strong>📖 Kliknij, aby zobaczyć pełne przykładowe rozwiązanie (na przykładowym zbiorze danych)</strong></summary>

Poniższy przykład pokazuje pełne rozwiązanie **wszystkich części** zadania na przykładowym, syntetycznie wygenerowanym logu serwera WWW (Opcja C). Twoje zadanie dotyczy **innego, samodzielnie wybranego** zbioru tekstowego/logu — potraktuj poniższy kod jako wzorzec do adaptacji, nie do kopiowania 1:1.

### Krok 0: Generowanie przykładowego logu serwera

```python
!pip install -q pyspark
from pyspark.sql import SparkSession
import random
from datetime import datetime, timedelta

spark = SparkSession.builder.appName("Zadanie4").master("local[*]").getOrCreate()
sc = spark.sparkContext

random.seed(42)  # powtarzalność wyników

endpointy = ["/home", "/produkty", "/koszyk", "/login", "/api/status", "/checkout"]
kody_http = [200, 200, 200, 301, 404, 500]  # 200 dominuje, jak w realnym ruchu
adresy_ip = [f"10.0.0.{i}" for i in range(1, 51)]

linie_logu = []
start = datetime(2024, 1, 1)
for i in range(6000):  # min. 5000 rekordów
    czas = start + timedelta(seconds=i * 3)
    linia = (f"{czas.isoformat()} {random.choice(adresy_ip)} "
             f"{random.choice(endpointy)} {random.choice(kody_http)} "
             f"{random.randint(5, 900)}ms")
    linie_logu.append(linia)
```

### Krok 1: Setup i wczytanie (Część 1)

```python
rdd = sc.parallelize(linie_logu)
print("Liczba elementów RDD:", rdd.count())
print("Pierwsze 5 linii:")
for linia in rdd.take(5):
    print(linia)
```

### Krok 2: Parsowanie i filtrowanie (Część 2)

```python
def parsuj(linia: str) -> dict:
    """Zamienia surową linię logu na ustrukturyzowany słownik."""
    czesci = linia.split()
    return {
        "timestamp": czesci[0],
        "ip": czesci[1],
        "endpoint": czesci[2],
        "kod_http": int(czesci[3]),
        "czas_ms": int(czesci[4].replace("ms", "")),
    }

rdd_sparsowane = rdd.map(parsuj)
print(rdd_sparsowane.take(3))

# Filtrowanie: tylko błędy HTTP (4xx i 5xx) - typowe kryterium analizy logów
rdd_bledy = rdd_sparsowane.filter(lambda r: r["kod_http"] >= 400)
print("Liczba błędów HTTP:", rdd_bledy.count())
```

### Krok 3: Agregacje po kluczu (Część 3) — minimum 3 różne

```python
# 1. Zliczanie requestów per endpoint
requesty_per_endpoint = (
    rdd_sparsowane
    .map(lambda r: (r["endpoint"], 1))
    .reduceByKey(lambda a, b: a + b)  # reduceByKey > groupByKey: mniej danych w shuffle
)
print("Requesty per endpoint:", requesty_per_endpoint.collect())

# 2. Suma czasu odpowiedzi per endpoint
suma_czasu_per_endpoint = (
    rdd_sparsowane
    .map(lambda r: (r["endpoint"], r["czas_ms"]))
    .reduceByKey(lambda a, b: a + b)
)
print("Suma czasu [ms] per endpoint:", suma_czasu_per_endpoint.collect())

# 3. Średni czas odpowiedzi per endpoint (suma + licznik, potem mapValues)
suma_i_licznik = (
    rdd_sparsowane
    .map(lambda r: (r["endpoint"], (r["czas_ms"], 1)))
    .reduceByKey(lambda a, b: (a[0] + b[0], a[1] + b[1]))
)
srednia_per_endpoint = suma_i_licznik.mapValues(lambda x: x[0] / x[1])
print("Średni czas odpowiedzi [ms] per endpoint:", srednia_per_endpoint.collect())
```

### Krok 4: Ekstremum i sortowanie (Część 4)

```python
# Top 10 adresów IP generujących najwięcej requestów
requesty_per_ip = (
    rdd_sparsowane
    .map(lambda r: (r["ip"], 1))
    .reduceByKey(lambda a, b: a + b)
)
top10_ip = requesty_per_ip.takeOrdered(10, key=lambda x: -x[1])
print("Top 10 najaktywniejszych IP:")
for ip, liczba in top10_ip:
    print(f"  {ip}: {liczba} requestów")
```

**Komentarz (Markdown):** Najaktywniejsze adresy IP generują zauważalnie więcej requestów niż przeciętny użytkownik — w prawdziwym systemie mogłoby to sygnalizować bota, scraper albo klienta API o dużym natężeniu ruchu. Warto porównać ten wynik z rozkładem błędów HTTP (Krok 2) — jeśli najaktywniejsze IP mają też najwyższy odsetek kodów 4xx/5xx, to silny sygnał do dalszego zbadania.

</details>

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
