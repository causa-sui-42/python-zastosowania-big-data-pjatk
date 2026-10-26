# Zadanie domowe 6: Feature Engineering na własnym zbiorze danych

**Poziom trudności:** ⭐⭐⭐ (Średni)

---

## 🎯 Cel zadania

Utrwalenie technik **feature engineering** poznanych na Wykładzie 6 poprzez zbudowanie kompletnego pipeline'u przygotowania danych (`Pipeline` + `ColumnTransformer`) na **samodzielnie wybranym** zbiorze danych — innym niż statystyki e-sportowe z laboratorium.

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

---

## 💡 Rozwiązanie krok po kroku (przykład)

<details>
<summary><strong>📖 Kliknij, aby zobaczyć pełne przykładowe rozwiązanie (na przykładowym zbiorze danych)</strong></summary>

Poniższy przykład pokazuje pełne rozwiązanie **wszystkich części** zadania na przykładowym, syntetycznym zbiorze danych `studenci` (oceny, frekwencja, kierunek studiów, zdał/nie zdał). Twoje zadanie dotyczy **innego, samodzielnie wybranego** zbioru — potraktuj poniższy kod jako wzorzec do adaptacji, nie do kopiowania 1:1.

### Krok 0: Generowanie przykładowego zbioru danych

```python
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

rng = np.random.default_rng(42)
n = 800

df = pd.DataFrame({
    "srednia_ocen": rng.normal(3.5, 0.7, n).round(2).clip(2.0, 5.0),
    "frekwencja_procent": rng.normal(75, 15, n).round(1).clip(0, 100),
    "liczba_godzin_nauki": rng.integers(0, 30, n),
    "kierunek": rng.choice(["Informatyka", "Matematyka", "Fizyka", "Ekonomia"], n),
    "poziom_zaangazowania": rng.choice(["niski", "sredni", "wysoki"], n, p=[0.3, 0.5, 0.2]),
})
# Wprowadzamy braki danych, żeby ćwiczyć imputację
df.loc[df.sample(40, random_state=1).index, "srednia_ocen"] = np.nan
df.loc[df.sample(30, random_state=2).index, "kierunek"] = np.nan

# Target: zdał (1) / nie zdał (0) - zależny głównie od średniej i frekwencji + trochę szumu
prawdopodobienstwo_zdania = 1 / (1 + np.exp(-(df["srednia_ocen"].fillna(3.5) - 3.0
                                               + (df["frekwencja_procent"] - 70) / 50)))
df["zdal"] = (rng.random(n) < prawdopodobienstwo_zdania).astype(int)
```

### Krok 1: Eksploracja i braki danych (Część 1)

```python
print(df.isnull().sum())
print(df.describe())

# Imputacja - zrobimy ją właściwie wewnątrz Pipeline (Krok 4), tu tylko podgląd strategii
print("Mediana średniej ocen:", df["srednia_ocen"].median())
print("Najczęstszy kierunek:", df["kierunek"].mode()[0])
```
Wyjaśnienie: Imputację wykonujemy docelowo **wewnątrz** `ColumnTransformer`, a nie ręcznie na całym `df` — dzięki temu `fit()` imputera zobaczy tylko dane treningowe (patrz Część 5, unikanie wycieku danych).

### Krok 2: Encoding (Część 2)

```python
# "kierunek" to zmienna nominalna (brak naturalnego porządku) -> OneHotEncoder
# "poziom_zaangazowania" ma naturalny porządek (niski < sredni < wysoki) -> OrdinalEncoder
kolejnosc_zaangazowania = [["niski", "sredni", "wysoki"]]
```

### Krok 3: Nowe cechy (Część 3)

```python
# Cecha typu ratio/interakcja: godziny nauki na punkt procentowy frekwencji
# (uczeń, który dużo się uczy mimo niskiej frekwencji, może kompensować braki)
df["nauka_na_frekwencje"] = df["liczba_godzin_nauki"] / (df["frekwencja_procent"] + 1)

# Cecha typu binning: kategoryzacja średniej ocen na pasma
df["pasmo_ocen"] = pd.cut(df["srednia_ocen"], bins=[0, 3.0, 4.0, 5.01],
                           labels=["slaba", "srednia", "dobra"])
```
Wyjaśnienie: `nauka_na_frekwencje` może pomóc modelowi wychwycić studentów kompensujących niską obecność dodatkową nauką własną. `pasmo_ocen` zamienia ciągłą średnią na dyskretne kategorie, co czasem ułatwia modelom drzewiastym znajdowanie progów decyzyjnych.

### Krok 4: Skalowanie i Pipeline (Część 4)

```python
cechy_numeryczne = ["srednia_ocen", "frekwencja_procent", "liczba_godzin_nauki", "nauka_na_frekwencje"]
cechy_nominalne = ["kierunek", "pasmo_ocen"]
cechy_ordinalne = ["poziom_zaangazowania"]

preprocessor = ColumnTransformer(transformers=[
    ("numeryczne", Pipeline([
        ("imputacja", SimpleImputer(strategy="median")),
        ("skalowanie", StandardScaler()),
    ]), cechy_numeryczne),
    ("nominalne", Pipeline([
        ("imputacja", SimpleImputer(strategy="most_frequent")),
        ("encoding", OneHotEncoder(handle_unknown="ignore")),
    ]), cechy_nominalne),
    ("ordinalne", OrdinalEncoder(categories=kolejnosc_zaangazowania), cechy_ordinalne),
])

pipeline = Pipeline([
    ("preprocessing", preprocessor),
    ("model", RandomForestClassifier(n_estimators=200, random_state=42)),
])
```

### Krok 5: Train/test split bez wycieku danych (Część 5)

```python
X = df.drop(columns=["zdal"])
y = df["zdal"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# fit() wywołujemy TYLKO na danych treningowych - tak buduje się cały Pipeline naraz
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)

print(f"📊 Kształt danych po przygotowaniu: {X_train.shape}")
print(f"🤖 Accuracy: {accuracy_score(y_test, y_pred):.2f}")
print(f"🤖 F1-score: {f1_score(y_test, y_pred):.2f}")

# Najważniejsze cechy z RandomForest
nazwy_cech = pipeline.named_steps["preprocessing"].get_feature_names_out()
istotnosci = pipeline.named_steps["model"].feature_importances_
top_cechy = sorted(zip(nazwy_cech, istotnosci), key=lambda x: -x[1])[:5]
print("🔑 Najważniejsze cechy:")
for nazwa, istotnosc in top_cechy:
    print(f"  {nazwa}: {istotnosc:.3f}")
```
Wyjaśnienie: Ponieważ `preprocessor` jest częścią `Pipeline`, wywołanie `pipeline.fit(X_train, ...)` gwarantuje, że imputer i scaler "uczą się" (np. liczą medianę czy odchylenie standardowe) **wyłącznie** na `X_train`. Na `X_test` wywoływana jest tylko `transform()` (wewnątrz `predict()`), więc żadna informacja ze zbioru testowego nie "przecieka" do treningu.

### Bonus: porównanie z/bez nowych cech

```python
X_bez_nowych = X.drop(columns=["nauka_na_frekwencje", "pasmo_ocen"])
cechy_numeryczne_bazowe = ["srednia_ocen", "frekwencja_procent", "liczba_godzin_nauki"]

preprocessor_bazowy = ColumnTransformer(transformers=[
    ("numeryczne", Pipeline([("imputacja", SimpleImputer(strategy="median")),
                              ("skalowanie", StandardScaler())]), cechy_numeryczne_bazowe),
    ("nominalne", Pipeline([("imputacja", SimpleImputer(strategy="most_frequent")),
                             ("encoding", OneHotEncoder(handle_unknown="ignore"))]), ["kierunek"]),
    ("ordinalne", OrdinalEncoder(categories=kolejnosc_zaangazowania), cechy_ordinalne),
])
pipeline_bazowy = Pipeline([("preprocessing", preprocessor_bazowy),
                             ("model", RandomForestClassifier(n_estimators=200, random_state=42))])

X_train_b, X_test_b, _, _ = train_test_split(X_bez_nowych, y, test_size=0.2, stratify=y, random_state=42)
pipeline_bazowy.fit(X_train_b, y_train)
print(f"F1 bez nowych cech: {f1_score(y_test, pipeline_bazowy.predict(X_test_b)):.2f}")
print(f"F1 z nowymi cechami: {f1_score(y_test, y_pred):.2f}")
```
Wyjaśnienie: Porównanie F1 z i bez nowych cech pokazuje, czy ratio/binning faktycznie dostarczyły modelowi dodatkowej informacji, czy jedynie zwiększyły złożoność bez realnej poprawy — to standardowa praktyka walidacji feature engineeringu.

</details>

---

Powodzenia! 🎮📊
