---
id: 04-ml-data-preparation
title: "Lab 4: Przygotowanie danych i modele ML z scikit-learn"
sidebar_label: "Lab 4 — ML Data Preparation"
description: "Czyszczenie brudnych danych, feature engineering, budowanie i ewaluacja modeli ML z scikit-learn."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 4: Przygotowanie danych i modele ML z scikit-learn

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Cel ćwiczenia

Wcielisz się w rolę junior data scientist w **HealthTech Polska** ❤️ — startupie budującym system przewidywania ryzyka chorób serca. Surowe dane medyczne są brudne i niekompletne — Twoim zadaniem jest je oczyścić, przygotować features i zbudować model ML.

Po wykonaniu ćwiczenia będziesz potrafić:

- Eksplorować i identyfikować problemy w brudnych danych
- Obsługiwać brakujące wartości z `SimpleImputer`
- Czyścić niespójne kategorie i outliers
- Tworzyć nowe features (encoding, skalowanie, nowe kolumny)
- Budować i porównywać modele ML z `scikit-learn`
- Ewaluować modele: confusion matrix, ROC, feature importance

---

## � Pobierz notebook

<DownloadLink href="/notebooks/cw-04-ml-data-preparation-scikit-learn.ipynb">📥 <strong>Pobierz: cw-04-ml-data-preparation-scikit-learn.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

| Atrybut | Wartość |
|---------|---------|
| Źródło | HealthTech Polska — dane medyczne pacjentów ❤️ |
| Liczba rekordów | ~5 000 pacjentów |
| Problemy | Brakujące wartości, niespójne kodowanie, outliers, mieszane typy |
| Target | `heart_disease` (0/1) |

---

## 📋 Zadania

| Nr | Temat | Techniki |
|----|-------|----------|
| 1 | Eksploracja brudnych danych | `info()`, `describe()`, `isnull().sum()` |
| 2 | Obsługa brakujących wartości | `SimpleImputer`, median/mode |
| 3 | Czyszczenie danych | Naprawianie kategorii, usuwanie outliers (IQR) |
| 4 | Feature Engineering | `OneHotEncoder`, `pd.cut()`, nowe kolumny |
| 5 | Skalowanie i Pipeline | `StandardScaler`, `ColumnTransformer`, `Pipeline` |
| 6 | Budowanie modeli | `LogisticRegression`, `DecisionTree`, `RandomForest` |
| 7 | Ewaluacja i analiza | Confusion matrix, ROC, feature importance |
| 🌟 | Bonus: Cross-validation | `GridSearchCV`, najlepsze hiperparametry |
