---
id: 08-churn-silownia-klasyfikacja
title: "Lab 8: Klasyfikacja — Rezygnacje klientów siłowni"
sidebar_label: "Lab 8 — Klasyfikacja ML"
description: "Budowa i ewaluacja modeli klasyfikacyjnych (Logistic Regression, Random Forest) przewidujących rezygnacje klientów siłowni."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 8: Klasyfikacja — Rezygnacje klientów siłowni

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

Wcielisz się w rolę data scientista w sieci siłowni fitness 🏋️‍♀️, która chce przewidywać, którzy klienci wkrótce **zrezygnują z członkostwa** (churn). Na syntetycznym zbiorze ~6 000 klientów zbudujesz i porównasz kilka modeli klasyfikacyjnych, a następnie ocenisz je uczciwie za pomocą odpowiednich metryk.

Po wykonaniu ćwiczenia będziesz potrafić:

- Budować `Pipeline` łączący preprocessing z modelem klasyfikacyjnym
- Trenować i porównywać `LogisticRegression` oraz `RandomForestClassifier`
- Czytać confusion matrix i `classification_report`
- Rysować krzywą ROC i liczyć AUC
- Stosować k-fold cross-validation do wiarygodnej oceny modelu
- Stroić hiperparametry przy pomocy `GridSearchCV`
- Analizować feature importance i kompromis precision/recall poprzez threshold tuning
- Radzić sobie z niezbalansowanymi klasami (`class_weight`, oversampling)

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-08-churn-silownia-klasyfikacja.ipynb">📥 <strong>Pobierz: cw-08-churn-silownia-klasyfikacja.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Zbiór danych jest **generowany proceduralnie** wewnątrz notebooka (nie trzeba niczego pobierać) — dzięki temu ćwiczenie działa identycznie w Google Colab i lokalnie.

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne dane rezygnacji klientów siłowni |
| Liczba rekordów | ~6 000 klientów |
| Kolumny | `wiek`, `plec`, `dlugosc_czlonkostwa_mies`, `wizyty_miesiecznie`, `ocena_satysfakcji`, `liczba_zamrozen`, `zajecia_grupowe` (bool), `churn` (0/1, target) |
| Generowanie | Cechy skorelowane z `churn` + losowy szum (`np.random.seed(42)`) |

> 💡 Dlaczego syntetyczne dane? Bo pozwala to każdemu studentowi pracować na **identycznym** zbiorze, bez zależności od zewnętrznych plików czy internetu.

---

## 📋 Zadania

Notebook zawiera **guided example** (baseline `LogisticRegression` w `Pipeline`) oraz **6-8 ćwiczeń + bonus**:

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Baseline — Logistic Regression + preprocessing | `Pipeline`, `confusion_matrix`, `classification_report` |
| 1 | Trening `RandomForestClassifier` i porównanie z baseline | `RandomForestClassifier`, metryki |
| 2 | Krzywa ROC i AUC | `roc_curve`, `roc_auc_score`, `matplotlib` |
| 3 | K-fold cross-validation | `cross_val_score`, `cv=5` |
| 4 | Strojenie hiperparametrów | `GridSearchCV`, `param_grid` |
| 5 | Feature importance | `feature_importances_`, wykres słupkowy |
| 6 | Threshold tuning — kompromis precision/recall | `predict_proba`, własny próg decyzyjny |
| 7 | Interpretacja błędów modelu | analiza FP/FN na przykładach |
| 🏆 Bonus | Niezbalansowane klasy | `class_weight="balanced"`, oversampling |

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki bez błędów
- [ ] Ukończyłem/am co najmniej 6 z 8 ćwiczeń
- [ ] Testy automatyczne przechodzą (✅) dla ukończonych ćwiczeń

<Admonition type="tip" title="Pro tip">
  Zanim zaczniesz strojenie hiperparametrów w `GridSearchCV`, upewnij się, że rozumiesz, dlaczego `cross_val_score` na baseline daje bardziej wiarygodny wynik niż pojedynczy `train_test_split` — to fundament, na którym opierają się wszystkie kolejne ćwiczenia.
</Admonition>

Semestr: Zimowy 2026/2027
