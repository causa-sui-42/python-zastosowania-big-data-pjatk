export type FlashcardCategory = 'hadoop' | 'spark' | 'python';

export interface Flashcard {
  id: number;
  category: FlashcardCategory;
  question: string;
  answer: string;
}

export const CATEGORY_META: Record<FlashcardCategory, { label: string; emoji: string; color: string }> = {
  hadoop: { label: 'Big Data & Hadoop', emoji: '🐘', color: '#f59e0b' },
  spark:  { label: 'Apache Spark & PySpark', emoji: '⚡', color: '#ef4444' },
  python: { label: 'Python', emoji: '🐍', color: '#10b981' },
};

export const FLASHCARDS: Flashcard[] = [
  // ─── HADOOP ──────────────────────────────────────────────────────────────
  {
    id: 1,
    category: 'hadoop',
    question: 'Co to są "3V" Big Data i co oznaczają?',
    answer:
      'Volume (wolumen) — ogromna ilość danych;\nVelocity (prędkość) — szybkość napływania danych;\nVariety (różnorodność) — ustrukturyzowane, pół- i nieustrukturyzowane dane.',
  },
  {
    id: 2,
    category: 'hadoop',
    question: 'Jakie są cztery główne komponenty ekosystemu Apache Hadoop?',
    answer:
      'HDFS (Hadoop Distributed File System) — przechowywanie;\nMapReduce — model obliczeń;\nYARN — zarządzanie zasobami klastra;\nHadoop Common — wspólne biblioteki.',
  },
  {
    id: 3,
    category: 'hadoop',
    question: 'Co to jest HDFS i jak przechowuje pliki?',
    answer:
      'HDFS (Hadoop Distributed File System) dzieli pliki na bloki (domyślnie 128 MB) i replikuje każdy blok na 3 węzłach. Dzięki temu jest odporny na awarie sprzętu.',
  },
  {
    id: 4,
    category: 'hadoop',
    question: 'Jaka jest różnica między NameNode a DataNode w HDFS?',
    answer:
      'NameNode — "mózg" HDFS, przechowuje metadane (gdzie są bloki), ale NIE przechowuje faktycznych danych.\nDataNode — "mięśnie", fizycznie przechowuje bloki danych na dysku.',
  },
  {
    id: 5,
    category: 'hadoop',
    question: 'Na czym polega model programowania MapReduce?',
    answer:
      'MapReduce składa się z dwóch faz:\n• Map — każdy węzeł przetwarza lokalny fragment danych i emituje pary (klucz, wartość)\n• Reduce — agreguje wartości dla tego samego klucza z wszystkich węzłów.',
  },
  {
    id: 6,
    category: 'hadoop',
    question: 'Dlaczego MapReduce jest wolny w porównaniu do Spark?',
    answer:
      'MapReduce zapisuje wyniki każdej operacji na dysk (HDFS) — powoduje ogromne opóźnienia I/O. Spark trzyma dane w pamięci RAM przez cały czas przetwarzania.',
  },
  {
    id: 7,
    category: 'hadoop',
    question: 'Co to jest YARN i po co jest potrzebny?',
    answer:
      'YARN (Yet Another Resource Negotiator) zarządza zasobami klastra (CPU, RAM). Decyduje, który węzeł dostanie ile zasobów dla danego zadania. Dzięki YARN klaster może uruchamiać różne silniki (Spark, MapReduce, Hive) jednocześnie.',
  },
  {
    id: 8,
    category: 'hadoop',
    question: 'Co to jest Apache Hive i do czego służy?',
    answer:
      'Hive to narzędzie, które pozwala pisać zapytania w SQL-podobnym języku HiveQL na danych przechowanych w HDFS. "Tłumaczy" zapytania SQL na zadania MapReduce lub Spark.',
  },
  {
    id: 9,
    category: 'hadoop',
    question: 'Wyjaśnij zasadę "data locality" w Hadoop.',
    answer:
      '"Data locality" (lokalność danych) oznacza, że Hadoop stara się uruchamiać obliczenia NA tym węźle, na którym fizycznie leżą dane. Zmniejsza ruch sieciowy i przyspiesza przetwarzanie.',
  },
  {
    id: 10,
    category: 'hadoop',
    question: 'Czym różni się architektura Lambda od architektury Kappa?',
    answer:
      'Lambda Architecture — dwie ścieżki: batch (historyczne dane) + streaming (dane na żywo). Skomplikowana w utrzymaniu.\nKappa Architecture — tylko jedna ścieżka strumieniowa dla wszystkiego. Prostsza, ale wymaga potężnego systemu streamingowego (np. Kafka + Spark Streaming).',
  },
  {
    id: 11,
    category: 'hadoop',
    question: 'Co to jest Data Lake i czym różni się od Data Warehouse?',
    answer:
      'Data Lake — przechowuje raw, surowe dane w dowolnym formacie (schematless on read). Tanie, elastyczne.\nData Warehouse — ustrukturyzowane dane z określonym schematem (schema on write). Droższe, szybkie do zapytań SQL.\nData Lakehouse łączy oba podejścia (Delta Lake, Apache Iceberg).',
  },
  {
    id: 12,
    category: 'hadoop',
    question: 'Jakie są 3 tryby uruchamiania Apache Hadoop?',
    answer:
      '1. Standalone (lokalny) — jeden proces JVM, bez HDFS. Do testowania.\n2. Pseudo-distributed — wszystkie komponenty na jednej maszynie, ale w osobnych procesach.\n3. Fully distributed — klaster wielu maszyn. Środowisko produkcyjne.',
  },

  // ─── SPARK ───────────────────────────────────────────────────────────────
  {
    id: 13,
    category: 'spark',
    question: 'Co to jest Apache Spark i jak różni się od MapReduce?',
    answer:
      'Spark to silnik przetwarzania danych w pamięci, 10–100× szybszy od MapReduce. Kluczowa różnica: Spark trzyma dane w RAM (RDD/DataFrame) zamiast zapisywać na dysk po każdej operacji.',
  },
  {
    id: 14,
    category: 'spark',
    question: 'Co to jest RDD (Resilient Distributed Dataset)?',
    answer:
      'RDD to podstawowa abstrakcja danych w Spark:\nR — Resilient (odporny): automatyczne odtwarzanie po awarii węzła\nD — Distributed: dane rozłożone na wielu węzłach\nD — Dataset: niemutowalna kolekcja elementów\nRDD jest "leniwy" — obliczenia uruchamiane dopiero przy akcji.',
  },
  {
    id: 15,
    category: 'spark',
    question: 'Czym różni się transformacja od akcji w Spark?',
    answer:
      'Transformacja (np. filter, map, groupBy) — leniwa operacja, tworzy nowy RDD/DataFrame, NIE uruchamia obliczeń.\nAkcja (np. count, show, collect, write) — URUCHAMIA obliczenia i zwraca wynik do drivera lub zapisuje dane.',
  },
  {
    id: 16,
    category: 'spark',
    question: 'Co to jest SparkSession i do czego służy?',
    answer:
      'SparkSession to punkt wejścia do Spark 2.0+. Łączy dawne konteksty (SparkContext, SQLContext, HiveContext) w jeden obiekt. Tworzymy ją:\nfrom pyspark.sql import SparkSession\nspark = SparkSession.builder.appName("Nazwa").getOrCreate()',
  },
  {
    id: 17,
    category: 'spark',
    question: 'Jaka jest różnica między narrow a wide transformacją?',
    answer:
      'Narrow transformation (np. map, filter) — każda partycja wejściowa mapuje się na jedną wyjściową. Brak shuffle — szybkie.\nWide transformation (np. groupBy, join, repartition) — dane muszą się przemieszczać między węzłami (shuffle). Kosztowne!',
  },
  {
    id: 18,
    category: 'spark',
    question: 'Co to jest Spark SQL i jak używać widoków tymczasowych?',
    answer:
      'Spark SQL pozwala pisać standardowe zapytania SQL na DataFrame\'ach.\nPrzykład:\ndf.createOrReplaceTempView("sprzedaz")\nwynik = spark.sql("SELECT kraj, SUM(cena) FROM sprzedaz GROUP BY kraj")',
  },
  {
    id: 19,
    category: 'spark',
    question: 'Co to jest Catalyst Optimizer w Spark SQL?',
    answer:
      'Catalyst to silnik optymalizacji zapytań w Spark SQL. Automatycznie:\n• Przesuwa filtry jak najwcześniej (predicate pushdown)\n• Dobiera właściwy plan fizyczny (broadcast join vs sort-merge join)\n• Generuje zoptymalizowany kod bajtowy (Whole-Stage Code Generation)',
  },
  {
    id: 20,
    category: 'spark',
    question: 'Czym jest broadcast join w Spark i kiedy go używać?',
    answer:
      'Broadcast join — mała tabela jest "przesyłana" (broadcast) do WSZYSTKICH węzłów. Spark nie robi wtedy kosztownego shuffle.\nUżywaj gdy jedna tabela jest mała (<10 MB domyślnie):\ndf_duzy.join(broadcast(df_maly), "id")',
  },
  {
    id: 21,
    category: 'spark',
    question: 'Co to jest Spark Streaming / Structured Streaming?',
    answer:
      'Structured Streaming to model przetwarzania danych strumieniowych w Spark, traktujący strumień jako nieskończoną tabelę.\nDane napływają ciągle (np. z Kafki), Spark przetwarza je mikro-batchami lub ciągłym trybem.\nAPI identyczne jak DataFrame — łatwe programowanie.',
  },
  {
    id: 22,
    category: 'spark',
    question: 'Jakie są 4 tryby uruchamiania Sparka (deploy modes)?',
    answer:
      '1. Local — na jednej maszynie (local[*] = wszystkie rdzenie). Do testów.\n2. Standalone — własny cluster manager Spark.\n3. YARN — na klastrze Hadoop.\n4. Kubernetes — w środowisku kontenerowym (k8s).',
  },
  {
    id: 23,
    category: 'spark',
    question: 'Co to jest partycja w Spark i dlaczego ma znaczenie?',
    answer:
      'Partycja to podstawowa jednostka równoległości — każda partycja danych przetwarza jeden executor w Sparku.\nZa mało partycji = za mało równoległości = wolno.\nZa dużo partycji = overhead zarządzania = też wolno.\nZłota zasada: 2–4 partycje na rdzeń CPU w klastrze.',
  },
  {
    id: 24,
    category: 'spark',
    question: 'Co robi operacja cache() / persist() w Spark?',
    answer:
      'cache() / persist() zapisuje DataFrame/RDD w pamięci RAM (lub na dysku) po pierwszym obliczeniu. Dzięki temu kolejne operacje na tych samych danych są wielokrotnie szybsze.\nUżywaj gdy używasz tego samego DataFrame wielokrotnie w kodzie.',
  },

  // ─── PYTHON ──────────────────────────────────────────────────────────────
  {
    id: 25,
    category: 'python',
    question: 'Czym różni się lista od krotki (tuple) w Pythonie?',
    answer:
      'Lista [1, 2, 3] — mutowalna (można zmieniać), wolniejsza.\nKrotka (1, 2, 3) — niemutowalna (nie można zmieniać), szybsza, bezpieczna jako klucz słownika.\nZasada: używaj krotki gdy dane się nie zmieniają.',
  },
  {
    id: 26,
    category: 'python',
    question: 'Co to jest list comprehension i kiedy go używać?',
    answer:
      'List comprehension to zwięzły sposób tworzenia list:\nkwadraty = [x**2 for x in range(10) if x % 2 == 0]\n# [0, 4, 16, 36, 64]\nUżywaj zamiast pętli for gdy tworzysz nową listę na podstawie istniejącej.',
  },
  {
    id: 27,
    category: 'python',
    question: 'Co to jest generator w Pythonie i jak się różni od listy?',
    answer:
      'Generator generuje wartości "na żądanie" (lazy evaluation) — nie trzyma wszystkich elementów w pamięci.\ngen = (x**2 for x in range(10**9))  # zużywa ~0 MB RAM\nIdealny dla Big Data — przetwarzanie danych wiersz po wierszu bez wczytywania całego pliku do pamięci.',
  },
  {
    id: 28,
    category: 'python',
    question: 'Co to jest dekorator (@) w Pythonie?',
    answer:
      'Dekorator to funkcja, która "owija" inną funkcję, dodając zachowanie bez modyfikacji jej kodu:\n@timer\ndef oblicz_spark():\n    ...\nPod spodem: oblicz_spark = timer(oblicz_spark)\nCzęsto używane: @staticmethod, @classmethod, @property, @cache (functools)',
  },
  {
    id: 29,
    category: 'python',
    question: 'Czym jest *args i **kwargs w definicji funkcji?',
    answer:
      '*args — dowolna liczba argumentów pozycyjnych (krotka)\n**kwargs — dowolna liczba argumentów kluczowych (słownik)\ndef funkcja(*args, **kwargs):\n    print(args)   # (1, 2, 3)\n    print(kwargs) # {"a": 1, "b": 2}',
  },
  {
    id: 30,
    category: 'python',
    question: 'Co to są type hints i dlaczego warto ich używać?',
    answer:
      'Type hints (Python 3.5+) to adnotacje typów, które NIE wykrzykują błędów w runtime, ale pomagają edytorom i narzędziom jak mypy:\ndef dodaj(a: int, b: int) -> int:\n    return a + b\nDlaczego: lepsza czytelność, łatwiejsze debugowanie, autocomplete w IDE.',
  },
  {
    id: 31,
    category: 'python',
    question: 'Jak działa context manager (with) w Pythonie?',
    answer:
      'Context manager automatycznie zarządza zasobami (otwiera i zamyka):\nwith open("plik.txt") as f:\n    data = f.read()  # plik zamknięty automatycznie\nImplementacja przez __enter__ i __exit__ lub @contextmanager.\nW PySpark SparkSession zarządza się podobnie.',
  },
  {
    id: 32,
    category: 'python',
    question: 'Co to jest walrus operator (:=) w Pythonie 3.8+?',
    answer:
      'Operator morsa := pozwala przypisać wartość wewnątrz wyrażenia:\nwhile chunk := plik.read(8192):\n    przetworz(chunk)\nLub:\nif (n := len(dane)) > 100:\n    print(f"Za dużo: {n} elementów")\nPrzydatny gdy chcesz uniknąć podwójnego wywołania funkcji.',
  },
  {
    id: 33,
    category: 'python',
    question: 'Czym różni się DataFrame w pandas od DataFrame w PySpark?',
    answer:
      'pandas DataFrame — dane w pamięci jednej maszyny, mutowalne, eager evaluation.\nPySpark DataFrame — dane rozproszone na klastrze, niemutowalne (każda operacja tworzy nowy DF), lazy evaluation (obliczenia dopiero przy akcji).\nPySpark nie ma rzeczywistego indeksu wierszy jak pandas.',
  },
  {
    id: 34,
    category: 'python',
    question: 'Co to jest match/case w Pythonie 3.10+?',
    answer:
      'match/case to strukturalne dopasowanie wzorców (structural pattern matching):\nmatch status:\n    case 200:\n        return "OK"\n    case 404:\n        return "Nie znaleziono"\n    case _:\n        return "Nieznany status"\nBardziej czytelne niż długie if/elif.',
  },
  {
    id: 35,
    category: 'python',
    question: 'Jak iterować efektywnie przez duży plik CSV w Pythonie?',
    answer:
      'Używaj iteratora/generatora zamiast wczytywać cały plik:\nimport csv\nwith open("duzy.csv") as f:\n    reader = csv.DictReader(f)\n    for wiersz in reader:  # jeden wiersz na raz\n        przetworz(wiersz)\nAlbo z pandas: pd.read_csv("duzy.csv", chunksize=10000)',
  },
  {
    id: 36,
    category: 'python',
    question: 'Co to jest f-string i dlaczego jest lepszy od format()?',
    answer:
      'F-string (Python 3.6+) to najszybszy i najczytelniejszy sposób formatowania:\nname = "Spark"\nprint(f"Witaj, {name}! Wynik: {2 + 2:.2f}")\n# Witaj, Spark! Wynik: 4.00\nJest szybszy niż .format() i % — Python eval-uje wyrażenia w {} bezpośrednio.',
  },
  {
    id: 37,
    category: 'python',
    question: 'Co to jest lambda w Pythonie i kiedy jej używać?',
    answer:
      'Lambda to anonimowa, jednolinijkowa funkcja:\nkwadrat = lambda x: x ** 2\nUżytecznie z map/filter/sorted:\ndf.sort(key=lambda row: row["cena"], reverse=True)\nW PySpark zamiast lambda lepiej używać F.col() — lambda nie jest optymalizowana przez Catalyst!',
  },
  {
    id: 38,
    category: 'python',
    question: 'Co to jest pathlib i dlaczego warto używać zamiast os.path?',
    answer:
      'pathlib (Python 3.4+) oferuje obiektowy interfejs do ścieżek plików:\nfrom pathlib import Path\np = Path("/data/pliki")\np.mkdir(parents=True, exist_ok=True)\nfor csv in p.glob("*.csv"):\n    print(csv.name)\nCzytelniejsze niż os.path.join() i działa na Windows/Linux/Mac.',
  },
  {
    id: 39,
    category: 'python',
    question: 'Jak działa GIL (Global Interpreter Lock) w CPythonie?',
    answer:
      'GIL to blokada w CPythonie, która pozwala tylko jednemu wątkowi naraz wykonywać bytecode Pythona.\nEfekt: wątki (threading) nie przyspieszają CPU-bound kodu.\nRozwiązania:\n• multiprocessing — osobne procesy (własne GIL)\n• asyncio — I/O-bound (nie CPU)\n• PySpark — JVM obchodzi GIL całkowicie',
  },
  {
    id: 40,
    category: 'python',
    question: 'Co to jest @dataclass w Pythonie 3.7+ i jak działa?',
    answer:
      'Dekorator @dataclass automatycznie generuje __init__, __repr__, __eq__ itp.:\nfrom dataclasses import dataclass\n@dataclass\nclass Pracownik:\n    imie: str\n    pensja: float = 0.0\np = Pracownik("Anna", 5000.0)\nprint(p)  # Pracownik(imie=\'Anna\', pensja=5000.0)',
  },
];
