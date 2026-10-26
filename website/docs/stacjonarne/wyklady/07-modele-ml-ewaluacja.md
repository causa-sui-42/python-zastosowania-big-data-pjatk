---
id: 07-modele-ml-ewaluacja
title: "Wykład 7: Modele ML — klasyfikacja, regresja i ewaluacja"
sidebar_label: "07 — Modele ML"
description: "Algorytmy klasyfikacji i regresji w scikit-learn, bias-variance tradeoff, metryki ewaluacji i cross-validation."
---

import Admonition from '@theme/Admonition';

# Wykład 7: Modele ML — klasyfikacja, regresja i ewaluacja

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

**Zajęcia nr 7** — 17.11.2026 (wtorek)

---

## 🎯 Czego się nauczysz

Po tym wykładzie będziesz wiedzieć:

- Czym różni się **klasyfikacja** od **regresji** i kiedy stosować którą
- Jak działają koncepcyjnie: **Logistic Regression**, **Decision Tree**, **Random Forest**, **Gradient Boosting**
- Czym różnią się **parametry** od **hiperparametrów** modelu
- Co to jest **bias-variance tradeoff** i jak rozpoznać overfitting/underfitting
- Jak ewaluować klasyfikację: **accuracy, precision, recall, F1, ROC-AUC**, confusion matrix
- Jak ewaluować regresję: **MAE, RMSE, R²**
- Jak korzystać z **cross-validation** i `GridSearchCV` do wiarygodnej oceny i strojenia modeli
- Jakich pułapek unikać (data leakage, niezbalansowane klasy, nieuczciwe porównania modeli)

---

## ✅ Materiały do wykładu

<Admonition type="tip" title="Slajdy do pobrania">
  Slajdy z tego wykładu są dostępne w formacie Markdown (Marp). Możesz je otworzyć bezpośrednio lub wyeksportować do PDF.
</Admonition>

📄 **[Otwórz slajdy PDF](/stacjonarne/pdfs/wyk07-modele-ml-ewaluacja.pdf)**

---

## 🗂️ Zakres wykładu

### 1. Klasyfikacja vs regresja

| | Klasyfikacja | Regresja |
|---|---|---|
| Co przewidujemy | Kategorię (klasę) | Liczbę ciągłą |
| Przykład | `churn` (0/1) | Liczba wizyt/miesiąc |
| Typowe algorytmy | Logistic Regression, Decision Tree, Random Forest | Linear Regression, Decision Tree Regressor |
| Metryki | accuracy, precision, recall, F1, ROC-AUC | MAE, RMSE, R² |

### 2. Przegląd algorytmów

| Algorytm | Idea | Odporność na overfitting |
|----------|------|---------------------------|
| **Logistic Regression** | Funkcja sigmoidalna nad liniową kombinacją cech | Wysoka |
| **Decision Tree** | Seria pytań if/else prowadzących do liścia | Niska (bez ograniczeń) |
| **Random Forest** | Wiele drzew + głosowanie/średnia | Wysoka |
| **Gradient Boosting** | Drzewa trenowane sekwencyjnie, poprawiające błędy poprzednich | Średnia |

```python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier

model = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)
model.fit(X_train, y_train)
```

### 3. Parametry vs hiperparametry

**Hiperparametry** (np. `n_estimators`, `max_depth`) ustala się **przed** treningiem. **Parametry** (np. współczynniki, `feature_importances_`) model uczy się sam podczas `fit()`.

### 4. Bias-variance tradeoff

Zbyt prosty model → **underfitting** (wysoki bias). Zbyt złożony model → **overfitting** (wysoka wariancja — świetnie działa na train, słabo na test).

```python
print(f"Train accuracy: {model.score(X_train, y_train):.2%}")
print(f"Test accuracy:  {model.score(X_test, y_test):.2%}")
```

### 5. Ewaluacja klasyfikacji

| Metryka | Wzór | Kiedy priorytet |
|---------|------|------------------|
| **Accuracy** | $(TP+TN)/(TP+TN+FP+FN)$ | Zbalansowane klasy |
| **Precision** | $TP/(TP+FP)$ | FP kosztowny |
| **Recall** | $TP/(TP+FN)$ | FN kosztowny (np. churn) |
| **F1-score** | Średnia harmoniczna precision i recall | Kompromis |
| **ROC-AUC** | Pole pod krzywą ROC | Ranking jakości niezależny od progu |

```python
from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix

print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))
print(f"ROC-AUC: {roc_auc_score(y_test, probs):.3f}")
```

### 6. Ewaluacja regresji

```python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

mae = mean_absolute_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred, squared=False)
r2 = r2_score(y_test, y_pred)
```

### 7. Cross-validation i strojenie hiperparametrów

```python
from sklearn.model_selection import cross_val_score, GridSearchCV

scores = cross_val_score(model, X, y, cv=5, scoring="f1")

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid={"n_estimators": [100, 200], "max_depth": [5, 10]},
    cv=5,
    scoring="f1",
)
grid_search.fit(X_train, y_train)
```

### 8. Częste pułapki

- **Data leakage** — dopasowywanie scalera przed podziałem train/test
- **Niezbalansowane klasy** — accuracy myli, użyj `class_weight="balanced"` lub F1/recall
- **Nieuczciwe porównania** — zawsze ten sam `random_state` i podział danych dla wszystkich modeli

---

## 🧠 Pytania do przemyślenia

:::note Przemyśl to 🤔
1. Model ma 99% accuracy, ale tylko 1% klientów faktycznie rezygnuje — czy to dobry model? Dlaczego?
2. Kiedy zależy Ci bardziej na recall niż na precision — i odwrotnie?
3. Dlaczego cross-validation daje bardziej wiarygodny obraz jakości niż pojedynczy `train_test_split`?
:::

---

## 📚 Polecane materiały

- [scikit-learn: Model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [scikit-learn: Cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html)
- [Google ML Crash Course — Classification](https://developers.google.com/machine-learning/crash-course/classification)
- Książka: *"Hands-On Machine Learning"* — Aurélien Géron (rozdziały o klasyfikacji i ewaluacji)

---

## ➡️ Co dalej?

Na dzisiejszych **ćwiczeniach** zbudujesz model przewidujący rezygnacje klientów siłowni 🏋️ — od baseline `LogisticRegression`, przez `RandomForestClassifier`, aż po strojenie hiperparametrów z `GridSearchCV` i analizę krzywej ROC.

Na **Wykładzie 8 (24.11.2026)** przechodzimy do **Spark MLlib — od podstaw po tuning hiperparametrów** — ten sam pipeline (features → model → ewaluacja), ale na danych, które nie mieszczą się na jednym komputerze!

Semestr: Zimowy 2026/2027
