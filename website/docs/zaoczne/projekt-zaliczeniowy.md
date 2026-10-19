---
id: projekt-zaliczeniowy
title: "Projekt zaliczeniowy"
sidebar_label: "🎓 Projekt zaliczeniowy"
description: "Wymagania, kryteria oceny i wytyczne dotyczące projektu zaliczeniowego z kursu Python w Zastosowaniach Big Data."
---

import Admonition from '@theme/Admonition';
import DocImage from '@site/src/components/DocImage';
import DownloadLink from '@site/src/components/DownloadLink';

# 🎓 Projekt zaliczeniowy

**Kurs:** Python w Zastosowaniach Big Data &nbsp;|&nbsp; **Semestr:** Letni 2025/2026 &nbsp;|&nbsp; **Termin oddania:** 21.06.2026 (godz. 23:59) &nbsp;|&nbsp; **Obrona:** 28.06.2026

---

## 🎯 Cel projektu

Projekt zaliczeniowy jest **jedyną formą zaliczenia** przedmiotu. Celem projektu jest samodzielne zastosowanie wiedzy i umiejętności zdobytych na kursie do analizy rzeczywistego (lub realistycznego) zbioru danych z wykorzystaniem technologii Big Data.

Projekt realizowany jest **indywidualnie**. Studenci są zachęcani do konsultacji z prowadzącym oraz kolegami, ale końcowa praca musi być w pełni samodzielna.

---

<DocImage src="/img/project-pipeline.svg" alt="Pipeline projektu zaliczeniowego" style={{maxWidth: '100%', margin: '1rem 0 2rem'}} />

## 📋 Wymagania projektowe

### Zakres projektu

Projekt powinien obejmować:

1. **Jasno określony cel badawczy** — konkretne pytanie lub problem, na który odpowiadasz za pomocą danych
2. **Zbiór danych** — rzeczywisty lub realistyczny zbiór danych (min. kilkadziesiąt tysięcy rekordów)
3. **Przetwarzanie danych** — wykorzystanie Apache Spark (PySpark) do obróbki i analizy danych
4. **Analiza/Modelowanie** — eksploracja danych (EDA), wizualizacje, lub budowanie modeli ML (scikit-learn lub MLlib)
5. **Prezentacja wyników** — czytelne slajdy z wnioskami i wizualizacjami

### Deliverables (co oddajesz)

- **Prezentacja** (20–30 slajdów) — format PDF lub PPTX
- **Kod źródłowy** — Jupyter Notebook (.ipynb) lub skrypty Python (.py)
- **Obrona ustna** — prezentacja projektu + odpowiedzi na pytania prowadzącego

---

## 📊 Kryteria oceny

| Kryterium | Waga | Opis |
|-----------|------|------|
| **Oryginalność pomysłu** | **10%** | Oryginalność pomysłu badawczego i jasno określony cel projektu. Czy temat jest ciekawy? Czy cel jest konkretny i mierzalny? |
| **Prezentacja wyników** | **30%** | Jakość slajdów, sposób prezentowania, ogólne wrażenia. Czy prezentacja jest czytelna, profesjonalna i angażująca? Czy wizualizacje wspierają wnioski? |
| **Rozmiar i spójność** | **20%** | Rozmiar projektu, spójność treści, opisów i wykresów z celem projektu. Projekt nie może być zbyt krótki, ale też nie powinien mieć rozmiaru pracy magisterskiej. Oczekiwane: 20–30 slajdów prezentacji + odpowiednia ilość kodu. |
| **Samodzielność i obrona** | **50%** | Samodzielna realizacja pracy, umiejętność odpowiadania na pytania prowadzącego dotyczące projektu. Czy student rozumie swój kod? Czy potrafi wyjaśnić wyniki i decyzje projektowe? |

<Admonition type="info" title="Uwaga o wagach">
  Wagi sumują się do 110% — dodatkowe 10% stanowi bonus za oryginalność tematu. Oznacza to, że sam wybór interesującego i ambitnego tematu jest nagradzany.
</Admonition>

---

## 🗓️ Terminarz

| Etap | Termin | Opis |
|------|--------|------|
| Wybór tematu | do **17.05.2026** | Zgłoś temat prowadzącemu (e-mail lub osobiście na zajęciach) |
| Konsultacje | **17.05 – 21.06.2026** | Prowadzący dostępny na zajęciach i e-mailem |
| **Oddanie projektu** | **21.06.2026, godz. 23:59** 🔴 | Notebook + skrypty + prezentacja — tydzień przed ostatnimi zajęciami. Prace przesłane po terminie **nie będą przyjęte**. |
| **Obrona projektu** | **28.06.2026** | Ostatnie zajęcia — prezentacja (10–15 min) + pytania prowadzącego |

<Admonition type="danger" title="Nieprzekraczalny termin oddania: 21 czerwca 2026, godz. 23:59">
  Materiały należy przesłać **tydzień przed ostatnimi zajęciami**, które odbędą się **28 czerwca 2026**. Jest to termin nieprzekraczalny — prace nadesłane po 21.06.2026 o 23:59 nie będą oceniane. Obrona projektu odbywa się podczas ostatnich zajęć: **28.06.2026**.
</Admonition>

---

## 💡 Wskazówki

### Co sprawia, że projekt jest dobry?

- ✅ **Konkretny cel** — „Przewidywanie cen mieszkań w Warszawie na podstawie cech nieruchomości" (a nie: „Analiza danych")
- ✅ **Ciekawy zbiór danych** — Kaggle, BigQuery Public Datasets, dane open data, web scraping
- ✅ **Czytelna prezentacja** — wyraźne wizualizacje, jasne wnioski, spójna narracja
- ✅ **Wykorzystanie technologii z kursu** — PySpark, Spark SQL, MLlib, BigQuery, Streaming
- ✅ **Umiejętność wyjaśnienia** — rozumiesz każdą linijkę swojego kodu

### Czego unikać?

- ❌ Skopiowany kod z internetu bez zrozumienia
- ❌ Brak jasnego celu — „Zrobiłem analizę, bo musiałem"
- ❌ Prezentacja złożona z samego kodu bez wyjaśnień
- ❌ Zbyt mały projekt (5 slajdów, 10 linii kodu)
- ❌ Zbyt duży projekt bez fokusa (100 slajdów, bez wniosków)

---

## 📓 Przykładowy projekt — Notebook demonstracyjny

Poniżej znajdziesz **kompletny przykładowy projekt zaliczeniowy** zrealizowany w Google Colab. Notebook ilustruje oczekiwaną strukturę, poziom szczegółowości i sposób prezentacji wyników.

<DownloadLink href="/zaoczne/notebooks/projekt-zaliczeniowy-przyklad.ipynb">📥 <strong>Pobierz: projekt-zaliczeniowy-przyklad.ipynb</strong></DownloadLink>

### Co zawiera przykładowy notebook?

| Sekcja | Co pokazuje? |
|--------|--------------|
| **1. Konfiguracja środowiska** | Instalacja PySpark w Colab, importy, inicjalizacja SparkSession |
| **2. Generowanie i ładowanie danych** | Tworzenie syntetycznego zbioru 500 000 rekordów; konwersja pandas → Spark |
| **3. EDA (Analiza eksploracyjna)** | Statystyki opisowe, rozkłady, analiza per linia lotnicza i godzina; wykresy matplotlib/seaborn |
| **4. Spark SQL** | Zaawansowane zapytania SQL, CTE, funkcje okienkowe (RANK), analiza sezonowa |
| **5. Feature Engineering** | Tworzenie nowych cech: pora dnia, sezon, długość lotu, presja opóźnień |
| **6. Modelowanie ML (MLlib)** | Pipeline: StringIndexer + VectorAssembler + RandomForestClassifier |
| **7. Ewaluacja modelu** | AUC-ROC, Accuracy, Precision, Recall, F1; macierz błędów; feature importance |
| **8. Wnioski** | Interpretacja wyników, refleksje, możliwe rozszerzenia |

:::caution Uwaga!
Przykładowy notebook dotyczy **analizy opóźnień lotów** — możesz go użyć jako **wzorca struktury**, ale Twój projekt musi dotyczyć **innego tematu** i korzystać z **własnego zbioru danych**!
:::

---

## 🎨 Przykładowe tematy

Poniżej kilka inspiracji — możesz wybrać własny temat po konsultacji z prowadzącym:

1. **Analiza sentymentu recenzji produktów** — web scraping + NLP + klasyfikacja
2. **Przewidywanie opóźnień lotów** — dane lotnicze + regresja / klasyfikacja
3. **Detekcja anomalii w danych IoT** — Spark Streaming + statystyki
4. **Rekomendacja filmów** — collaborative filtering z MLlib (ALS)
5. **Analiza ruchu miejskiego** — dane GPS taksówek + analiza czasowo-przestrzenna
6. **Prognozowanie sprzedaży** — szeregi czasowe + feature engineering
7. **Klasyfikacja gatunków muzycznych** — cechy audio + ML
8. **Analiza danych giełdowych** — Big Data + wizualizacja trendów

---

## ❓ FAQ

**Czy mogę pracować w grupie?**
> Nie — projekt jest realizowany indywidualnie.

**Czy muszę użyć PySpark?**
> Tak — przynajmniej część przetwarzania danych powinna wykorzystywać PySpark/Spark SQL. Możesz łączyć z pandas, scikit-learn, itp.

**Ile minimum kodu?**
> Nie ma sztywnego minimum, ale projekt powinien zawierać wystarczającą ilość kodu, żeby wykazać praktyczne umiejętności. Typowo: 100–300+ linii kodu w notebooku.

**Co jeśli nie zdążę na termin?**
> Skontaktuj się z prowadzącym **przed** terminem. Indywidualne ustalenie jest możliwe w wyjątkowych sytuacjach.

---

## 📬 Kontakt

Pytania dotyczące projektu kieruj do prowadzącego podczas zajęć lub e-mailem. Nie czekaj do ostatniego dnia!
