import { formatNumber } from "../lib/presentation";

export default function ResultPanel({ result, error }) {
  const panelClass =
    "rounded-2xl border border-sky-100 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.07)] backdrop-blur sm:p-5 lg:sticky lg:top-4";

  if (error) {
    return (
      <aside className={`${panelClass} border-rose-200 bg-rose-50`}>
        <h2 className="mb-1 text-lg font-semibold text-rose-900">Input Error</h2>
        <p className="text-sm text-rose-700">{error}</p>
      </aside>
    );
  }

  if (!result) {
    return (
      <aside className={panelClass}>
        <h2 className="mb-1 text-lg font-semibold text-slate-900">Result</h2>
        <p className="text-sm text-slate-600">Fill the table and click Calculate.</p>
      </aside>
    );
  }

  return (
    <aside className={panelClass}>
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-slate-900">Result</h2>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between rounded-xl border border-sky-100 bg-sky-50 px-3 py-2.5">
          <span className="text-sm text-slate-700">Estimated f(x)</span>
          <strong className="text-base font-semibold text-slate-900">
            {formatNumber(result.value, 8)}
          </strong>
        </div>
      </div>
    </aside>
  );
}
