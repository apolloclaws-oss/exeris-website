const t = {
  nl: {
    tag: "Over ons",
    title: "Betrokken. Betrouwbaar. Bereikbaar.",
    body: "Exeris is een uitzendbureau met 40 jaar ervaring in de flexmarkt. We werken met een gekwalificeerd team dat begrijpt dat uitzenden mensenwerk is. Geen nummers, geen quotas — maar echte aandacht voor zowel werkgever als werknemer.",
    points: [
      "Internationaal netwerk van recruiters voor grote aantallen",
      "Dezelfde dag beschikbaar bij spoedaanvragen",
      "Persoonlijke begeleiding van elke medewerker",
      "Actief in logistiek, sierteelt, kassenwerk en verpakken",
    ],
  },
  en: {
    tag: "About us",
    title: "Committed. Reliable. Reachable.",
    body: "Exeris is a staffing agency with 40 years of experience in the flex market. We work with a qualified team that understands staffing is people work. No numbers, no quotas — real attention for both employer and employee.",
    points: [
      "International recruiter network for large volumes",
      "Same-day availability for urgent requests",
      "Personal guidance for every worker",
      "Active in logistics, floriculture, greenhouse work and packing",
    ],
  },
};

export default function About({ lang }: { lang: "nl" | "en" }) {
  const tx = t[lang];
  return (
    <section id="about" className="py-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#00e676] text-sm font-medium tracking-widest uppercase">{tx.tag}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-6 leading-tight">{tx.title}</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8">{tx.body}</p>
        </div>

        <div className="flex flex-col gap-4">
          {tx.points.map((p) => (
            <div key={p} className="flex items-start gap-3">
              <span className="text-[#00e676] text-xl mt-0.5">✓</span>
              <span className="text-white/70 leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
