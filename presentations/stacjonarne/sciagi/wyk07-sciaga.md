---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 7: Modele ML — klasyfikacja, regresja, ewaluacja'
footer: 'PJATK | Python w Zastosowaniach Big Data | Studia stacjonarne'
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 12.5px;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 { font-size: 1.25em; color: #2d5986; margin: 0 0 6px 0; }
  h2 { font-size: 0.95em; color: #2d5986; margin: 5px 0 2px 0; border-bottom: 2px solid #2d5986; padding-bottom: 1px; }
  .cols { display: flex; gap: 18px; }
  .col { flex: 1; }
  ul { margin: 2px 0 5px 0; padding-left: 15px; }
  li { margin-bottom: 1px; }
  code { font-size: 0.82em; background: #f0f2f5; padding: 0 3px; border-radius: 3px; }
---

# 🎯 Wykład 7 — Modele ML: klasyfikacja, regresja, ewaluacja

<div class="cols">
<div class="col">

## Klasyfikacja vs regresja
- **Klasyfikacja** → etykiety dyskretne (tak/nie, kategoria)
- **Regresja** → wartości ciągłe (cena, temperatura)

## Algorytmy
- **Logistic Regression** — liniowy, interpretowalny baseline
- **Decision Tree** — podatny na overfitting bez `max_depth`
- **Random Forest** — wiele drzew + głosowanie/uśrednianie
- **Gradient Boosting** — drzewa sekwencyjne, każde poprawia poprzednie

## Parametry vs hiperparametry
- **Parametry** — uczone przez model (wagi)
- **Hiperparametry** — ustawiane przez nas (`max_depth`, `n_estimators`)

## Bias-variance tradeoff
- **Underfitting** — model zbyt prosty (słabo na train i test)
- **Overfitting** — model "wykuł" dane treningowe (świetnie na train, słabo na test)

</div>
<div class="col">

## Metryki klasyfikacji
```
precision = TP / (TP + FP)   # ile "tak" było faktycznie "tak"
recall    = TP / (TP + FN)   # ile faktycznych "tak" wykryto
F1 = 2 · (precision · recall) / (precision + recall)
```
- **ROC-AUC** — jakość rankingu/separacji klas
- **Confusion matrix** — TP, FP, TN, FN w jednej tabeli
- Accuracy **myli** przy niezbalansowanych klasach!

## Kiedy recall > precision?
- Gdy przeoczenie (FN) jest groźniejsze niż fałszywy alarm (FP) — np. wykrywanie chorób, fraudów

## Metryki regresji
- **MAE** — średni błąd bezwzględny
- **RMSE** — karze **duże** błędy mocniej (kwadrat)
- **R²** — % wariancji wyjaśnionej przez model (bliżej 1.0 = lepiej)

## Walidacja modelu
- **Cross-validation** (k-fold) — bardziej wiarygodne niż jeden `train_test_split`
- `GridSearchCV` — przeszukuje siatkę hiperparametrów

</div>
</div>
