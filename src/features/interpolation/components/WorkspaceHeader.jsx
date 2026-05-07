import { PiFunctionBold } from "react-icons/pi";
import LogicExplanation from "./LogicExplanation";

export default function WorkspaceHeader() {
  return (
    <header className="mb-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-sky-700">
        Numerical Analysis Toolkit
      </p>
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
            <PiFunctionBold className="text-2xl" />
          </span>
          <h1 className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
            Interpolation Studio
          </h1>
        </div>
        <LogicExplanation />
      </div>
      <p className="max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
        Enter tabulated values of <strong>x</strong> and <strong>f(x)</strong>, then get
        the estimated value at any target point with automatic method selection:
        Forward, Backward, or Centered (Stirling).
      </p>
      <p className="mt-2 text-sm font-semibold text-sky-700">Built by Abdalla Mhesen</p>
    </header>
  );
}
