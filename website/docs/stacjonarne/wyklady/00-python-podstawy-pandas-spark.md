---
id: 00-python-podstawy-pandas-spark
title: "Wykład 0: Python — od podstaw do pandas i PySpark"
sidebar_label: "00 — Python: podstawy → Spark"
description: "Fundamenty Pythona (zmienne, pętle, listy, słowniki) oraz wprowadzenie do pandas i PySpark — dla studentów z różnych backgroundów technicznych."
---

import Admonition from '@theme/Admonition';

# Wykład 0: Python — od podstaw do pandas i PySpark

**Czas trwania:** ~90–120 minut &nbsp;|&nbsp; **Poziom:** Podstawowy &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Czego się nauczysz

Ten wykład to **wspólny punkt startowy** dla całego kursu — niezależnie od tego, czy programowałeś/aś już w innym języku, znasz tylko Excela i SQL, czy Python to Twój pierwszy język. Po tym wykładzie będziesz wiedzieć:

- Jak działają **zmienne, typy danych i operatory** w Pythonie
- Jak pisać **pętle** (`for`, `while`) i instrukcje warunkowe (`if`/`elif`/`else`, `match`/`case`)
- Jak sprawnie operować na **listach, krotkach, zbiorach i słownikach** — w tym comprehensions
- Jak pisać **funkcje**, obsługiwać wyjątki (`try`/`except`) i tworzyć proste klasy
- Jak tworzyć, filtrować, grupować i łączyć dane w **pandas** (`DataFrame`)
- Jak te same operacje wyglądają w **PySpark** — i dlaczego w ogóle potrzebujemy Sparka

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie PDF. Możesz je otworzyć bezpośrednio w przeglądarce lub pobrać.
</Admonition>

📄 **[Otwórz slajdy PDF](pathname:///stacjonarne/pdfs/wyk00-python-od-podstaw-do-pandas-spark.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Dlaczego Python?

Czytelna składnia, ogromny ekosystem (pandas, NumPy, scikit-learn, PySpark) i pozycja standardu w Data Science i Big Data — to główne powody, dla których cały kurs opiera się na Pythonie.

### 2. Zmienne, typy i operatory

Python jest dynamicznie typowany — `str`, `int`, `float`, `bool`, `None` oraz operatory arytmetyczne, porównania, logiczne i przynależności (`in`).

### 3. Sterowanie przepływem

`if`/`elif`/`else`, nowoczesny `match`/`case` (Python 3.10+), pętle `for` (z `range`, `enumerate`, `zip`) oraz `while` z `break`/`continue`.

### 4. Struktury danych i ich "triki"

Listy (operacje, slicing, kopiowanie vs referencje, list comprehension), krotki (niemutowalność), zbiory (operacje mnogościowe), słowniki (dict comprehension, `Counter`, `defaultdict`).

### 5. Funkcje, wyjątki, odrobina OOP

`*args`/`**kwargs`, `lambda`, `map`/`filter`, `try`/`except`/`else`/`finally`, podstawy klas i `@dataclass`.

### 6. pandas — DataFrame

Tworzenie, `loc`/`iloc`, filtrowanie (`&`/`|` zamiast `and`/`or`), nowe kolumny, `groupby`/`agg`, `pivot_table`, `merge` (jak `JOIN` w SQL).

### 7. PySpark — pierwsze kroki

`SparkSession`, transformacje vs akcje (lazy evaluation), DataFrame API, Spark SQL — oraz ściąga porównawcza pandas vs PySpark.

---

## 📓 Powiązane ćwiczenie

Umiejętności z tego wykładu przećwiczysz w **[Ćwiczeniu 0](/stacjonarne/materialy/cwiczenia/00-python-podstawy-pandas-spark)**.
