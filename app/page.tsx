"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const [lang, setLang] = useState<"nl" | "en">("nl");

  return (
    <main>
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Stats lang={lang} />
      <Services lang={lang} />
      <About lang={lang} />
      <Testimonials lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
      <Chatbot lang={lang} />
    </main>
  );
}
