# Zadanie domowe 10: Zbuduj własny system alertów streamingowych

**Poziom trudności:** ⭐⭐⭐⭐ (Zaawansowany)

**Termin:** Przed testem teoretycznym (15.12.2026)

---

## 🎯 Cel zadania

To **ostatnie zadanie domowe** przed testem teoretycznym! Utrwalisz budowę pipeline'u **Spark Structured Streaming** z windowed aggregations, watermarkingiem i systemem alertów — na **samodzielnie wybranym scenariuszu czujników**, innym niż jakość powietrza z laboratorium.

> 💡 To także świetna okazja, by przy okazji zacząć powtórkę materiału z Wykładów 1–10 przed testem 📚.

---

## 📋 Zadanie

Wybierz dowolny scenariusz **strumienia danych z czujników**, gdzie sensowne jest wykrywanie alertów w czasie rzeczywistym. Może to być np.:

- Monitoring temperatury i wilgotności w magazynie chłodniczym (alert przy przekroczeniu progu)
- Czujniki poziomu wody rzek/zbiorników (alert powodziowy)
- Monitoring zużycia energii w inteligentnych budynkach (alert przy anomalii zużycia)
- Czujniki hałasu w strefach mieszkalnych (alert przy przekroczeniu norm hałasu)
- Dowolny inny scenariusz czujników IoT — **inny niż jakość powietrza z zajęć**

Wykonaj w Jupyter Notebook (Google Colab, PySpark) następujące kroki:

### Część 1: Symulacja strumienia
- Napisz generator Pythona symulujący **co najmniej 10 czujników** Twojego scenariusza, zapisujący mikro-batche danych jako pliki JSON/CSV do folderu tymczasowego (`random.seed(42)` dla powtarzalności)
- Zdefiniuj schemat danych (`StructType`) i wczytaj strumień przez `spark.readStream`

### Część 2: Windowed aggregation + watermark
- Zbuduj agregację (np. średnia/max wartości pomiarowej) w oknach czasowych **5-minutowych** per czujnik
- Dodaj `withWatermark()` z uzasadnionym progiem tolerancji na spóźnione dane (2-3 zdania wyjaśnienia w komórce Markdown)

### Część 3: System alertów
- Zdefiniuj warunek alertu (np. przekroczenie progu) i zaimplementuj go jako osobny strumień z `outputMode("append")`
- Porównaj wynik z agregacją w `outputMode("complete")` — opisz różnicę (2-3 zdania)

### Część 4: Bezpieczne zarządzanie query
- Uruchom streaming query z ograniczonym czasem działania (`awaitTermination(timeout=...)`)
- Zatrzymaj query metodą `.stop()` i pokaż, że można je bezpiecznie uruchomić ponownie

---

## 📦 Wymagania techniczne

- Notebook w Google Colab lub lokalnym Jupyter z zainstalowanym `pyspark` (`!pip install -q pyspark`)
- Dane generowane proceduralnie (`random.seed(42)` dla powtarzalności) — bez zewnętrznych plików
- Kod zawierający komentarze wyjaśniające wybór okna czasowego i progu watermarku
- Krótkie podsumowanie wniosków (Markdown, 3-5 zdań) na końcu notebooka

---

## 💡 Wskazówki

- `window(col("timestamp"), "5 minutes")` w `groupBy()` tworzy tumbling window
- `withWatermark("timestamp", "X minutes")` musi być wywołany **przed** `groupBy()`
- Agregacje (`groupBy`) wymagają `outputMode("complete")` lub `"update"` — `"append"` zadziała dopiero z watermarkiem
- Dokumentacja: [spark.apache.org/docs/latest/structured-streaming-programming-guide.html](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)

---

## 💡 Rozwiązanie krok po kroku (przykład)

<details>
<summary><strong>📖 Kliknij, aby zobaczyć pełne przykładowe rozwiązanie (na przykładowym zbiorze danych)</strong></summary>

Poniższy przykład pokazuje pełne rozwiązanie **wszystkich części** zadania na przykładowym scenariuszu: monitoring zużycia energii w inteligentnych budynkach (10+ czujników, alert przy anomalii zużycia). Twój scenariusz dotyczy **innego, samodzielnie wybranego** typu czujników — potraktuj poniższy kod jako wzorzec do adaptacji, nie do kopiowania 1:1.

### Krok 1: Symulacja strumienia (Część 1)

```python
!pip install -q pyspark
import json
import random
import time
from pathlib import Path
from datetime import datetime, timedelta
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, TimestampType
import pyspark.sql.functions as F

spark = SparkSession.builder.appName("Zadanie10").getOrCreate()
random.seed(42)

katalog_strumienia = Path("strumien_energia")
katalog_strumienia.mkdir(exist_ok=True)

czujniki = [f"licznik_{i:02d}" for i in range(1, 13)]  # 12 czujników - min. 10 wymagane

def wygeneruj_mikrobatch(numer_batcha: int, czas_startowy: datetime) -> Path:
    """Generuje jeden mikro-batch odczytów z czujników i zapisuje jako plik JSON."""
    rekordy = []
    for czujnik in czujniki:
        # kilka losowych próbek w ramach jednego batcha, z lekko spóźnionymi danymi
        for sekunda in range(0, 60, 15):
            timestamp = czas_startowy + timedelta(seconds=sekunda)
            zuzycie_kwh = round(random.gauss(5.0, 1.2), 2)
            # Sporadyczna anomalia (np. awaria urządzenia grzewczego)
            if random.random() < 0.02:
                zuzycie_kwh *= 4
            rekordy.append({"czujnik": czujnik, "timestamp": timestamp.isoformat(), "zuzycie_kwh": zuzycie_kwh})

    sciezka = katalog_strumienia / f"batch_{numer_batcha:03d}.json"
    with open(sciezka, "w") as plik:
        for rekord in rekordy:
            plik.write(json.dumps(rekord) + "\n")
    return sciezka

# Schemat danych wejściowych
schemat = StructType([
    StructField("czujnik", StringType(), False),
    StructField("timestamp", TimestampType(), False),
    StructField("zuzycie_kwh", DoubleType(), False),
])

# Wygenerowanie kilku pierwszych mikro-batchy przed startem streamu
czas_bazowy = datetime(2024, 1, 1, 8, 0, 0)
for i in range(5):
    wygeneruj_mikrobatch(i, czas_bazowy + timedelta(minutes=i))

strumien = (
    spark.readStream
    .schema(schemat)
    .option("maxFilesPerTrigger", 1)
    .json(str(katalog_strumienia))
)
```

### Krok 2: Windowed aggregation + watermark (Część 2)

```python
strumien_z_watermarkiem = strumien.withWatermark("timestamp", "2 minutes")

agregacja_okienkowa = (
    strumien_z_watermarkiem
    .groupBy(F.window("timestamp", "5 minutes"), "czujnik")
    .agg(
        F.avg("zuzycie_kwh").alias("srednie_zuzycie"),
        F.max("zuzycie_kwh").alias("max_zuzycie"),
    )
)
```
**Uzasadnienie watermarku (Markdown):** Przyjęty próg tolerancji **2 minuty** oznacza, że Spark czeka maks. 2 minuty po zaobserwowaniu najnowszego timestampu, zanim "zamknie" okno i przestanie przyjmować dla niego spóźnione dane. Dla odczytów z liczników energii, wysyłanych co 15 sekund przez sieć lokalną, 2 minuty to rozsądny margines na opóźnienia transmisji, bez nadmiernego opóźniania wyników raportowanych operatorowi.

### Krok 3: System alertów (Część 3)

```python
PROG_ALERTU_KWH = 9.0  # ok. 2x więcej niż typowe zużycie ~5 kWh - sygnał anomalii

strumien_alertow = (
    agregacja_okienkowa
    .filter(F.col("max_zuzycie") > PROG_ALERTU_KWH)
    .select("window", "czujnik", "max_zuzycie")
)

query_alerty = (
    strumien_alertow.writeStream
    .outputMode("append")  # append wymaga watermarku - wypisuje wiersz dopiero po "domknięciu" okna
    .format("console")
    .queryName("alerty_energia")
    .start()
)

query_pelna_agregacja = (
    agregacja_okienkowa.writeStream
    .outputMode("complete")  # complete pokazuje PEŁNY, wciąż aktualizowany stan wszystkich okien
    .format("console")
    .queryName("pelna_agregacja_energia")
    .start()
)
```
**Różnica `append` vs `complete` (Markdown):** `outputMode("append")` wypisuje wiersz **dopiero gdy okno czasowe jest ostatecznie zamknięte** (po upływie watermarku) i nigdy go potem nie koryguje — dobre do alertów, bo każdy alert pojawia się dokładnie raz. `outputMode("complete")` wypisuje **cały, wciąż aktualizowany** stan wszystkich dotychczasowych okien przy każdym triggerze — przydatne do podglądu/dashboardu na żywo, ale generuje dużo większy wolumen wyjścia przy rosnącej liczbie okien.

### Krok 4: Bezpieczne zarządzanie query (Część 4)

```python
# Wygenerowanie kolejnych mikro-batchy w tle, żeby było co przetwarzać
for i in range(5, 10):
    wygeneruj_mikrobatch(i, czas_bazowy + timedelta(minutes=i))
    time.sleep(2)

# Uruchomienie z ograniczonym czasem działania
query_alerty.awaitTermination(timeout=30)

# Bezpieczne zatrzymanie
query_alerty.stop()
query_pelna_agregacja.stop()
print("Query zatrzymane. Status:", query_alerty.isActive, query_pelna_agregacja.isActive)

# Ponowne, bezpieczne uruchomienie tego samego zapytania alertowego
query_alerty_v2 = (
    strumien_alertow.writeStream
    .outputMode("append")
    .format("console")
    .queryName("alerty_energia_v2")
    .start()
)
query_alerty_v2.awaitTermination(timeout=15)
query_alerty_v2.stop()
print("✅ Query zostało bezpiecznie zatrzymane i ponownie uruchomione.")
```

**Podsumowanie wniosków (Markdown, przykład):** Okno 5-minutowe z watermarkiem 2 minut dobrze równoważy szybkość wykrywania anomalii zużycia energii z tolerancją na opóźnienia sieciowe liczników. Tryb `append` jest właściwym wyborem dla alertów (jednorazowe, ostateczne zdarzenia), podczas gdy `complete` lepiej sprawdza się do podglądu bieżącego stanu wszystkich czujników na dashboardzie. Kluczowe jest też bezpieczne zarządzanie cyklem życia zapytań (`awaitTermination` z timeoutem + jawny `.stop()`) — w produkcyjnym systemie pozwala to na kontrolowane restarty bez utraty danych.

</details>

---

## 📚 Nie zapomnij o teście i projekcie!

To ostatnie zadanie domowe przed **testem teoretycznym (15.12.2026)** obejmującym Wykłady 1–10 (70% oceny) — dobry moment, by przejrzeć notatki ze wszystkich zajęć. Pamiętaj też o zbliżającym się terminie **Projektu zaliczeniowego** (oddanie 19.12.2026, obrona 22.12.2026, 30% oceny) — sprawdź stronę **"Projekt zaliczeniowy"**, jeśli masz jeszcze otwarte kwestie.

Powodzenia z ostatnim zadaniem tego semestru! 🚀🌊
