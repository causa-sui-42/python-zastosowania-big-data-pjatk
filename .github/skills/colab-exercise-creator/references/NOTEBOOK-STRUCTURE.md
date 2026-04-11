# Notebook Structure Guide

## Cell-by-Cell Template

### Cell 1: Header (Markdown)

```markdown
# 🎯 Exercise: [Topic Name]

**Course:** [Course Name]
**Week:** [Week Number]
**Estimated Time:** ⏱️ [Duration]
**Difficulty:** [⭐ / ⭐⭐ / ⭐⭐⭐]

## 📚 Learning Objectives

By completing this notebook, you will be able to:
1. [Specific skill 1]
2. [Specific skill 2]
3. [Specific skill 3]

## 📋 Prerequisites
- [What students should already know]

---
> 💡 **Tip:** Run each cell with `Shift+Enter` or click the ▶️ button.
> If you get stuck, check the hint cells (click to expand) or ask your TA!
```

### Cell 2: Setup (Code)

```python
# @title 🔧 Setup — Run this cell first!

# Install any additional packages
# !pip install -q pandas seaborn plotly

# Standard imports
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Colab display settings
pd.set_option('display.max_columns', 20)
pd.set_option('display.max_rows', 50)
plt.style.use('seaborn-v0_8-whitegrid')

# Reproducibility
np.random.seed(42)

print("✅ Setup complete! Let's get started 🚀")
```

### Cell 3: Introduction (Markdown)

```markdown
## 📖 Quick Refresher

[Brief explanation of the topic — 3-5 paragraphs max]

### Key Concepts

| Concept | Description | Example |
|---------|-------------|---------|
| [Term 1] | [Short explanation] | `code_example()` |
| [Term 2] | [Short explanation] | `code_example()` |
```

### Cell 4: Data Loading (Code, if applicable)

```python
# @title 📊 Load the Dataset

# Option A: Load from URL (preferred for Colab)
url = "https://raw.githubusercontent.com/..."
df = pd.read_csv(url)

# Option B: Generate synthetic data
# df = pd.DataFrame({...})

print(f"📊 Dataset shape: {df.shape}")
print(f"📋 Columns: {list(df.columns)}")
df.head()
```

### Cell 5: Guided Example (Markdown + Code)

```markdown
## 🎓 Guided Example

Let's work through a complete example together before you try on your own.

**Task:** [Clear description of what the example demonstrates]
```

```python
# @title 🎓 Guided Example — Run and study this

# Step 1: [Description]
step_1_result = some_operation(df)

# Step 2: [Description]  
step_2_result = another_operation(step_1_result)  # 👈 Note this technique

# Step 3: [Description]
final_result = finish(step_2_result)
print(f"Result: {final_result}")
```

### Exercise Cells Pattern (repeat for each exercise)

**Exercise Description (Markdown):**

```markdown
---

## ✏️ Exercise [N]: [Title]

**Difficulty:** ⭐⭐

[Clear description of what students need to do]

**Expected output:**
```
[Show what the correct output looks like]
```

> 💡 **Hint:** [Optional gentle nudge in the right direction]
```

**Student Code (Code):**

```python
# ✏️ Exercise N: [Title]

# TODO: [Step 1 instruction]
variable_1 = ...  # Replace ... with your code

# TODO: [Step 2 instruction]  
variable_2 = ...  # Replace ... with your code

# TODO: [Step 3 instruction]
result = ...  # Replace ... with your code

# Show your result (don't modify this)
print(f"Your answer: {result}")
```

**Hint Cell (Code, collapsed):**

```python
# @title 💡 Click for Hint — Exercise N
print("""
Hint 1: Think about using the `.groupby()` method
Hint 2: The aggregation function you need is `.mean()`
Hint 3: Remember to reset the index with `.reset_index()`
""")
```

**Test Cell (Code):**

```python
# @title ✅ Test — Exercise N (Run to check your answer)

# Automated checks
try:
    assert variable_1 is not ..., "❌ You haven't completed Step 1 yet"
    assert isinstance(result, pd.DataFrame), "❌ Result should be a DataFrame"
    assert len(result) == 5, f"❌ Expected 5 rows, got {len(result)}"
    assert "column_name" in result.columns, "❌ Missing expected column"
    print("✅ All tests passed! Great job! 🎉")
except AssertionError as e:
    print(str(e))
    print("Try again! You've got this 💪")
except Exception as e:
    print(f"❌ Something went wrong: {e}")
    print("Double-check your code and try again")
```

### Bonus Challenge (Markdown + Code)

```markdown
---

## 🏆 Bonus Challenge (Optional)

For those who want an extra challenge:

[Description of a more complex, open-ended problem]
```

### Summary (Markdown)

```markdown
---

## 📝 Summary

Great work completing this exercise! 🎉 Here's what you practiced:

- ✅ [Skill 1]
- ✅ [Skill 2] 
- ✅ [Skill 3]

### 📚 Further Reading
- [Resource 1](URL)
- [Resource 2](URL)

### 🔮 Next Up
In the next exercise, we'll explore **[next topic]**!
```

## Colab-Specific Features

### Collapsible Sections
Use `# @title` to create collapsible code cells:
```python
# @title Section Title (click to expand/collapse)
```

### Form Fields (interactive inputs)
```python
# @title Configure Parameters
learning_rate = 0.01  # @param {type: "number"}
dataset = "iris"  # @param ["iris", "wine", "digits"]
show_plot = True  # @param {type: "boolean"}
```

### Google Drive Integration
```python
from google.colab import drive
drive.mount('/content/drive')
```

### File Upload
```python
from google.colab import files
uploaded = files.upload()
```
