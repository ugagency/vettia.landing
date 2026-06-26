'use client'

import { useEffect, useRef, useState } from 'react'

export default function IntroScreen() {
  const [visible, setVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Verifica sessionStorage de forma síncrona — sem precisar carregar o GSAP
    if (sessionStorage.getItem('vettia_intro_seen')) {
      // Fade-out CSS suave antes de desmontar (sem precisar de GSAP)
      if (containerRef.current) {
        containerRef.current.style.transition = 'opacity 0.35s ease'
        containerRef.current.style.opacity = '0'
      }
      // Dispara o evento no meio do fade para que o Hero comece a entrar enquanto
      // o overlay ainda está saindo — transição cruzada sem tela em branco
      const tEvent = setTimeout(() => document.dispatchEvent(new CustomEvent('vettia:intro-done')), 180)
      const tHide  = setTimeout(() => setVisible(false), 360)
      return () => { clearTimeout(tEvent); clearTimeout(tHide) }
    }

    document.body.classList.add('intro-active')

    import('gsap').then(({ default: gsap }) => {
      gsap.set(logoRef.current, { opacity: 0, scale: 0.85 })

      gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('vettia_intro_seen', '1')
          document.body.classList.remove('intro-active')
          document.dispatchEvent(new CustomEvent('vettia:intro-done'))
          setTimeout(() => setVisible(false), 50)
        },
      })
        .to(logoRef.current, {
          opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', delay: 0.15,
        })
        .to({}, { duration: 1.0 })
        .to(containerRef.current, {
          opacity: 0, duration: 0.5, ease: 'power2.inOut',
        })
    })

    return () => { document.body.classList.remove('intro-active') }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* TODO: substituir por next/image quando SVG servido via next.config images */}
      <img
        ref={logoRef}
        src="/assets/brand/logo-vettia-white.svg"
        alt="Vettia"
        style={{ width: 220, height: 'auto' }}
      />
    </div>
  )
}
