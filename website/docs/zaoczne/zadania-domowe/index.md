---
id: zadania-domowe-index
title: "Zadania domowe"
sidebar_label: "📝 Zadania domowe"
description: "Lista zadań domowych z kursu Python w Zastosowaniach Big Data."
slug: /zadania-domowe
---

import DownloadLink from '@site/src/components/DownloadLink';

# 📝 Zadania domowe

Zadania domowe **nie są obowiązkowe**, ale **zdecydowanie polecamy** je wykonywać — znacząco pomagają w zrozumieniu materiału i przygotowaniu do laboratoriów.

Prowadzący **losowo sprawdza** wybrane zadania podczas wykładów — wylosowana osoba  prezentuje swoje rozwiązanie przed klasą i otrzymuje szczegółową informację zwrotną.

## Cele zadań domowych

- ✅ **Utrwalenie** materiału z wykładu
- ✅ **Praktyczne zastosowanie** poznanych narzędzi  
- ✅ **Przygotowanie** do laboratoriów
- ✅ **Budowanie portfolio** projektów Big Data

---

## 📋 Lista zadań

Każde zadanie można **pobrać** i otworzyć w Google Colab samodzielnie.

| # | Temat | Zalecany termin | Szacowany czas | Pobierz |
|---|-------|----------------|---------------|---------|
| 1 | Analiza statystyczna | Przed wykładem 2 (22.03) | 20-30 min | <DownloadLink href="/zaoczne/zadania/zad1-analiza-statystyczna.md">📥 Pobierz zadanie</DownloadLink> |
| 2 | Podstawy PySpark | Przed wykładem 3 (12.04) | 25-30 min | <DownloadLink href="/zaoczne/zadania/zad2-podstawy-pyspark.md">📥 Pobierz zadanie</DownloadLink> |
| 3 | Spark SQL Queries | Przed wykładem 4 (26.04) | 20-30 min | <DownloadLink href="/zaoczne/zadania/zad3-spark-sql-queries.md">📥 Pobierz zadanie</DownloadLink> |
| 4 | ML Data Preparation Pipeline | Przed wykładem 5 (17.05) | 25-30 min | <DownloadLink href="/zaoczne/zadania/zad4-ml-prep-pipeline.md">📥 Pobierz zadanie</DownloadLink> |
| 5 | MLlib Classification | Przed wykładem 6 (31.05) | 30 min | <DownloadLink href="/zaoczne/zadania/zad5-mllib-classification.md">📥 Pobierz zadanie</DownloadLink> |
| 6 | GCP Dataproc Job | Przed wykładem 7 (14.06) | 30-40 min | <DownloadLink href="/zaoczne/zadania/zad6-gcp-dataproc-simple.md">📥 Pobierz zadanie</DownloadLink> |
| 7 | Structured Streaming Basics | Przed wykładem 8 (28.06) | 25 min | <DownloadLink href="/zaoczne/zadania/zad7-streaming-basics.md">📥 Pobierz zadanie</DownloadLink> |

---

## 🎓 QwikLabs — ćwicz w prawdziwej chmurze (bez karty kredytowej!)

Zadania 6 i 7 wykorzystują Google Cloud Platform. Możesz przetestować komendy z tych zadań **za darmo** dzięki [Cloud Skills Boost](https://www.cloudskillsboost.google/) — platforma daje Ci tymczasowy projekt GCP z aktywnym billingiem!

| Zadanie | Rekomendowany lab | Opis | Czas |
|---------|------------------|------|------|
| **Zad. 6** — GCP Dataproc | [Dataproc: Qwik Start - Command Line](https://www.cloudskillsboost.google/focuses/585) | `gcloud dataproc` — dokładnie komendy z zadania | ~30 min |
| **Zad. 6** — BigQuery | [BigQuery: Qwik Start - Console](https://www.cloudskillsboost.google/focuses/1145) | SQL na publicznych danych GCP | ~30 min |
| **Zad. 6** — Pełny flow | [Running Apache Spark jobs on Cloud Dataproc](https://www.cloudskillsboost.google/focuses/672) | Klaster → PySpark job → wyniki | ~1h |
| **Zad. 7** — Streaming | [Cloud Pub/Sub: Qwik Start - Console](https://www.cloudskillsboost.google/focuses/3719) | Message broker — odpowiednik `rate source` w chmurze | ~30 min |
| **Zad. 7** — Pipeline | [Streaming Analytics into BigQuery](https://www.cloudskillsboost.google/focuses/1206) | Strumień danych → BigQuery w czasie rzeczywistym | ~1h |

> 💡 **Jak korzystać z Cloud Skills Boost?** Wejdź na [cloudskillsboost.google](https://www.cloudskillsboost.google/), zaloguj się kontem Google, wybierz darmowy lab (oznaczony 🟢) i kliknij "Start Lab". Dostajesz tymczasowe konto GCP z kredytami — zero kosztów dla Ciebie!

> 🖥️ **Google Cloud Shell** — [shell.cloud.google.com](https://shell.cloud.google.com) — darmowy terminal z `gcloud` CLI dla każdego użytkownika Google (wystarczy Gmail, bez billing account).

1. **Pobierz** plik zadania (kliknij link "Pobierz" w tabeli powyżej)
2. **Otwórz** Google Colab ([colab.research.google.com](https://colab.research.google.com/))
3. **Prześlij** plik `.md` lub `.ipynb` do Colab (`File > Upload notebook`)
4. **Wykonaj** zadanie według instrukcji

---

## 🎤 Prezentacje podczas wykładów

Prowadzący **losowo wybiera** osoby do zaprezentowania swoich rozwiązań. Jeśli zostaniesz wybrany/a:

- Pokaż swoje rozwiązanie na ekranie (kod + wyniki)
- Wyjaśnij podejście i decyzje projektowe
- Odpowiedz na pytania prowadzącego i kolegów z grupy

To doskonała okazja do otrzymania **szczegółowego feedbacku** i nauki od innych! 🎓

---

## 💡 Wskazówki

### Zanim zaczniesz:
1. 📖 Przejrzyj materiały z wykładu
2. 🧪 Przetestuj kod na małych danych
3. 📝 Dodaj komentarze wyjaśniające logikę
4. ✅ Sprawdź czy kod się wykonuje (bez błędów!)

### Przydatne zasoby:
- 📚 [Dokumentacja PySpark](https://spark.apache.org/docs/latest/api/python/)
- 🤖 [scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)
- ☁️ [GCP Documentation](https://cloud.google.com/docs)

---

## 🎉 Powodzenia!

Po ukończeniu wszystkich zadań będziesz mieć **solidne portfolio projektów Big Data**, które możesz pokazać podczas rozmowy o pracę! 💼✨

**Pytania?** Napisz na [melnyk@pjwstk.edu.pl](mailto:melnyk@pjwstk.edu.pl) lub zadaj podczas wykładu! 🙋‍♂️
