import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
};

const useCounter = (target, duration = 2000, inView) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

const services = [
  {
    icon: "🫁",
    title: "Fisioterapia Respiratória (Atendimento CTI)",
    desc: "Atuação especializada no cuidado de pacientes críticos, com foco na prevenção de complicações, recuperação funcional, reabilitação respiratória e motora, contribuindo para uma evolução clínica mais segura.",
    color: "#0EA5E9"
  },
  {
    icon: "🦴",
    title: "Fisioterapia Ortopédica e Desportiva",
    desc: "Atuação na prevenção de lesões, recuperação funcional e aprimoramento do desempenho físico, auxiliando atletas e praticantes de atividades esportivas a retornarem às suas atividades com segurança.",
    color: "#8B5CF6"
  },
  {
    icon: "🧠",
    title: "Fisioterapia Neurológica",
    desc: "Tratamento especializado para recuperar a funcionalidade e independência de pacientes com sequelas de AVC, Parkinson, esclerose e outras condições neuromotoras.",
    color: "#10B981"
  },
  {
    icon: "👵",
    title: "Fisioterapia na Saúde do Idoso",
    desc: "Envelhecer com qualidade é manter a capacidade de viver com autonomia. A fisioterapia atua no cuidado integral do idoso, promovendo movimento, segurança e qualidade de vida em todas as fases do envelhecimento.",
    color: "#F59E0B"
  },
  {
    icon: "☯️",
    title: "Acupuntura",
    desc: "Aplicação de técnicas tradicionais para modulação da dor, controle de processos inflamatórios, redução do estresse e equilíbrio sistêmico do organismo.",
    color: "#EF4444"
  },
  {
    icon: "💼",
    title: "Fisioterapia do Trabalho e Ergonomia",
    desc: "Avaliação e intervenção voltadas à saúde ocupacional, prevenção de lesões relacionadas ao trabalho, adequação ergonômica e promoção de ambientes mais seguros e saudáveis.",
    color: "#06B6D4"
  },
];

const testimonials = [
  { name: "Alexandre", role: "Fisioterapia Neurológica", text: "Me respeitou como pessoa e mesmo com dois meses de internamento, me ajudou muito a fazer com que a depressão ficasse longe. Obrigado pelo apoio, pois sabemos que não é fácil com tanta gente pra ser ajudada e ainda manter um atendimento personalizado, um cuidado efetivo. Obrigado meu amigo, que Deus te abençoe e te guarde, sempre.", stars: 5 },
  { name: "Kauanny", role: "Atendimento CTI", text: "Eu lhe agradeço muito, dia 22/07 fez um ano da minha alta e do dia em que consegui caminhar com sua ajuda... Deus te abençoe grandiosamente seu trabalho e sua humanidade fazem a diferença na vida de muitas pessoas grande abraço fisio, serei eternamente grata! 🙏🏼", stars: 5 },
  { name: "Carlos", role: "Paciente - COVID-19", text: "Cara só tenho a agradecer se não fosse sua atenção, cuidado e dedicação talvez eu nem estaria aqui hoje. Que Deus abençõe imensamente e que você continue prestando esse serviço maravilhoso como fisio, muito obrigado! ", stars: 5 },
];

const stats = [
  { label: "Pacientes Atendidos", value: 5700, suffix: "+" },
  { label: "Anos de Experiência", value: 23, suffix: "+" },
  { label: "Taxa de Satisfação", value: 100, suffix: "%" },
  { label: "Especialidades", value: 12, suffix: "" },
];

// Carousel component
function Carousel({ items, renderItem }) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(null);
  const prev = () => setIndex(i => (i - 1 + items.length) % items.length);
  const next = () => setIndex(i => (i + 1) % items.length);

  const endDrag = (clientX) => {
    if (startXRef.current == null) return;
    const deltaX = clientX - startXRef.current;
    const swipeThreshold = 40;

    if (Math.abs(deltaX) >= swipeThreshold) {
      if (deltaX < 0) {
        next();
      } else {
        prev();
      }
    }

    startXRef.current = null;
    setIsDragging(false);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{ overflow: "hidden", borderRadius: 20, touchAction: "pan-y", cursor: isDragging ? "grabbing" : "grab" }}
        onPointerDown={(event) => {
          startXRef.current = event.clientX;
          setIsDragging(true);
        }}
        onPointerUp={(event) => endDrag(event.clientX)}
        onPointerCancel={() => {
          startXRef.current = null;
          setIsDragging(false);
        }}
        onPointerLeave={() => {
          if (isDragging) {
            startXRef.current = null;
            setIsDragging(false);
          }
        }}
      >
        {renderItem(items[index], index)}
      </div>
      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} style={{
            width: i === index ? 24 : 8, height: 8, borderRadius: 4,
            background: i === index ? "#0EA5E9" : "rgba(14,165,233,0.3)",
            border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0
          }} />
        ))}
      </div>
      {/* Arrows */}
      <button onClick={prev} style={{
        position: "absolute", top: "40%", left: -16, transform: "translateY(-50%)",
        width: 36, height: 36, borderRadius: "50%", background: "white",
        border: "1px solid rgba(14,165,233,0.2)", cursor: "pointer", fontSize: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center"
      }}>‹</button>
      <button onClick={next} style={{
        position: "absolute", top: "40%", right: -16, transform: "translateY(-50%)",
        width: 36, height: 36, borderRadius: "50%", background: "white",
        border: "1px solid rgba(14,165,233,0.2)", cursor: "pointer", fontSize: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center"
      }}>›</button>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  const [statsRef, statsInView] = useInView();
  const [heroRef, heroInView] = useInView(0.05);
  const [servicesRef, servicesInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [testRef, testInView] = useInView();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#F0F9FF", color: "#0F172A", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet" />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeRight { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        .nav-link { cursor:pointer; transition:color 0.2s; }
        .nav-link:hover { color:#0EA5E9; }
        .service-card { transition:transform 0.3s, box-shadow 0.3s; cursor:pointer; }
        .service-card:hover { transform:translateY(-6px); box-shadow:0 20px 60px rgba(14,165,233,0.2); }
        .btn-primary { background:linear-gradient(135deg, #0EA5E9, #0284C7); color:white; border:none; padding:14px 32px; border-radius:50px; font-size:16px; font-weight:600; cursor:pointer; transition:all 0.3s; box-shadow:0 8px 30px rgba(14,165,233,0.4); font-family:'Outfit',sans-serif; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(14,165,233,0.5); }
        .btn-outline { background:transparent; color:#0EA5E9; border:2px solid #0EA5E9; padding:12px 30px; border-radius:50px; font-size:16px; font-weight:600; cursor:pointer; transition:all 0.3s; font-family:'Outfit',sans-serif; }
        .btn-outline:hover { background:#0EA5E9; color:white; }
        .star { color:#F59E0B; font-size:18px; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-thumb { background:#0EA5E9; border-radius:3px; }
        .mobile-menu { animation: slideDown 0.25s ease forwards; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 1px 30px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.4s",
      }}>
        <div style={{ padding: scrolled ? "12px 5%" : "18px 5%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#0EA5E9,#0284C7)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💚</div>
            <span style={{ fontWeight: 800, fontSize: 18, color: "#0F172A" }}>Fisio<span style={{ color: "#0EA5E9" }}>Saúde</span></span>
          </div>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              {["início", "serviços", "sobre", "depoimentos", "contato"].map(s => (
                <span key={s} className="nav-link" onClick={() => scrollTo(s)}
                  style={{ textTransform: "capitalize", fontWeight: 500, fontSize: 14, color: "#334155" }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </span>
              ))}
              <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }} onClick={() => scrollTo("contato")}>Agendar Consulta</button>
            </div>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 26, color: "#0F172A", padding: 4 }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>

        {/* Mobile dropdown */}
        {isMobile && menuOpen && (
          <div className="mobile-menu" style={{ background: "white", borderTop: "1px solid #E2E8F0", padding: "16px 5% 24px" }}>
            {["início", "serviços", "sobre", "depoimentos", "contato"].map(s => (
              <div key={s} onClick={() => scrollTo(s)} style={{
                padding: "14px 0", borderBottom: "1px solid #F1F5F9",
                fontWeight: 500, fontSize: 16, color: "#334155", cursor: "pointer"
              }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </div>
            ))}
            <button className="btn-primary" style={{ width: "100%", marginTop: 16, padding: "14px" }} onClick={() => scrollTo("contato")}>
              Agendar Consulta
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="início" ref={heroRef} style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: isMobile ? "110px 5% 60px" : "120px 5% 80px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: isMobile ? 300 : 600, height: isMobile ? 300 : 600, background: "linear-gradient(135deg,rgba(14,165,233,0.15),rgba(139,92,246,0.1))", borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%", animation: "blob 8s ease-in-out infinite", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: isMobile ? 250 : 500, height: isMobile ? 250 : 500, background: "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(14,165,233,0.08))", borderRadius: "40% 60% 70% 30%/40% 50% 60% 50%", animation: "blob 10s ease-in-out infinite reverse", zIndex: 0 }} />

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 60,
          alignItems: "center", width: "100%", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1
        }}>
          {/* Text */}
          <div style={{ animation: heroInView ? "fadeLeft 0.9s ease forwards" : "none", opacity: 0, textAlign: isMobile ? "center" : "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 50, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ width: 8, height: 8, background: "#0EA5E9", borderRadius: "50%", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#0EA5E9" }}>Atendimento presencial</span>
            </div>
            {/* o caminho para recuperar sua autonomia começa pelo movimento */}
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "clamp(34px,9vw,48px)" : "clamp(42px,5vw,64px)", lineHeight: 1.15, color: "#0F172A", marginBottom: 20 }}>
              O caminho para{" "}
              <span style={{ background: "linear-gradient(135deg, #0EA5E9, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic" }}>recuperar sua autonomia,</span>
              <br />começa pelo <span style={{ color: "#10B981" }}>movimento.</span>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 18, color: "#475569", lineHeight: 1.7, marginBottom: 32, maxWidth: 480, margin: isMobile ? "0 auto 28px" : "0 0 32px" }}>
              A Fisioterapia vai ate você, com cuidado especializado para recuperar movimentos, autonomia e qualidade de vida 
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
              <button className="btn-primary" style={{ fontSize: isMobile ? 14 : 16 }} onClick={() => scrollTo("contato")}>Agende sua consulta grátis →</button>
              <button className="btn-outline" style={{ fontSize: isMobile ? 14 : 16 }} onClick={() => scrollTo("serviços")}>Conheça os serviços</button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 40, justifyContent: isMobile ? "center" : "flex-start" }}>
              {[["23+", "Anos de exp."], ["5.7K+", "Pacientes"], ["100%", "Satisfação"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: "#0EA5E9" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo circle */}
          <div style={{ animation: heroInView ? "fadeRight 0.9s ease 0.2s forwards" : "none", opacity: 0, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div style={{ width: isMobile ? 280 : 420, height: isMobile ? 280 : 420, borderRadius: "50%", background: "linear-gradient(135deg, #E0F2FE, #DBEAFE)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", animation: "float 6s ease-in-out infinite" }}>
              <div style={{ width: isMobile ? 248 : 380, height: isMobile ? 248 : 380, borderRadius: "50%", background: "linear-gradient(160deg, #BAE6FD, #93C5FD, #A5F3FC)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: isMobile ? 56 : 80, marginBottom: 8 }}>👨‍⚕️</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#0369A1", textAlign: "center", background: "rgba(255,255,255,0.7)", padding: "6px 16px", borderRadius: 20 }}>Sua foto aqui</div>
              </div>
              {!isMobile && [
                { top: 20, right: -30, emoji: "⭐", text: "Top Fisio BH" },
                { bottom: 40, left: -50, emoji: "🏆", text: "Especialista Certificado" },
              ].map(({ top, right, bottom, left, emoji, text }) => (
                <div key={text} style={{ position: "absolute", top, right, bottom, left, background: "white", borderRadius: 16, padding: "10px 16px", boxShadow: "0 8px 30px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: 18 }}>{emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{ padding: "60px 5%", background: "linear-gradient(135deg, #0F172A, #1E293B)" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: isMobile ? 32 : 40
        }}>
          {stats.map(({ label, value, suffix }) => (
            <StatCard key={label} label={label} value={value} suffix={suffix} inView={statsInView} isMobile={isMobile} />
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="serviços" ref={servicesRef} style={{ padding: "80px 5%", background: "#F0F9FF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48, animation: servicesInView ? "fadeUp 0.8s ease forwards" : "none", opacity: 0 }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,0.1)", color: "#0EA5E9", padding: "6px 20px", borderRadius: 50, fontSize: 13, fontWeight: 700, marginBottom: 14 }}>ESPECIALIDADES</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 32 : 44, marginBottom: 12, color: "#0F172A" }}>Nossos Serviços</h2>
            <p style={{ fontSize: 15, color: "#64748B", maxWidth: 480, margin: "0 auto" }}>Tratamentos personalizados com as mais modernas técnicas da fisioterapia</p>
          </div>

          {isMobile ? (
            <Carousel items={services} renderItem={(s) => (
              <div className="service-card" style={{ background: "white", borderRadius: 20, padding: "32px 28px", border: "1px solid rgba(14,165,233,0.12)", position: "relative", overflow: "hidden", minHeight: 220 }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `${s.color}15`, borderRadius: "0 0 0 80px" }} />
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, color: "#0F172A" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            )} />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {services.map((s, i) => (
                <div key={s.title} className="service-card" style={{ background: "white", borderRadius: 20, padding: "32px 28px", border: "1px solid rgba(14,165,233,0.12)", animation: servicesInView ? `fadeUp 0.6s ease ${i * 0.1}s forwards` : "none", opacity: 0, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `${s.color}15`, borderRadius: "0 0 0 80px" }} />
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, color: "#0F172A" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="sobre" ref={aboutRef} style={{ padding: "80px 5%", background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 300, height: 300, background: "rgba(14,165,233,0.07)", borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 80,
          alignItems: "center"
        }}>
          {/* Text first on mobile */}
          <div style={{ animation: aboutInView ? (isMobile ? "fadeUp 0.9s ease forwards" : "fadeRight 0.9s ease 0.2s forwards") : "none", opacity: 0, order: isMobile ? 1 : 2 }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,0.15)", color: "#38BDF8", padding: "6px 20px", borderRadius: 50, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>SOBRE MIM</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 30 : 42, color: "white", lineHeight: 1.2, marginBottom: 20 }}>
              Olhar {" "}
              <span style={{ color: "#38BDF8", fontStyle: "italic" }}>empático e dedicação</span>{" "}
              a quem confia na sua recuperação.
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Com 23 anos de dedicação à Fisioterapia, desenvolvo um trabalho voltado à recuperação funcional, prevenção de limitações e promoção da qualidade de vida. Minha trajetória profissional é marcada pela busca constante de conhecimento e pela integração de diferentes áreas da saúde, permitindo um olhar amplo e individualizado sobre cada paciente.<br />

              Atuo com uma abordagem baseada em avaliação criteriosa, planejamento terapêutico e cuidado humanizado, respeitando as particularidades e objetivos de cada pessoa.<br />

              Minha missão é transformar conhecimento e experiência em resultados, ajudando pacientes a recuperar movimentos, autonomia e confiança para viver melhor.

            </p>
            <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
              Formado pela Universidade Positivo (Curitiba/PR). <br />
              Pós-Graduação / Especialização:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
              {/* Acupuntura, Terapia Itensiva, Fisioterapia Desportiva, Fusuiterapua do trabalho e ergonomia e gestão hospitalar e serviços de saúde. */}
              {["Acupuntura", "Fisioterapia em Terapia Intensiva", "Fisioterapia Desportiva", "Fisioterapia do Trabalho e Ergonomia", "Gestão Hospitalar e Serviços de Saúde"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, color: "white", fontSize: 13 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#0EA5E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>✓</div>
                  {item}
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => scrollTo("contato")}>Agende uma avaliação →</button>
          </div>

          {/* Photo below text on mobile */}
          <div style={{ animation: aboutInView ? (isMobile ? "fadeUp 0.9s ease 0.2s forwards" : "fadeLeft 0.9s ease forwards") : "none", opacity: 0, position: "relative", order: isMobile ? 2 : 1 }}>
            <div style={{ width: "100%", height: isMobile ? 340 : 500, borderRadius: 28, background: "linear-gradient(160deg, #1E3A5F, #0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: isMobile ? 60 : 80 }}>👨‍⚕️</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 12, fontWeight: 500 }}>Insira sua foto aqui</div>
              </div>
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: "14px 20px" }}>
                <div style={{ color: "white", fontWeight: 700, fontSize: isMobile ? 16 : 20 }}>CREFITO Nº 54341-F</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Fisioterapeuta Registrado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="depoimentos" ref={testRef} style={{ padding: "80px 5%", background: "#F0F9FF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48, animation: testInView ? "fadeUp 0.8s ease forwards" : "none", opacity: 0 }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,0.1)", color: "#0EA5E9", padding: "6px 20px", borderRadius: 50, fontSize: 13, fontWeight: 700, marginBottom: 14 }}>DEPOIMENTOS</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 30 : 44, color: "#0F172A" }}>O que dizem nossos pacientes</h2>
          </div>

          {isMobile ? (
            <Carousel items={testimonials} renderItem={(t) => (
              <div style={{ background: "white", borderRadius: 24, padding: "32px 28px", boxShadow: "0 4px 30px rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.1)" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(t.stars)].map((_, j) => <span key={j} className="star">★</span>)}
                </div>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, fontStyle: "italic", marginBottom: 24 }}>"{t.text}"</p>
                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 18, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#0EA5E9,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#94A3B8" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            )} />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
              {testimonials.map((t, i) => (
                <div key={t.name} style={{ background: "white", borderRadius: 24, padding: "36px 32px", boxShadow: "0 4px 30px rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.1)", animation: testInView ? `fadeUp 0.6s ease ${i * 0.15}s forwards` : "none", opacity: 0 }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                    {[...Array(t.stars)].map((_, j) => <span key={j} className="star">★</span>)}
                  </div>
                  <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, fontStyle: "italic", marginBottom: 28 }}>"{t.text}"</p>
                  <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 20, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#0EA5E9,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 16 }}>{t.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#94A3B8" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contato" style={{ padding: "80px 5%", background: "linear-gradient(135deg, #0F172A, #1E293B)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,0.15)", color: "#38BDF8", padding: "6px 20px", borderRadius: 50, fontSize: 13, fontWeight: 700, marginBottom: 14 }}>CONTATO</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 30 : 44, color: "white", marginBottom: 12 }}>Comece sua recuperação hoje</h2>
            {/* <p style={{ fontSize: 15, color: "#94A3B8" }}>Primeira avaliação gratuita. Agende sem compromisso.</p> */}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
            {[
              { label: "Nome completo", placeholder: "Seu nome", type: "text" },
              { label: "Telefone / WhatsApp", placeholder: "(31) 9 0000-0000", type: "tel" },
              { label: "E-mail", placeholder: "seu@email.com", type: "email" },
              { label: "Serviço de interesse", placeholder: "Ex: Pilates Clínico", type: "text" },
            ].map(({ label, placeholder, type }) => (
              <div key={label}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#CBD5E1", marginBottom: 8 }}>{label}</label>
                <input type={type} placeholder={placeholder} style={{ width: "100%", padding: "14px 18px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: 15, outline: "none", fontFamily: "'Outfit', sans-serif" }}
                  onFocus={e => e.target.style.border = "1px solid #0EA5E9"}
                  onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.12)"}
                />
              </div>
            ))}
            <div style={{ gridColumn: isMobile ? "1" : "1 / -1" }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#CBD5E1", marginBottom: 8 }}>Mensagem (opcional)</label>
              <textarea rows={4} placeholder="Descreva brevemente sua queixa ou dúvida..." style={{ width: "100%", padding: "14px 18px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: 15, outline: "none", fontFamily: "'Outfit', sans-serif", resize: "vertical" }}
                onFocus={e => e.target.style.border = "1px solid #0EA5E9"}
                onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.12)"}
              />
            </div>
            <div style={{ gridColumn: isMobile ? "1" : "1 / -1", textAlign: "center" }}>
              <button className="btn-primary" style={{ padding: "16px 48px", fontSize: 16, width: isMobile ? "100%" : "auto" }}
                onClick={() => alert("Mensagem enviada! Entraremos em contato em breve.")}>
                Enviar e Agendar Consulta →
              </button>
              <p style={{ color: "#64748B", fontSize: 13, marginTop: 14 }}>
                Ou fale via WhatsApp: <span style={{ color: "#0EA5E9", fontWeight: 600, cursor: "pointer" }}>(31) 9 9133-7130</span>
              </p>
            </div>
          </div>

          {/* Info cards — vertical on mobile */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 16, marginTop: 48
          }}>
            {[
              { icon: "📍", title: "Endereço", info: "Belo Horizonte – MG" },
              { icon: "🕐", title: "Horários", info: "Seg–Sex: 7h–18h" },
              { icon: "📱", title: "WhatsApp", info: "(31) 9 9133-7130" },
            ].map(({ icon, title, info }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: isMobile ? "18px 24px" : "24px", textAlign: isMobile ? "left" : "center", display: "flex", alignItems: "center", gap: isMobile ? 16 : 0, flexDirection: isMobile ? "row" : "column" }}>
                <div style={{ fontSize: 28, marginBottom: isMobile ? 0 : 10, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ color: "#94A3B8", fontSize: 12, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: "white", fontWeight: 600, fontSize: 14 }}>{info}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#020617", padding: "24px 5%" }}>
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#0EA5E9,#0284C7)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>💚</div>
              <span style={{ fontWeight: 700, fontSize: 16, color: "white" }}>Fisio<span style={{ color: "#0EA5E9" }}>Saúde</span></span>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              {["Instagram", "WhatsApp", "Google"].map(s => (
                <span key={s} style={{ color: "#475569", fontSize: 13, cursor: "pointer" }}>{s}</span>
              ))}
            </div>
            <p style={{ color: "#475569", fontSize: 12, textAlign: "center" }}>© 2025 FisioSaúde · Todos os direitos reservados · CREFITO 000000</p>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, background: "linear-gradient(135deg,#0EA5E9,#0284C7)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💚</div>
                <span style={{ fontWeight: 700, fontSize: 16, color: "white" }}>Fisio<span style={{ color: "#0EA5E9" }}>Saúde</span></span>
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                {["Instagram", "WhatsApp", "Google"].map(s => (
                  <span key={s} style={{ color: "#475569", fontSize: 13, cursor: "pointer" }}>{s}</span>
                ))}
              </div>
            </div>
            <p style={{ color: "#475569", fontSize: 13, textAlign: "center" }}>© 2025 FisioSaúde · Todos os direitos reservados · CREFITO 000000</p>
          </>
        )}
      </footer>

      {/* WhatsApp float */}
      <a href="https://wa.me/5531991337130" target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 8px 30px rgba(37,211,102,0.5)", textDecoration: "none", animation: "float 3s ease-in-out infinite" }}>
        💬
      </a>
    </div>
  );
}

function StatCard({ label, value, suffix, inView, isMobile }) {
  const count = useCounter(value, 2000, inView);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: isMobile ? 36 : 52, fontWeight: 800, lineHeight: 1, background: "linear-gradient(135deg, #0EA5E9, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 8 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: isMobile ? 12 : 14, color: "#64748B" }}>{label}</div>
    </div>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element "#root" was not found.');
}

ReactDOM.createRoot(rootElement).render(
  <App />
);
