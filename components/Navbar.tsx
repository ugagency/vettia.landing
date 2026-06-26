'use client'

import { useState, useEffect, useRef } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = async () => {
      const { default: gsap } = await import('gsap')
      // Fade simples — sem y negativo que cria impressão de "logo aparecendo de novo"
      gsap.to(navRef.current, { opacity: 1, duration: 0.4, delay: 0.2, ease: 'power2.out' })
    }
    document.addEventListener('vettia:intro-done', handler)
    return () => document.removeEventListener('vettia:intro-done', handler)
  }, [])

  const linkStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    color: 'var(--text-primary)',
    textDecoration: 'none',
    transition: 'color 150ms',
  }

  return (
    <header
      ref={navRef}
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        opacity: 0,
        background: scrolled ? 'rgba(250,250,248,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'background 300ms, border-color 300ms, backdrop-filter 300ms',
        padding: '0 48px',
      }}
    >
      <nav
        aria-label="Navegação principal"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a href="/" aria-label="Vettia — página inicial" style={{ display: 'flex', alignItems: 'center' }}>
          {/* TODO: substituir pelo next/image quando SVG otimizado estiver disponível */}
          <img
            src="/assets/brand/logo-vettia-color.svg"
            alt="Vettia"
            width={80}
            height={24}
            style={{ display: 'block' }}
          />
        </a>

        {/* Links desktop */}
        <ul
          className="hidden md:flex"
          style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center' }}
        >
          <li>
            <a href="#vetores" style={linkStyle} className="hover:!text-[var(--brand-accent)]">
              Produtos
            </a>
          </li>
          <li>
            <a href="#contato" style={linkStyle} className="hover:!text-[var(--brand-accent)]">
              Contato
            </a>
          </li>
          <li>
            <a
              href="#contato"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--brand-accent)',
                color: 'var(--text-on-accent)',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                borderRadius: 9999,
                padding: '8px 20px',
                textDecoration: 'none',
                transition: 'background 200ms, transform 200ms',
              }}
              className="hover:!bg-[var(--brand-accent-dim)] hover:scale-[1.02]"
            >
              Falar com a Vettia
            </a>
          </li>
        </ul>

        {/* Hamburger mobile */}
        <button
          aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex md:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: 'var(--text-primary)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <>
                <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M4 6h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-nav-menu"
        role="navigation"
        aria-label="Menu mobile"
        aria-hidden={!menuOpen}
        style={{
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          gap: 16,
          padding: '16px 0 24px',
          background: 'rgba(250,250,248,0.97)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <a href="#vetores" onClick={() => setMenuOpen(false)} style={linkStyle}>
          Produtos
        </a>
        <a href="#contato" onClick={() => setMenuOpen(false)} style={linkStyle}>
          Contato
        </a>
      </div>
    </header>
  )
}
