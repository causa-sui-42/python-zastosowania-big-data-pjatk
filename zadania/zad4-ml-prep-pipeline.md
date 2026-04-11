# 📝 Zadanie domowe 4 — ML Data Preparation Pipeline

**Termin:** Przed wykładem 5 (17.05.2026)  
**Szacowany czas:** 25-30 minut  
**Cel:** Przygotowanie danych i budowa prostego modelu ML

---

## 🎯 Zadanie: Przewidywanie cen mieszkań 🏠

Masz dataset z cenami mieszkań. Twoim zadaniem jest przygotować dane i zbudować model predykcyjny.

### Setup

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# Wygeneruj lub załaduj dane
np.random.seed(42)
n = 200

data = {
    'powierzchnia_m2': np.random.randint(30, 150, n),
    'liczba_pokoi': np.random.randint(1, 6, n),
    'pietro': np.random.randint(0, 15, n),
    'rok_budowy': np.random.randint(1960, 2025, n),
    'dzielnica': np.random.choice(['Śródmieście', 'Mokotów', 'Praga', 'Ursynów', 'Bemowo'], n),
    'parking': np.random.choice([0, 1], n),
}

# Cena = funkcja cech + szum
df = pd.DataFrame(data)
df['cena_tys'] = (
    df['powierzchnia_m2'] * 10 +
    df['liczba_pokoi'] * 50 +
    (2025 - df['rok_budowy']) * -2 +
    df['parking'] * 100 +
    np.random.randn(n) * 50
)
```

### Zadania do wykonania

#### 1. 🧹 Preprocessing (4 punkty)
- [ ] Sprawdź i obsłuż brakujące wartości (dodaj kilka losowych `NaN` do testów)
- [ ] Zakoduj kolumnę kategoryczną `dzielnica` (OneHotEncoder lub pandas get_dummies)
- [ ] Przeskaluj cechy numeryczne (StandardScaler)

#### 2. 🔧 Feature Engineering (3 punkty)
- [ ] Stwórz nową cechę: `wiek_budynku` = 2026 - `rok_budowy`
- [ ] Stwórz `powierzchnia_na_pokoj` = `powierzchnia_m2 / liczba_pokoi`
- [ ] (Opcjonalnie) Dodaj interakcję: `pietro_x_parking`

#### 3. 🤖 Model Training (2 punkty)
- [ ] Podziel dane na train/test (80/20)
- [ ] Wytrenuj `RandomForestRegressor` lub `LinearRegression`

#### 4. 📊 Ewaluacja (1 punkt)
- [ ] Oblicz MAE (Mean Absolute Error)
- [ ] Oblicz R² score
- [ ] Wyświetl 5 predykcji vs rzeczywiste wartości

---

## ✅ Oczekiwany wynik

```
📊 Wyniki modelu:
MAE: 124.5 tys PLN
R²: 0.87

Przykładowe predykcje:
Rzeczywista: 850k | Predykcja: 823k | Błąd: 27k
Rzeczywista: 620k | Predykcja: 641k | Błąd: 21k
...
```

---

## 📤 Jak wysłać?

Stwórz notebook `zadanie4_imie_nazwisko.ipynb` i wyślij na platformę kursową.

**Bonus:** 🌟 Porównaj 3 różne modele (LinearRegression, RandomForest, GradientBoosting) i wybierz najlepszy!

---

## 💡 Wskazówki

- Użyj `df.isnull().sum()` do sprawdzenia brakujących wartości
- `pd.get_dummies()` to szybki sposób na OneHotEncoding
- Nie zapomnij o `train_test_split(random_state=42)` dla powtarzalności!

Powodzenia! 🏡📈
