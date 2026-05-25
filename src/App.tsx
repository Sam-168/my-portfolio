import { useEffect, useRef, useState } from "react"

const projects = [
  {
    id: "simplee",
    title: "Simplee",
    tagline: "SaaS for township businesses",
    description: "Booking & operations platform built for small businesses replacing WhatsApp chaos with one shareable link. Business owners set up services, share their booking URL, and manage everything from a mobile-first dashboard. Built with Vue 3, Supabase, and deployed on Vercel — currently in beta with real businesses testing it across Cape Town.",
    status: "live",
    tags: ["Vue 3", "Supabase", "Tailwind", "PWA", "Vercel"],
    accent: "blue",
    metric: "Beta · Cape Town SMEs",
    links: [
      { label: "Live demo", href: "https://simplee-book.vercel.app/" },
      
    ]
  },
  {
    id: "raysense",
    title: "RaySense",
    tagline: "Biometric attendance at scale",
    description: "Full-stack facial recognition system that automates student attendance across modules and class sections — no manual roll calls. Three-tier microservice architecture: Vue.js frontend, Spring Boot REST API with role-based access control for students, lecturers, and admins, and a Python FastAPI service running OpenCV and dlib for real-time face encoding. All containerised with Docker over a shared network.",
    status: "live",
    tags: ["Spring Boot", "Vue 3", "FastAPI", "OpenCV", "dlib", "Docker"],
    accent: "cyan",
    metric: "3 roles · real-time recognition",
    links: [
      { label: "Live demo", href: "https://ray-sense.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Sam-168/ray-sense" }
    ]
  },
  {
    id: "civicfix",
    title: "CivicFix AI",
    tagline: "AI-powered fault reporting",
    description: "Municipal infrastructure fault reporting platform with integrated image classification — users submit photos of potholes, water leaks, or damaged infrastructure and the system automatically detects and categorises the issue. AI predictions combined with data analytics surface trends, high-risk areas, and recurring infrastructure problems for city officials.",
    status: "building",
    tags: ["AI", "Image Classification", "Data Analytics", "Python"],
    accent: "amber",
    metric: "Deploying soon",
    links: [
      { label: "  Github", href: "https://github.com/Sam-168/civicfix" }
    ]
  },
  {
    id: "tappa",
    title: "Tappa",
    tagline: "NFC student card virtualisation",
    description: "Students emulate their physical student cards on their phones and use them for campus access control on SALTO systems — no card, no problem. Exploring NFC protocol implementation, secure credential storage, and hardware-software integration. The kind of project that sits at the intersection of embedded systems and modern mobile UX.",
    status: "exploring",
    tags: ["NFC", "Mobile", "SALTO", "Hardware + Software"],
    accent: "emerald",
    metric: "Planning phase",
    links: [
      { label: "Concept", href: "https://github.com/Sam-168/Tappa" }
    ]
  },
  {
    id: "webserver",
    title: "HTTP Server from Scratch",
    tagline: "Java · no frameworks",
    description: "A fully functional web server built from raw Java — HTTP request parsing, multi-threaded connection handling, proper content-type serving, and static site hosting. JSON-based config, comprehensive test suite, and direct protocol implementation. The goal was simple: understand what happens before the framework.",
    status: "live",
    tags: ["Java", "HTTP", "Multi-threading", "TCP/IP"],
    accent: "blue",
    metric: "From scratch · no libs",
    links: [
      { label: "GitHub", href: "https://github.com/Sam-168/http-server" }
    ]
  },
  {
    id: "espazasethu",
    title: "e-SpazaSethu",
    tagline: "POS + inventory for spaza shops",
    description: "Digitising stock tracking, sales recording, and profit monitoring for small spaza shop owners who currently rely on notebooks and mental arithmetic. Spring Boot backend with a validated MVP domain model covering six core entities. Offline-first capability planned for phase two — these shops don't always have stable data.",
    status: "building",
    tags: ["Spring Boot", "Vue 3", "MySQL", "Offline-first"],
    accent: "amber",
    metric: "MVP in progress",
    links: [
      //{ label: "Domain model", href: "#" }
    ]
  },
]

const experiments = [
  {
    title: "docker + ci/cd",
    why: "Learning deployment properly — VPS provisioning, Docker Compose for multi-service apps, GitHub Actions pipelines, and zero-downtime deploys. Building muscle memory for shipping, not just building.",
    stack: "Docker · GitHub Actions · Nginx · VPS"
  },
  {
    title: "system design",
    why: "Working through distributed systems concepts: caching layers, database indexing, load balancing, and consistency models. Reading architecture decision records from real companies and reverse-engineering their choices.",
    stack: "Theory · case studies · hands-on prototypes"
  },
  {
    title: "hardware + software",
    why: "Tappa pushed me toward NFC and SALTO systems. Interested in how software interfaces with physical hardware — access control, sensors, embedded logic. The gap between code and the real world is where interesting problems live.",
    stack: "NFC · SALTO · embedded concepts"
  },
  {
    title: "youtube / teaching",
    why: "Running a channel teaching Java fundamentals, OOP, Design Patterns, Spring Boot, and Java Swing. Forcing clarity: if I can't explain it on camera in plain language, I don't understand it well enough.",
    stack: "Java · Spring Boot · OOP · Design Patterns"
  },
]

const stack = [
  {
    title: "Languages",
    items: ["Java (OOP, multi-threading, streams)", "JavaScript / TypeScript", "Python", "SQL (MySQL, PostgreSQL)"],
    accent: "blue"
  },
  {
    title: "Web & APIs",
    items: ["Spring Boot", "Vue 3 + Vite", "FastAPI", "REST · Webhooks · JWT auth"],
    accent: "cyan"
  },
  {
    title: "AI & Data",
    items: ["OpenCV · dlib (facial recognition)", "Image classification", "Data analytics & trend detection", "scikit-learn basics"],
    accent: "amber"
  },
  {
    title: "Infra & DevOps",
    items: ["Docker · Docker Compose", "GitHub Actions (learning CI/CD)", "Supabase · Vercel", "Linux · VPS provisioning"],
    accent: "emerald"
  },
  {
    title: "Hardware Intersection",
    items: ["NFC protocol (exploring)", "SALTO access control systems", "Biometric hardware integration", "Embedded concepts"],
    accent: "blue"
  },
  {
    title: "How I Work",
    items: ["Build things that actually ship", "Teach as I learn (YouTube + tutoring)", "Document decisions, not just code", "Finance + tech = business context"],
    accent: "cyan"
  },
]

export default function Portfolio() {
  const [typed, setTyped] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeSection, setActiveSection] = useState("work")

  const phrases = [
    "build systems that actually ship",
    "turn real problems into products",
    "combine hardware with software",
    "make complexity feel simple",
    "learn by building in public"
  ]

  useEffect(() => {
    const current = phrases[phraseIndex]
    const speed = isDeleting ? 25 : 40
    const tick = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) {
          setTyped(current.slice(0, charIndex + 1))
          setCharIndex(c => c + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 1600)
        }
      } else {
        if (charIndex > 0) {
          setTyped(current.slice(0, charIndex - 1))
          setCharIndex(c => c - 1)
        } else {
          setIsDeleting(false)
          setPhraseIndex(p => (p + 1) % phrases.length)
        }
      }
    }, speed)
    return () => clearTimeout(tick)
  }, [charIndex, isDeleting, phraseIndex])

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(c => !c), 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      { threshold: 0.08, rootMargin: "-60px" }
    )
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const accentColors = {
    blue: { border: "rgba(59,130,246,0.3)", glow: "rgba(59,130,246,0.15)", dot: "#3b82f6", text: "#93c5fd" },
    cyan: { border: "rgba(34,211,238,0.3)", glow: "rgba(34,211,238,0.15)", dot: "#22d3ee", text: "#67e8f9" },
    amber: { border: "rgba(245,158,11,0.3)", glow: "rgba(245,158,11,0.15)", dot: "#f59e0b", text: "#fcd34d" },
    emerald: { border: "rgba(52,211,153,0.3)", glow: "rgba(52,211,153,0.15)", dot: "#34d399", text: "#6ee7b7" },
  }

  const statusConfig = {
    live: { label: "live", color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.25)" },
    building: { label: "building", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
    exploring: { label: "exploring", color: "#22d3ee", bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.25)" },
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080810",
      color: "#e2e8f0",
      fontFamily: "'Instrument Sans', sans-serif",
      overflowX: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #080810; }
        ::-webkit-scrollbar-thumb { background: #1e1e30; border-radius: 3px; }

        [data-reveal] {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-link {
          font-size: 13px;
          color: #64748b;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          font-weight: 450;
          letter-spacing: -0.01em;
        }
        .nav-link:hover { color: #e2e8f0; background: rgba(255,255,255,0.05); }

        .project-card {
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .project-card:hover { transform: translateY(-2px); }

        .stack-card {
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          padding: 22px;
          transition: border-color 0.25s, background 0.25s;
        }
        .stack-card:hover { background: rgba(255,255,255,0.04); }

        .exp-card {
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          padding: 20px;
          transition: border-color 0.25s;
        }
        .exp-card:hover { border-color: rgba(255,255,255,0.14); }

        .tag-pill {
          font-family: 'Fragment Mono', monospace;
          font-size: 11px;
          color: #94a3b8;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 100px;
          padding: 3px 10px;
          letter-spacing: -0.01em;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 46px;
          padding: 0 22px;
          border-radius: 14px;
          background: #e2e8f0;
          color: #080810;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          border: none;
          cursor: pointer;
        }
        .cta-primary:hover { background: #ffffff; transform: translateY(-1px); }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 46px;
          padding: 0 22px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #cbd5e1;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
          cursor: pointer;
        }
        .cta-secondary:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.18); }

        .link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 34px;
          padding: 0 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.03);
          color: #94a3b8;
          font-size: 12.5px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          letter-spacing: -0.01em;
        }
        .link-btn:hover { color: #e2e8f0; border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.06); }

        .section-label {
          font-family: 'Fragment Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #475569);
        }

        .contact-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transition: background 0.2s;
        }
        .contact-row:hover { background: rgba(255,255,255,0.05); }

        @media (max-width: 768px) {
          .project-card { padding: 20px; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .stack-grid { grid-template-columns: 1fr 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.08), transparent)"
      }} />
      <div style={{
        position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 900, height: 500,
        background: "radial-gradient(ellipse, rgba(59,130,246,0.06), transparent 70%)",
        zIndex: 0, pointerEvents: "none"
      }} />

      {/* Grid texture */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.025,
        backgroundImage: "linear-gradient(rgba(226,232,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,1) 1px, transparent 1px)",
        backgroundSize: "44px 44px"
      }} />

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        background: "rgba(8,8,16,0.75)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 24px",
          height: 60, display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 10,
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "grid", placeItems: "center",
              fontFamily: "'Fragment Mono', monospace", fontSize: 11, fontWeight: 500, color: "#fff"
            }}>SN</div>
            <span style={{ fontFamily: "'Fragment Serif', serif", fontStyle: "italic", fontSize: 15, color: "#e2e8f0", letterSpacing: "-0.01em" }}>
              samukelo.ndlela
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {["work", "stack", "lab", "philosophy", "contact"].map(s => (
              <a key={s} href={`#${s}`} className="nav-link">{s}</a>
            ))}
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)", margin: "0 8px" }} />
            <a href="https://github.com/Sam-168" target="_blank" rel="noreferrer" className="cta-secondary" style={{ height: 34, fontSize: 13 }}>
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "140px 24px 100px" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              {/* Status pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(255,255,255,0.03)",
                marginBottom: 32
              }}>
                <span style={{ position: "relative", display: "grid", placeItems: "center", width: 16, height: 16 }}>
                  <span style={{
                    position: "absolute", width: 10, height: 10, borderRadius: "50%",
                    background: "rgba(52,211,153,0.25)",
                    animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite"
                  }} />
                  <span style={{ position: "absolute", width: 7, height: 7, borderRadius: "50%", background: "#34d399" }} />
                </span>
                <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: "#94a3b8", textTransform: "uppercase" }}>
                  Open to internships · Cape Town / Remote
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Fragment Serfi', serif",
                fontSize: "clamp(44px, 6vw, 72px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "#f8fafc",
                marginBottom: 20
              }}>
                Samukelo<br />
                <span style={{ color: "#3b82f6" }}>Ndlela</span>
              </h1>

              <p style={{
                fontSize: 18, lineHeight: 1.6, color: "#64748b",
                marginBottom: 12, letterSpacing: "-0.01em"
              }}>
                3rd-year IT @ CPUT. I&nbsp;
                <span style={{ color: "#cbd5e1", fontWeight: 500 }}>{typed}</span>
                <span style={{
                  display: "inline-block", width: 2, height: "1em",
                  background: "#3b82f6",
                  marginLeft: 1,
                  verticalAlign: "text-bottom",
                  opacity: showCursor ? 1 : 0,
                  transition: "opacity 0.1s"
                }} />
              </p>

              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#475569", maxWidth: 440, letterSpacing: "-0.01em", marginBottom: 36 }}>
                Building SaaS products, biometric systems, and AI-powered tools from Cape Town. I write about it, teach it, and ship it.
              </p>

              {/* Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
                {[
                  { k: "builder", v: "SaaS · biometrics · AI" },
                  { k: "teacher", v: "Java · YouTube" },
                  { k: "explorer", v: "hardware + software" }
                ].map(chip => (
                  <div key={chip.k} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "6px 12px", borderRadius: 100,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)"
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#3b82f6" }} />
                    <span style={{ fontSize: 12.5, letterSpacing: "-0.01em", color: "#94a3b8" }}>
                      <strong style={{ color: "#cbd5e1", fontWeight: 600 }}>{chip.k}</strong>
                      <span style={{ color: "#475569", margin: "0 6px" }}>·</span>
                      <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 11 }}>{chip.v}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#work" className="cta-primary">
                  View my work
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </a>
                <a href="mailto:Samukelondlela2.0@gmail.com" className="cta-secondary">
                  Get in touch
                </a>
              </div>
            </div>

            {/* Terminal card */}
            <div>
              <div style={{
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                overflow: "hidden",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.1)"
              }}>
                {/* Terminal chrome */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)"
                }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => (
                      <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 11, color: "#475569", marginLeft: 8 }}>
                    zsh — samukelo@dev
                  </span>
                </div>
                <div style={{ padding: "18px 20px", fontFamily: "'Fragment Mono', monospace", fontSize: 12.5, lineHeight: 1.75 }}>
                  <div style={{ color: "#475569" }}># what's shipping right now</div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ color: "#93c5fd" }}>build</span>
                    <span style={{ color: "#475569" }}>: </span>
                    <span style={{ color: "#e2e8f0" }}>Simplee v1 — beta testing</span>
                  </div>
                  <div>
                    <span style={{ color: "#6ee7b7" }}>live</span>
                    <span style={{ color: "#475569" }}>: </span>
                    <span style={{ color: "#e2e8f0" }}>RaySense — facial recognition</span>
                  </div>
                  <div>
                    <span style={{ color: "#fcd34d" }}>deploy</span>
                    <span style={{ color: "#475569" }}>: </span>
                    <span style={{ color: "#e2e8f0" }}>CivicFix AI — almost live</span>
                  </div>
                  <div>
                    <span style={{ color: "#c4b5fd" }}>explore</span>
                    <span style={{ color: "#475569" }}>: </span>
                    <span style={{ color: "#e2e8f0" }}>Tappa — NFC student cards</span>
                  </div>
                  <div style={{ marginTop: 8, color: "#475569" }}># also</div>
                  <div>
                    <span style={{ color: "#f9a8d4" }}>teach</span>
                    <span style={{ color: "#475569" }}>: </span>
                    <span style={{ color: "#e2e8f0" }}>Java fundamentals on YouTube</span>
                  </div>
                  <div>
                    <span style={{ color: "#6ee7b7" }}>learn</span>
                    <span style={{ color: "#475569" }}>: </span>
                    <span style={{ color: "#e2e8f0" }}>Docker · CI/CD · system design</span>
                  </div>
                  <div style={{ marginTop: 10, color: "#475569" }}># interests outside code</div>
                  <div style={{ color: "#94a3b8" }}>
                    finance markets · high-performance cars · building things that matter
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section data-reveal style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "96px 0" }}>
          <div className="about-grid" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "start" }}>
            <div>
              <div className="section-label" style={{ marginBottom: 28 }}>About</div>
              <h2 style={{
                fontFamily: "'Fragment Serif', serif", fontStyle: "",
                fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 700,
                letterSpacing: "-0.03em", lineHeight: 1.1,
                color: "#f8fafc", marginBottom: 28
              }}>
                From Java fundamentals to systems that solve real problems.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  "I started where most do — variables, loops, arrays, OOP, design patterns. Java on a laptop in Cape Town, learning by breaking things. But sitting with fundamentals wasn't enough. I started tutoring other beginners, then started building: a web server from raw TCP, a biometric system that actually works, a SaaS product with paying beta users.",
                  "Third-year IT student at Cape Peninsula University of Technology. I balance coursework with real product work: Simplee (booking SaaS for township businesses), RaySense (facial recognition attendance), CivicFix AI (municipal fault reporting), and Tappa (NFC student card virtualisation). Each one pushed me into unfamiliar territory — microservices, Docker, AI, hardware protocols.",
                  "What I'm chasing: the intersection of hardware and software, distributed systems design, and products that have genuine impact in South African communities. I also teach Java on YouTube because if I can't explain it on camera, I don't truly understand it yet."
                ].map((p, i) => (
                  <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: "#94a3b8", letterSpacing: "-0.01em" }}
                    dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </div>

            {/* Stats card */}
            <div style={{
              borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)", padding: 24
            }}>
              <div style={{
                fontFamily: "'Fragment Mono', monospace", fontSize: 11,
                letterSpacing: "0.12em", color: "#475569", textTransform: "uppercase", marginBottom: 20
              }}>Snapshot · 2025</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { k: "Projects shipped", v: "6+", sub: "4 with real users" },
                  { k: "Students tutored", v: "50+", sub: "Java fundamentals" },
                  { k: "Repos on GitHub", v: "active", sub: "Sam-168" },
                  { k: "Study year", v: "3rd", sub: "CPUT · IT" },
                ].map(stat => (
                  <div key={stat.k} style={{
                    borderRadius: 18, border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)", padding: 16
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "#475569", textTransform: "uppercase" }}>{stat.k}</div>
                    <div style={{ fontFamily: "'Fragment Serif', serif", fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: "#f8fafc", marginTop: 8 }}>{stat.v}</div>
                    <div style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 11, color: "#64748b", marginTop: 4 }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 14, borderRadius: 16, border: "1px solid rgba(245,158,11,0.2)",
                background: "rgba(245,158,11,0.06)", padding: "14px 16px"
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#fcd34d", textTransform: "uppercase" }}>Currently</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: "#fef3c7", marginTop: 6 }}>
                  Getting Simplee beta users · learning Docker + CI/CD · exploring NFC hardware integration
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section id="stack" data-reveal style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "96px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 48, flexWrap: "wrap" }}>
              <div>
                <div className="section-label" style={{ marginBottom: 16 }}>Stack</div>
                <h2 style={{
                  fontFamily: "'Fragment Serif', serif", fontStyle: "",
                  fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700,
                  letterSpacing: "-0.028em", color: "#f8fafc"
                }}>Systems, data, and real hardware.</h2>
              </div>
              <p style={{ maxWidth: 380, fontSize: 14, lineHeight: 1.7, color: "#64748b", letterSpacing: "-0.01em" }}>
                I pick tools that force me to understand what's happening underneath. Frameworks come and go — the fundamentals compound.
              </p>
            </div>
            <div className="stack-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {stack.map(group => {
                const ac = accentColors[group.accent]
                return (
                  <div key={group.title} className="stack-card" style={{ position: "relative" }}>
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
                      background: `radial-gradient(600px at 0% 0%, ${ac.glow}, transparent)`,
                      opacity: 0
                    }} />
                    <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#475569", textTransform: "uppercase", marginBottom: 16 }}>
                      {group.title}
                    </h3>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                      {group.items.map(it => (
                        <li key={it} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "#cbd5e1", letterSpacing: "-0.01em", lineHeight: 1.5 }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: ac.dot, marginTop: 6, flexShrink: 0 }} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" data-reveal style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "96px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 48, flexWrap: "wrap" }}>
              <div>
                <div className="section-label" style={{ marginBottom: 16 }}>Work</div>
                <h2 style={{
                  fontFamily: "'Fragment Serif', serif", fontStyle: "",
                  fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700,
                  letterSpacing: "-0.03em", color: "#f8fafc"
                }}>Projects with users, constraints, and story.</h2>
              </div>
              <a href="https://github.com/Sam-168" target="_blank" rel="noreferrer" className="link-btn">
                All repos ↗
              </a>
            </div>
            <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {projects.map(p => {
                const ac = accentColors[p.accent]
                const sc = statusConfig[p.status]
                return (
                  <article key={p.id} className="project-card" style={{ borderColor: `rgba(255,255,255,0.07)` }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = ac.border}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                  >
                    {/* Glow */}
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: 24, pointerEvents: "none",
                      background: `radial-gradient(500px at 0% 0%, ${ac.glow}, transparent)`,
                      opacity: 0.6
                    }} />

                    <div style={{ position: "relative" }}>
                      {/* Header */}
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                            <span style={{
                              display: "inline-flex", alignItems: "center", gap: 5,
                              padding: "3px 10px", height: 24, borderRadius: 100,
                              border: `1px solid ${sc.border}`,
                              background: sc.bg,
                              fontSize: 10.5, fontWeight: 600, letterSpacing: "0.06em",
                              textTransform: "uppercase", color: sc.color
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.color }} />
                              {sc.label}
                            </span>
                            {p.metric && (
                              <span style={{
                                fontFamily: "'Fragment Mono', monospace", fontSize: 10.5,
                                color: "#64748b", padding: "3px 10px", height: 24,
                                borderRadius: 100, border: "1px solid rgba(255,255,255,0.08)",
                                background: "rgba(255,255,255,0.03)", display: "grid", placeItems: "center"
                              }}>{p.metric}</span>
                            )}
                          </div>
                          <h3 style={{
                            fontFamily: "'Fragment Serif', serif", fontStyle: "italic",
                            fontSize: 22, fontWeight: 700, letterSpacing: "-0.025em",
                            color: "#f8fafc", lineHeight: 1.2
                          }}>{p.title}</h3>
                          <p style={{ fontSize: 13, color: "#64748b", marginTop: 3, letterSpacing: "-0.01em" }}>{p.tagline}</p>
                        </div>
                      </div>

                      <p style={{ fontSize: 14, lineHeight: 1.75, color: "#94a3b8", letterSpacing: "-0.01em", marginBottom: 18 }}>
                        {p.description}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                        {p.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                      </div>

                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {p.links.map(link => (
                          <a key={link.label} href={link.href} className="link-btn">
                            {link.label}
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2.5 2.5h6M8.5 2.5v6M2.5 8.5L8.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                      background: `linear-gradient(90deg, transparent, ${ac.dot}, transparent)`,
                      opacity: 0, borderRadius: "0 0 24px 24px",
                      transition: "opacity 0.3s"
                    }} className="card-line" />
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* LAB */}
        <section id="lab" data-reveal style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "96px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 48, flexWrap: "wrap" }}>
              <div>
                <div className="section-label" style={{ marginBottom: 16 }}>Lab</div>
                <h2 style={{
                  fontFamily: "'Fragment Serif', serif", fontStyle: "",
                  fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700,
                  letterSpacing: "-0.028em", color: "#f8fafc"
                }}>What I'm learning and experimenting with.</h2>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                fontFamily: "'Fragment Mono', monospace", fontSize: 11, letterSpacing: "0.08em",
                color: "#475569", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 100, padding: "5px 14px", background: "rgba(255,255,255,0.02)"
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
                iterating weekly
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {experiments.map(exp => (
                <div key={exp.title} className="exp-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <h3 style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 12, letterSpacing: "0.06em", color: "#94a3b8", textTransform: "uppercase" }}>
                      {exp.title}
                    </h3>
                    <span style={{
                      fontFamily: "'Fragment Mono', monospace", fontSize: 10, fontWeight: 600,
                      letterSpacing: "0.08em", color: "#475569",
                      border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100,
                      padding: "2px 10px"
                    }}>WIP</span>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#64748b", letterSpacing: "-0.01em", marginBottom: 12 }}>
                    {exp.why}
                  </p>
                  <p style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 11, color: "#475569" }}>{exp.stack}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section id="philosophy" data-reveal style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "96px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ maxWidth: 780 }}>
              <div className="section-label" style={{ marginBottom: 28 }}>Philosophy</div>
              <h2 style={{
                fontFamily: "'Fragment Serif', serif", fontStyle: "",
                fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700,
                letterSpacing: "-0.035em", lineHeight: 1.05,
                color: "#f8fafc", marginBottom: 48
              }}>
                Build in public.<br />Learn by shipping.<br />Use tech as leverage.
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 48 }}>
                {[
                  {
                    title: "Growth over posture",
                    body: "I'm early and I know it. That means fewer blind spots if I document the journey and ship steadily. Seniority comes from reps, not from pretending."
                  },
                  {
                    title: "Teaching forces clarity",
                    body: "If I can't explain it to a Java beginner on YouTube, I don't understand it well enough. Teaching is the most honest self-assessment tool I have."
                  },
                  {
                    title: "Hardware meets software",
                    body: "Code that only lives in browsers bores me. Biometric systems, NFC cards, access control — the intersection of physical and digital is where the interesting problems are."
                  },
                  {
                    title: "Finance context matters",
                    body: "Passionate about finance as much as technology. Building software without understanding how businesses make money is how you build things nobody pays for."
                  },
                ].map(p => (
                  <div key={p.title}>
                    <h3 style={{ fontSize: 16, fontWeight: 650, color: "#e2e8f0", letterSpacing: "-0.015em", marginBottom: 10 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.75, color: "#64748b", letterSpacing: "-0.01em" }}>{p.body}</p>
                    <div style={{ marginTop: 16, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
                  </div>
                ))}
              </div>

              {/* Pull quote */}
              <div style={{
                borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)",
                background: "radial-gradient(600px at 10% -20%, rgba(59,130,246,0.12), transparent)",
                padding: "28px 32px", position: "relative"
              }}>
                <div style={{
                  position: "absolute", top: -12, left: 24,
                  fontFamily: "'Fragment Mono', monospace", fontSize: 10, fontWeight: 600,
                  letterSpacing: "0.1em", color: "#475569", textTransform: "uppercase",
                  background: "#080810", padding: "3px 10px", borderRadius: 100,
                  border: "1px solid rgba(255,255,255,0.08)"
                }}>manifesto</div>
                <p style={{
                  fontFamily: "'Fragment Serif', serif", fontStyle: "",
                  fontSize: "clamp(18px, 2.5vw, 24px)", lineHeight: 1.4,
                  letterSpacing: "-0.02em", color: "#f8fafc"
                }}>
                  "I'm not trying to look impressive. I'm building trajectory — from Cape Town, one shipped project at a time."
                </p>
                <div style={{ marginTop: 12, fontFamily: "'Fragment Mono', monospace", fontSize: 11, color: "#475569" }}>
                  — notes to self, 3am debugging sessions
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" data-reveal style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "96px 0 120px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
            <div style={{
              borderRadius: 32, border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              padding: "40px 44px", position: "relative", overflow: "hidden"
            }}>
              {/* Grid texture inside card */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: 32, pointerEvents: "none", opacity: 0.03,
                backgroundImage: "linear-gradient(rgba(226,232,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,1) 1px, transparent 1px)",
                backgroundSize: "28px 28px"
              }} />
              <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
                <div>
                  <div className="section-label" style={{ marginBottom: 20 }}>Let's talk</div>
                  <h2 style={{
                    fontFamily: "'Fragment Serif', serif", fontStyle: "",
                    fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700,
                    letterSpacing: "-0.03em", color: "#f8fafc", lineHeight: 1.1, marginBottom: 16
                  }}>
                    If you're building something interesting, I want to hear about it.
                  </h2>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "#64748b", maxWidth: 440, letterSpacing: "-0.01em", marginBottom: 28 }}>
                    Third-year IT student at CPUT. Java, Spring Boot, Vue, Python, Docker, and an obsession with making things work in the real world. Based in Cape Town. Open to internships, junior roles, and project collabs.
                  </p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a href="mailto:Samukelondlela2.0@gmail.com" className="cta-primary">
                      Email me
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3h10v8H2z" stroke="currentColor" strokeWidth="1.2"/><path d="M2 3l5 4 5-4" stroke="currentColor" strokeWidth="1.2"/></svg>
                    </a>
                    <a href="https://github.com/Sam-168" target="_blank" rel="noreferrer" className="cta-secondary">GitHub</a>
                  </div>
                </div>

                {/* Contact card */}
                <div style={{
                  borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(0,0,0,0.3)", backdropFilter: "blur(20px)", padding: 22
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                    <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "#475569", textTransform: "uppercase" }}>Direct</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399" }} />
                      <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 10, color: "#475569" }}>responds within 24h</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { icon: "✉", label: "Email", value: "Samukelondlela2.0@gmail.com" },
                      { icon: "⌖", label: "Location", value: "Cape Town, South Africa" },
                      { icon: "⬡", label: "GitHub", value: "github.com/Sam-168" },
                      { icon: "✦", label: "Focus", value: "Full-stack · AI · hardware+software" },
                    ].map(item => (
                      <div key={item.label} className="contact-row">
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: 12,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            display: "grid", placeItems: "center",
                            fontFamily: "'Fragment Mono', monospace", fontSize: 13, color: "#94a3b8"
                          }}>{item.icon}</div>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", color: "#475569", textTransform: "uppercase" }}>{item.label}</div>
                            <div style={{ fontSize: 13, color: "#cbd5e1", letterSpacing: "-0.01em", marginTop: 1 }}>{item.value}</div>
                          </div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "#475569" }}><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    marginTop: 14, borderRadius: 14,
                    border: "1px solid rgba(59,130,246,0.25)",
                    background: "rgba(59,130,246,0.07)", padding: "12px 14px"
                  }}>
                    <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "#93c5fd" }}>
                      Open to: <strong style={{ color: "#bfdbfe" }}>internships · junior roles</strong> · freelance product work · research collabs in AI or embedded systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer style={{
              marginTop: 48, display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap", gap: 16
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 8,
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  display: "grid", placeItems: "center",
                  fontFamily: "'Fragment Mono', monospace", fontSize: 10, color: "#fff"
                }}>SN</div>
                <span style={{ fontSize: 12.5, color: "#475569", letterSpacing: "-0.01em" }}>
                  © {new Date().getFullYear()} Samukelo Ndlela · Cape Peninsula University of Technology
                </span>
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                {["GitHub", "YouTube", "LinkedIn"].map(l => (
                  <a key={l} href={l === "GitHub" ? "https://github.com/Sam-168" : "#"}
                    target="_blank" rel="noreferrer"
                    style={{ fontSize: 12, color: "#475569", textDecoration: "none", fontFamily: "'Fragment Mono', monospace", letterSpacing: "-0.01em" }}
                    onMouseEnter={e => e.target.style.color = "#94a3b8"}
                    onMouseLeave={e => e.target.style.color = "#475569"}
                  >{l}</a>
                ))}
              </div>
            </footer>
          </div>
        </section>

      </main>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }
        @media (max-width: 768px) {
          .about-grid, .hero-grid, .projects-grid { grid-template-columns: 1fr !important; }
          .stack-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}