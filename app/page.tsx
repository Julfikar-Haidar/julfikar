'use client'
import { useState, useEffect, useRef, CSSProperties } from "react";

/* ── Types ── */
interface Experience {
  company: string;
  subtitle: string;
  role: string;
  period: string;
  color: string;
  projects: string[];
  highlights: string[];
}

interface Project {
  name: string;
  type: string;
  desc: string;
  stack: string[];
  icon: string;
  color: string;
}

interface SkillCategory {
  key: keyof typeof skills;
  label: string;
  icon: string;
  color: string;
  border: string;
}

interface ContactItem {
  icon: string;
  label: string;
  val: string;
  link: string;
}

interface NavButton {
  label: string;
  href: string;
  primary: boolean;
}

/* ── Data ── */
const skills = {
  frontend: ["React.js", "Next.js", "TypeScript", "Vue.js", "React Native", "JavaScript ES6+"],
  backend: ["Node.js", "Express.js", "REST APIs", "RESTful Design", "API Integration"],
  architecture: ["Microservice Architecture", "Event-Driven Design", "API Gateway", "Service Mesh", "Domain-Driven Design"],
  state: ["Zustand", "Redux Toolkit", "TanStack Query", "Context API"],
  database: ["MongoDB", "PostgreSQL", "MySQL", "Query Optimization"],
  styling: ["Tailwind CSS", "Material UI", "Ant Design", "PrimeReact", "CSS3"],
  devops: ["Docker", "Kubernetes (basic)", "CI/CD", "Git", "VPS Deployment", "Linux"],
} as const;

const experiences: Experience[] = [
  {
    company: "TechnoNext Ltd.",
    subtitle: "Concern of US-Bangla Group",
    role: "Software Engineer",
    period: "Dec 2023 – Present",
    color: "#00ff9d",
    projects: ["CartUp (1M+ users)", "TakeOff OTA-B2B Platform"],
    highlights: ["React.js, Next.js, TanStack Query", "Node.js REST APIs, JWT Auth", "MongoDB + PostgreSQL", "Led frontend architecture"],
  },
  {
    company: "TS4U Ltd.",
    subtitle: "Dhaka, Bangladesh",
    role: "Software Engineer",
    period: "Jun – Nov 2023",
    color: "#ff6b35",
    projects: ["Learning Management System (LMS)"],
    highlights: ["Redux Toolkit state management", "SSR, code splitting, lazy loading", "Express.js + PostgreSQL", "Agile / CI-CD"],
  },
  {
    company: "Cloud Production Ltd.",
    subtitle: "Dhaka, Bangladesh",
    role: "Jr. Software Engineer",
    period: "Jan 2020 – Nov 2022",
    color: "#a855f7",
    projects: ["Japanese Ed-Gaming App", "Passport Management System", "Forum Application"],
    highlights: ["React.js + React Native (Expo)", "Vue.js + Laravel + MySQL", "Microservice Architecture", "Node.js + PostgreSQL", "VPS Deployment + Mentorship"],
  },
];

const projects: Project[] = [
  { name: "CartUp", type: "E-Commerce Platform", desc: "Multi-vendor eCommerce platform serving 1 million+ users with seamless shopping experience.", stack: ["React.js", "Next.js", "TanStack Query", "MongoDB", "Node.js"], icon: "🛒", color: "#00ff9d" },
  { name: "TakeOff OTA-B2B", type: "Travel Platform", desc: "Complex B2B OTA platform with booking management, payment integration and proposal generation.", stack: ["Next.js App Router", "TypeScript", "Zustand", "PostgreSQL"], icon: "✈️", color: "#38bdf8" },
  { name: "ERP.CASH", type: "Enterprise ERP", desc: "Full-stack ERP system with multi-level approval workflows, real-time dashboards, and CI/CD pipeline.", stack: ["Vue.js", "Python", "PostgreSQL", "Docker", "CI/CD"], icon: "🏗️", color: "#ff6b35" },
  { name: "Learning Management System", type: "EdTech Platform", desc: "Comprehensive LMS with course management, NextAuth, progress tracking, and SEO optimization.", stack: ["Next.js", "TypeScript", "Redux Toolkit", "MongoDB"], icon: "📚", color: "#a855f7" },
];

const navItems: string[] = ["Home", "Skills", "Experience", "Projects", "Contact"];

const skillCategories: SkillCategory[] = [
  { key: "frontend", label: "Frontend", icon: "⚛️", color: "#00ff9d", border: "rgba(0,255,157,0.2)" },
  { key: "backend", label: "Backend", icon: "⚙️", color: "#38bdf8", border: "rgba(56,189,248,0.2)" },
  { key: "architecture", label: "Architecture", icon: "🏗️", color: "#f59e0b", border: "rgba(245,158,11,0.2)" },
  { key: "state", label: "State Management", icon: "🔄", color: "#a855f7", border: "rgba(168,85,247,0.2)" },
  { key: "database", label: "Databases", icon: "🗄️", color: "#fb7185", border: "rgba(251,113,133,0.2)" },
  { key: "styling", label: "UI / Styling", icon: "🎨", color: "#34d399", border: "rgba(52,211,153,0.2)" },
  { key: "devops", label: "DevOps & Tools", icon: "🚀", color: "#f97316", border: "rgba(249,115,22,0.2)" },
];

const skillLevels: Record<string, number> = {
  "React.js": 95, "Next.js": 92, "TypeScript": 88, "Node.js": 87,
  "Express.js": 85, "TanStack Query": 87, "Zustand": 85, "Redux Toolkit": 82,
  "MongoDB": 83, "PostgreSQL": 80, "Microservices": 78, "Vue.js": 75, "Docker": 65,
};

const orbitNodes = {
  ring3: ["TypeScript", "MongoDB", "PostgreSQL", "Docker", "CI/CD", "Redis", "GraphQL", "Linux"],
  ring2: ["Next.js", "Node.js", "Express", "TanStack", "Zustand", "Vue.js"],
  ring1: ["React.js", "Tailwind", "JWT", "REST", "RBAC"],
};

/* ── Hooks ── */
function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

/* ── Sub-components ── */
function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${e.clientX - 10}px,${e.clientY - 10}px)`;
      setTimeout(() => { if (trailRef.current) trailRef.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`; }, 80);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={cursorRef} style={{ position: "fixed", width: 20, height: 20, border: "2px solid #00ff9d", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transition: "transform 0.05s linear", mixBlendMode: "difference" }} />
      <div ref={trailRef} style={{ position: "fixed", width: 8, height: 8, background: "#00ff9d", borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transition: "transform 0.12s linear", opacity: 0.7 }} />
    </>
  );
}

function GlitchText({ text, style = {} }: { text: string; style?: CSSProperties }) {
  const [g, setG] = useState(false);
  useEffect(() => {
    const id = setInterval(() => { setG(true); setTimeout(() => setG(false), 200); }, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block", ...style }}>
      {text}
      {g && <>
        <span style={{ position: "absolute", left: 2, top: 0, color: "#ff003c", clipPath: "inset(20% 0 60% 0)", ...style }}>{text}</span>
        <span style={{ position: "absolute", left: -2, top: 0, color: "#00ffff", clipPath: "inset(60% 0 20% 0)", ...style }}>{text}</span>
      </>}
    </span>
  );
}

function TypeWriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [disp, setDisp] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[idx];
    if (!del && disp.length < cur.length) { const t = setTimeout(() => setDisp(cur.slice(0, disp.length + 1)), 80); return () => clearTimeout(t); }
    if (!del && disp.length === cur.length) { const t = setTimeout(() => setDel(true), 1800); return () => clearTimeout(t); }
    if (del && disp.length > 0) { const t = setTimeout(() => setDisp(disp.slice(0, -1)), 40); return () => clearTimeout(t); }
    if (del && disp.length === 0) { setDel(false); setIdx(i => (i + 1) % texts.length); }
  }, [disp, del, idx, texts]);
  return <span>{disp}<span style={{ animation: "blink 1s step-end infinite", color: "#00ff9d" }}>|</span></span>;
}

function SkillBar({ name, level = 85 }: { name: string; level?: number }) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setW(level), 100); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level]);
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ color: "#e2e8f0", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>{name}</span>
        <span style={{ color: "#00ff9d", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "#1e2d3d", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: "linear-gradient(90deg,#00ff9d,#38bdf8)", borderRadius: 2, transition: "width 1.2s cubic-bezier(0.23,1,0.32,1)", boxShadow: "0 0 8px #00ff9d66" }} />
      </div>
    </div>
  );
}

function FloatingParticles() {
  const particles = useRef(
    Array.from({ length: 25 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 3 + 1, delay: Math.random() * 8, dur: Math.random() * 10 + 8 }))
  ).current;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map(p => (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.id % 3 === 0 ? "#00ff9d" : p.id % 3 === 1 ? "#38bdf8" : "#a855f7", borderRadius: "50%", opacity: 0.3, animation: `float ${p.dur}s ${p.delay}s ease-in-out infinite alternate` }} />
      ))}
    </div>
  );
}

function GridBg() {
  return <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(0,255,157,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,157,0.03) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />;
}

function OrbitSystem({ size }: { size: number }) {
  const r3 = size * 0.96, r2 = size * 0.67, r1 = size * 0.40, core = size * 0.22;

  const renderNodes = (nodes: string[], color: string, ringPx: number) =>
    nodes.map((t, i) => {
      const angle = (i / nodes.length) * 2 * Math.PI;
      const fs = ringPx < 180 ? 8 : ringPx < 280 ? 9 : 10;
      const py = ringPx < 180 ? 2 : 3;
      const px = ringPx < 180 ? 6 : 9;
      return (
        <div key={t} style={{ position: "absolute", left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%`, transform: "translate(-50%,-50%)", background: `rgba(${color},0.08)`, border: `1px solid rgba(${color},0.55)`, borderRadius: 20, padding: `${py}px ${px}px`, fontSize: fs, color: `rgba(${color},1)`, whiteSpace: "nowrap", fontFamily: "'JetBrains Mono',monospace", backdropFilter: "blur(4px)", boxShadow: `0 0 10px rgba(${color},0.25)` }}>{t}</div>
      );
    });

  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,255,157,0.04) 0%,transparent 70%)", animation: "pulse-glow 4s ease infinite" }} />
      <div style={{ position: "absolute", width: r3, height: r3, borderRadius: "50%", border: "1px dashed rgba(168,85,247,0.22)", animation: "spin-slow 40s linear infinite reverse" }}>
        {renderNodes(orbitNodes.ring3, "168,85,247", r3)}
      </div>
      <div style={{ position: "absolute", width: r2, height: r2, borderRadius: "50%", border: "1px solid rgba(56,189,248,0.22)", animation: "spin-slow 25s linear infinite" }}>
        {renderNodes(orbitNodes.ring2, "56,189,248", r2)}
      </div>
      <div style={{ position: "absolute", width: r1, height: r1, borderRadius: "50%", border: "1px solid rgba(0,255,157,0.28)", animation: "spin-slow 15s linear infinite reverse" }}>
        {renderNodes(orbitNodes.ring1, "0,255,157", r1)}
      </div>
      <div style={{ width: core, height: core, borderRadius: "50%", zIndex: 10, background: "radial-gradient(circle at 35% 35%,#00ff9d18,#38bdf810,#060d14)", border: "2px solid rgba(0,255,157,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: core * 0.28, boxShadow: "0 0 40px rgba(0,255,157,0.3),inset 0 0 30px rgba(0,255,157,0.05)", animation: "pulse-glow 3s ease infinite" }}>{"</>"}</div>
    </div>
  );
}

/* ══════════════════════ MAIN PAGE ══════════════════════ */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<string>("Home");
  const [scrollY, setScrollY] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [orbitSize, setOrbitSize] = useState<number>(480);
  const mobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const resize = () => setOrbitSize(window.innerWidth < 768 ? Math.min(window.innerWidth - 32, 320) : 480);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => { if (menuOpen) setMenuOpen(false); }, [scrollY]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  const px = mobile ? "20px" : "60px";
  const sec = mobile ? "72px 20px 56px" : "100px 60px";

  return (
    <div style={{ background: "#060d14", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'Space Mono',monospace", overflowX: "hidden", cursor: mobile ? "auto" : "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
        @keyframes float{from{transform:translateY(0)rotate(0)}to{transform:translateY(-28px)rotate(180deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse-glow{0%,100%{box-shadow:0 0 20px #00ff9d44}50%{box-shadow:0 0 40px #00ff9d88,0 0 80px #00ff9d22}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
        .nav-btn:hover{color:#00ff9d !important}
        .card-h{transition:transform 0.3s ease,box-shadow 0.3s ease}
        .card-h:hover{transform:translateY(-5px) scale(1.01);box-shadow:0 20px 60px rgba(0,255,157,0.15) !important}
        .sc{transition:all 0.2s cubic-bezier(0.23,1,0.32,1);cursor:default}
        .sc:hover{background:rgba(0,255,157,0.15) !important;color:#00ff9d !important;border-color:rgba(0,255,157,0.6) !important;transform:scale(1.07) translateY(-1px);box-shadow:0 4px 20px rgba(0,255,157,0.2)}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#060d14}::-webkit-scrollbar-thumb{background:#00ff9d44;border-radius:2px}
        *{box-sizing:border-box}
      `}</style>

      {!mobile && <Cursor />}
      <GridBg />
      <FloatingParticles />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${px}`, height: 64, background: scrollY > 50 || menuOpen ? "rgba(6,13,20,0.97)" : "transparent", backdropFilter: scrollY > 50 || menuOpen ? "blur(20px)" : "none", borderBottom: scrollY > 50 ? "1px solid rgba(0,255,157,0.1)" : "none", transition: "all 0.4s ease" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: "#00ff9d", letterSpacing: 2 }}>JH<span style={{ color: "#38bdf8" }}>.</span></div>
        {!mobile ? (
          <div style={{ display: "flex", gap: 32 }}>
            {navItems.map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="nav-btn" style={{ background: "none", border: "none", color: activeSection === item ? "#00ff9d" : "#94a3b8", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, cursor: "none", letterSpacing: 1, transition: "color 0.2s", borderBottom: activeSection === item ? "1px solid #00ff9d" : "1px solid transparent", paddingBottom: 2 }}>{item}</button>
            ))}
          </div>
        ) : (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "1px solid rgba(0,255,157,0.3)", borderRadius: 8, padding: "8px 10px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, zIndex: 201 }}>
            {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: menuOpen && i === 1 ? "transparent" : "#00ff9d", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none" }} />)}
          </button>
        )}
        {!mobile && <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #00ff9d44", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse-glow 3s ease infinite" }}>⚡</div>}
      </nav>

      {/* Mobile drawer */}
      {mobile && menuOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 199, background: "rgba(6,13,20,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,157,0.15)", padding: "12px 20px 20px", animation: "slideDown 0.25s ease" }}>
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", color: activeSection === item ? "#00ff9d" : "#94a3b8", fontFamily: "'JetBrains Mono',monospace", fontSize: 15, padding: "14px 8px", cursor: "pointer", letterSpacing: 1 }}>{item}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="Home" style={{ minHeight: "100vh", display: "flex", flexDirection: mobile ? "column" : "row", alignItems: "center", justifyContent: mobile ? "center" : "flex-start", padding: mobile ? "96px 20px 60px" : "80px 60px 0", position: "relative", gap: mobile ? 32 : 0 }}>
        {mobile ? (
          <div style={{ display: "flex", justifyContent: "center", width: "100%", zIndex: 1 }}>
            <OrbitSystem size={orbitSize} />
          </div>
        ) : (
          <div style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}>
            <OrbitSystem size={orbitSize} />
          </div>
        )}
        <div style={{ maxWidth: 600, animation: "fadeInUp 0.8s ease", zIndex: 2, textAlign: mobile ? "center" : "left" }}>
          <div style={{ color: "#00ff9d", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: 3, marginBottom: 14 }}>// FULL-STACK ENGINEER</div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(34px,6vw,76px)", fontWeight: 800, lineHeight: 1.05, margin: "0 0 14px", color: "#fff" }}>
            MD. <GlitchText text="Julfikar" style={{ color: "#00ff9d" }} /><br />Haidar
          </h1>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(13px,2vw,19px)", color: "#94a3b8", marginBottom: 24, minHeight: 28 }}>
            <TypeWriter texts={["Building scalable web apps.", "React + Next.js Expert.", "Microservice Architect.", "5+ Years of Experience.", "Full-Stack Craftsman."]} />
          </div>
          <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 14, maxWidth: 460, margin: mobile ? "0 auto 32px" : "0 0 32px" }}>
            Crafting production-grade applications that serve millions of users — from pixel-perfect frontends to robust backend APIs.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: mobile ? "center" : "flex-start" }}>
            <button onClick={() => scrollTo("Projects")} style={{ background: "#00ff9d", color: "#060d14", border: "none", padding: "13px 26px", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1, cursor: "pointer", borderRadius: 4, transition: "all 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>VIEW PROJECTS →</button>
            <button onClick={() => scrollTo("Contact")} style={{ background: "transparent", color: "#00ff9d", border: "1px solid #00ff9d44", padding: "13px 26px", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1, cursor: "pointer", borderRadius: 4, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,157,0.08)"; e.currentTarget.style.borderColor = "#00ff9d"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#00ff9d44"; }}>GET IN TOUCH</button>
          </div>
          <div style={{ display: "flex", gap: mobile ? 18 : 28, marginTop: 36, justifyContent: mobile ? "center" : "flex-start" }}>
            {([["5+", "Years"], ["3", "Companies"], ["10+", "Projects"], ["1M+", "Users"]] as [string, string][]).map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: mobile ? 22 : 28, fontWeight: 800, color: "#00ff9d" }}>{n}</div>
                <div style={{ fontSize: 9, color: "#64748b", letterSpacing: 2, textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", padding: "18px 0", borderTop: "1px solid rgba(0,255,157,0.08)", borderBottom: "1px solid rgba(0,255,157,0.08)", background: "rgba(0,255,157,0.02)" }}>
        <div style={{ display: "flex", gap: 48, animation: "marquee 20s linear infinite", width: "max-content" }}>
          {(["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "TanStack Query", "Zustand", "Docker", "Microservices", "Tailwind CSS", "Vue.js", "Express.js",
            "React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "TanStack Query", "Zustand", "Docker", "Microservices", "Tailwind CSS", "Vue.js", "Express.js"] as string[]).map((t, i) => (
              <span key={i} style={{ color: i % 4 === 0 ? "#00ff9d" : i % 4 === 1 ? "#38bdf8" : i % 4 === 2 ? "#a855f7" : "#64748b", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: 2, whiteSpace: "nowrap" }}>◆ {t}</span>
            ))}
        </div>
      </div>

      {/* SKILLS */}
      <section id="Skills" style={{ padding: sec, position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <div style={{ color: "#00ff9d", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: 4, marginBottom: 12 }}>02. EXPERTISE</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,52px)", fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>Technical <span style={{ color: "#00ff9d" }}>Arsenal</span></h2>
            <p style={{ color: "#475569", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>// 7 domains · 40+ technologies · 5+ years</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fit,minmax(300px,1fr))", gap: 14, marginBottom: 40 }}>
            {skillCategories.map(({ key, label, icon, color, border }) => (
              <div key={key}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${color}22`; (e.currentTarget as HTMLDivElement).style.borderColor = color + "66"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = border; }}
                style={{ background: `${color}05`, border: `1px solid ${border}`, borderRadius: 14, padding: "20px 22px", transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: color, opacity: 0.06, filter: "blur(20px)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "15", border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>{label}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: color, letterSpacing: 2 }}>{skills[key].length} SKILLS</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {(skills[key] as readonly string[]).map((s: string) => (
                    <span key={s} className="sc" style={{ padding: "4px 11px", border: `1px solid ${color}30`, borderRadius: 20, fontSize: 11, color: "#94a3b8", fontFamily: "'JetBrains Mono',monospace", background: "rgba(255,255,255,0.02)" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: mobile ? "24px 16px" : "36px 48px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#38bdf8", letterSpacing: 4, marginBottom: 28, textAlign: "center" }}>// PROFICIENCY INDEX</div>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? "4px" : "8px 48px" }}>
              {Object.entries(skillLevels).map(([name, level]) => <SkillBar key={name} name={name} level={level} />)}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="Experience" style={{ padding: sec, background: "rgba(255,255,255,0.01)", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ color: "#00ff9d", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: 4, marginBottom: 12 }}>03. JOURNEY</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,52px)", fontWeight: 800, color: "#fff", margin: 0 }}>Work <span style={{ color: "#00ff9d" }}>Experience</span></h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom,#00ff9d,#38bdf8,#a855f7)", opacity: 0.3 }} />
            {experiences.map((exp, i) => (
              <div key={i} className="card-h" style={{ marginBottom: 28, paddingLeft: mobile ? 46 : 58, position: "relative" }}>
                <div style={{ position: "absolute", left: 8, top: 22, width: 22, height: 22, borderRadius: "50%", background: exp.color, boxShadow: `0 0 18px ${exp.color}88`, zIndex: 1 }} />
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `3px solid ${exp.color}`, borderRadius: 10, padding: mobile ? "18px 14px" : "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                    <div>
                      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: mobile ? 16 : 20, fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>{exp.company}</h3>
                      <div style={{ color: "#64748b", fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>{exp.subtitle}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: exp.color, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: 1 }}>{exp.period}</div>
                      <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 3 }}>{exp.role}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12 }}>
                    {exp.projects.map(p => <span key={p} style={{ padding: "3px 10px", background: `${exp.color}15`, border: `1px solid ${exp.color}40`, borderRadius: 20, fontSize: 11, color: exp.color, fontFamily: "'JetBrains Mono',monospace" }}>📦 {p}</span>)}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fit,minmax(180px,1fr))", gap: 7 }}>
                    {exp.highlights.map(h => <div key={h} style={{ color: "#94a3b8", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", display: "flex", gap: 7, alignItems: "flex-start" }}><span style={{ color: exp.color, marginTop: 2 }}>▸</span>{h}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="Projects" style={{ padding: sec, position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ color: "#00ff9d", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: 4, marginBottom: 12 }}>04. PORTFOLIO</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,52px)", fontWeight: 800, color: "#fff", margin: 0 }}>Featured <span style={{ color: "#00ff9d" }}>Projects</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fit,minmax(450px,1fr))", gap: 18 }}>
            {projects.map(p => (
              <div key={p.name} className="card-h" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: mobile ? "20px 16px" : "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: `${p.color}15`, border: `1px solid ${p.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: mobile ? 16 : 19, color: "#fff" }}>{p.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: p.color, letterSpacing: 2 }}>{p.type}</div>
                  </div>
                </div>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.stack.map(s => <span key={s} style={{ padding: "3px 9px", background: `${p.color}10`, border: `1px solid ${p.color}30`, borderRadius: 4, fontSize: 11, color: p.color, fontFamily: "'JetBrains Mono',monospace" }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact" style={{ padding: sec, background: "rgba(255,255,255,0.01)", position: "relative" }}>
        <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: "#00ff9d", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: 4, marginBottom: 12 }}>05. LET&apos;S TALK</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(26px,4vw,52px)", fontWeight: 800, color: "#fff", margin: "0 0 14px" }}>Get In <span style={{ color: "#00ff9d" }}>Touch</span></h2>
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, marginBottom: 36 }}>I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2,1fr)", gap: 12, marginBottom: 32 }}>
            {([
              { icon: "✉️", label: "Email", val: "julfikar6262@gmail.com", link: "mailto:julfikar6262@gmail.com" },
              { icon: "📱", label: "Phone", val: "+8801766921701", link: "tel:+8801766921701" },
              { icon: "💼", label: "LinkedIn", val: "julfikarhaidar6262", link: "https://linkedin.com/in/julfikarhaidar6262" },
              { icon: "🐙", label: "GitHub", val: "Julfikar-Haidar", link: "https://github.com/Julfikar-Haidar" },
            ] as ContactItem[]).map(c => (
              <a key={c.label} href={c.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div className="card-h" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "16px", display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{c.icon}</span>
                  <div style={{ textAlign: "left", overflow: "hidden", minWidth: 0 }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#00ff9d", letterSpacing: 2, marginBottom: 2 }}>{c.label}</div>
                    <div style={{ color: "#94a3b8", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.val}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {([
              { label: "HIRE ME", href: "mailto:julfikar6262@gmail.com", primary: true },
              { label: "GITHUB", href: "https://github.com/Julfikar-Haidar", primary: false },
              { label: "DEV.TO", href: "https://dev.to/julfikarhaidar", primary: false },
            ] as NavButton[]).map(btn => (
              <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button style={{ background: btn.primary ? "#00ff9d" : "transparent", color: btn.primary ? "#060d14" : "#00ff9d", border: `1px solid ${btn.primary ? "#00ff9d" : "#00ff9d44"}`, padding: "13px 26px", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 2, cursor: "pointer", borderRadius: 4, transition: "all 0.2s" }}
                  onMouseEnter={e => { if (!btn.primary) { e.currentTarget.style.background = "rgba(0,255,157,0.08)"; e.currentTarget.style.borderColor = "#00ff9d"; } else e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = btn.primary ? "#00ff9d" : "transparent"; e.currentTarget.style.borderColor = btn.primary ? "#00ff9d" : "#00ff9d44"; e.currentTarget.style.transform = "scale(1)"; }}>{btn.label}</button>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,255,157,0.08)", padding: `18px ${px}`, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#2d3f52" }}>
          © 2025 MD. Julfikar Haidar &nbsp;·&nbsp; Dhaka, Bangladesh 🇧🇩
        </div>
      </footer>
    </div>
  );
}