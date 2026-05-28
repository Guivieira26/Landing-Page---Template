import { useState, useEffect, useRef } from "react";

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

const services = [
  { icon: "🦴", title: "Fisioterapia Ortopédica", desc: "Recuperação de lesões musculoesqueléticas, pós-cirurgias e tratamento de dores crônicas com técnicas avançadas.", color: "#0EA5E9" },
  { icon: "🧠", title: "Fisioterapia Neurológica", desc: "Reabilitação de pacientes com AVC, Parkinson, esclerose múltipla e outras condições neurológicas.", color: "#8B5CF6" },
  { icon: "🤸", title: "Pilates Clínico", desc: "Programa individualizado para fortalecimento, flexibilidade e correção postural com base científica.", color: "#10B981" },
  { icon: "💆", title: "RPG – Reeducação Postural", desc: "Técnica global que trata a causa das dores posturais, restaurando o alinhamento natural do corpo.", color: "#F59E0B" },
  { icon: "⚡", title: "Eletroterapia", desc: "Recursos eletrofísicos modernos: TENS, ultrassom terapêutico, laser e correntes bioestimuladoras.", color: "#EF4444" },
  { icon: "🏊", title: "Hidroterapia", desc: "Reabilitação na água aproveitando as propriedades físicas para maximizar a recuperação com menor impacto.", color: "#06B6D4" },
];

const testimonials = [
  { name: "Ana Souza", role: "Paciente – Pós-operatório de joelho", text: "Após minha cirurgia, achei que não voltaria a correr. O tratamento foi transformador. Hoje faço maratona!", stars: 5 },
  { name: "Carlos Mendes", role: "Paciente – Hérnia de disco", text: "Tentei de tudo por anos. Em 3 meses de tratamento, recuperei minha qualidade de vida sem cirurgia.", stars: 5 },
  { name: "Fernanda Lima", role: "Atleta profissional", text: "Como atleta, precisava de alguém que entendesse meu corpo e minha rotina. Resultado excelente.", stars: 5 },
];

const stats = [
  { label: "Pacientes Atendidos", value: 1200, suffix: "+" },
  { label: "Anos de Experiência", value: 10, suffix: "+" },
  { label: "Taxa de Satisfação", value: 98, suffix: "%" },
  { label: "Especialidades", value: 12, suffix: "" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(null);

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
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        .nav-link { cursor:pointer; transition:color 0.2s; }
        .nav-link:hover { color:#0EA5E9; }
        .service-card { transition:transform 0.3s, box-shadow 0.3s; cursor:pointer; }
        .service-card:hover { transform:translateY(-8px); box-shadow:0 20px 60px rgba(14,165,233,0.2); }
        .btn-primary { background:linear-gradient(135deg, #0EA5E9, #0284C7); color:white; border:none; padding:14px 32px; border-radius:50px; font-size:16px; font-weight:600; cursor:pointer; transition:all 0.3s; box-shadow:0 8px 30px rgba(14,165,233,0.4); font-family:'Outfit',sans-serif; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(14,165,233,0.5); }
        .btn-outline { background:transparent; color:#0EA5E9; border:2px solid #0EA5E9; padding:12px 30px; border-radius:50px; font-size:16px; font-weight:600; cursor:pointer; transition:all 0.3s; font-family:'Outfit',sans-serif; }
        .btn-outline:hover { background:#0EA5E9; color:white; }
        .star { color:#F59E0B; font-size:18px; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-thumb { background:#0EA5E9; border-radius:3px; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 1px 30px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.4s",
        padding: scrolled ? "12px 5%" : "20px 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#0EA5E9,#0284C7)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💚</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#0F172A" }}>Fisio<span style={{ color: "#0EA5E9" }}>Saúde</span></span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["início", "serviços", "sobre", "depoimentos", "contato"].map(s => (
            <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontWeight: 500, fontSize: 15, color: "#334155" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
          ))}
          <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }} onClick={() => scrollTo("contato")}>Agendar Consulta</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="início" ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 5% 80px", position: "relative", overflow: "hidden" }}>
        {/* BG blobs */}
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 600, height: 600, background: "linear-gradient(135deg,rgba(14,165,233,0.15),rgba(139,92,246,0.1))", borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%", animation: "blob 8s ease-in-out infinite", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: 500, height: 500, background: "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(14,165,233,0.08))", borderRadius: "40% 60% 70% 30%/40% 50% 60% 50%", animation: "blob 10s ease-in-out infinite reverse", zIndex: 0 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ animation: heroInView ? "fadeLeft 0.9s ease forwards" : "none", opacity: 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, background: "#0EA5E9", borderRadius: "50%", display: "inline-block", animation: "pulse-ring 1.5s ease infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0EA5E9" }}>Atendimento presencial e online</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 5vw, 64px)", lineHeight: 1.1, color: "#0F172A", marginBottom: 24 }}>
              Recupere seu{" "}
              <span style={{
                background: "linear-gradient(135deg, #0EA5E9, #8B5CF6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", fontStyle: "italic"
              }}>movimento,</span>
              <br />restaure sua <span style={{ color: "#10B981" }}>vida.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#475569", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Fisioterapia especializada com abordagem personalizada. Cada paciente é único — e seu tratamento também será.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("contato")}>Agende sua consulta grátis →</button>
              <button className="btn-outline" onClick={() => scrollTo("serviços")}>Conheça os serviços</button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
              {[["10+", "Anos de exp."], ["1.2K+", "Pacientes"], ["98%", "Satisfação"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#0EA5E9" }}>{n}</div>
                  <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ animation: heroInView ? "fadeRight 0.9s ease 0.2s forwards" : "none", opacity: 0, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div style={{ width: 420, height: 420, borderRadius: "50%", background: "linear-gradient(135deg, #E0F2FE, #DBEAFE)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", animation: "float 6s ease-in-out infinite" }}>
              {/* Placeholder for photo */}
              <div style={{ width: 380, height: 380, borderRadius: "50%", background: "linear-gradient(160deg, #BAE6FD, #93C5FD, #A5F3FC)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: 64 }}>
                <div style={{ fontSize: 80, marginBottom: 8 }}>👨‍⚕️</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0369A1", textAlign: "center", background: "rgba(255,255,255,0.7)", padding: "8px 20px", borderRadius: 20 }}>
                  Sua foto aqui
                </div>
              </div>
              {/* Floating cards */}
              {[
                { top: 20, right: -30, emoji: "⭐", text: "Top Fisio BH" },
                { bottom: 40, left: -50, emoji: "🏆", text: "Especialista Certificado" },
              ].map(({ top, right, bottom, left, emoji, text }) => (
                <div key={text} style={{
                  position: "absolute", top, right, bottom, left,
                  background: "white", borderRadius: 16, padding: "12px 18px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 8,
                  animation: "float 5s ease-in-out infinite", animationDelay: "1s",
                  whiteSpace: "nowrap"
                }}>
                  <span style={{ fontSize: 20 }}>{emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#94A3B8", letterSpacing: 2, textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #0EA5E9, transparent)" }} />
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ padding: "60px 5%", background: "linear-gradient(135deg, #0F172A, #1E293B)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
          {stats.map(({ label, value, suffix }) => (
            <StatCard key={label} label={label} value={value} suffix={suffix} inView={statsInView} />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="serviços" ref={servicesRef} style={{ padding: "100px 5%", background: "#F0F9FF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64, animation: servicesInView ? "fadeUp 0.8s ease forwards" : "none", opacity: 0 }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,0.1)", color: "#0EA5E9", padding: "6px 20px", borderRadius: 50, fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>ESPECIALIDADES</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, marginBottom: 16, color: "#0F172A" }}>Nossos Serviços</h2>
            <p style={{ fontSize: 17, color: "#64748B", maxWidth: 560, margin: "0 auto" }}>
              Tratamentos personalizados com as mais modernas técnicas da fisioterapia
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {services.map((s, i) => (
              <div key={s.title} className="service-card"
                style={{
                  background: "white", borderRadius: 20, padding: "32px 28px",
                  border: "1px solid rgba(14,165,233,0.12)",
                  animation: servicesInView ? `fadeUp 0.6s ease ${i * 0.1}s forwards` : "none", opacity: 0,
                  position: "relative", overflow: "hidden"
                }}
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `${s.color}15`, borderRadius: "0 0 0 80px" }} />
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, color: "#0F172A" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{
                  marginTop: 20, display: "flex", alignItems: "center", gap: 6,
                  color: s.color, fontWeight: 600, fontSize: 14,
                  opacity: activeService === i ? 1 : 0, transform: activeService === i ? "translateY(0)" : "translateY(8px)",
                  transition: "all 0.3s"
                }}>
                  Saiba mais <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre" ref={aboutRef} style={{ padding: "100px 5%", background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 300, height: 300, background: "rgba(14,165,233,0.07)", borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left: photo placeholder */}
          <div style={{ animation: aboutInView ? "fadeLeft 0.9s ease forwards" : "none", opacity: 0, position: "relative" }}>
            <div style={{ width: "100%", height: 500, borderRadius: 28, background: "linear-gradient(160deg, #1E3A5F, #0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 80, textAlign: "center" }}>
                <div>👨‍⚕️</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 12, fontWeight: 500 }}>Insira sua foto aqui</div>
              </div>
              <div style={{ position: "absolute", bottom: 28, left: 28, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: "16px 24px" }}>
                <div style={{ color: "white", fontWeight: 700, fontSize: 22 }}>CREFITO Nº 000000</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Fisioterapeuta Registrado</div>
              </div>
            </div>
            <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, border: "3px solid rgba(14,165,233,0.3)", borderRadius: "50%", animation: "spin-slow 20s linear infinite" }} />
          </div>
          {/* Right: text */}
          <div style={{ animation: aboutInView ? "fadeRight 0.9s ease 0.2s forwards" : "none", opacity: 0 }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,0.15)", color: "#38BDF8", padding: "6px 20px", borderRadius: 50, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>SOBRE MIM</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, color: "white", lineHeight: 1.2, marginBottom: 24 }}>
              Dedicado a{" "}
              <span style={{ color: "#38BDF8", fontStyle: "italic" }}>restaurar</span>{" "}
              o que mais importa
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              Com mais de 10 anos de experiência, me especializei em unir ciência e empatia para oferecer tratamentos que realmente transformam vidas. Cada sessão é planejada individualmente para as suas necessidades.
            </p>
            <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
              Formado pela UFMG com especializações em Terapia Manual, Pilates Clínico e Reabilitação Esportiva. Atualização contínua para trazer o que há de mais moderno na fisioterapia.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
              {["Terapia Manual Avançada", "Pilates Clínico", "Reabilitação Esportiva", "Análise Biomecânica"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, color: "white", fontSize: 14 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#0EA5E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>✓</div>
                  {item}
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => scrollTo("contato")}>Agende uma avaliação →</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="depoimentos" ref={testRef} style={{ padding: "100px 5%", background: "#F0F9FF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64, animation: testInView ? "fadeUp 0.8s ease forwards" : "none", opacity: 0 }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,0.1)", color: "#0EA5E9", padding: "6px 20px", borderRadius: 50, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DEPOIMENTOS</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, color: "#0F172A" }}>O que dizem nossos pacientes</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {testimonials.map((t, i) => (
              <div key={t.name} style={{
                background: "white", borderRadius: 24, padding: "36px 32px",
                boxShadow: "0 4px 30px rgba(14,165,233,0.08)",
                border: "1px solid rgba(14,165,233,0.1)",
                animation: testInView ? `fadeUp 0.6s ease ${i * 0.15}s forwards` : "none", opacity: 0
              }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {[...Array(t.stars)].map((_, j) => <span key={j} className="star">★</span>)}
                </div>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, fontStyle: "italic", marginBottom: 28 }}>"{t.text}"</p>
                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 20, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#0EA5E9,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 16 }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#94A3B8" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contato" style={{ padding: "100px 5%", background: "linear-gradient(135deg, #0F172A, #1E293B)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", background: "rgba(14,165,233,0.15)", color: "#38BDF8", padding: "6px 20px", borderRadius: 50, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>CONTATO</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, color: "white", marginBottom: 16 }}>Comece sua recuperação hoje</h2>
            <p style={{ fontSize: 17, color: "#94A3B8" }}>Primeira avaliação gratuita. Agende sem compromisso.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              { label: "Nome completo", placeholder: "Seu nome", type: "text" },
              { label: "Telefone / WhatsApp", placeholder: "(31) 9 0000-0000", type: "tel" },
              { label: "E-mail", placeholder: "seu@email.com", type: "email" },
              { label: "Serviço de interesse", placeholder: "Ex: Pilates Clínico", type: "text" },
            ].map(({ label, placeholder, type }) => (
              <div key={label}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#CBD5E1", marginBottom: 8 }}>{label}</label>
                <input type={type} placeholder={placeholder} style={{
                  width: "100%", padding: "14px 18px", borderRadius: 14,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "white", fontSize: 15, outline: "none", fontFamily: "'Outfit', sans-serif",
                  transition: "border 0.2s",
                }}
                  onFocus={e => e.target.style.border = "1px solid #0EA5E9"}
                  onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.12)"}
                />
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#CBD5E1", marginBottom: 8 }}>Mensagem (opcional)</label>
              <textarea rows={4} placeholder="Descreva brevemente sua queixa ou dúvida..." style={{
                width: "100%", padding: "14px 18px", borderRadius: 14,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                color: "white", fontSize: 15, outline: "none", fontFamily: "'Outfit', sans-serif",
                resize: "vertical", transition: "border 0.2s",
              }}
                onFocus={e => e.target.style.border = "1px solid #0EA5E9"}
                onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.12)"}
              />
            </div>
            <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              <button className="btn-primary" style={{ padding: "16px 60px", fontSize: 17 }}
                onClick={() => alert("Mensagem enviada! Entraremos em contato em breve.")}>
                Enviar e Agendar Consulta →
              </button>
              <p style={{ color: "#64748B", fontSize: 13, marginTop: 16 }}>
                Ou fale diretamente via WhatsApp: <span style={{ color: "#0EA5E9", fontWeight: 600, cursor: "pointer" }}>(31) 9 0000-0000</span>
              </p>
            </div>
          </div>

          {/* Info cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 60 }}>
            {[
              { icon: "📍", title: "Endereço", info: "Savassi, Belo Horizonte – MG" },
              { icon: "🕐", title: "Horários", info: "Seg–Sex: 7h–20h | Sáb: 8h–14h" },
              { icon: "📱", title: "WhatsApp", info: "(31) 9 0000-0000" },
            ].map(({ icon, title, info }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                <div style={{ color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>{title}</div>
                <div style={{ color: "white", fontWeight: 600, fontSize: 14 }}>{info}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#020617", padding: "30px 5%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: "linear-gradient(135deg,#0EA5E9,#0284C7)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💚</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "white" }}>Fisio<span style={{ color: "#0EA5E9" }}>Saúde</span></span>
        </div>
        <p style={{ color: "#475569", fontSize: 13 }}>© 2025 FisioSaúde · Todos os direitos reservados · CREFITO 000000</p>
        <div style={{ display: "flex", gap: 16 }}>
          {["Instagram", "WhatsApp", "Google"].map(s => (
            <span key={s} style={{ color: "#475569", fontSize: 13, cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#0EA5E9"}
              onMouseLeave={e => e.target.style.color = "#475569"}>{s}</span>
          ))}
        </div>
      </footer>

      {/* WhatsApp floating */}
      <a href="https://wa.me/5531900000000" target="_blank" rel="noreferrer"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 200,
          width: 60, height: 60, borderRadius: "50%",
          background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, boxShadow: "0 8px 30px rgba(37,211,102,0.5)",
          textDecoration: "none", transition: "transform 0.3s",
          animation: "float 3s ease-in-out infinite"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        💬
      </a>
    </div>
  );
}

function StatCard({ label, value, suffix, inView }) {
  const count = useCounter(value, 2000, inView);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontSize: 52, fontWeight: 800, lineHeight: 1,
        background: "linear-gradient(135deg, #0EA5E9, #38BDF8)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        marginBottom: 8
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 14, color: "#64748B", letterSpacing: 0.5 }}>{label}</div>
    </div>
  );
}


import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(<App />);
