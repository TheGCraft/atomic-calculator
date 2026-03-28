# Atomic Calculator

Atomic Calculator is a super simple calculator built with React and TypeScript.

## Features

- **Basic Arithmetic Operations**: Addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).
- **Real-time Evaluation:** Uses `mathjs` for robust calculation (avoids the pitfalls of `eval()`).
- **Edge Case Protection:** Prevents leading zeros, consecutive operators, and invalid decimal placement.
- **Keyboard Support**:
  - `Enter` or `=` to calculate the result
  - `Escape` or `C` to clear the display
  - `Backspace` or `DEL` to delete the last input
  - Numpad and numbers are fully supported for typing expressions directly.
- **Clean UI**: Simple, intuitive design for quick calculations.

## 🛠️ Technical Challenges & Solutions

### The "Leading Zero" Bug
**Problem:** Native JavaScript `eval()` often treats numbers starting with `0` as Octals, leading to errors when calculating values like `008 + 5`.
**Solution:** I implemented a validation layer in the `addValue` function to prevent multiple leading zeros and integrated `mathjs` which handles string-to-math parsing more reliably.

### Floating Point Precision
**Problem:** Standard JS can result in `0.1 + 0.2 = 0.30000000000000004`.
**Solution:** Used `mathjs` and `.toFixed()` formatting to ensure user-friendly results.

## Technologies Used

- React
- TypeScript
- Vanilla CSS
