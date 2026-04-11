# 🎓 Python w Zastosowaniach Big Data — PJATK

Przestrzeń robocza wspierana przez AI do tworzenia materiałów akademickich z zakresu Pythona, Big Data, Cloud Computingu i Data Science.

🌐 **Strona kursu:** [causa-sui-42.github.io/python-zastosowania-big-data-pjatk](https://causa-sui-42.github.io/python-zastosowania-big-data-pjatk/)

## 🌐 Strona kursu

Katalog `website/` zawiera kompletną stronę kursu opartą o **Docusaurus v3**, w której znajdują się:

- **Wykłady** — strony z materiałami i linkami do PDF-ów
- **Ćwiczenia** — laboratoria z odnośnikami do Google Colab
- **Fiszki** — interaktywne fiszki (40+ kart, 3 kategorie, zapis postępu w `localStorage`)
- **Materiały** — książki, cheat sheety i przydatne linki
- **Plan zajęć** — harmonogram semestru
- **O kursie** — informacje organizacyjne, wymagania i zasady zaliczenia

### Wymagania

- Node.js >= 18
- npm >= 9

> **Uwaga dla Windows:** jeśli `node` i `npm` nie są dostępne w systemowym `PATH`, ale masz WSL, uruchamiaj polecenia npm wewnątrz WSL:
>
> ```powershell
> cd /mnt/c/Projects/sandbox/python-big-data/website
> npm install
> npm start
> ```
>
> Alternatywnie zainstaluj Node.js bezpośrednio dla Windows z [nodejs.org](https://nodejs.org/).

### Instalacja i uruchomienie lokalne

```bash
cd website
npm install
npm start
# otworzy http://localhost:3000/python-zastosowania-big-data-pjatk/
```

### Budowanie wersji produkcyjnej

```bash
cd website
npm run build
# wynik pojawi się w website/build/
```

### Podgląd wersji produkcyjnej

```bash
cd website
npm run serve
```

### Wdrożenie na GitHub Pages

Wdrożenie jest **zautomatyzowane przez GitHub Actions**. Każdy push do gałęzi `main`, który modyfikuje katalog `website/`, uruchamia build i publikuje stronę do gałęzi `gh-pages`.

**Jednorazowa konfiguracja w ustawieniach repozytorium GitHub:**

1. Przejdź do **Settings → Actions → General → Workflow permissions**.
2. Wybierz **Read and write permissions** i zapisz ustawienia.
3. Przejdź do **Settings → Pages**.
4. Ustaw źródło na **Deploy from a branch**, gałąź `gh-pages`, folder `/ (root)` i zapisz.

Po tej konfiguracji każdy push do `main` będzie publikowany automatycznie. Wdrożenie można też uruchomić ręcznie z karty **Actions**.

#### Ręczne wdrożenie

```bash
cd website
GIT_USER=causa-sui-42 npm run deploy
```

### Dodawanie treści

| Co dodać | Gdzie | Jak |
|----------|-------|-----|
| Nowy wykład | `website/docs/wyklady/` | Dodaj plik `.md` i zarejestruj go w `sidebars.ts` |
| Nowe ćwiczenie | `website/docs/cwiczenia/` | Dodaj plik `.md` z linkiem do Colab |
| Nowe fiszki | `website/src/data/flashcards.ts` | Dopisz elementy do tablicy `FLASHCARDS` |
| Nowy PDF | `website/static/pdfs/` | Umieść plik i linkuj go przez `/pdfs/nazwa-pliku.pdf` |

> **Pierwsza konfiguracja PDF:** skopiuj istniejący plik wykładu do katalogu statycznego:
>
> ```bash
> cp presentations/intro-big-data-hadoop-spark-beginner.pdf website/static/pdfs/
> ```

---

## 📁 Struktura projektu

```
.github/
├── copilot-instructions.md
├── agents/
│   └── lecturer.agent.md
├── skills/
│   ├── presentation-generator/
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── STYLE-GUIDE.md
│   │       ├── TEMPLATES.md
│   │       └── EXAMPLES.md
│   └── colab-exercise-creator/
│       ├── SKILL.md
│       └── references/
│           ├── NOTEBOOK-STRUCTURE.md
│           ├── EXERCISE-DESIGN.md
│           └── EXAMPLES.md
├── prompts/
│   ├── create-lecture.prompt.md
│   ├── create-exercise.prompt.md
│   ├── mini-lecture.prompt.md
│   └── create-quiz.prompt.md
└── instructions/
    ├── notebooks.instructions.md
    └── presentations.instructions.md
exercises/
└── 01-big-data-pyspark-ecommerce.ipynb
presentations/
└── intro-big-data-hadoop-spark-beginner.pdf
website/
├── docusaurus.config.ts
├── sidebars.ts
├── package.json
├── tsconfig.json
├── static/
│   ├── img/logo.svg
│   └── pdfs/
├── src/
│   ├── css/custom.css
│   ├── data/flashcards.ts
│   ├── components/Flashcard/
│   └── pages/
│       ├── index.tsx
│       ├── plan-zajec.tsx
│       ├── o-kursie.tsx
│       └── fiszki.tsx
└── docs/
    ├── wyklady/
    ├── cwiczenia/
    └── zasoby/
```

## 🚀 Jak używać

| Akcja | Jak to zrobić |
|-------|---------------|
| **Utwórz prezentację** | Wpisz `/create-lecture` albo po prostu poproś o wykład |
| **Utwórz ćwiczenie** | Wpisz `/create-exercise` albo poproś o notebook do Colab |
| **Krótki mini-wykład** | Wpisz `/mini-lecture` |
| **Wygeneruj quiz** | Wpisz `/create-quiz` |
| **Użyj persony wykładowcy** | Wybierz agenta **lecturer** z listy agentów |

### Przykłady

```
/create-lecture Introduction to PySpark DataFrames
/create-exercise pandas GroupBy - intermediate
/mini-lecture Python decorators
/create-quiz Python list comprehensions
```

## 🌐 Polityka językowa

Materiały dydaktyczne są domyślnie przygotowywane po **polsku** 🇵🇱, z zachowaniem angielskich terminów technicznych tam, gdzie ma to sens, na przykład `DataFrame`, `SparkSession`, `list comprehension`, `Big Data` czy `Cloud Computing`.

Zasada ta jest opisana w `.github/copilot-instructions.md` i stosowana przez dostępne instrukcje, umiejętności i agentów.