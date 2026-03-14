const t = {
  nl: {
    tag: "40 jaar ervaring in de flexmarkt",
    h1a: "Werk met",
    h1b: "respect",
    h1c: "voor mens en klant.",
    sub: "Geen loze beloftes. Geen mooie verhalen. Gewoon betrokken mensen die zorgen dat het klopt — voor werkgevers én werknemers.",
    cta1: "Ik zoek werk",
    cta2: "Ik zoek personeel",
  },
  en: {
    tag: "40 years in the flex market",
    h1a: "Work with",
    h1b: "respect",
    h1c: "for people and clients.",
    sub: "No empty promises. No pretty stories. Just committed people making sure it works — for employers and workers alike.",
    cta1: "Find a job",
    cta2: "Hire staff",
  },
};

export default function Hero({ lang }: { lang: "nl" | "en" }) {
  const tx = t[lang];
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00e676]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <span className="inline-block text-[#00e676] text-sm font-medium tracking-widest uppercase mb-6 border border-[#00e676]/30 rounded-full px-4 py-1">
          {tx.tag}
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          {tx.h1a}{" "}
          <span className="text-[#00e676]">{tx.h1b}</span>
          <br />
          {tx.h1c}
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {tx.sub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-[#00e676] text-[#0a0f1e] font-bold px-8 py-4 rounded-full hover:bg-[#00c853] transition text-lg"
          >
            {tx.cta1}
          </a>
          <a
            href="#contact"
            className="border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:border-white/60 transition text-lg"
          >
            {tx.cta2}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 text-sm">↓</div>
    </section>
  );
}
