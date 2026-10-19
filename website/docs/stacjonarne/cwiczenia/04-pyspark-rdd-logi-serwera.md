---
id: 04-pyspark-rdd-logi-serwera
title: "Lab 4: PySpark RDD — Analiza logów serwera"
sidebar_label: "Lab 4 — PySpark RDD"
description: "Analiza ~50 000 syntetycznych logów serwera WWW przy użyciu RDD — parsowanie, map/filter/reduceByKey, wykrywanie botów."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 4: PySpark RDD — Analiza logów serwera WWW

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

W tym laboratorium przeanalizujesz **~50 000 syntetycznych logów serwera WWW** (styl Apache/Nginx access log) wyłącznie za pomocą **RDD** — bez DataFrame i bez Spark SQL. To celowe: dziś ćwiczymy niskopoziomowe operacje `map`, `filter` i `reduceByKey`, które są fundamentem zrozumienia Sparka.

Po wykonaniu ćwiczenia będziesz potrafić:

- Parsować surowe linie tekstowe logów na ustrukturyzowane krotki za pomocą `map`
- Filtrować dane (`filter`) — np. wyodrębniać wyłącznie błędy HTTP
- Agregować dane po kluczu (`reduceByKey`) — ruch, średnie czasy, wskaźniki błędów
- Wykrywać anomalie (potencjalne boty) analizując częstotliwość requestów z danego IP

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-04-pyspark-rdd-logi-serwera.ipynb">📥 <strong>Pobierz: cw-04-pyspark-rdd-logi-serwera.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Dane są generowane **proceduralnie wewnątrz notebooka** (nie trzeba niczego pobierać) — dzięki `random.seed(42)` każdy student otrzyma identyczny zbiór.

| Atrybut | Wartość |
|---------|---------|
| Liczba wpisów | ~50 000 linii logów |
| Format | Tekstowy, jedna linia = jeden request HTTP |
| Pola | `ip`, `timestamp` (ISO 8601), `endpoint`, `status_code`, `response_time_ms`, `user_agent` |
| Okres | 7 dni (październik 2026) |
| Specjalne cechy | ~15% requestów pochodzi z 5 "botowych" adresów IP — do wykrycia w Ćwiczeniu 5 |

Przykładowa linia logu:

```
192.168.42.7 2026-10-27T08:15:32 /api/products 200 145 Mozilla/5.0 (Windows NT 10.0)
```

---

## 📋 Zadania

Notebook zawiera **6 ćwiczeń** i **1 zadanie bonusowe**, wszystkie wyłącznie na RDD:

| Nr | Temat | Operacje RDD |
|----|-------|--------------|
| 1 | Top 5 najczęściej odwiedzanych endpointów | `map`, `reduceByKey`, `takeOrdered` |
| 2 | Średni czas odpowiedzi per endpoint | `map`, `reduceByKey`, `mapValues` |
| 3 | Wskaźnik błędów (error rate) na godzinę | `map`, `reduceByKey`, `mapValues` |
| 4 | 10 najwolniejszych requestów | `takeOrdered` |
| 5 | Liczba requestów per IP — wykrywanie botów | `map`, `reduceByKey`, `takeOrdered` |
| 6 | Rozkład kodów statusu HTTP | `map`, `reduceByKey` |
| 🌟 | Bonus: prosty rate-limiter / flaga anomalii | klucz złożony, `filter`, `distinct` |

---

## 💡 Fragment kodu — przykład ze startera

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Cwiczenie4-RDD-Logi-Serwera").master("local[*]").getOrCreate()
sc = spark.sparkContext

def parsuj_linie(linia: str) -> tuple[str, str, str, int, int, str]:
    """Zamienia surową linię logu na krotkę (ip, timestamp, endpoint, status, czas_ms, user_agent)."""
    czesci = linia.split(" ")
    return (czesci[0], czesci[1], czesci[2], int(czesci[3]), int(czesci[4]), " ".join(czesci[5:]))

sparsowane_rdd = logi_rdd.map(parsuj_linie)
bledy_rdd = sparsowane_rdd.filter(lambda rekord: rekord[3] >= 400)

print(f"Błędy: {bledy_rdd.count():,} / {sparsowane_rdd.count():,}")
```

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki bez błędów
- [ ] Ukończyłem/am co najmniej 4 z 6 ćwiczeń
- [ ] Opcjonalnie: zadanie bonusowe (rate-limiter/flaga anomalii)

<Admonition type="warning" title="Oddawanie pracy">
  Oddaj gotowy notebook przez link w systemie uczelnianym lub wyślij bezpośrednio przez formularz wskazany przez prowadzącego.
</Admonition>

<Admonition type="info" title="Semestr">
  Zimowy 2026/2027 &nbsp;|&nbsp; Studia stacjonarne
</Admonition>
