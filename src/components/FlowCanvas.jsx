import { useTilt, useReducedMotion } from "../hooks";

const NODES = [
  { id: "trigger", x: 24, y: 150, kind: "Trigger", label: "Webhook received" },
  { id: "connect", x: 222, y: 56, kind: "Connect", label: "App via REST API" },
  { id: "transform", x: 222, y: 244, kind: "Transform", label: "Clean & map data" },
  { id: "action", x: 420, y: 150, kind: "Action", label: "Notify the team" },
];
const W = 150;
const H = 58;

const EDGES = [
  "M174 179 C198 179 198 85 222 85",
  "M174 179 C198 179 198 273 222 273",
  "M372 85 C396 85 396 179 420 179",
  "M372 273 C396 273 396 179 420 179",
];

/* Concept illustration of RedStone's three modules: the canvas (Flow Builder),
   the chat (AI Assistant) and the review panel (AI Evaluation). `focus` highlights one. */
export default function FlowCanvas({ focus }) {
  const tilt = useTilt(10);
  const reduced = useReducedMotion();
  const cls = (name) => (focus ? (focus === name ? "is-focus" : "is-dim") : "");

  return (
    <div className="flow-scene">
      <div className="flow-stage tilt" ref={tilt}>
        <div className={`flow-window ${cls("Flow Builder")}`}>
          <div className="flow-chrome">
            <span className="dot r" /><span className="dot y" /><span className="dot g" />
            <span className="flow-chrome-title">RedStone · Flow Builder</span>
          </div>
          <svg className="flow-svg" viewBox="0 0 594 360" role="img" aria-label="Example workflow: a trigger branches into two steps that merge into an action">
            <defs>
              <pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" className="flow-grid-dot" />
              </pattern>
              <linearGradient id="edgeGrad" x1="0" x2="1">
                <stop offset="0" style={{ stopColor: "var(--accent)" }} />
                <stop offset="1" style={{ stopColor: "var(--accent-2)" }} />
              </linearGradient>
            </defs>
            <rect width="594" height="360" fill="url(#grid)" />
            {EDGES.map((d, i) => (
              <g key={i}>
                <path d={d} className="flow-edge-base" />
                <path d={d} className="flow-edge" stroke="url(#edgeGrad)" style={{ animationDelay: `${i * -0.4}s` }} />
                {!reduced && (
                  <circle r="4" className="flow-packet">
                    <animateMotion dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite" path={d} begin={`${i * 0.5}s`} />
                  </circle>
                )}
              </g>
            ))}
            {NODES.map((n) => (
              <g key={n.id} transform={`translate(${n.x} ${n.y})`} className="flow-node">
                <rect width={W} height={H} rx="12" className="flow-node-box" />
                <rect x="12" y="15" width="28" height="28" rx="8" className={`flow-node-icon k-${n.id}`} />
                <text x="52" y="26" className="flow-node-kind">{n.kind}</text>
                <text x="52" y="43" className="flow-node-label">{n.label}</text>
                {n.id !== "trigger" && <circle cx="0" cy={H / 2} r="4.5" className="flow-port" />}
                {n.id !== "action" && <circle cx={W} cy={H / 2} r="4.5" className="flow-port" />}
              </g>
            ))}
          </svg>
        </div>

        <div className={`flow-float flow-assistant ${cls("AI Assistant")}`}>
          <div className="flow-float-head"><span className="spark" />AI Assistant</div>
          <div className="flow-bubble user">Only notify the team for urgent requests</div>
          <div className="flow-bubble ai">Added a filter before <b>Notify the team</b>. Want me to test it?</div>
        </div>

        <div className={`flow-float flow-eval ${cls("AI Evaluation")}`}>
          <div className="flow-float-head"><span className="spark alt" />AI Evaluation</div>
          <div className="flow-eval-row ok"><span>✓</span> No errors detected</div>
          <div className="flow-eval-row warn"><span>!</span> Run both branches in parallel</div>
          <div className="flow-eval-bar"><i /></div>
        </div>
      </div>
      <p className="flow-caption">Concept illustration of the RedStone interface</p>
    </div>
  );
}
