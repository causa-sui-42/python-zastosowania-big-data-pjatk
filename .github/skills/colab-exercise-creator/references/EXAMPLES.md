# Exercise Notebook Examples

## Example: pandas GroupBy (Intermediate)

### Header Cell
```markdown
# 🎯 Exercise: Mastering pandas GroupBy

**Course:** Python for Data Science
**Week:** 5
**Estimated Time:** ⏱️ 60 minutes
**Difficulty:** ⭐⭐

## 📚 Learning Objectives

By completing this notebook, you will be able to:
1. Group data using `.groupby()` with single and multiple columns
2. Apply aggregation functions (sum, mean, count, custom)
3. Transform and filter groups
4. Create pivot tables for cross-tabulation

## 📋 Prerequisites
- pandas basics (loading, filtering, selecting columns)
- Python functions and lambda expressions

---
> 💡 **Tip:** Run each cell with `Shift+Enter`. Stuck? Check the hint cells!
```

### Setup Cell
```python
# @title 🔧 Setup — Run this cell first!
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate our dataset: a fictional coffee shop chain ☕
np.random.seed(42)
n = 500

shops = ["Downtown", "Campus", "Mall", "Airport", "Station"]
drinks = ["Espresso", "Latte", "Cappuccino", "Mocha", "Tea"]

sales = pd.DataFrame({
    "date": pd.date_range("2024-01-01", periods=n, freq="4h"),
    "shop": np.random.choice(shops, n),
    "drink": np.random.choice(drinks, n),
    "size": np.random.choice(["S", "M", "L"], n, p=[0.2, 0.5, 0.3]),
    "price": np.random.uniform(2.5, 7.5, n).round(2),
    "quantity": np.random.randint(1, 5, n),
})
sales["revenue"] = (sales["price"] * sales["quantity"]).round(2)

print(f"☕ Coffee sales dataset: {sales.shape[0]} transactions")
print(f"📍 Shops: {', '.join(shops)}")
sales.head()
```

### Exercise 1 (Easy)
```markdown
---
## ✏️ Exercise 1: Basic GroupBy

**Difficulty:** ⭐

Calculate the **total revenue per shop**. Store the result in `revenue_by_shop`.

**Expected output:** A Series with shop names as index and total revenue as values.
```

```python
# ✏️ Exercise 1: Total revenue per shop

# TODO: Group by 'shop' and sum the 'revenue' column
revenue_by_shop = ...  # Replace ... with your code

# Display result
revenue_by_shop
```

```python
# @title 💡 Hint — Exercise 1
print("""
Use: df.groupby("column_name")["value_column"].sum()
Replace column_name with 'shop' and value_column with 'revenue'
""")
```

```python
# @title ✅ Test — Exercise 1
assert revenue_by_shop is not ..., "❌ You haven't written your code yet"
assert isinstance(revenue_by_shop, pd.Series), "❌ Result should be a Series"
assert len(revenue_by_shop) == 5, f"❌ Expected 5 shops, got {len(revenue_by_shop)}"
assert revenue_by_shop.sum() == sales["revenue"].sum(), "❌ Total doesn't match"
print("✅ Exercise 1 passed! Nice work! ☕🎉")
```

### Exercise 3 (Intermediate — Multi-Column GroupBy)
```markdown
---
## ✏️ Exercise 3: Multi-Column GroupBy

**Difficulty:** ⭐⭐

Find the **average price per shop AND drink type**. Store in `avg_price`.

The result should be a DataFrame with columns: `shop`, `drink`, `price`.
```

```python
# ✏️ Exercise 3: Average price by shop and drink

# TODO: Group by both 'shop' and 'drink', calculate mean price
# TODO: Reset index to get a flat DataFrame
avg_price = ...  # Replace ... with your code

avg_price.head(10)
```

```python
# @title ✅ Test — Exercise 3
assert avg_price is not ..., "❌ You haven't written your code yet"
assert isinstance(avg_price, pd.DataFrame), "❌ Result should be a DataFrame"
assert "shop" in avg_price.columns, "❌ Missing 'shop' column — did you reset_index()?"
assert "drink" in avg_price.columns, "❌ Missing 'drink' column"
assert len(avg_price) == len(sales.groupby(["shop", "drink"])), "❌ Wrong number of rows"
print("✅ Exercise 3 passed! You're on a roll! 🔥")
```

### Bonus Challenge
```markdown
---
## 🏆 Bonus Challenge

**The Coffee Shop Dashboard** ☕📊

Create a visualization that shows:
1. A bar chart of total revenue by shop (sorted descending)
2. Color the bars by the most popular drink at each shop

This is open-ended — be creative with your approach!
```
