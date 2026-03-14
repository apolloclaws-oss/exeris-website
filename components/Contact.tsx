"use client";
import { useState } from "react";

const t = {
  nl: {
    tag: "Contact",
    title: "Laten we kennismaken.",
    sub: "Op zoek naar werk of personeel? We reageren dezelfde dag.",
    namePh: "Jouw naam",
    emailPh: "E-mailadres",
    msgPh: "Waar kan ik je mee helpen?",
    btn: "Verstuur →",
    sending: "Versturen...",
    sent: "Bedankt! We nemen snel contact op.",
    error: "Er ging iets mis. Probeer het opnieuw.",
    typeLabel: "Ik ben:",
    seeker: "Werkzoekende",
    employer: "Werkgever",
  },
  en: {
    tag: "Contact",
    title: "Let's get acquainted.",
    sub: "Looking for work or staff? We respond the same day.",
    namePh: "Your name",
    emailPh: "Email address",
    msgPh: "How can I help you?",
    btn: "Send →",
    sending: "Sending...",
    sent: "Thanks! We'll be in touch soon.",
    error: "Something went wrong. Please try again.",
    typeLabel: "I am:",
    seeker: "Job seeker",
    employer: "Employer",
  },
};

export default function Contact({ lang }: { lang: "nl" | "en" }) {
  const tx = t[lang];
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState<"seeker" | "employer">("seeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, type, lang }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 bg-white/[0.02]">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#00e676] text-sm font-medium tracking-widest uppercase">{tx.tag}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">{tx.title}</h2>
          <p className="text-white/50 text-lg">{tx.sub}</p>
        </div>

        {sent ? (
          <div className="text-center text-[#00e676] text-xl font-semibold py-12">{tx.sent}</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Type toggle */}
            <div className="flex gap-2">
              <span className="text-white/50 text-sm self-center mr-2">{tx.typeLabel}</span>
              {(["seeker", "employer"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setType(v)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                    type === v
                      ? "bg-[#00e676] text-[#0a0f1e] border-[#00e676]"
                      : "border-white/20 text-white/60 hover:border-white/40"
                  }`}
                >
                  {tx[v]}
                </button>
              ))}
            </div>

            <input
              required
              type="text"
              placeholder={tx.namePh}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#00e676]/50 transition"
            />
            <input
              required
              type="email"
              placeholder={tx.emailPh}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#00e676]/50 transition"
            />
            <textarea
              required
              rows={5}
              placeholder={tx.msgPh}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#00e676]/50 transition resize-none"
            />
            {error && (
              <p className="text-red-400 text-sm text-center">{tx.error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00e676] text-[#0a0f1e] font-bold py-4 rounded-full hover:bg-[#00c853] transition text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? tx.sending : tx.btn}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
