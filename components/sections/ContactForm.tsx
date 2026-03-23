'use client'
import { useState } from 'react'
import { useLang } from '@/lib/language-context'
import { Button } from '@/components/ui/Button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function ContactForm({ title, sub }: { title?: string, sub?: string }) {
  const { t } = useLang()
  const [form, setForm] = useState({ naam: '', email: '', type: 'werknemer', bericht: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ naam: '', email: '', type: 'werknemer', bericht: '', website: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputCls = 'w-full bg-[#0F1729] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E676]/50 transition-colors'

  return (
    <AnimatedSection>
      <div className="max-w-2xl mx-auto">
        {title && <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-bricolage)] mb-2 text-center">{title}</h2>}
        {sub && <p className="text-white/50 text-center mb-8">{sub}</p>}

        {status === 'success' ? (
          <div className="bg-[#00E676]/10 border border-[#00E676]/20 rounded-2xl p-8 text-center">
            <div className="text-2xl mb-2">✓</div>
            <p className="text-[#00E676] font-semibold">{t.contact.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/50 mb-2">{t.contact.naam} *</label>
                <input type="text" required className={inputCls} placeholder={t.contact.naam}
                  value={form.naam} onChange={e => setForm(f => ({ ...f, naam: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">{t.contact.email} *</label>
                <input type="email" required className={inputCls} placeholder={t.contact.email}
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">{t.contact.type} *</label>
              <div className="flex gap-3">
                {(['werknemer', 'opdrachtgever'] as const).map(type => (
                  <button key={type} type="button" onClick={() => setForm(f => ({ ...f, type }))}
                    className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                      form.type === type ? 'bg-[#00E676]/10 border-[#00E676]/40 text-[#00E676]' : 'border-white/10 text-white/50 hover:border-white/20'
                    }`}>
                    {type === 'werknemer' ? t.contact.typeWorker : t.contact.typeEmployer}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">{t.contact.bericht} *</label>
              <textarea required rows={5} className={inputCls} placeholder={t.contact.berichtPlaceholder}
                value={form.bericht} onChange={e => setForm(f => ({ ...f, bericht: e.target.value }))} />
            </div>
            {status === 'error' && (
              <p className="text-red-400 text-sm">{t.contact.error}</p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? t.contact.submitting : t.contact.submit}
            </Button>
          </form>
        )}
      </div>
    </AnimatedSection>
  )
}
