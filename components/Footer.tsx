const t = {
  nl: { rights: "Alle rechten voorbehouden." },
  en: { rights: "All rights reserved." },
};

export default function Footer({ lang }: { lang: "nl" | "en" }) {
  return (
    <footer className="py-10 border-t border-white/10 text-center text-white/30 text-sm">
      <div className="mb-2 text-white/60 font-bold text-lg">
        Exeris<span className="text-[#00e676]">.</span>
      </div>
      © {new Date().getFullYear()} Exeris. {t[lang].rights}
    </footer>
  );
}
