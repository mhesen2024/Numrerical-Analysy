// هامش صغير للتعامل مع أخطاء الدقة في الأرقام العشرية.
const EPSILON = 1e-9;

function factorial(n) {
  if (n < 0) {
    throw new Error("Factorial is undefined for negative numbers.");
  }

  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }
  return result;
}

function fallingFactorial(s, k) {
  let product = 1;
  for (let i = 0; i < k; i += 1) {
    product *= s - i;
  }
  return product;
}

function risingFactorial(s, k) {
  let product = 1;
  for (let i = 0; i < k; i += 1) {
    product *= s + i;
  }
  return product;
}

function buildForwardDifferenceTable(yValues) {
  const table = [yValues.slice()];
  for (let order = 1; order < yValues.length; order += 1) {
    const prev = table[order - 1];
    const current = [];
    for (let i = 0; i < prev.length - 1; i += 1) {
      current.push(prev[i + 1] - prev[i]);
    }
    table.push(current);
  }
  return table;
}

function buildDividedDifferenceTable(xValues, yValues) {
  const n = xValues.length;
  const table = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i += 1) {
    table[i][0] = yValues[i];
  }

  for (let order = 1; order < n; order += 1) {
    for (let i = 0; i < n - order; i += 1) {
      // فرق البسط بين قيمتين متتاليتين في العمود السابق.
      const numerator = table[i + 1][order - 1] - table[i][order - 1];
      // فرق المقام بين x البعيدة بحسب رتبة الفرق.
      const denominator = xValues[i + order] - xValues[i];
      table[i][order] = numerator / denominator;
    }
  }

  return table;
}

function evaluateGeneralNewton(xValues, dividedDiffTable, target) {
  let value = dividedDiffTable[0][0];
  const terms = [];

  for (let order = 1; order < xValues.length; order += 1) {
    let product = 1;
    for (let j = 0; j < order; j += 1) {
      product *= target - xValues[j];
    }
    const coefficient = dividedDiffTable[0][order];
    const contribution = product * coefficient;
    value += contribution;
    terms.push({
      order,
      coefficient,
      contribution,
    });
  }

  return { value, terms };
}

function isEquallySpaced(xValues, tolerance = 1e-7) {
  if (xValues.length < 2) {
    return { equallySpaced: false, h: null };
  }

  const h = xValues[1] - xValues[0];
  if (Math.abs(h) < EPSILON) {
    return { equallySpaced: false, h: null };
  }

  for (let i = 2; i < xValues.length; i += 1) {
    const diff = xValues[i] - xValues[i - 1];
    const rel = Math.abs(diff - h) / Math.max(1, Math.abs(h));
    if (rel > tolerance) {
      return { equallySpaced: false, h: null };
    }
  }

  return { equallySpaced: true, h };
}

function pickBestMethod(xValues, target) {
  const left = xValues[0];
  const right = xValues[xValues.length - 1];
  const span = right - left;

  if (Math.abs(span) < EPSILON) {
    return "forward";
  }

  const position = (target - left) / span;
  if (position <= 1 / 3) {
    return "forward";
  }
  if (position >= 2 / 3) {
    return "backward";
  }
  return "centered";
}

function evaluateForward(xValues, yValues, diffs, h, target) {
  const s = (target - xValues[0]) / h;
  let value = yValues[0];
  const terms = [];

  for (let order = 1; order < yValues.length; order += 1) {
    const coefficient = fallingFactorial(s, order) / factorial(order);
    const difference = diffs[order][0];
    const contribution = coefficient * difference;
    value += contribution;
    terms.push({ order, coefficient, difference, contribution });
  }

  return { value, s, terms };
}

function evaluateBackward(xValues, yValues, diffs, h, target) {
  const n = yValues.length;
  const s = (target - xValues[n - 1]) / h;
  let value = yValues[n - 1];
  const terms = [];

  for (let order = 1; order < n; order += 1) {
    const coefficient = risingFactorial(s, order) / factorial(order);
    const difference = diffs[order][n - 1 - order];
    const contribution = coefficient * difference;
    value += contribution;
    terms.push({ order, coefficient, difference, contribution });
  }

  return { value, s, terms };
}

function stirlingCoeffBase(s, termIndex) {
  let product = 1;
  for (let i = 1; i <= termIndex - 1; i += 1) {
    product *= s * s - i * i;
  }
  return product;
}

function evaluateCenteredStirling(xValues, yValues, diffs, h, target) {
  const nearestIndex = xValues.reduce((bestIndex, currentX, index) => {
    const currentDistance = Math.abs(currentX - target);
    const bestDistance = Math.abs(xValues[bestIndex] - target);
    return currentDistance < bestDistance ? index : bestIndex;
  }, 0);

  const maxPairs = Math.min(nearestIndex, xValues.length - 1 - nearestIndex);
  if (maxPairs < 1) {
    return null;
  }

  const s = (target - xValues[nearestIndex]) / h;
  let value = yValues[nearestIndex];
  const terms = [];

  const dividedDifference = (order, startIndex) => {
    const delta = diffs[order][startIndex];
    return delta / (factorial(order) * h ** order);
  };

  for (let j = 1; j <= maxPairs; j += 1) {
    const oddOrder = 2 * j - 1;
    const oddBase = stirlingCoeffBase(s, j);
    // معامل الحد الفردي.
    const oddCoefficient = (s * oddBase * h ** oddOrder) / 2;
    // فرق مقسوم على الجهة اليسرى من المركز.
    const ddLeft = dividedDifference(oddOrder, nearestIndex - j);
    // فرق مقسوم على الجهة اليمنى من المركز.
    const ddRight = dividedDifference(oddOrder, nearestIndex - j + 1);
    // المتوسط بين الحدين الأيسر والأيمن (للتفسير).
    const oddDifference = (ddLeft + ddRight) / 2;
    // المساهمة الكاملة للحد الفردي.
    const oddContribution = oddCoefficient * (ddLeft + ddRight);
    value += oddContribution;
    terms.push({
      order: oddOrder,
      coefficient: oddCoefficient,
      difference: oddDifference,
      contribution: oddContribution,
      type: "odd",
    });

    const evenOrder = 2 * j;
    if (evenOrder < yValues.length) {
      const evenCoefficient = s * s * oddBase * h ** evenOrder;
      const evenDifference = dividedDifference(evenOrder, nearestIndex - j);
      const evenContribution = evenCoefficient * evenDifference;
      value += evenContribution;
      terms.push({
        order: evenOrder,
        coefficient: evenCoefficient,
        difference: evenDifference,
        contribution: evenContribution,
        type: "even",
      });
    }
  }

  return {
    value,
    s,
    centerX: xValues[nearestIndex],
    centerIndex: nearestIndex,
    usedPoints: 2 * maxPairs + 1,
    terms,
  };
}

export function solveInterpolation(rawPoints, target) {
  if (!Array.isArray(rawPoints) || rawPoints.length < 2) {
    throw new Error("At least two points are required.");
  }

  const cleaned = rawPoints
    .map((point) => ({
      x: Number(point.x),
      fx: Number(point.fx),
    }))
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.fx))
    .sort((a, b) => a.x - b.x);

  if (cleaned.length < 2) {
    throw new Error("Please enter valid numeric values for x and f(x).");
  }

  for (let i = 1; i < cleaned.length; i += 1) {
    if (Math.abs(cleaned[i].x - cleaned[i - 1].x) < EPSILON) {
      throw new Error("x values must be unique.");
    }
  }

  const xValues = cleaned.map((point) => point.x);
  const yValues = cleaned.map((point) => point.fx);
  const equalSpacing = isEquallySpaced(xValues);
  const method = pickBestMethod(xValues, target);

  if (!equalSpacing.equallySpaced) {
    const table = buildDividedDifferenceTable(xValues, yValues);
    const result = evaluateGeneralNewton(xValues, table, target);

    return {
      method: "general-divided-difference",
      reason:
        "The x values are not equally spaced, so Newton divided differences are used.",
      value: result.value,
      sortedPoints: cleaned,
      terms: result.terms,
      h: null,
    };
  }

  const diffs = buildForwardDifferenceTable(yValues);
  const h = equalSpacing.h;

  if (method === "forward") {
    const result = evaluateForward(xValues, yValues, diffs, h, target);
    return {
      method: "forward",
      reason: "Target x is closer to the start of the table.",
      value: result.value,
      s: result.s,
      sortedPoints: cleaned,
      terms: result.terms,
      h,
    };
  }

  if (method === "backward") {
    const result = evaluateBackward(xValues, yValues, diffs, h, target);
    return {
      method: "backward",
      reason: "Target x is closer to the end of the table.",
      value: result.value,
      s: result.s,
      sortedPoints: cleaned,
      terms: result.terms,
      h,
    };
  }

  const centered = evaluateCenteredStirling(xValues, yValues, diffs, h, target);
  if (!centered) {
    const fallback = evaluateForward(xValues, yValues, diffs, h, target);
    return {
      method: "forward-fallback",
      reason: "Not enough symmetric points for Stirling, fallback to forward.",
      value: fallback.value,
      s: fallback.s,
      sortedPoints: cleaned,
      terms: fallback.terms,
      h,
    };
  }

  return {
    method: "centered-stirling",
    reason: "Target x is near the center of the table.",
    value: centered.value,
    s: centered.s,
    sortedPoints: cleaned,
    terms: centered.terms,
    h,
    centerX: centered.centerX,
    centerIndex: centered.centerIndex,
    usedPoints: centered.usedPoints,
  };
}
