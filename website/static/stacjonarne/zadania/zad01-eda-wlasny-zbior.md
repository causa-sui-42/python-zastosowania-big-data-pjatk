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

## 💡 Rozwiązanie krok po kroku (przykład)

<details>
<summary><strong>📖 Kliknij, aby zobaczyć pełne przykładowe rozwiązanie (na przykładowym zbiorze danych)</strong></summary>

Poniższy przykład pokazuje pełne rozwiązanie **wszystkich części** zadania na przykładowym, syntetycznie wygenerowanym zbiorze danych `sklep_internetowy` (zamówienia w sklepie internetowym — cena, ilość, rabat, czas dostawy, wiek klienta, ocena). Twoje zadanie dotyczy **innego, samodzielnie wybranego** zbioru z Kaggle/UCI — potraktuj poniższy kod jako wzorzec do adaptacji, nie do kopiowania 1:1.

### Krok 0: Generowanie przykładowego zbioru danych

Ponieważ zadanie wymaga zbioru **innego** niż materiały kursowe, poniżej generujemy syntetyczny zbiór o realistycznym kształcie (z celowymi outlierami), żeby cały notebook dało się uruchomić w Colabie bez pobierania plików.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Ustalone ziarno losowości -> wyniki powtarzalne dla każdego, kto uruchomi ten notebook
rng = np.random.default_rng(42)
n = 1500  # min. 1000 rekordów wymagane przez zadanie

df = pd.DataFrame({
    "cena": rng.normal(120, 40, n).round(2),
    "ilosc": rng.integers(1, 6, n),
    "rabat_procent": rng.choice([0, 5, 10, 15, 20], n, p=[0.4, 0.25, 0.2, 0.1, 0.05]),
    "czas_dostawy_dni": rng.poisson(3, n) + 1,
    "wiek_klienta": rng.normal(35, 12, n).round(0),
    "ocena": rng.integers(1, 6, n),
})

# Celowe outliery, żeby było co wykrywać w Części 2 i 4 (np. literówka w systemie -> wiek 150 lat)
df.loc[df.sample(5, random_state=1).index, "wiek_klienta"] = [150, 140, -5, 0, 160]
df.loc[df.sample(5, random_state=2).index, "cena"] = [2000, 1800, 0.5, 2200, 1.0]

# Kilka duplikatów i braków, żeby ćwiczyć czyszczenie danych
df = pd.concat([df, df.iloc[:5]], ignore_index=True)  # 5 zduplikowanych rekordów
df.loc[df.sample(20, random_state=3).index, "ocena"] = np.nan
```

### Krok 1: Eksploracja (Część 1)

```python
# Podstawowe informacje o zbiorze - zawsze pierwszy krok każdej EDA
print(df.shape)
df.info()
df.describe()

# Brakujące wartości i duplikaty
print("Braki danych:\n", df.isnull().sum())
print("Liczba duplikatów:", df.duplicated().sum())

# Miary tendencji centralnej dla min. 3 zmiennych
for kolumna in ["cena", "wiek_klienta", "czas_dostawy_dni"]:
    print(f"{kolumna}: średnia={df[kolumna].mean():.2f}, "
          f"mediana={df[kolumna].median():.2f}, "
          f"moda={df[kolumna].mode()[0]:.2f}")
```
Wyjaśnienie: `info()` i `describe()` dają szybki przegląd typów i skali danych. Porównanie średniej z medianą od razu sygnalizuje, czy w danych jest skośność (np. przez outliery wieku/ceny wprowadzone w Kroku 0).

### Krok 2: Miary rozproszenia i outliery (Część 2)

```python
# Wariancja, odchylenie standardowe i kwantyle dla min. 2 zmiennych
for kolumna in ["cena", "wiek_klienta"]:
    q1, q2, q3 = df[kolumna].quantile([0.25, 0.5, 0.75])
    print(f"{kolumna}: wariancja={df[kolumna].var():.2f}, "
          f"odch.std={df[kolumna].std():.2f}, Q1={q1:.2f}, Q2={q2:.2f}, Q3={q3:.2f}")

# Wykrywanie outlierów metodą IQR (reguła 1.5 * IQR)
def znajdz_outliery_iqr(seria: pd.Series) -> pd.Series:
    q1, q3 = seria.quantile([0.25, 0.75])
    iqr = q3 - q1
    dolna_granica = q1 - 1.5 * iqr
    gorna_granica = q3 + 1.5 * iqr
    return (seria < dolna_granica) | (seria > gorna_granica)

maska_outlierow = znajdz_outliery_iqr(df["wiek_klienta"]) | znajdz_outliery_iqr(df["cena"])
outliery = df[maska_outlierow]
print(f"Znaleziono {len(outliery)} outlierów")
outliery.head(10)
```
Wyjaśnienie: Metoda IQR jest odporna na skrajne wartości (w przeciwieństwie np. do reguły "3 odchylenia standardowe od średniej", którą same outliery potrafią zaburzyć). Wyodrębniamy je do osobnego DataFrame, żeby móc je opisać w Części 4.

### Krok 3: Wizualizacja (Część 3)

```python
fig, axes = plt.subplots(1, 3, figsize=(16, 4))
for ax, kolumna in zip(axes, ["cena", "wiek_klienta", "czas_dostawy_dni"]):
    sns.histplot(df[kolumna], bins=30, kde=True, ax=ax)
    ax.set_title(f"Rozkład: {kolumna}")
    ax.set_xlabel(kolumna)
    ax.set_ylabel("Liczba zamówień")
plt.tight_layout()
plt.show()

# Boxplot - świetnie pokazuje outliery i rozstęp międzykwartylowy
fig, axes = plt.subplots(1, 2, figsize=(10, 4))
sns.boxplot(y=df["cena"], ax=axes[0])
axes[0].set_title("Boxplot: cena")
sns.boxplot(y=df["wiek_klienta"], ax=axes[1])
axes[1].set_title("Boxplot: wiek klienta")
plt.tight_layout()
plt.show()

# Heatmapa korelacji między zmiennymi numerycznymi
kolumny_numeryczne = df.select_dtypes(include=np.number).columns
plt.figure(figsize=(7, 5))
sns.heatmap(df[kolumny_numeryczne].corr(), annot=True, cmap="coolwarm", center=0)
plt.title("Macierz korelacji zmiennych numerycznych")
plt.show()
```
Wyjaśnienie: Trzy histogramy pokazują kształt rozkładów (normalny, skośny, dyskretny). Boxploty uwidaczniają te same outliery, które wykryliśmy liczbowo metodą IQR. Heatmapa korelacji pozwala szybko wypatrzyć zmienne, które warto zbadać głębiej (np. test t w Kroku 4).

### Krok 4: Wnioski i test hipotezy (Część 4)

```python
# Hipoteza: klienci, którzy dostali rabat >= 10%, oceniają zamówienie wyżej niż ci bez rabatu
grupa_z_rabatem = df.loc[df["rabat_procent"] >= 10, "ocena"].dropna()
grupa_bez_rabatu = df.loc[df["rabat_procent"] == 0, "ocena"].dropna()

t_stat, p_value = stats.ttest_ind(grupa_z_rabatem, grupa_bez_rabatu, equal_var=False)
print(f"t-statystyka={t_stat:.3f}, p-value={p_value:.4f}")
if p_value < 0.05:
    print("Różnica średnich ocen jest statystycznie istotna (p < 0.05).")
else:
    print("Brak podstaw do odrzucenia hipotezy zerowej (różnica mogła powstać przypadkowo).")
```

**Wnioski (przykład komórki Markdown):**
1. Wartości `wiek_klienta` równe 150, 140, -5, 0 i 160 lat to ewidentne **outliery** — prawdopodobnie błędy wprowadzania danych (np. literówka w systemie zamówień), a nie realni klienci.
2. **Wzorzec 1:** `czas_dostawy_dni` ma rozkład silnie prawostronnie skośny (Poissona) — większość zamówień dociera w 2–4 dni, ale ogon rozkładu sięga znacznie dalej.
3. **Wzorzec 2:** Korelacja między `rabat_procent` a `ocena` jest bliska zeru — rabat sam w sobie nie gwarantuje wyższej oceny zamówienia.
4. Test t z Kroku 4 pokazuje, czy rabat **statystycznie istotnie** wpływa na ocenę — pamiętajmy jednak, że korelacja (lub jej brak) nie dowodzi przyczynowości.

</details>

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
