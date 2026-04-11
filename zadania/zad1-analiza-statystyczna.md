# Zadanie domowe 1: Analiza statystyczna danych rzeczywistych

**Termin:** Do 21.03.2026, 23:59  
**Punktacja:** 10 punktów  
**Poziom trudności:** ⭐⭐ (Podstawowy-Średni)

---

## 🎯 Cel zadania

Zastosowanie statystyki opisowej i wizualizacji do analizy rzeczywistego zbioru danych. Nauczysz się interpretować miary statystyczne i wyciągać wnioski z danych.

---

## 📋 Zadanie

Pobierz dowolny zbiór danych z [Kaggle](https://www.kaggle.com/datasets) (np. o sprzedaży, zdrowiu, sporcie, pogodzie) zawierający **co najmniej 1000 rekordów** i **5 zmiennych numerycznych**.

Wykonaj pełną analizę statystyczną w Jupyter Notebook:

### Część 1: Eksploracja (3 pkt)
- Wczytaj dane i wyświetl podstawowe informacje (`info()`, `describe()`)
- Sprawdź brakujące wartości i zduplikowane rekordy
- Oblicz miary tendencji centralnej (średnia, mediana, moda) dla min. 3 zmiennych

### Część 2: Wizualizacja (4 pkt)
- Stwórz **3 histogramy** pokazujące rozkłady kluczowych zmiennych
- Narysuj **boxplot** dla min. 2 zmiennych (porównaj grupy lub wykryj outliers)
- Wygeneruj **heatmapę korelacji** między zmiennymi numerycznymi

### Część 3: Wnioski (3 pkt)
- Zidentyfikuj wartości odstające (outliers) i wyjaśnij dlaczego są nietypowe
- Opisz co najmniej **2 interesujące wzorce** w danych
- Zaproponuj **1 hipotezę**, którą można przetestować na podstawie danych

---

## 📦 Wymagania techniczne

- Notebook musi być wykonany w **Google Colab** lub Jupyter Notebook
- Używaj bibliotek: `pandas`, `numpy`, `matplotlib`, `seaborn`
- Kod musi być czytelny z komentarzami
- Każdy wykres musi mieć tytuł, etykiety osi i legendę (jeśli dotyczy)

---

## 📤 Forma oddania

1. Wyeksportuj notebook jako **PDF** (w Colab: File > Print > Save as PDF)
2. Prześlij na platformę e-learningową przed terminem
3. Nazwa pliku: `zad1_statystyka_NAZWISKO_IMIE.pdf`

---

## 🏆 Kryteria oceny

| Kryterium | Punkty |
|-----------|--------|
| Poprawność obliczeń statystycznych | 3 pkt |
| Jakość i różnorodność wizualizacji | 4 pkt |
| Głębokość wniosków i interpretacji | 3 pkt |
| **Razem** | **10 pkt** |

---

## 💡 Wskazówki

- Nie kopiuj kodu 1:1 z laboratorium — dostosuj go do swojego datasetu
- Jeśli widzisz coś dziwnego w danych (np. wiek = 200 lat) — to jest właśnie outlier!
- Dobra wizualizacja mówi więcej niż 1000 liczb — poświęć czas na estetykę wykresów
- Korelacja ≠ przyczynowość (pamiętaj o tym w wnioskach!)

---

## ❓ FAQ

**Q: Czy mogę użyć danych z poprzedniego laboratorium?**  
A: Nie, pobierz nowy zbiór z Kaggle lub UCI ML Repository.

**Q: Ile wykresów muszę mieć?**  
A: Minimum 3 histogramy + 1 boxplot + 1 heatmapa korelacji = 5 wykresów.

**Q: Co jeśli mój dataset ma mniej niż 5 zmiennych numerycznych?**  
A: Wybierz inny dataset lub zastosuj encoding (np. OneHotEncoding) do zmiennych kategorycznych.

---

Powodzenia! 🚀
