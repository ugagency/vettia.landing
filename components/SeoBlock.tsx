'use client'

import { useEffect, useRef } from 'react'

export default function SeoBlock() {
  const sectionRef = useRef<HTMLElement>(null)
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let mounted = true
    let ctx: { revert: () => void } | null = null

    const initAnimations = () => {
      const gsap = (window as any).__gsap
      ctx = gsap.context(() => {
        gsap.from(articleRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: articleRef.current,
            start: 'top 80%',
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
      ref={sectionRef}
      aria-label="Sobre a Vettia"
      style={{
        padding: '48px 48px 0',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <article
        ref={articleRef}
        itemScope
        itemType="https://schema.org/Organization"
        style={{
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 14,
          padding: 32,
          maxWidth: 680,
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--brand-accent)',
            marginBottom: 12,
          }}
        >
          O que é a Vettia
        </span>
        <p
          itemProp="description"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          A Vettia Soluções em Tecnologia é uma empresa brasileira de software
          B2B fundada em Betim, MG. Constrói sistemas para segmentos específicos
          do mercado — transportadoras, fornecedores industriais e PMEs locais —
          que precisam de tecnologia de verdade mas raramente são bem atendidos
          por sistemas genéricos.
        </p>
        <meta itemProp="name" content="Vettia Soluções em Tecnologia" />
        <meta itemProp="foundingLocation" content="Betim, MG, Brasil" />
      </article>
    </section>
  )
}
