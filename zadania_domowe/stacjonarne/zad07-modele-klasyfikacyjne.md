# Zadanie domowe 7: Model klasyfikacyjny na własnym zbiorze danych

**Poziom trudności:** ⭐⭐⭐⭐ (Zaawansowany)

---

## 🎯 Cel zadania

Utrwalenie budowy i **uczciwej ewaluacji** modelu klasyfikacyjnego poprzez zastosowanie poznanych technik na **samodzielnie wybranym** zbiorze danych — innym niż rezygnacje klientów siłowni z laboratorium.

---

## 📋 Zadanie

Wybierz dowolny zbiór danych z **binarnym targetem** (klasyfikacja 0/1), np.:

- Rezygnacja klientów innej branży (bank, telekom, streaming) — inny niż na zajęciach
- Wykrywanie spamu / fałszywych recenzji
- Predykcja niewypłacalności kredytowej
- Klasyfikacja wyniku meczu (wygrana/przegrana drużyny gospodarzy)
- Dowolny inny zbiór z [Kaggle](https://www.kaggle.com/datasets) lub wygenerowany syntetycznie — **inny niż wykorzystany na zajęciach**

Wykonaj w Jupyter Notebook (Google Colab, scikit-learn) następujące kroki:

### Część 1: Przygotowanie i baseline (min. 1 model)
- Podziel dane na train/test (`train_test_split`, `stratify=y`, `random_state=42`)
- Zbuduj `Pipeline` z preprocessingiem (skalowanie/encoding) i `LogisticRegression` jako baseline
- Wypisz `classification_report` i confusion matrix

### Część 2: Model bardziej złożony
- Wytrenuj **drugi** model (`RandomForestClassifier` lub `GradientBoostingClassifier`) na tym samym podziale danych
- Porównaj accuracy, precision, recall, F1 obu modeli w jednej tabeli

### Część 3: Cross-validation
- Wykonaj 5-fold cross-validation (`cross_val_score`) dla lepszego modelu z Części 2
- Wypisz średnią i odchylenie standardowe wyniku (`scoring="f1"`)

### Część 4: Krzywa ROC i AUC
- Narysuj krzywą ROC dla lepszego modelu
- Policz i zinterpretuj AUC (1-2 zdania: czy model jest lepszy od losowego zgadywania?)

### Część 5: Refleksja (Markdown, 3-5 zdań)
- Który model wybrałbyś do wdrożenia produkcyjnego i dlaczego?
- Czy Twoje klasy są zbalansowane? Jeśli nie — jak to wpłynęło na wybór metryki?

---

## 📦 Wymagania techniczne

- Notebook w Google Colab lub lokalnym Jupyter z `scikit-learn`, `pandas`, `matplotlib`
- Dane wczytane z pliku CSV/URL lub wygenerowane proceduralnie (`np.random.seed(42)` dla powtarzalności)
- Kod z komentarzami wyjaśniającymi wybór metryk i modeli
- Krótkie podsumowanie wniosków (Markdown) na końcu notebooka

---

## 💡 Wskazówki

- `train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)` — Twoja podstawowa mantra przy klasyfikacji
- Jeśli klasy są mocno niezbalansowane, rozważ `class_weight="balanced"`
- `classification_report(y_test, y_pred)` daje Ci precision/recall/F1 za jednym razem
- Dokumentacja: [scikit-learn: Model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html)

---

## 💡 Rozwiązanie krok po kroku (przykład)

<details>
<summary><strong>📖 Kliknij, aby zobaczyć pełne przykładowe rozwiązanie (na przykładowym zbiorze danych)</strong></summary>

Poniższy przykład pokazuje pełne rozwiązanie **wszystkich części** zadania na przykładowym, syntetycznym zbiorze danych `churn_telekom` (rezygnacje klientów operatora telekomunikacyjnego). Twoje zadanie dotyczy **innego, samodzielnie wybranego** zbioru — potraktuj poniższy kod jako wzorzec do adaptacji, nie do kopiowania 1:1.

### Krok 0: Generowanie przykładowego zbioru danych

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, roc_auc_score

np.random.seed(42)
n = 2000

df = pd.DataFrame({
    "staz_miesiace": np.random.randint(1, 72, n),
    "miesieczna_oplata": np.random.normal(70, 25, n).round(2).clip(10, 200),
    "liczba_zgloszen_serwisowych": np.random.poisson(1.5, n),
    "typ_umowy": np.random.choice(["miesieczna", "roczna", "dwuletnia"], n, p=[0.5, 0.3, 0.2]),
    "uslugi_dodatkowe": np.random.choice(["brak", "internet", "internet+tv"], n, p=[0.3, 0.4, 0.3]),
})

# Target skorelowany z cechami + szum, tak by klasyfikacja miała sens (nie była trywialna)
logit = (-0.03 * df["staz_miesiace"] + 0.02 * df["miesieczna_oplata"]
         + 0.4 * df["liczba_zgloszen_serwisowych"]
         + (df["typ_umowy"] == "miesieczna").astype(int) * 1.2 - 1.5)
prawdopodobienstwo = 1 / (1 + np.exp(-logit))
df["rezygnacja"] = (np.random.random(n) < prawdopodobienstwo).astype(int)
print(df["rezygnacja"].value_counts(normalize=True))
```

### Krok 1: Przygotowanie i baseline (Część 1)

```python
X = df.drop(columns=["rezygnacja"])
y = df["rezygnacja"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

cechy_numeryczne = ["staz_miesiace", "miesieczna_oplata", "liczba_zgloszen_serwisowych"]
cechy_kategoryczne = ["typ_umowy", "uslugi_dodatkowe"]

preprocessor = ColumnTransformer([
    ("num", StandardScaler(), cechy_numeryczne),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cechy_kategoryczne),
])

baseline = Pipeline([
    ("preprocessing", preprocessor),
    ("model", LogisticRegression(max_iter=1000, class_weight="balanced")),
])
baseline.fit(X_train, y_train)
y_pred_baseline = baseline.predict(X_test)

print(classification_report(y_test, y_pred_baseline))
print("Confusion matrix:\n", confusion_matrix(y_test, y_pred_baseline))
```
Wyjaśnienie: `class_weight="balanced"` kompensuje niezrównoważenie klas (rezygnacji jest zwykle mniej niż lojalnych klientów), nadając większą wagę mniejszościowej klasie podczas uczenia.

### Krok 2: Model bardziej złożony (Część 2)

```python
model_rf = Pipeline([
    ("preprocessing", preprocessor),
    ("model", RandomForestClassifier(n_estimators=300, class_weight="balanced", random_state=42)),
])
model_rf.fit(X_train, y_train)
y_pred_rf = model_rf.predict(X_test)

from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

porownanie = pd.DataFrame({
    "model": ["LogisticRegression", "RandomForest"],
    "accuracy": [accuracy_score(y_test, y_pred_baseline), accuracy_score(y_test, y_pred_rf)],
    "precision": [precision_score(y_test, y_pred_baseline), precision_score(y_test, y_pred_rf)],
    "recall": [recall_score(y_test, y_pred_baseline), recall_score(y_test, y_pred_rf)],
    "f1": [f1_score(y_test, y_pred_baseline), f1_score(y_test, y_pred_rf)],
})
print(porownanie)
```

### Krok 3: Cross-validation (Część 3)

```python
wyniki_cv = cross_val_score(model_rf, X_train, y_train, cv=5, scoring="f1")
print(f"F1 (5-fold CV): średnia={wyniki_cv.mean():.3f}, odch. std.={wyniki_cv.std():.3f}")
```

### Krok 4: Krzywa ROC i AUC (Część 4)

```python
y_proba_rf = model_rf.predict_proba(X_test)[:, 1]
fpr, tpr, progi = roc_curve(y_test, y_proba_rf)
auc = roc_auc_score(y_test, y_proba_rf)

plt.figure(figsize=(6, 5))
plt.plot(fpr, tpr, label=f"RandomForest (AUC = {auc:.3f})")
plt.plot([0, 1], [0, 1], linestyle="--", color="gray", label="Losowe zgadywanie (AUC = 0.5)")
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("Krzywa ROC — predykcja rezygnacji klienta")
plt.legend()
plt.show()

print(f"AUC = {auc:.3f}")
```
**Interpretacja:** AUC powyżej 0.5 oznacza, że model lepiej rozróżnia klasy niż losowe zgadywanie; wartość bliska 0.85–0.9 (typowa dla tego syntetycznego przykładu) wskazuje na dobrą zdolność dyskryminacyjną modelu.

### Krok 5: Refleksja (Część 5, przykładowa odpowiedź Markdown)

Do wdrożenia produkcyjnego wybrałbym **RandomForestClassifier**, ponieważ osiąga wyższe F1 i AUC niż baseline, radząc sobie lepiej z nieliniowymi zależnościami (np. interakcją typu umowy ze stażem klienta). Klasy w tym zbiorze są umiarkowanie niezbalansowane (ok. 25–30% rezygnacji) — dlatego oceniałem modele głównie metryką **F1 i AUC**, a nie samym accuracy, które przy niezbalansowanych klasach byłoby mylące (model "zawsze przewiduj brak rezygnacji" miałby wysokie accuracy, ale zerową użyteczność biznesową).

</details>

---

## 🔥 Zadanie bonusowe (opcjonalnie)

Użyj `GridSearchCV` do strojenia co najmniej jednego hiperparametru lepszego modelu (np. `max_depth`, `n_estimators`) i porównaj wynik F1 przed i po strojeniu.

---

## ❓ FAQ

**Q: Czy mogę użyć tego samego zbioru danych, co w poprzednich zadaniach domowych?**
A: Nie — celem jest przećwiczenie budowy i ewaluacji modelu na **nowych** danych, żeby sprawdzić, czy rozumiesz koncepcję, a nie tylko kopiujesz kod.

**Q: Czy muszę mieć duży zbiór danych (jak na zajęciach — 6 000 wierszy)?**
A: Nie, kilkaset-kilka tysięcy rekordów w zupełności wystarczy, żeby poprawnie zademonstrować budowę i ewaluację modelu klasyfikacyjnego.

**Q: Co jeśli mój zbiór danych ma więcej niż 2 klasy (multiclass)?**
A: To też jest w porządku — użyj `average="macro"` w `precision_score`/`recall_score`/`f1_score` i pomiń krzywą ROC (albo policz ją per klasa, opcjonalnie).

---

Powodzenia! 🏋️📊
