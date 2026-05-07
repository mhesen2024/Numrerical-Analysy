export default function PointsTable({
  rows,
  size,
  targetX,
  onSizeChange,
  onTargetChange,
  onSubmit,
  onLoadDefault,
  onUpdateRow,
}) {
  const panelClass =
    "rounded-lg sm:rounded-2xl border border-sky-100 bg-white/90 p-3 sm:p-4 shadow-[0_12px_30px_rgba(15,23,42,0.07)] backdrop-blur sm:p-5";
  const inputClass =
    "w-full rounded-lg sm:rounded-xl border border-indigo-200 bg-sky-50 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-sky-600 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-sky-200";

  return (
    <section className={panelClass}>
      <div className="mb-2 sm:mb-3">
        <h2 className="mb-0.5 sm:mb-1 text-base sm:text-lg font-semibold text-slate-900">Data Table</h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Define table size, points, and target x in the same workspace.
        </p>
      </div>

      <form className="mb-2 sm:mb-3 grid gap-2 sm:gap-3" onSubmit={onSubmit}>
        <div className="mb-0 sm:mb-1 grid gap-1.5 sm:gap-2 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-700">Array Size</span>
            <input
              className={inputClass}
              type="number"
              min="2"
              max="20"
              value={size}
              onChange={onSizeChange}
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-700">Target x</span>
            <input
              className={inputClass}
              type="number"
              step="any"
              value={targetX}
              onChange={onTargetChange}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            className="rounded-lg sm:rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-bold text-white transition hover:brightness-105"
          >
            Calculate f(x)
          </button>
          <button
            type="button"
            className="rounded-lg sm:rounded-xl bg-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-bold text-slate-900 transition hover:bg-slate-300"
            onClick={onLoadDefault}
          >
            Load Quick Example
          </button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-lg sm:rounded-2xl border border-sky-100">
        <table className="w-full border-collapse text-xs sm:text-sm">
          <thead>
            <tr>
              <th className="border-b border-slate-200 bg-sky-50 px-2 sm:px-3 py-2 sm:py-2.5 text-left font-semibold text-slate-900">
                #
              </th>
              <th className="border-b border-slate-200 bg-sky-50 px-2 sm:px-3 py-2 sm:py-2.5 text-left font-semibold text-slate-900">
                x
              </th>
              <th className="border-b border-slate-200 bg-sky-50 px-2 sm:px-3 py-2 sm:py-2.5 text-left font-semibold text-slate-900">
                f(x)
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`point-${index}`} className="even:bg-sky-50/40">
                <td className="border-b border-slate-200 px-2 sm:px-3 py-2 sm:py-2.5 text-slate-700">
                  {index + 1}
                </td>
                <td className="border-b border-slate-200 px-2 sm:px-3 py-2 sm:py-2.5">
                  <input
                    className={inputClass}
                    type="number"
                    step="any"
                    value={row.x}
                    onChange={(event) => onUpdateRow(index, "x", event.target.value)}
                    placeholder="x_i"
                  />
                </td>
                <td className="border-b border-slate-200 px-2 sm:px-3 py-2 sm:py-2.5">
                  <input
                    className={inputClass}
                    type="number"
                    step="any"
                    value={row.fx}
                    onChange={(event) => onUpdateRow(index, "fx", event.target.value)}
                    placeholder="f(x_i)"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
