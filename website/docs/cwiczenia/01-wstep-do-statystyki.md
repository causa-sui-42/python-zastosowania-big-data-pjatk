---
id: 01-wstep-do-statystyki
title: "Lab 1: Wstęp do statystyki w Pythonie"
sidebar_label: "Lab 1 — Statystyka w Python"
description: "Praktyczne zastosowanie statystyki opisowej i wnioskowania — NumPy, pandas, wizualizacje."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 1: Wstęp do statystyki w Pythonie

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Podstawowy &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Cel ćwiczenia

W tym laboratorium nauczysz się stosować **statystykę opisową i wnioskowanie** w praktyce używając NumPy, pandas i matplotlib.

Po wykonaniu ćwiczenia będziesz potrafić:

- Obliczać miary tendencji centralnej (średnia, mediana, moda)
- Analizować rozkłady danych i wykrywać wartości odstające
- Tworzyć wizualizacje statystyczne (histogramy, boxploty, heatmapy)
- Stosować podstawowe testy statystyczne w Pythonie

---

## 📥 Pobierz notebook

<DownloadLink href="/notebooks/cw-01-wstep-do-statystyki.ipynb">📥 <strong>Pobierz: cw-01-wstep-do-statystyki.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Student Performance Dataset |
| Liczba rekordów | ~1000 studentów |
| Format | CSV |
| Kolumny | `student_id`, `gender`, `age`, `study_hours`, `attendance_rate`, `midterm_score`, `final_score`, `passed` |

---

## 📋 Zadania

Notebook zawiera **8 głównych ćwiczeń**:

| Nr | Temat | Koncepty |
|----|-------|----------|
| 1 | Wczytanie i eksploracja danych | `read_csv`, `describe()`, `info()` |
| 2 | Miary tendencji centralnej | `mean()`, `median()`, `mode()` |
| 3 | Miary rozproszenia | `var()`, `std()`, `quantile()` |
| 4 | Wizualizacja rozkładów | Histogramy, boxploty, KDE |
| 5 | Korelacja między zmiennymi | `corr()`, heatmapa, scatter matrix |
| 6 | Wartości odstające | IQR method, Z-score |
| 7 | Grupowanie i agregacje | `groupby()`, porównanie grup |
| 8 | Test hipotez | t-test, ANOVA, p-wartość |

---

## 💡 Fragment kodu — przykład ze startera

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Wczytanie danych
df = pd.read_csv("student_performance.csv")

print(f"Liczba studentów: {len(df)}")
df.head()

# Statystyki opisowe
print(df.describe())

# Zadanie 2: Miary tendencji centralnej
print(f"Średnia z egzaminu końcowego: {df['final_score'].mean():.2f}")
print(f"Mediana: {df['final_score'].median():.2f}")
print(f"Odchylenie standardowe: {df['final_score'].std():.2f}")

# Zadanie 4: Histogram wyników
plt.figure(figsize=(10, 6))
plt.hist(df['final_score'], bins=30, edgecolor='black', alpha=0.7)
plt.xlabel('Wynik końcowy')
plt.ylabel('Liczba studentów')
plt.title('Rozkład wyników egzaminu końcowego')
plt.axvline(df['final_score'].mean(), color='red', linestyle='--', label=f'Średnia: {df["final_score"].mean():.1f}')
plt.legend()
plt.show()

# Zadanie 5: Korelacja
correlation_matrix = df[['study_hours', 'attendance_rate', 'midterm_score', 'final_score']].corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Macierz korelacji')
plt.show()
```

---

## 🎯 Czego się nauczysz

Po wykonaniu całego notebooka będziesz wiedzieć:

- Jak **szybko** zrozumieć nowy zbiór danych (EDA — Exploratory Data Analysis)
- Jak interpretować **boxplot** i wykrywać wartości odstające
- Czym jest **korelacja** i dlaczego korelacja ≠ przyczynowość
- Jak sprawdzić, czy różnica między grupami jest **statystycznie istotna**

---

## 🚀 Co dalej?

To była statystyka na stosunkowo małym zbiorze danych. W kolejnych laboratoriach zobaczymy, jak te same techniki działają na **gigabajtach danych** w Apache Spark!

---

<Admonition type="tip" title="Pro tip">
  Zanim zaczniesz trenować model Machine Learning — **zawsze** zrób eksplorację statystyczną! 80% sukcesu ML to zrozumienie danych, nie dobór algorytmu.
</Admonition>
