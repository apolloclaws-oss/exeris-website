import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { Stats } from '@/components/sections/Stats'
import { Sectors } from '@/components/sections/Sectors'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { SplitCTA } from '@/components/sections/SplitCTA'
import { ContactForm } from '@/components/sections/ContactForm'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Stats />
      <Sectors />
      <HowItWorks />
      <Testimonials />
      <SplitCTA />
      <section className="py-20 bg-[#0A1020]">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
