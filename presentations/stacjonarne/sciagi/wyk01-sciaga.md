---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 1: Statystyka opisowa i EDA'
footer: 'PJATK | Python w Zastosowaniach Big Data | Studia stacjonarne'
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 13.5px;
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

# 📊 Wykład 1 — Statystyka opisowa i EDA

<div class="cols">
<div class="col">

## Podstawowe pojęcia
- **Populacja** (cały zbiór) vs **próba** (podzbiór)
- Zmienna **numeryczna**: ciągła (wzrost) / dyskretna (liczba dzieci)
- Zmienna **kategoryczna**: nominalna (kolor) / porządkowa (ocena)

## Tendencja centralna
- **Średnia** — wrażliwa na outliery
- **Mediana** — odporna na outliery (wartość środkowa)
- **Moda** — wartość najczęstsza

## Rozproszenie
- **Wariancja** / **odchylenie standardowe** (σ)
- **Kwantyle**, **IQR = Q3 − Q1**
- Outlier: poza `[Q1 − 1.5·IQR, Q3 + 1.5·IQR]`

</div>
<div class="col">

## Rozkłady prawdopodobieństwa
- **Normalny** (dzwonowy) — reguła **68-95-99.7%** (1σ/2σ/3σ)
- **Jednostajny** — każda wartość równie prawdopodobna
- **Poissona** — liczba zdarzeń w czasie
- **Wykładniczy** — czas do zdarzenia

## Workflow EDA
1. Braki danych (`df.isna().sum()`)
2. Rozkłady (`df.describe()`, histogram)
3. Korelacje (`df.corr()`, heatmapa)
4. Wizualizacja (boxplot, scatter)

## Pułapki
- **Korelacja ≠ przyczynowość!**
- Skośność rozkładu psuje interpretację średniej
- Kwartet Anscombe'a — identyczne statystyki, różne dane

## Wnioskowanie (intuicja)
- **Przedział ufności** — zakres prawdopodobnych wartości parametru
- **p-wartość** — NIE jest prawdopodobieństwem, że H0 jest prawdziwa

</div>
</div>
