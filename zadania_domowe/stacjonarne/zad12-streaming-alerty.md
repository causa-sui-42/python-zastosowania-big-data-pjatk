# Zadanie domowe 12: Zbuduj własny system alertów streamingowych

**Poziom trudności:** ⭐⭐⭐⭐ (Zaawansowany)

**Termin:** Przed egzaminem teoretycznym (19.01.2027)

---

## 🎯 Cel zadania

To **ostatnie zadanie domowe** przed egzaminem teoretycznym! Utrwalisz budowę pipeline'u **Spark Structured Streaming** z windowed aggregations, watermarkingiem i systemem alertów — na **samodzielnie wybranym scenariuszu czujników**, innym niż jakość powietrza z laboratorium.

> 💡 To także świetna okazja, by przy okazji zacząć powtórkę materiału z Wykładów 1–12 przed egzaminem 📚.

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

## 📚 Nie zapomnij o egzaminie i projekcie!

To ostatnie zadanie domowe przed **egzaminem teoretycznym (19.01.2027)** obejmującym Wykłady 1–12 (70% oceny) — dobry moment, by przejrzeć notatki ze wszystkich zajęć. Pamiętaj też o zbliżającym się terminie **Projektu zaliczeniowego** (30% oceny) — sprawdź stronę **"Projekt zaliczeniowy"**, jeśli masz jeszcze otwarte kwestie.

Powodzenia z ostatnim zadaniem tego semestru! 🚀🌊
