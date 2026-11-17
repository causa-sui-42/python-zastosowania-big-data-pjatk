---
marp: true
theme: default
size: 16:9
paginate: false
header: '🧾 Ściąga — Wykład 10: Structured Streaming i Kafka'
footer: 'PJATK | Python w Zastosowaniach Big Data | Studia stacjonarne'
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 13px;
    padding: 18px 26px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 { font-size: 1.3em; color: #2d5986; margin: 0 0 6px 0; }
  h2 { font-size: 1.0em; color: #2d5986; margin: 6px 0 2px 0; border-bottom: 2px solid #2d5986; padding-bottom: 1px; }
  .cols { display: flex; gap: 20px; }
  .col { flex: 1; }
  ul { margin: 2px 0 6px 0; padding-left: 16px; }
  li { margin-bottom: 2px; }
  code { font-size: 0.8em; background: #f0f2f5; padding: 0 3px; border-radius: 3px; }
  pre { font-size: 0.75em; background: #f0f2f5; padding: 5px 7px; border-radius: 5px; margin: 2px 0 5px 0; }
---

# 🌊 Wykład 10 — Structured Streaming i Kafka

<div class="cols">
<div class="col">

## Batch vs streaming
- **Batch**: opóźnienie minuty-godziny (np. raport miesięczny)
- **Streaming**: opóźnienie ms-s (np. alert w czasie rzeczywistym)
- Streaming jest zwykle **bardziej złożony**

## Apache Kafka — kluczowe pojęcia
- **Topic** — logiczny kanał danych
- **Partition** — podział topiku, umożliwia równoległość
- **Producer** — wysyła dane do topiku
- **Consumer** — odczytuje dane z topiku
- **Broker** — serwer Kafki przechowujący partycje

## Structured Streaming — model
- **Unbounded table** — strumień jako nieskończenie rosnąca tabela
- Ten sam DataFrame API co w batch!
```python
df = spark.readStream.format("kafka")...load()
query = df.writeStream.outputMode("append") \
    .format("console").start()
```

</div>
<div class="col">

## Windowed aggregations
```python
df.withWatermark("timestamp", "10 minutes") \
  .groupBy(window("timestamp", "5 minutes"), "sensor") \
  .agg(avg("value"))
```
- **Tumbling window** — rozłączne okna (0-5, 5-10 min...)
- **Sliding window** — okna mogą się nakładać

## Watermarking
- Określa, jak długo czekać na spóźnione dane (np. 10 min)
- Dane spóźnione **ponad** próg → odrzucone
- Bez watermarku przy agregacjach → **rosnące zużycie pamięci** (OOM)

## Output modes
| Mode | Co zapisuje |
|---|---|
| `append` | tylko finalne wiersze (wymaga watermarku przy agregacjach) |
| `complete` | całą tabelę wyników za każdym razem |
| `update` | tylko zmienione wiersze |

## Pułapki
- Brak `checkpointLocation` → utrata stanu po restarcie aplikacji
- Brak watermarku przy ciągłych agregacjach → OOM

</div>
</div>
