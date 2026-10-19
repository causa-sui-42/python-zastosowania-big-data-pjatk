---
id: 09-mllib-ctr-reklamy
title: "Lab 9: MLlib — Predykcja kliknięć w reklamy (CTR)"
sidebar_label: "Lab 9 — MLlib CTR"
description: "Budowa pełnego ML Pipeline w Spark MLlib (StringIndexer, OneHotEncoder, VectorAssembler, LogisticRegression, RandomForestClassifier) do predykcji kliknięć w reklamy na ~300 000 wyświetleń."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 9: MLlib — Predykcja kliknięć w reklamy (CTR)

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Zaawansowany &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

Pracujesz jako data scientist w agencji reklamowej **AdBoost** 📱🖱️. Zespół sprzedaży chce wiedzieć, które reklamy mają największe szanse na kliknięcie — zanim jeszcze zostaną wyświetlone. Masz ~300 000 wyświetleń reklam — zbyt dużo, by wygodnie iterować w scikit-learn, czas na Spark MLlib!

Po wykonaniu ćwiczenia będziesz potrafić:

- Wygenerować i przygotować duży zbiór danych bezpośrednio jako Spark DataFrame
- Zakodować zmienne kategoryczne przy pomocy `StringIndexer` i `OneHotEncoder`
- Zbudować pełny `Pipeline` MLlib (preprocessing + model)
- Wytrenować i porównać `LogisticRegression` oraz `RandomForestClassifier`
- Ewaluować model za pomocą `BinaryClassificationEvaluator` (AUC) i `MulticlassClassificationEvaluator` (accuracy, precision, recall)
- Zapisać i wczytać wytrenowany model MLlib

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-09-mllib-ctr-reklamy.ipynb">📥 <strong>Pobierz: cw-09-mllib-ctr-reklamy.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Zbiór danych jest **generowany proceduralnie** wewnątrz notebooka (nie trzeba niczego pobierać) — dzięki temu ćwiczenie działa identycznie w Google Colab i lokalnie.

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne wyświetlenia reklam (Click-Through Rate) |
| Liczba rekordów | ~300 000 wyświetleń |
| Kolumny | `impression_id`, `ad_category`, `time_of_day`, `device_type` (`mobile`/`desktop`/`tablet`), `ad_position` (`top`/`middle`/`bottom`), `age_group`, `day_of_week`, `clicked` (0/1) |
| Korelacje | Pozycja `top` i urządzenie `mobile` mają wyższy CTR — model powinien to wychwycić |
| Generowanie | Losowe kategorie z realistycznymi wagami prawdopodobieństwa (`random.seed(42)`) |

> 💡 Dlaczego syntetyczne dane? Bo pozwala to każdemu studentowi pracować na **identycznym** zbiorze, bez zależności od zewnętrznych plików czy internetu, przy zachowaniu realistycznej skali Big Data.

---

## 📋 Zadania

Notebook zawiera **guided example** (pełny Pipeline z `LogisticRegression`) oraz **7 ćwiczeń + bonus**:

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Pipeline: StringIndexer + OneHotEncoder + VectorAssembler + LogisticRegression + AUC | `Pipeline`, `BinaryClassificationEvaluator` |
| 1 | Podział na zbiór treningowy i testowy | `randomSplit([0.7, 0.3], seed=42)` |
| 2 | Model `RandomForestClassifier` | `RandomForestClassifier`, `Pipeline` |
| 3 | Porównanie AUC obu modeli | `BinaryClassificationEvaluator` |
| 4 | Ekstrakcja ważności cech (feature importances) | `featureImportances`, `RandomForestClassificationModel` |
| 5 | Accuracy, precision, recall | `MulticlassClassificationEvaluator` |
| 6 | Analiza predykcji | `.select()`, `.groupBy()` na kolumnie `prediction` |
| 7 | Wpływ pozycji reklamy na CTR modelu | `.groupBy("ad_position").agg(...)` |
| 🏆 Bonus | Zapis i odczyt wytrenowanego Pipeline | `PipelineModel.save()` / `.load()` |

---

## ✅ Kryteria zaliczenia

- [ ] Uruchomiłem/am wszystkie komórki bez błędów
- [ ] Ukończyłem/am co najmniej 5 z 7 ćwiczeń
- [ ] Testy automatyczne przechodzą (✅) dla ukończonych ćwiczeń

<Admonition type="tip" title="Pro tip">
  Zanim uzupełnisz `# TODO` dla `RandomForestClassifier`, przypomnij sobie z guided example, jak wygląda struktura `Pipeline` — zmieniasz tylko ostatni stage!
</Admonition>
