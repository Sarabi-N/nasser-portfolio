import { useEffect, useRef, useState } from "react";
import "./styles.css";
import {
  CONTACT_FORM_KEY, PROFILE, STATS, PILLARS, PROCESS, EXPERIENCE, SKILLS, GLOBE_SKILLS, MARQUEE,
  PROJECT, EDUCATION, CERTIFICATIONS, COURSES, AWARD, LANGUAGES,
} from "./data";
import { useInView, useTilt, useCountUp, useActiveSection, useReducedMotion } from "./hooks";
import Workspace from "./components/Workspace";
import SkillGlobe from "./components/SkillGlobe";
import FlowCanvas from "./components/FlowCanvas";
import ProcessShift from "./components/ProcessShift";
import {
  SunIcon, MoonIcon, MailIcon, PhoneIcon, PinIcon, DownloadIcon, ChevronIcon, ArrowIcon, MenuIcon,
  CloseIcon, CodeIcon, CompassIcon, ChartIcon, BoltIcon, CapIcon, BadgeIcon, TrophyIcon, BookIcon,
  GlobeIcon, PassportIcon, LinkedInIcon, GitHubIcon,
} from "./components/Icons";

const NAV = ["About", "Experience", "Skills", "Projects", "Credentials", "Contact"];
const SECTION_IDS = ["home", ...NAV.map((n) => n.toLowerCase())];
const PILLAR_ICONS = { dev: CodeIcon, ba: CompassIcon, data: ChartIcon, auto: BoltIcon };

/* ─── small building blocks ─── */

function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const [ref, visible] = useInView(0.12);
  return (
    <Tag ref={ref} className={`reveal ${visible ? "in" : ""} ${className}`} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
}

function TiltCard({ children, className = "", max = 7 }) {
  const ref = useTilt(max);
  return <div ref={ref} className={`tilt ${className}`}>{children}</div>;
}

function SectionHead({ label, title, desc }) {
  return (
    <Reveal className="section-head">
      <div className="section-label">{label}</div>
      <h2 className="section-title">{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </Reveal>
  );
}

function RotatingWord({ words }) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length, reduced]);
  return (
    <span className="rotator" aria-live="polite">
      <span key={words[i]} className="rotator-word">{words[i]}</span>
    </span>
  );
}

function Stat({ value, suffix, label, start }) {
  const n = useCountUp(value, start);
  return (
    <div className="stat">
      <div className="stat-num">{n}<span>{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function CvMenu({ variant = "outline", label = "Download CV", align = "left" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", esc); };
  }, [open]);
  return (
    <div className={`cv-menu ${open ? "open" : ""}`} ref={ref}>
      <button className={`btn btn-${variant}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu">
        <DownloadIcon /> {label} <ChevronIcon size={16} className="chev" />
      </button>
      <div className={`cv-pop align-${align}`} role="menu">
        {PROFILE.locations.map((l) => (
          <a key={l.country} role="menuitem" href={l.cv} download={l.cvName} onClick={() => setOpen(false)}>
            <span className="cv-flag">{l.country === "UAE" ? "AE" : "JO"}</span>
            <span>
              <strong>{l.country} CV</strong>
              <small>{l.city}, {l.country} · PDF</small>
            </span>
            <DownloadIcon size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}

function Socials() {
  return (
    <div className="socials">
      <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
      <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
      <a href={`mailto:${PROFILE.email}`} aria-label="Email"><MailIcon /></a>
    </div>
  );
}

/* ─── page ─── */

function readTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* storage unavailable */ }
  return "dark";
}

export default function Portfolio() {
  const [theme, setTheme] = useState(readTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [focusModule, setFocusModule] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [formState, setFormState] = useState("idle");
  const progressRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);
  const [statsRef, statsVisible] = useInView(0.4);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#070b10" : "#f5f7fa");
    try { localStorage.setItem("theme", theme); } catch { /* storage unavailable */ }
  }, [theme]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
        setScrolled(h.scrollTop > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    setMenuOpen(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (formState === "sending") return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setFormState("missing"); return; }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) { setFormState("bad-email"); return; }

    // Honeypot: real visitors never see or fill this field
    if (form.website) { setFormState("sent"); return; }

    if (!CONTACT_FORM_KEY) {
      const body = `From: ${form.name} (${form.email})\n\n${form.message}`;
      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(form.subject || "Portfolio contact")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setFormState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: CONTACT_FORM_KEY,
          subject: `Portfolio: ${form.subject.trim() || `New message from ${form.name.trim()}`}`,
          from_name: "Portfolio contact form",
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
      setFormState("sent");
    } catch {
      setFormState("error");
    }
  };
  const field = (k) => ({
    value: form[k],
    onChange: (e) => {
      setForm({ ...form, [k]: e.target.value });
      if (formState !== "idle" && formState !== "sending") setFormState("idle");
    },
  });

  return (
    <>
      <div className="progress" ref={progressRef} />

      {/* NAV */}
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); go("home"); }} aria-label="Nasser Alsarabi — back to top">
            <span className="logo-br">&lt;</span>
            <span className="logo-name">Nasser</span>
            <span className="logo-br">&nbsp;/&gt;</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((n) => (
              <button key={n} className={`nav-link ${active === n.toLowerCase() ? "active" : ""}`} onClick={() => go(n.toLowerCase())}>{n}</button>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <div className="nav-cv"><CvMenu variant="primary" label="CV" align="right" /></div>
            <button className="icon-btn menu-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" aria-expanded={menuOpen}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
          {NAV.map((n) => (
            <button key={n} className={`nav-link ${active === n.toLowerCase() ? "active" : ""}`} onClick={() => go(n.toLowerCase())}>{n}</button>
          ))}
          <div className="mobile-cvs">
            {PROFILE.locations.map((l) => (
              <a key={l.country} className="btn btn-outline" href={l.cv} download={l.cvName}><DownloadIcon /> {l.country} CV</a>
            ))}
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-grid" aria-hidden="true" />

          <div className="container hero-inner">
            <div className="hero-copy">
              <Reveal>
                <div className="pill"><span className="pulse" /> {PROFILE.availability} · Dubai & Amman</div>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="eyebrow">{PROFILE.headline}</p>
                <h1 className="hero-title">
                  {PROFILE.firstName}<br />
                  <span className="grad">{PROFILE.lastName}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="hero-tagline">{PROFILE.tagline}</p>
                <p className="hero-focus">Focused on <RotatingWord words={PROFILE.focus} /></p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="hero-actions">
                  <button className="btn btn-primary" onClick={() => go("contact")}>Get in touch <ArrowIcon size={16} /></button>
                  <CvMenu />
                  <Socials />
                </div>
              </Reveal>
              <Reveal delay={0.32}>
                <div className="stats" ref={statsRef}>
                  {STATS.map((s) => <Stat key={s.label} {...s} start={statsVisible} />)}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="hero-visual">
              <Workspace />
            </Reveal>
          </div>

          <button className="scroll-cue" onClick={() => go("about")} aria-label="Scroll to About">
            <span />
          </button>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="container">
            <SectionHead label="About" title={<>Where business <em>meets</em> technology.</>} />
            <div className="about-grid">
              <Reveal className="about-photo">
                <TiltCard className="portrait" max={6}>
                  <div className="portrait-frame">
                    <img src="/nasser-alsarabi.webp" alt="Portrait of Nasser Alsarabi" width="720" height="900" loading="lazy" decoding="async" />
                  </div>
                  <div className="portrait-badge"><span className="pulse" /> {PROFILE.availability}</div>
                  <div className="portrait-chip"><PinIcon size={14} /> Dubai · Amman</div>
                </TiltCard>
              </Reveal>
              <Reveal className="about-copy">
                <p className="lead">{PROFILE.summary}</p>
                <p className="muted">{PROFILE.seeking}</p>
                <ul className="facts">
                  <li><PinIcon /><span><b>Based in</b>Dubai, UAE · Amman, Jordan</span></li>
                  <li><PassportIcon /><span><b>Citizenship</b>{PROFILE.citizenship}</span></li>
                  <li><CapIcon /><span><b>Education</b>B.Sc. Business Information Technology, PSUT</span></li>
                  <li><BoltIcon /><span><b>Availability</b>{PROFILE.availability}</span></li>
                </ul>
              </Reveal>
            </div>

            <div className="pillars">
              {PILLARS.map((p, i) => {
                const Icon = PILLAR_ICONS[p.key];
                return (
                  <Reveal key={p.key} delay={0.06 * i}>
                    <TiltCard className="card pillar">
                      <div className="pillar-icon"><Icon size={20} /></div>
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                      <div className="chips sm">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="process">
              <div className="process-label">How I work</div>
              <ol className="process-steps">
                {PROCESS.map((s) => (
                  <li key={s.step}>
                    <span className="process-num">{s.step}</span>
                    <strong>{s.title}</strong>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <div className="container">
            <SectionHead
              label="Experience"
              title={<>Digitalizing <em>supply chain</em> operations.</>}
              desc="Turning manual processes into web apps, automated workflows and executive reporting."
            />

            <Reveal>
              <article className="card job">
                <div className="job-head">
                  <div className="job-logo" aria-hidden="true">{EXPERIENCE.companyShort}</div>
                  <div className="job-title">
                    <h3>{EXPERIENCE.role}</h3>
                    <div className="job-company">{EXPERIENCE.company}</div>
                    <div className="job-meta"><span><PinIcon size={14} /> {EXPERIENCE.location}</span><span>{EXPERIENCE.companyNote}</span></div>
                  </div>
                  <div className="job-date">{EXPERIENCE.dates}</div>
                </div>

                <div className="highlights">
                  {EXPERIENCE.highlights.map((h, i) => (
                    <Reveal key={h.title} delay={0.08 * i}>
                      <TiltCard className="highlight" max={9}>
                        <div className="highlight-metric">{h.metric}</div>
                        <div className="highlight-title">{h.title}</div>
                        <p>{h.text}</p>
                      </TiltCard>
                    </Reveal>
                  ))}
                </div>

                <div className="duties">
                  {EXPERIENCE.groups.map((g) => (
                    <div className="duty" key={g.label}>
                      <div className="duty-label">{g.label}</div>
                      <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
                    </div>
                  ))}
                </div>

                <div className="chips">{EXPERIENCE.stack.map((t) => <span key={t}>{t}</span>)}</div>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              <ProcessShift />
            </Reveal>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <div className="container">
            <SectionHead
              label="Skills"
              title={<>A toolkit that spans <em>code</em>, <em>data</em> and <em>process</em>.</>}
              desc="Drag the globe to spin it."
            />
            <div className="skills-layout">
              <Reveal className="globe-col"><SkillGlobe items={GLOBE_SKILLS} /></Reveal>
              <div className="skill-groups">
                {SKILLS.map((g, i) => (
                  <Reveal key={g.group} delay={0.04 * i}>
                    <div className="skill-group">
                      <h3>{g.group}</h3>
                      <div className="chips">{g.items.map((s) => <span key={s}>{s}</span>)}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}><i />{m}</span>)}
          </div>
        </div>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="container">
            <SectionHead label="Projects" title={<>Featured <em>build</em>.</>} />
            <Reveal>
              <article className="card project">
                <div className="project-copy">
                  <div className="project-top">
                    <span className="tag">{PROJECT.badge}</span>
                    <span className="project-date">{PROJECT.dates}</span>
                  </div>
                  <h3 className="project-name">{PROJECT.name}</h3>
                  <div className="project-sub">{PROJECT.subtitle}</div>
                  <p className="project-desc">{PROJECT.description}</p>
                  <ul className="modules" onMouseLeave={() => setFocusModule(null)}>
                    {PROJECT.modules.map((m, i) => (
                      <li
                        key={m.name}
                        className={focusModule === m.name ? "on" : ""}
                        onMouseEnter={() => setFocusModule(m.name)}
                        onFocus={() => setFocusModule(m.name)}
                        onBlur={() => setFocusModule(null)}
                        tabIndex={0}
                      >
                        <span className="module-num">0{i + 1}</span>
                        <span><strong>{m.name}</strong>{m.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <FlowCanvas focus={focusModule} />
              </article>
            </Reveal>
          </div>
        </section>

        {/* CREDENTIALS */}
        <section className="section" id="credentials">
          <div className="container">
            <SectionHead label="Credentials" title={<>Education, <em>certifications</em> & awards.</>} />
            <div className="bento">
              <Reveal className="b-edu">
                <TiltCard className="card bento-card edu" max={5}>
                  <div className="bento-icon"><CapIcon size={20} /></div>
                  <div className="bento-kicker">Education</div>
                  <h3>{EDUCATION.degree}</h3>
                  <p className="edu-school">{EDUCATION.school}</p>
                  <p className="muted">{EDUCATION.faculty} · {EDUCATION.location}</p>
                  <div className="edu-foot">
                    <span className="gpa"><b>GPA</b> {EDUCATION.gpa}</span>
                    <span className="muted">{EDUCATION.dates}</span>
                  </div>
                </TiltCard>
              </Reveal>

              <Reveal className="b-award" delay={0.06}>
                <TiltCard className="card bento-card award" max={8}>
                  <div className="medal" aria-hidden="true"><span>2</span></div>
                  <div className="bento-kicker"><TrophyIcon size={14} /> Award</div>
                  <h3>{AWARD.title}</h3>
                  <p className="muted">{AWARD.org} · {AWARD.date}</p>
                </TiltCard>
              </Reveal>

              <Reveal className="b-certs" delay={0.1}>
                <div className="card bento-card">
                  <div className="bento-kicker"><BadgeIcon size={14} /> Certifications</div>
                  <ul className="cred-list">
                    {CERTIFICATIONS.map((c) => (
                      <li key={c.name}><span className="cred-name">{c.name}</span><span className="cred-issuer">{c.issuer}</span></li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal className="b-courses" delay={0.14}>
                <div className="card bento-card">
                  <div className="bento-kicker"><BookIcon size={14} /> Courses</div>
                  <ul className="cred-list">
                    {COURSES.map((c) => (
                      <li key={c.name}><span className="cred-name">{c.name}</span><span className="cred-issuer">{c.issuer}</span></li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal className="b-langs" delay={0.18}>
                <div className="card bento-card">
                  <div className="bento-kicker"><GlobeIcon size={14} /> Languages</div>
                  <div className="langs">
                    {LANGUAGES.map((l) => (
                      <div className="lang" key={l.name}>
                        <span className="lang-code">{l.name.slice(0, 2).toUpperCase()}</span>
                        <span><strong>{l.name}</strong><small>{l.level}</small></span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="container">
            <SectionHead
              label="Contact"
              title={<>Let's build something <em>useful</em>.</>}
              desc="Hiring for software, business analysis or data roles in the UAE or Jordan? I'd love to hear from you."
            />
            <div className="contact-grid">
              <Reveal className="contact-side">
                <a className="card contact-email" href={`mailto:${PROFILE.email}`}>
                  <span className="contact-icon"><MailIcon /></span>
                  <span><small>Email</small><strong>{PROFILE.email}</strong></span>
                  <ArrowIcon size={18} className="contact-arrow" />
                </a>
                <div className="locs">
                  {PROFILE.locations.map((l) => (
                    <div className="card loc" key={l.country}>
                      <div className="loc-head"><PinIcon size={16} /> {l.city}, {l.country}</div>
                      <a className="loc-phone" href={`tel:${l.tel}`}><PhoneIcon size={15} /> {l.phone}</a>
                      <a className="loc-cv" href={l.cv} download={l.cvName}><DownloadIcon size={15} /> {l.country} CV</a>
                    </div>
                  ))}
                </div>
                <div className="contact-links">
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="card"><LinkedInIcon /> {PROFILE.linkedinLabel}</a>
                  <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="card"><GitHubIcon /> {PROFILE.githubLabel}</a>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <form className="card form" onSubmit={submit} noValidate>
                  <div className="form-row">
                    <label><span>Name</span><input {...field("name")} autoComplete="name" required /></label>
                    <label><span>Email</span><input type="email" {...field("email")} autoComplete="email" required /></label>
                  </div>
                  <label><span>Subject</span><input {...field("subject")} /></label>
                  <label><span>Message</span><textarea rows={5} {...field("message")} required /></label>
                  <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" {...field("website")} />
                  <button className="btn btn-primary block" type="submit" disabled={formState === "sending"}>
                    {formState === "sending" ? <><span className="spinner" /> Sending…</>
                      : formState === "sent" ? "✓ Message sent"
                      : <>Send message <ArrowIcon size={16} /></>}
                  </button>
                  <div aria-live="polite">
                    {formState === "missing" && <p className="form-note">Please fill in your name, email and message.</p>}
                    {formState === "bad-email" && <p className="form-note">That email address doesn't look right — please check it.</p>}
                    {formState === "sent" && <p className="form-note ok">Thanks for reaching out! I'll get back to you soon.</p>}
                    {formState === "error" && (
                      <p className="form-note">
                        Something went wrong sending your message. Please email me directly at{" "}
                        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>.
                      </p>
                    )}
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <span className="muted">Designed & built with React</span>
          <button className="link-btn" onClick={() => go("home")}>Back to top ↑</button>
        </div>
      </footer>
    </>
  );
}
