# Zadanie domowe 8: Model klasyfikacyjny na własnym zbiorze danych

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
