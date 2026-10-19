---
id: 12-streaming-jakosc-powietrza
title: "Lab 12: Structured Streaming — Jakość powietrza"
sidebar_label: "Lab 12 — Streaming"
description: "Symulacja strumienia z ~30 czujników jakości powietrza, Spark Structured Streaming (readStream/writeStream), windowed aggregations, watermarking oraz szkic integracji z Apache Kafka."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 12: Structured Streaming — Jakość powietrza

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

Pracujesz jako inżynier danych w miejskim systemie **EcoMonitor** 🌬️ — monitoringu jakości powietrza w czasie rzeczywistym. Miasto rozmieściło **~30 czujników** mierzących PM2.5, PM10, temperaturę i wilgotność. Twoim zadaniem jest zbudować pipeline, który wykrywa przekroczenia norm PM2.5 **na bieżąco**, zanim ktokolwiek zdąży się tym zmartwić za późno.

Po wykonaniu ćwiczenia będziesz potrafić:

- Symulować strumień danych IoT generatorem plików (przybliżenie Kafka producer w Colab)
- Tworzyć strumienie z `readStream` / `writeStream` w Spark Structured Streaming
- Stosować **windowed aggregations** — średnia PM2.5 per czujnik w oknach 5-minutowych
- Obsługiwać **spóźnione dane** z watermarkingiem
- Porównywać **output modes**: append vs complete
- Bezpiecznie zatrzymywać i wznawiać streaming query
- Naszkicować, jak wyglądałby prawdziwy producer/consumer Kafki w miejsce symulacji plikowej

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-12-streaming-jakosc-powietrza.ipynb">📥 <strong>Pobierz: cw-12-streaming-jakosc-powietrza.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Dane są **generowane proceduralnie** przez generator Pythona symulujący ~30 czujników — nie trzeba niczego pobierać, a ćwiczenie działa identycznie w Google Colab i lokalnie.

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Symulowane odczyty czujników jakości powietrza (EcoMonitor) |
| Liczba czujników | ~30 rozmieszczonych w mieście |
| Kolumny | `sensor_id`, `pm25`, `pm10`, `temperatura`, `wilgotnosc`, `timestamp` |
| Sposób strumieniowania | Mikro-batche zapisywane jako pliki JSON do folderu tymczasowego, odczytywane przez `spark.readStream` (przybliżenie Kafka bez prawdziwego klastra) |
| Generowanie | Losowe wartości z realistycznymi rozkładami (`random.seed(42)`) |

> 💡 Dlaczego pliki, a nie prawdziwa Kafka? Google Colab nie ma dostępu do klastra Kafki — file source to **standardowy, oficjalnie wspierany** sposób demonstrowania Structured Streaming bez zewnętrznej infrastruktury. Kod przetwarzania (`readStream`/`writeStream`) jest identyczny jak przy prawdziwej Kafce!

---

## 📋 Zadania

Notebook zawiera **guided example** (windowed aggregation z `outputMode("complete")` + zapytania SQL) oraz **7 ćwiczeń + bonus**:

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Symulacja strumienia + windowed avg PM2.5 per sensor | `readStream`, `window()`, `format("memory")` |
| 1 | Wykrywanie przekroczeń normy PM2.5 (alerty) | `.filter()`, próg alertu |
| 2 | Rolling average — średnia krocząca | Sliding window |
| 3 | Watermarking dla spóźnionych odczytów | `withWatermark()` |
| 4 | Porównanie output modes: append vs complete | `outputMode()` |
| 5 | Agregacja per typ lokalizacji/dzielnica | `groupBy()`, wiele kolumn |
| 6 | Bezpieczne zatrzymanie i wznowienie query | `query.stop()`, `awaitTermination()` |
| 7 | Analiza wyników przez zapytania SQL | `spark.sql()` na tabeli w pamięci |
| 🏆 Bonus | Szkic prawdziwego producenta/konsumenta Kafki | przykładowy kod `kafka-python` (referencyjny, nieuruchamiany) |

<Admonition type="info" title="Uwaga techniczna">
  Ćwiczenie działa w pełni na Google Colab bez prawdziwego klastra Kafka — strumień symulujemy generatorem plików JSON. Kod bonusowy z `kafka-python` służy wyłącznie jako punkt odniesienia i nie jest wykonywany w notebooku.
</Admonition>

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki bez błędów
- [ ] Ukończyłem/am co najmniej 5 z 7 ćwiczeń
- [ ] Testy automatyczne przechodzą (✅) dla ukończonych ćwiczeń

Semestr: Zimowy 2026/2027
