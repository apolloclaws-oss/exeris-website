'use client'
import Link from 'next/link'

type ButtonProps = {
  href?: string
  onClick?: () => void
  variant?: 'green' | 'outline' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({ href, onClick, variant = 'green', size = 'md', children, className = '', type = 'button', disabled }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#080D1A]'
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  const variants = {
    green: 'bg-[#00E676] text-[#080D1A] hover:bg-[#00C853] focus:ring-[#00E676]',
    outline: 'border border-white/30 text-white hover:border-white/60 focus:ring-white',
    purple: 'bg-[#6C63FF] text-white hover:bg-[#5B53EE] focus:ring-[#6C63FF]',
  }
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button type={type} onClick={onClick} className={cls} disabled={disabled}>{children}</button>
}
