'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect width="18" height="18" rx="3" fill="currentColor" opacity="0.15" />
      <path
        d="M5 7h2.5v6H5V7zm1.25-2a1.25 1.25 0 110 2.5A1.25 1.25 0 016.25 5z"
        fill="currentColor"
      />
      <path
        d="M9 7h2.4v.82c.34-.6 1.08-1 2-.9C15.5 7.1 16 8.4 16 10.2V13h-2.5v-2.5c0-.9-.3-1.5-1-1.5s-1 .6-1 1.5V13H9V7z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Fundador() {
  const sectionRef    = useRef<HTMLElement>(null)
  const textColRef    = useRef<HTMLDivElement>(null)
  const photoColRef   = useRef<HTMLDivElement>(null)
  const blockquoteRef = useRef<HTMLQuoteElement>(null)

  useEffect(() => {
    let mounted = true
    let ctx: { revert: () => void } | null = null

    const initAnimations = () => {
      const gsap = (window as any).__gsap
      ctx = gsap.context(() => {
        const st = { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }

        gsap.from(textColRef.current, {
          opacity: 0,
          x: -40,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: st,
        })

        gsap.from(photoColRef.current, {
          opacity: 0,
          x: 60,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.15,
          scrollTrigger: st,
        })

        gsap.from(blockquoteRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3,
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
      ref={sectionRef}
      style={{
        background: 'var(--brand-base)',
        padding: '96px 48px',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl mx-auto items-center">

        {/* Coluna texto */}
        <div ref={textColRef}>
          <span
            style={{
              display: 'block',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--brand-accent)',
              marginBottom: 16,
            }}
          >
            Quem está por trás
          </span>

          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 40,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: 24,
              lineHeight: 1.15,
            }}
          >
            Tem um humano
            <br />
            por trás disso.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            Ulisses Gonçalves fundou a Vettia depois de anos construindo
            sistemas como braço técnico de uma software house. Viu de perto
            os problemas que PMEs carregam sem solução — e decidiu resolver
            os que mais faziam sentido atacar.
          </p>

          <blockquote
            ref={blockquoteRef}
            style={{
              borderLeft: '3px solid var(--brand-accent)',
              paddingLeft: 20,
              margin: '24px 0 32px',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              color: 'var(--text-primary)',
              fontStyle: 'normal',
            }}
          >
            A Vettia não é uma fábrica de software. É uma empresa que escolhe
            nichos com cuidado e entra para ficar.
          </blockquote>

          <a
            href="https://linkedin.com/in/ulissesgoncalves"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: 'var(--brand-accent)',
              textDecoration: 'none',
            }}
          >
            <LinkedInIcon />
            Ulisses Gonçalves
          </a>
        </div>

        {/* Coluna foto */}
        <div
          ref={photoColRef}
          className="order-first md:order-last"
          style={{ position: 'relative' }}
        >
          {/* TODO: substituir pela foto real do fundador */}
          <Image
            src="/assets/brand/foto-ulisses.jpg"
            alt="Ulisses Gonçalves, fundador da Vettia"
            width={480}
            height={600}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: 20,
              boxShadow: '24px 24px 0 rgba(123,95,239,0.12)',
              display: 'block',
            }}
          />
        </div>

      </div>
    </section>
  )
}
