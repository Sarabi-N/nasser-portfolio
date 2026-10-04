import { useEffect, useRef, useState } from "react";
import { useOnScreen, useReducedMotion, hasFinePointer, prefersReducedMotion } from "../hooks";

/* A floating 3D developer workspace: code types itself in the editor, the terminal builds
   and starts the API, and the browser preview renders the result. Illustrative code only. */

const CODE = [
  [["kw", "import"], ["p", " { "], ["v", "api"], ["p", " } "], ["kw", "from"], ["p", " "], ["str", '"./api"'], ["p", ";"]],
  [],
  [["kw", "export function "], ["fn", "GRNForm"], ["p", "() {"]],
  [["p", "  "], ["kw", "const"], ["p", " ["], ["v", "rows"], ["p", ", "], ["v", "setRows"], ["p", "] = "], ["fn", "useState"], ["p", "<"], ["type", "Row"], ["p", "[]>([]);"]],
  [],
  [["p", "  "], ["kw", "async function "], ["fn", "submit"], ["p", "("], ["v", "grn"], ["p", ": "], ["type", "GRN"], ["p", ") {"]],
  [["p", "    "], ["kw", "await "], ["v", "api"], ["p", "."], ["fn", "post"], ["p", "("], ["str", '"/grn"'], ["p", ", "], ["v", "grn"], ["p", ");"]],
  [["p", "    "], ["v", "toast"], ["p", "."], ["fn", "success"], ["p", "("], ["str", '"GRN saved"'], ["p", ");"]],
  [["p", "  }"]],
  [],
  [["p", "  "], ["kw", "return "], ["tag", "<Form "], ["attr", "rows"], ["p", "={"], ["v", "rows"], ["p", "} "], ["attr", "onSubmit"], ["p", "={"], ["v", "submit"], ["p", "} "], ["tag", "/>"], ["p", ";"]],
  [["p", "}"]],
];
const TOTAL = CODE.reduce((n, line) => n + line.reduce((m, [, t]) => m + t.length, 0) + 1, 0) - 1;
const IS_BREAK = (() => {
  const breaks = new Set();
  let n = 0;
  CODE.forEach((line) => { n += line.reduce((m, [, t]) => m + t.length, 0); breaks.add(n); n += 1; });
  return breaks;
})();

const TERM = [
  ["cmd", "npm run build"],
  ["ok", "✓ built in 1.84s"],
  ["cmd", "node server.js"],
  ["info", "→ API listening on :3000"],
  ["ok", "✓ PostgreSQL connected"],
];

const GLYPHS = [
  { t: "{ }", x: -34, y: 70, z: 130, d: 0 },
  { t: "</>", x: 586, y: 300, z: 150, d: 1.2 },
  { t: "=>", x: 214, y: 92, z: -170, d: 0.6 },
  { t: "SQL", x: 12, y: 510, z: 110, d: 2.1 },
  { t: "API", x: 590, y: 12, z: 40, d: 1.6 },
  { t: "TS", x: 250, y: 528, z: 170, d: 0.3, compact: true },
  { t: "( )", x: 470, y: -26, z: -120, d: 2.6 },
];

function Code({ chars, typing }) {
  let left = chars;
  const lines = [];
  for (let i = 0; i < CODE.length; i++) {
    if (left < 0) break;
    const spans = [];
    for (const [cls, text] of CODE[i]) {
      if (left <= 0) break;
      const s = text.slice(0, left);
      spans.push(<span key={spans.length} className={`t-${cls}`}>{s}</span>);
      left -= s.length;
    }
    lines.push(spans);
    left -= 1;
  }
  return (
    <div className="ed-code">
      {CODE.map((_, i) => (
        <div className="ed-line" key={i}>
          <span className="ed-ln">{i + 1}</span>
          <span className="ed-src">
            {lines[i]}
            {i === lines.length - 1 && <span className={`caret ${typing ? "solid" : ""}`} />}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Workspace() {
  const wrap = useRef(null);
  const stage = useRef(null);
  const active = useOnScreen(wrap, "0px");
  const reduced = useReducedMotion();
  const [chars, setChars] = useState(0);
  const [termLines, setTermLines] = useState(0);
  const [view, setView] = useState(0); // 0 skeleton · 1 form · 2 submitting · 3 saved
  const [fading, setFading] = useState(false);
  const [layout, setLayout] = useState({ compact: false, scale: 1, offset: 0 });

  /* Fit the fixed-size 3D stage into whatever width the hero gives us */
  useEffect(() => {
    const el = wrap.current;
    const fit = () => {
      const w = el.clientWidth;
      const compact = w < 540;
      const W = compact ? 360 : 620;
      const scale = Math.min(1, w / W);
      setLayout({ compact, scale, offset: Math.max(0, (w - W) / 2) });
    };
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    fit();
    return () => ro.disconnect();
  }, []);

  /* The typing → build → render loop. Pauses off-screen; shows the finished state for reduced motion. */
  useEffect(() => {
    if (reduced) { setChars(TOTAL); setTermLines(TERM.length); setView(3); setFading(false); return; }
    if (!active) return;
    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (!cancelled) {
        setChars(0); setTermLines(0); setView(0); setFading(false);
        await wait(700);
        for (let c = 1; c <= TOTAL && !cancelled; c++) {
          setChars(c);
          await wait(IS_BREAK.has(c) ? 120 : 10 + Math.random() * 20);
        }
        await wait(350);
        for (let l = 1; l <= TERM.length && !cancelled; l++) {
          setTermLines(l);
          await wait(TERM[l - 1][0] === "cmd" ? 520 : 300);
        }
        if (cancelled) break;
        setView(1); await wait(1100);
        if (cancelled) break;
        setView(2); await wait(650);
        if (cancelled) break;
        setView(3); await wait(5200);
        if (cancelled) break;
        setFading(true); await wait(600);
      }
    })();
    return () => { cancelled = true; };
  }, [active, reduced]);

  /* Tilt the whole stage towards the pointer */
  useEffect(() => {
    const el = stage.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--px", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        el.style.setProperty("--py", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); };
  }, []);

  const { compact, scale, offset } = layout;
  const W = compact ? 360 : 620;
  const H = compact ? 525 : 615;
  const typing = chars < TOTAL;

  return (
    <div className="ws" ref={wrap} style={{ height: H * scale }} aria-hidden="true">
      <div className={`ws-scaler ${compact ? "compact" : ""} ${fading ? "fading" : ""}`} style={{ width: W, height: H, transform: `translateX(${offset}px) scale(${scale})` }}>
        <div className="ws-stage" ref={stage}>
          <div className="ws-floor" />

          {/* Browser preview */}
          <div className="ws-panel ws-browser">
            <div className="ws-bar">
              <span className="dot r" /><span className="dot y" /><span className="dot g" />
              <span className="ws-url"><i className="lock" />localhost:5173/grn</span>
            </div>
            <div className={`br-body v${view}`}>
              <div className="br-head">
                <strong>Goods Receipt Note</strong>
                <span className="br-pill">{view === 3 ? "Saved" : "New"}</span>
              </div>
              <div className="br-fields">
                <label><span>PO number</span><b>PO-2048</b></label>
                <label><span>Received qty</span><b>120</b></label>
              </div>
              <div className="br-btn">{view >= 2 ? (view === 3 ? "✓ Submitted" : "Submitting…") : "Submit GRN"}</div>
              <div className="br-skel"><i /><i /></div>
            </div>
          </div>

          {/* Code editor */}
          <div className="ws-panel ws-editor">
            <div className="ed-tabs">
              <span className="ed-tab on"><i className="ic-ts">TS</i>GRNForm.tsx</span>
              <span className="ed-tab"><i className="ic-ts">TS</i>server.ts</span>
              <span className="ed-tab"><i className="ic-sql">DB</i>schema.sql</span>
            </div>
            <Code chars={chars} typing={typing} />
            <div className="ed-status">
              <span>⎇ main</span>
              <span>TypeScript React</span>
              <span className={typing ? "" : "ok"}>{typing ? "● editing" : "✓ 0 problems"}</span>
            </div>
          </div>

          {/* Terminal */}
          <div className="ws-panel ws-term">
            <div className="term-bar"><span>zsh — grn-app</span></div>
            <div className="term-body">
              {TERM.slice(0, termLines).map(([k, t], i) => (
                <div key={i} className={`term-line ${k}`}>{k === "cmd" && <span className="term-prompt">$</span>}{t}</div>
              ))}
              <div className="term-line"><span className="term-prompt">$</span><span className="caret thin" /></div>
            </div>
          </div>

          <div className={`ws-float-toast ${view === 3 ? "show" : ""}`}><span>✓</span> GRN saved to PostgreSQL</div>

          {/* Git chip */}
          <div className="ws-chip ws-git"><span className="git-dot" />feat: add GRN form<em>main</em></div>

          {GLYPHS.map((g) => (
            <span
              key={g.t}
              className={`ws-glyph ${g.z < 0 ? "far" : ""} ${g.compact ? "keep" : ""}`}
              style={{ left: g.x, top: g.y, transform: `translateZ(${g.z}px)`, animationDelay: `${-g.d}s` }}
            >
              {g.t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
