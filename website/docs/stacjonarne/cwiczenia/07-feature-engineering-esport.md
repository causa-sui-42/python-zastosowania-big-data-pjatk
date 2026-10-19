---
id: 07-feature-engineering-esport
title: "Lab 7: Feature Engineering — Statystyki e-sportowe"
sidebar_label: "Lab 7 — Feature Engineering"
description: "Budowa pipeline'u feature engineering (imputacja, encoding, skalowanie, nowe cechy) na syntetycznym zbiorze graczy e-sportowych."
---

import Admonition from '@theme/Admonition';
import DownloadLink from '@site/src/components/DownloadLink';

# Laboratorium 7: Feature Engineering — Statystyki e-sportowe

**Czas trwania:** ~90 minut &nbsp;|&nbsp; **Poziom:** Średni &nbsp;|&nbsp; **Semestr:** Zimowy 2026/2027

---

## 🎯 Cel ćwiczenia

Wcielisz się w rolę analityka danych w organizacji e-sportowej 🎮 — Twoim zadaniem jest przygotować surowe statystyki ~5000 graczy (League of Legends / CS-style) do trenowania modelu ML przewidującego wynik meczu. Dane zawierają braki, niespójności i outliery — dokładnie jak w prawdziwym świecie.

Po wykonaniu ćwiczenia będziesz potrafić:

- Uzupełniać brakujące wartości przy pomocy `SimpleImputer`
- Kodować rangę gracza jako zmienną **ordinalną** (`OrdinalEncoder`)
- Kodować kraj gracza jako zmienną **nominalną** (`OneHotEncoder`)
- Tworzyć nowe cechy: ratio (`efficiency_score`), binning godzin gry
- Wykrywać i obsługiwać outliery metodą IQR
- Poprawnie dzielić dane na train/test **bez** wycieku danych (data leakage)
- Składać cały proces w `Pipeline` + `ColumnTransformer`

---

## 📥 Pobierz notebook

<DownloadLink href="/stacjonarne/notebooks/cw-07-feature-engineering-esport.ipynb">📥 <strong>Pobierz: cw-07-feature-engineering-esport.ipynb</strong></DownloadLink>

---

## 📦 Zbiór danych

Zbiór danych jest **generowany proceduralnie** wewnątrz notebooka (nie trzeba niczego pobierać) — dzięki temu ćwiczenie działa identycznie w Google Colab i lokalnie.

| Atrybut | Wartość |
|---------|---------|
| Tytuł | Syntetyczne statystyki graczy e-sportowych |
| Liczba rekordów | ~5 000 graczy |
| Kolumny | `player_id`, `matches_played`, `win_rate`, `kda`, `avg_reaction_ms`, `rank`, `hours_per_week`, `country` |
| Rangi | Brąz, Srebro, Złoto, Platyna, Diament, Mistrz, Wyzwanie (uporządkowane) |
| Problemy | Brakujące wartości (`NaN`), kilka outlierów, korelacje z szumem (`win_rate` ↔ `kda`, `hours_per_week`) |
| Generowanie | `np.random.seed(42)` — powtarzalne dla wszystkich studentów |

> 💡 Dlaczego syntetyczne dane? Każdy student pracuje na **identycznym** zbiorze, bez zależności od zewnętrznych plików czy internetu.

---

## 📋 Zadania

Notebook zawiera **guided example** (`ColumnTransformer` + `Pipeline` dla cech numerycznych i kategorycznych) oraz **7 ćwiczeń + bonus**:

| Nr | Temat | Techniki |
|----|-------|----------|
| Przykład | Pipeline: skalowanie numeryczne + OneHot kategorii | `ColumnTransformer`, `Pipeline`, `StandardScaler` |
| 1 | Uzupełnienie brakujących wartości numerycznych | `SimpleImputer(strategy="median")` |
| 2 | Uzupełnienie brakujących wartości kategorycznych | `SimpleImputer(strategy="most_frequent")` |
| 3 | Kodowanie rangi jako zmiennej ordinalnej | `OrdinalEncoder(categories=[...])` |
| 4 | Nowa cecha: `efficiency_score` (ratio z win_rate i kda) | Feature creation, arytmetyka na kolumnach |
| 5 | Binning godzin gry na kategorie | `pd.cut()` |
| 6 | Wykrywanie i obsługa outlierów | Metoda IQR |
| 7 | Poprawny train/test split bez wycieku danych | `train_test_split`, `stratify`, kolejność `fit`/`transform` |
| 🌟 | Bonus: ważność cech | `RandomForestClassifier`, `feature_importances_` |
