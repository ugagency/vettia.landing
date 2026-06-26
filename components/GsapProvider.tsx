'use client'

import { useEffect } from 'react'

export default function GsapProvider() {
  useEffect(() => {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)
        ScrollTrigger.config({ ignoreMobileResize: true })
        ;(window as any).__gsap = gsap
        ;(window as any).__ScrollTrigger = ScrollTrigger
      })
  }, [])

  return null
}
