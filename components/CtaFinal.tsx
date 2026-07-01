'use client'

import { useEffect, useRef } from 'react'
import { trackWhatsAppClick } from '@/lib/gtag'

export default function CtaFinal() {
  const sectionRef = useRef<HTMLElement>(null)
  const h2Ref      = useRef<HTMLHeadingElement>(null)
  const paraRef    = useRef<HTMLParagraphElement>(null)
  const btnRef     = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    let mounted = true
    let ctx: { revert: () => void } | null = null

    const initAnimations = () => {
      const gsap = (window as any).__gsap
      ctx = gsap.context(() => {
        const st = { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }

        gsap.from(sectionRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: st,
        })
        gsap.from(h2Ref.current, {
          opacity: 0, y: 30, duration: 0.5, ease: 'power2.out', delay: 0.1,
          scrollTrigger: st,
        })
        gsap.from(paraRef.current, {
          opacity: 0, y: 30, duration: 0.5, ease: 'power2.out', delay: 0.2,
          scrollTrigger: st,
        })
        gsap.from(btnRef.current, {
          opacity: 0, y: 30, duration: 0.5, ease: 'power2.out', delay: 0.3,
          scrollTrigger: st,
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
      id="contato"
      ref={sectionRef}
      style={{
        background: 'var(--brand-accent)',
        padding: '120px 48px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Glows decorativos */}
      <div aria-hidden="true" className="cta-glow cta-glow-left" />
      <div aria-hidden="true" className="cta-glow cta-glow-right" />

      {/* Grain */}
      <div
        aria-hidden="true"
        className="grain-overlay"
        style={{ opacity: 0.03 }}
      />

      {/* Conteúdo */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h2
          ref={h2Ref}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: 48,
            letterSpacing: '-0.025em',
            color: 'var(--text-on-accent)',
            maxWidth: 600,
            margin: '0 auto',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Tem um problema para resolver?
        </h2>

        <p
          ref={paraRef}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 18,
            color: 'rgba(250,250,248,0.75)',
            marginBottom: 40,
          }}
        >
          Conta para a gente. Se fizer sentido atacar, a gente ataca.
        </p>

        <a
          ref={btnRef}
          href="https://wa.me/553175142675"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('cta_final')}
          className="hover:scale-[1.03] hover:shadow-[0_0_0_4px_rgba(255,255,255,0.2)] hover:bg-[#EDECE8] transition-all duration-200"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--text-on-accent)',
            color: 'var(--brand-accent)',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            borderRadius: 9999,
            padding: '16px 36px',
            textDecoration: 'none',
          }}
        >
          Falar com a Vettia →
        </a>
      </div>
    </section>
  )
}
