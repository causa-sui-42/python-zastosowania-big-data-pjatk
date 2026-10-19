# 📝 Zadanie domowe 7 — Structured Streaming Basics

**Termin:** Przed wykładem 8 (28.06.2026)  
**Szacowany czas:** 25 minut  
**Cel:** Zrozumienie podstaw Spark Structured Streaming

---

## 🎯 Zadanie: Real-time monitoring logów 📊⚡

Zasymulujemy strumień logów HTTP i będziemy je analizować w czasie rzeczywistym!

### Setup

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import window, count, col, from_json
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, TimestampType
import time

spark = SparkSession.builder \
    .appName("StreamingLogs") \
    .getOrCreate()

spark.sparkContext.setLogLevel("WARN")  # Mniej szumu w logach
```

### Zadanie 1: Socket Streaming (15 min)

#### A. Serwer "nadawcy" logów

Uruchom to w osobnym terminalu/notebooku:

```python
import socket
import time
import random
from datetime import datetime

def send_logs():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(("localhost", 9999))
    server.listen(1)
    print("✅ Serwer nasłuchuje na porcie 9999...")
    
    conn, addr = server.accept()
    print(f"Połączono z {addr}")
    
    statuses = [200, 200, 200, 404, 500, 200, 301]
    paths = ["/", "/api/users", "/api/products", "/login", "/checkout"]
    
    try:
        for i in range(100):  # Wyślij 100 logów
            status = random.choice(statuses)
            path = random.choice(paths)
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            log_message = f"{timestamp}|{status}|{path}\n"
            conn.send(log_message.encode())
            print(f"Wysłano: {log_message.strip()}")
            
            time.sleep(1)  # Co sekundę nowy log
    finally:
        conn.close()
        server.close()

send_logs()
```

#### B. Consumer — Analiza streaming

```python
# Wczytaj stream z socketu
lines = spark.readStream \
    .format("socket") \
    .option("host", "localhost") \
    .option("port", 9999) \
    .load()

# Parse logów (format: timestamp|status|path)
from pyspark.sql.functions import split

logs = lines.select(
    split(col("value"), "\\|").alias("parts")
).select(
    col("parts")[0].alias("timestamp").cast("timestamp"),
    col("parts")[1].alias("status").cast("int"),
    col("parts")[2].alias("path")
)

# Zadanie: Zlicz statusy HTTP w oknie 30-sekundowym
status_counts = logs \
    .groupBy(
        window(col("timestamp"), "30 seconds"),  # Okno czasowe
        col("status")
    ) \
    .count() \
    .orderBy("window")

# Uruchom streaming query
query = status_counts.writeStream \
    .outputMode("complete") \
    .format("console") \
    .option("truncate", False) \
    .start()

query.awaitTermination(timeout=120)  # 2 minuty
```

---

### Zadanie 2: File-based Streaming (10 min)

Stwórz streaming, który śledzi folder i przetwarza nowe pliki CSV w locie:

```python
# Schema dla plików
schema = StructType([
    StructField("user_id", IntegerType()),
    StructField("product", StringType()),
    StructField("price", IntegerType()),
    StructField("timestamp", TimestampType())
])

# Streaming z folderu
stream_df = spark.readStream \
    .schema(schema) \
    .option("maxFilesPerTrigger", 1) \
    .csv("data/streaming_input/")

# Analiza: suma sprzedaży na produkt
sales_by_product = stream_df \
    .groupBy("product") \
    .sum("price") \
    .withColumnRenamed("sum(price)", "total_sales")

# Zapisuj wyniki do folderu
query2 = sales_by_product.writeStream \
    .outputMode("complete") \
    .format("json") \
    .option("path", "data/streaming_output/") \
    .option("checkpointLocation", "data/checkpoint/") \
    .start()
```

Teraz ręcznie dodawaj pliki CSV do folderu `data/streaming_input/` i obserwuj jak Spark je przetwarza! 🎉

---

## ✅ Co wysłać?

1. 📸 **Screenshot** działającego streaming query (konsola z wynikami)
2. 📝 Kod obu zadań (socket + file streaming)
3. 🤔 **Mini raport**: Jakie są różnice między batch processing a streaming? (2-3 zdania)

---

## 🎁 Bonus

- ⏱️ Zmień okno czasowe na 10 sekund i zobacz jak zmienia się output
- 📊 Dodaj watermarking do obsługi *late data*: `.withWatermark("timestamp", "1 minute")`
- 🚦 Filtruj tylko błędy (status >= 400) w streaming query

---

## 💡 Wskazówki

- `outputMode("complete")` — cały wynik, `outputMode("append")` — tylko nowe rekordy
- `checkpointLocation` jest WYMAGANY dla streaming jobów — tam Spark zapisuje stan
- W produkcji zamiast socketu użyjesz Kafki, Kinesis, Pub/Sub, etc.

Powodzenia z real-time! ⚡📊
