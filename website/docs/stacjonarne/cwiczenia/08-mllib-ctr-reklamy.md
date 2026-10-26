---
id: 08-mllib-ctr-reklamy
title: "Lab 8: MLlib — Predykcja CTR reklam + Wykrywanie fraudów (tuning)"
sidebar_label: "Lab 8 — MLlib CTR + Fraud Detection"
description: "Budowa pełnego ML Pipeline w Spark MLlib (StringIndexer, OneHotEncoder, VectorAssembler, LogisticRegression, RandomForestClassifier) do predykcji CTR (Część A), a następnie tuning hiperparametrów (ParamGridBuilder, CrossValidator, GBTClassifier, weightCol) do wykrywania fraudów transakcji kartą płatniczą (Część B)."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 8: MLlib — Predykcja CTR reklam + Wykrywanie fraudów (tuning hiperparametrów)

**Czas trwania:** ~180 minut (2× ~90 minut) &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

To laboratorium łączy dwa powiązane tematy ML w Spark MLlib w jednym notebooku:

- **Część A — Predykcja CTR reklam 📱🖱️:** pracujesz jako data scientist w agencji reklamowej **AdBoost**. Zespół sprzedaży chce wiedzieć, które reklamy mają największe szanse na kliknięcie, zanim jeszcze zostaną wyświetlone. Masz ~300 000 wyświetleń reklam — zbyt dużo, by wygodnie iterować w scikit-learn, czas na Spark MLlib!
- **Część B — Wykrywanie fraudów 💳🕵️:** pracujesz jako data scientist w firmie **CardShield**, dostawcy systemów antyfraudowych dla banków. Masz ~500 000 transakcji, z których tylko 1-2% to fraudy — klasyczny przypadek **class imbalance** w skali Big Data, tuningowany przy pomocy `CrossValidator`.

Po wykonaniu ćwiczenia będziesz potrafić:

**Część A:**
- Zakodować zmienne kategoryczne przy pomocy `StringIndexer` i `OneHotEncoder`
- Zbudować pełny `Pipeline` MLlib (preprocessing + model)
- Wytrenować i porównać `LogisticRegression` oraz `RandomForestClassifier`
- Ewaluować model za pomocą `BinaryClassificationEvaluator` (AUC) i `MulticlassClassificationEvaluator` (accuracy, precision, recall)
- Zapisać i wczytać wytrenowany model MLlib

**Część B:**
- Zbudować `Pipeline` MLlib i dostroić go automatycznie przy pomocy `ParamGridBuilder` + `CrossValidator`
- Wybrać właściwą metrykę ewaluacji (AUC-PR) dla mocno niezbalansowanych danych
- Zastosować ważenie klas (`weightCol`) jako alternatywę dla undersamplingu
- Wytrenować i porównać `RandomForestClassifier` z `GBTClassifier`
- Wyciągnąć najlepsze hiperparametry z modelu wybranego przez `CrossValidator`
- Policzyć macierz konfuzji przy niestandardowym progu decyzyjnym

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-08-mllib-ctr-reklamy.ipynb">📥 <strong>Pobierz: cw-08-mllib-ctr-reklamy.ipynb</strong></DownloadLink>

---

## 📦 Zbiory danych

Obie części generują dane **proceduralnie** wewnątrz notebooka (nie trzeba niczego pobierać) — dzięki temu ćwiczenie działa identycznie w Google Colab i lokalnie. Część B generuje **własny, niezależny** zbiór danych — nie korzysta z danych Części A.

### Część A — wyświetlenia reklam (CTR)

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne wyświetlenia reklam (Click-Through Rate) |
| Liczba rekordów | ~300 000 wyświetleń |
| Kolumny | `impression_id`, `ad_category`, `time_of_day`, `device_type` (`mobile`/`desktop`/`tablet`), `ad_position` (`top`/`middle`/`bottom`), `age_group`, `day_of_week`, `clicked` (0/1) |
| Korelacje | Pozycja `top` i urządzenie `mobile` mają wyższy CTR — model powinien to wychwycić |
| Generowanie | Losowe kategorie z realistycznymi wagami prawdopodobieństwa (`random.seed(42)`) |

### Część B — transakcje kartą płatniczą (fraud)

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne transakcje kartą płatniczą |
| Liczba rekordów | ~500 000 transakcji |
| Kolumny | `transaction_id`, `amount`, `hour`, `transaction_country`, `card_country`, `merchant_category`, `transactions_last_hour`, `is_fraud` (0/1) |
| Fraud rate | ~1-2% (mocno niezbalansowany zbiór) |
| Korelacje | Inny kraj transakcji niż karty, wysoka kwota, kategoria `kasyno_online` oraz duża liczba transakcji w ostatniej godzinie zwiększają prawdopodobieństwo fraudu |
| Generowanie | Losowe wartości z realistycznymi wagami prawdopodobieństwa (`random.seed(42)`) |

> 💡 Dlaczego syntetyczne dane? Bo pozwala to każdemu studentowi pracować na **identycznym** zbiorze, bez zależności od zewnętrznych plików czy internetu, przy zachowaniu realistycznej skali Big Data.

---

## 📋 Zadania

Notebook zawiera dwie części, każda z własnym **guided example** i zestawem ćwiczeń.

### Część A: MLlib — Predykcja kliknięć w reklamy (CTR) (guided example + 7 ćwiczeń + bonus)

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Pipeline: StringIndexer + OneHotEncoder + VectorAssembler + LogisticRegression + AUC | `Pipeline`, `BinaryClassificationEvaluator` |
| A1 | Podział na zbiór treningowy i testowy | `randomSplit([0.7, 0.3], seed=42)` |
| A2 | Model `RandomForestClassifier` | `RandomForestClassifier`, `Pipeline` |
| A3 | Porównanie AUC obu modeli | `BinaryClassificationEvaluator` |
| A4 | Ekstrakcja ważności cech (feature importances) | `featureImportances`, `RandomForestClassificationModel` |
| A5 | Accuracy, precision, recall | `MulticlassClassificationEvaluator` |
| A6 | Analiza predykcji | `.select()`, `.groupBy()` na kolumnie `prediction` |
| A7 | Wpływ pozycji reklamy na CTR modelu | `.groupBy("ad_position").agg(...)` |
| A🏆 | Bonus: zapis i odczyt wytrenowanego Pipeline | `PipelineModel.save()` / `.load()` |

### Część B: MLlib — Wykrywanie fraudów i tuning hiperparametrów (guided example + 7 ćwiczeń + bonus)

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Pipeline + CrossValidator + ParamGridBuilder, ewaluacja areaUnderPR | `ParamGridBuilder`, `CrossValidator`, `BinaryClassificationEvaluator` |
| B1 | Podział na zbiór treningowy i testowy | `randomSplit([0.7, 0.3], seed=42)`, `.cache()` |
| B2 | AUC-ROC vs AUC-PR | `BinaryClassificationEvaluator`, analiza wyniku |
| B3 | Ważenie klas | `weightCol`, inverse class frequency |
| B4 | `GBTClassifier` + `CrossValidator` | `GBTClassifier`, `ParamGridBuilder` |
| B5 | Ekstrakcja najlepszych hiperparametrów | `CrossValidatorModel.bestModel` |
| B6 | Zapis i odczyt `PipelineModel` | `.write().save()`, `PipelineModel.load()` |
| B7 | Macierz konfuzji przy niestandardowym progu | `vector_to_array`, próg 0.3 |
| B🏆 | Bonus: analiza kosztowo-korzyściowa progu decyzyjnego | koszt FP vs FN, porównanie progów |

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki obu części bez błędów
- [ ] Ukończyłem/am co najmniej 5 z 7 ćwiczeń Części A (CTR)
- [ ] Ukończyłem/am co najmniej 5 z 7 ćwiczeń Części B (Fraud Detection)
- [ ] Testy automatyczne przechodzą (✅) dla ukończonych ćwiczeń

<Admonition type="tip" title="Pro tip">
  `CrossValidator` na 500k wierszy z `GBTClassifier` w Części B może potrwać kilka minut — zawsze cache'uj `train_df` przed `.fit()`, żeby uniknąć wielokrotnego przeliczania danych!
</Admonition>
