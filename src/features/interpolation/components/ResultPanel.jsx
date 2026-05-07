import { formatNumber } from "../lib/presentation";

export default function ResultPanel({ result, error }) {
  const panelClass =
    "rounded-lg sm:rounded-2xl border border-sky-100 bg-white/90 p-3 sm:p-4 shadow-[0_12px_30px_rgba(15,23,42,0.07)] backdrop-blur sm:p-5 lg:sticky lg:top-4";

  if (error) {
    return (
      <aside className={`${panelClass} border-rose-200 bg-rose-50`}>
        <h2 className="mb-0.5 sm:mb-1 text-base sm:text-lg font-semibold text-rose-900">Input Error</h2>
        <p className="text-xs sm:text-sm text-rose-700">{error}</p>
      </aside>
    );
  }

  if (!result) {
    return (
      <aside className={panelClass}>
        <h2 className="mb-0.5 sm:mb-1 text-base sm:text-lg font-semibold text-slate-900">Result</h2>
        <p className="text-xs sm:text-sm text-slate-600">Fill the table and click Calculate.</p>
      </aside>
    );
  }

  return (
    <aside className={panelClass}>
      <div className="mb-2 sm:mb-3">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900">Result</h2>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between rounded-lg sm:rounded-xl border border-sky-100 bg-sky-50 px-2 sm:px-3 py-2 sm:py-2.5">
          <span className="text-xs sm:text-sm text-slate-700">Estimated f(x)</span>
          <strong className="text-sm sm:text-base font-semibold text-slate-900">
            {formatNumber(result.value, 8)}
          </strong>
        </div>
      </div>
    </aside>
  );
}
