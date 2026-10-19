# Zadanie domowe 1: EDA na własnym zbiorze danych

**Poziom trudności:** ⭐⭐ (Podstawowy-Średni)

---

## 🎯 Cel zadania

Zastosowanie statystyki opisowej i wizualizacji do analizy **własnego, samodzielnie wybranego** zbioru danych. Nauczysz się interpretować miary statystyczne i wyciągać wnioski z danych spoza materiałów kursowych.

---

## 📋 Zadanie

Pobierz dowolny zbiór danych z [Kaggle](https://www.kaggle.com/datasets) lub [UCI ML Repository](https://archive.ics.uci.edu/) (np. o sprzedaży, zdrowiu, muzyce, filmach, pogodzie — **inny niż statystyki maratonów z laboratorium**) zawierający **co najmniej 1000 rekordów** i **5 zmiennych numerycznych**.

Wykonaj pełną eksploracyjną analizę danych (EDA) w Jupyter Notebook (Google Colab):

### Część 1: Eksploracja
- Wczytaj dane i wyświetl podstawowe informacje (`info()`, `describe()`, `shape`)
- Sprawdź brakujące wartości i zduplikowane rekordy
- Oblicz miary tendencji centralnej (średnia, mediana, moda) dla min. 3 zmiennych

### Część 2: Miary rozproszenia i outliery
- Oblicz wariancję, odchylenie standardowe i kwantyle (Q1, Q2, Q3) dla min. 2 zmiennych
- Wykryj wartości odstające metodą IQR i wypisz je jako osobny DataFrame

### Część 3: Wizualizacja
- Stwórz **3 histogramy** pokazujące rozkłady kluczowych zmiennych
- Narysuj **boxplot** dla min. 2 zmiennych (porównaj grupy lub wykryj outliery)
- Wygeneruj **heatmapę korelacji** między zmiennymi numerycznymi

### Część 4: Wnioski
- Zidentyfikuj wartości odstające (outliers) i wyjaśnij, dlaczego są nietypowe
- Opisz co najmniej **2 interesujące wzorce** w danych
- Zaproponuj **1 hipotezę**, którą można przetestować na podstawie danych, i — opcjonalnie — sprawdź ją testem t (`scipy.stats.ttest_ind`) poznanym na końcu Wykładu 1

---

## 📦 Wymagania techniczne

- Notebook musi być wykonany w **Google Colab** lub Jupyter Notebook
- Używaj bibliotek: `pandas`, `numpy`, `matplotlib`, `seaborn`
- Kod musi być czytelny, z komentarzami po polsku
- Każdy wykres musi mieć tytuł, etykiety osi i legendę (jeśli dotyczy)

---

## 💡 Wskazówki

- Nie kopiuj kodu 1:1 z laboratorium — dostosuj go do swojego datasetu
- Jeśli widzisz coś dziwnego w danych (np. wiek = 200 lat) — to jest właśnie outlier!
- Dobra wizualizacja mówi więcej niż 1000 liczb — poświęć czas na estetykę wykresów
- Korelacja ≠ przyczynowość (pamiętaj o tym we wnioskach!)
- Zawsze porównuj średnią i medianę — duża różnica sygnalizuje skośność danych

---

## ❓ FAQ

**Q: Czy mogę użyć danych o maratonach z laboratorium?**
A: Nie, wybierz zupełnie inny temat i pobierz nowy zbiór z Kaggle lub UCI ML Repository.

**Q: Ile wykresów muszę mieć?**
A: Minimum 3 histogramy + 1 boxplot + 1 heatmapa korelacji = 5 wykresów.

**Q: Co jeśli mój dataset ma mniej niż 5 zmiennych numerycznych?**
A: Wybierz inny dataset lub zastosuj encoding (np. OneHotEncoding) do zmiennych kategorycznych.

**Q: Czy muszę znaleźć outliery, jeśli w moich danych ich nie ma?**
A: Prawie każdy realny zbiór danych ma jakieś nietypowe wartości — poszukaj dokładnie metodą IQR, zanim uznasz, że ich brak.

---

Powodzenia! 🚀
