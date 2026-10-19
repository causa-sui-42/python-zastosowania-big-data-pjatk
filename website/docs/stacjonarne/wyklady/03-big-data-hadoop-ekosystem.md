---
id: 03-big-data-hadoop-ekosystem
title: "Wykład 3: Big Data i ekosystem Hadoop"
sidebar_label: "03 — Big Data i Hadoop"
description: "5V Big Data, architektura HDFS, paradygmat MapReduce (map/shuffle/reduce) i zarządzanie zasobami YARN."
---

import Admonition from '@theme/Admonition';

# Wykład 3: Big Data i ekosystem Hadoop

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Czym naprawdę jest **Big Data** i dlaczego opisuje się je przez **5V**
- Jak działa **HDFS** — rozproszony system plików Hadoopa (NameNode, DataNode, replikacja bloków)
- Na czym polega paradygmat **MapReduce** (map → shuffle → reduce) — krok po kroku, na przykładzie zliczania słów
- Do czego służy **YARN** i dlaczego jego pojawienie się otworzyło drogę dla Apache Spark
- Jak wygląda reszta ekosystemu Hadoop (Hive, HBase, Sqoop, Oozie)

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie PDF. Możesz je otworzyć bezpośrednio w przeglądarce lub pobrać.
</Admonition>

📄 **[Otwórz slajdy PDF](/stacjonarne/pdfs/wyk03-big-data-hadoop-ekosystem.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Co to jest Big Data?

**Big Data** to dane, które są zbyt **duże**, zbyt **szybkie** lub zbyt **różnorodne**, żeby przetworzyć je tradycyjnymi narzędziami — np. jedną bazą SQL na jednym serwerze.

Opisuje się je zwykle przez **5V**:

| V | Nazwa | Opis | Przykład |
|---|-------|------|---------|
| Volume | **Wolumen** | Ogromna ilość danych | Facebook: ~4 PB nowych danych dziennie |
| Velocity | **Prędkość** | Dane napływają w czasie (niemal) rzeczywistym | Czujniki IoT: odczyt co sekundę z tysięcy urządzeń |
| Variety | **Różnorodność** | Strukturalne, pół- i niestrukturalne | CSV, JSON, logi serwerowe, zdjęcia, wideo |
| Veracity | **Wiarygodność** | Dane bywają błędne, niekompletne, zaszumione | Brakujące wartości, duplikaty, boty |
| Value | **Wartość** | Dane bez insightu są bezużyteczne | Wzrost sprzedaży dzięki systemowi rekomendacji |

> 💡 Ważna uwaga: **rozmiar danych sam w sobie nie oznacza automatycznie "problemu Big Data"**. Dopiero kombinacja kilku V (np. duży wolumen + wysoka prędkość napływu) uzasadnia sięgnięcie po rozproszoną architekturę.

---

### 2. HDFS — Hadoop Distributed File System

**HDFS** to rozproszony system plików — dzieli duże pliki na **bloki** (domyślnie 128 MB) i rozkłada je na wiele tanich, zwykłych serwerów w klastrze.

| Komponent | Rola |
|-----------|------|
| **NameNode** | Przechowuje metadane — wie, *gdzie* leżą bloki, ale sam ich nie przechowuje |
| **DataNode** | Fizycznie przechowuje bloki danych, regularnie raportuje "heartbeat" do NameNode |
| **Secondary NameNode** | Okresowo tworzy migawki metadanych (to **nie** jest backup awaryjny!) |
| **Replication factor** | Domyślnie każdy blok ma **3 kopie** na różnych maszynach (odporność na awarie) |

Jeśli jeden DataNode padnie, NameNode wykrywa brak "heartbeat" i automatycznie zleca stworzenie nowej kopii brakującego bloku z jednej z pozostałych replik — klaster **sam się naprawia**.

---

### 3. MapReduce — paradygmat map / shuffle / reduce

**MapReduce** rozkłada przetwarzanie danych na trzy fazy:

1. **Map** — każda maszyna niezależnie i równolegle przetwarza swój fragment danych, produkując pary `(klucz, wartość)`
2. **Shuffle** — framework grupuje wszystkie wartości o tym samym kluczu razem (niezależnie od tego, która maszyna je wyprodukowała)
3. **Reduce** — dla każdego klucza agregujemy zebrane wartości (np. sumujemy)

Poniżej pełna symulacja klasycznego przykładu **word count** w czystym Pythonie — dokładnie ten sam pomysł, tylko uruchomiony na jednej maszynie zamiast klastra:

```python
from collections import defaultdict

def map_reduce_word_count(dokumenty: list[str]) -> dict[str, int]:
    """Symulacja MapReduce word count — bez klastra, na jednej maszynie."""
    # --- MAP --- (w prawdziwym Hadoopie: równolegle, na wielu maszynach)
    mapped: list[tuple[str, int]] = []
    for dokument in dokumenty:
        mapped.extend((slowo, 1) for slowo in dokument.lower().split())

    # --- SHUFFLE --- (grupowanie par po kluczu)
    grouped: dict[str, list[int]] = defaultdict(list)
    for slowo, wartosc in mapped:
        grouped[slowo].append(wartosc)

    # --- REDUCE --- (agregacja per klucz)
    return {slowo: sum(wartosci) for slowo, wartosci in grouped.items()}

dokumenty = [
    "Python jest super Python jest proste",
    "Spark jest szybki Python jest potężny",
]
print(map_reduce_word_count(dokumenty))
# {'python': 3, 'jest': 4, 'super': 1, 'proste': 1, 'spark': 1, 'szybki': 1, 'potężny': 1}
```

> ⚠️ **Dlaczego klasyczny MapReduce jest wolny?** Po każdej fazie (map, shuffle, reduce) wyniki pośrednie są zapisywane **na dysk**, a nie trzymane w pamięci RAM. To sprawdza się dla jednorazowego przetwarzania wsadowego, ale jest fatalne dla zadań iteracyjnych (np. Machine Learning) — stąd potrzeba Apache Spark.

---

### 4. YARN — zarządzanie zasobami klastra

Pierwotny Hadoop MapReduce łączył zarządzanie zasobami i planowanie zadań w jednym komponencie, co się nie skalowało. **YARN (Yet Another Resource Negotiator)** rozdzielił te odpowiedzialności:

| Komponent | Rola |
|-----------|------|
| **ResourceManager** | Globalnie zarządza zasobami (CPU, RAM) całego klastra |
| **NodeManager** | Działa na każdej maszynie, monitoruje lokalne zasoby |
| **ApplicationMaster** | Jeden na każde uruchomione zadanie — negocjuje zasoby i pilnuje wykonania |
| **Container** | Jednostka przydzielonych zasobów, na której faktycznie wykonuje się kod |

Dzięki YARN klaster Hadoop mógł uruchamiać nie tylko MapReduce, ale **dowolny framework przetwarzania** — w tym Apache Spark, bez przebudowy istniejącej infrastruktury.

---

### 5. Reszta ekosystemu Hadoop

| Narzędzie | Do czego służy |
|-----------|-----------------|
| **Hive** | SQL-owy interfejs do danych przechowywanych w HDFS |
| **HBase** | Rozproszona, kolumnowa baza NoSQL działająca na HDFS |
| **Sqoop** | Import/eksport danych między HDFS a tradycyjnymi bazami SQL |
| **Oozie** | Planowanie i orkiestracja workflowów (jak "cron" dla zadań Big Data) |

---

## 🧠 Zadanie do przemyślenia

:::note Przemyśl to 🤔
1. Firma ma bazę danych 50 GB, rosnącą o 1 MB dziennie, zawsze w tym samym, czystym formacie CSV. Czy **naprawdę** potrzebuje Hadoopa? Uzasadnij, odwołując się do 5V.
2. Dlaczego replikacja bloków HDFS na różnych **szafach serwerowych (racks)**, a nie tylko różnych dyskach, jest ważniejsza niż mogłoby się wydawać?
3. Co się stanie z zadaniem MapReduce, jeśli jeden klucz (np. jedno bardzo popularne słowo) ma znacznie więcej wartości niż pozostałe? (Podpowiedź: "data skew")
:::

---

## 📚 Polecane materiały

- [Apache Hadoop — oficjalna dokumentacja](https://hadoop.apache.org/docs/stable/)
- [HDFS Architecture Guide](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html)
- Książka: *"Hadoop: The Definitive Guide"* — Tom White (O'Reilly)
- Oryginalny paper: *"MapReduce: Simplified Data Processing on Large Clusters"* — Dean & Ghemawat (Google, 2004)

---

## 🚀 Co dalej?

Na **Wykładzie 4 (27.10.2026)** przechodzimy do **Apache Spark** — architektury, RDD i podstaw PySpark. Zobaczymy, jak te same idee (podział danych, przetwarzanie równoległe) wyglądają w praktyce, tylko dużo szybciej dzięki przetwarzaniu w pamięci RAM.

Na dzisiejszych **ćwiczeniach** zbudujemy własny mini-MapReduce w czystym Pythonie, analizując zbiór syntetycznych recenzji filmowych — to najlepszy sposób, żeby zbudować intuicję przed poznaniem prawdziwego Sparka!

Semestr: Zimowy 2026/2027
