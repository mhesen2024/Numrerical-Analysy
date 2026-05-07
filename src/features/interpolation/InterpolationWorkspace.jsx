import { useMemo, useState } from "react";
import {
  DEFAULT_POINTS,
  DEFAULT_TARGET_X,
  MAX_POINTS,
  MIN_POINTS,
} from "./constants";
import PointsTable from "./components/PointsTable";
import ResultPanel from "./components/ResultPanel";
import WorkspaceHeader from "./components/WorkspaceHeader";
import { solveInterpolation } from "./lib/interpolationEngine";

function createEmptyRows(count) {
  return Array.from({ length: count }, () => ({ x: "", fx: "" }));
}

export default function InterpolationWorkspace() {
  const [size, setSize] = useState(DEFAULT_POINTS.length);
  const [targetX, setTargetX] = useState(DEFAULT_TARGET_X);
  const [rows, setRows] = useState(DEFAULT_POINTS);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const normalizedSize = useMemo(() => {
    const parsed = Number(size);
    if (!Number.isFinite(parsed)) {
      return MIN_POINTS;
    }
    return Math.min(MAX_POINTS, Math.max(MIN_POINTS, Math.floor(parsed)));
  }, [size]);

  function resizeRows(nextSize) {
    setRows((previous) => {
      if (nextSize === previous.length) {
        return previous;
      }
      if (nextSize < previous.length) {
        return previous.slice(0, nextSize);
      }
      return [...previous, ...createEmptyRows(nextSize - previous.length)];
    });
  }

  function handleSizeChange(event) {
    const next = event.target.value;
    setSize(next);

    const parsed = Number(next);
    if (!Number.isFinite(parsed)) {
      return;
    }
    resizeRows(Math.min(MAX_POINTS, Math.max(MIN_POINTS, Math.floor(parsed))));
  }

  function handleUpdateRow(index, field, value) {
    setRows((previous) =>
      previous.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [field]: value } : row
      )
    );
  }

  function loadDataset(points, nextTargetX) {
    setRows(points);
    setSize(points.length);
    setTargetX(nextTargetX);
    setResult(null);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const target = Number(targetX);
    if (!Number.isFinite(target)) {
      setResult(null);
      setError("Please enter a valid numeric target x.");
      return;
    }

    try {
      const answer = solveInterpolation(rows.slice(0, normalizedSize), target);
      setResult(answer);
    } catch (calculationError) {
      setResult(null);
      setError(calculationError.message || "Unexpected input error.");
    }
  }

  return (
    <section className="relative min-h-screen bg-slate-50 px-4 pb-12 pt-8 text-slate-900 sm:pt-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(14,165,233,0.25),transparent_38%),radial-gradient(circle_at_85%_25%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_70%_85%,rgba(16,185,129,0.14),transparent_35%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <WorkspaceHeader />

        <div className="grid items-start gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4">
            <PointsTable
              size={size}
              targetX={targetX}
              rows={rows.slice(0, normalizedSize)}
              onSizeChange={handleSizeChange}
              onTargetChange={(event) => setTargetX(event.target.value)}
              onSubmit={handleSubmit}
              onLoadDefault={() => loadDataset(DEFAULT_POINTS, DEFAULT_TARGET_X)}
              onUpdateRow={handleUpdateRow}
            />
          </div>

          <ResultPanel result={result} error={error} />
        </div>
      </div>
    </section>
  );
}
