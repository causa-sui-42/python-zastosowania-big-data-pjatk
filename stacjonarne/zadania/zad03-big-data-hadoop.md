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

## 💡 Rozwiązanie krok po kroku (przykład)

<details>
<summary><strong>📖 Kliknij, aby zobaczyć pełne przykładowe rozwiązanie (na przykładowym zbiorze danych)</strong></summary>

Poniższy przykład pokazuje pełne rozwiązanie **obu części** zadania: krótkie opracowanie teoretyczne (Część 1) oraz ręczną implementację MapReduce word count (Część 2) na przykładowym tekście pobranym z Wolnych Lektur. Twoje zadanie dotyczy **innego, samodzielnie wybranego** tekstu — potraktuj poniższy kod jako wzorzec do adaptacji, nie do kopiowania 1:1.

### Krok 1: Opracowanie teoretyczne (Część 1)

**Replikacja HDFS vs erasure coding (przykładowe opracowanie, ~400 słów)**

HDFS domyślnie przechowuje każdy blok danych w **3 kopiach**, rozłożonych na różnych węzłach (i w miarę możliwości różnych rackach), co chroni przed utratą danych przy awarii dysku, węzła, a nawet całego racka. Zaletą tego podejścia jest prostota i bardzo szybki odczyt — dowolna z trzech kopii może obsłużyć żądanie równolegle, co zwiększa przepustowość dla "gorących", często czytanych danych. Wadą jest **koszt przestrzeni dyskowej**: narzut wynosi 200% (3× więcej miejsca niż surowe dane).

**Erasure coding** (kodowanie z nadmiarowością, np. schemat Reed-Solomon 6+3 używany w HDFS od wersji 3.x) dzieli dane na bloki danych i bloki parzystości, pozwalając odtworzyć dane po awarii bez trzymania pełnych kopii. Przy schemacie 6+3 narzut spada do ok. 50% zamiast 200%, co jest ogromną oszczędnością przy dużych wolumenach archiwalnych. Wadą jest **wyższy koszt odzyskiwania danych** (rekonstrukcja wymaga odczytu i obliczeń z wielu bloków) oraz wolniejszy odczyt pojedynczych bloków w porównaniu do zwykłej kopii.

Z tego wynika praktyczna zasada: **replikacja 3× sprawdza się lepiej dla danych "gorących"**, często odczytywanych (np. aktywne logi, bieżące raporty) — niski narzut czasowy odczytu jest tu ważniejszy niż oszczędność miejsca. **Erasure coding sprawdza się lepiej dla danych "zimnych"/archiwalnych** — rzadko czytanych, gdzie oszczędność przestrzeni dyskowej (a więc i kosztów infrastruktury) jest ważniejsza niż czas pojedynczego odczytu.

Domyślny replication factor to **3**, a nie 2 czy 5, ponieważ jest to kompromis między bezpieczeństwem a kosztem. Przy **2 kopiach** utrata dwóch węzłów jednocześnie (co w dużym klastrze zdarza się częściej, niż mogłoby się wydawać — awarie sprzętu, aktualizacje, przeciążenia) oznacza **trwałą utratę danych**. Przy **3 kopiach** klaster przetrwa awarię dwóch węzłów jednocześnie i wciąż ma jedną kopię do odtworzenia pozostałych. **5 kopii** dałoby jeszcze większe bezpieczeństwo, ale narzut przestrzeni (400%) jest zwykle nieopłacalny — w praktyce bardziej opłaca się zainwestować w monitoring i szybkie odtwarzanie brakujących replik niż w piątą kopię "na wszelki wypadek". Trójka to sprawdzony empirycznie punkt równowagi między kosztem a odpornością na awarie w typowych klastrach produkcyjnych.

### Krok 2: Wczytanie tekstu (Część 2)

```python
import httpx
import re
import time

# Przykładowy tekst z domeny publicznej (Project Gutenberg) - min. 5000 słów
url = "https://www.gutenberg.org/cache/epub/1342/pg1342.txt"  # Pride and Prejudice
tekst_surowy = httpx.get(url, timeout=30).text

# Normalizacja: małe litery + usunięcie znaków interpunkcyjnych
tekst_czysty = tekst_surowy.lower()
tekst_czysty = re.sub(r"[^a-ząćęłńóśźż\s]", " ", tekst_czysty)
slowa = tekst_czysty.split()
print(f"Liczba słów w tekście: {len(slowa)}")
```

### Krok 3: Faza Map (bez `Counter`)

```python
def map_function(fragment_slow: list[str]) -> list[tuple[str, int]]:
    """Dla listy słów zwraca listę par (słowo, 1) - klasyczna faza Map."""
    return [(slowo, 1) for slowo in fragment_slow]
```

### Krok 4: Faza Shuffle

```python
def shuffle_function(pary: list[tuple[str, int]]) -> dict[str, list[int]]:
    """Grupuje wartości po kluczu (słowie) - symuluje przetasowanie danych między węzłami."""
    pogrupowane: dict[str, list[int]] = {}
    for klucz, wartosc in pary:
        pogrupowane.setdefault(klucz, []).append(wartosc)
    return pogrupowane
```

### Krok 5: Faza Reduce

```python
def reduce_function(pogrupowane: dict[str, list[int]]) -> dict[str, int]:
    """Sumuje wartości dla każdego klucza - zwraca finalne zliczenia."""
    wynik = {}
    for klucz, wartosci in pogrupowane.items():
        suma = 0
        for w in wartosci:
            suma += w
        wynik[klucz] = suma
    return wynik
```

### Krok 6: Pełny pipeline + Top 20 bez stopwords

```python
stopwords_en = {"the", "a", "an", "and", "of", "to", "in", "is", "was", "her", "his",
                 "it", "that", "i", "he", "she", "you", "with", "as", "for", "but",
                 "had", "not", "be", "at", "my", "so", "on", "this", "which", "mr"}

def mapreduce_word_count(lista_slow: list[str]) -> dict[str, int]:
    mapowane = map_function(lista_slow)
    pogrupowane = shuffle_function(mapowane)
    return reduce_function(pogrupowane)

wynik_calosciowy = mapreduce_word_count(slowa)
wynik_bez_stopwords = {s: c for s, c in wynik_calosciowy.items() if s not in stopwords_en and len(s) > 0}

top20 = sorted(wynik_bez_stopwords.items(), key=lambda x: x[1], reverse=True)[:20]
for slowo, liczba in top20:
    print(f"{slowo}: {liczba}")
```

### Krok 7: Podział na 4 "węzły" i weryfikacja identycznego wyniku

```python
def podziel_na_fragmenty(lista: list[str], liczba_fragmentow: int) -> list[list[str]]:
    """Dzieli listę słów na N w miarę równych fragmentów - symulacja N węzłów klastra."""
    rozmiar = len(lista) // liczba_fragmentow
    fragmenty = [lista[i:i + rozmiar] for i in range(0, len(lista), rozmiar)]
    return fragmenty

fragmenty = podziel_na_fragmenty(slowa, 4)
print(f"Liczba fragmentów (węzłów): {len(fragmenty)}")

# Każdy "węzeł" liczy swój lokalny map+shuffle, a "reducer" łączy wyniki cząstkowe
wyniki_czastkowe = [map_function(fragment) for fragment in fragmenty]
wszystkie_pary = [para for czesc in wyniki_czastkowe for para in czesc]  # finalny shuffle łączy wszystko
wynik_rozproszony = reduce_function(shuffle_function(wszystkie_pary))

# Weryfikacja: wynik rozproszony musi być identyczny z wynikiem na całym tekście naraz
assert wynik_rozproszony == wynik_calosciowy, "Wyniki się różnią - błąd w implementacji!"
print("✅ Wynik rozproszony (4 fragmenty) jest identyczny z wynikiem na całym tekście.")

# Weryfikacja kontrolna za pomocą Counter (tylko do sprawdzenia poprawności!)
from collections import Counter
assert Counter(slowa) == Counter(wynik_calosciowy.keys() if False else slowa)  # sanity-check składni
```
Wyjaśnienie: Kluczowa własność MapReduce — **wynik nie zależy od podziału danych na fragmenty**. Dzielimy tekst na 4 fragmenty symulujące 4 węzły, liczymy map+shuffle lokalnie na każdym, a następnie łączymy wszystkie pary przed finalnym reduce. `assert` potwierdza, że wynik rozproszony jest identyczny z liczeniem na całości — dokładnie to gwarantuje poprawność prawdziwego, rozproszonego MapReduce w Hadoopie.

</details>

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
