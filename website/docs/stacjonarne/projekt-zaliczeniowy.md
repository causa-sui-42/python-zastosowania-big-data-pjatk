---
id: projekt-zaliczeniowy
title: "Projekt zaliczeniowy"
sidebar_label: "🎓 Projekt zaliczeniowy"
description: "Wymagania, kryteria oceny i wytyczne dotyczące projektu zaliczeniowego z kursu Python w Zastosowaniach Big Data (studia stacjonarne)."
---

import Admonition from '@theme/Admonition';
import DocImage from '@site/src/components/DocImage';
import DownloadLink from '@site/src/components/DownloadLink';

# 🎓 Projekt zaliczeniowy

**Kurs:** Python w Zastosowaniach Big Data &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027 &nbsp;|&nbsp; **Termin oddania:** 16.01.2027 (godz. 23:59) &nbsp;|&nbsp; **Obrona:** 19.01.2027

---

## 🧮 Jak liczona jest ocena końcowa?

| Składowa | Waga |
|---|---|
| Egzamin teoretyczny (19.01.2027) | 70% |
| **Projekt zaliczeniowy** (ten dokument) | **30%** |
| Aktywność na zajęciach (bonus) | +10% (ponad 100%) |

Projekt to **jedyny praktyczny** składnik oceny końcowej — to tutaj pokazujesz, że potrafisz zastosować technologie Big Data w praktyce. Zacznij pracę wcześnie!

---

## 🎯 Cel projektu

Projekt zaliczeniowy stanowi **30% oceny końcowej** przedmiotu. Celem projektu jest samodzielne zastosowanie wiedzy i umiejętności zdobytych na kursie do analizy rzeczywistego (lub realistycznego) zbioru danych z wykorzystaniem technologii Big Data.

Projekt realizowany jest **indywidualnie**. Studenci są zachęcani do konsultacji z prowadzącym oraz kolegami, ale końcowa praca musi być w pełni samodzielna.

---

<DocImage src="/img/project-pipeline.svg" alt="Pipeline projektu zaliczeniowego" style={{maxWidth: '100%', margin: '1rem 0 2rem'}} />

## 📋 Wymagania projektowe

### Zakres projektu

Projekt powinien obejmować:

1. **Jasno określony cel badawczy** — konkretne pytanie lub problem, na który odpowiadasz za pomocą danych
2. **Zbiór danych** — rzeczywisty lub realistyczny zbiór danych (min. kilkadziesiąt tysięcy rekordów)
3. **Przetwarzanie danych** — wykorzystanie Apache Spark (PySpark), **wymagane** dla tej ścieżki kursu
4. **Analiza/Modelowanie** — eksploracja danych (EDA), wizualizacje, oraz opcjonalnie budowanie modeli ML (scikit-learn lub MLlib), rozszerzenia typu BigQuery
5. **Prezentacja wyników** — czytelne slajdy z wnioskami i wizualizacjami

### Deliverables (co oddajesz)

- **Prezentacja** (20–30 slajdów) — format PDF lub PPTX
- **Kod źródłowy** — Jupyter Notebook (.ipynb) lub skrypty Python (.py)
- **Obrona ustna** — krótka prezentacja projektu (5–10 min) + odpowiedzi na pytania prowadzącego

---

## 📊 Kryteria oceny

Poniższa tabela pokazuje wagi **wewnątrz** komponentu "Projekt" (czyli w ramach tych 30% oceny końcowej):

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
| Wybór tematu | do **24.11.2026** | Zgłoś temat prowadzącemu (e-mail: melnyk@pjwstk.edu.pl lub osobiście na zajęciach) — najlepiej zaraz po Wykładzie 8 (Modele ML) |
| Konsultacje | **cały semestr** | Prowadzący dostępny szczególnie po zajęciach oraz e-mailem |
| **Oddanie projektu** | **16.01.2027, godz. 23:59** 🔴 | Notebook/skrypty + prezentacja. Prace przesłane po terminie **nie będą przyjęte**. |
| **Obrona projektu** | **19.01.2027** | Ten sam dzień co egzamin teoretyczny — krótkie prezentacje (5–10 min) + pytania prowadzącego. Harmonogram obron w ciągu dnia ustala prowadzący. |

<Admonition type="danger" title="Nieprzekraczalny termin oddania: 16 stycznia 2027, godz. 23:59">
  Materiały należy przesłać najpóźniej do **16.01.2027, godz. 23:59**. Jest to termin nieprzekraczalny — prace nadesłane później nie będą oceniane. Obrona projektu odbywa się **19.01.2027**, tego samego dnia co egzamin teoretyczny — to jednak **osobna** część oceny (30% projekt vs. 70% egzamin).
</Admonition>

---

## 💡 Wskazówki

### Co sprawia, że projekt jest dobry?

- ✅ **Konkretny cel** — „Przewidywanie rezygnacji subskrybentów platformy streamingowej na podstawie zachowań słuchacza" (a nie: „Analiza danych")
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

<DownloadLink href="/stacjonarne/notebooks/projekt-przyklad-streaming-muzyka.ipynb">📥 <strong>Pobierz: projekt-przyklad-streaming-muzyka.ipynb</strong></DownloadLink>

### Co zawiera przykładowy notebook?

| Sekcja | Co pokazuje? |
|--------|--------------|
| **1. Konfiguracja środowiska** | Instalacja PySpark w Colab, importy, inicjalizacja SparkSession |
| **2. Generowanie i ładowanie danych** | Tworzenie syntetycznego zbioru ~400 000 rekordów subskrybentów platformy streamingowej muzyki; konwersja pandas → Spark |
| **3. EDA (Analiza eksploracyjna)** | Statystyki opisowe, rozkłady, analiza rezygnacji per typ subskrypcji, kraj i aktywność; wykresy matplotlib/seaborn |
| **4. Spark SQL** | Zaawansowane zapytania SQL, CTE, funkcje okienkowe (RANK), segmentacja użytkowników |
| **5. Feature Engineering** | Tworzenie nowych cech: wskaźnik zaangażowania, flaga nieaktywności, wskaźnik zgłoszeń do supportu |
| **6. Modelowanie ML (MLlib)** | Pipeline: StringIndexer + VectorAssembler + RandomForestClassifier |
| **7. Ewaluacja modelu** | AUC-ROC, Accuracy, Precision, Recall, F1; macierz błędów; feature importance |
| **8. Wnioski** | Interpretacja wyników, refleksje, możliwe rozszerzenia |

:::caution Uwaga!
Przykładowy notebook dotyczy **rezygnacji subskrybentów platformy streamingowej muzyki (music streaming subscriber churn)** — możesz go użyć jako **wzorca struktury**, ale Twój projekt musi dotyczyć **innego tematu** i korzystać z **własnego zbioru danych**!
:::

---

## 🎨 Przykładowe tematy

Poniżej kilka inspiracji — możesz wybrać własny temat po konsultacji z prowadzącym:

1. **Analityka sportowa** — statystyki zawodników/drużyn + predykcja wyników meczów
2. **Dane klimatyczne** — analiza trendów temperatur i opadów + wykrywanie anomalii pogodowych
3. **Transport publiczny** — analiza opóźnień i obłożenia linii komunikacji miejskiej
4. **Analiza sentymentu recenzji e-commerce** — web scraping + NLP + klasyfikacja opinii
5. **Zużycie energii elektrycznej** — prognozowanie zapotrzebowania + wykrywanie wzorców sezonowych
6. **Rynek nieruchomości** — przewidywanie cen mieszkań na podstawie cech nieruchomości i lokalizacji

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

Pytania dotyczące projektu kieruj do prowadzącego (Pavlo Melnyk, melnyk@pjwstk.edu.pl) podczas zajęć lub e-mailem. Nie czekaj do ostatniego dnia!
