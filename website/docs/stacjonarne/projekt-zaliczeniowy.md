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

**Kurs:** Python w Zastosowaniach Big Data &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027 &nbsp;|&nbsp; **Termin oddania:** 19.12.2026 (godz. 23:59) &nbsp;|&nbsp; **Obrona:** 22.12.2026

---

## 🧮 Jak liczona jest ocena końcowa?

| Składowa | Waga |
|---|---|
| Test teoretyczny (15.12.2026) | 70% |
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
| Wybór tematu | do **24.11.2026** | Zgłoś temat prowadzącemu (e-mail: melnyk@pjwstk.edu.pl lub osobiście na zajęciach) — najlepiej zaraz po Wykładzie 7 (Modele ML) |
| Konsultacje | **cały semestr** | Prowadzący dostępny szczególnie po zajęciach oraz e-mailem |
| **Oddanie projektu** | **19.12.2026, godz. 23:59** 🔴 | Notebook/skrypty + prezentacja. Prace przesłane po terminie **nie będą przyjęte**. |
| **Obrona projektu** | **22.12.2026** | Ostatnie zajęcia semestru, kilka dni po teście teoretycznym (15.12.2026) — krótkie prezentacje (5–10 min) + pytania prowadzącego. Harmonogram obron w ciągu dnia ustala prowadzący. |

<Admonition type="danger" title="Nieprzekraczalny termin oddania: 19 grudnia 2026, godz. 23:59">
  Materiały należy przesłać najpóźniej do **19.12.2026, godz. 23:59**. Jest to termin nieprzekraczalny — prace nadesłane później nie będą oceniane. Obrona projektu odbywa się **22.12.2026** — to **osobna** część oceny (30% projekt vs. 70% test teoretyczny) i osobne zajęcia od testu teoretycznego (15.12.2026).
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

## 🎨 Propozycje tematów i otwarte zbiory danych

Poniżej **rozszerzona lista inspiracji** pogrupowana tematycznie — każda propozycja zawiera przykładowy cel badawczy oraz konkretne źródła otwartych danych (open data). Możesz wybrać jeden z poniższych tematów albo zaproponować własny po konsultacji z prowadzącym.

<Admonition type="tip" title="Jak korzystać z tej listy?">
  Potraktuj te propozycje jako **punkt wyjścia**, nie gotową receptę. Zmodyfikuj pytanie badawcze, połącz dwa źródła danych, albo zawęź zakres do interesującego Cię wycinka (np. tylko jedno miasto, jeden sezon, jedna kategoria produktów).
</Admonition>

### 🏃 Sport i zdrowie

1. **Analityka sportowa** — statystyki zawodników/drużyn + predykcja wyników meczów
   - [Kaggle: Football/Soccer datasets](https://www.kaggle.com/datasets?search=football) · [Kaggle: NBA stats](https://www.kaggle.com/datasets?search=nba) · [football-data.co.uk](https://www.football-data.co.uk/) (wyniki i kursy bukmacherskie lig piłkarskich)
2. **Analiza wydolności i treningu** — dane z zegarków sportowych, predykcja czasu ukończenia biegu
   - [Kaggle: Running/marathon datasets](https://www.kaggle.com/datasets?search=marathon) · [Strava API](https://developers.strava.com/) (wymaga rejestracji aplikacji)
3. **Dane epidemiologiczne / zdrowie publiczne** — trendy zachorowań, czynniki ryzyka
   - [WHO Global Health Observatory](https://www.who.int/data/gho) · [Our World in Data](https://ourworldindata.org/) (gotowe CSV do pobrania) · [data.gov.pl — zdrowie](https://dane.gov.pl/pl/dataset?categories=zdrowie)

### 🌍 Klimat, środowisko i energia

4. **Dane klimatyczne** — trendy temperatur/opadów, wykrywanie anomalii pogodowych
   - [NOAA Climate Data Online](https://www.ncdc.noaa.gov/cdo-web/) · [Copernicus Climate Data Store](https://cds.climate.copernicus.eu/) · [IMGW-PIB dane publiczne](https://danepubliczne.imgw.pl/)
5. **Jakość powietrza** — predykcja stężenia PM2.5/PM10, wpływ pogody i ruchu drogowego
   - [GIOŚ — Główny Inspektorat Ochrony Środowiska](https://powietrze.gios.gov.pl/pjp/archives) · [OpenAQ](https://openaq.org/) · [BigQuery Public Datasets: `openaq`](https://console.cloud.google.com/marketplace/product/openaq/real-time-air-quality)
6. **Zużycie energii elektrycznej** — prognozowanie zapotrzebowania, wzorce sezonowe, OZE
   - [Kaggle: Hourly Energy Consumption](https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption) · [ENTSO-E Transparency Platform](https://transparency.entsoe.eu/) (dane europejskiego rynku energii) · [data.gov — energy](https://www.data.gov/)

### 🚕 Transport i miasto

7. **Transport publiczny** — analiza opóźnień i obłożenia linii komunikacji miejskiej
   - [ZTM Warszawa — otwarte dane](https://api.um.warszawa.pl/) · [data.gov.pl — transport](https://dane.gov.pl/pl/dataset?categories=transport)
8. **Przejazdy taksówek / ride-sharing** — analiza przestrzenno-czasowa, przewidywanie cen kursów
   - [NYC TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) · [BigQuery Public Datasets: `new_york_taxi_trips`](https://console.cloud.google.com/marketplace/product/city-of-new-york/nyc-tlc-trips)
9. **Współdzielone hulajnogi/rowery miejskie** — wzorce użytkowania, predykcja popytu
   - [Kaggle: Bike Sharing Dataset](https://www.kaggle.com/datasets/lakshmi25npathi/bike-sharing-dataset) · [Citi Bike System Data (NYC)](https://citibikenyc.com/system-data)

### 🛒 E-commerce, biznes i finanse

10. **Analiza sentymentu recenzji e-commerce** — web scraping + NLP + klasyfikacja opinii
    - [Kaggle: Amazon Product Reviews](https://www.kaggle.com/datasets?search=amazon+reviews) · [Yelp Open Dataset](https://www.yelp.com/dataset)
11. **Rynek nieruchomości** — przewidywanie cen mieszkań na podstawie cech nieruchomości i lokalizacji
    - [Kaggle: Housing Prices datasets](https://www.kaggle.com/datasets?search=housing+prices) · [otodom/olx — web scraping](https://www.otodom.pl/) (własne, zgodne z regulaminem portalu)
12. **Analiza danych giełdowych / kryptowalut** — trendy, zmienność, strategie inwestycyjne
    - [Yahoo Finance (`yfinance`)](https://pypi.org/project/yfinance/) · [Kaggle: Stock Market datasets](https://www.kaggle.com/datasets?search=stock+market) · [BigQuery Public Datasets: `bigquery-public-data.crypto_bitcoin`](https://console.cloud.google.com/marketplace/product/bigquery-public-data/crypto-bitcoin)
13. **Churn (rezygnacja) klientów** — predykcja odejść klientów na podstawie zachowań
    - [Kaggle: Telco Customer Churn](https://www.kaggle.com/datasets/blastchar/telco-customer-churn) · [Kaggle: Bank Customer Churn](https://www.kaggle.com/datasets?search=bank+customer+churn)

### 🎬 Multimedia, rozrywka i kultura

14. **Rekomendacja filmów** — collaborative filtering z MLlib (ALS)
    - [MovieLens datasets (GroupLens)](https://grouplens.org/datasets/movielens/) · [Kaggle: TMDB 5000 Movies](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata)
15. **Klasyfikacja gatunków muzycznych** — cechy audio + ML
    - [Kaggle: GTZAN Genre Collection](https://www.kaggle.com/datasets/andradaolteanu/gtzan-dataset-music-genre-classification) · [Spotify Web API](https://developer.spotify.com/documentation/web-api) (cechy audio utworów)
16. **Analiza grania e-sportowego** — statystyki meczów, predykcja wyniku drużyny
    - [Kaggle: League of Legends / Dota 2 / CS:GO datasets](https://www.kaggle.com/datasets?search=esports)

### ☁️ Big Data / Cloud (natywnie "duże" zbiory)

17. **BigQuery Public Datasets (Google Cloud)** — gotowe, ogromne zbiory danych bezpośrednio w GCP, idealne pod PySpark/Spark SQL/BigQuery:
    - [Przegląd wszystkich zbiorów](https://cloud.google.com/bigquery/public-data) — m.in. `github_repos`, `stackoverflow`, `wikipedia`, `covid19_open_data`, `census_bureau_usa`, `google_trends`
18. **Dane open data rządowe/samorządowe** — elastyczne tematycznie, dobre pod storytelling lokalny
    - [data.gov.pl](https://dane.gov.pl/) (Polska) · [data.europa.eu](https://data.europa.eu/en) (UE) · [data.gov](https://www.data.gov/) (USA) · [Eurostat](https://ec.europa.eu/eurostat/web/main/data/database) · [GUS — Bank Danych Lokalnych](https://bdl.stat.gov.pl/bdl/start)
19. **Repozytorium UCI Machine Learning** — klasyczne zbiory do klasyfikacji/regresji/clusteringu, dobre jako punkt wyjścia do rozszerzenia o większy, podobny zbiór
    - [UCI Machine Learning Repository](https://archive.ics.uci.edu/)
20. **Kaggle Datasets (ogólne wyszukiwanie)** — największa biblioteka gotowych zbiorów danych z opisami i przykładowym kodem
    - [kaggle.com/datasets](https://www.kaggle.com/datasets)

<Admonition type="info" title="Skala danych a wymagania projektu">
  Jeśli wybrany zbiór danych jest zbyt mały (np. kilkaset wierszy), rozważ: (a) połączenie kilku lat/okresów w jeden większy zbiór, (b) sztuczne powiększenie przez symulację dodatkowych rekordów na bazie rozkładów z prawdziwych danych, lub (c) wybór innego, większego źródła z listy powyżej (np. BigQuery Public Datasets łatwo dają miliony wierszy).
</Admonition>

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
