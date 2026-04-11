# Exercise Design Principles

## The FIRE Framework

Design exercises that are **F**un, **I**nteractive, **R**eal-world, and **E**scalating.

### 🎮 Fun
- Use **interesting datasets** — movies, sports stats, music, food, games
- Frame problems as **stories**: "You're a data analyst at Spotify..."
- Add personality to variable names and scenarios
- Celebrate success: `print("✅ Correct! 🎉")` after each exercise

### 🔄 Interactive
- Every exercise has **immediate automated feedback** (assert statements)
- Include **hint cells** that students can reveal when stuck
- Use Colab **form fields** for exploration: `# @param {type: "slider"}`
- Add **visualization outputs** — students love seeing charts appear

### 🌍 Real-World
- Use **real or realistic datasets** (Kaggle, Awesome Public Datasets, generated)
- Frame exercises as **job tasks**: "Your manager asks you to..."
- Include **messy data** scenarios (missing values, duplicates, wrong types)
- Connect to **industry use cases** students care about

### 📈 Escalating
- Start each exercise set with a **freebie** (confidence builder)
- Build difficulty **gradually** — each exercise adds one concept
- Later exercises **combine** earlier concepts
- Optional **bonus challenges** reward advanced students

## Exercise Types

### Type 1: Fill-in-the-Blank (Beginner)
```python
# Complete the code to filter rows where age > 21
result = df[df["age"] __ 21]  # Replace __ with the correct operator
```

### Type 2: Write-the-Function (Intermediate)
```python
def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean the dataset by:
    1. Removing duplicate rows
    2. Filling missing 'age' values with the median
    3. Converting 'date' column to datetime
    
    Returns the cleaned DataFrame.
    """
    # TODO: Your code here (3-5 lines)
    ...
```

### Type 3: Analyze-and-Answer (Intermediate)
```python
# Using the sales dataset, answer:
# Q1: Which region had the highest total revenue?
# Q2: What month had the most transactions?

# TODO: Write your analysis code below
```

### Type 4: Debug-and-Fix (Intermediate-Advanced)
```python
# 🐛 This code has 3 bugs. Find and fix them!
def calculate_stats(data):
    mean = sum(data) / len(data)
    variance = sum((x - mean) * 2 for x in data) / len(data)  # Bug 1
    std_dev = variance ** 2  # Bug 2
    return {"mean": mean, "std": std_dev, "variance": variance}  # Bug 3
```

### Type 5: Build-from-Scratch (Advanced)
```python
# Build a complete data pipeline that:
# 1. Loads the dataset from the given URL
# 2. Cleans and preprocesses the data
# 3. Performs exploratory analysis
# 4. Creates a visualization
# 5. Exports the results

# Your code here — no scaffolding provided!
```

## Testing Patterns

### Basic Assertion
```python
assert result == expected, f"Expected {expected}, got {result}"
print("✅ Correct!")
```

### DataFrame Check
```python
assert isinstance(result, pd.DataFrame), "Result should be a DataFrame"
assert result.shape == (10, 3), f"Expected shape (10, 3), got {result.shape}"
assert list(result.columns) == ["a", "b", "c"], "Column names don't match"
```

### Approximate Check (for floats)
```python
assert abs(result - expected) < 0.01, f"Expected ~{expected}, got {result}"
```

### Multiple Checks with Feedback
```python
score = 0
total = 3

if isinstance(result, pd.DataFrame):
    score += 1
    print("✅ Correct type")
else:
    print("❌ Result should be a DataFrame")

if len(result) == expected_rows:
    score += 1
    print("✅ Correct number of rows")
else:
    print(f"❌ Expected {expected_rows} rows, got {len(result)}")

print(f"\nScore: {score}/{total}")
if score == total:
    print("🎉 Perfect! All checks passed!")
```

## Dataset Sources

### Recommended Public Datasets
| Dataset | Topics | Good For |
|---------|--------|----------|
| Iris / Penguins | Classification | ML basics, pandas intro |
| Titanic | Binary classification | Feature engineering, EDA |
| IMDB Movies | Text, categories | Filtering, groupby, text processing |
| NYC Taxi Rides | Time series, geo | Large data, PySpark, aggregation |
| Spotify Top Songs | Music features | Visualization, correlation, fun factor |
| World Bank Data | Economics | Time series, joins, real-world messiness |
| Stack Overflow Survey | Tech/career | Categorical data, survey analysis |

### Generating Synthetic Data
When real data isn't ideal, generate it:
```python
import numpy as np
import pandas as pd

np.random.seed(42)
df = pd.DataFrame({
    "student_id": range(1, 101),
    "name": [f"Student_{i}" for i in range(1, 101)],
    "grade": np.random.normal(75, 12, 100).round(1),
    "course": np.random.choice(["Python", "Big Data", "ML"], 100),
    "attendance": np.random.uniform(0.5, 1.0, 100).round(2),
})
```

## Common Mistakes to Avoid

### In Exercise Design
- ❌ **Ambiguous instructions** — Be explicit about expected output type and format
- ❌ **No starter code** — Even advanced exercises benefit from imports and variable names
- ❌ **Broken test cells** — Always run your own tests before releasing
- ❌ **Missing `# TODO`** — Students should know exactly where to write code
- ❌ **Too many exercises** — Quality over quantity; 5-7 focused exercises > 15 trivial ones

### In Notebooks
- ❌ **Cell order dependency** that isn't clear — Number exercises and add "Run the cells above first"
- ❌ **Local file paths** — Always use URLs or generate data inline
- ❌ **Uncommented assertions** — Always explain what the test checks
- ❌ **No `!pip install`** for non-standard packages
