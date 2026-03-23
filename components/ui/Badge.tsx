export function Badge({ children, color = 'green' }: { children: React.ReactNode, color?: 'green' | 'purple' | 'muted' }) {
  const colors = {
    green: 'border-[#00E676]/30 text-[#00E676]',
    purple: 'border-[#6C63FF]/30 text-[#6C63FF]',
    muted: 'border-white/20 text-white/60',
  }
  return (
    <span className={`inline-block text-xs font-medium tracking-widest uppercase border rounded-full px-4 py-1.5 ${colors[color]}`}>
      {children}
    </span>
  )
}
