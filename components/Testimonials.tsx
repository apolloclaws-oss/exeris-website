const testimonials = [
  {
    name: "Leroy Jackson",
    text: "I have worked for different agencies in the Netherlands, but Exeris really stood out in their care for a good working and living environment.",
    lang: "en",
  },
  {
    name: "Maria Dimitru",
    text: "Feeling at home and enjoy your work — that's what Exeris is working for. Especially Dilek is very good in matching skills with the right job. THANK YOU.",
    lang: "en",
  },
  {
    name: "Monika Dubrowska",
    text: "I have tried several agencies in the Netherlands to find me a good job. Exeris surely succeeded. They pay me in time and are available if I have any questions or problems.",
    lang: "en",
  },
];

const titles = {
  nl: { title: "Wat onze mensen zeggen", sub: "We zijn er trots op dat onze medewerkers graag bij ons werken." },
  en: { title: "What our people say", sub: "We are proud that our workers enjoy working with us." },
};

export default function Testimonials({ lang }: { lang: "nl" | "en" }) {
  const { title, sub } = titles[lang];
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h2>
          <p className="text-white/50 text-lg">{sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-white/70 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00e676]/20 flex items-center justify-center text-[#00e676] font-bold text-sm">
                  {t.name[0]}
                </div>
                <span className="font-semibold text-sm">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
