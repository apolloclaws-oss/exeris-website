"use client";

const t = {
  nl: { jobs: "Vacatures", services: "Diensten", about: "Over ons", contact: "Contact", cta: "Ik zoek werk" },
  en: { jobs: "Jobs", services: "Services", about: "About", contact: "Contact", cta: "Find a job" },
};

export default function Navbar({ lang, setLang }: { lang: "nl" | "en"; setLang: (l: "nl" | "en") => void }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-white">Exeris</span>
          <span className="text-[#00e676]">.</span>
        </span>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#services" className="hover:text-white transition">{t[lang].services}</a>
          <a href="#about" className="hover:text-white transition">{t[lang].about}</a>
          <a href="#contact" className="hover:text-white transition">{t[lang].contact}</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "nl" ? "en" : "nl")}
            className="text-xs text-white/50 hover:text-white border border-white/20 rounded px-2 py-1 transition"
          >
            {lang === "nl" ? "EN" : "NL"}
          </button>
          <a
            href="#contact"
            className="bg-[#00e676] text-[#0a0f1e] font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#00c853] transition"
          >
            {t[lang].cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
