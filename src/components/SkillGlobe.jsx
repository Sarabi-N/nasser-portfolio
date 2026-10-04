import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks";

/* Tags placed on a Fibonacci sphere and projected with CSS transforms.
   Hover steers the spin, drag throws it. Purely decorative — the skill list beside it carries the content. */
export default function SkillGlobe({ items }) {
  const wrap = useRef(null);
  const tags = useRef([]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const n = items.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = items.map((_, i) => {
      const y = 1 - ((i + 0.5) / n) * 2;
      const r = Math.sqrt(1 - y * y);
      return [Math.cos(golden * i) * r, y, Math.sin(golden * i) * r];
    });

    const reduce = prefersReducedMotion();
    const idle = { x: reduce ? 0 : 0.0015, y: reduce ? 0 : 0.0035 };
    let rx = -0.3, ry = 0.4;
    let vx = idle.x, vy = idle.y;
    let target = { ...idle };
    let dragging = false;
    let last = null;
    let raf = 0;
    let onScreen = true;

    const render = () => {
      const R = el.clientWidth * 0.39;
      const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
      for (let i = 0; i < n; i++) {
        const t = tags.current[i];
        if (!t) continue;
        const [x, y, z] = pts[i];
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 = back, 1 = front
        t.style.transform = `translate(-50%, -50%) translate3d(${(x1 * R).toFixed(1)}px, ${(y2 * R).toFixed(1)}px, 0) scale(${(0.62 + depth * 0.55).toFixed(3)})`;
        t.style.opacity = (0.18 + depth * 0.82).toFixed(2);
        t.style.zIndex = String(Math.round(depth * 100));
        t.style.filter = depth < 0.35 ? `blur(${((0.35 - depth) * 4).toFixed(1)}px)` : "none";
      }
    };

    const tick = () => {
      if (!dragging) {
        vx += (target.x - vx) * 0.04;
        vy += (target.y - vy) * 0.04;
      }
      rx += vx;
      ry += vy;
      render();
      raf = onScreen ? requestAnimationFrame(tick) : 0;
    };

    const onPointerMove = (e) => {
      const r = el.getBoundingClientRect();
      if (dragging && last) {
        vy = (e.clientX - last.x) * 0.006;
        vx = -(e.clientY - last.y) * 0.006;
        last = { x: e.clientX, y: e.clientY };
        if (reduce) { rx += vx; ry += vy; render(); }
        return;
      }
      if (reduce || e.pointerType !== "mouse") return;
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      target = { x: -py * 0.02, y: px * 0.025 };
    };
    const onPointerDown = (e) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      el.setPointerCapture?.(e.pointerId);
      el.classList.add("dragging");
    };
    const onPointerUp = () => {
      dragging = false;
      last = null;
      el.classList.remove("dragging");
    };
    const onLeave = () => { if (!dragging) target = { ...idle }; };

    const obs = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !raf && !reduce) raf = requestAnimationFrame(tick);
    });

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("pointerleave", onLeave);
    obs.observe(el);
    render();
    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [items]);

  return (
    <div className="globe" ref={wrap} aria-hidden="true">
      <div className="globe-orb" />
      <div className="globe-ring r1" />
      <div className="globe-ring r2" />
      {items.map((s, i) => (
        <span key={s} className={`globe-tag ${i % 5 === 0 ? "alt" : ""}`} ref={(n) => (tags.current[i] = n)}>
          {s}
        </span>
      ))}
    </div>
  );
}
