"use client";
import { useState, useRef, useEffect } from "react";

type Message = { from: "bot" | "user"; text: string };

const flows = {
  nl: {
    greeting: "Hoi! 👋 Ik ben de Exeris assistent. Zoek je werk, of heb je personeel nodig?",
    options1: ["Ik zoek werk 💼", "Ik zoek personeel 🏢"],
    seekerQ: "Wat voor werk zoek je? (bijv. logistiek, sierteelt, kassenwerk)",
    seekerFollowup: "Super! Laat je naam en e-mail achter dan nemen we vandaag nog contact op 📞",
    employerQ: "Hoeveel mensen heb je nodig, en wanneer?",
    employerFollowup: "Goed! Laat je naam en e-mail achter dan bellen we je dezelfde dag nog 🚀",
    nameQ: "Wat is je naam?",
    emailQ: "En je e-mailadres?",
    done: "Bedankt! We nemen zo snel mogelijk contact op. Tot snel! 🌟",
    placeholder: "Typ een bericht...",
    title: "Exeris Assistent",
    subtitle: "Meestal binnen 1 dag antwoord",
  },
  en: {
    greeting: "Hi! 👋 I'm the Exeris assistant. Are you looking for work, or do you need staff?",
    options1: ["I'm looking for work 💼", "I need staff 🏢"],
    seekerQ: "What kind of work are you looking for? (e.g. logistics, floriculture, greenhouse)",
    seekerFollowup: "Great! Leave your name and email and we'll contact you today 📞",
    employerQ: "How many people do you need, and when?",
    employerFollowup: "Nice! Leave your name and email and we'll call you the same day 🚀",
    nameQ: "What's your name?",
    emailQ: "And your email address?",
    done: "Thanks! We'll be in touch as soon as possible. See you soon! 🌟",
    placeholder: "Type a message...",
    title: "Exeris Assistant",
    subtitle: "Usually responds within 1 day",
  },
};

type Step = "start" | "seeker_q" | "employer_q" | "name" | "email" | "done";

export default function Chatbot({ lang }: { lang: "nl" | "en" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("start");
  const [userType, setUserType] = useState<"seeker" | "employer" | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tx = flows[lang];

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: "bot", text: tx.greeting }]);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBot = (text: string) => setMessages((m) => [...m, { from: "bot", text }]);
  const addUser = (text: string) => setMessages((m) => [...m, { from: "user", text }]);

  const handleOption = (opt: string) => {
    addUser(opt);
    if (opt.includes("work") || opt.includes("werk")) {
      setUserType("seeker");
      setStep("seeker_q");
      setTimeout(() => addBot(tx.seekerQ), 400);
    } else {
      setUserType("employer");
      setStep("employer_q");
      setTimeout(() => addBot(tx.employerQ), 400);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addUser(input);
    setInput("");

    if (step === "seeker_q" || step === "employer_q") {
      setStep("name");
      setTimeout(() => addBot(userType === "seeker" ? tx.seekerFollowup : tx.employerFollowup), 400);
      setTimeout(() => addBot(tx.nameQ), 900);
    } else if (step === "name") {
      setStep("email");
      setTimeout(() => addBot(tx.emailQ), 400);
    } else if (step === "email") {
      setStep("done");
      setTimeout(() => addBot(tx.done), 400);
    }
  };

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#00e676] rounded-full flex items-center justify-center shadow-lg hover:bg-[#00c853] transition text-2xl"
        aria-label="Open chat"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] bg-[#111827] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#0a0f1e] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00e676]/20 flex items-center justify-center text-[#00e676] font-bold">E</div>
            <div>
              <div className="font-semibold text-sm">{tx.title}</div>
              <div className="text-white/40 text-xs">{tx.subtitle}</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-h-80">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-[#00e676] text-[#0a0f1e] font-medium"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick options */}
            {step === "start" && messages.length > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                {tx.options1.map((o) => (
                  <button
                    key={o}
                    onClick={() => handleOption(o)}
                    className="text-left bg-white/5 border border-white/10 hover:border-[#00e676]/50 text-white text-sm px-4 py-2 rounded-xl transition"
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {step !== "start" && step !== "done" && (
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={tx.placeholder}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00e676]/40"
              />
              <button
                onClick={handleSend}
                className="bg-[#00e676] text-[#0a0f1e] rounded-xl px-4 py-2 text-sm font-bold hover:bg-[#00c853] transition"
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
