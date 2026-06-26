'use client'

import { useEffect, useRef } from 'react'

function TruckIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="2" y="14" width="22" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 20h10l2 4v4H24V20z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="10" cy="30" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M14 12L6 20l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 12l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 10l-4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M23 4L8 22h13l-4 14 21-22H25L23 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

interface CardData {
  id: string
  tag: string
  title: string
  body: string
  href: string
  cta: string
  icon: React.ReactNode
  featured: boolean
}

const CARDS: CardData[] = [
  {
    id: 'frota360',
    tag: 'SaaS · Gestão de frotas',
    title: 'Frota360',
    body: 'Sistema para transportadoras com 10 a 150 caminhões. Controle de documentos, compliance ANTT, portal do motorista e IA — tudo no idioma de quem opera frota de verdade.',
    href: '/frota360', // TODO: substituir por URL real quando rota /frota360 existir
    cta: 'Conhecer o Frota360',
    icon: <TruckIcon />,
    featured: false,
  },
  {
    id: 'dev',
    tag: 'Sob medida · IA',
    title: 'Software com IA para sua empresa',
    body: 'Automações, sistemas e interfaces feitas para o problema específico do seu negócio. Preço justo para PME, entrega rápida, processo claro do início ao fim.',
    href: '#contato',
    cta: 'Falar sobre seu projeto',
    icon: <CodeIcon />,
    featured: true,
  },
  {
    id: 'autoquote',
    tag: 'SaaS · Automação',
    title: 'AutoQuote',
    body: 'Coleta eventos de cotação em minutos. O que levava dois dias de trabalho manual, o AutoQuote faz antes do café.',
    href: '/autoquote', // TODO: substituir por URL real quando rota /autoquote existir
    cta: 'Saber mais',
    icon: <BoltIcon />,
    featured: false,
  },
]

export default function Vetores() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const cardRefs   = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    let mounted = true
    let ctx: { revert: () => void } | null = null

    const initAnimations = () => {
      const gsap = (window as any).__gsap
      ctx = gsap.context(() => {
        gsap.from(cardRefs.current.filter(Boolean), {
          opacity: 0,
          x: 60,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }, sectionRef)
    }

    const waitForGsap = () => {
      if (!mounted) return
      if ((window as any).__gsap && (window as any).__ScrollTrigger) {
        initAnimations()
      } else {
        setTimeout(waitForGsap, 50)
      }
    }

    waitForGsap()

    return () => {
      mounted = false
      ctx?.revert()
    }
  }, [])

  return (
    <section
      id="vetores"
      ref={sectionRef}
      style={{
        background: 'var(--surface-base)',
        padding: '96px 48px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <span
            style={{
              display: 'block',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: 12,
            }}
          >
            O que fazemos
          </span>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 40,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            Três formas de trabalhar.
            <br />
            <em style={{ fontStyle: 'normal', color: 'var(--brand-accent)' }}>
              Uma obsessão só.
            </em>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CARDS.map((card, i) => (
            <article
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el }}
              className={`vetores-card group ${card.id === 'autoquote' ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{
                background: 'var(--surface-elevated)',
                border: card.featured
                  ? '1px solid rgba(123,95,239,0.4)'
                  : '1px solid var(--border-subtle)',
                borderRadius: 20,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                ...(card.featured
                  ? { animation: 'glow-pulse 3s ease-in-out infinite' }
                  : {}),
              }}
            >
              {/* Icon */}
              <div style={{ color: 'var(--brand-accent)', marginBottom: 8 }}>
                {card.icon}
              </div>

              {/* Tag */}
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
              >
                {card.tag}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                }}
              >
                {card.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 15,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  flexGrow: 1,
                }}
              >
                {card.body}
              </p>

              {/* CTA link */}
              <a
                href={card.href}
                style={{
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'var(--brand-accent)',
                  textDecoration: 'none',
                }}
              >
                {card.cta}
                <span
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
