'use client'

import { useEffect, useRef } from 'react'

/* Ícones outline, stroke violeta 1.5px, 32×32 */
function TargetIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="12" stroke="#7B5FEF" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="7" stroke="#7B5FEF" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2" stroke="#7B5FEF" strokeWidth="1.5" />
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M18 3 L7 18 h7 l-2 11 11-15 h-7 l2-11 z"
        stroke="#7B5FEF"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M4 15 V6 a2 2 0 0 1 2-2 h9 l13 13 -11 11 -13-13 z"
        stroke="#7B5FEF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="10.5" r="1.8" stroke="#7B5FEF" strokeWidth="1.5" />
    </svg>
  )
}

const ITEMS = [
  {
    icon: <TargetIcon />,
    title: 'Foco em nicho',
    body: 'Cada produto resolve um problema muito específico de um segmento que o mercado atende mal ou ignora. Não tentamos servir todo mundo — e é exatamente por isso que servimos bem quem escolhemos.',
  },
  {
    icon: <ZapIcon />,
    title: 'Entrega rápida',
    body: 'Construímos com IA como alavanca real. Sem overhead de empresa grande, sem meses de espera para ver resultado.',
  },
  {
    icon: <TagIcon />,
    title: 'Preço para PME',
    body: 'Ticket justo para o porte do seu negócio. Não cobramos enterprise para entregar solução de PME.',
  },
]

export default function Diferenciais() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let mounted = true
    let ctx: { revert: () => void } | null = null

    const initAnimations = () => {
      const gsap = (window as any).__gsap
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        })

        tl.from(sectionRef.current, {
            clipPath: 'inset(100% 0 0 0)',
            duration: 0.8,
            ease: 'power3.inOut',
          })
          .from(
            itemRefs.current.filter(Boolean),
            { opacity: 0, y: 30, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
            '-=0.3'
          )

        itemRefs.current.filter(Boolean).forEach((item) => {
          const num = item!.querySelector('.diff-number')
          gsap.fromTo(
            num,
            { y: 20 },
            {
              y: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.3,
              },
            }
          )
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
      ref={sectionRef}
      style={{
        background: 'var(--light-bg)',
        padding: '96px 48px',
        position: 'relative',
        overflow: 'hidden',
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
              color: 'var(--brand-accent-dim)',
              marginBottom: 12,
            }}
          >
            Por que a Vettia
          </span>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 40,
              letterSpacing: '-0.02em',
              color: 'var(--light-text)',
            }}
          >
            Não somos mais um sistema genérico.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => { itemRefs.current[i] = el }}
              className="diff-item"
            >
              <span
                className="diff-number"
                aria-hidden="true"
                style={{
                  display: 'block',
                  lineHeight: 1,
                  marginBottom: 20,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {item.icon}
              </span>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 24,
                  color: 'var(--light-text)',
                  marginBottom: 12,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 15,
                  color: '#444444',
                  lineHeight: 1.6,
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
