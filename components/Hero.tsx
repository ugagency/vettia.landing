'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLSpanElement>(null)
  const h1Line1Ref = useRef<HTMLSpanElement>(null)
  const h1Line2Ref = useRef<HTMLSpanElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const ctasRef    = useRef<HTMLDivElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let gsapInstance: typeof import('gsap')['default'] | null = null
    let ctx: { revert: () => void } | null = null

    // Pré-carrega em paralelo com a intro
    import('gsap').then(({ default: gsap }) => {
      gsapInstance = gsap
      const elements = [
        labelRef.current,
        h1Line1Ref.current,
        h1Line2Ref.current,
        subRef.current,
        ctasRef.current,
      ]
      gsap.set(elements, { opacity: 0, y: 30 })
      gsap.set(scrollRef.current, { opacity: 0 })
    })

    const handler = async () => {
      // Se o pré-load ainda não terminou (caso de skip da intro), importa aqui
      if (!gsapInstance) {
        const { default: g } = await import('gsap')
        gsapInstance = g
        const elements = [
          labelRef.current, h1Line1Ref.current, h1Line2Ref.current,
          subRef.current, ctasRef.current,
        ]
        gsapInstance.set(elements, { opacity: 0, y: 30 })
        gsapInstance.set(scrollRef.current, { opacity: 0 })
      }
      const gsap = gsapInstance
      ctx = gsap.context(() => {
        const tl = gsap.timeline()
        tl
          .to(labelRef.current,   { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' })
          .to(h1Line1Ref.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.45')
          .to(h1Line2Ref.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.40')
          .to(subRef.current,     { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.35')
          .to(ctasRef.current,    { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.30')
          .to(scrollRef.current,  { opacity: 0.4,     duration: 0.4,  ease: 'power2.out' }, '-=0.1')

        const handleScroll = () => {
          gsap.to(scrollRef.current, { opacity: 0, duration: 0.3 })
          window.removeEventListener('scroll', handleScroll)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
      }, sectionRef)
    }

    document.addEventListener('vettia:intro-done', handler)
    return () => {
      document.removeEventListener('vettia:intro-done', handler)
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '96px 0',
        background: 'var(--brand-base)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Glow atmosférico */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(123,95,239,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Conteúdo */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          padding: '0 48px',
        }}
        className="hero-content"
      >
        {/* Label */}
        <span
          ref={labelRef}
          style={{
            display: 'inline-flex',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--brand-accent)',
            border: '1px solid rgba(123,95,239,0.3)',
            borderRadius: 9999,
            padding: '4px 14px',
            marginBottom: 24,
          }}
        >
          Software B2B · Betim, MG
        </span>

        {/* H1 visual */}
        <h1
          aria-hidden="true"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.06,
            color: 'var(--text-primary)',
            maxWidth: 820,
          }}
          className="text-[40px] md:text-[52px] lg:text-[64px]"
        >
          <span ref={h1Line1Ref} style={{ display: 'block' }}>
            Sistemas feitos para o seu negócio.
          </span>
          <span ref={h1Line2Ref} style={{ display: 'block' }}>
            <em style={{ fontStyle: 'normal', color: 'var(--brand-accent)' }}>
              Não para todos os negócios.
            </em>
          </span>
        </h1>

        {/* H1 SEO */}
        <h1 className="sr-only">
          Sistemas B2B para nichos específicos do mercado brasileiro —
          feitos para o seu negócio, não para todos os negócios.
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: 540,
            marginTop: 24,
          }}
          className="text-base md:text-[18px]"
        >
          A Vettia constrói sistemas para segmentos específicos do mercado
          brasileiro — empresas que precisam de tecnologia de verdade mas
          raramente são bem atendidas.
        </p>

        {/* CTAs */}
        <div
          ref={ctasRef}
          style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap' }}
          className="flex-col sm:flex-row"
        >
          <a
            href="#frota360"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--brand-accent)',
              color: 'var(--text-on-accent)',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 9999,
              padding: '14px 28px',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
            }}
            className="w-full sm:w-auto justify-center hover:!bg-[var(--brand-accent-dim)] hover:scale-[1.02] hover:shadow-[0_0_0_4px_rgba(123,95,239,0.2)]"
          >
            Ver Frota360 →
          </a>
          <a
            href="#desenvolvimento"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 9999,
              padding: '14px 28px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            className="w-full sm:w-auto justify-center hover:!border-[var(--brand-accent)] hover:!text-[var(--brand-accent)]"
          >
            Contratar desenvolvimento
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          animation: 'bounce-y 2s ease-in-out infinite',
          color: 'var(--text-secondary)',
          opacity: 0,
          fontSize: 20,
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        ↓
      </div>
    </section>
  )
}
