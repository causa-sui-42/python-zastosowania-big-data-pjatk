---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 6: Feature Engineering'
footer: 'PJATK | Python w Zastosowaniach Big Data | Studia stacjonarne'
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 13px;
    padding: 18px 26px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 { font-size: 1.3em; color: #2d5986; margin: 0 0 6px 0; }
  h2 { font-size: 1.0em; color: #2d5986; margin: 6px 0 2px 0; border-bottom: 2px solid #2d5986; padding-bottom: 1px; }
  .cols { display: flex; gap: 20px; }
  .col { flex: 1; }
  ul { margin: 2px 0 6px 0; padding-left: 16px; }
  li { margin-bottom: 2px; }
  code { font-size: 0.82em; background: #f0f2f5; padding: 0 3px; border-radius: 3px; }
---

# 🛠️ Wykład 6 — Feature Engineering

<div class="cols">
<div class="col">

## Miejsce w ML workflow
`Dane surowe → EDA → Feature Engineering → Model → Ewaluacja`
— często **najważniejszy** krok całego procesu!

## Braki danych
```python
SimpleImputer(strategy="median")      # numeryczne (odporne na outliery)
SimpleImputer(strategy="most_frequent") # kategoryczne
```

## Encoding
| Encoder | Kiedy używać |
|---|---|
| `OneHotEncoder` | kategorie **nominalne** (kraj, kolor) |
| `OrdinalEncoder` | kategorie **porządkowe** (brąz<srebro<złoto) |
| `LabelEncoder` | zwykle do kodowania **targetu/etykiety** |

## Skalowanie
- `StandardScaler` — średnia 0, odch. std. 1
- `MinMaxScaler` — skaluje do zakresu [0, 1]

</div>
<div class="col">

## Nowe cechy
- **Ratio feature**: `kda_per_hour = kda / godziny`
- **Binning**: `pd.cut(df["wiek"], bins=[0,18,35,60,100])`
- `PolynomialFeatures(degree=2)` — interakcje i nieliniowość

## Pipeline + ColumnTransformer
```python
ct = ColumnTransformer([
    ("num", StandardScaler(), num_cols),
    ("cat", OneHotEncoder(), cat_cols),
    ("ord", OrdinalEncoder(categories=[...]), ord_cols),
])
pipe = Pipeline([("prep", ct), ("model", LogisticRegression())])
pipe.fit(X_train, y_train)
```

## Data leakage — jak unikać
1. `train_test_split()` **najpierw**
2. `scaler.fit(X_train)` — tylko na treningu!
3. `scaler.transform(X_train)` **i** `scaler.transform(X_test)`

## Niezbalansowane klasy
- Accuracy **myli** przy imbalance (np. 99% to "zawsze przewiduj większość")
- Strategie: `class_weight="balanced"`, undersampling, oversampling (SMOTE)

</div>
</div>
