# Zadanie domowe 2: Benchmark formatów danych i mini Data Lake

**Poziom trudności:** ⭐⭐ (Podstawowy-Średni)

---

## 🎯 Cel zadania

Samodzielne porównanie formatów zapisu danych i zaprojektowanie prostego, partycjonowanego **mini Data Lake** na wybranym zbiorze danych — tak, żeby typowe zapytania czytały jak najmniej bajtów.

---

## 📋 Zadanie

Wybierz **własny zbiór danych** inny niż przejazdy hulajnogami z laboratorium — publiczny (np. Kaggle, dane.gov.pl, NYC Taxi) lub wygenerowany syntetycznie w NumPy. Zbiór musi mieć **co najmniej 1 000 000 wierszy** i **co najmniej 6 kolumn**, w tym przynajmniej jedną kolumnę z datą lub kategorią nadającą się do partycjonowania.

Wykonaj pełną analizę w Jupyter Notebook:

### Część 1: Benchmark formatów
- Zapisz dane jako **CSV**, **JSON Lines** i **Parquet** (co najmniej 2 różne kodeki kompresji)
- Dla każdego wariantu zmierz **rozmiar pliku** i **czas zapisu/odczytu**
- Przedstaw wyniki w tabeli (DataFrame) i na **wykresie słupkowym**

### Część 2: Optymalizacja pamięci
- Zmierz zużycie RAM (`memory_usage(deep=True)`) przed i po optymalizacji typów danych (`category`, mniejsze typy liczbowe, `datetime64`)
- Porównaj czas odczytu **wszystkich kolumn** z odczytem **tylko 2–3 kolumn** (column pruning)

### Część 3: Mini Data Lake
- Zaproponuj **typowe zapytanie biznesowe** do swoich danych (np. „przychód per miesiąc w danym regionie”)
- Zapisz dane z **partycjonowaniem** dobranym pod to zapytanie (`partition_cols=`) i uzasadnij wybór kolumny
- Wykonaj zapytanie z użyciem `filters=` i porównaj czas z odczytem całego, niepartycjonowanego pliku
- Policz, ile plików powstało i jaki jest ich średni rozmiar — czy grozi Ci **problem małych plików**?

### Część 4: Wnioski
- Napisz krótkie podsumowanie (5–7 zdań): jaki format, kompresję i partycjonowanie wybrałbyś dla tych danych w produkcji i dlaczego?

---

## 📦 Wymagania techniczne

- Notebook musi być wykonany w **Google Colab** lub Jupyter Notebook
- Używaj bibliotek: `pandas`, `pyarrow`, `numpy`, `matplotlib` (lub `seaborn`)
- Do pomiaru czasu używaj `time.perf_counter()` (lub `%timeit`)
- Kod musi być czytelny, z komentarzami wyjaśniającymi kluczowe kroki
- Każdy wykres musi mieć tytuł i etykiety osi

---

## 💡 Wskazówki

- Do rozmiaru katalogu z partycjami: `sum(p.stat().st_size for p in Path(katalog).rglob("*.parquet"))`
- Pierwszy odczyt pliku bywa wolniejszy (cache systemu plików) — zmierz czas kilka razy i weź medianę
- Nie partycjonuj po kolumnie z tysiącami unikalnych wartości (np. `user_id`) — to prosta droga do problemu małych plików
- Jeśli generujesz dane syntetycznie, użyj `np.random.default_rng(seed)` z ustalonym ziarnem

---

## 🔥 Zadanie bonusowe

Wykonaj to samo zapytanie biznesowe w **DuckDB** bezpośrednio na partycjonowanych plikach Parquet (`read_parquet('katalog/**/*.parquet', hive_partitioning = true)`) i porównaj czas z wersją w pandas.

---

## 💡 Rozwiązanie krok po kroku (przykład)

<details>
<summary><strong>📖 Kliknij, aby zobaczyć pełne przykładowe rozwiązanie (na przykładowym zbiorze danych)</strong></summary>

Poniższy przykład pokazuje pełne rozwiązanie **wszystkich części** zadania na przykładowym, syntetycznym zbiorze danych `transakcje_sklepow` (transakcje w sieci sklepów — data, region, kategoria, kwota...). Twoje zadanie dotyczy **innego, samodzielnie wybranego** zbioru — potraktuj poniższy kod jako wzorzec do adaptacji, nie do kopiowania 1:1.

### Krok 0: Generowanie przykładowego zbioru danych (≥ 1 000 000 wierszy)

```python
import numpy as np
import pandas as pd
import time
from pathlib import Path
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)
n = 1_500_000  # min. 1 000 000 wierszy wymagane przez zadanie

regiony = np.array(["Mazowieckie", "Slaskie", "Malopolskie", "Wielkopolskie", "Pomorskie"])
kategorie = np.array(["Elektronika", "Spozywcze", "Odziez", "Kosmetyki", "Dom i ogrod"])

daty = pd.date_range("2023-01-01", "2024-12-31", freq="h")
df = pd.DataFrame({
    "id_transakcji": np.arange(n),
    "data": rng.choice(daty, n),
    "region": rng.choice(regiony, n),
    "kategoria": rng.choice(kategorie, n),
    "kwota": rng.gamma(shape=2.0, scale=50.0, size=n).round(2),
    "liczba_produktow": rng.integers(1, 10, n),
})
print(df.shape)
```

### Krok 1: Benchmark formatów (Część 1)

```python
katalog = Path("benchmark_dane")
katalog.mkdir(exist_ok=True)

wyniki = []

def zmierz_zapis_odczyt(nazwa, zapis_fn, odczyt_fn):
    t0 = time.perf_counter()
    sciezka = zapis_fn()
    t_zapis = time.perf_counter() - t0

    t0 = time.perf_counter()
    odczyt_fn(sciezka)
    t_odczyt = time.perf_counter() - t0

    rozmiar_mb = Path(sciezka).stat().st_size / (1024 ** 2) if Path(sciezka).is_file() else \
        sum(p.stat().st_size for p in Path(sciezka).rglob("*")) / (1024 ** 2)
    wyniki.append({"format": nazwa, "rozmiar_MB": round(rozmiar_mb, 2),
                    "czas_zapisu_s": round(t_zapis, 3), "czas_odczytu_s": round(t_odczyt, 3)})

zmierz_zapis_odczyt("CSV",
    lambda: (df.to_csv(katalog / "dane.csv", index=False), katalog / "dane.csv")[-1],
    lambda s: pd.read_csv(s))

zmierz_zapis_odczyt("JSON Lines",
    lambda: (df.to_json(katalog / "dane.jsonl", orient="records", lines=True), katalog / "dane.jsonl")[-1],
    lambda s: pd.read_json(s, orient="records", lines=True))

zmierz_zapis_odczyt("Parquet (snappy)",
    lambda: (df.to_parquet(katalog / "dane_snappy.parquet", compression="snappy"), katalog / "dane_snappy.parquet")[-1],
    lambda s: pd.read_parquet(s))

zmierz_zapis_odczyt("Parquet (gzip)",
    lambda: (df.to_parquet(katalog / "dane_gzip.parquet", compression="gzip"), katalog / "dane_gzip.parquet")[-1],
    lambda s: pd.read_parquet(s))

wyniki_df = pd.DataFrame(wyniki)
print(wyniki_df)

wyniki_df.plot(x="format", y=["rozmiar_MB"], kind="bar", title="Rozmiar pliku wg formatu", legend=False)
plt.ylabel("MB")
plt.show()
wyniki_df.plot(x="format", y=["czas_zapisu_s", "czas_odczytu_s"], kind="bar", title="Czas zapisu/odczytu wg formatu")
plt.ylabel("sekundy")
plt.show()
```
Wyjaśnienie: Parquet jest kolumnowy i skompresowany, więc zwykle wygrywa objętością i czasem odczytu z CSV/JSONL; `gzip` daje mniejszy plik niż `snappy` kosztem wolniejszej (de)kompresji — to klasyczny kompromis rozmiar vs. szybkość.

### Krok 2: Optymalizacja pamięci (Część 2)

```python
pamiec_przed = df.memory_usage(deep=True).sum() / (1024 ** 2)

df_opt = df.copy()
df_opt["region"] = df_opt["region"].astype("category")
df_opt["kategoria"] = df_opt["kategoria"].astype("category")
df_opt["liczba_produktow"] = df_opt["liczba_produktow"].astype("int8")
df_opt["data"] = pd.to_datetime(df_opt["data"])

pamiec_po = df_opt.memory_usage(deep=True).sum() / (1024 ** 2)
print(f"Pamięć przed: {pamiec_przed:.1f} MB, po optymalizacji: {pamiec_po:.1f} MB "
      f"(oszczędność {100 * (1 - pamiec_po / pamiec_przed):.1f}%)")

df_opt.to_parquet(katalog / "dane_opt.parquet")

# Column pruning: odczyt wszystkich kolumn vs tylko 2-3 potrzebnych
t0 = time.perf_counter()
pd.read_parquet(katalog / "dane_opt.parquet")
czas_wszystkie = time.perf_counter() - t0

t0 = time.perf_counter()
pd.read_parquet(katalog / "dane_opt.parquet", columns=["region", "kwota"])
czas_wybrane = time.perf_counter() - t0

print(f"Odczyt wszystkich kolumn: {czas_wszystkie:.3f}s, odczyt 2 kolumn: {czas_wybrane:.3f}s")
```
Wyjaśnienie: `category` i mniejsze typy liczbowe (`int8`) radykalnie zmniejszają zużycie RAM dla kolumn z niewielką liczbą unikalnych wartości. Format kolumnowy Parquet pozwala też czytać tylko wybrane kolumny — to tzw. column pruning, niemożliwe w CSV/JSONL bez wczytania całego wiersza.

### Krok 3: Mini Data Lake z partycjonowaniem (Część 3)

```python
# Typowe zapytanie biznesowe: "suma kwot transakcji per miesiąc w danym regionie"
df_opt["rok_miesiac"] = df_opt["data"].dt.to_period("M").astype(str)

katalog_partycje = katalog / "data_lake"
df_opt.to_parquet(katalog_partycje, partition_cols=["region"])  # partycjonujemy po regionie, bo filtrujemy per region

# Zapytanie z filters= - czyta tylko partycję Mazowieckie
t0 = time.perf_counter()
wynik_part = pd.read_parquet(katalog_partycje, filters=[("region", "==", "Mazowieckie")])
czas_part = time.perf_counter() - t0

t0 = time.perf_counter()
wynik_full = pd.read_parquet(katalog / "dane_opt.parquet")
wynik_full = wynik_full[wynik_full["region"] == "Mazowieckie"]
czas_full = time.perf_counter() - t0

print(f"Odczyt z partycji: {czas_part:.3f}s vs odczyt całości + filtr: {czas_full:.3f}s")

przychod_per_miesiac = wynik_part.groupby("rok_miesiac")["kwota"].sum()
print(przychod_per_miesiac)

# Sprawdzenie problemu małych plików
pliki = list(katalog_partycje.rglob("*.parquet"))
rozmiary = [p.stat().st_size / 1024 for p in pliki]
print(f"Liczba plików: {len(pliki)}, średni rozmiar: {np.mean(rozmiary):.1f} KB")
```
Wyjaśnienie: Partycjonujemy po `region`, bo to kolumna o małej liczności (5 wartości) i to właśnie po niej filtrujemy w typowym zapytaniu — dzięki temu `filters=` pozwala pandas/pyarrow pominąć całe katalogi partycji (predicate pushdown), zamiast czytać cały zbiór i filtrować w pamięci.

### Krok 4: Wnioski (Część 4)

**Przykładowe podsumowanie (Markdown):** Dla tego zbioru transakcyjnego najlepszym wyborem produkcyjnym byłby **Parquet ze kompresją `snappy`** — daje dobry kompromis między rozmiarem a szybkością odczytu, co jest kluczowe przy częstych zapytaniach analitycznych. Partycjonowanie po `region` (5 unikalnych wartości) ma sens, bo typowe zapytania biznesowe filtrują właśnie po regionie, a liczba plików na partycję pozostaje rozsądna. Partycjonowanie dodatkowo po dniu byłoby już przesadą przy tej skali danych i groziłoby problemem małych plików. `category` dla kolumn tekstowych o niskiej liczności to tania i skuteczna optymalizacja pamięci, którą warto stosować zawsze.

</details>

---

## ❓ FAQ

**Q: Mój zbiór danych nie mieści się w RAM Colaba. Co robić?**  
A: Świetnie — to prawdziwe Big Data! Czytaj CSV w kawałkach (`chunksize=`) i dopisuj kolejne kawałki do Parquet albo zmniejsz próbkę do kilku milionów wierszy.

**Q: Czy muszę używać danych rzeczywistych?**  
A: Nie — dane wygenerowane syntetycznie są w pełni akceptowalne, o ile scenariusz jest realistyczny.

**Q: Wyniki czasowe różnią się przy każdym uruchomieniu. Czy to błąd?**  
A: Nie, to normalne. Powtórz pomiar kilka razy i raportuj medianę — liczą się proporcje, a nie dokładne milisekundy.

---

Powodzenia! 🚀
