import { useState, useEffect, useRef } from "react";

const THEME = {
  light: {
    "--bg-primary": "#f7f8fa",
    "--bg-secondary": "#ffffff",
    "--bg-card": "#ffffff",
    "--bg-accent": "rgba(0, 168, 150, 0.06)",
    "--text-primary": "#1a2332",
    "--text-secondary": "#5a6677",
    "--text-muted": "#8994a5",
    "--accent": "#00a896",
    "--accent-dark": "#008f7f",
    "--accent-glow": "rgba(0, 168, 150, 0.15)",
    "--accent-glow-strong": "rgba(0, 168, 150, 0.25)",
    "--border": "rgba(0, 0, 0, 0.07)",
    "--border-accent": "rgba(0, 168, 150, 0.2)",
    "--shadow-sm": "0 1px 3px rgba(0,0,0,0.04)",
    "--shadow-md": "0 4px 20px rgba(0,0,0,0.06)",
    "--shadow-lg": "0 10px 40px rgba(0,0,0,0.08)",
    "--nav-bg": "rgba(255,255,255,0.85)",
    "--tag-bg": "rgba(0, 168, 150, 0.08)",
    "--tag-text": "#00a896",
    "--input-bg": "#f7f8fa",
  },
  dark: {
    "--bg-primary": "#0f1419",
    "--bg-secondary": "#161d26",
    "--bg-card": "#1c2533",
    "--bg-accent": "rgba(0, 168, 150, 0.08)",
    "--text-primary": "#e8ecf1",
    "--text-secondary": "#9aa5b4",
    "--text-muted": "#5f6d7e",
    "--accent": "#00d4aa",
    "--accent-dark": "#00b894",
    "--accent-glow": "rgba(0, 212, 170, 0.12)",
    "--accent-glow-strong": "rgba(0, 212, 170, 0.2)",
    "--border": "rgba(255, 255, 255, 0.06)",
    "--border-accent": "rgba(0, 212, 170, 0.2)",
    "--shadow-sm": "0 1px 3px rgba(0,0,0,0.2)",
    "--shadow-md": "0 4px 20px rgba(0,0,0,0.3)",
    "--shadow-lg": "0 10px 40px rgba(0,0,0,0.4)",
    "--nav-bg": "rgba(15,20,25,0.9)",
    "--tag-bg": "rgba(0, 212, 170, 0.1)",
    "--tag-text": "#00d4aa",
    "--input-bg": "#1c2533",
  },
};

const NAV_ITEMS = ["About", "Experience", "Skills", "Projects", "Awards", "Contact"];

const MARQUEE_ITEMS = [
  "React.js", "Power Apps", "Power Automate", "n8n", "JavaScript", "TypeScript",
  "Python", "Tailwind CSS", "SharePoint", "Dataverse", "SQL", "Firebase",
  "HTML5", "CSS3", "Java", "PostgreSQL", "Power BI", "REST APIs",
  "Git", "Dart", "Node.js", "C/C++",
];

const SKILLS_DATA = {
  "Data Analysis": [
    "Python (Pandas & Matplotlib)",
    "Power BI",
    "Data Visualization",
  ],
  "Programming & Development": [
    "Python", "Java", "C/C++", "Dart",
    "HTML", "CSS", "JavaScript", "React.js", "Tailwind",
    "SQL", "MySQL", "Firebase", "PostgreSQL",
    "Microsoft Power Apps", "Power Automate",
  ],
  "Soft Skills": [
    "Time Management",
    "Team Collaboration",
    "Continuous Learning",
    "Analytical Thinking",
  ],
};

const CERTIFICATES = [
  { name: "Data Analysis using Python", issuer: "IBM" },
  { name: "Cybersecurity Tools and Technologies", issuer: "Microsoft" },
  { name: "Introduction to Web Development", issuer: "PSUT" },
  { name: "AWS Academy Cloud Foundations", issuer: "Amazon Web Services" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimatedSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Inline Styles ─── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@400;500;600;700&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

html { scroll-behavior:smooth; scroll-padding-top:80px; }

body, #root {
  font-family:'DM Sans', sans-serif;
  background:var(--bg-primary);
  color:var(--text-primary);
  transition: background 0.4s, color 0.4s;
  -webkit-font-smoothing:antialiased;
}

.serif { font-family:'Playfair Display', serif; }

/* NAV */
.nav {
  position:fixed; top:0; left:0; right:0; z-index:100;
  background:var(--nav-bg);
  backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
  border-bottom:1px solid var(--border);
  transition: background 0.4s, border 0.4s;
}
.nav-inner {
  max-width:1100px; margin:0 auto; padding:0 24px;
  display:flex; align-items:center; justify-content:space-between; height:64px;
}
.nav-logo {
  font-family:'Playfair Display', serif; font-weight:600; font-size:1.25rem;
  color:var(--text-primary); text-decoration:none; letter-spacing:-0.02em;
}
.nav-logo span { color:var(--accent); }
.nav-links { display:flex; gap:8px; align-items:center; }
.nav-link {
  background:none; border:none; cursor:pointer;
  font-family:'DM Sans', sans-serif; font-size:0.875rem; font-weight:500;
  color:var(--text-secondary); padding:6px 14px; border-radius:8px;
  transition: color 0.25s, background 0.25s;
}
.nav-link:hover { color:var(--accent); background:var(--accent-glow); }
.theme-btn {
  background:var(--bg-card); border:1px solid var(--border); border-radius:10px;
  width:38px; height:38px; display:flex; align-items:center; justify-content:center;
  cursor:pointer; font-size:1.1rem; margin-left:8px;
  transition: background 0.3s, border 0.3s, transform 0.2s;
}
.theme-btn:hover { transform:scale(1.08); border-color:var(--accent); }

/* HERO */
.hero {
  min-height:100vh; display:flex; align-items:center; justify-content:center;
  padding:100px 24px 60px; position:relative; overflow:hidden;
}
.hero-bg {
  position:absolute; inset:0; z-index:0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 50%, var(--accent-glow-strong), transparent),
    radial-gradient(ellipse 40% 60% at 80% 30%, var(--accent-glow), transparent);
}
.hero-content { position:relative; z-index:1; text-align:center; max-width:720px; }
.hero-badge {
  display:inline-flex; align-items:center; gap:8px;
  background:var(--accent-glow); border:1px solid var(--border-accent);
  padding:6px 16px; border-radius:100px; font-size:0.8rem; font-weight:500;
  color:var(--accent); margin-bottom:28px; letter-spacing:0.03em;
}
.hero-badge .dot { width:6px; height:6px; border-radius:50%; background:var(--accent); animation:pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
.hero h1 {
  font-family:'Playfair Display', serif; font-size:clamp(2.8rem,6vw,4.5rem);
  font-weight:700; line-height:1.1; letter-spacing:-0.03em; margin-bottom:20px;
}
.hero h1 .accent { color:var(--accent); }
.hero-sub {
  font-size:1.15rem; line-height:1.7; color:var(--text-secondary); max-width:560px;
  margin:0 auto 36px;
}
.hero-actions { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.btn-primary {
  display:inline-flex; align-items:center; gap:8px;
  background:var(--accent); color:#fff; border:none; border-radius:12px;
  padding:14px 28px; font-family:'DM Sans', sans-serif; font-size:0.95rem; font-weight:600;
  cursor:pointer; transition: transform 0.2s, box-shadow 0.2s;
  box-shadow:0 4px 16px var(--accent-glow-strong);
}
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px var(--accent-glow-strong); }
.btn-outline {
  display:inline-flex; align-items:center; gap:8px;
  background:transparent; color:var(--text-primary); border:1.5px solid var(--border);
  border-radius:12px; padding:13px 26px; font-family:'DM Sans', sans-serif; font-size:0.95rem;
  font-weight:600; cursor:pointer; transition: border-color 0.25s, transform 0.2s;
}
.btn-outline:hover { border-color:var(--accent); transform:translateY(-2px); }

.hero-stats {
  display:flex; gap:48px; justify-content:center; margin-top:56px;
  padding-top:40px; border-top:1px solid var(--border);
}
.stat-num { font-family:'Playfair Display', serif; font-size:2rem; font-weight:700; color:var(--accent); }
.stat-label { font-size:0.8rem; color:var(--text-muted); margin-top:4px; letter-spacing:0.04em; text-transform:uppercase; }

/* SECTIONS */
.section {
  max-width:1100px; margin:0 auto; padding:100px 24px;
}
.section-label {
  display:inline-flex; align-items:center; gap:8px;
  font-size:0.78rem; font-weight:600; text-transform:uppercase; letter-spacing:0.1em;
  color:var(--accent); margin-bottom:12px;
}
.section-label::before {
  content:''; display:block; width:24px; height:1.5px; background:var(--accent); border-radius:2px;
}
.section-title {
  font-family:'Playfair Display', serif; font-size:clamp(2rem,4vw,2.8rem);
  font-weight:700; letter-spacing:-0.02em; margin-bottom:16px;
}
.section-desc { color:var(--text-secondary); font-size:1.05rem; line-height:1.7; max-width:600px; margin-bottom:48px; }

/* ABOUT / EXPERIENCE */
.exp-card {
  background:var(--bg-card); border:1px solid var(--border); border-radius:16px;
  padding:32px; margin-bottom:20px; transition:border-color 0.3s, box-shadow 0.3s;
}
.exp-card:hover { border-color:var(--border-accent); box-shadow:var(--shadow-md); }
.exp-header { display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px; margin-bottom:16px; }
.exp-role { font-weight:700; font-size:1.15rem; }
.exp-company { color:var(--accent); font-weight:600; font-size:0.95rem; margin-top:2px; }
.exp-date { font-size:0.82rem; color:var(--text-muted); background:var(--bg-accent); padding:4px 12px; border-radius:8px; white-space:nowrap; }
.exp-loc { font-size:0.82rem; color:var(--text-muted); }
.exp-list { list-style:none; display:flex; flex-direction:column; gap:10px; }
.exp-list li {
  padding-left:20px; position:relative; font-size:0.93rem; line-height:1.65; color:var(--text-secondary);
}
.exp-list li::before {
  content:''; position:absolute; left:0; top:9px; width:6px; height:6px;
  border-radius:50%; background:var(--accent);
}

/* EDUCATION */
.edu-card {
  background:var(--bg-card); border:1px solid var(--border); border-radius:16px;
  padding:28px 32px; margin-top:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;
  transition:border-color 0.3s;
}
.edu-card:hover { border-color:var(--border-accent); }
.edu-degree { font-weight:700; font-size:1.05rem; }
.edu-school { color:var(--text-secondary); font-size:0.9rem; margin-top:2px; }
.edu-meta { text-align:right; }
.edu-gpa { font-weight:600; color:var(--accent); font-size:0.95rem; }
.edu-dates { font-size:0.82rem; color:var(--text-muted); margin-top:2px; }

/* SKILLS */
.skills-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px; }
.skill-group {
  background:var(--bg-card); border:1px solid var(--border); border-radius:16px;
  padding:28px; transition:border-color 0.3s, box-shadow 0.3s;
}
.skill-group:hover { border-color:var(--border-accent); box-shadow:var(--shadow-md); }
.skill-group-title { font-weight:700; font-size:1rem; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
.skill-group-title .icon { width:28px; height:28px; border-radius:8px; background:var(--accent-glow); display:flex; align-items:center; justify-content:center; font-size:0.9rem; }
.skill-tags { display:flex; flex-wrap:wrap; gap:8px; }
.skill-tag {
  background:var(--tag-bg); color:var(--tag-text); padding:6px 14px;
  border-radius:8px; font-size:0.82rem; font-weight:500; border:1px solid transparent;
  transition: border-color 0.25s, transform 0.2s;
}
.skill-tag:hover { border-color:var(--border-accent); transform:translateY(-1px); }

/* CERTIFICATES */
.certs-row { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-top:32px; }
.cert-card {
  background:var(--bg-card); border:1px solid var(--border); border-radius:12px;
  padding:20px; transition:border-color 0.3s;
}
.cert-card:hover { border-color:var(--border-accent); }
.cert-name { font-weight:600; font-size:0.9rem; margin-bottom:4px; }
.cert-issuer { font-size:0.8rem; color:var(--accent); }

/* PROJECTS */
.project-card {
  background:var(--bg-card); border:1px solid var(--border); border-radius:20px;
  padding:36px; transition:border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  position:relative; overflow:hidden;
}
.project-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background:linear-gradient(90deg, var(--accent), var(--accent-dark)); opacity:0;
  transition:opacity 0.3s;
}
.project-card:hover { border-color:var(--border-accent); box-shadow:var(--shadow-lg); transform:translateY(-4px); }
.project-card:hover::before { opacity:1; }
.project-badge { display:inline-block; background:var(--tag-bg); color:var(--tag-text); padding:4px 12px; border-radius:6px; font-size:0.75rem; font-weight:600; margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em; }
.project-title { font-family:'Playfair Display', serif; font-size:1.5rem; font-weight:700; margin-bottom:12px; }
.project-desc { color:var(--text-secondary); font-size:0.93rem; line-height:1.7; margin-bottom:20px; }
.project-features { list-style:none; display:flex; flex-direction:column; gap:10px; }
.project-features li { padding-left:24px; position:relative; font-size:0.9rem; line-height:1.6; color:var(--text-secondary); }
.project-features li strong { color:var(--text-primary); font-weight:600; }
.project-features li::before {
  content:'→'; position:absolute; left:0; color:var(--accent); font-weight:700;
}

/* AWARDS */
.award-card {
  background:linear-gradient(135deg, var(--accent-glow), var(--bg-card));
  border:1px solid var(--border-accent); border-radius:16px; padding:28px; margin-top:20px;
  display:flex; align-items:flex-start; gap:16px;
}
.award-icon { font-size:2rem; flex-shrink:0; }
.award-title { font-weight:700; font-size:1.05rem; margin-bottom:4px; }
.award-meta { font-size:0.82rem; color:var(--text-muted); margin-bottom:8px; }
.award-desc { font-size:0.9rem; color:var(--text-secondary); line-height:1.6; }

/* MARQUEE */
.marquee-section {
  padding:40px 0; overflow:hidden; border-top:1px solid var(--border); border-bottom:1px solid var(--border);
  background:var(--bg-secondary); transition:background 0.4s, border 0.4s;
}
.marquee-track {
  display:flex; width:max-content;
  animation:marquee 35s linear infinite;
}
.marquee-track:hover { animation-play-state:paused; }
@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
.marquee-item {
  display:inline-flex; align-items:center; gap:8px;
  padding:10px 24px; margin:0 6px;
  background:var(--bg-card); border:1px solid var(--border); border-radius:100px;
  font-size:0.88rem; font-weight:500; color:var(--text-secondary); white-space:nowrap;
  transition:border-color 0.3s, color 0.3s;
}
.marquee-item:hover { border-color:var(--border-accent); color:var(--accent); }
.marquee-dot { width:6px; height:6px; border-radius:50%; background:var(--accent); opacity:0.6; }

/* CONTACT */
.contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; }
.contact-info { display:flex; flex-direction:column; gap:20px; }
.contact-item {
  display:flex; align-items:center; gap:14px; padding:18px 20px;
  background:var(--bg-card); border:1px solid var(--border); border-radius:14px;
  transition:border-color 0.3s;
}
.contact-item:hover { border-color:var(--border-accent); }
.contact-icon {
  width:44px; height:44px; border-radius:12px; background:var(--accent-glow);
  display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0;
}
.contact-label { font-size:0.78rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em; }
.contact-value { font-weight:600; font-size:0.93rem; margin-top:2px; }
.contact-value a { color:var(--text-primary); text-decoration:none; }
.contact-value a:hover { color:var(--accent); }

.contact-form { display:flex; flex-direction:column; gap:14px; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.form-field {
  background:var(--input-bg); border:1.5px solid var(--border); border-radius:12px;
  padding:14px 16px; font-family:'DM Sans', sans-serif; font-size:0.93rem;
  color:var(--text-primary); transition:border-color 0.3s, box-shadow 0.3s;
  width:100%; resize:vertical;
}
.form-field::placeholder { color:var(--text-muted); }
.form-field:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow); }

/* SOCIAL */
.social-row { display:flex; gap:10px; margin-top:12px; }
.social-link {
  width:44px; height:44px; border-radius:12px; background:var(--bg-card);
  border:1px solid var(--border); display:flex; align-items:center; justify-content:center;
  color:var(--text-secondary); text-decoration:none; font-size:1.1rem;
  transition:border-color 0.3s, color 0.3s, transform 0.2s, background 0.3s;
}
.social-link:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-2px); background:var(--accent-glow); }

/* FOOTER */
.footer {
  text-align:center; padding:40px 24px; border-top:1px solid var(--border);
  font-size:0.82rem; color:var(--text-muted); transition:border 0.4s;
}

/* MOBILE NAV */
.mobile-menu-btn {
  display:none; background:none; border:none; cursor:pointer;
  width:38px; height:38px; align-items:center; justify-content:center;
  color:var(--text-primary); font-size:1.3rem;
}
.mobile-nav {
  display:none; position:fixed; top:64px; left:0; right:0;
  background:var(--nav-bg); backdrop-filter:blur(16px); border-bottom:1px solid var(--border);
  padding:16px 24px; z-index:99;
}
.mobile-nav.open { display:flex; flex-direction:column; gap:4px; }
.mobile-nav .nav-link { text-align:left; padding:12px 16px; border-radius:10px; font-size:1rem; }

/* RESPONSIVE */
@media (max-width:768px) {
  .nav-links { display:none; }
  .mobile-menu-btn { display:flex; }
  .hero-stats { gap:24px; }
  .stat-num { font-size:1.5rem; }
  .contact-grid { grid-template-columns:1fr; }
  .form-row { grid-template-columns:1fr; }
  .skills-grid { grid-template-columns:1fr; }
  .hero h1 { font-size:2.4rem; }
}

/* LANGUAGES */
.lang-row { display:flex; gap:14px; flex-wrap:wrap; margin-top:20px; }
.lang-chip {
  background:var(--bg-card); border:1px solid var(--border); border-radius:10px;
  padding:12px 20px; text-align:center; transition:border-color 0.3s;
}
.lang-chip:hover { border-color:var(--border-accent); }
.lang-name { font-weight:600; font-size:0.93rem; }
.lang-level { font-size:0.78rem; color:var(--text-muted); margin-top:2px; }
`;

/* ─── SVG Icons ─── */
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

/* ─── MAIN COMPONENT ─── */
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const vars = dark ? THEME.dark : THEME.light;
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }, [dark]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    const mailto = `mailto:alsarabinasser47@gmail.com?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.open(mailto, "_blank");
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            N<span>.</span>Alsarabi
          </a>
          <div className="nav-links">
            {NAV_ITEMS.map(item => (
              <button key={item} className="nav-link" onClick={() => scrollTo(item.toLowerCase())}>
                {item}
              </button>
            ))}
            <button className="theme-btn" onClick={() => setDark(!dark)} title="Toggle theme">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        {NAV_ITEMS.map(item => (
          <button key={item} className="nav-link" onClick={() => scrollTo(item.toLowerCase())}>
            {item}
          </button>
        ))}
        <button className="nav-link" onClick={() => { setDark(!dark); setMobileOpen(false); }}>
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* HERO */}
      <section className="hero" id="about">
        <div className="hero-bg" />
        <div className="hero-content">
          <AnimatedSection>
            <div className="hero-badge"><span className="dot" /> Available for Collaboration</div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1>Hi, I'm <span className="accent">Nasser</span> Alsarabi</h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="hero-sub">
              React Front-End Developer & Power Apps Specialist — building modern web interfaces, 
              automating enterprise workflows with Power Automate & n8n, and bridging the gap between 
              sleek UI and powerful backend automation.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo("contact")}>
                <MailIcon /> Get in Touch
              </button>
              <a
                className="btn-outline"
                href="/resume.pdf"
                download="Nasser-Alsarabi-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DownloadIcon /> Download Resume
              </a>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="hero-stats">
              <div><div className="stat-num">3+</div><div className="stat-label">Languages</div></div>
              <div><div className="stat-num">4</div><div className="stat-label">Certificates</div></div>
              <div><div className="stat-num">B.Sc.</div><div className="stat-label">BIT Degree</div></div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <AnimatedSection>
          <div className="section-label">Career</div>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-desc">Building enterprise solutions with Microsoft's Power Platform ecosystem.</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="exp-card">
            <div className="exp-header">
              <div>
                <div className="exp-role">Power Apps & Automation Developer</div>
                <div className="exp-company">National Energy Services Reunited Corp. (NESR)</div>
                <div className="exp-loc">Dubai, UAE</div>
              </div>
              <div className="exp-date">Feb 2026 – Present</div>
            </div>
            <ul className="exp-list">
              <li>Design, develop, and maintain scalable low-code business applications using Microsoft Power Apps</li>
              <li>Automate workflows and business processes using Power Automate to improve efficiency</li>
              <li>Collaborate with stakeholders to gather requirements and translate business needs into technical solutions</li>
              <li>Integrate applications with SharePoint, Dataverse, and external APIs</li>
              <li>Optimize existing processes by reducing manual tasks and improving accuracy through automation</li>
              <li>Apply best practices in governance, security, and performance for all solutions</li>
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="section-label" style={{ marginTop: 48 }}>Education</div>
          <div className="edu-card">
            <div>
              <div className="edu-degree">B.Sc. in Business Information Technology</div>
              <div className="edu-school">Princess Sumaya University for Technology — Amman, Jordan</div>
            </div>
            <div className="edu-meta">
              <div className="edu-gpa">GPA: 3.20 (Very Good)</div>
              <div className="edu-dates">Oct 2022 – Jan 2026</div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="section-label" style={{ marginTop: 48 }}>Languages</div>
          <div className="lang-row">
            <div className="lang-chip"><div className="lang-name">Arabic</div><div className="lang-level">Native / C2</div></div>
            <div className="lang-chip"><div className="lang-name">English</div><div className="lang-level">Advanced — TOEFL 80</div></div>
            <div className="lang-chip"><div className="lang-name">Romanian</div><div className="lang-level">Native / C2</div></div>
          </div>
        </AnimatedSection>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <AnimatedSection>
          <div className="section-label">Expertise</div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-desc">A versatile toolkit spanning data analysis, full-stack development, and enterprise automation.</p>
        </AnimatedSection>

        <div className="skills-grid">
          {Object.entries(SKILLS_DATA).map(([group, skills], i) => (
            <AnimatedSection key={group} delay={0.1 + i * 0.08}>
              <div className="skill-group">
                <div className="skill-group-title">
                  <span className="icon">{i === 0 ? "📊" : i === 1 ? "⚡" : "🤝"}</span>
                  {group}
                </div>
                <div className="skill-tags">
                  {skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Certificates */}
        <AnimatedSection delay={0.3}>
          <div className="section-label" style={{ marginTop: 56 }}>Certifications</div>
          <div className="certs-row">
            {CERTIFICATES.map((c, i) => (
              <div className="cert-card" key={i}>
                <div className="cert-name">{c.name}</div>
                <div className="cert-issuer">{c.issuer}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <AnimatedSection>
          <div className="section-label">Work</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">Solving real-world problems through innovation and technology.</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="project-card">
            <div className="project-badge">Graduation Project</div>
            <div className="project-title">RedStone</div>
            <p className="project-desc">
              An AI-driven smart SaaS/iPaaS solution designed to simplify workflow automation for individuals and small-to-medium teams. 
              Users combine applications, create intelligent workflows, and receive real-time AI-based optimization suggestions — all through one seamless interface.
            </p>
            <ul className="project-features">
              <li><strong>Flow Builder</strong> — A node-based visual canvas for creating workflows without coding knowledge</li>
              <li><strong>AI Assistant</strong> — Natural language interface to build, debug, and optimize workflows</li>
              <li><strong>AI Evaluation</strong> — Intelligent engine that detects inefficiencies, errors, and suggests performance improvements</li>
            </ul>
            <div style={{ marginTop: 16, fontSize: "0.82rem", color: "var(--text-muted)" }}>Sep 2025 – Jan 2026</div>
          </div>
        </AnimatedSection>
      </section>

      {/* TECH MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span className="marquee-item" key={i}>
              <span className="marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* AWARDS */}
      <section className="section" id="awards">
        <AnimatedSection>
          <div className="section-label">Recognition</div>
          <h2 className="section-title">Awards & Achievements</h2>
          <p className="section-desc">Highlights from competitions and academic accomplishments.</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="award-card">
            <div className="award-icon">🏆</div>
            <div>
              <div className="award-title">BIT Hackathon — 2nd Place</div>
              <div className="award-meta">Princess Sumaya University for Technology · May 2025</div>
              <div className="award-desc">Awarded 2nd place in the BIT Hackathon celebrating innovation, collaboration, and problem-solving among top student talents.</div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <AnimatedSection>
          <div className="section-label">Connect</div>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-desc">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="contact-grid">
            <div>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon"><MailIcon /></div>
                  <div><div className="contact-label">Email</div><div className="contact-value"><a href="mailto:alsarabinasser47@gmail.com">alsarabinasser47@gmail.com</a></div></div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><PhoneIcon /></div>
                  <div><div className="contact-label">Phone</div><div className="contact-value"><a href="tel:+971558866504">+971 558866504</a></div></div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon"><LocationIcon /></div>
                  <div><div className="contact-label">Location</div><div className="contact-value">Dubai, UAE</div></div>
                </div>
              </div>
              <div className="social-row">
                <a href="https://www.linkedin.com/in/nasser-alsarabi/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn"><LinkedInIcon /></a>
                <a href="https://github.com/Sarabi-N" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub"><GitHubIcon /></a>
                <a href="mailto:alsarabinasser47@gmail.com" className="social-link" title="Email"><MailIcon /></a>
              </div>
            </div>
            <div className="contact-form">
              <div className="form-row">
                <input className="form-field" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input className="form-field" placeholder="Your Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <input className="form-field" placeholder="Subject" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
              <textarea className="form-field" placeholder="Your Message" rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
              <button className="btn-primary" onClick={handleSubmit} style={{ width: "100%", justifyContent: "center" }}>
                {formSent ? "✓ Opening Mail Client..." : "Send Message"}
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} Nasser Alsarabi. Built with passion and purpose.
      </footer>
    </>
  );
}
