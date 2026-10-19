# Zadanie domowe 3: Big Data i Hadoop — teoria i praktyka MapReduce

**Poziom trudności:** ⭐⭐⭐ (Średni)

---

## 🎯 Cel zadania

Pogłębienie zrozumienia architektury Hadoop (HDFS, MapReduce, YARN) poprzez samodzielne badanie i krótkie ćwiczenie praktyczne — ręczną implementację MapReduce word count na tekście, który **sam wybierzesz**.

---

## 📋 Zadanie

### Część 1: Analiza porównawcza (teoria, ~1 strona)

Napisz krótkie opracowanie (300–500 słów) porównujące **dwie strategie replikacji danych**:

- Replikacja HDFS (domyślnie 3 kopie bloku, rozłożone na różne DataNode/racki)
- Alternatywne podejście: **erasure coding** (kodowanie z nadmiarowością, używane np. w nowszych wersjach HDFS jako alternatywa dla pełnej replikacji)

W opracowaniu odpowiedz na pytania:
- Jakie są **zalety i wady** każdej strategii pod względem zużycia przestrzeni dyskowej?
- Która strategia lepiej sprawdzi się przy **rzadko odczytywanych, archiwalnych** danych, a która przy **często odczytywanych, "gorących"** danych?
- Dlaczego domyślny replication factor w HDFS to akurat **3**, a nie np. 2 lub 5?

### Część 2: Manualny MapReduce na własnym tekście (kod)

Wybierz dowolny **plik tekstowy** (minimum ~5000 słów) — może to być:
- Rozdział ulubionej książki (domena publiczna, np. z [Wolne Lektury](https://wolnelektury.pl/))
- Zbiór artykułów, transkrypcja podcastu, dowolny większy tekst PL/EN

Zaimplementuj **od zera** (bez używania `Counter` ani gotowych bibliotek do zliczania) własny word count w stylu MapReduce:

1. **Faza Map** — funkcja, która dla listy fragmentów tekstu zwraca listę par `(słowo, 1)`
2. **Faza Shuffle** — funkcja grupująca pary po kluczu (słowie)
3. **Faza Reduce** — funkcja sumująca wartości dla każdego klucza
4. Wypisz **Top 20** najczęściej występujących słów (po odfiltrowaniu podstawowych stopwords, np. "i", "w", "na", "the", "a")
5. Podziel tekst na **min. 4 fragmenty** (symulując 4 "węzły" klastra) i pokaż, że Twoja implementacja daje **identyczny wynik** niezależnie od tego, czy przetwarzasz tekst w całości, czy podzielony na fragmenty

---

## 📦 Wymagania techniczne

- Kod w **Google Colab** lub lokalnym Jupyter Notebook (czysty Python — bez pandas, bez Sparka)
- Własne implementacje `map_function()`, `shuffle_function()`, `reduce_function()` — z komentarzami
- Tekst wejściowy wczytywany z pliku lub adresu URL (nie wklejony na sztywno w kodzie)
- Opracowanie teoretyczne (Część 1) jako osobna sekcja Markdown w notebooku lub osobny plik `.md`/`.pdf`

---

## 💡 Wskazówki

- Zacznij od małego fragmentu tekstu (np. jednego akapitu), żeby przetestować logikę, zanim puścisz cały plik
- Pamiętaj o normalizacji tekstu przed zliczaniem: małe litery, usunięcie znaków interpunkcyjnych (`str.lower()`, `re.sub()`)
- Do wczytania tekstu z internetu użyj `httpx` lub `requests`:
  ```python
  import httpx
  tekst = httpx.get("https://www.gutenberg.org/cache/epub/.../plik.txt").text
  ```
- "Podział na fragmenty" możesz zrobić po prostu przez pocięcie listy słów na 4 równe kawałki — nie musisz uruchamiać prawdziwych procesów równoległych (choć jeśli chcesz spróbować `concurrent.futures`, patrz zadanie bonusowe z laboratorium!)
- Stopwords możesz zdefiniować jako zwykłą listę/`set()` w Pythonie — nie potrzebujesz do tego żadnej biblioteki NLP

---

## 🔥 Zadanie bonusowe (opcjonalnie)

Zaimplementuj wariant MapReduce, który zamiast zliczać słowa, liczy **średnią długość słowa per litera, którą się zaczyna** (np. wszystkie słowa zaczynające się na "a" → jaka jest ich średnia długość?).

To wymaga zmiany fazy **Map** (klucz = pierwsza litera, wartość = długość słowa) oraz fazy **Reduce** (zamiast sumy — średnia z listy wartości). Pokazuje to, że **ten sam szkielet MapReduce** obsługuje bardzo różne zadania — zmienia się tylko logika map/reduce!

---

## ❓ FAQ

**Q: Czy mogę użyć `collections.Counter` do zliczania?**
A: Nie w głównym zadaniu — celem jest **ręczna** implementacja faz map/shuffle/reduce, żeby zrozumieć mechanikę. `Counter` możesz jedynie użyć do **weryfikacji**, czy Twój wynik się zgadza.

**Q: Ile fragmentów tekstu ("węzłów") minimum muszę zasymulować?**
A: Minimum 4, żeby pokazać, że podział danych **nie zmienia wyniku końcowego** — to kluczowa własność poprawnego MapReduce.

**Q: Czy tekst musi być po polsku?**
A: Nie, może być w dowolnym języku — pamiętaj tylko o odpowiednich stopwords dla wybranego języka.

**Q: Co jeśli mój tekst zawiera literówki, znaki specjalne, cyfry?**
A: To normalne — potraktuj to jako ćwiczenie z **Veracity** (jedno z 5V!). Opisz krótko, jak sobie z tym poradziłeś (np. `re.sub(r"[^a-ząćęłńóśźż]", "", slowo)`).

---

Powodzenia! 🐘
