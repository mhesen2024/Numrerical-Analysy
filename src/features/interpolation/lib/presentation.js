const METHOD_META = {
  forward: {
    label: "Newton Forward Difference",
    badgeTone: "start",
  },
  backward: {
    label: "Newton Backward Difference",
    badgeTone: "end",
  },
  "centered-stirling": {
    label: "Centered Difference (Stirling)",
    badgeTone: "center",
  },
  "forward-fallback": {
    label: "Forward Difference (Fallback)",
    badgeTone: "neutral",
  },
  "general-divided-difference": {
    label: "General Newton Divided Difference",
    badgeTone: "neutral",
  },
};

export function getMethodMeta(method) {
  return METHOD_META[method] ?? { label: method, badgeTone: "neutral" };
}

export function formatNumber(value, digits = 7) {
  if (!Number.isFinite(value)) {
    return "-";
  }
  return value.toFixed(digits);
}
