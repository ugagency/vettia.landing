'use client'

import { useEffect, useRef } from 'react'
import { trackProductClick } from '@/lib/gtag'

/* Preview do Frota360 — crop da mesma imagem do hero, focado na faixa de
   cards de KPI do dashboard (sem o mockup de laptop). */
function Frota360Preview() {
  return (
    <div
      role="img"
      aria-label="Painel de KPIs do dashboard Frota360"
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: "url('/assets/brand/frota360-dashboard.png')",
        backgroundSize: '200%',
        backgroundPosition: '60% 14%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#FFFFFF',
      }}
    />
  )
}

/* Preview do Dev sob medida — grafismo abstrato: "V" formado por nós
   conectados, em violeta sobre fundo escuro. */
function DevPreview() {
  return (
    <svg
      viewBox="0 0 320 180"
      width="100%"
      height="100%"
      fill="none"
      role="img"
      aria-label="Grafismo de automação Vettia"
      style={{ display: 'block', background: '#0A0A0A' }}
    >
      <path d="M110 55 L160 120 L210 55" stroke="#7B5FEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M85 90 L110 55" stroke="rgba(123,95,239,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M235 90 L210 55" stroke="rgba(123,95,239,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M160 120 L160 150" stroke="rgba(123,95,239,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="110" cy="55" r="6" fill="#0A0A0A" stroke="#7B5FEF" strokeWidth="2" />
      <circle cx="210" cy="55" r="6" fill="#0A0A0A" stroke="#7B5FEF" strokeWidth="2" />
      <circle cx="160" cy="120" r="7" fill="#7B5FEF" />
      <circle cx="85" cy="90" r="4" fill="#7B5FEF" opacity="0.7" />
      <circle cx="235" cy="90" r="4" fill="#7B5FEF" opacity="0.7" />
      <circle cx="160" cy="150" r="4" fill="#7B5FEF" opacity="0.7" />
    </svg>
  )
}

/* Preview do AutoQuote — PLACEHOLDER na paleta âmbar até o screenshot real.
   TODO: substituir por screenshot real do AutoQuote */
function AutoQuotePreview() {
  return (
    <svg
      viewBox="0 0 320 180"
      width="100%"
      height="100%"
      fill="none"
      role="img"
      aria-label="Documento de cotação sendo processado"
      style={{ display: 'block', background: '#0A0A0A' }}
    >
      <rect x="120" y="45" width="80" height="100" rx="6" stroke="#E8A020" strokeWidth="2" />
      <line x1="136" y1="70" x2="184" y2="70" stroke="#E8A020" strokeWidth="2" strokeLinecap="round" />
      <line x1="136" y1="88" x2="184" y2="88" stroke="rgba(232,160,32,0.55)" strokeWidth="2" strokeLinecap="round" />
      <line x1="136" y1="106" x2="184" y2="106" stroke="rgba(232,160,32,0.55)" strokeWidth="2" strokeLinecap="round" />
      <line x1="136" y1="124" x2="168" y2="124" stroke="rgba(232,160,32,0.55)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="200" cy="135" r="20" fill="#0A0A0A" stroke="#E8A020" strokeWidth="2" />
      <path d="M200 126 v9 l6 5" stroke="#E8A020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  preview: React.ReactNode
  product?: string
  featured: boolean
}

const CARDS: CardData[] = [
  {
    id: 'frota360',
    tag: 'SaaS · Gestão de frotas',
    title: 'Frota360',
    body: 'Sistema para transportadoras com 10 a 150 caminhões. Controle de documentos, compliance ANTT, portal do motorista e IA — tudo no idioma de quem opera frota de verdade.',
    href: 'https://frota-360.vercel.app/landing',
    cta: 'Conhecer o Frota360',
    preview: <Frota360Preview />,
    product: 'frota360',
    featured: false,
  },
  {
    id: 'dev',
    tag: 'Sob medida · IA',
    title: 'Software com IA para sua empresa',
    body: 'Automações, sistemas e interfaces feitas para o problema específico do seu negócio. Preço justo para PME, entrega rápida, processo claro do início ao fim.',
    href: '#contato',
    cta: 'Falar sobre seu projeto',
    preview: <DevPreview />,
    featured: true,
  },
  {
    id: 'autoquote',
    tag: 'SaaS · Automação',
    title: 'AutoQuote',
    body: 'Coleta eventos de cotação em minutos. O que levava dois dias de trabalho manual, o AutoQuote faz antes do café.',
    href: 'https://autoquote.ia.br',
    cta: 'Saber mais',
    /* TODO: substituir por screenshot real do AutoQuote */
    preview: <AutoQuotePreview />,
    product: 'autoquote',
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
              {/* Preview 16:9 */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: 8,
                  border: '1px solid rgba(123,95,239,0.15)',
                  overflow: 'hidden',
                  marginBottom: 12,
                }}
              >
                {card.preview}
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
                {...(card.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                onClick={card.product ? () => trackProductClick(card.product!) : undefined}
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
