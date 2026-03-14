const services = {
  nl: {
    title: "Onze diensten",
    sub: "We zijn actief in vier sectoren waar we dagelijks het verschil maken.",
    items: [
      {
        icon: "🚛",
        title: "Logistiek",
        desc: "Heftruckbestuurders, orderpickers, operators en teamleiders voor warehouses en distributiecentra.",
      },
      {
        icon: "🌸",
        title: "Sierteelt",
        desc: "Gekwalificeerd personeel voor de bloemen- en plantenteelt. Seizoenswerk en vaste plaatsingen.",
      },
      {
        icon: "🌿",
        title: "Kassenwerk",
        desc: "Van oogsten tot sorteren — betrouwbare krachten voor de glastuinbouw.",
      },
      {
        icon: "📦",
        title: "Ompakken & Verpakken",
        desc: "Flexibele inzet voor productie- en verpakkingslijnen. Snel op te schalen bij piekdrukte.",
      },
    ],
  },
  en: {
    title: "Our services",
    sub: "We operate in four sectors where we make a real difference every day.",
    items: [
      {
        icon: "🚛",
        title: "Logistics",
        desc: "Forklift operators, order pickers, production operators and team leaders for warehouses and distribution centres.",
      },
      {
        icon: "🌸",
        title: "Floriculture",
        desc: "Qualified staff for flower and plant cultivation. Seasonal work and permanent placements.",
      },
      {
        icon: "🌿",
        title: "Greenhouse work",
        desc: "From harvesting to sorting — reliable workers for greenhouse horticulture.",
      },
      {
        icon: "📦",
        title: "Repacking & Packing",
        desc: "Flexible deployment for production and packing lines. Quickly scalable during peak demand.",
      },
    ],
  },
};

export default function Services({ lang }: { lang: "nl" | "en" }) {
  const tx = services[lang];
  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{tx.title}</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">{tx.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tx.items.map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#00e676]/40 hover:bg-white/8 transition group"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#00e676] transition">{item.title}</h3>
              <p className="text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
