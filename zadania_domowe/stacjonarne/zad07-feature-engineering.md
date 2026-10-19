# Zadanie domowe 7: Feature Engineering na własnym zbiorze danych

**Poziom trudności:** ⭐⭐⭐ (Średni)

---

## 🎯 Cel zadania

Utrwalenie technik **feature engineering** poznanych na Wykładzie 7 poprzez zbudowanie kompletnego pipeline'u przygotowania danych (`Pipeline` + `ColumnTransformer`) na **samodzielnie wybranym** zbiorze danych — innym niż statystyki e-sportowe z laboratorium.

---

## 📋 Zadanie

Wybierz dowolny zbiór danych zawierający **co najmniej**: 2 kolumny numeryczne, 1 kolumnę kategoryczną (nominalną lub ordinalną) oraz kolumnę celu (`target`) do klasyfikacji lub regresji. Może to być np.:

- Dane o studentach (oceny, frekwencja, kierunek, zdał/nie zdał)
- Dane o klientach sklepu (wiek, wydatki, segment, churn tak/nie)
- Wyniki sportowe drużyny (statystyki meczowe, liga, wygrana/przegrana)
- Dowolny inny zbiór z [Kaggle](https://www.kaggle.com/datasets) — **inny niż wykorzystany na zajęciach**

Wykonaj w Jupyter Notebook (Google Colab) następujące kroki:

### Część 1: Eksploracja i braki danych
- Sprawdź brakujące wartości (`isnull().sum()`) i podstawowe statystyki (`describe()`)
- Uzupełnij braki numeryczne (`SimpleImputer(strategy="median")`) i kategoryczne (`most_frequent`)

### Część 2: Encoding
- Zakoduj **co najmniej jedną** kolumnę kategoryczną jako nominalną (`OneHotEncoder`)
- Jeśli Twój zbiór ma kolumnę z naturalnym porządkiem (np. poziom wykształcenia, ranga, ocena), zakoduj ją jako `OrdinalEncoder` z jawnie podaną kolejnością kategorii

### Część 3: Nowe cechy
- Stwórz **co najmniej 2 nowe cechy**: jedną typu ratio/interakcja (np. `x / y`, `x * y`) i jedną typu binning (`pd.cut()`)
- Krótko uzasadnij (1-2 zdania w komórce Markdown), dlaczego te cechy mogą pomóc modelowi

### Część 4: Skalowanie i Pipeline
- Zbuduj `ColumnTransformer` łączący: imputację + skalowanie (`StandardScaler`) dla cech numerycznych oraz encoding dla cech kategorycznych
- Złóż go w `Pipeline` razem z prostym modelem (`RandomForestClassifier` lub `RandomForestRegressor`)

### Część 5: Train/test split bez wycieku danych
- Podziel dane na `X_train`/`X_test`/`y_train`/`y_test` (`train_test_split(test_size=0.2, random_state=42)`, użyj `stratify=y` dla klasyfikacji)
- Upewnij się, że `fit()` pipeline'u jest wywoływany **tylko** na danych treningowych
- Oceń model na zbiorze testowym (accuracy/F1 dla klasyfikacji, MAE/R² dla regresji)

---

## ✅ Oczekiwany wynik

```
📊 Kształt danych po przygotowaniu: (X, Y)
Braki po imputacji: 0

🤖 Wynik modelu na zbiorze testowym:
Accuracy: 0.84 (lub MAE / R² dla regresji)

🔑 Najważniejsze cechy:
1. cecha_a — 0.32
2. cecha_b — 0.21
...
```

---

## 🌟 Bonus

Porównaj wynik modelu **z** i **bez** nowo utworzonych cech (ratio/binning) — czy feature engineering faktycznie poprawił wynik?

---

## 💡 Wskazówki

- `df.isnull().sum()` — pierwszy krok w każdej eksploracji brakujących danych
- Pamiętaj: `fit_transform()` na `X_train`, ale tylko `transform()` na `X_test` — nigdy odwrotnie!
- `OrdinalEncoder(categories=[[...]])` wymaga podania kolejności kategorii w liście list
- Dokumentacja: [scikit-learn Preprocessing](https://scikit-learn.org/stable/modules/preprocessing.html), [ColumnTransformer](https://scikit-learn.org/stable/modules/compose.html#columntransformer-for-heterogeneous-data)

Powodzenia! 🎮📊
