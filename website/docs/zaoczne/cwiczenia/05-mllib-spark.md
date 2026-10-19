---
id: 05-mllib-spark
title: "Lab 5: MLlib — budowanie modeli ML na dużych zbiorach"
sidebar_label: "Lab 5 — MLlib Spark"
description: "Spark MLlib: VectorAssembler, Pipelines, klasyfikacja churn, CrossValidator, tuning hiperparametrów."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 5: MLlib — budowanie modeli ML na dużych zbiorach

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni–Zaawansowany &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Cel ćwiczenia

Pracujesz jako data scientist w **TelekomPL** 📱 — największym operatorze telekomunikacyjnym. Zarząd chce przewidzieć, którzy klienci odejdą (churn). Masz 500 000 rekordów — za dużo na scikit-learn, czas na Spark MLlib!

Po wykonaniu ćwiczenia będziesz potrafić:

- Przygotować dane z `StringIndexer`, `OneHotEncoder`, `VectorAssembler`
- Budować **ML Pipelines** w Spark
- Trenować modele: `LogisticRegression`, `RandomForest`, `GBT`
- Ewaluować z `BinaryClassificationEvaluator` (AUC)
- Tuningować hiperparametry z `CrossValidator` + `ParamGridBuilder`

---

## � Pobierz notebook

<DownloadLink href="/zaoczne/notebooks/cw-05-mllib-spark-large-datasets.ipynb">📥 <strong>Pobierz: cw-05-mllib-spark-large-datasets.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

| Atrybut | Wartość |
|---------|---------|
| Źródło | TelekomPL — dane o klientach 📱 |
| Liczba rekordów | ~500 000 klientów |
| Target | `churn` (0/1, ~25% churn) |
| Features | age, tenure, charges, contract, internet, support tickets, payment |

---

## 📋 Zadania

| Nr | Temat | Techniki |
|----|-------|----------|
| 1 | Eksploracja danych | `printSchema`, `describe`, churn distribution |
| 2 | StringIndexer i OneHotEncoder | Kodowanie 4 kolumn kategorycznych |
| 3 | VectorAssembler i Pipeline | Preprocessing Pipeline |
| 4 | Pierwszy model | train/test split, `LogisticRegression` |
| 5 | Ewaluacja | AUC, accuracy, F1, confusion matrix |
| 6 | Porównanie modeli | `DecisionTree`, `RandomForest`, `GBT` |
| 7 | CrossValidator tuning | `ParamGridBuilder`, 3-fold CV |
| 🌟 | Bonus: Feature Importance | Top 10 features + matplotlib + save/load model |
