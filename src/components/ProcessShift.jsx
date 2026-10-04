import { useState } from "react";
import { GRN_FLOW } from "../data";

/* Toggle between the manual (as-is) and automated (to-be) Goods Receipt Note process */
export default function ProcessShift() {
  const [mode, setMode] = useState("toBe");
  const steps = GRN_FLOW[mode];

  return (
    <div className={`shift shift-${mode}`}>
      <div className="shift-head">
        <div>
          <div className="shift-kicker">Case study · NESR</div>
          <h3 className="shift-title">Goods Receipt Note process</h3>
        </div>
        <div className="seg" role="tablist" aria-label="Process view">
          <button role="tab" aria-selected={mode === "asIs"} className={mode === "asIs" ? "on" : ""} onClick={() => setMode("asIs")}>As-Is</button>
          <button role="tab" aria-selected={mode === "toBe"} className={mode === "toBe" ? "on" : ""} onClick={() => setMode("toBe")}>To-Be</button>
          <span className="seg-thumb" />
        </div>
      </div>

      <ol className="shift-steps" key={mode}>
        {steps.map((s, i) => (
          <li key={s.title} className="shift-step" style={{ animationDelay: `${i * 0.09}s` }}>
            <span className="shift-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="shift-step-title">{s.title}</div>
            <div className="shift-step-text">{s.text}</div>
          </li>
        ))}
      </ol>

      <p className="shift-foot">
        {mode === "asIs"
          ? "Mapped with the supply chain and procurement teams to pinpoint where time and accuracy were lost."
          : "Replaced with an internal React + PostgreSQL web app — faster processing and fewer data-entry errors."}
      </p>
    </div>
  );
}
