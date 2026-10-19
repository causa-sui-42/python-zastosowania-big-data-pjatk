---
id: 04-intro-ml-data-preparation
title: "Wykład 4: Wstęp do Machine Learning i przygotowanie danych"
sidebar_label: "04 — Intro ML & Data Prep"
description: "Machine Learning od zera: czyszczenie danych, feature engineering, budowanie modeli z scikit-learn."
---

import Admonition from '@theme/Admonition';
import DocImage from '@site/src/components/DocImage';

# Wykład 4: Wstęp do Machine Learning i przygotowanie danych

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Letni 2025/2026

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Co to jest **Machine Learning** i jakie są jego główne typy (supervised, unsupervised, reinforcement)
- Jak wygląda **pipeline ML**: surowe dane → czyszczenie → feature engineering → model → ewaluacja
- Jak radzić sobie z **brakującymi wartościami**, duplikatami i outlierami
- Jak tworzyć nowe features: **encoding** (OneHot, Label), **skalowanie** (StandardScaler, MinMaxScaler)
- Jak budować modele z **scikit-learn**: klasyfikacja i regresja
- Jak **ewaluować modele**: accuracy, precision, recall, F1, RMSE, R²

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie Markdown (Marp).
</Admonition>

📄 **[Otwórz slajdy PDF](/zaoczne/pdfs/wyk4-intro-ml-data-preparation-intermediate.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Co to jest Machine Learning?

ML to podejście, w którym komputer **uczy się z danych** zamiast być programowany regułami. Trzy główne typy:

| Typ | Opis | Przykład |
|-----|------|---------|
| **Supervised** | Dane z etykietami (y) | Klasyfikacja spam/nie-spam |
| **Unsupervised** | Dane bez etykiet | Segmentacja klientów |
| **Reinforcement** | Uczy się przez próbowanie | Robot grający w szachy |

### 2. Pipeline danych ML

<DocImage src="/img/ml-pipeline.svg" alt="Pipeline Machine Learning" style={{maxWidth: '100%', margin: '1rem 0'}} />

### 3. Przygotowanie danych

- Brakujące wartości: SimpleImputer (mean, median, mode), KNNImputer
- Duplikaty i outliers: IQR, z-score
- Feature Engineering: encoding, skalowanie, tworzenie nowych kolumn

### 4. Budowanie modeli z scikit-learn

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print(f"Accuracy: {model.score(X_test, y_test):.2%}")
```

### 5. Ewaluacja modelu

Metryki klasyfikacji (accuracy, precision, recall, F1) i regresji (MAE, RMSE, R²). Overfitting vs underfitting.

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Dlaczego dzielimy dane na train/test? Co się stanie, jeśli tego nie zrobimy?
2. Kiedy użyjesz StandardScaler, a kiedy MinMaxScaler?
3. Dlaczego accuracy nie zawsze jest dobrą metryką?
:::

---

## 📚 Dalsze czytanie

- [scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)
- [Google ML Crash Course](https://developers.google.com/machine-learning/crash-course)
- Książka: *"Hands-On Machine Learning"* — Aurélien Géron (O'Reilly)

---

## ➡️ Co dalej?

W **Laboratorium 4** przećwiczysz cały pipeline ML na brudnych danych medycznych z HealthTech Polska ❤️. Następnie — **Wykład 5: MLlib w Spark** — skalujemy ML na duże dane!
