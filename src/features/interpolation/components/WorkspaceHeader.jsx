import { PiFunctionBold } from "react-icons/pi";
import LogicExplanation from "./LogicExplanation";

export default function WorkspaceHeader() {
  return (
    <header className="mb-4 sm:mb-6">
      <p className="mb-1.5 sm:mb-2 text-xs font-bold uppercase tracking-[0.14em] text-sky-700">
        Numerical Analysis Toolkit
      </p>
      <div className="mb-2 sm:mb-3 flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-sky-100 text-sky-700">
            <PiFunctionBold className="text-lg sm:text-2xl" />
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-slate-950">
            Interpolation Studio
          </h1>
        </div>
        <div className="w-full sm:w-auto">
          <LogicExplanation />
        </div>
      </div>
      <p className="max-w-4xl text-xs sm:text-sm lg:text-base leading-6 sm:leading-7 text-slate-600">
        Enter tabulated values of <strong>x</strong> and <strong>f(x)</strong>, then get
        the estimated value at any target point with automatic method selection:
        Forward, Backward, or Centered (Stirling).
      </p>
      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold text-sky-700">Built by Abdalla Mhesen</p>
    </header>
  );
}
