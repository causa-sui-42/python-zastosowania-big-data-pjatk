# Presentation Examples

## Example: Python Decorators (Intermediate, Markdown)

Below are excerpted slides showing the expected style and quality.

---

### Title Slide

```markdown
---

# 🐍 Python Decorators
## Making Functions Wear Fancy Hats 🎩

**Python Programming** | Week 7
Dr. Smith

---
```

### Motivation Slide

```markdown
---

## 💡 Why Decorators?

Ever wished you could add superpowers to a function **without changing its code**?

```python
@login_required       # 🔒 Check authentication
@cache_result         # ⚡ Cache for speed
@log_execution_time   # ⏱️ Track performance
def get_user_data(user_id: int) -> dict:
    ...
```

> That's the magic of decorators — **reusable function wrappers!**

---
```

### Code Walkthrough Slide

```markdown
---

## 🔧 Building Our First Decorator

```python
from functools import wraps
from time import time

def timer(func):
    """Measure how long a function takes ⏱️"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time()
        result = func(*args, **kwargs)
        elapsed = time() - start
        print(f"⏱️ {func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    return sum(range(10_000_000))  # 👈 Let's time this!
```

---
```

### Interactive Slide

```markdown
---

## 🤔 Pop Quiz!

What will this print?

```python
@timer
def greet(name: str) -> str:
    return f"Hello, {name}!"

result = greet("Alice")
print(result)
```

**A)** `Hello, Alice!`
**B)** `⏱️ greet took 0.0001s` then `Hello, Alice!`
**C)** Error! 💥

<!-- Answer: B — the decorator prints timing, then we print the result -->

---
```

## Example: Introduction to PySpark (Beginner, Markdown)

### Opening Hook

```markdown
---

## 🔥 The Problem with Big Data

Your trusty pandas script works great with 1GB of data...

| Data Size | pandas | PySpark |
|-----------|--------|---------|
| 1 GB      | ✅ 30s  | ✅ 45s   |
| 10 GB     | 😰 5min | ✅ 1min  |
| 100 GB    | 💀 OOM  | ✅ 8min  |
| 1 TB      | 🪦 RIP  | ✅ 45min |

> When your data outgrows a single machine, it's Spark time! 🚀

---
```

### Side-by-Side Comparison

```markdown
---

## 🔄 pandas vs PySpark — Spot the Difference

**pandas** 🐼
```python
import pandas as pd
df = pd.read_csv("sales.csv")
result = (df.groupby("region")
            .agg({"revenue": "sum"})
            .sort_values("revenue", ascending=False))
```

**PySpark** 🔥
```python
from pyspark.sql import functions as F
df = spark.read.csv("sales.csv", header=True, inferSchema=True)
result = (df.groupBy("region")
            .agg(F.sum("revenue").alias("revenue"))
            .orderBy(F.desc("revenue")))
```

> Almost the same syntax! PySpark was designed to feel familiar 🤝

---
```
