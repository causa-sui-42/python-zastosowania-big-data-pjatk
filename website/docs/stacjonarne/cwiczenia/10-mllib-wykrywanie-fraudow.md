---
id: 10-mllib-wykrywanie-fraudow
title: "Lab 10: MLlib — Wykrywanie fraudów transakcji"
sidebar_label: "Lab 10 — MLlib Fraud Detection"
description: "Tuning hiperparametrów w Spark MLlib (ParamGridBuilder, CrossValidator, GBTClassifier, weightCol) do wykrywania fraudów na ~500 000 transakcji kartą płatniczą."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 10: MLlib — Wykrywanie fraudów transakcji kartą płatniczą

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

Pracujesz jako data scientist w firmie **CardShield** 💳🕵️, dostawcy systemów antyfraudowych dla banków. Masz ~500 000 transakcji, z których tylko 1-2% to fraudy — klasyczny przypadek **class imbalance** w skali Big Data.

Po wykonaniu ćwiczenia będziesz potrafić:

- Zbudować `Pipeline` MLlib i dostroić go automatycznie przy pomocy `ParamGridBuilder` + `CrossValidator`
- Wybrać właściwą metrykę ewaluacji (AUC-PR) dla mocno niezbalansowanych danych
- Zastosować ważenie klas (`weightCol`) jako alternatywę dla undersamplingu
- Wytrenować i porównać `RandomForestClassifier` z `GBTClassifier`
- Wyciągnąć najlepsze hiperparametry z modelu wybranego przez `CrossValidator`
- Zapisać i wczytać wytrenowany `PipelineModel`
- Policzyć macierz konfuzji przy niestandardowym progu decyzyjnym

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-10-mllib-wykrywanie-fraudow.ipynb">📥 <strong>Pobierz: cw-10-mllib-wykrywanie-fraudow.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Zbiór danych jest **generowany proceduralnie** wewnątrz notebooka (nie trzeba niczego pobierać) — dzięki temu ćwiczenie działa identycznie w Google Colab i lokalnie.

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne transakcje kartą płatniczą |
| Liczba rekordów | ~500 000 transakcji |
| Kolumny | `transaction_id`, `amount`, `hour`, `transaction_country`, `card_country`, `merchant_category`, `transactions_last_hour`, `is_fraud` (0/1) |
| Fraud rate | ~1-2% (mocno niezbalansowany zbiór) |
| Korelacje | Inny kraj transakcji niż karty, wysoka kwota, kategoria `kasyno_online` oraz duża liczba transakcji w ostatniej godzinie zwiększają prawdopodobieństwo fraudu |
| Generowanie | Losowe wartości z realistycznymi wagami prawdopodobieństwa (`random.seed(42)`) |

> 💡 Dlaczego syntetyczne dane? Bo pozwala to każdemu studentowi pracować na **identycznym** zbiorze, bez zależności od zewnętrznych plików czy internetu, przy zachowaniu realistycznej skali Big Data i realistycznego class imbalance.

---

## 📋 Zadania

Notebook zawiera **guided example** (Pipeline + `CrossValidator` z `RandomForestClassifier`) oraz **7 ćwiczeń + bonus**:

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Pipeline + CrossValidator + ParamGridBuilder, ewaluacja areaUnderPR | `ParamGridBuilder`, `CrossValidator`, `BinaryClassificationEvaluator` |
| 1 | Podział na zbiór treningowy i testowy | `randomSplit([0.7, 0.3], seed=42)`, `.cache()` |
| 2 | AUC-ROC vs AUC-PR | `BinaryClassificationEvaluator`, analiza wyniku |
| 3 | Ważenie klas | `weightCol`, inverse class frequency |
| 4 | `GBTClassifier` + `CrossValidator` | `GBTClassifier`, `ParamGridBuilder` |
| 5 | Ekstrakcja najlepszych hiperparametrów | `CrossValidatorModel.bestModel` |
| 6 | Zapis i odczyt `PipelineModel` | `.write().save()`, `PipelineModel.load()` |
| 7 | Macierz konfuzji przy niestandardowym progu | `vector_to_array`, próg 0.3 |
| 🏆 Bonus | Analiza kosztowo-korzyściowa progu decyzyjnego | koszt FP vs FN, porównanie progów |

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki bez błędów
- [ ] Ukończyłem/am co najmniej 5 z 7 ćwiczeń
- [ ] Testy automatyczne przechodzą (✅) dla ukończonych ćwiczeń

<Admonition type="tip" title="Pro tip">
  `CrossValidator` na 500k wierszy z `GBTClassifier` może potrwać kilka minut — zawsze cache'uj `train_df` przed `.fit()`, żeby uniknąć wielokrotnego przeliczania danych!
</Admonition>

Semestr: Zimowy 2026/2027
