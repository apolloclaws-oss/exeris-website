const stats = {
  nl: [
    { value: "86%", label: "Van onze mensen keert terug bij de klant" },
    { value: "4.8", label: "Beoordeling door onze medewerkers" },
    { value: "40", label: "Jaar ervaring in de flexmarkt" },
    { value: "1 dag", label: "Beschikbaarheid bij spoedaanvragen" },
  ],
  en: [
    { value: "86%", label: "Of our workers return to the same client" },
    { value: "4.8", label: "Rating by our workers" },
    { value: "40", label: "Years in the flex market" },
    { value: "1 day", label: "Availability for urgent requests" },
  ],
};

export default function Stats({ lang }: { lang: "nl" | "en" }) {
  return (
    <section className="py-20 border-t border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats[lang].map((s) => (
          <div key={s.value}>
            <div className="text-4xl md:text-5xl font-extrabold text-[#00e676] mb-2">{s.value}</div>
            <div className="text-white/50 text-sm leading-relaxed">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
